from flask import Blueprint, request, jsonify, current_app
import os
import tempfile
from werkzeug.utils import secure_filename
from Script_1 import upload_file
from Script_2 import run_document_ocr
from Script_3 import load_ocr_data, block_lookup, get_lines, get_tables
from Script_4 import statistical_analysis
from Script_5 import cleanup_files, visualize_data

process_bp = Blueprint('process', __name__, url_prefix='/api')

@process_bp.route('/upload', methods=['POST'])
def upload_file_route():
    if 'file' not in request.files:
        return jsonify(error="No file part"), 400
    file = request.files['file']
    filename = secure_filename(file.filename)
    current_app.mongo.save_file(filename, file)
    tmp = tempfile.NamedTemporaryFile(delete=False)
    try:
        file.seek(0)
        file.save(tmp.name)
        tmp.close()
        upload_file(tmp.name, os.getenv('AWS_BUCKET_NAME'), filename)
    finally:
        os.unlink(tmp.name)
    return jsonify(filename=filename), 200

@process_bp.route('/process', methods=['POST'])
def process_file_endpoint():
    data = request.get_json() or {}
    filename = data.get('filename')
    if not filename:
        return jsonify(error="Filename is required"), 400
    
    run_document_ocr(
        bucket_name=os.getenv('AWS_BUCKET_NAME'),
        object_name=filename,
        client=None,
        poll_interval=5
    )

    pages_list = load_ocr_data('output.txt')
    blocks = block_lookup(pages_list)
    lines = get_lines(pages_list, blocks)
    tables = get_tables(pages_list, blocks)
    df, summary_df = statistical_analysis(tables, lines)

    summary = summary_df.drop(['Table_Count'], axis=1)
    summary = summary.to_dict(orient='records')
    current_app.mongo.db.summmaries.insert_one({'filename' : filename, 'summary' : summary})
    return jsonify(summary=summary), 200

@process_bp.route('/cleanup', methods=['DELETE'])
def cleanup_endpoint():
    data = request.get_json() or {}
    filename = data.get('filename')
    if not filename:
        return jsonify(error="Filename is required"), 400
    cleanup_files(os.getenv('AWS_BUCKET_NAME'), filename, local_file='output.txt')
    return jsonify(message="Cleanup successful"), 200


