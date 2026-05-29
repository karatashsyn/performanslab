export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/tum-yazilar?"],
      },
    ],
    sitemap: "https://performanslab.com/sitemap.xml",
  };
}
