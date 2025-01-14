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
    logo: './public/logo/logo.png',
    desktop: {
        desktop: './public/desktop.png',
        window: './public/window.png',
    } ,
    usa: {
        normal: './public/character/usa_normal.png',
        happy: './public/character/usa_happy.png',
        cry: './public/character/usa_cry.png',
        huh: './public/character/usa_huh.png',
        hunter: './public/character/usa_hunter.png',
    },
    icon: {
        file: './public/icon/file_icon.png',
        editor: './public/icon/editor_icon.png',
        home: './public/icon/home_icon.png',
        mail: './public/icon/mail_icon.png',
        mypage: './public/icon/mypage_icon.png',
        yomimono: './public/icon/yomimono_icon.png',
        settings: './public/icon/settings_icon.png',
        gomibako: './public/icon/gomibako_icon.png',
    },
    loading: {
        load1: './public/loading/usa_loading_1.gif',
        load2: './public/loading/usa_loading_2.gif',
    }

} as const