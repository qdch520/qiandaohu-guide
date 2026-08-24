import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DayId, PlanId } from "./guide-data";

type PlanState = {
  picks: Record<DayId, PlanId | null>;
  tips: Record<string, boolean>;
  setPick: (day: DayId, plan: PlanId) => void;
  toggleTip: (id: string) => void;
  reset: () => void;
};

const emptyPicks: Record<DayId, PlanId | null> = {
  fri: null,
  sat: null,
  sun: null,
};

export const usePlanStore = create<PlanState>()(
  persist(
    (set) => ({
      picks: emptyPicks,
      tips: {},
      setPick: (day, plan) =>
        set((s) => ({
          picks: {
            ...s.picks,
            [day]: s.picks[day] === plan ? null : plan,
          },
        })),
      toggleTip: (id) =>
        set((s) => ({ tips: { ...s.tips, [id]: !s.tips[id] } })),
      reset: () => set({ picks: emptyPicks, tips: {} }),
    }),
    { name: "qdh-family-guide" },
  ),
);
