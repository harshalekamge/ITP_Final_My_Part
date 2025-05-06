"use client"

import { useState } from "react"
import "./PlasticProductSelector.css"

export default function PlasticProductSelector() {
  const [selectedProduct, setSelectedProduct] = useState("bottle")
  const [ricCode, setRicCode] = useState("5") // Default to PP (5) as shown in screenshot
  const [startDate, setStartDate] = useState("2025-01-05") // Example date

  // Comprehensive RIC code information with detailed properties
  const ricCodeInfo = {
    1: {
      name: "PET (Polyethylene Terephthalate)",
      fullName: "Polyethylene Terephthalate (PET or PETE)",
      bpaFree: true,
      recycleDifficulty: "Easy",
      recyclable: true,
      reusable: false,
      maxReuseTime: "Single use recommended",
      healthRisk: "Low to Medium",
      safeTemperatureRange: "32°F to 122°F (0°C to 50°C)",
      environmentalImpact: "Medium",
      expiryInfo: "Recommended to replace after 6-12 months of regular use.",
      message:
        "Your item is made of PET plastic. This is commonly used for beverage bottles and food containers. While it's highly recyclable and accepted in most recycling programs, it's best to avoid reusing these bottles repeatedly as they may release small amounts of chemicals over time, especially when exposed to heat. PET bottles are generally intended for single use, and the plastic can degrade if repeatedly washed or exposed to sunlight for extended periods. When recycled, PET can be transformed into polyester fibers for clothing, carpeting, and even new bottles. To maximize safety, avoid exposing PET containers to high temperatures and replace them if they show signs of wear such as cracks or discoloration.",
      commonUses:
        "Soft drink bottles, water bottles, salad dressing containers, peanut butter jars, cooking oil containers",
      recyclingTips:
        "Rinse containers before recycling. Remove caps and labels if required by your local recycling program. Crush containers to save space in recycling bins.",
    },
    2: {
      name: "HDPE (High-Density Polyethylene)",
      fullName: "High-Density Polyethylene (HDPE)",
      bpaFree: true,
      recycleDifficulty: "Easy",
      recyclable: true,
      reusable: true,
      maxReuseTime: "1-2 years with proper care",
      healthRisk: "Low",
      safeTemperatureRange: "-148°F to 176°F (-100°C to 80°C)",
      environmentalImpact: "Medium-Low",
      expiryInfo: "Can be safely used for 1-2 years with proper care and cleaning.",
      message:
        "Your item is made of HDPE plastic. This is considered one of the safest plastics for food and drinks. It's durable, resistant to many solvents, and easily recyclable. HDPE is commonly used in milk jugs and detergent bottles. It doesn't leach harmful chemicals into contents and can withstand both cold and moderately hot temperatures, making it suitable for reuse with proper cleaning. HDPE has excellent chemical resistance and is less permeable than other plastics, which helps prevent the transfer of chemicals into food or beverages. When properly recycled, HDPE can be transformed into new bottles, plastic lumber, playground equipment, and other durable products. To maintain the quality and safety of your HDPE container, wash it regularly with mild soap and warm water, and inspect it periodically for signs of wear or damage.",
      commonUses:
        "Milk jugs, detergent bottles, shampoo bottles, bleach containers, motor oil bottles, toys, and some reusable shopping bags",
      recyclingTips:
        "Rinse containers thoroughly. Remove caps and labels if required by your local recycling program. Flatten containers to save space.",
    },
    3: {
      name: "PVC (Polyvinyl Chloride)",
      fullName: "Polyvinyl Chloride (PVC or V)",
      bpaFree: false,
      recycleDifficulty: "Difficult",
      recyclable: false,
      reusable: false,
      maxReuseTime: "Not recommended for reuse",
      healthRisk: "High",
      safeTemperatureRange: "32°F to 158°F (0°C to 70°C)",
      environmentalImpact: "High",
      expiryInfo: "Not recommended for food or beverages. Replace with a safer alternative.",
      message:
        "Your item is made of PVC plastic. This type of plastic can contain phthalates and BPA, chemicals that may leach into your drink and potentially cause health issues. PVC is rarely accepted in recycling programs and is more commonly used in pipes and shower curtains. For water bottles and food containers, it's strongly recommended to switch to a safer alternative like HDPE (#2) or PP (#5). PVC production and disposal can release dioxins and other harmful chemicals into the environment. When heated or exposed to sunlight, PVC may release chlorine compounds that can be harmful to health. The plasticizers used to make PVC flexible can leach out over time, especially when in contact with fatty foods or when heated. Due to these concerns, many manufacturers have phased out PVC for food and beverage containers. If you must use this container, avoid heating it and consider replacing it with a safer alternative as soon as possible.",
      commonUses:
        "Plumbing pipes, vinyl siding, window frames, wire insulation, medical tubing, shower curtains, and some food wraps",
      recyclingTips:
        "PVC is difficult to recycle and is not accepted in most curbside recycling programs. Check with specialized recycling facilities in your area.",
    },
    4: {
      name: "LDPE (Low-Density Polyethylene)",
      fullName: "Low-Density Polyethylene (LDPE)",
      bpaFree: true,
      recycleDifficulty: "Medium",
      recyclable: true,
      reusable: true,
      maxReuseTime: "Up to 1 year",
      healthRisk: "Low",
      safeTemperatureRange: "-58°F to 176°F (-50°C to 80°C)",
      environmentalImpact: "Medium",
      expiryInfo: "Generally safe for up to 1 year of regular use.",
      message:
        "Your item is made of LDPE plastic. This is considered safe for food contact and is commonly used in squeezable bottles and bread bags. While it has limited recyclability, more programs are beginning to accept it. LDPE is flexible, resistant to cracking, and doesn't contain harmful chemicals that leach into contents. It's moderately durable and can be reused with proper cleaning. LDPE is a softer, more flexible form of polyethylene that provides good barrier properties against moisture. It's generally considered safe for food storage as it doesn't contain plasticizers or other additives that might leach into food. However, its flexibility makes it less durable than some other plastics, and it may wear out faster with repeated use. When recycling LDPE, be aware that not all curbside programs accept it, though this is improving. To extend the life of your LDPE container, avoid exposing it to high temperatures and clean it gently to prevent damage to the material.",
      commonUses:
        "Squeeze bottles, bread bags, frozen food bags, grocery bags, some clothing and furniture, and some food storage containers",
      recyclingTips:
        "Check if your local recycling program accepts LDPE. Many grocery stores collect plastic bags for recycling.",
    },
    5: {
      name: "PP (Polypropylene)",
      fullName: "Polypropylene (PP)",
      bpaFree: true,
      recycleDifficulty: "Medium",
      recyclable: true,
      reusable: true,
      maxReuseTime: "2-3 years",
      healthRisk: "Very Low",
      safeTemperatureRange: "32°F to 212°F (0°C to 100°C)",
      environmentalImpact: "Medium-Low",
      expiryInfo: "Durable and heat-resistant; can last 2-3 years with proper care.",
      message:
        "Your item is made of PP plastic. This is a heat-resistant plastic generally considered among the safest for food containers. It's used in yogurt containers and bottle caps. PP has moderate recyclability and is accepted in many recycling programs. It's highly resistant to heat, making it microwave-safe and dishwasher-safe. PP doesn't leach chemicals into contents and has excellent durability, making it ideal for reusable containers. Polypropylene is chemically inert and has a high resistance to heat, which makes it suitable for hot liquids and microwave use. It has a high melting point and doesn't readily degrade when exposed to heat or sunlight, contributing to its long lifespan. PP is lightweight yet strong, with good resistance to fatigue, making it durable for repeated use. When properly cared for, PP containers can last for several years without significant degradation. To maximize the lifespan of your PP container, avoid using abrasive cleaners that might scratch the surface, and inspect periodically for signs of wear such as discoloration or cracking.",
      commonUses:
        "Yogurt containers, syrup bottles, ketchup bottles, medicine bottles, bottle caps, straws, food storage containers, and microwave-safe containers",
      recyclingTips:
        "Rinse containers before recycling. Remove food residue. Check with your local recycling program as acceptance of PP is increasing.",
    },
    6: {
      name: "PS (Polystyrene)",
      fullName: "Polystyrene (PS)",
      bpaFree: false,
      recycleDifficulty: "Very Difficult",
      recyclable: false,
      reusable: false,
      maxReuseTime: "Single use only",
      healthRisk: "High",
      safeTemperatureRange: "32°F to 86°F (0°C to 30°C)",
      environmentalImpact: "Very High",
      expiryInfo: "Recommended for single-use only. Replace immediately if used for beverages.",
      message:
        "Your item is made of PS plastic, commonly known as Styrofoam. This type may leach styrene, especially when heated, and is being phased out in many places due to health and environmental concerns. PS is rarely recycled, difficult to process, and can persist in the environment for hundreds of years. For water bottles, it's strongly recommended to replace this immediately with a safer alternative such as PP (#5) or HDPE (#2). Polystyrene can release toxic chemicals when heated, particularly styrene, which is a suspected carcinogen. It's particularly problematic when used with hot foods or beverages, or when microwaved. PS breaks down easily into small pieces that can be ingested by wildlife and enter the food chain. It's also petroleum-based, making it resource-intensive to produce. Many cities and countries have banned or restricted the use of polystyrene food containers due to these environmental and health concerns. If you currently use PS containers, consider switching to more sustainable alternatives like glass, stainless steel, or safer plastics like PP.",
      commonUses:
        "Disposable coffee cups, take-out food containers, egg cartons, meat trays, packing peanuts, and disposable cutlery",
      recyclingTips:
        "PS is rarely accepted in curbside recycling. Look for specialized drop-off locations. Consider avoiding PS products when possible.",
    },
  }

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value)
  }

  const handleRicCodeChange = (e) => {
    setRicCode(e.target.value)
  }

  const handleDateChange = (e) => {
    setStartDate(e.target.value)
  }

  // Get today's date in YYYY-MM-DD format for date input max attribute
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="plastic-container">
      <h1 className="plastic-title">Plastic Product Information</h1>

      <div className="plastic-content">
        {/* Left side - Input fields */}
        <div className="plastic-inputs">
          {/* Product Selection Dropdown */}
          <div className="input-group">
            <label className="input-label">Select Plastic Product:</label>
            <select value={selectedProduct} onChange={handleProductChange} className="select-input">
              <option value="bottle">Plastic Bottle</option>
              <option value="cup">Cup</option>
              <option value="lunchbox">Lunchbox</option>
              <option value="container">Food Container</option>
              <option value="cutlery">Cutlery</option>
              <option value="bag">Shopping Bag</option>
            </select>
          </div>

          {/* RIC Code Radio Buttons */}
          <div className="input-group">
            <label className="input-label">Plastic Identification Code (RIC):</label>
            <div className="radio-grid">
              <div className="radio-item">
                <input
                  type="radio"
                  id="ric-1"
                  name="ricCode"
                  value="1"
                  checked={ricCode === "1"}
                  onChange={handleRicCodeChange}
                />
                <label htmlFor="ric-1">1 - PET</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  id="ric-2"
                  name="ricCode"
                  value="2"
                  checked={ricCode === "2"}
                  onChange={handleRicCodeChange}
                />
                <label htmlFor="ric-2">2 - HDPE</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  id="ric-3"
                  name="ricCode"
                  value="3"
                  checked={ricCode === "3"}
                  onChange={handleRicCodeChange}
                />
                <label htmlFor="ric-3">3 - PVC</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  id="ric-4"
                  name="ricCode"
                  value="4"
                  checked={ricCode === "4"}
                  onChange={handleRicCodeChange}
                />
                <label htmlFor="ric-4">4 - LDPE</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  id="ric-5"
                  name="ricCode"
                  value="5"
                  checked={ricCode === "5"}
                  onChange={handleRicCodeChange}
                />
                <label htmlFor="ric-5">5 - PP</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  id="ric-6"
                  name="ricCode"
                  value="6"
                  checked={ricCode === "6"}
                  onChange={handleRicCodeChange}
                />
                <label htmlFor="ric-6">6 - PS</label>
              </div>
            </div>
          </div>

          {/* Date Selector */}
          <div className="input-group">
            <label className="input-label">Date Started Using (optional):</label>
            <input type="date" value={startDate} onChange={handleDateChange} max={today} className="date-input" />
          </div>
        </div>

        {/* Right side - Information display */}
        {ricCode && (
          <div className="plastic-details">
            <div className="details-header">
              <h2>Type: {ricCodeInfo[ricCode].fullName}</h2>
            </div>

            <div className="details-grid">
              <div className="detail-row">
                <span className="detail-label">BPA Free:</span>
                {ricCodeInfo[ricCode].bpaFree ? (
                  <span className="green-check">✓ Yes</span>
                ) : (
                  <span className="red-cross">✗ No</span>
                )}
              </div>

              <div className="detail-row">
                <span className="detail-label">Recycle Difficulty:</span>
                <span
                  className={
                    ricCodeInfo[ricCode].recycleDifficulty === "Easy"
                      ? "green-text"
                      : ricCodeInfo[ricCode].recycleDifficulty === "Medium"
                        ? "yellow-text"
                        : "red-text"
                  }
                >
                  {ricCodeInfo[ricCode].recycleDifficulty}
                </span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Recyclable:</span>
                {ricCodeInfo[ricCode].recyclable ? (
                  <span className="green-check">✓ Yes</span>
                ) : (
                  <span className="red-cross">✗ No</span>
                )}
              </div>

              <div className="detail-row">
                <span className="detail-label">Reusable:</span>
                {ricCodeInfo[ricCode].reusable ? (
                  <span className="green-check">✓ Yes</span>
                ) : (
                  <span className="red-cross">✗ No</span>
                )}
              </div>

              <div className="detail-row">
                <span className="detail-label">Max Reuse Time:</span>
                <span>{ricCodeInfo[ricCode].maxReuseTime}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Health Risk:</span>
                <span
                  className={
                    ricCodeInfo[ricCode].healthRisk === "Low" || ricCodeInfo[ricCode].healthRisk === "Very Low"
                      ? "green-text"
                      : ricCodeInfo[ricCode].healthRisk === "Medium" ||
                          ricCodeInfo[ricCode].healthRisk === "Low to Medium"
                        ? "yellow-text"
                        : "red-text"
                  }
                >
                  {ricCodeInfo[ricCode].healthRisk}
                </span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Environmental Impact:</span>
                <span
                  className={
                    ricCodeInfo[ricCode].environmentalImpact === "Low" ||
                    ricCodeInfo[ricCode].environmentalImpact === "Medium-Low"
                      ? "green-text"
                      : ricCodeInfo[ricCode].environmentalImpact === "Medium"
                        ? "yellow-text"
                        : "red-text"
                  }
                >
                  {ricCodeInfo[ricCode].environmentalImpact}
                </span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Safe Temperature Range:</span>
                <span>{ricCodeInfo[ricCode].safeTemperatureRange}</span>
              </div>
            </div>

            <div className="recommendation-section">
              <h3 className="section-title">Recommendation:</h3>
              <p className="recommendation-text">{ricCodeInfo[ricCode].expiryInfo}</p>
            </div>

            <div className="common-uses-section">
              <h3 className="section-title">Common Uses:</h3>
              <p>{ricCodeInfo[ricCode].commonUses}</p>
            </div>

            <div className="recycling-tips-section">
              <h3 className="section-title">Recycling Tips:</h3>
              <p>{ricCodeInfo[ricCode].recyclingTips}</p>
            </div>

            <div className="details-message">
              <h3 className="section-title">Detailed Information:</h3>
              <p>{ricCodeInfo[ricCode].message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
