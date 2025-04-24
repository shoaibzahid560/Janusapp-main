import React, { useState } from "react";
import MaintenancePlan from "./MaintenancePlan";

const TempMaintenancePlanWrapper = () => {
  const [step, setStep] = useState(5);
  const [stopStep, setStopStep] = useState(null);

  return (
    <MaintenancePlan
      setStep={setStep}
      step={step}
      setStopStep={setStopStep}
    />
  );
};

export default TempMaintenancePlanWrapper;