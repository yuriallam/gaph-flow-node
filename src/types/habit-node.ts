export const HabitOptions = {
  READING: "READING",
  EXERCISE: "EXERCISE",
  MEDITATION: "MEDITATION",
  COOKING: "COOKING",
} as const;
export type HabitOptions = (typeof HabitOptions)[keyof typeof HabitOptions];

export const habitOptionToLabel: Record<HabitOptions, string> = {
  [HabitOptions.READING]: "Reading",
  [HabitOptions.EXERCISE]: "Exercise",
  [HabitOptions.MEDITATION]: "Meditation",
  [HabitOptions.COOKING]: "Cooking",
};
