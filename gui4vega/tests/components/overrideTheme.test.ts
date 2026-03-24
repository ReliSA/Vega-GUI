import { describe, it, expect } from 'vitest';
import { overrideTheme } from '../../src/components/overrideTheme';
import { theme } from 'antd';
import type { GlobalToken } from 'antd';

const mockToken = { colorBgContainer: '#ffffff' } as GlobalToken;

describe('overrideTheme', () => {
    it('should return component overrides with inherited token for "auto" theme', () => {
        const result = overrideTheme(mockToken, 'auto');
        expect(result.components).toBeDefined();
        expect(result.algorithm).toBeUndefined();
        expect(result.components?.Layout?.headerBg).toBe(mockToken.colorBgContainer);
    });

    it('should use dark algorithm for "dark" theme', () => {
        const result = overrideTheme(mockToken, 'dark');
        expect(result.algorithm).toBe(theme.darkAlgorithm);
        expect(result.components).toBeDefined();
    });

    it('should use default algorithm for "light" theme', () => {
        const result = overrideTheme(mockToken, 'light');
        expect(result.algorithm).toBe(theme.defaultAlgorithm);
        expect(result.components).toBeDefined();
    });
});