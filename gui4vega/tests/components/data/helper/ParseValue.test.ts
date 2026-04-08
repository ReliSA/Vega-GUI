import { describe, it, expect } from 'vitest';
import { parseValue } from '../../../../src/components/data/helper/ParseValue';

describe('parseValue', () => {
    it('should parse "true" to boolean true', () => {
        expect(parseValue('true')).toBe(true);
    });

    it('should parse "false" to boolean false', () => {
        expect(parseValue('false')).toBe(false);
    });

    it('should parse "null" to null', () => {
        expect(parseValue('null')).toBeNull();
    });

    it('should parse a numeric string to a number', () => {
        expect(parseValue('42')).toBe(42);
        expect(parseValue('3.14')).toBe(3.14);
        expect(parseValue('-100')).toBe(-100);
        expect(parseValue('0')).toBe(0);
    });

    it('should parse string if it is not any other type', () => {
        expect(parseValue('hello')).toBe('hello');
        expect(parseValue('   hello   ')).toBe('   hello   ');
        expect(parseValue('NaN')).toBe('NaN');
        expect(parseValue('undefined')).toBe('undefined');
    });

    it('should handle empty strings and whitespaces', () => {
        expect(parseValue('')).toBe('');
        expect(parseValue('   ')).toBe('   ');
    });
});