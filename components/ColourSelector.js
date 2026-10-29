import { COLOURS } from "../lib/data";
export default function ColourSelector({ colours, value, onChange }) {
  return (
    <div className="sw" role="group" aria-label="Fabric colour">
      {colours.map((c) => (
        <button key={c} aria-pressed={c === value} className={c === value ? "on" : ""} onClick={() => onChange(c)}>
          <i style={{ background: COLOURS[c] }} />
          <span>{c}</span>
        </button>
      ))}
    </div>
  );
}
