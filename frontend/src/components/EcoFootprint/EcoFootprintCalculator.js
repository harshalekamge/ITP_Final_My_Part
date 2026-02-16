import React, { useMemo, useState } from "react";
import "./EcoFootprintCalculator.css";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function calculateScore(inputs) {
  const plasticItems = Number(inputs.plasticItems) || 0;
  const artificialItems = Number(inputs.artificialItems) || 0;
  const ecoItems = Number(inputs.ecoItems) || 0;
  const kmDriven = Number(inputs.kmDriven) || 0;
  const publicKm = Number(inputs.publicKm) || 0;
  const recyclingHabits = inputs.recyclingHabits || "sometimes";

  const habitModifiers = {
    never: { footprint: 6, score: -14 },
    sometimes: { footprint: 2, score: 0 },
    always: { footprint: -5, score: 12 },
  };

  const habit = habitModifiers[recyclingHabits] || habitModifiers.sometimes;
  const plasticImpact = plasticItems * 0.55;
  const artificialImpact = artificialItems * 0.85;
  const transportImpact = kmDriven * 0.17 + publicKm * 0.06;
  const ecoReduction = ecoItems * 0.5;

  const footprint = clamp(
    8 + plasticImpact + artificialImpact + transportImpact - ecoReduction + habit.footprint,
    0,
    999
  );

  const rawScore =
    100 -
    (plasticImpact * 1.3 + artificialImpact * 1.5 + transportImpact * 0.9) +
    ecoReduction * 1.7 +
    habit.score;

  const ecoScore = Math.round(clamp(rawScore, 0, 100));
  const recommendations = [];

  if (plasticItems > 10) recommendations.push("Use reusable bottles to improve your score.");
  if (artificialItems > 5) recommendations.push("Reduce non-recyclable item usage.");
  if (kmDriven > 80) recommendations.push("Drive less and use shared transport when possible.");
  if (publicKm < 10) recommendations.push("Use public transport more to reduce your footprint.");
  if (recyclingHabits !== "always") recommendations.push("Recycle more to reduce your footprint.");
  if (ecoItems < 8) recommendations.push("Increase eco-friendly/recyclable items in daily life.");
  if (recommendations.length === 0) recommendations.push("Great work. Keep these habits consistent.");

  return {
    ecoScore,
    footprint,
    recommendations,
    parts: {
      plasticImpact,
      artificialImpact,
      transportImpact,
      ecoReduction,
      recyclingImpact: habit.footprint,
    },
  };
}

export function updateCharts(parts) {
  return [
    { label: "Plastic", value: parts.plasticImpact, color: "#b42318" },
    { label: "Artificial", value: parts.artificialImpact, color: "#ef4444" },
    { label: "Transport", value: parts.transportImpact, color: "#f97316" },
    { label: "Eco Reduction", value: -parts.ecoReduction, color: "#15803d" },
    { label: "Recycling Habit", value: parts.recyclingImpact, color: "#0e7490" },
  ];
}

const EcoFootprintCalculator = () => {
  const [inputs, setInputs] = useState({
    plasticItems: 12,
    artificialItems: 6,
    ecoItems: 8,
    kmDriven: 60,
    publicKm: 20,
    recyclingHabits: "sometimes",
  });

  const result = useMemo(() => calculateScore(inputs), [inputs]);
  const chartBars = useMemo(() => updateCharts(result.parts), [result.parts]);

  const gaugeColor =
    result.ecoScore >= 70 ? "#2f8f46" : result.ecoScore >= 40 ? "#d97706" : "#b42318";

  const maxAbsValue = Math.max(...chartBars.map((item) => Math.abs(item.value)), 1);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="eco-page">
      <div className="eco-card eco-form">
        <h1>Eco Footprint Calculator</h1>
        <p>Enter your usage habits. Score and footprint update live.</p>

        <div className="eco-grid">
          <label>
            Plastic items used (per week)
            <input name="plasticItems" type="number" min="0" value={inputs.plasticItems} onChange={handleChange} />
          </label>

          <label>
            Artificial / non-recyclable items
            <input name="artificialItems" type="number" min="0" value={inputs.artificialItems} onChange={handleChange} />
          </label>

          <label>
            Recyclable / eco-friendly items
            <input name="ecoItems" type="number" min="0" value={inputs.ecoItems} onChange={handleChange} />
          </label>

          <label>
            Household recycling habits
            <select name="recyclingHabits" value={inputs.recyclingHabits} onChange={handleChange}>
              <option value="never">Never</option>
              <option value="sometimes">Sometimes</option>
              <option value="always">Always</option>
            </select>
          </label>

          <label>
            Private vehicle km (per week)
            <input name="kmDriven" type="number" min="0" value={inputs.kmDriven} onChange={handleChange} />
          </label>

          <label>
            Public transport km (per week)
            <input name="publicKm" type="number" min="0" value={inputs.publicKm} onChange={handleChange} />
          </label>
        </div>
      </div>

      <div className="eco-card eco-results">
        <div className="eco-metrics">
          <div>
            <h3>Eco Score</h3>
            <div className="big">{result.ecoScore}/100</div>
          </div>
          <div>
            <h3>Estimated Carbon Footprint</h3>
            <div className="big">{result.footprint.toFixed(1)} kg CO2e / week</div>
          </div>
        </div>

        <div className="gauge-wrap">
          <div
            className="gauge"
            style={{
              background: `conic-gradient(${gaugeColor} ${result.ecoScore}%, #e2eee5 ${result.ecoScore}% 100%)`,
            }}
          >
            <div className="gauge-inner">{result.ecoScore}</div>
          </div>
          <div className="gauge-label">Visual score gauge</div>
        </div>

        <div className="bar-chart">
          {chartBars.map((bar) => {
            const width = `${(Math.abs(bar.value) / maxAbsValue) * 100}%`;
            return (
              <div key={bar.label} className="bar-row">
                <span className="bar-name">{bar.label}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width, backgroundColor: bar.color }} />
                </div>
                <span className="bar-value">{bar.value.toFixed(1)}</span>
              </div>
            );
          })}
        </div>

        <ul className="tips">
          {result.recommendations.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default EcoFootprintCalculator;
