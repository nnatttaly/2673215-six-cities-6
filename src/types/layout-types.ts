const layoutTypes = ['cities', 'favorites', 'near-places'] as const;
export type LayoutType = (typeof layoutTypes)[number];
