import { Node, mergeAttributes } from "@tiptap/core";

export type FigureAttrs = { src: string; alt?: string | null };

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    figure: {
      /** Insert an image with an editable caption at the cursor (or at `pos`). */
      setFigure: (attrs: FigureAttrs, pos?: number) => ReturnType;
    };
  }
}

/**
 * `<figure><img><figcaption>…</figcaption></figure>`: an image whose caption
 * is typed inline. The image itself is not editable; alt text is set through
 * the toolbar panel.
 */
export const Figure = Node.create({
  name: "figure",
  group: "block",
  content: "inline*",
  draggable: true,
  isolating: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure",
        contentElement: "figcaption",
        getAttrs: (dom) => {
          const img = (dom as HTMLElement).querySelector("img");
          return img ? { src: img.getAttribute("src"), alt: img.getAttribute("alt") } : false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "figure",
      ["img", mergeAttributes(HTMLAttributes, { draggable: "false", contenteditable: "false" })],
      ["figcaption", 0],
    ];
  },

  addCommands() {
    return {
      setFigure:
        (attrs, pos) =>
        ({ chain }) => {
          const node = { type: this.name, attrs, content: [] };
          return pos === undefined
            ? chain().insertContent(node).run()
            : chain().insertContentAt(pos, node).run();
        },
    };
  },
});
