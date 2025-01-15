export const paths = {
    top: {
        path: '/',
    },

    auth: {
        register: {
            path: '/auth/register',
            getHref: (redirectTo?: string | null | undefined) =>
              `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
          },
        login: {
            path: '/auth/login',
            getHref: (redirectTo?: string | null | undefined) => 
            `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
        },
    },

    mypage: {
        root: {
            path: '/mypage',
            getHref: () => '/mypage'
        },
        profile: {
            path: '/mypage/profile',
            getHref: () => '/mypage/profile'
        },
    },

    game: {
        root: {
            path: '/game',
            getHref: () => '/game'
        },
        modeSelector: {
            path: '/game/mode-selector',
            getHref: () => '/game/mode-selector'
        },
        single: {
            stageSelector: {
                path: '/game/single/stage-selector',
                getHref: () => '/game/single/stage-selector',
                // getHref: (mode?: string) => `/game/stage-selector${mode ? `?stage=${encodeURIComponent(mode)}` : ''}`,
                play: {
                    path: '/game/single/play',
                getHref: () => '/game/single/play',
                // getHref: (stage?: string) => `/game/play${stage ? `?mode=${encodeURIComponent(stage)}` : ''}`
                }
            },
        },
        multi: {
            stageSelector: {
                path: '/game/single/stage-selector',
                getHref: () => '/game/multi/stage-selector',
                // getHref: (mode?: string) => `/game/stage-selector${mode ? `?stage=${encodeURIComponent(mode)}` : ''}`,
                play: {
                    path: '/game/single/play',
                    getHref: () => '/game/multi/play',
                    // getHref: (stage?: string) => `/game/play${stage ? `?mode=${encodeURIComponent(stage)}` : ''}`
                },
            }
        },
        result: {
            path: '/game/result',
            getHref: () => '/game/result'
        },
    },

} as const

export const imagePaths = {
    logo: '/logo/logo.png',
    favicon: '/logo/favicon.ico',
    desktop: {
        desktop: '/desktop/desktop.png',
        window: '/desktop/window.png',
    } ,
    usa: {
        normal: '/character/usa_normal.png',
        happy: '/character/usa_happy.png',
        cry: '/character/usa_cry.png',
        huh: '/character/usa_huh.png',
        hunter: '/character/usa_hunter.png',
    },
    icon: {
        file: '/icon/file_icon.png',
        editor: '/icon/editor_icon.png',
        home: '/icon/home_icon.png',
        mail: '/icon/mail_icon.png',
        mypage: '/icon/mypage_icon.png',
        yomimono: '/icon/yomimono_icon.png',
        settings: '/icon/settings_icon.png',
        gomibako: '/icon/gomibako_icon.png',
    },
    loading: {
        load1: '/loading/usa_loading_1.gif',
        load2: '/loading/usa_loading_2.gif',
    }

} as const