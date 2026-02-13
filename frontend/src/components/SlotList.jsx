
import { useEffect, useState } from "react";
import api from "../services/api";

export default function SlotList() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    api.get("/slots?date=2026-02-15")
       .then(res => setSlots(res.data));
  }, []);

  return (
    <div>
      <h2>Available Slots</h2>
      {slots.map(s => (
        <div key={s.id}>{s.startTime} - {s.endTime}</div>
      ))}
    </div>
  );
}
