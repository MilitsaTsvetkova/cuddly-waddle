import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "../../context/ThemeProvider";

export default function TextEditor({ field, editorRef }: any) {
  const { mode } = useTheme();

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
      onInit={(_evt, editor) => {
        // @ts-ignore
        editorRef.current = editor;
      }}
      onBlur={field.onBlur}
      onEditorChange={(content) => {
        field.onChange(content);
      }}
      initialValue={field.value || ""}
      init={{
        height: 350,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "codesample",
        ],
        toolbar:
          "undo redo | " +
          "codesample | bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist",
        content_style: "body { font-family:Inter; font-size:16px }",
        skin: mode === "dark" ? "oxide-dark" : "oxide",
        content_css: mode === "dark" ? "dark" : "light",
      }}
    />
  );
}
