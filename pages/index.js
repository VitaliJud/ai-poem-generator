import { useState } from "react";
import OutputDisplay from "../components/OutputDisplay";


export default function Home() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("traditional");
  const [type, setType] = useState("haiku");
  const [temperature, setTemperature] = useState(0.7);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, style, type, temperature }),
    });

    const data = await response.json();
    setResult(data.text || "Error generating content");
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🌸 AI Haiku Generator 🌸</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
        <select value={style} onChange={(e) => setStyle(e.target.value)}>
          <option value="traditional">Traditional</option>
          <option value="modern">Modern</option>
          <option value="funny">Funny</option>
          <option value="mystical">Mystical</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Haiku"}
        </button>
      </form>
      <OutputDisplay result={result} />
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: auto;
          text-align: center;
        }
        input, select, button {
          margin: 10px;
          padding: 10px;
        }
        .output {
          background: #f4f4f4;
          padding: 15px;
          border-radius: 8px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}