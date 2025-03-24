import "./TipTapEditor.css";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { TextStyleExtended } from "./extensions/TextStyleExtended";

import { TipTapMenuBar } from "./TipTapMenuBar";

import { useState } from "react";

export const TipTapEditor = () => {
  const [content, setContent] = useState<string | null>(null);

  return (
    <div style={{ border: "1px solid #ccc" }}>
      <EditorProvider
        slotBefore={<TipTapMenuBar />}
        extensions={extensions}
        content={content}
        onUpdate={(c: any) => setContent(c)}
        editorProps={{
          attributes: {
            class:
              "flex-1 min-h-[450px] max-h-[560px] overflow-y-auto max-w-[800px] mx-auto p-2 bg-[#F9FAFB] outline-0",
          },
        }}
      ></EditorProvider>
    </div>
  );
};

const extensions = [
  FontFamily,
  Underline,
  TextStyleExtended,
  Image.configure({
    inline: true,
    allowBase64: true,
    HTMLAttributes: {
      class: "w-auto h-auto mx-auto",
    },
  }),
  Youtube.configure({
    nocookie: true,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // TextStyleExtended.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "pl-4",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "pl-4",
      },
    },
    paragraph: {
      HTMLAttributes: {
        class: "min-h-[1rem]",
      },
    },
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],
    isAllowedUri: (url, ctx) => {
      try {
        // construct URL
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`${ctx.defaultProtocol}://${url}`);

        // use default validation
        if (!ctx.defaultValidate(parsedUrl.href)) {
          return false;
        }

        // disallowed protocols
        const disallowedProtocols = ["ftp", "file", "mailto"];
        const protocol = parsedUrl.protocol.replace(":", "");

        if (disallowedProtocols.includes(protocol)) {
          return false;
        }

        // only allow protocols specified in ctx.protocols
        const allowedProtocols = ctx.protocols.map((p) =>
          typeof p === "string" ? p : p.scheme
        );

        if (!allowedProtocols.includes(protocol)) {
          return false;
        }

        // disallowed domains
        const disallowedDomains = [
          "example-phishing.com",
          "malicious-site.net",
        ];
        const domain = parsedUrl.hostname;

        if (disallowedDomains.includes(domain)) {
          return false;
        }

        // all checks have passed
        return true;
      } catch {
        return false;
      }
    },
    shouldAutoLink: (url) => {
      try {
        // construct URL
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`https://${url}`);

        // only auto-link if the domain is not in the disallowed list
        const disallowedDomains = [
          "example-no-autolink.com",
          "another-no-autolink.com",
        ];
        const domain = parsedUrl.hostname;

        return !disallowedDomains.includes(domain);
      } catch {
        return false;
      }
    },
  }),
];
