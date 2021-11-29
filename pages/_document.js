import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap"
            rel="stylesheet"
          ></link>
          <meta
            name="title"
            content="YouTube tools — Generate WhatsApp status from YouTube URLs"
          />
          <meta
            name="description"
            content="This is a tool that is used to generate WhatsApp status videos without downloading the actual videos."
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://yt-merger.vercel.app/" />
          <meta
            property="og:title"
            content="YouTube tools — Generate WhatsApp status from YouTube URLs"
          />
          <meta
            property="og:description"
            content="This is a tool that is used to generate WhatsApp status videos without downloading the actual videos."
          />
          <meta
            property="og:image"
            content="https://yt-merger.vercel.app/og.png"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://yt-merger.vercel.app/"
          />
          <meta
            property="twitter:title"
            content="YouTube tools — Generate WhatsApp status from YouTube URLs"
          />
          <meta
            property="twitter:description"
            content="This is a tool that is used to generate WhatsApp status videos without downloading the actual videos."
          />
          <meta
            property="twitter:image"
            content="https://yt-merger.vercel.app/og.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
