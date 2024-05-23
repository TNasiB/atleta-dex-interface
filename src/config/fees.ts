export const FEES = [100, 500, 3000, 10000] as const;

export type Fee = (typeof FEES)[number];
