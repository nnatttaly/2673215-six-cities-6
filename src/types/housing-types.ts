const housingTypes = ['Apartment', 'House', 'Room', 'Hotel'] as const;
export type HousingType = (typeof housingTypes)[number];
