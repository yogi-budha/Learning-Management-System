import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function Editor({ name, value, setInput }) {
  // Customize Quill modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"], // Only allow links, no image button
      ["clean"],
    ],
    clipboard: {
      // Prevent pasting images
      matchers: [
        ['img', () => ({ ops: [] })] // remove images on paste
      ],
    },
  };

  const { quill, quillRef } = useQuill({ modules });

  // Set value whenever "value" changes
  useEffect(() => {
    if (quill && value !== undefined && value !== null) {
      if (quill.root.innerHTML !== value) {
        quill.root.innerHTML = value;
      }
    }
  }, [quill, value]);

  // Update parent state when editor changes
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        setInput((prev) => ({ ...prev, [name]: html }));
      });

      // Disable drag-and-drop images
      quill.root.addEventListener("drop", (e) => {
        if (e.dataTransfer && e.dataTransfer.files.length > 0) {
          e.preventDefault();
        }
      });
      quill.root.addEventListener("paste", (e) => {
        if (e.clipboardData && e.clipboardData.files.length > 0) {
          e.preventDefault();
        }
      });
    }
  }, [quill, name, setInput]);

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-2">
      <div ref={quillRef} className="min-h-[150px]" />
    </div>
  );
}
