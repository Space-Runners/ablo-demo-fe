// @ts-nocheck
export default function renderRotateLabel(ctx, state) {
  const angleText = `${state.angle.toFixed(0)}°`,
    borderRadius = 5,
    rectWidth = 32,
    rectHeight = 19,
    textWidth = 6.01 * angleText.length - 2.317;

  const pos = new fabric.Point(20, 20);

  ctx.save();
  ctx.translate(pos.x, pos.y);
  ctx.beginPath();
  ctx.fillStyle = 'rgba(37,38,39,0.9)';
  ctx.roundRect(0, 0, rectWidth, rectHeight, borderRadius);
  ctx.fill();
  ctx.font = '400 13px Roboto';
  ctx.fillStyle = 'hsla(0,0%, 100%, 0.9)';
  ctx.fillText(angleText, rectWidth / 2 - textWidth / 2, rectHeight / 2 + 4);
  ctx.restore();
}
