document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://fixit-ai-brain.leoamenya82.workers.dev/";

  const form = document.getElementById("diagnosis-form");
  const input = document.getElementById("problem-input");
  const messages = document.getElementById("chat-messages");

  if (!form || !input || !messages) return;

  const history = [];

  function addMessage(text, sender) {
    const message = document.createElement("div");
    message.className = `chat-message ${sender}-message`;
    message.textContent = text;
    messages.appendChild(message);
  }

  async function askAI(problem) {
    history.push({
      role: "user",
      content: problem
    });

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: history.slice(-8)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI request failed");
      }

      const reply = data.reply || "I couldn't generate a response.";

      history.push({
        role: "assistant",
        content: reply
      });

      addMessage(reply, "assistant");

    } catch (error) {
      console.error("FIXIT AI error:", error);
      addMessage(
        "⚠️ I couldn't connect to FIXIT AI. Please try again in a moment.",
        "assistant"
      );
    }
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();
    document.body.classList.add("chat-active");
    
document.querySelector(".diagnosis-section")
  .classList.add("conversation-mode");
    
    const problem = input.value.trim();
    if (!problem) return;

    addMessage(problem, "user");

    input.value = "";
    input.disabled = true;

    await askAI(problem);

    input.disabled = false;
    input.focus();
  });

  document.querySelectorAll(".quick-issue").forEach(card => {
    card.addEventListener("click", () => {
      if (input.disabled) return;

      input.value = card.dataset.problem || card.textContent.trim();
      form.requestSubmit();
    });
  });
});
