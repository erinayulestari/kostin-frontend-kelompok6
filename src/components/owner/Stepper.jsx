import React from "react";

export default function Stepper({ currentStep = 1 }) {
  const steps = [
    { id: 1, label: "Informasi Pemilik" },
    { id: 2, label: "Informasi Kost" },
    { id: 3, label: "Selesai" },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", maxWidth: "600px", margin: "0 auto" }}>
      {steps.map((step, idx) => {
        const isActive = step.id === currentStep;
        const isPassed = step.id < currentStep;

        return (
          <React.Fragment key={step.id}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: isActive || isPassed ? "#0066ff" : "#cbd5e1",
                  color: isActive || isPassed ? "#fff" : "#475569",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                {step.id}
              </div>
              <span style={{ fontSize: "12px", fontWeight: isActive ? "600" : "500", color: isActive ? "#0066ff" : "#64748b" }}>
                {step.label}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: "2px",
                  backgroundColor: isPassed || isActive ? "#0066ff" : "#cbd5e1",
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}