import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState("");
  const [pastReviews, setPastReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) fetchPastReviews();
    console.log("token: ", token);
  }, [token]);

  

  return (
    <>
      <nav className="w-full max-w-screen-xl mx-auto bg-gray-800 p-4 shadow-lg border-b-2 border-white">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-blue-400 cursor-pointer hover:text-blue-500 transition duration-300">
            AI Code Reviewer
          </h1>
          <div className="flex items-center space-x-6">
            <button className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200">
              Dashboard
            </button>
            <button className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="h-screen flex bg-gray-900 text-white">
        {/* Sidebar */}
        <aside className="w-full sm:w-64 bg-gray-800 p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Previous Reviews</h2>
          <ul className="space-y-2 flex-1 overflow-auto">
            {pastReviews.length > 0 ? (
              pastReviews.map((item) => (
                <li
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering select
                    handleReviewClick(item);
                  }}
                  className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-500 flex justify-betweenn items-center"
                >
                  <span>{item.code.substring(0, 30)}...</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering select
                        handleEditReview(item);
                      }}
                      className="text-yellow-400 hover:text-yellow-500 cursor-pointer"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering select
                        deleteReview(item.id);
                      }}
                      className="text-red-400 hover:text-red-500 cursor-pointer"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-400">No reviews yet</p>
            )}
          </ul>
          {/* New Review Button */}
          <button
            onClick={handleCodeReview}
            className="mt-4 bg-blue-600 py-2 rounded hover:bg-blue-700"
          >
            New Review
          </button>
        </aside>

    </>
  );
}

export default App;