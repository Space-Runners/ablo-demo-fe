import { toPng } from 'html-to-image';

const getTemplateImgFromHtml = async (element) => {
  // We have to do multiple calls before the actual call because the library has a concurrency issue on mobile Safari
  await toPng(element, { cacheBust: false });
  await toPng(element, { cacheBust: false });
  await toPng(element, { cacheBust: false });

  return toPng(element, { cacheBust: false });
};

const getEditorStateAsImages = () => {
  /*
   * The exporting library requires both sides of the template to be visible in the DOM.
   * We have to make them temporarily visible and then hide them.
   */
  const front = document.getElementById('#canvas-container-front');
  const back = document.getElementById('#canvas-container-back');

  const frontCanvas = document.getElementById('canvas-front');
  const backCanvas = document.getElementById('canvas-back');

  const frontOld = front.style.display;
  const backOld = back.style.display;

  front.style.display = 'block';
  back.style.display = 'block';

  const promises = [front, frontCanvas, back, backCanvas].map((element) =>
    getTemplateImgFromHtml(element)
  );

  const reset = () => {
    front.style.display = frontOld;
    back.style.display = backOld;
  };

  return Promise.all(promises).then((dataUrls) => {
    reset();

    return dataUrls;
  });
};

export default getEditorStateAsImages;
