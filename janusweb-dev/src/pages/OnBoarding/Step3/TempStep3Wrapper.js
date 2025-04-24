import React, { useState } from "react";
import Step3 from "./Step3";

const TempStep3Wrapper = () => {
  const [step, setStep] = useState(3);
  const [stopStep, setStopStep] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);

  return (
    <Step3
      setStep={setStep}
      step={step}
      maintenancePlan={false}
      setStopStep={setStopStep}
      selectPlan={null}
      setSelectedMethod={setSelectedMethod}
      selectedMethod={selectedMethod}
    />
  );
};

export default TempStep3Wrapper;