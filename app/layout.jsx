import ClientProvider from "../components/ClientProvider";

export const metadata = {
  verification: {
    google: "n12R1Sb_PZxuQp8FFNesjLj_2b2GhY2vFol_KLl1avA",
  },
  title: "Blue – Your AI Companion | Technovation Girls Project",
  description:
    "Blue is a safe AI companion for teens (ages 10-18) focusing on mental health support. Using evidence-based crisis detection (C-SSRS, PHQ-9, GAD-7), Blue provides compassionate conversation, connects users to local emergency resources in 190+ countries, and ensures safety with multi-layer verification. Created by 11-year-old Iris for Technovation Girls 2025/2026.",
  keywords:
    "Blue AI, safe AI for teens, teen mental health, AI companion, suicide prevention, crisis support, Technovation Girls, student AI project, Iris AI, mental health chatbot",
  authors: [{ name: "Iris" }],
  openGraph: {
    type: "website",
    title: "Blue – Safe AI Companion for Teen Mental Health | by Iris",
    description:
      "Blue is a safe AI companion for teens (ages 10-18) focusing on mental health support. Using evidence-based crisis detection (C-SSRS, PHQ-9, GAD-7), Blue connects users to local emergency resources in 190+ countries with multi-layer safety verification. Created by 11-year-old Iris for Technovation Girls.",
    images: [
      {
        url: "https://ucarecdn.com/3f6f7719-ebb2-47fd-9c49-65f04c6ea9e3/-/format/auto/",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue – Safe AI Companion for Teen Mental Health | by Iris",
    description:
      "Blue is a safe AI companion for teens (ages 10-18) focusing on mental health support. Using evidence-based crisis detection (C-SSRS, PHQ-9, GAD-7), Blue connects users to local emergency resources in 190+ countries with multi-layer safety verification. Created by 11-year-old Iris for Technovation Girls.",
    images: [
      "https://ucarecdn.com/3f6f7719-ebb2-47fd-9c49-65f04c6ea9e3/-/format/auto/",
    ],
  },
  icons: {
    icon: "https://ucarecdn.com/5e8c6bd4-3eb6-4b9f-8149-da7ac23a4468/-/format/auto/",
  },
  // Mobile optimization
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },
  themeColor: "#614BFF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Blue AI",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag - GT-5RFWFJ49 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GT-5RFWFJ49"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GT-5RFWFJ49');
            `,
          }}
        />

        {/* Google Analytics - G-EMQXZRRMS6 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-EMQXZRRMS6"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EMQXZRRMS6', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        <meta charSet="utf-8" />
        {/* Mobile-optimized viewport */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover"
        />
        <meta name="theme-color" content="#614BFF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Blue AI" />
        <meta name="format-detection" content="telephone=no" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        <meta
          name="google-site-verification"
          content="n12R1Sb_PZxuQp8FFNesjLj_2b2GhY2vFol_KLl1avA"
        />
        <title>Blue – Your AI Companion | Technovation Girls Project</title>
        <meta
          name="description"
          content="Blue is a safe AI companion for teens (ages 10-18) focusing on mental health support. Using evidence-based crisis detection (C-SSRS, PHQ-9, GAD-7), Blue provides compassionate conversation, connects users to local emergency resources in 190+ countries, and ensures safety with multi-layer verification. Created by 11-year-old Iris for Technovation Girls 2025/2026."
        />
        <meta
          name="keywords"
          content="Blue AI, safe AI for teens, teen mental health, AI companion, suicide prevention, crisis support, Technovation Girls, student AI project, Iris AI, mental health chatbot"
        />
        <meta name="author" content="Iris" />

        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Blue – Safe AI Companion for Teen Mental Health | by Iris"
        />
        <meta
          property="og:description"
          content="Blue is a safe AI companion for teens (ages 10-18) focusing on mental health support. Using evidence-based crisis detection (C-SSRS, PHQ-9, GAD-7), Blue connects users to local emergency resources in 190+ countries with multi-layer safety verification. Created by 11-year-old Iris for Technovation Girls."
        />
        <meta
          property="og:image"
          content="https://ucarecdn.com/3f6f7719-ebb2-47fd-9c49-65f04c6ea9e3/-/format/auto/"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Blue – Safe AI Companion for Teen Mental Health | by Iris"
        />
        <meta
          name="twitter:description"
          content="Blue is a safe AI companion for teens (ages 10-18) focusing on mental health support. Using evidence-based crisis detection (C-SSRS, PHQ-9, GAD-7), Blue connects users to local emergency resources in 190+ countries with multi-layer safety verification. Created by 11-year-old Iris for Technovation Girls."
        />
        <meta
          name="twitter:image"
          content="https://ucarecdn.com/3f6f7719-ebb2-47fd-9c49-65f04c6ea9e3/-/format/auto/"
        />

        {/* Resource hints for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://ucarecdn.com" />
        <link rel="dns-prefetch" href="https://tenor.googleapis.com" />

        {/* Optimized font loading */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Favicon */}
        <link
          rel="icon"
          type="image/png"
          href="https://ucarecdn.com/5e8c6bd4-3eb6-4b9f-8149-da7ac23a4468/-/format/auto/"
        />
        <link
          rel="apple-touch-icon"
          href="https://ucarecdn.com/5e8c6bd4-3eb6-4b9f-8149-da7ac23a4468/-/format/auto/"
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
        }}
      >
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
