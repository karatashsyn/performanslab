export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/tum-yazilar?"],
      },
    ],
    sitemap: "https://www.performanslab.com/sitemap.xml",
  };
}
