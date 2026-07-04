import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "@monaco-editor/react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { motion } from "framer-motion";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

function Home() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState("");
  const [pastReviews, setPastReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // 🔒 PROTECTION (must be first logic)
  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    fetchPastReviews();
  }, []);

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

    setPastReviews(response.data.prompts); // ✅ FIX
  } catch (error) {
    console.error("Error fetching past reviews:", error);
  }
}

  async function reviewCode() {
    try {
      const response = await axios.post(
        "http://localhost:4000/ai/get-review",
        { code },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setReview(response.data.review || "");
      fetchPastReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  }

 async function updateReview(id) {
  try {
    const response = await axios.put(
      `http://localhost:4000/ai/past-prompts/${id}`,
      { code },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setReview(response.data.review);
    fetchPastReviews();
    setSelectedReview(null);
  } catch (error) {
    console.error("Error updating review:", error);
    console.log(error.response?.data);
  }
}

  async function deleteReview(id) {
    try {
      await axios.delete(
        `http://localhost:4000/ai/past-prompts/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchPastReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  }

  function handleEditReview(item) {
    setSelectedReview(item);
    setCode(item.code);
    setReview("");
  }

  function handleCodeReview() {
    setSelectedReview(null);
    setCode("");
    setReview("");
  }

  function handleReviewClick(item) {
    setSelectedReview(item);
    setCode(item.code);
    setReview(item.review);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
  <div className="min-h-screen bg-gray-900 text-white flex flex-col">
    {/* Navbar */}
    <nav className="w-full bg-gray-800 p-4 shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
     <h1 className="text-3xl font-bold tracking-wide">
  <span className="text-blue-400">🤖AI</span>
  <span className="text-green-400">CodePilot</span>
</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </nav>

    {/* Body */}
    <div className="flex flex-1 overflow-hidden">

      {/* Sidebar */}
<aside className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
  {/* Heading */}
  <div className="p-4 border-b border-gray-700">
    <h2 className="text-xl font-semibold">
      Previous Reviews
    </h2>
  </div>

  {/* Scrollable Reviews */}
  <div className="flex-1 overflow-y-auto p-4">
    <ul className="space-y-3">
      {pastReviews.length > 0 ? (
        pastReviews.map((item) => (
          <li
            key={item._id}
            onClick={() => handleReviewClick(item)}
            className="bg-gray-700 hover:bg-gray-600 cursor-pointer rounded-lg p-3 flex justify-between items-center transition"
          >
            <span className="truncate w-44">
              {item.code.substring(0, 25)}...
            </span>

            <div className="flex gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditReview(item);
                }}
                className="text-yellow-400 hover:text-yellow-300"
              >
                <FaEdit />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteReview(item._id);
                }}
                className="text-red-400 hover:text-red-300"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))
      ) : (
        <p className="text-gray-400">No reviews yet.</p>
      )}
    </ul>
  </div>



</aside>

      {/* Main */}
<main className="flex-1 flex flex-col w-full">

  {/* Editor + Review */}
  <div className="p-6 flex flex-col gap-6 flex-1 w-full">

    {/* Code Editor */}
  <div className="bg-gray-800 rounded-xl p-4 w-full">
      <h3 className="text-blue-400 mb-3 text-lg font-semibold">
        Your Code
      </h3>

      <Editor
        height="300px"
        language="javascript"
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
      />
    </div>

    {/* AI Review */}
    {/* Review */}
{review && (
  <div className="bg-gray-800 rounded-xl p-4 mt-4 w-full">
    <h3 className="text-green-400 text-2xl font-semibold mb-4">
      AI Review
    </h3>

    <div
      className="
        w-full
        h-[450px]
        overflow-y-auto
        bg-gray-900
        rounded-lg
        border
        border-gray-700
        p-6
      "
    >
      <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeHighlight]}
>
  {String(review)}
</ReactMarkdown>
    </div>
  </div>
)}

  </div>

   {/* Bottom Buttons */}
<div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
  <div className="flex justify-between items-center">
    <button
      onClick={handleCodeReview}
      className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-medium shadow-lg"
    >
      + New Review
    </button>

    {selectedReview ? (
      <button
        onClick={() => updateReview(selectedReview._id)}
        className="bg-yellow-500 hover:bg-yellow-600 transition px-6 py-3 rounded-lg font-medium shadow-lg"
      >
        Update Review
      </button>
    ) : (
      <button
        onClick={reviewCode}
        className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-lg font-medium shadow-lg"
      >
        Submit for Review
      </button>
    )}
  </div>
</div>

</main>
    </div>
  </div>
</>
  );
}

export default Home;