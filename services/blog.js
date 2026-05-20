import sanityClient from "@/lib/sanityClient";
import { cache } from "react";

const BLOG_FIELDS = `
  title, description, "titleImage": titleImage.asset->url, "slug": slug.current,
  "categories": categories[]->{title, value}, "date": _updatedAt, orderRank
`;

export const getBlogs = cache(async (searchKey = "") => {
  if (searchKey) {
    return sanityClient.fetch(
      `*[_type=='blog' && title match $search] | order(orderRank asc) {${BLOG_FIELDS}}`,
      { search: searchKey + "*" }
    );
  }
  return sanityClient.fetch(
    `*[_type=='blog'] | order(orderRank asc) {${BLOG_FIELDS}}`
  );
});

export const getBlogBySlug = cache(async (slug) => {
  if (!slug) return null;
  const res = await sanityClient.fetch(
    `*[_type=='blog' && slug.current == $slug] {
      title,
      description,
      seoDescription,
      "titleImage": titleImage.asset->url,
      "titleImageAlt": titleImage.alt,
      "slug": slug.current,
      "date": _updatedAt,
      publishedAt,
      "content": content[]{
        ...,
        _type == 'image' => {
          "url": asset->url,
          "alt": alt
        }
      }
    }`,
    { slug }
  );
  return res[0];
});

export const getFeaturedBlogs = cache(async (count = 4) => {
  const doc = await sanityClient.fetch(
    `*[_type=='featuredBlogs' && _id == 'featuredBlogs'][0] {
      "blogs": blogs[]->{${BLOG_FIELDS}}
    }`
  );

  const featured = doc?.blogs ?? [];

  if (featured.length >= count) {
    return featured.slice(0, count);
  }

  // Fallback: latest blogs ordered by date
  return sanityClient.fetch(
    `*[_type=='blog'] | order(_updatedAt desc) [0...${count}] {${BLOG_FIELDS}}`
  );
});

export const getLatestBlogs = cache(async () => {
  return sanityClient.fetch(
    `*[_type=='blog'] | order(_updatedAt desc) {${BLOG_FIELDS}}`
  );
});

export const getPerfTests = cache(async () => {
  return sanityClient.fetch(
    `*[_type=='blog' && 'performans-testi' in categories[]->value] | order(orderRank asc) {${BLOG_FIELDS}}`
  );
});
