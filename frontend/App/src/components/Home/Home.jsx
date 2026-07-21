import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "prismjs/themes/prism-tomorrow.css";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaEdit,
  FaTrash,
  FaBrain,
} from "react-icons/fa";

import { BsStars } from "react-icons/bs";

function Home() {
  const [code, setCode] = useState(
`function sum() {
  return 1 + 1;
}`
  );
  const [review, setReview] = useState("");
  const [pastReviews, setPastReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadingMessages = [
    "🔍 Reading your code...",
    "⚡ Checking Performance...",
    "🔒 Looking for Security Issues...",
    "🧠 Applying Best Practices...",
    "🚀 Optimizing Your Code...",
    "✨ Preparing AI Suggestions..."
  ];

  const [loadingText, setLoadingText] =
    useState(loadingMessages[0]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/login" />;
  }
  useEffect(() => {
    fetchPastReviews();
  }, []);

  useEffect(() => {
    if (!loading) return;

    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % loadingMessages.length;
      setLoadingText(loadingMessages[index]);
    }, 1200);

    return () => clearInterval(interval);
  }, [loading]);

  async function fetchPastReviews() {
    try {
      const response = await axios.get(
        "http://localhost:4000/ai/past-prompts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPastReviews(response.data.prompts);
    } catch (error) {
      console.error(error);
    }
  }

  async function reviewCode() {
    try {
      setLoading(true);
      setReview("");

      const response = await axios.post(
        "http://localhost:4000/ai/get-review",
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReview(response.data.review);
      fetchPastReviews();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }



 


}

export default Home;