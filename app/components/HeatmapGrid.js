export default function HeatmapGrid({ data = [], month, year }) {
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  // Build the grid: find the first day of the month and create cells
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = firstDay.getDay(); // 0=Sun

  // Map data by date string for lookup
  const completionMap = {};
  data.forEach((entry) => {
    completionMap[entry.date] = entry.completed;
  });

  // Build cells: empty cells for offset, then day cells
  const cells = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    cells.push({ type: "blank" });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const completed = completionMap[dateStr];
    cells.push({ type: "day", day, completed });
  }

  return (
    <div>
      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayLabels.map((label, i) => (
          <div
            key={i}
            className="text-center"
            style={{ fontSize: 10, fontWeight: 500, color: "#999" }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          if (cell.type === "blank") {
            return <div key={i} className="heatmap-cell" />;
          }
          return (
            <div
              key={i}
              className={`heatmap-cell ${cell.completed ? "heatmap-cell-done" : "heatmap-cell-empty"}`}
              style={{ borderRadius: 0 }}
            />
          );
        })}
      </div>
    </div>
  );
}
