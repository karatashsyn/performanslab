import { createClient } from "@sanity/client";
import urlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "dtezafsg", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: "2024-03-28", // use a UTC date string
});

export const imgUrlBuilder = urlBuilder(client);

export default client;
