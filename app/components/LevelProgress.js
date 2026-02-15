"use client";

export default function LevelProgress({
  currentLevel,
  totalLevels,
  completionsAtLevel,
  daysRequired,
}) {
  const levelProgress = completionsAtLevel / daysRequired;

  return (
    <div className="w-full">
      {/* Level dots */}
      <div className="flex items-center justify-center gap-2 mb-3">
        {Array.from({ length: totalLevels }).map((_, i) => {
          const level = i + 1;
          const isCompleted = level < currentLevel;
          const isCurrent = level === currentLevel;

          return (
            <div key={level} className="flex items-center gap-2">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                  transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-primary text-primary-content"
                      : isCurrent
                        ? "bg-primary/20 text-primary border-2 border-primary"
                        : "bg-base-300/50 text-base-content/30"
                  }
                `}
              >
                {isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  level
                )}
              </div>
              {level < totalLevels && (
                <div
                  className={`w-6 h-0.5 rounded-full transition-colors duration-300 ${
                    isCompleted ? "bg-primary" : "bg-base-300/30"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Current level progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-base-300/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${levelProgress * 100}%` }}
          />
        </div>
        <span className="text-xs font-mono opacity-50 shrink-0">
          {completionsAtLevel}/{daysRequired}
        </span>
      </div>

      <p className="text-xs opacity-40 text-center mt-2">
        Level {currentLevel} of {totalLevels}
      </p>
    </div>
  );
}
