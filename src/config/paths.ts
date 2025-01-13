export const paths = {
    Top: {
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
        mypage: {
            path: 'mypage',
            getHref: () => '/mypage'
        },
    },

    game: {
        root: {
            path: 'game',
            getHref: () => '/game'
        },
        modeSelector: {
            path: 'game/mode-selector',
            getHref: () => '/game/mode-selector'
        },
        stageSelector: {
            path: 'game/stage-selector',
            getHref: () => '/game/stage-selector',
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