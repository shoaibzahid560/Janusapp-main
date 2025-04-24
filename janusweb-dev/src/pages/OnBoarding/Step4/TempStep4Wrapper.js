import React, { useState } from "react";
import Step4 from "./Step4";

const TempStep4Wrapper = () => {
  const [step, setStep] = useState(4);
  const [stopStep, setStopStep] = useState(null);

  return (
    <Step4
      setStep={setStep}
      step={step}
      setStopStep={setStopStep}
    />
  );
};

export default TempStep4Wrapper;