import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./RecycleCentersPage.css";

const RecycleCentersPage = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [centers, setCenters] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [activeCenterId, setActiveCenterId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const districts = useMemo(() => {
    const uniqueDistricts = Array.from(new Set(allDistricts.filter(Boolean)));
    return ["All Districts", ...uniqueDistricts.sort((a, b) => a.localeCompare(b))];
  }, [allDistricts]);

  useEffect(() => {
    const fetchAllDistricts = async () => {
      try {
        const res = await axios.get("http://localhost:5001/recycle-centers");
        const centerList = res.data.centers || [];
        setAllDistricts(centerList.map((center) => center.district));
      } catch (err) {
        // Keep dropdown usable even if the all-centers request fails.
        setAllDistricts([]);
      }
    };

    fetchAllDistricts();
  }, []);

  useEffect(() => {
    const fetchCenters = async () => {
      setLoading(true);
      setError("");
      setActiveCenterId(null);

      try {
        const params =
          selectedDistrict === "All Districts" ? {} : { district: selectedDistrict };
        const res = await axios.get("http://localhost:5001/recycle-centers", { params });
        const centerList = res.data.centers || [];
        setCenters(centerList);
        if (allDistricts.length === 0) {
          setAllDistricts(centerList.map((center) => center.district));
        }
      } catch (err) {
        setError("Failed to load recycle centers.");
        setCenters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCenters();
  }, [selectedDistrict, allDistricts.length]);

  const activeCenter = useMemo(() => {
    if (!activeCenterId) return null;
    return centers.find((center) => center._id === activeCenterId) || null;
  }, [activeCenterId, centers]);

  const mapQuery = activeCenter
    ? `${activeCenter.name}, ${activeCenter.address}`
    : selectedDistrict === "All Districts"
    ? "Sri Lanka recycling centers"
    : `${selectedDistrict}, Sri Lanka recycling centers`;

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=12&output=embed`;

  return (
    <section className="recycle-centers-page">
      <div className="recycle-hero">
        <h1>Plastic Recycling Centers in Sri Lanka</h1>
        <p>Search by district and find nearby collection and recycling points.</p>
      </div>

      <div className="recycle-controls">
        <label htmlFor="district-select">Select District</label>
        <select
          id="district-select"
          value={selectedDistrict}
          onChange={(event) => setSelectedDistrict(event.target.value)}
        >
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      <div className="recycle-layout">
        <div className="center-list">
          {loading ? <p className="empty-state">Loading centers...</p> : null}
          {!loading && error ? <p className="empty-state">{error}</p> : null}
          {!loading && !error && centers.length === 0 ? (
            <p className="empty-state">No recycling centers found for this district.</p>
          ) : null}

          {!loading &&
            !error &&
            centers.map((center) => {
              const isActive = center._id === activeCenterId;
              return (
                <article
                  key={center._id}
                  className={`center-card ${isActive ? "center-card-active" : ""}`}
                  onClick={() => setActiveCenterId(center._id)}
                >
                  <h3>{center.name}</h3>
                  <p>
                    <strong>District:</strong> {center.district}
                  </p>
                  <p>
                    <strong>Address:</strong> {center.address}
                  </p>
                  {center.phone ? (
                    <p>
                      <strong>Phone:</strong> {center.phone}
                    </p>
                  ) : null}
                  {center.accepted ? (
                    <p>
                      <strong>Accepts:</strong> {center.accepted}
                    </p>
                  ) : null}
                  {center.rating ? (
                    <p>
                      <strong>Rating:</strong> {center.rating}
                    </p>
                  ) : null}
                  {center.status ? (
                    <p>
                      <strong>Status:</strong> {center.status}
                    </p>
                  ) : null}
                  {center.plusCode ? (
                    <p>
                      <strong>Plus Code:</strong> {center.plusCode}
                    </p>
                  ) : null}
                  {center.website ? (
                    <p>
                      <strong>Website:</strong>{" "}
                      <a href={center.website} target="_blank" rel="noreferrer">
                        {center.website}
                      </a>
                    </p>
                  ) : null}

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${center.name} ${center.address}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="directions-link"
                    onClick={(event) => event.stopPropagation()}
                  >
                    Open in Google Maps
                  </a>
                </article>
              );
            })}
        </div>

        <div className="map-panel">
          <h2>{activeCenter ? activeCenter.name : "District Map"}</h2>
          <iframe
            title="Sri Lanka Recycling Centers Map"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="google-map"
          />
        </div>
      </div>
    </section>
  );
};

export default RecycleCentersPage;
