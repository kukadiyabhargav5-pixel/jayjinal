import "./globals.css";

export const metadata = {
  title: "Jay & Jinal | Engagement Ceremony - 10th May 2026",
  description:
    "You are cordially invited to celebrate the engagement ceremony of Jay & Jinal on Sunday, 10th May 2026. Join us for this beautiful celebration of love.",
  keywords:
    "Jay Jinal engagement, wedding invitation, engagement ceremony, 10 May 2026",
  authors: [{ name: "Jay & Jinal" }],
  openGraph: {
    title: "Jay & Jinal | Engagement Ceremony",
    description:
      "Celebrate the engagement of Jay & Jinal - Sunday, 10th May 2026",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
