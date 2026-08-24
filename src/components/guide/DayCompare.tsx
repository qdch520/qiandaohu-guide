import type { DayGuide, PlanId } from "@/lib/guide-data";

const COLS: PlanId[] = ["A", "B", "C"];

export function DayCompare({ day }: { day: DayGuide }) {
  return (
    <section className="bg-surface shadow-card rounded-xl p-4">
      <h3 className="text-base font-medium">三套怎么选</h3>
      <p className="text-muted mt-1 text-sm leading-relaxed">{day.verdict}</p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {COLS.map((id) => {
          const plan = day.plans.find((p) => p.id === id)!;
          return (
            <div key={id} className="bg-bg rounded-sm px-2 py-2">
              <p className="text-accent text-xs font-semibold">
                {id}
                {plan.recommended ? " · 推荐" : ""}
              </p>
              <p className="mt-0.5 text-xs leading-snug">{plan.tag}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-y-3">
        {day.compare.map((row) => (
          <div key={row.label}>
            <p className="text-muted mb-1.5 text-xs font-medium">{row.label}</p>
            <div className="grid grid-cols-3 gap-2">
              <p className="bg-bg rounded-sm px-2 py-2 text-xs leading-snug">
                {row.a}
              </p>
              <p className="bg-bg rounded-sm px-2 py-2 text-xs leading-snug">
                {row.b}
              </p>
              <p className="bg-bg rounded-sm px-2 py-2 text-xs leading-snug">
                {row.c}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
