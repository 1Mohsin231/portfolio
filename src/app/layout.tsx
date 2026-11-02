import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mohsinbaba.dev"),
  title: {
    default: "Mohsin Baba | Senior Frontend & Full-Stack Engineer",
    template: "%s | Mohsin Baba",
  },
  description:
    "Senior Frontend & Full-Stack Architect with 3+ years of experience engineering high-performance Next.js 16 & React 19 web platforms, resilient MERN distributed systems, and sub-second Core Web Vitals. Proven track record scaling 10× traffic surges with zero downtime.",
  keywords: [
    "Mohsin Baba",
    "Senior Frontend Engineer",
    "Full-Stack Architect",
    "React 19 Architect",
    "Next.js 16 Specialist",
    "TypeScript",
    "MERN Stack Developer",
    "Tailwind CSS",
    "Redux Toolkit",
    "Zustand",
    "Core Web Vitals Specialist",
    "High Concurrency Web Systems",
    "Frontend Systems Architect",
  ],
  authors: [{ name: "Mohsin Baba", url: "https://mohsinbaba.dev" }],
  creator: "Mohsin Baba",
  publisher: "Mohsin Baba",
  alternates: {
    canonical: "https://mohsinbaba.dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohsinbaba.dev",
    siteName: "Mohsin Baba Portfolio",
    title: "Mohsin Baba | Senior Frontend & Full-Stack Architect",
    description:
      "Interactive enterprise portfolio of Mohsin Baba: architecture case studies, real-time traffic surge simulator, interactive terminal, and verified full-stack capabilities.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mohsin Baba - Senior Frontend & Full-Stack Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohsin Baba | Senior Frontend & Full-Stack Architect",
    description:
      "Senior Frontend & Full-Stack Architect specializing in Next.js 16, React 19, sub-second Core Web Vitals, and resilient MERN systems.",
    creator: "@mohsinbaba",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
      { url: "/logo.svg", sizes: "192x192", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.json",
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://mohsinbaba.dev/#person",
      "name": "Mohsin Baba",
      "alternateName": ["Mohsin", "Mohsin Baba Developer"],
      "jobTitle": "Senior Frontend & Full-Stack Architect",
      "url": "https://mohsinbaba.dev",
      "image": "https://mohsinbaba.dev/profile/avatar.png",
      "email": "mailto:1mohsinbaba@gmail.com",
      "telephone": "+916360463695",
      "sameAs": [
        "https://github.com/mohsinbaba",
        "https://linkedin.com/in/mohsinbaba",
        "https://twitter.com/mohsinbaba",
      ],
      "knowsAbout": [
        "Next.js 16 (App Router, Server Components, SSR, SSG)",
        "React 19 & TypeScript",
        "Full-Stack MERN Architecture (MongoDB, Express, React, Node.js)",
        "Modern State Architecture (Redux Toolkit, Zustand)",
        "Core Web Vitals & Sub-Second SLAs",
        "Tailwind CSS & Framer Motion",
        "Web Audio API & Interactive Canvas Visualizations",
        "High-Concurrency Traffic Scalability (10× Surges)",
        "RESTful & Webhook Microservices",
        "Docker & CI/CD Pipelines",
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Computer Science & Engineering",
      },
      "description":
        "Senior Frontend & Full-Stack Architect with 3+ years of experience engineering high-performance web systems, handling 10× traffic surges, and cutting page load times by 40%.",
    },
    {
      "@type": "WebSite",
      "@id": "https://mohsinbaba.dev/#website",
      "url": "https://mohsinbaba.dev",
      "name": "Mohsin Baba | Senior Frontend & Full-Stack Architect Portfolio",
      "description":
        "Enterprise engineering portfolio of Mohsin Baba showcasing interactive traffic simulators, production case studies, and modern UI/UX architecture.",
      "publisher": {
        "@id": "https://mohsinbaba.dev/#person",
      },
      "inLanguage": "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data for Rich Search Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {/* Scroll Position Reset & Anchor Hash Cleaner */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                if (window.location.hash) {
                  history.replaceState(null, '', window.location.pathname + window.location.search);
                }
                window.scrollTo(0, 0);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
