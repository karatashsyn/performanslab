import { getBlogs } from "@/services/blog";

export default async function sitemap() {
  const blogs = await getBlogs();
  const blogEntries = blogs.map((blog) => ({
    url: `https://performanslab.com/${blog.slug}`,
    lastModified: new Date(blog._updatedAt),
    priority: 0.9,
    changefreq: "weekly",
  }));
  return [
    {
      url: "https://performanslab.com/",
      priority: 1,
      changefreq: "weekly",
    },
    {
      url: "https://performanslab.com/iletisim",
      priority: 0.6,
      changefreq: "weekly",
    },
    {
      url: "https://performanslab.com/arsiv",
      priority: 0.8,
      changefreq: "weekly",
    },
    ...blogEntries,
  ];
}
