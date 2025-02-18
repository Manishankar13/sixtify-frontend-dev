export const buttonIds = {
  onSubmit: "onSubmit",
} as const;

export type ButtonId = keyof typeof buttonIds;
