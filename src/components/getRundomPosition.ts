export function getRundomPosition() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const x = Math.floor(Math.random() * screenWidth);
  const y = Math.floor(Math.random() * screenHeight);

  return { x, y };
}
