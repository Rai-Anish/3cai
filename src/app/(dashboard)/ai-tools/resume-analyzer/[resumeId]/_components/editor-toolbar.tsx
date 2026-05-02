"use client";

import type { ChangeEvent } from "react";
import type { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Redo2,
  Rows3,
  Table,
  Trash2,
  Type,
  UnderlineIcon,
  Undo2,
} from "lucide-react";
import { ToolButton } from "./tool-button";

const fontFamilies = [
  { label: "Default", value: "" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Times", value: '"Times New Roman", serif' },
  { label: "Helvetica", value: "Helvetica, Arial, sans-serif" },
  { label: "Courier", value: '"Courier New", monospace' },
];

const fontSizes = ["10px", "11px", "12px", "13px", "14px", "16px", "18px", "20px", "24px", "28px", "32px"];

export function EditorToolbar({ editor }: { editor: Editor }) {
  function setLink() {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Paste URL", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  function setFontFamily(event: ChangeEvent<HTMLSelectElement>) {
    const fontFamily = event.target.value;

    if (!fontFamily) {
      editor.chain().focus().unsetFontFamily().run();
      return;
    }

    editor.chain().focus().setFontFamily(fontFamily).run();
  }

  function setFontSize(event: ChangeEvent<HTMLSelectElement>) {
    const fontSize = event.target.value;

    if (!fontSize) {
      editor.chain().focus().unsetFontSize().run();
      return;
    }

    editor.chain().focus().setFontSize(fontSize).run();
  }

  return (
    <div className="  sticky  top-0 z-50   bg-[#17171a]/95 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-1 ">
        <select
          aria-label="Font family"
          onChange={setFontFamily}
          className="h-9 shrink-0 rounded border border-white/10 bg-[#101012] px-2 text-xs text-white outline-none"
          defaultValue=""
        >
          {fontFamilies.map((font) => (
            <option key={font.label} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>

        <select
          aria-label="Font size"
          onChange={setFontSize}
          className="h-8 shrink-0 rounded border border-white/10 bg-[#101012] px-2 text-xs text-white outline-none"
          defaultValue=""
        >
          <option value="">Size</option>
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <Divider />

        <ToolButton active={editor.isActive("bold")} label="Bold" onClick={() => editor.chain().focus().toggleBold().run()}><Bold /></ToolButton>
        <ToolButton active={editor.isActive("italic")} label="Italic" onClick={() => editor.chain().focus().toggleItalic().run()}><Italic /></ToolButton>
        <ToolButton active={editor.isActive("underline")} label="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon /></ToolButton>
        <Divider />

        <ToolButton active={editor.isActive("heading", { level: 1 })} label="Title" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Type /></ToolButton>
        <ToolButton active={editor.isActive("heading", { level: 2 })} label="Section" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Pilcrow /></ToolButton>
        <ToolButton label="Paragraph" onClick={() => editor.chain().focus().setParagraph().run()}><Minus /></ToolButton>
        <Divider />

        <ToolButton active={editor.isActive("bulletList")} label="Bullets" onClick={() => editor.chain().focus().toggleBulletList().run()}><List /></ToolButton>
        <ToolButton active={editor.isActive("orderedList")} label="Numbers" onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered /></ToolButton>
        <Divider />

        <ToolButton label="Left" onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft /></ToolButton>
        <ToolButton label="Center" onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter /></ToolButton>
        <ToolButton label="Right" onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight /></ToolButton>
        <Divider />

        <ToolButton label="Link" onClick={setLink}><LinkIcon /></ToolButton>
        <ToolButton label="Highlight" onClick={() => editor.chain().focus().toggleHighlight({ color: "#fff8c5" }).run()}><Highlighter /></ToolButton>
        <ToolButton label="Table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><Table /></ToolButton>
        <ToolButton label="Add row" onClick={() => editor.chain().focus().addRowAfter().run()}><Rows3 /></ToolButton>
        <ToolButton label="Delete table" onClick={() => editor.chain().focus().deleteTable().run()}><Trash2 /></ToolButton>
        <Divider />

        <ToolButton label="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo2 /></ToolButton>
        <ToolButton label="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo2 /></ToolButton>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="mx-1 h-6 w-px shrink-0 bg-white/10" />;
}



