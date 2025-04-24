import React, { useState } from "react";
import "./MaintenancePlan.css";
import { useTranslation } from "react-i18next";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
const MaintenancePlan = ({ setStep, step, setStopStep }) => {
  const [activeMethod, setActiveMethod] = useState(null);
  const { t } = useTranslation();

  return (
    <>
      <span
        class="material-symbols-outlined step_arrow_back"
        onClick={() => setStopStep("planCard")}
      >
        arrow_back
      </span>
      <div className="maintenance_main">
        <p className="maintenance_plan_head">
          {" "}
          {t("common.pages.Maintenance plan from file")}
        </p>
        <p className="maintenance_para">
          {t(
            "common.pages.the Import from PDF option is only available for 1-year"
          )}
        </p>

        <div className="import_card_main">
          {/* Import existing maintenance plan */}
          <Row
            className={`step_import_main disabledOption ${
              activeMethod === "pdf" ? "active_import_div" : ""
            }`}
            // onClick={() => setActiveMethod("pdf")}
          >
            <Col className="stepimport_icon" xs={2}>
              <span class="material-symbols-outlined property_direction_icon">
                assistant_direction
              </span>
            </Col>
            <Col xs={10}>
              <p className="step_import_heading">
                {t("common.pages.import from pdf")}
              </p>
              {t("common.pages.Existing plan available in PDF format")}
            </Col>
          </Row>

          {/* Create a new maintenance plan from scratch */}
          <Row
            className={`step_import_main step_maintenance_main ${
              activeMethod === "csv" ? "active_import_div" : ""
            }`}
            onClick={() => setActiveMethod("csv")}
          >
            <Col className="stepimport_icon" xs={2}>
              <span class="material-symbols-outlined property_direction_icon csv_icon">
                csv
              </span>
            </Col>
            <Col xs={10}>
              <p className="step_import_heading">
                {t("common.pages.Import from Excel, CSV")}
              </p>
              {t(
                "common.pages.If you have a maintenance plan in Excel/CSV format"
              )}
            </Col>
          </Row>
        </div>

        <div className="step1_submit_btn_main maintenance_plan_btn_main">
          <Button
            className="step1_started_btn"
            onClick={
              () => setStopStep("PlanUpload")
              // setStep(9)
            }
            disabled={!activeMethod ? true : false}
          >
            {t("common.pages.Continue")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default MaintenancePlan;
