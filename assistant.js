
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("diagnosis-form");
  const input = document.getElementById("problem-input");
  const messages = document.getElementById("chat-messages");

  if (!form || !input || !messages) return;

  // Move chat below the input form.
  form.insertAdjacentElement("afterend", messages);

  function addMessage(text, sender) {
    const message = document.createElement("div");
    message.className = `chat-message ${sender}-message`;
    message.textContent = text;
    messages.appendChild(message);
    message.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  function diagnose(problem) {
    const p = problem.toLowerCase();

    if (/android|phone|samsung|tecno|infinix|redmi|xiaomi|oppo|pixel/.test(p)) {
      if (/battery|drain|charge|charging/.test(p)) {
        return `📱 ANDROID BATTERY TROUBLESHOOTING

1. Open Settings → Battery.
2. Check which apps use the most power.
3. Reduce unnecessary background activity.
4. Check your charging cable and adapter.
5. Restart your phone.

⚠️ If the phone or battery is swollen, stop using or charging it and seek professional help.

Does the battery drain quickly, or is the phone refusing to charge?`;
      }

      if (/hot|heat|overheat/.test(p)) {
        return `🌡️ ANDROID OVERHEATING

1. Stop demanding apps and games.
2. Move the phone away from direct sunlight.
3. Let it cool naturally.
4. Check for software updates.
5. Check battery usage for unusual activity.

⚠️ If the phone becomes extremely hot, switch it off and seek professional assistance.

Does it heat up while charging or gaming?`;
      }

      if (/slow|lag|freeze|hang/.test(p)) {
        return `⚡ ANDROID PERFORMANCE FIX

1. Restart your phone.
2. Check available storage.
3. Update Android and your apps.
4. Uninstall unused applications.
5. Close apps you don't need.
6. Check whether one particular app causes the slowdown.

What phone model are you using?`;
      }

      if (/storage|space|memory|full/.test(p)) {
        return `💾 ANDROID STORAGE FIX

1. Open Settings → Storage.
2. Remove unnecessary downloads.
3. Clear app caches where supported.
4. Back up important photos and videos.
5. Uninstall unused apps.

Avoid deleting unknown system files.

How much free storage does your phone have?`;
      }

      if (/wifi|wi-fi|internet|network|data/.test(p)) {
        return `🌐 ANDROID CONNECTION FIX

1. Toggle airplane mode on and off.
2. Restart your phone.
3. Check whether other devices can connect.
4. Restart your router if using Wi-Fi.
5. Check your mobile data settings if using cellular data.

Is the problem with Wi-Fi or mobile data?`;
      }

      if (/app|crash|open|close/.test(p)) {
        return `🛠️ ANDROID APP TROUBLESHOOTING

1. Restart the app.
2. Update it through the Play Store.
3. Check your internet connection.
4. Clear the app cache if supported.
5. Restart your phone.

Which app is causing the problem?`;
      }

      return `📱 ANDROID SUPPORT

I can help with:
• Battery and charging
• Overheating
• Slow performance
• Storage
• Wi-Fi and mobile data
• Crashing apps

Tell me your phone model and describe exactly what's happening.`;
    }

    if (/wifi|wi-fi|internet|network/.test(p)) {
      return `🌐 PC INTERNET TROUBLESHOOTING

1. Check your Wi-Fi connection.
2. Restart your router.
3. Restart your computer.
4. Run Windows Network Troubleshooter.
5. Check whether other devices connect.

Does your computer connect to Wi-Fi but show "No Internet"?`;
    }

    if (/slow|lag|freeze|hang|performance/.test(p)) {
      return `⚡ PC PERFORMANCE FIX

1. Restart your computer.
2. Open Task Manager with Ctrl + Shift + Esc.
3. Check CPU and memory usage.
4. Close unnecessary programs after saving your work.
5. Check available storage.
6. Install trusted system updates.

Does the problem happen when opening a specific app?`;
    }

    if (/storage|disk|space|full/.test(p)) {
      return `💾 PC STORAGE FIX

1. Open Windows Settings → System → Storage.
2. Review temporary files.
3. Uninstall unused applications.
4. Move important files to backed-up storage.
5. Empty the Recycle Bin after checking its contents.

How much free space do you have?`;
    }

    if (/battery|charging|charge|power/.test(p)) {
      return `🔋 PC POWER TROUBLESHOOTING

1. Check the charger and power connection.
2. Restart the laptop.
3. Check battery status in Windows.
4. Try a compatible, known-working charger if available.
5. Check for battery-related warnings.

⚠️ Stop using a device with a swollen battery or damaged charger.

Is your laptop not charging, or does the battery drain quickly?`;
    }

    if (/sound|audio|speaker|headphone/.test(p)) {
      return `🔊 PC AUDIO FIX

1. Check the volume.
2. Select the correct audio output.
3. Restart the application.
4. Run Windows Audio Troubleshooter.
5. Check for audio driver updates.

Are you using speakers or headphones?`;
    }

    return `🤖 FIXIT AI SUPPORT

I can help troubleshoot Windows computers and Android phones.

Please tell me:
1. Your device type and model.
2. What's going wrong.
3. When the problem started.
4. Any error message you see.

Example: "My Samsung phone keeps freezing when I open WhatsApp."`;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();

    const problem = input.value.trim();
    if (!problem) return;

    addMessage(problem, "user");
    addMessage(diagnose(problem), "assistant");

    input.value = "";
    input.focus();
  });

  document.querySelectorAll(".quick-issue").forEach(card => {
    card.addEventListener("click", () => {
      input.value = card.dataset.problem || card.textContent.trim();
      form.requestSubmit();
    });
  });
});
