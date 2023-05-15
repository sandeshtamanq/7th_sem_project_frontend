import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function RichTextEditor({ onChange, value }) {
  const modules = {
    toolbar: [[{ header: [1, 2, 3, 4, 5, false] }], [{ size: [] }], ["bold", "italic", "underline", "strike", "blockquote"], [{ list: "ordered" }, { list: "bullet" }], ["link"]],
    // placeholder: "Enter description",
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "video"];

  return <ReactQuill theme="snow" modules={modules} formats={formats} value={value} onChange={onChange} />;
}

export default RichTextEditor;
