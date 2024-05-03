/* eslint-disable @next/next/no-img-element */
// import { PortableText } from "@portabletext/react";
import React from "react";
import Player from "./Player";
import { PortableText } from "@portabletext/react";

export default function BlogText({ blog }) {
  const components = {
    block: {
      // Ex. 1: customizing common block types
      h1: ({ children }) => <h1 className="text-2xl">{children}</h1>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-[#CE0000]">{children}</blockquote>
      ),
      normal: ({ children }) => (
        <p
          style={{
            color: "#09090B",
          }}
        >
          {children}
        </p>
      ),
    },
    listItem: {
      // Ex. 1: customizing common list types
      bullet: ({ children }) => <li className="text-[#09090B]">{children}</li>,

      // Ex. 2: rendering custom list items
      checkmarks: ({ children }) => <li>✅ {children}</li>,
    },
    types: {
      //TODO: Fix alt text
      youTube: ({ value }) => <Player url={value.url} />,
      image: ({ value }) => <img src={value.url} alt="related-img" />,
    },
  };
  return (
    <PortableText
      key={blog?.title}
      value={blog?.content}
      components={components}
    />
  );
}
