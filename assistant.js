
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("diagnosis-form");
  const input = document.getElementById("problem-input");
  const messages = document.getElementById("chat-messages");

  if (!form || !input || !messages) return;

  const guides = [
    {
      keywords: ["slow", "lag", "freez", "performance"],
      answer:
        "Your computer may be experiencing a performance issue.\n\n" +
        "1. Restart your computer.\n" +
        "2. Open Task Manager using Ctrl + Shift + Esc.\n" +
        "3. Check which apps are using the most memory or CPU.\n" +
        "4. Close unnecessary applications after saving your work.\n" +
        "5. Check available storage space.\n\n" +
        "Does the problem happen when opening a specific app?"
    },
    {
      keywords: ["wifi", "wi-fi", "internet", "network"],
      answer:
        "Let's troubleshoot your internet connection.\n\n" +
        "1. Check whether Wi-Fi is enabled.\n" +
        "2. Check whether other devices can connect.\n" +
        "3. Restart your computer.\n" +
        "4. Restart your router if you have permission.\n" +
        "5. Try reconnecting to your network.\n\n" +
        "Are other devices experiencing the same problem?"
    },
    {
      keywords: ["storage", "disk full", "space", "memory full"],
      answer:
        "Your computer may be running low on storage.\n\n" +
        "1. Open Windows Settings.\n" +
        "2. Select System, then Storage.\n" +
        "3. Review which categories use the most space.\n" +
        "4. Remove files you no longer need.\n" +
        "5. Empty the Recycle Bin only after checking its contents.\n\n" +
        "How much free storage does Windows show?"
    },
    {
      keywords: ["battery", "charging", "charger"],
      answer:
        "Let's check the charging issue safely.\n\n" +
        "1. Check the battery indicator in Windows.\n" +
        "2. Confirm the charger is connected properly.\n" +
        "3. Try a different working power outlet.\n" +
        "4. Restart the computer.\n" +
        "5. If the charger or battery is damaged, stop using it and seek qualified help.\n\n" +
        "Does Windows say the laptop is plugged in?"
    },
    {
      keywords: ["sound", "audio", "speaker", "volume"],
      answer:
        "Let's check your audio settings.\n\n" +
        "1. Make sure the computer isn't muted.\n" +
        "2. Check the selected audio output device.\n" +
        "3. Test sound in another application.\n" +
        "4. Disconnect unused headphones or Bluetooth speakers.\n" +
        "5. Run the Windows audio troubleshooter.\n\n" +
        "Is the problem happening in every application?"
    }
  ];

  function addMessage(content, type) {
    const message = document.createElement("div");
    message.className = "chat-message " + type + "-message";
    message.textContent = content;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function diagnose(problem) {
    const normalized = problem.toLowerCase();

    const match = guides.find(guide =>
      guide.keywords.some(keyword =>
        normalized.includes(keyword)
      )
    );

    if (match) return match.answer;

    return (
      "I can help you investigate that issue.\n\n" +
      "To narrow down the problem, please tell me:\n\n" +
      "1. Are you using Windows, macOS, or Linux?\n" +
      "2. When did the problem begin?\n" +
      "3. Do you see an error message?\n\n" +
      "This version currently provides guided troubleshooting " +
      "for common issues rather than live AI responses."
    );
  }

  form.addEventListener("submit", event => {
    event.preventDefault();

    const problem = input.value.trim();
    if (!problem) return;

    addMessage(problem, "user");
    input.value = "";

    addMessage(diagnose(problem), "assistant");
    
// Quick troubleshooting cards

document.querySelectorAll(".quick-issue").forEach(card => {
  card.addEventListener("click", () => {
    const problem = card.dataset.problem;

    input.value = problem;
    input.focus();

    // Use the existing diagnosis form.
    form.requestSubmit();
  });
});

  });
});
