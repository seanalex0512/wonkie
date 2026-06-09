"use client";
import { useState, useRef, useEffect } from "react";

const TIMES = [];
for (let h = 0; h < 24; h++) {
  for (const m of ["00", "30"]) {
    const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const ampm = h < 12 ? "AM" : "PM";
    TIMES.push({
      value: `${String(h).padStart(2, "0")}:${m}`,
      label: `${hour12}:${m} ${ampm}`,
    });
  }
}

export default function TimePicker({ value, onChange, placeholder = "Select time" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = TIMES.find((t) => t.value === value);

  return (
    <div className="time-picker" ref={ref}>
      <button
        type="button"
        className="time-picker-btn"
        onClick={() => setOpen(!open)}
      >
        <span className={selected ? "time-picker-value" : "time-picker-placeholder"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <ul className="time-picker-dropdown">
          {TIMES.map((t) => (
            <li
              key={t.value}
              className={`time-picker-option${t.value === value ? " time-picker-active" : ""}`}
              onClick={() => { onChange(t.value); setOpen(false); }}
            >
              {t.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
