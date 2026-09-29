"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Table, TableRow, TableHeader, TableCell } from "@tiptap/extension-table";
import { Youtube } from "@tiptap/extension-youtube";
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
  Table2,
  Video as YoutubeIcon,
  Undo2,
  Redo2,
  Eraser,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Figure } from "@/components/admin/editor/figure";

const imageTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];

/**
 * WYSIWYG editor for blog posts, announcements and newsletters. Writes HTML
 * into a hidden input named `name` so the surrounding form submits it.
 *
 * Images (toolbar, drag-and-drop or paste) upload to /api/upload and are
 * inserted as a figure with an inline caption; alt text is edited in the panel
 * that appears when an image is selected. Tables and YouTube embeds are
 * inserted from the toolbar.
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
  const editorRef = useRef<Editor | null>(null);

  async function uploadImage(file: File, pos?: number) {
    const editor = editorRef.current;
    if (!editor) return;
    if (!imageTypes.includes(file.type)) {
      toast.error("JPEG / PNG / WebP / AVIF の画像のみ挿入できます");
      return;
    }
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
        .setFigure({ src: data.url, alt: file.name.replace(/\.[^.]+$/, "") }, pos)
        .run();
      toast.success("画像を挿入しました", { id: t });
    } catch {
      toast.error("アップロードに失敗しました", { id: t });
    }
  }

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Figure,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({ nocookie: true, width: 640, height: 360 }),
      Placeholder.configure({ placeholder }),
    ],
    content: defaultValue,
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral max-w-none min-h-[360px] px-4 py-3 outline-none prose-headings:font-bold prose-img:rounded-lg prose-a:text-brand",
      },
      handleDrop: (view, event, _slice, moved) => {
        if (moved) return false;
        const files = Array.from(event.dataTransfer?.files ?? []).filter((f) =>
          f.type.startsWith("image/"),
        );
        if (files.length === 0) return false;
        event.preventDefault();
        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
        files.forEach((f) => void uploadImage(f, pos));
        return true;
      },
      handlePaste: (_view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []).filter((f) =>
          f.type.startsWith("image/"),
        );
        if (files.length === 0) return false;
        event.preventDefault();
        files.forEach((f) => void uploadImage(f));
        return true;
      },
    },
    onUpdate: ({ editor }) => setHtml(editor.isEmpty ? "" : editor.getHTML()),
  });

  useEffect(() => {
    editorRef.current = editor;
    return () => {
      editor?.destroy();
    };
  }, [editor]);

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

  function setYoutube() {
    if (!editor) return;
    const url = window.prompt(
      "YouTube動画のURLを入力してください",
      "https://www.youtube.com/watch?v=",
    );
    if (!url) return;
    const ok = editor.chain().focus().setYoutubeVideo({ src: url }).run();
    if (!ok) toast.error("YouTubeのURLとして認識できませんでした");
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <input type="hidden" name={name} value={html} />
      {editor && (
        <>
          <Toolbar
            editor={editor}
            onLink={setLink}
            onImage={() => fileRef.current?.click()}
            onYoutube={setYoutube}
          />
          <ImagePanel editor={editor} />
          <TablePanel editor={editor} />
        </>
      )}
      <input
        ref={fileRef}
        type="file"
        accept={imageTypes.join(",")}
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void uploadImage(f);
          e.target.value = "";
        }}
      />
      <EditorContent editor={editor} />
      <p className="text-muted-foreground border-t bg-gray-50 px-3 py-1.5 text-xs">
        画像はドラッグ＆ドロップや貼り付けでも挿入できます。画像の下にキャプションを入力できます。
      </p>
    </div>
  );
}

/** Alt-text editor, shown while an image or figure is selected. */
function ImagePanel({ editor }: { editor: Editor }) {
  const type = editor.isActive("figure") ? "figure" : editor.isActive("image") ? "image" : null;
  if (!type) return null;
  const alt = (editor.getAttributes(type).alt as string | null) ?? "";
  return (
    <div className="flex items-center gap-2 border-b bg-blue-50 px-3 py-2 text-sm">
      <label htmlFor="editor-alt" className="shrink-0 font-medium">
        画像の説明（alt）
      </label>
      <input
        id="editor-alt"
        value={alt}
        onChange={(e) => editor.chain().updateAttributes(type, { alt: e.target.value }).run()}
        placeholder="画像の内容を短く（検索エンジン・音声読み上げ用）"
        className="h-8 flex-1 rounded-md border bg-white px-2 outline-none"
      />
      <button
        type="button"
        onClick={() => editor.chain().focus().deleteSelection().run()}
        className="shrink-0 rounded-md px-2 py-1 text-red-600 hover:bg-red-50"
      >
        画像を削除
      </button>
    </div>
  );
}

