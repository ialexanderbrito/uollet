export function createGradientColor(
  colorStart: string,
  colorMiddle: string,
  colorEnd?: string,
) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 500);

    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(0.5, colorMiddle);
    gradient.addColorStop(1, colorEnd || colorStart);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return gradient;
  } else {
    return colorStart;
  }
}
