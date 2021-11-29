module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["img.icons8.com"],
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
      {
        source: "/api/getAudio",
        headers: [
          {
            key: "Content-Type",
            value: "audio/mp3",
          },
        ],
      },
      {
        source: "/api/getVideo",
        headers: [
          {
            key: "Content-Type",
            value: "video/mp4",
          },
        ],
      },
    ];
  },
};
