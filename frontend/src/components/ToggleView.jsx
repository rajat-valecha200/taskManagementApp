import React from "react";

const ToggleView = ({ view, setView }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => setView("card")}
        className={`px-3 py-1 border rounded ${view === "card" ? "bg-blue-500 text-white" : ""}`}
      >
        Card
      </button>
      <button
        onClick={() => setView("list")}
        className={`px-3 py-1 border rounded ${view === "list" ? "bg-blue-500 text-white" : ""}`}
      >
        List
      </button>
    </div>
  );
};

export default ToggleView;