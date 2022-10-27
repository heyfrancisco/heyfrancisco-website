import Card from "../components/UI/Card";
import About from "../components/Text/About";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Francisco Ramos do Ó</title>
        <meta
          name="description"
          content="Francisco Ramos do Ó Personal Website"
        />
        <meta
          property="og:title"
          content="Francisco Ramos do Ó Personal Website"
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="bg-zinc-900">
        <Card>
          <About />
        </Card>
      </div>
    </>
  );
}
