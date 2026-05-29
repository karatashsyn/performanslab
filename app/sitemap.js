import { getBlogs } from "@/services/blog";

export default async function sitemap() {
  const blogs = await getBlogs();
  const blogEntries = blogs.map((blog) => ({
    url: `https://www.performanslab.com/${blog.slug}`,
    lastModified: blog.date ? new Date(blog.date) : new Date(),
    priority: 0.9,
    changefreq: "weekly",
  }));
  return [
    { url: "https://www.performanslab.com/", priority: 1, changefreq: "weekly" },
    {
      url: "https://www.performanslab.com/arsiv",
      priority: 0.8,
      changefreq: "weekly",
    },
    {
      url: "https://www.performanslab.com/tum-yazilar",
      priority: 0.8,
      changefreq: "weekly",
    },
    {
      url: "https://www.performanslab.com/iletisim",
      priority: 0.6,
      changefreq: "monthly",
    },
    {
      url: "https://www.performanslab.com/ucretsiz-araclar",
      priority: 0.7,
      changefreq: "monthly",
    },
    {
      url: "https://www.performanslab.com/uygulamamiz",
      priority: 0.5,
      changefreq: "monthly",
    },
    {
      url: "https://www.performanslab.com/kvkk",
      priority: 0.2,
      changefreq: "yearly",
    },
    ...blogEntries,
  ];
}
