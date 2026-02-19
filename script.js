const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 240;
const currentFrame = index => (
  `./ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

const images = [];
const airbnb = { frame: 0 };

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// Draw initial frame
images[0].onload = render;

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[airbnb.frame], 0, 0);
}

// Scroll listener for background animation
window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  airbnb.frame = frameIndex;
  render();
});

// --- Chatbot Logic ---
const SYSTEM_PROMPT = `You are an AI assistant for Shyam Roshan.S. 
Strictly answer only using the following details: 
Name: Shyam Roshan.S. Education: B.E. ECE III Year at GCE Tirunelveli (8 CGPA), Diploma in ECE (90%). 
Projects: Obstacle Avoiding Robot (Tech Expo 2024). 
Skills: C, Java, Full Stack, Word, Excel. 
Languages: English, Tamil, Kannada, Hindi. 
If asked anything outside these details, politely say you only have information regarding Shyam's professional resume.`;

const API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your actual key

document.getElementById('send-btn').addEventListener('click', async () => {
    const input = document.getElementById('user-input');
    const history = document.getElementById('chat-history');
    if (!input.value) return;

    history.innerHTML += `<div><b>You:</b> ${input.value}</div>`;
    
    // API Call to Gemini
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: SYSTEM_PROMPT + "\nUser Question: " + input.value }] }]
        })
    });

    const data = await response.json();
    const botText = data.candidates[0].content.parts[0].text;
    history.innerHTML += `<div><b>Bot:</b> ${botText}</div>`;
    input.value = '';
    history.scrollTop = history.scrollHeight;
});
