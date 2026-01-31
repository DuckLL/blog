import React from "react";

export default function BlogCard({ name, url, logo, description }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
        backgroundColor: "var(--ifm-card-background-color)",
      }}
    >
      <img
        src={`${logo}`}
        style={{ borderRadius: "50%", width: "60px", marginRight: "15px" }}
      />
      <div>
        <a href={`${url}`} target="_blank" rel="noopener noreferrer">
          <h3 style={{ margin: 0 }}>{name}</h3>
        </a>
        <p style={{ margin: 0 }}>{description}</p>
      </div>
    </div>
  );
}
