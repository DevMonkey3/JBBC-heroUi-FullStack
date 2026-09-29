"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extensions";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link as LinkIcon,
  Unlink,
  ImagePlus,
  Undo2,
  Redo2,
  Eraser,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/**
 * WYSIWYG editor for blog posts, announcements and newsletters. Writes HTML
 * into a hidden input named `name` so the surrounding form submits it.
 * Images upload to /api/upload and are inserted at the cursor.
 */
export function RichTextEditor({
  name,
  defaultValue = "",
  placeholder = "本文を入力…",
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const [html, setHtml] = useState(defaultValue);
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: defaultValue,
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral max-w-none min-h-[360px] px-4 py-3 outline-none prose-headings:font-bold prose-img:rounded-lg prose-a:text-brand",
      },
    },
    onUpdate: ({ editor }) => setHtml(editor.isEmpty ? "" : editor.getHTML()),
  });

  useEffect(() => () => editor?.destroy(), [editor]);

  async function uploadImage(file: File | undefined) {
    if (!file || !editor) return;
    const body = new FormData();
    body.append("file", file);
    const t = toast.loading("画像をアップロード中…");
    try {
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? "upload_failed");
      editor
        .chain()
        .focus()
        .setImage({ src: data.url, alt: file.name.replace(/\.[^.]+$/, "") })
        .run();
      toast.success("画像を挿入しました", { id: t });
    } catch {
      toast.error("アップロードに失敗しました", { id: t });
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function setLink() {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("リンク先のURLを入力してください", prev ?? "https://");
    if (url === null) return;
    if (url === "" || url === "https://") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <input type="hidden" name={name} value={html} />
      {editor && (
        <Toolbar editor={editor} onLink={setLink} onImage={() => fileRef.current?.click()} />
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="sr-only"
        onChange={(e) => uploadImage(e.target.files?.[0])}
      />
      <EditorContent editor={editor} />
    </div>
  );
}

function Btn({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "grid size-8 place-items-center rounded-md text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-40",
        active && "bg-brand-soft text-brand-dark",
      )}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <span className="mx-1 h-6 w-px bg-gray-200" aria-hidden />;
}

function Toolbar({
  editor,
  onLink,
  onImage,
}: {
  editor: Editor;
  onLink: () => void;
  onImage: () => void;
}) {
  const c = editor.chain().focus();

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b bg-gray-50 px-2 py-1.5">
      <Btn
        label="見出し（大）"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => c.toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="size-4" />
      </Btn>
      <Btn
        label="見出し（小）"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => c.toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="size-4" />
      </Btn>
      <Sep />
      <Btn label="太字" active={editor.isActive("bold")} onClick={() => c.toggleBold().run()}>
        <Bold className="size-4" />
      </Btn>
      <Btn label="斜体" active={editor.isActive("italic")} onClick={() => c.toggleItalic().run()}>
        <Italic className="size-4" />
      </Btn>
      <Btn
        label="下線"
        active={editor.isActive("underline")}
        onClick={() => c.toggleUnderline().run()}
      >
        <UnderlineIcon className="size-4" />
      </Btn>
      <Btn
        label="取り消し線"
        active={editor.isActive("strike")}
        onClick={() => c.toggleStrike().run()}
      >
        <Strikethrough className="size-4" />
      </Btn>
      <Sep />
      <Btn
        label="箇条書き"
        active={editor.isActive("bulletList")}
        onClick={() => c.toggleBulletList().run()}
      >
        <List className="size-4" />
      </Btn>
      <Btn
        label="番号付きリスト"
        active={editor.isActive("orderedList")}
        onClick={() => c.toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" />
      </Btn>
      <Btn
        label="引用"
        active={editor.isActive("blockquote")}
        onClick={() => c.toggleBlockquote().run()}
      >
        <Quote className="size-4" />
      </Btn>
      <Btn label="区切り線" onClick={() => c.setHorizontalRule().run()}>
        <Minus className="size-4" />
      </Btn>
      <Sep />
      <Btn label="リンク" active={editor.isActive("link")} onClick={onLink}>
        <LinkIcon className="size-4" />
      </Btn>
      <Btn
        label="リンク解除"
        disabled={!editor.isActive("link")}
        onClick={() => c.unsetLink().run()}
      >
        <Unlink className="size-4" />
      </Btn>
      <Btn label="画像を挿入" onClick={onImage}>
        <ImagePlus className="size-4" />
      </Btn>
      <Sep />
      <Btn label="書式をクリア" onClick={() => c.clearNodes().unsetAllMarks().run()}>
        <Eraser className="size-4" />
      </Btn>
      <Btn label="元に戻す" disabled={!editor.can().undo()} onClick={() => c.undo().run()}>
        <Undo2 className="size-4" />
      </Btn>
      <Btn label="やり直す" disabled={!editor.can().redo()} onClick={() => c.redo().run()}>
        <Redo2 className="size-4" />
      </Btn>
    </div>
  );
}
