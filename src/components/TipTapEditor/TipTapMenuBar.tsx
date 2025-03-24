import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List as BulletList,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Plus,
  Minus,
  Link2,
  Unlink,
  Image,
  Video,
  Check,
} from "lucide-react";

import "./TipTapEditor.css";

import { useCurrentEditor } from "@tiptap/react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useEffect, useState, useCallback } from "react";

import { useDropzone } from "react-dropzone";
import { v4 as uuid } from "uuid";
import { Button } from "../ui/button";

const fontSizeOptions = [
  "48px",
  "32px",
  "24px",
  "18px",
  "16px",
  "14px",
  "12px",
  "10px",
];

export const TipTapMenuBar = () => {
  const [selectedFontFamily, setSelectedFontFamily] = useState("arial");
  const [selectedFontSize, setSelectedFontSize] = useState("12px");
  const [selectedUrl, setSelectedUrl] = useState("https://");
  const [selectedImageUrl, setSelectedImageUrl] = useState<any>("");
  const [embedYoutubeUrl, setEmbedYoutubeUrl] = useState("");

  const [imageFiles, setImageFiles] = useState<any>([]);

  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const handleFontFamilyChange = (value: any) => {
    setSelectedFontFamily(value);
    editor.chain().focus().setFontFamily(value).run();
  };

  const handleFontSizeChange = (value: any) => {
    setSelectedFontSize(value);
  };

  const handleFontSizeIncrementDecrement = (type: any) => {
    const currentIndex = fontSizeOptions.indexOf(selectedFontSize);

    if (type === "increment") {
      if (currentIndex > 0) {
        setSelectedFontSize(fontSizeOptions[currentIndex - 1]);
      }
    } else if (type === "decrement") {
      if (currentIndex < fontSizeOptions.length - 1) {
        setSelectedFontSize(fontSizeOptions[currentIndex + 1]);
      }
    }
  };

  const handleInsertLink = () => {
    if (selectedUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: selectedUrl })
        .run();
    }
    setSelectedUrl("https://");
  };

  const handleAddImage = () => {
    if (selectedImageUrl !== "") {
      editor.chain().focus().setImage({ src: selectedImageUrl }).run();
    }
    setSelectedImageUrl("");
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const processedFile = new File([file], uuid(), { type: file.type });

    setImageFiles([...imageFiles, processedFile]);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImageUrl(reader?.result);
    };
    reader.readAsDataURL(processedFile);
    handleAddImage();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": ["*"],
    },
  });

  const handleEmbedYoutubeUrl = () => {
    if (embedYoutubeUrl !== "") {
      editor.commands.setYoutubeVideo({
        src: embedYoutubeUrl,
        width: 480,
        height: 320,
      });
    }
    setEmbedYoutubeUrl("");
  };

  useEffect(() => {
    editor.chain().focus().setFontFamily(selectedFontFamily).run();
  }, []);

  useEffect(() => {
    (editor as any).chain().focus().setFontSize(selectedFontSize).run();
  }, [selectedFontSize]);

  return (
    <div className="toolbar-container">
      <Select value={selectedFontFamily} onValueChange={handleFontFamilyChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="w-[120px]">
          <SelectItem value="arial">Arial</SelectItem>
          <SelectItem value="Inter">Inter</SelectItem>
          <SelectItem value="monospace">Monospace</SelectItem>
        </SelectContent>
      </Select>

      <div className="vertical-divider" />

      <Button
        className="toolbar-btn"
        disabled={selectedFontSize === fontSizeOptions[0]}
        onClick={(e) => {
          e.preventDefault();
          handleFontSizeIncrementDecrement("increment");
        }}
      >
        <Plus size={14} />
      </Button>
      <Select value={selectedFontSize} onValueChange={handleFontSizeChange}>
        <SelectTrigger
          className="w-[42px] px-1 border-1 border-gray-900 rounded"
          showIcon={false}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="w-[48px]">
          {fontSizeOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        className="toolbar-btn"
        disabled={
          selectedFontSize === fontSizeOptions[fontSizeOptions.length - 1]
        }
        onClick={(e) => {
          e.preventDefault();
          handleFontSizeIncrementDecrement("decrement");
        }}
      >
        <Minus size={14} />
      </Button>

      <div className="vertical-divider" />

      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`toolbar-btn ${editor.isActive("bold") ? "is-active" : ""}`}
      >
        <Bold size={14} />
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`toolbar-btn ${
          editor.isActive("italic") ? "is-active" : ""
        }`}
      >
        <Italic size={14} />
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`toolbar-btn ${
          editor.isActive("underline") ? "is-active" : ""
        }`}
      >
        <UnderlineIcon size={14} />
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`toolbar-btn ${
          editor.isActive("strike") ? "is-active" : ""
        }`}
      >
        <Strikethrough size={14} />
      </Button>

      <div className="vertical-divider" />

      {editor.isActive("link") ? (
        <Button
          className="toolbar-btn"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().unsetLink().run();
          }}
        >
          <Unlink size={14} />
        </Button>
      ) : (
        <Popover>
          <PopoverTrigger className="toolbar-btn cursor-pointer">
            <Link2 size={14} />
          </PopoverTrigger>
          <PopoverContent className="p-2">
            <input
              type="text"
              placeholder="Enter URL"
              className="border-1 border-black w-full rounded px-2 h-10"
              value={selectedUrl}
              onChange={(e) => setSelectedUrl(e.target.value)}
            />
            <div className="w-full flex flex-row-reverse gap-2 mt-2">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleInsertLink();
                }}
                className="rounded bg-blue-200 px-3 py-1 w-[90px] hover:bg-blue-300 cursor-pointer font-[400]"
              >
                Insert
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}

      <Popover>
        <PopoverTrigger className="toolbar-btn">
          <Image size={14} />
        </PopoverTrigger>
        <PopoverContent className="p-2">
          <div className="w-full flex flex-row gap-2">
            <input
              type="text"
              placeholder="Enter URL"
              className="border-1 border-black w-full rounded px-2 h-10"
              value={selectedImageUrl}
              onChange={(e) => setSelectedImageUrl(e.target.value)}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleAddImage();
              }}
              className="rounded bg-blue-200 w-[48px] hover:bg-blue-300 cursor-pointer font-[400] flex justify-center items-center"
            >
              <Check size={16} />
            </Button>
          </div>
          <div className="w-full flex flex-row gap-2 my-2 justify-center">
            <div className="horizontal-divider" />
            <div>or</div>
            <div className="horizontal-divider" />
          </div>

          <div
            className="rounded border-1 border-dashed border-blue-300 p-1 h-[120px] flex justify-center items-center text-center bg-blue-100 cursor-pointer text-gray-500"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div>Drop the files here ...</div>
            ) : (
              <div>Drag 'n' drop image here, or click to select</div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger className="toolbar-btn">
          <Video size={14} />
        </PopoverTrigger>
        <PopoverContent className="p-2">
          <input
            type="text"
            placeholder="Enter URL"
            className="border-1 border-black w-full rounded px-2 h-10"
            value={embedYoutubeUrl}
            onChange={(e) => setEmbedYoutubeUrl(e.target.value)}
          />
          <div className="w-full flex flex-row-reverse gap-2 mt-2">
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleEmbedYoutubeUrl();
              }}
              className="rounded bg-blue-200 px-3 py-1 w-[90px] hover:bg-blue-300 cursor-pointer font-[400]"
            >
              Insert
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <div className="vertical-divider" />

      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("left").run();
        }}
        className={`toolbar-btn ${
          editor.isActive({ textAlign: "left" }) ? "is-active" : ""
        }`}
      >
        <AlignLeft size={14} />
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("center").run();
        }}
        className={`toolbar-btn ${
          editor.isActive({ textAlign: "center" }) ? "is-active" : ""
        }`}
      >
        <AlignCenter size={14} />
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("right").run();
        }}
        className={`toolbar-btn ${
          editor.isActive({ textAlign: "right" }) ? "is-active" : ""
        }`}
      >
        <AlignRight size={14} />
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("justify").run();
        }}
        className={`toolbar-btn ${
          editor.isActive("justify") ? "is-active" : ""
        }`}
      >
        <AlignJustify size={14} />
      </Button>

      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        className={`toolbar-btn ${
          editor.isActive("bulletList") ? "is-active" : ""
        }`}
      >
        <BulletList size={14} />
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={`toolbar-btn ${
          editor.isActive("orderedList") ? "is-active" : ""
        }`}
      >
        <ListOrdered size={14} />
      </Button>
    </div>
  );
};
