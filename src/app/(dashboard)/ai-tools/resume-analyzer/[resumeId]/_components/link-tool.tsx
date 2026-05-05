"use client";

import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";
import { LinkIcon, Unlink } from "lucide-react";

import { ToolButton } from "./tool-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";

export function LinkTool({ editor }: { editor: Editor }) {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
  if (open) {
    const attrs = editor.getAttributes("link");
    if (attrs?.href) {
      setUrl(attrs.href);
    } else {
      setUrl("");
    }
  }
}, [open, editor]);

 const normalizeUrl = (input: string) => {
  const cleanInput = input.trim().replace(/\s+/g, "");
  if (!cleanInput) return "";

  if (/^https?:\/\//i.test(cleanInput)) {
    return cleanInput;
  }
  return `https://${cleanInput.startsWith('www.') ? cleanInput : `www.${cleanInput}`}`;
};

const applyLink = (e: React.BaseSyntheticEvent) => {
  e.preventDefault();
  const normalized = normalizeUrl(url);

  if (!normalized) {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
  } else if (editor.state.selection.empty) {
    if (editor.isActive("link")) {
       editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: normalized })
        .run();
    } else {
      editor
        .chain()
        .focus()
        .insertContent(normalized)
        .extendMarkRange("link")
        .setLink({ href: normalized })
        .insertContent(" ") 
        .run();
    }
  } else {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: normalized })
      .run();
  }
  setOpen(false);
};

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <ToolButton
            active={editor.isActive("link")}
            label="Link"
          >
            <LinkIcon />
          </ToolButton>
        }
      />

      <PopoverContent className="w-72 p-3" side="bottom" align="start" sideOffset={8}>
        <form onSubmit={applyLink} className="space-y-3">
          <div className="space-y-1">
            <p className="text-[10px] font-medium uppercase opacity-50 text-white">Link URL</p>
            <Input
              placeholder="example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-8 text-xs bg-transparent border-white/10 text-white"
              autoFocus
            />
          </div>

          <div className="flex items-center gap-2">
            <Button type="submit" size="sm" className="h-7 px-3 text-xs">
              Apply
            </Button>

            {editor.isActive("link") && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10"
                onClick={() => {
                  editor.chain().focus().unsetLink().run();
                  setOpen(false);
                }}
              >
                <Unlink className="h-3 w-3 mr-1" />
                Remove
              </Button>
            )}
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}