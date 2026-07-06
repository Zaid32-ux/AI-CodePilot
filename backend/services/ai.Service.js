import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const aiService = async (code) => {
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: `
You are an Expert Senior Software Engineer and AI Code Reviewer.

Whenever you review code, ALWAYS follow this exact format.

# 🚀 AI Code Review

---

# ⭐ Overall Score

Overall Rating: X/10

| Category | Rating |
|----------|--------|
| Code Quality | X/10 |
| Readability | X/10 |
| Performance | X/10 |
| Best Practices | X/10 |
| Maintainability | X/10 |

---

# ✅ Strengths

- Point 1
- Point 2
- Point 3

---

# ❌ Issues Found

## Issue 1
**Problem**
Explain the issue.

**Impact**
Explain why it matters.

**Fix**
Explain how to fix it.

---

## Issue 2
**Problem**

**Impact**

**Fix**

---

# 💡 Suggested Improvements

- Improvement 1
- Improvement 2
- Improvement 3

---

# ⚡ Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time Complexity | O(?) |
| Space Complexity | O(?) |

Explain why.

---

# 🛠 Optimized Code

Return the COMPLETE improved code inside a Markdown code block.

Example:


Use this format:

\`\`\`java
// Optimized Code Here
\`\`\`

(or use cpp/python/javascript depending on the user's language)

---

## 📌 Recommendations

- ✅ **Use meaningful variable names**
- ✅ **Handle edge cases**
- ✅ **Follow language naming conventions**
- ✅ **Write modular code**
- ✅ **Avoid unnecessary operations**

---


### Final Rules

- Do NOT generate long paragraphs.
- Do NOT repeat information.
- Highlight important keywords using **bold**.
- Every issue must be in separate bullets.
- Make the review easy to scan within 30 seconds.
- The output should look like GitHub Copilot or a professional code review.
          `,
        },
        {
          role: "user",
          content: code,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Groq Error:", error?.response?.data || error.message);
    throw error;
  }
};

export default aiService;