import { BackgroundLayout } from "./background-layout"

export function WindowLayout({ children }: {children: React.ReactNode}) {

  return (
    // // <div>
    // //     <div style={{
    // //     backgroundImage: "url('../public/desktop/window.png')", 
    // //     backgroundSize: "contain",
    // //     backgroundRepeat: "no-repeat",
    // //     backgroundPosition: "center",
    // //     width: "100%",
    // //     height: "100%",
    // //     display: "flex",
    // //     justifyContent: "center",
    // //     alignItems: "center",
    // //     overflow: "hidden",
    // //   }}>
    // //         {children}
    // //     </div>
    // // </div>
    // <div
    //   style={{
    //     position: "relative",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundImage: "url('../public/desktop/window.png')", // 背景画像のパス
    //     backgroundSize: "contain",
    //     backgroundRepeat: "no-repeat",
    //     backgroundPosition: "center",
    //     width: "100%",
    //     height: "100%",
    //     overflow: "hidden", // 背景からのはみ出しを防ぐ
    //   }}
    // >
    //   <div
    //     style={{
    //       maxWidth: "90%",
    //       maxHeight: "90%",
    //       overflow: "auto", // 子要素が大きすぎる場合スクロールを有効化
    //       padding: "16px",
    //     }}
    //   >
    //     {children}
    //   </div>
    // </div>
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* 背景レイヤー */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <BackgroundLayout children={undefined}>
          {/* 必要に応じて背景の子要素を追加 */}
        </BackgroundLayout>
      </div>

      {/* フォアグラウンドのWindowLayout */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url('../public/desktop/window.png')", // 背景画像のパス
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          zIndex: 2, // 背景の上に配置
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "90%",
            maxHeight: "90%",
            overflow: "auto",
            padding: "16px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

