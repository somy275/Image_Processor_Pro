export const getCropRotateImage = (imageSrc, pixelCrop, rotation = 0) => {
  const image = new Image();
  image.crossOrigin = "anonymous";

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const radians = (rotation * Math.PI) / 180;

      const sin = Math.abs(Math.sin(radians));
      const cos = Math.abs(Math.cos(radians));

      // new bounding box after rotation
      const newWidth = image.width * cos + image.height * sin;
      const newHeight = image.height * cos + image.width * sin;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = newWidth;
      canvas.height = newHeight;

      // move origin to center
      ctx.translate(newWidth / 2, newHeight / 2);
      ctx.rotate(radians);
      ctx.drawImage(image, -image.width / 2, -image.height / 2);

      // now crop clean area
      const data = ctx.getImageData(
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height
      );

      // final canvas for output
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      ctx.putImageData(data, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) return reject("Canvas is empty");
        resolve(blob);
      }, "image/jpeg");
    };

    image.src = imageSrc;
  });
};
