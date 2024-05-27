import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <Link
          href="//vjs.zencdn.net/8.3.0/video-js.min.css"
          rel="stylesheet"
        ></Link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
