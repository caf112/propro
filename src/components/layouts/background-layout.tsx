export function BackgroundLayout({children}: {children:React.ReactNode}) {
  return (
    <div>
        <h1>BackendLayout</h1>
        <div
            // style={{
            //     position: "absolute", // レイヤーとして配置
            //     top: 0,
            //     left: 0,
            //     width: "100vw", // 画面全体をカバー
            //     height: "100vh",
            //     backgroundImage: "url('../public/desktop/desktop.png')", // 画像のパス
            //     backgroundSize: "cover", // 画面全体にフィット
            //     backgroundRepeat: "no-repeat",
            //     backgroundPosition: "center",
            //     zIndex: 0, // 他の要素の背面に配置
            //   }}
            style={{
                position: "absolute", // 背景レイヤーとして配置
                bottom: 0, // 左下に合わせる
                left: 0,
                width: "100vw", // 画面幅をカバー
                height: "100vh", // 画面高さをカバー
                backgroundImage: "url('../public/desktop/desktop.png')", // 背景画像のパス
                backgroundSize: "auto 100%", // 高さを画面にフィット、幅は自動調整
                backgroundRepeat: "no-repeat", // 繰り返さない
                backgroundPosition: "left bottom", // 左下に配置
                zIndex: 0, // 他の要素の背面に配置
              }}
            >
                
            {children}
        </div>
    </div>
  )
}

