function activateAICore() {
    const consoleContainer = document.getElementById('ai-console');
    const button = document.getElementById('activate-btn');
    consoleContainer.classList.toggle('hidden');
    if (!consoleContainer.classList.contains('hidden')) {
        button.innerText = "Deactivate AI Core";
        button.style.backgroundColor = "transparent";
        button.style.color = "#ff5f56";
        button.style.borderColor = "#ff5f56";
        button.style.boxShadow = "0 0 25px rgba(255, 95, 86, 0.5)";
    } else {
        button.innerText = "Activate AI Core";
        button.style.backgroundColor = "#00ffcc";
        button.style.color = "#0d1117";
        button.style.borderColor = "#00ffcc";
        button.style.boxShadow = "0 0 15px rgba(0, 255, 204, 0.3)";
    }
}

function switchTab(sectionName) {
    document.getElementById('sec-home').classList.add('hidden');
    document.getElementById('sec-projects').classList.add('hidden');
    document.getElementById('sec-labs').classList.add('hidden');
    document.getElementById('link-home').classList.remove('active');
    document.getElementById('link-projects').classList.remove('active');
    document.getElementById('link-labs').classList.remove('active');
    document.getElementById('sec-' + sectionName).classList.remove('hidden');
    document.getElementById('link-' + sectionName).classList.add('active');
}

// REAL LIVE ADVANCED OPEN AI NETWORKING MODULE
async function sendChatMessage() {
    const inputElement = document.getElementById('user-chat-input');
    const chatBox = document.getElementById('chat-box-display');
    const userText = inputElement.value.trim();

    if (userText === "") return;

    // 1. Post User Text to the window
    chatBox.innerHTML += `<p class="user-msg"><strong>You:</strong> ${userText}</p>`;
    inputElement.value = ""; 
    chatBox.scrollTop = chatBox.scrollHeight; 

    // 2. Display a temporary "Thinking..." bubble
    const loadingId = "msg-" + Date.now();
    chatBox.innerHTML += `<p class="bot-msg" id="${loadingId}">🤖 <strong>Core:</strong> Core system generating intelligent response...</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // 3. Directly target a raw open text inference pipeline
        const url = "https://pollinations.ai" + encodeURIComponent(userText) + "?system=You are the ultra-advanced AI core of Siddharth's BCA Portal. Act exactly like ChatGPT or Gemini. Be highly conversational, extremely smart, and helpful.";
        const response = await fetch(url);
        
        if (!response.ok) throw new Error("Network offline");
        const aiText = await response.text();

        // 4. Overwrite "Thinking..." with real AI generated response text block
        document.getElementById(loadingId).innerHTML = `🤖 <strong>Core:</strong> ${aiText.trim()}`;
        
    } catch (error) {
        document.getElementById(loadingId).innerHTML = `🤖 <strong>Core:</strong> API gateway routing error. Please re-send your command loop input parameters.`;
    }
    
    chatBox.scrollTop = chatBox.scrollHeight; 
}
