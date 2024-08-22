import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Francisco Ramos do Ó</title>
        <meta name="description" content="Francisco Ramos do Ó Personal Website" />
        <meta property="og:title" content="Francisco Ramos do Ó Personal Website" />
        <link rel="icon" href="/images/icon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {children}
    </>
  );
}
