import Nav from "../components/Nav";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <main className="p-3 md:container md:mx-auto">
      <Nav />
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
