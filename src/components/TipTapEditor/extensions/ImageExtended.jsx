import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from "@tiptap/react";

export const ImageExtended = Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ImageNode);
  },
});

const ImageNode = ({ node, updateAttributes }) => {
  const { src, alt } = node.attrs;
console.log(node.attrs);
  return (
    <NodeViewWrapper>
      <NodeViewContent>
        <img src={src} alt={alt || src} style={{ width: "auto", height: "auto", margin: "0 auto"}} />
      </NodeViewContent>
    </NodeViewWrapper>
  );
};
