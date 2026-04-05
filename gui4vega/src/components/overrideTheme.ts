import type { ThemeConfig, GlobalToken} from 'antd';
import { theme } from 'antd'

/**
 * Overrides the Ant Design theme configuration based on the selected editor theme mode.
 * @param token - The global theme token provided by Ant Design.
 * @param editorTheme - The selected editor theme mode ('light', 'dark', or 'auto').
 * @returns A theme configuration object that overrides component styles.
 */
export function overrideTheme(token: GlobalToken, editorTheme: 'light' | 'dark' | 'auto'): ThemeConfig {
    // Keep the inherited token behavior, applying overrides.
    if (editorTheme === 'auto') {
        return { components: getComponentOverrides(token) };
    }

    // Derive a new token to use for component overrides.
    const resolvedAlgorithm = editorTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm;
    const derivedToken = theme.getDesignToken({ algorithm: resolvedAlgorithm, ...token });

    return {
        algorithm: resolvedAlgorithm,
        components: getComponentOverrides(derivedToken),
    };
}

/**
 * Overrides component styles based on the provided theme token.
 * @param token - Theme token to use for overriding component styles.
 * @returns An object containing component style overrides for the theme configuration.
 */
function getComponentOverrides(token: GlobalToken): ThemeConfig['components'] {
    return {
        Layout: {
            headerBg: token.colorBgContainer,
            bodyBg: token.colorBgContainer,
        },
    };
}

/**
 * Does the best to determine if the current theme is dark based on the provided token values.
 * @param token - The global theme token provided by Ant Design.
 * @returns A boolean indicating whether the theme is likely in dark mode.
 */
export function isDarkMode(token: GlobalToken): boolean {
    return token.colorBgContainer === '#141414' ||
        token.colorTextBase === '#fff' ||
        token.colorBgBase.includes('0, 0, 0');
}