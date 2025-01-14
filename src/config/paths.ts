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
        stageSelector: {
            path: '/game/stage-selector',
            getHref: (stage?: string) => `/game/stage-selector${stage ? `?stage={encodeURIComponent(stage)}` : ''}`,
        },
        play: {
            path: '/game/play',
            getHref: (mode?: string) => `/game/play${mode ? `?mode={encodeURIComponent(mode)}` : ''}`
        },
        result: {
            path: '/game/result',
            getHref: () => '/game/result'
        },
    },

} as const

export const imagePaths = {
    logo: './logo/logo.png',
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