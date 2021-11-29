import { useEffect, useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const ffmpeg = createFFmpeg({ log: true });
import Loading from "../components/Loading";
import Head from "next/head";

const App = () => {
  const [ready, setReady] = useState(false);
  const [audio, setAudio] = useState("");
  const [video, setVideo] = useState("");
  const [vstart, setVstart] = useState("00:00:00");
  const [vend, setVend] = useState("01:00:00");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  const mergeAudioVideo = async () => {
    // check if video url and audio url are valid youtube urls
    if (
      !(
        video.includes("https://www.youtube.com/watch?v=") ||
        video.includes("https://youtu.be/")
      ) ||
      !(
        audio.includes("https://www.youtube.com/watch?v=") ||
        audio.includes("https://youtu.be/")
      )
    ) {
      alert("Please enter valid youtube urls");
      return;
    }

    setLoading(true);

    // merge audio and video using ffmpeg
    ffmpeg.FS(
      "writeFile",
      "video.mp4",
      await fetchFile(`api/getVideo?url=${video}`)
    );
    ffmpeg.FS(
      "writeFile",
      "audio.mp3",
      await fetchFile(`api/getAudio?url=${audio}`)
    );
    // merge audio and video using ffmpeg and trim it to first 10 seconds using run
    await ffmpeg.run(
      "-ss",
      vstart,
      "-i",
      "video.mp4",
      "-i",
      "audio.mp3",
      "-c:v",
      "copy",
      "-c:a",
      "aac",
      "-t",
      vend.length > 0 ? vend : "01:00:00",
      "-async",
      "1",
      "-map",
      "0:v",
      "-map",
      "1:a",
      "-shortest",
      "output.mp4"
    );

    const data = ffmpeg.FS("readFile", "output.mp4");
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
    setResult(url);
    setLoading(false);
  };

  return ready ? (
    <section className="flex flex-col gap-3">
      <Head>
        <title>
          YouTube tools — Generate WhatsApp status from YouTube URLs
        </title>
      </Head>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-base">Video URL</span>
        </label>
        <input
          type="text"
          onChange={(e) => setVideo(e.target.value.trim())}
          className="input input-bordered"
        />
      </div>
      <div className="collapse mt-2 border rounded-box border-base-300 collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title font-medium">Trim video (optional)</div>
        <div className="collapse-content">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Start time (HH-MM-SS)</span>
            </label>
            <input
              onChange={(e) => setVstart(e.target.value.trim())}
              value={vstart}
              className="input input-bordered mt-2"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">End time (HH-MM-SS)</span>
            </label>
            <input
              value={vend}
              onChange={(e) => setVend(e.target.value.trim())}
              className="input input-bordered mt-2"
            />
          </div>
        </div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-base">Audio URL</span>
        </label>
        <input
          type="text"
          onChange={(e) => setAudio(e.target.value.trim())}
          className="input input-bordered"
        />
      </div>

      <button
        onClick={mergeAudioVideo}
        disabled={loading}
        className="btn btn-secondary-focus mt-4"
      >
        merge
      </button>
      {result && (
        <div>
          <video
            className="w-full h-64"
            src={result}
            controls
            autoPlay
            playsInline
          />
          <a
            href={result}
            download
            className="btn btn-secondary mx-auto mt-4"
            type="button"
          >
            Download
          </a>
        </div>
      )}
    </section>
  ) : (
    <div className="grid place-items-center">
      <Head>
        <title>
          YouTube tools — Generate WhatsApp status from YouTube URLs
        </title>
      </Head>
      <Loading />
    </div>
  );
};

export default App;
