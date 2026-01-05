import {
  ConvertMultipleImg,
  ConvertSingleImg
} from "../features/Image_Upload/ConvertImageSlice";

export const Convert_Images = (dispatch,Image_files,ImgFormat,quality) => {

  // ---------- Helper: Create Blob URL ----------
  const createBlobUrl = (blob) => URL.createObjectURL(blob);

  // ---------- Helper: Auto Download ----------
  const downloadFile = (url, fileName) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url); // cleanup
  };

  // ---------- Prepare FormData ----------
  const form = new FormData();
  form.append("format", ImgFormat);
  form.append("quality", quality);

  // ---------- SINGLE IMAGE ----------
  if (Image_files.length === 1) {
    const singleFile = Image_files[0].file ?? Image_files[0];
    form.append("Image", singleFile);

    dispatch(ConvertSingleImg(form)).then((res) => {
      if (!res.payload) return;

      const outputName = `${singleFile.name.split(".")[0]}.${ImgFormat}`;
      const blobUrl = createBlobUrl(res.payload);

      downloadFile(blobUrl, outputName);
    });
  }

  // ---------- MULTIPLE IMAGES ----------
  else {
    Image_files.forEach((item) =>
      form.append("Images", item.file ?? item)
    );

    dispatch(ConvertMultipleImg(form)).then((res) => {
      if (!res.payload) return;

      const blobUrl = createBlobUrl(res.payload);
      downloadFile(blobUrl, "Processed.zip");
    });
  }
};
