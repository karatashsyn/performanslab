import { getBlogs } from "@/services/blog";

export default async function sitemap() {
  const blogs = await getBlogs();
  const blogEntries = blogs.map((blog) => ({
    url: `https://www.performanslab.com/${blog.slug}`,
    lastModified: new Date(),
    priority: 0.9,
    changefreq: "weekly",
  }));
  return [
    {
      url: "https://www.performanslab.com/",
      priority: 1,
      changefreq: "weekly",
    },
    {
      url: "https://www.performanslab.com/iletisim",
      priority: 0.6,
      changefreq: "weekly",
    },
    {
      url: "https://www.performanslab.com/arsiv",
      priority: 0.8,
      changefreq: "weekly",
    },
    ...blogEntries,
  ];
}
