// pages/_document.js

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        {/* Link to the manifest file */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Meta tags for theme color */}
        <meta name="theme-color" content="#f59e0b" />
        
        {/* Apple touch icon for iOS devices */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
