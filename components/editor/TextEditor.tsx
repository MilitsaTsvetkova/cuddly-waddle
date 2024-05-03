import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

export default function TextEditor({ field }: any) {
  const editorRef = useRef(null);

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
      initialValue="<p>This is the initial content of the editor.</p>"
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
      }}
    />
  );
}
