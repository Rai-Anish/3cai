"use client";

import { type ChangeEvent } from "react";
import { EditorContent, type Editor } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import {
  Bold,
  Bot,
  Copy,
  Highlighter,
  Italic,
  LinkIcon,
  List,
  Minus,
  Pilcrow,
  Table,
  Trash2,
  Type,
  UnderlineIcon,
} from "lucide-react";
import { ToolButton } from "./tool-button";

const colors = ["#111827", "#6b7280", "#a3ff12", "#60a5fa", "#a78bfa", "#fb7185", "#f59e0b"];

const fontFamilies = [
  { label: "Default", value: "" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Times", value: '"Times New Roman", serif' },
  { label: "Helvetica", value: "Helvetica, Arial, sans-serif" },
  { label: "Courier", value: '"Courier New", monospace' },
];

const fontSizes = ["10px", "11px", "12px", "13px", "14px", "16px", "18px", "20px", "24px", "28px", "32px"];

export function EditorCanvas({
  editor,
  resume,
  onImproveSelection,
}: {
  editor: Editor;
  resume: any;
  onImproveSelection: () => void;
}) {
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

  function duplicateSelection() {
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, " ").trim();

    if (text) {
      editor.chain().focus().insertContent(`<p>${text}</p>`).run();
      return;
    }

    editor.chain().focus().insertContent("<p></p>").run();
  }

  function deleteSelection() {
    const { from, to } = editor.state.selection;

    if (from !== to) {
      editor.chain().focus().deleteSelection().run();
      return;
    }

    editor.chain().focus().clearNodes().deleteSelection().run();
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
    <div className="mx-auto max-w-285 px-5 pb-24 pt-5">
      <div className="resume-page relative rounded-sm border border-white/10 bg-white px-10 py-10 shadow-[0_40px_140px_rgba(0,0,0,0.65)]">
        <BubbleMenu editor={editor} options={{ placement: "top", offset: 8 }}>
          <div className="flex flex-wrap items-center gap-1 rounded-md border border-white/10 bg-[#202024] p-1 shadow-neon">
            <select
              aria-label="Font family"
              onChange={setFontFamily}
              className="h-8 rounded border border-white/10 bg-[#17171a] px-2 text-xs text-white outline-none"
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
              className="h-8 rounded border border-white/10 bg-[#17171a] px-2 text-xs text-white outline-none"
              defaultValue=""
            >
              <option value="">Size</option>
              {fontSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <ToolButton active={editor.isActive("bold")} label="Bold" onClick={() => editor.chain().focus().toggleBold().run()}>
              <Bold />
            </ToolButton>
            <ToolButton active={editor.isActive("italic")} label="Italic" onClick={() => editor.chain().focus().toggleItalic().run()}>
              <Italic />
            </ToolButton>
            <ToolButton active={editor.isActive("underline")} label="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()}>
              <UnderlineIcon />
            </ToolButton>
            <ToolButton label="Link" onClick={setLink}>
              <LinkIcon />
            </ToolButton>
            <ToolButton label="AI improve" onClick={onImproveSelection}>
              <Bot />
            </ToolButton>
            <ToolButton label="Duplicate" onClick={duplicateSelection}>
              <Copy />
            </ToolButton>
            <ToolButton label="Delete" onClick={deleteSelection}>
              <Trash2 />
            </ToolButton>
            <ToolButton label="Highlight" onClick={() => editor.chain().focus().toggleHighlight({ color: "#fff8c5" }).run()}>
              <Highlighter />
            </ToolButton>

            {colors.map((color) => (
              <button
                key={color}
                type="button"
                title={color}
                onClick={() => editor.chain().focus().setColor(color).run()}
                className="h-6 w-6 rounded border border-white/15"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </BubbleMenu>

        <FloatingMenu editor={editor} options={{ placement: "left", offset: 14 }}>
          <div className="flex flex-col gap-1 rounded-md border border-white/10 bg-[#202024] p-1 shadow-neon">
            <ToolButton label="Text" onClick={() => editor.chain().focus().setParagraph().run()}>
              <Type />
            </ToolButton>

            <ToolButton label="Section" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
              <Pilcrow />
            </ToolButton>

            <ToolButton label="Bullet" onClick={() => editor.chain().focus().toggleBulletList().run()}>
              <List />
            </ToolButton>

            <ToolButton label="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
              <Minus />
            </ToolButton>

            <ToolButton label="Table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
              <Table />
            </ToolButton>
          </div>
        </FloatingMenu>

        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

