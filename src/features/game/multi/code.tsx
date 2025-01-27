import MonacoEditor from "@monaco-editor/react";
import { useState } from "react";

export const MultiEditor = () => {
  const [tabs, setTabs] = useState([
    { id: 1, title: "Tab 1", content: "" },
    { id: 2, title: "Tab 2", content: "" },
  ]);
  const [activeTabId, setActiveTabId] = useState(1);

  const handleTabClick = (tabId: number) => {
    setActiveTabId(tabId);
  };
  
  const handleContentChange = (value: string | undefined) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === activeTabId ? { ...tab, content: value || "" } : tab
      )
    );
  };
  

  const addNewTab = () => {
    const newTabId = tabs.length + 1;
    setTabs((prevTabs) => [
      ...prevTabs,
      { id: newTabId, title: `Tab ${newTabId}`, content: "" },
    ]);
    setActiveTabId(newTabId);
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            style={{
              padding: "10px",
              backgroundColor: tab.id === activeTabId ? "#007BFF" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {tab.title}
          </button>
        ))}
        <button
          onClick={addNewTab}
          style={{
            padding: "10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          + Add Tab
        </button>
      </div>

      {/* Editor */}
      <div>
        {tabs.map(
          (tab) =>
            tab.id === activeTabId && (
              <div key={tab.id} style={{ border: "1px solid #ccc" }}>
                <MonacoEditor
                  height="400px"
                  language="javascript"
                  theme="vs-dark"
                  value={tab.content}
                  onChange={handleContentChange}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};
