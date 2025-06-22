import { describe, expect, test } from "vitest";
import { FormatDateStringForClient, FormatDateStringForServer } from "../string";

describe("FormatDateStringForClient function tests", () => {
    test("Format the date 28/03/2000", () => {
        const dateToTest = new Date(2000, 2, 28, 0, 0, 0, 0);
        const result = FormatDateStringForClient(dateToTest);
        const expected = "28/3/2000";
        expect(result).toBe(expected);
    }),
    test("Format the date 22/06/2025", () => {
        const dateToTest = new Date(2025, 5, 22, 0, 0, 0, 0);
        const result = FormatDateStringForClient(dateToTest);
        const expected = "22/6/2025";
        expect(result).toBe(expected);
    });
});

describe("FormatDateStringForServer function tests", () => {
    test("Format the date 28/03/2000", () => {
        const dateToTest = new Date(2000, 2, 28, 0, 0, 0, 0);
        const result = FormatDateStringForServer(dateToTest);
        const expected = "2000-3-28";
        expect(result).toBe(expected);
    }),
    test("Format the date 22/06/2025", () => {
        const dateToTest = new Date(2025, 5, 22, 0, 0, 0, 0);
        const result = FormatDateStringForServer(dateToTest);
        const expected = "2025-6-22";
        expect(result).toBe(expected);
    });
});