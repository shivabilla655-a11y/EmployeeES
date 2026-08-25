import { getAllPositions } from "../../services/position.Service.js";
import { useState, useEffect } from "react";

export function PositinsDropdown({ value, onChange }) {
  const [position, setPosition] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await getAllPositions();
        setPosition(response.data?.data || response.data || []);
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPositions();
  }, []);

  return (
    <select className="form-control" value={value} onChange={onChange}>
      <option value="">
        {loading ? "Loading Position..." : "Select Position"}
      </option>
      {position.map((position) => (
        <option key={position.PositionId} value={position.PositionId}>
          {position.PositionName}
        </option>
      ))}
    </select>
  );
}
