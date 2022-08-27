import { uniq } from "./uniq";


describe("should return unique values from array",() => {
    test("should return unique values", () => {
        const result = uniq([1,2,3]);
        expect(result).toEqual([1,2,3]);
    });

    test("should return unique values", () => {
        const result = uniq([1,2,3,3]);
        expect(result).toEqual([1,2,3]);
    });

    test("should return unique values", () => {
        const result = uniq([]);
        expect(result).toEqual([]);
    });

    test("should return unique values", () => {
        const result = uniq([3,3,2,1]);
        expect(result).toEqual([3,2,1]);
    });

    test("should return empty table for null", () => {
        const result = uniq(null);
        expect(result).toEqual([]);
    });
});