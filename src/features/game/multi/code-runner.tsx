import { useEditor } from "@/hooks/useEditor";

export const MultiCodeRunner = () => {
    const {currentCode} = useEditor()
//   const completeCode = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8" />
//       <style>
//         ${cssCode}
//       </style>
//     </head>
//     <body>
//       ${htmlCode}
//       <script>
//         ${jsCode}
//       </script>
//     </body>
//     </html>
//   `;

  return (
    <div>
        {currentCode ? (
            <iframe
                style={{ width: "100%", height: "400px", border: "1px solid #ccc" }}
                sandbox="allow-scripts"
                srcDoc={currentCode}
                title="Code Runner"
            />
        ) : (
            <p>コードが入力されていません。</p>
        )}
    </div>
  );
};

