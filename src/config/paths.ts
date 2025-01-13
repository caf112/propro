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