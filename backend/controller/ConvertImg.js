import sharp from "sharp";
import archiver from "archiver";

export const ProgressEvents = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
res.flushHeaders(); // VERY IMPORTANT
  // Store SSE connection globally
   global.progress = res;
  // Send initial event
  res.write(`data: ${JSON.stringify({ progress: 0, status: "Uploading" })}\n\n`);
};
export const ConvertSingleImg = async (req, res) => {
  try {
    const { format, quality } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ⏳ 40% - Processing
    global.progress?.write(
      `data: ${JSON.stringify({ progress: 40, status: "Processing" })}\n\n`
    );

    // 🖼 Convert using .toFormat()
    const converted = sharp(req.file.buffer)
      .toFormat(format, { quality: Number(quality) || 80 });

    // ⏳ 80% - Converting
    global.progress?.write(
      `data: ${JSON.stringify({ progress: 80, status: "Converting" })}\n\n`
    );

    const buffer = await converted.toBuffer();

    // 🎉 100% - Completed
    global.progress?.write(
      `data: ${JSON.stringify({ progress: 100, status: "Completed" })}\n\n`
    );

    res.setHeader("Content-Type", `image/${format}`);
    res.send(buffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Conversion failed" });
  }
};


export const ConvertMultipleImg = async (req, res) => {
  try {
    const files = req.files;
    const { format, quality } = req.body;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // 40% - Processing files
    global.progress?.write(
      `data: ${JSON.stringify({ progress: 40, status: "Processing" })}\n\n`
    );

    // Prepare ZIP download
    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="Processed.zip"`
    );

    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(res);

    let count = 0;
    const total = files.length;

    for (let file of files) {
      const converted = await sharp(file.buffer)
        .toFormat(format, { quality: Number(quality) || 80 })
        .toBuffer();

      archive.append(converted, {
        name: `${file.originalname.split(".")[0]}.${format}`,
      });

      count++;

      const percent = Math.floor(40 + (count / total) * 40);

      global.progress?.write(
        `data: ${JSON.stringify({
          progress: percent,
          status: "Converting",
          file: file.originalname,
        })}\n\n`
      );
    }

    // 100% completed
    global.progress?.write(
      `data: ${JSON.stringify({ progress: 100, status: "Completed" })}\n\n`
    );

    archive.finalize();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Conversion failed" });
  }
};

