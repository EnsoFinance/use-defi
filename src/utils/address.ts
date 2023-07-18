export const addressCompare = (a: string, b: string) => {
  return a && b && a?.toLowerCase() === b?.toLowerCase();
};

export const addressesCompare = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;

  return a.every((av) => b.find((bv) => addressCompare(av, bv)));
};
