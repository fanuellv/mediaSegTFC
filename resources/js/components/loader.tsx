// resources/js/Components/Loader.jsx
import React from "react";
import '../../css/'; // cria este arquivo também

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
    </div>
  );
}
