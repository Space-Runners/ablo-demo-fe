// @ts-nocheck
export default function renderRotateLabel(ctx, state) {
  const angleText = `${state.angle.toFixed(0)}°`,
    borderRadius = 5,
    rectWidth = 32 * 3,
    rectHeight = 19 * 3,
    textWidth = 16.01 * angleText.length - 2.317;

  const pos = new fabric.Point(60, 30);

  ctx.save();
  ctx.translate(pos.x, pos.y);
  ctx.beginPath();
  ctx.fillStyle = 'rgba(37,38,39,0.9)';
  ctx.roundRect(0, 0, rectWidth, rectHeight, borderRadius);
  ctx.fill();
  ctx.scaleX = 3;
  ctx.scaleY = 3;
  ctx.font = '400 30px Roboto';
  ctx.fillStyle = 'hsla(0,0%, 100%, 0.9)';
  ctx.fillText(angleText, rectWidth / 2 - textWidth / 2, rectHeight / 2 + 4);
  ctx.restore();
}