/** Row and column controls, shown while the cursor is inside a table. */
function TablePanel({ editor }: { editor: Editor }) {
  if (!editor.isActive("table")) return null;
  const c = () => editor.chain().focus();
  const btn = "rounded-md border bg-white px-2 py-1 hover:bg-gray-100";
  return (
    <div className="flex flex-wrap items-center gap-1.5 border-b bg-blue-50 px-3 py-2 text-xs">
      <span className="mr-1 font-medium">表:</span>
      <button type="button" className={btn} onClick={() => c().addRowAfter().run()}>
        行を追加
      </button>
      <button type="button" className={btn} onClick={() => c().addColumnAfter().run()}>
        列を追加
      </button>
      <button type="button" className={btn} onClick={() => c().deleteRow().run()}>
        行を削除
      </button>
      <button type="button" className={btn} onClick={() => c().deleteColumn().run()}>
        列を削除
      </button>
      <button type="button" className={btn} onClick={() => c().toggleHeaderRow().run()}>
        見出し行の切替
      </button>
      <button
        type="button"
        className={cn(btn, "text-red-600")}
        onClick={() => c().deleteTable().run()}
      >
        表を削除
      </button>
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
  onYoutube,
}: {
  editor: Editor;
  onLink: () => void;
  onImage: () => void;
  onYoutube: () => void;
}) {
  const c = () => editor.chain().focus();

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b bg-gray-50 px-2 py-1.5">
      <Btn
        label="見出し（大）"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => c().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="size-4" />
      </Btn>
      <Btn
        label="見出し（小）"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => c().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="size-4" />
      </Btn>
      <Sep />
      <Btn label="太字" active={editor.isActive("bold")} onClick={() => c().toggleBold().run()}>
        <Bold className="size-4" />
      </Btn>
      <Btn label="斜体" active={editor.isActive("italic")} onClick={() => c().toggleItalic().run()}>
        <Italic className="size-4" />
      </Btn>
      <Btn
        label="下線"
        active={editor.isActive("underline")}
        onClick={() => c().toggleUnderline().run()}
      >
        <UnderlineIcon className="size-4" />
      </Btn>
      <Btn
        label="取り消し線"
        active={editor.isActive("strike")}
        onClick={() => c().toggleStrike().run()}
      >
        <Strikethrough className="size-4" />
      </Btn>
      <Sep />
      <Btn
        label="箇条書き"
        active={editor.isActive("bulletList")}
        onClick={() => c().toggleBulletList().run()}
      >
        <List className="size-4" />
      </Btn>
      <Btn
        label="番号付きリスト"
        active={editor.isActive("orderedList")}
        onClick={() => c().toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" />
      </Btn>
      <Btn
        label="引用"
        active={editor.isActive("blockquote")}
        onClick={() => c().toggleBlockquote().run()}
      >
        <Quote className="size-4" />
      </Btn>
      <Btn label="区切り線" onClick={() => c().setHorizontalRule().run()}>
        <Minus className="size-4" />
      </Btn>
      <Sep />
      <Btn label="リンク" active={editor.isActive("link")} onClick={onLink}>
        <LinkIcon className="size-4" />
      </Btn>
      <Btn
        label="リンク解除"
        disabled={!editor.isActive("link")}
        onClick={() => c().unsetLink().run()}
      >
        <Unlink className="size-4" />
      </Btn>
      <Btn label="画像を挿入" onClick={onImage}>
        <ImagePlus className="size-4" />
      </Btn>
      <Btn
        label="表を挿入"
        active={editor.isActive("table")}
        onClick={() => c().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
      >
        <Table2 className="size-4" />
      </Btn>
      <Btn label="YouTube動画を埋め込む" onClick={onYoutube}>
        <YoutubeIcon className="size-4" />
      </Btn>
      <Sep />
      <Btn label="書式をクリア" onClick={() => c().clearNodes().unsetAllMarks().run()}>
        <Eraser className="size-4" />
      </Btn>
      <Btn label="元に戻す" disabled={!editor.can().undo()} onClick={() => c().undo().run()}>
        <Undo2 className="size-4" />
      </Btn>
      <Btn label="やり直す" disabled={!editor.can().redo()} onClick={() => c().redo().run()}>
        <Redo2 className="size-4" />
      </Btn>
    </div>
  );
}
