// ========================== IMPORTS ==========================
import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css"; // Dark theme for code highlighting
import Editor from "react-simple-code-editor"; // Simple code editor
import Prism from "prismjs"; // Syntax highlighting
import "prismjs/components/prism-javascript"; // Support for JavaScript syntax

import "./App.css"; // Custom styles
import axios from "axios"; // API requests
import Markdown from "react-markdown"; // Markdown renderer
import rehypeHighlight from "rehype-highlight"; // Syntax highlighting for Markdown
import "highlight.js/styles/github-dark.css"; // Dark theme for markdown code blocks

// Icons for UI elements
import { FaBars, FaGithub } from "react-icons/fa";

function App() {
  // ========================== STATE ==========================
  const [code, setCode] = useState(`function add() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState(""); // AI-generated review
  const [loading, setLoading] = useState(false); // Loading state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state

  // ========================== SYNTAX HIGHLIGHTING ==========================
  useEffect(() => {
    Prism.highlightAll(); // Apply PrismJS syntax highlighting
  }, [code]);

  // ========================== REVIEW CODE FUNCTION ==========================
  const reviewCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", { code });
      setReview(typeof response.data === "string" ? response.data : JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Failed to fetch review. Check the server.");
    } finally {
      setLoading(false);
    }
  };

  // ========================== MOBILE MENU TOGGLE ==========================
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // ========================== UI COMPONENTS ==========================
  return (
    <>
      {/* ========== Navbar ========== */}
      <nav className="navbar">
        <div className="logo">
         VERONICA
        </div>

        <ul className={`nav-links ${isMobileMenuOpen ? "mobile-menu" : ""}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li>
            <a href="https://github.com/your-github-repo" target="_blank" rel="noopener noreferrer">
              <FaGithub /> Github
            </a>
          </li>
        </ul>

        {/* Hamburger menu button */}
        <div className="hamburger" onClick={toggleMobileMenu}>
          <FaBars />
        </div>
      </nav>

      {/* ========== Main Content ========== */}
      <main>
        {/* Left Section (Code Editor) */}
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 12,
                borderRadius: "5px",
                border: "1px solid #ddd",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <button onClick={reviewCode} className="review-button">Review Code</button>
        </div>

        {/* Right Section (AI Review Output) */}
        <div className="right">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review || "Click 'Review' to analyze the code"}
            </Markdown>
          )}
        </div>
      </main>

      {/* ========== Footer ========== */}
      <footer class="footer">
  <h2>
    Powered by PORTGAS<span> U!</span>
  </h2>
</footer>

    </>
  );
}

export default App;