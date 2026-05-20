import React from "react";
import Player from "./Player";
import { PortableText } from "@portabletext/react";

export default function BlogText({ blog }) {
  const components = {
    block: {
      h1: ({ children }) => <h1 className="text-2xl">{children}</h1>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-[#CE0000]">{children}</blockquote>
      ),
      normal: ({ children }) => (
        <p style={{ color: "#09090B" }}>{children}</p>
      ),
    },
    marks: {
      link: ({ value, children }) => (
        <a
          href={value.href}
          target={value.blank ? "_blank" : "_self"}
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="text-[#09090B]">{children}</li>,
      checkmarks: ({ children }) => <li>✅ {children}</li>,
    },
    types: {
      youTube: ({ value }) => <Player url={value.url} />,
      image: ({ value }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value.url} alt={value.alt || ""} />
      ),
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
