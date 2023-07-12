import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useState } from "react"
import { styled } from "styled-components"

const TextEditor = () => {
  const [content, setContent] = useState("")

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, "link"],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
    },
  }

  return (
    <>
      <ReactQuill theme="snow" modules={modules} onChange={setContent} />
    </>
  )
}

export default TextEditor
