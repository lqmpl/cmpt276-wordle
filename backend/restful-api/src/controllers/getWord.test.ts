import { describe, expect, test } from '@jest/globals';
import { computeScore } from "./getWord"

describe('getWord.ts', function () {

    test('Wordle Word Checker - All letters match in the right position', function () {
        expect(computeScore("hello", "hello")).toStrictEqual([2, 2, 2, 2, 2]);
    });

    test('Wordle Word Checker - No letters match', function () {
        expect(computeScore("apple", "banana")).toStrictEqual([0, 1, 0, 1, 0]);
    });

    test('Wordle Word Checker - Some letters match in the right position', function () {
        expect(computeScore("world", "hello")).toStrictEqual([0, 0, 1, 2, 1]);
    });
    test('Wordle Word Checker - Letters in the wrong position', function () {
        expect(computeScore("shift", "tihsf")).toStrictEqual([1, 1, 1, 1, 1]);
    });
    test('Wordle Word Checker - 6 Letters in the wrong position', function () {
        expect(computeScore("listen", "silent")).toStrictEqual([1, 2, 1, 1, 0]);
    });

    test('Wordle Word Checker - Duplicate letters in different positions', function () {
        expect(computeScore("letter", "better")).toStrictEqual([0, 2, 2, 2, 2]);
    });

    test('Wordle Word Checker - Empty input', function () {
        expect(computeScore("", "")).toStrictEqual([2, 2, 2, 2, 2]);
    });
    test('Wordle Word Checker - 3 letter to 3 letter same(with space)', function () {
        expect(computeScore("s it", "s it")).toStrictEqual([2, 2, 2, 2, 2]);
    });
    test('Wordle Word Checker - Empty input to non empty', function () {
        expect(computeScore("", "12345")).toStrictEqual([0, 0, 0, 0, 0]);
    });
    test('Wordle Word Checker - Special characters', function () {
        expect(computeScore("w!rd@", "w!rd@")).toStrictEqual([2, 2, 2, 2, 2]);
    });
})

