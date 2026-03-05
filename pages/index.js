import Head from "next/head";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>האתר החדש</title>
        <meta name="description" content="אתר משודרג" />
      </Head>

      <Hero />
      <Features />
      <Footer />
    </>
  );
}
