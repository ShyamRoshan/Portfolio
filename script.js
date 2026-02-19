const frameCount = 240;
const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

// Match canvas to screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Generate frame file path
const currentFrame = (index) => {
  const number = String(index).padStart(3, "0");
  return `frames/ezgif-frame-${number}.jpg`;
};

// Preload images
const images = [];
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// Draw first frame when loaded
images[0].onload = () => {
  context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
};

// Update frame based on scroll position
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScroll;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      images[frameIndex],
      0,
      0,
      canvas.width,
      canvas.height
    );
  });
});

// Resize support
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
