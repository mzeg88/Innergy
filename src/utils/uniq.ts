export const uniq = <T>(array: T[]) : T[] => array ? Array.from(new Set<T>(array)) : [];
