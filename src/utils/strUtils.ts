export const numberTest = (value: string): boolean => {
  return /^\d+$/.test(value) || /^\d+\.\d+$/.test(value);
};
