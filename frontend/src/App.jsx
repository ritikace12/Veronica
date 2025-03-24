import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "./App.css";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { FaBars, FaDivide } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function App() {
  const [code, setCode] = useState(
    "function add() {\n  return 1 + 1;\n}"
  );
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setReview(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data, null, 2)
      );
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Failed to fetch review. Check the server.");
    } finally {
      setLoading(false);
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <span className="text-lime-500" p-2>⌭ </span>
           VERONICA
        </div>
        <ul className={`nav-links ${isMobileMenuOpen ? "mobile-menu" : ""}`}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a
              href="https://github.com/your-github-repo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub /> Github
            </a>
          </li>
        </ul>
        <div className="hamburger" onClick={toggleMobileMenu}>
          <FaBars />
        </div>
      </nav>

      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                borderRadius: "5px",
                border: "1px solid #ddd",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">
            Review
          </div>
        </div>

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

      <footer className="footer">
        Powered by PORTGAS <span className="text-lime-500">U!</span>
      </footer>
    </>
  );
}

export default App;