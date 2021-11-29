const ytdl = require("ytdl-core");

export default async function handler(req, res) {
  const { url } = req.query || null;

  // download video from url and pipe it to response
  const stream = ytdl(url, {
    quality: "highestvideo",
  });
  stream.on("error", (err) => {
    res.status(500).json({ error: err.message });
  });
  stream.pipe(res);
}
