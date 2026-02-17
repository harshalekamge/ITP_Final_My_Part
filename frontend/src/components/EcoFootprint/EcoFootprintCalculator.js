import React, { useEffect, useMemo, useState } from "react";
import "./EcoFootprintCalculator.css";

const TABS = ["calculate", "history", "limit", "reports"];
const STORAGE_HISTORY_KEY = "plasticUsageHistory";
const STORAGE_LIMIT_KEY = "plasticMonthlyLimit";
const EMISSIONS = {
  bottles: 0.1,
  bags: 0.05,
  straws: 0.01,
  containers: 0.2,
  wrappers: 0.03,
};
const BASELINE_FOOTPRINT = 3.9;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function toNonNegativeInt(value) {
  if (value === "") return 0;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) || parsed < 0 ? null : parsed;
}

function getCurrentMonthUsage(history) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  return history
    .filter((item) => {
      const date = new Date(item.timestamp);
      return date.getFullYear() === year && date.getMonth() === month;
    })
    .reduce((sum, item) => sum + (Number(item.carbonFootprint) || 0), 0);
}

function getScoreTone(score) {
  if (score >= 80) return "good";
  if (score >= 45) return "mid";
  return "low";
}

const EcoFootprintCalculator = () => {
  const [activeTab, setActiveTab] = useState("calculate");

  const [bottles, setBottles] = useState("");
  const [bags, setBags] = useState("");
  const [straws, setStraws] = useState("");
  const [containers, setContainers] = useState("");
  const [wrappers, setWrappers] = useState("");

  const [result, setResult] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");

  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState(null);

  const [monthlyLimit, setMonthlyLimit] = useState(null);
  const [limitInput, setLimitInput] = useState("");
  const [setLimitLoading, setSetLimitLoading] = useState(false);
  const [setLimitError, setSetLimitError] = useState(null);

  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState(null);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(STORAGE_HISTORY_KEY);
      const parsedHistory = storedHistory ? JSON.parse(storedHistory) : [];
      const sorted = [...parsedHistory].sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
      setHistory(sorted);

      const storedLimit = localStorage.getItem(STORAGE_LIMIT_KEY);
      if (storedLimit !== null && storedLimit !== "") {
        const parsedLimit = Number.parseFloat(storedLimit);
        if (!Number.isNaN(parsedLimit) && parsedLimit >= 0) {
          setMonthlyLimit(parsedLimit);
          setLimitInput(String(parsedLimit));
        }
      }
    } catch (error) {
      setHistoryError("Failed to read saved data from your browser.");
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  const currentInput = useMemo(
    () => ({
      bottles: Number.parseInt(bottles, 10) || 0,
      bags: Number.parseInt(bags, 10) || 0,
      straws: Number.parseInt(straws, 10) || 0,
      containers: Number.parseInt(containers, 10) || 0,
      wrappers: Number.parseInt(wrappers, 10) || 0,
    }),
    [bags, bottles, containers, straws, wrappers]
  );

  const livePreview = useMemo(() => {
    const footprint =
      currentInput.bottles * EMISSIONS.bottles +
      currentInput.bags * EMISSIONS.bags +
      currentInput.straws * EMISSIONS.straws +
      currentInput.containers * EMISSIONS.containers +
      currentInput.wrappers * EMISSIONS.wrappers;

    const score = Math.round(
      clamp(100 - (footprint / BASELINE_FOOTPRINT) * 100, 0, 100)
    );

    return {
      totalItems:
        currentInput.bottles +
        currentInput.bags +
        currentInput.straws +
        currentInput.containers +
        currentInput.wrappers,
      footprint,
      score,
      tone: getScoreTone(score),
    };
  }, [currentInput]);

  const currentMonthlyUsage = useMemo(() => getCurrentMonthUsage(history), [history]);
  const isLimitExceeded = monthlyLimit !== null && currentMonthlyUsage > monthlyLimit;

  const historyStats = useMemo(() => {
    if (history.length === 0) {
      return { entries: 0, averageFootprint: 0, bestScore: 0 };
    }

    const totalFootprint = history.reduce(
      (sum, item) => sum + (Number(item.carbonFootprint) || 0),
      0
    );

    const bestScore = history.reduce(
      (best, item) => Math.max(best, Number(item.ecoScore) || 0),
      0
    );

    return {
      entries: history.length,
      averageFootprint: totalFootprint / history.length,
      bestScore,
    };
  }, [history]);

  const latestEntry = history.length > 0 ? history[history.length - 1] : null;

  const limitProgressPct = useMemo(() => {
    if (monthlyLimit === null || monthlyLimit <= 0) return 0;
    return clamp((currentMonthlyUsage / monthlyLimit) * 100, 0, 100);
  }, [currentMonthlyUsage, monthlyLimit]);

  const handleInputChange = (setter) => (event) => {
    const next = event.target.value;
    if (next === "" || /^\d+$/.test(next)) {
      setter(next);
    }
  };

  const handleCalculate = () => {
    setSaveStatus(null);
    setSaveMessage("");

    const bottlesValue = toNonNegativeInt(bottles);
    const bagsValue = toNonNegativeInt(bags);
    const strawsValue = toNonNegativeInt(straws);
    const containersValue = toNonNegativeInt(containers);
    const wrappersValue = toNonNegativeInt(wrappers);

    if (
      bottlesValue === null ||
      bagsValue === null ||
      strawsValue === null ||
      containersValue === null ||
      wrappersValue === null
    ) {
      setSaveStatus("error");
      setSaveMessage("Invalid input. Please enter non-negative numbers.");
      return;
    }

    const carbonFootprint =
      bottlesValue * EMISSIONS.bottles +
      bagsValue * EMISSIONS.bags +
      strawsValue * EMISSIONS.straws +
      containersValue * EMISSIONS.containers +
      wrappersValue * EMISSIONS.wrappers;

    const points = Math.round(
      clamp(100 - (carbonFootprint / BASELINE_FOOTPRINT) * 100, 0, 100)
    );

    const calculationData = { carbonFootprint, points };
    setResult(calculationData);

    const historyEntry = {
      timestamp: new Date().toISOString(),
      bottles: bottlesValue,
      bags: bagsValue,
      straws: strawsValue,
      containers: containersValue,
      wrappers: wrappersValue,
      carbonFootprint,
      ecoScore: points,
    };

    const nextHistory = [...history, historyEntry].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    setHistory(nextHistory);
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(nextHistory));

    setSaveStatus("success");
    setSaveMessage("Usage record saved to local history.");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCalculate();
  };

  const handleSetLimit = () => {
    setSetLimitLoading(true);
    setSetLimitError(null);

    const limitValue = limitInput.trim() === "" ? null : Number.parseFloat(limitInput);

    if (limitValue !== null && (Number.isNaN(limitValue) || limitValue < 0)) {
      setSetLimitError("Enter a non-negative number or leave empty to remove the limit.");
      setSetLimitLoading(false);
      return;
    }

    if (limitValue === null) {
      localStorage.removeItem(STORAGE_LIMIT_KEY);
      setMonthlyLimit(null);
    } else {
      localStorage.setItem(STORAGE_LIMIT_KEY, String(limitValue));
      setMonthlyLimit(limitValue);
    }

    setSetLimitLoading(false);
  };

  const handleGenerateReport = () => {
    setReportLoading(true);
    setReportError(null);

    try {
      if (history.length === 0) {
        setReportError("No history found. Calculate your footprint first.");
        return;
      }

      const rows = [
        [
          "Date",
          "Bottles",
          "Bags",
          "Straws",
          "Containers",
          "Wrappers",
          "Carbon Footprint (kg CO2e)",
          "Eco Score",
        ],
        ...history.map((record) => [
          new Date(record.timestamp).toLocaleString(),
          record.bottles,
          record.bags,
          record.straws,
          record.containers,
          record.wrappers,
          Number(record.carbonFootprint).toFixed(2),
          record.ecoScore,
        ]),
      ];

      const csv = rows
        .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
        .join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "plastic_usage_report.csv";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      setReportError("Failed to generate report.");
    } finally {
      setReportLoading(false);
    }
  };

  const tips = useMemo(() => {
    const items = [];
    if (currentInput.bottles > 0) items.push("Carry a reusable water bottle.");
    if (currentInput.bags > 0) items.push("Use reusable shopping bags.");
    if (currentInput.straws > 0) items.push("Avoid plastic straws or carry a reusable straw.");
    if (currentInput.containers > 0) items.push("Pack food in reusable containers.");
    if (currentInput.wrappers > 0) items.push("Choose low-packaging or bulk products.");
    if (items.length === 0) items.push("Great work. Keep minimizing single-use plastic.");
    return items;
  }, [currentInput]);

  return (
    <section className="eco-page legacy-plastic">
      <div className="eco-card full-width">
        <div className="legacy-header">
          <h1>Plastic Footprint Calculator</h1>
          <p>Track plastic usage, footprint, eco score, and progress in one place.</p>
        </div>

        <div className="legacy-tabs" role="tablist" aria-label="Calculator Sections">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`legacy-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "calculate" && (
          <div className="legacy-panel">
            <div className="quick-stats">
              <article className="stat-card">
                <span>Total Items</span>
                <strong>{livePreview.totalItems}</strong>
              </article>
              <article className="stat-card">
                <span>Estimated Footprint</span>
                <strong>{livePreview.footprint.toFixed(2)} kg CO2e</strong>
              </article>
              <article className={`stat-card score-card ${livePreview.tone}`}>
                <span>Eco Score</span>
                <strong>{livePreview.score} / 100</strong>
                <div className="score-track" aria-hidden="true">
                  <div className="score-fill" style={{ width: `${livePreview.score}%` }} />
                </div>
              </article>
            </div>

            <form onSubmit={handleSubmit} className="legacy-grid">
              <label>
                Bottles
                <input type="number" min="0" value={bottles} onChange={handleInputChange(setBottles)} />
              </label>
              <label>
                Bags
                <input type="number" min="0" value={bags} onChange={handleInputChange(setBags)} />
              </label>
              <label>
                Straws
                <input type="number" min="0" value={straws} onChange={handleInputChange(setStraws)} />
              </label>
              <label>
                Containers
                <input type="number" min="0" value={containers} onChange={handleInputChange(setContainers)} />
              </label>
              <label>
                Wrappers
                <input type="number" min="0" value={wrappers} onChange={handleInputChange(setWrappers)} />
              </label>
              <button className="primary" type="submit">
                Calculate & Save
              </button>
            </form>

            {saveStatus ? <p className={`status ${saveStatus}`}>{saveMessage}</p> : null}

            {result ? (
              <div className="result-box">
                <div>
                  <p className="result-label">Final Carbon Footprint</p>
                  <p className="result-value">{result.carbonFootprint.toFixed(2)} kg CO2e</p>
                </div>
                <div>
                  <p className="result-label">Final Eco Score</p>
                  <p className="result-value">{result.points} / 100</p>
                </div>
                <button className="secondary" type="button" onClick={() => setShowBreakdown(true)}>
                  View Breakdown & Tips
                </button>
              </div>
            ) : null}
          </div>
        )}

        {activeTab === "history" && (
          <div className="legacy-panel">
            <h3>Your Usage History</h3>

            {!historyLoading && !historyError ? (
              <div className="history-stats">
                <article className="mini-stat">
                  <span>Total Records</span>
                  <strong>{historyStats.entries}</strong>
                </article>
                <article className="mini-stat">
                  <span>Average Footprint</span>
                  <strong>{historyStats.averageFootprint.toFixed(2)} kg CO2e</strong>
                </article>
                <article className="mini-stat">
                  <span>Best Eco Score</span>
                  <strong>{historyStats.bestScore}</strong>
                </article>
              </div>
            ) : null}

            {historyLoading ? <p>Loading history...</p> : null}
            {historyError ? <p className="status error">{historyError}</p> : null}
            {!historyLoading && !historyError && history.length === 0 ? <p>No usage history found yet.</p> : null}
            {!historyLoading && !historyError && history.length > 0 ? (
              <div className="history-table-wrap">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Footprint (kg CO2e)</th>
                      <th>Eco Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...history].reverse().map((record) => (
                      <tr key={record.timestamp}>
                        <td>{new Date(record.timestamp).toLocaleString()}</td>
                        <td>{Number(record.carbonFootprint).toFixed(2)}</td>
                        <td>{record.ecoScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        )}

        {activeTab === "limit" && (
          <div className="legacy-panel">
            <h3>Monthly Plastic Limit</h3>
            <p>
              Current monthly limit:{" "}
              <strong>{monthlyLimit !== null ? `${monthlyLimit.toFixed(2)} kg CO2e` : "Not set"}</strong>
            </p>
            <p className={isLimitExceeded ? "status error" : ""}>
              Current month usage: <strong>{currentMonthlyUsage.toFixed(2)} kg CO2e</strong>
            </p>

            {monthlyLimit !== null ? (
              <div className="limit-progress-wrap">
                <div className="limit-progress-header">
                  <span>Usage vs Limit</span>
                  <span>{limitProgressPct.toFixed(0)}%</span>
                </div>
                <div className="limit-progress-track">
                  <div className={`limit-progress-fill ${isLimitExceeded ? "danger" : ""}`} style={{ width: `${limitProgressPct}%` }} />
                </div>
              </div>
            ) : null}

            {isLimitExceeded ? <p className="status error">You exceeded your monthly limit.</p> : null}

            <div className="limit-form">
              <input
                type="number"
                min="0"
                value={limitInput}
                onChange={(event) => setLimitInput(event.target.value)}
                placeholder="Enter monthly limit or leave empty"
                disabled={setLimitLoading}
              />
              <button className="primary" type="button" onClick={handleSetLimit} disabled={setLimitLoading}>
                {setLimitLoading ? "Saving..." : "Set Limit"}
              </button>
            </div>
            {setLimitError ? <p className="status error">{setLimitError}</p> : null}
          </div>
        )}

        {activeTab === "reports" && (
          <div className="legacy-panel">
            <h3>Generate Report</h3>
            <p>Download a CSV report with date, items, footprint, and eco score.</p>
            {latestEntry ? (
              <p className="report-helper">
                Latest record: {new Date(latestEntry.timestamp).toLocaleString()} ({Number(latestEntry.carbonFootprint).toFixed(2)} kg CO2e)
              </p>
            ) : null}
            <button className="primary" type="button" onClick={handleGenerateReport} disabled={reportLoading}>
              {reportLoading ? "Generating..." : "Download Report"}
            </button>
            {reportError ? <p className="status error">{reportError}</p> : null}
          </div>
        )}
      </div>

      {showBreakdown ? (
        <div className="modal-backdrop" onClick={() => setShowBreakdown(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <h2>Footprint Breakdown</h2>
            <p className="note">Estimated impact by item type (kg CO2e).</p>
            <div className="breakdown-list">
              <div className="breakdown-row">
                <span>Bottles</span>
                <span>{currentInput.bottles} x {EMISSIONS.bottles}</span>
                <strong>{(currentInput.bottles * EMISSIONS.bottles).toFixed(2)}</strong>
              </div>
              <div className="breakdown-row">
                <span>Bags</span>
                <span>{currentInput.bags} x {EMISSIONS.bags}</span>
                <strong>{(currentInput.bags * EMISSIONS.bags).toFixed(2)}</strong>
              </div>
              <div className="breakdown-row">
                <span>Straws</span>
                <span>{currentInput.straws} x {EMISSIONS.straws}</span>
                <strong>{(currentInput.straws * EMISSIONS.straws).toFixed(2)}</strong>
              </div>
              <div className="breakdown-row">
                <span>Containers</span>
                <span>{currentInput.containers} x {EMISSIONS.containers}</span>
                <strong>{(currentInput.containers * EMISSIONS.containers).toFixed(2)}</strong>
              </div>
              <div className="breakdown-row">
                <span>Wrappers</span>
                <span>{currentInput.wrappers} x {EMISSIONS.wrappers}</span>
                <strong>{(currentInput.wrappers * EMISSIONS.wrappers).toFixed(2)}</strong>
              </div>
            </div>
            <p>
              Total Estimated Carbon Footprint:{" "}
              <strong>{result ? result.carbonFootprint.toFixed(2) : livePreview.footprint.toFixed(2)} kg CO2e</strong>
            </p>
            <h3>Tips</h3>
            <ul>
              {tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            <button className="secondary" type="button" onClick={() => setShowBreakdown(false)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default EcoFootprintCalculator;
