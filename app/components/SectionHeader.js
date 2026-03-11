export default function SectionHeader({ number, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className="section-number">{number}</span>
      <span className="section-label">{label}</span>
    </div>
  );
}
