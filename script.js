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

// ULTRA-STABLE DISTRIBUTED AI PROCESSING NODE
async function sendChatMessage() {
    const inputElement = document.getElementById('user-chat-input');
    const chatBox = document.getElementById('chat-box-display');
    const userText = inputElement.value.trim();

    if (userText === "") return;

    chatBox.innerHTML += `<p class="user-msg"><strong>You:</strong> ${userText}</p>`;
    inputElement.value = ""; 
    chatBox.scrollTop = chatBox.scrollHeight; 

    const loadingId = "msg-" + Date.now();
    chatBox.innerHTML += `<p class="bot-msg" id="${loadingId}">🤖 <strong>Core:</strong> Core system generating intelligent response...</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // Step A: Request handshake token clearance
        const initResponse = await fetch("https://duckduckgo.com", {
            headers: { "x-vqd-accept": "1" }
        });
        const vqdToken = initResponse.headers.get("x-vqd-token");

        if (!vqdToken) throw new Error("Handshake failed");

        // Step B: Dispatch request payload straight to the server node cluster
        const chatResponse = await fetch("https://duckduckgo.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-vqd-token": vqdToken
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are the highly advanced AI core of Siddharth's BCA Portal. Act exactly like ChatGPT or Gemini. Be extremely smart and conversational." },
                    { role: "user", content: userText }
                ]
            })
        });

        const textData = await chatResponse.text();
        let fullAIResponse = "";
        
        // Step C: Clean up incoming network lines into clear human language text strings
        const lines = textData.split("\n");
        for (const line of lines) {
            if (line.startsWith("data: ")) {
                const dataStr = line.substring(6).trim();
                if (dataStr === "[DONE]") break;
                try {
                    const parsed = JSON.parse(dataStr);
                    if (parsed.message) fullAIResponse += parsed.message;
                } catch (e) { }
            }
        }

        if (fullAIResponse.trim() === "") throw new Error("Empty buffer payload");

        document.getElementById(loadingId).innerHTML = `🤖 <strong>Core:</strong> ${fullAIResponse.trim()}`;
        
    } catch (error) {
        // Robust secondary fallback system if networks fluctuate
        try {
            const secondaryResponse = await fetch("https://pollinations.ai" + encodeURIComponent(userText));
            const backupText = await secondaryResponse.text();
            document.getElementById(loadingId).innerHTML = `🤖 <strong>Core:</strong> ${backupText.trim()}`;
        } catch (fail) {
            document.getElementById(loadingId).innerHTML = `🤖 <strong>Core:</strong> Neural cluster synchronization pending. Please re-send your message string parameter layer.`;
        }
    }
    
    chatBox.scrollTop = chatBox.scrollHeight; 
}
