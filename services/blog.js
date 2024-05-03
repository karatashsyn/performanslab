import sanityClient, { imgUrlBuilder } from "@/lib/sanityClient";
import { cache } from "react";
export const getBlogs = cache(async (searchKey = "") => {
  const res = await sanityClient.fetch(
    `*[_type=='blog' && categories[] == null || !('performans-testi' in categories[]->value) ]  | order(orderRank asc) {
          title, smallDescription, "titleImage": titleImage.asset->url,"slug":slug.current, 'categories': categories[]->{title, value}, 'date':_updatedAt, orderRank
        }`
  );
  return res.filter((b) => {
    return b.title.toLowerCase().includes(searchKey.toLowerCase());
  });
});

export const getBlogBySlug = cache(async (slug) => {
  if (!slug) return null;
  const res = await sanityClient.fetch(
    `*[_type=='blog' && slug.current == $slug] {
            title,smallDescription,"titleImage": titleImage.asset->url,"slug":slug.current,"content":content[]{
                ...,
                _type == 'image' => {
                "url": asset->url
                }
            }
            }`,
    { slug }
  );
  return res[0];
});

export const getPerfTests = cache(async () => {
  const res = await sanityClient.fetch(
    `*[_type=='blog' && 'performans-testi' in categories[]->value ] | order(orderRank asc) {
          title, "summary":smallDescription, "titleImage": titleImage.asset->url,"slug":slug.current, 'categories': categories[]->{title, value} , 'date':_updatedAt, orderRank
        }`
  );
  return res;
});
