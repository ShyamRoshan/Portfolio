// --- SCROLL ANIMATION LOGIC ---
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

canvas.width = 1158;
canvas.height = 770;

const frameCount = 240;
const currentFrame = index => (
  `./frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

const images = [];
const airbnb = { frame: 0 };

for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

window.addEventListener("scroll", () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

const updateImage = index => {
  context.drawImage(images[index - 1], 0, 0);
};

// --- CHATBOT LOGIC ---
const API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your actual key
const SYSTEM_PROMPT = `You are an AI assistant for Shyam Roshan.S[cite: 1]. 
You must ONLY answer questions using the following data:
- Education: SSLC (90%), DECE (90%), B.E. ECE (8 CGPA) at GCE Tirunelveli[cite: 6].
- Skills: Word, Excel, PPT, C, JAVA, Full Stack Dev[cite: 14, 8].
- Projects: Obstacle Avoiding Robot (Tech Expo 2024)[cite: 10, 12].
- Languages: English, Tamil, Kannada, Hindi[cite: 18].
If asked something outside this, politely decline.`;

document.getElementById('send-btn').addEventListener('click', async () => {
    const input = document.getElementById('user-input').value;
    const history = document.getElementById('chat-history');
    
    if(!input) return;

    history.innerHTML += `<div><b>You:</b> ${input}</div>`;
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: `${SYSTEM_PROMPT}\nUser Question: ${input}` }] }]
        })
    });

    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;
    history.innerHTML += `<div><b>Bot:</b> ${reply}</div>`;
    document.getElementById('user-input').value = '';
});
