import { useLocation } from "react-router-dom";

export const LearnMaterial = () => {
  const location = useLocation();
  const material = location.state as { title: string; pdfUrl: string }; // 型を直接指定

  if (!material) {
    return <p>教材が選択されていません。</p>;
  }

  return (
    <div>
      <main style={{ padding: "0px", fontFamily: "Arial, sans-serif" }}>

        <h2 style={{ marginTop: "10px", fontSize: "24px", fontWeight: "bold" }}>
          {material.title}
        </h2>

        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <iframe
            src={material.pdfUrl}
            style={{
              width: "100%",
              height: "800px",
              border: "none",
              borderRadius: "8px",
            }}
            title={material.title}
          />
        </div>
      </main>
    </div>
  );
};

