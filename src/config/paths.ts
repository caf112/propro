export const paths = {
    top: {
        path: '/',
    },

    admin: {
        path: '/file',
        getHref: () => '/file',
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
            path: '/mypage',
            getHref: () => '/mypage'
        },
        learn: {
            path: '/mypage/learn',
            getHref: () => '/mypage/learn'
        },
        material: {
            path: '/mypage/learn',
            getHref: (language?: string) => `/mypage/learn${language ? `?language=${encodeURIComponent(language)}` : ''}`
        },
    },

    game: {
        root: {
            path: '/game',
            getHref: () => '/game'
        },

        modeSelector: {
            path: '/game/modeSelect',
            getHref: () => '/game/modeSelect',
        },
        

        // シングルモード
        single: {
            stageSelector: {
                path: '/game/single/stages',
                getHref: () => '/game/single/stages'
            },
            play: {
                path: '/game/single/',
                getHref: (stage?: string) => `/game/single${stage ? `?stage=${encodeURIComponent(stage)}` : ''}`
            },
            result: {
                path: '/game/single/result',
                getHref: () => '/game/single/result'
            },

        },

        // マルチモード
        multi: {
            recruit: {
                path: '/game/multi/recruit',
                getHref: () => '/game/multi/recruit',
            },
            stageSelector: {
                path: '/game/multi/stages',
                getHref: () => '/game/multi/stages'
            },
            play: {
                path: '/game/multi',
                getHref: (stage?: string) => `/game/multi${stage ? `?stage=${encodeURIComponent(stage)}` : ''}`
            },
            result: {
                path: '/game/multi/result',
                getHref: () => '/game/multi/result'
            },
        },
    },

} as const

export const imagePaths = {
    logo: '/logo/logo.png',
    favicon: '/logo/favicon.ico',
    desktop: {
        desktop: '/desktop/desktop.png',
        window: '/desktop/window_v2.png',
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