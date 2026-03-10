import type { ThemeConfig, GlobalToken} from 'antd';

/**
 * Custom Ant Design theme configuration for the application.
 * @param token - The global theme token provided by Ant Design.
 * @returns A theme configuration object that overrides component styles.
 */
export function overrideTheme(token: GlobalToken): ThemeConfig {
    return {
        components: {
            Layout: {
                headerBg: token.colorBgContainer,
                bodyBg: token.colorBgContainer,
            },
        },
    };
}