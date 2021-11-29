const ytdl = require("ytdl-core");

const url = "https://www.youtube.com/watch?v=DQWMCZRpXRg";

export default async function handler(req, res) {
  // download video from url and pipe it to response
  const stream = ytdl(url, {
    quality: "lowestaudio",
  });
  stream.on("error", (err) => {
    console.log(err);
  });
  stream.pipe(res);
}
