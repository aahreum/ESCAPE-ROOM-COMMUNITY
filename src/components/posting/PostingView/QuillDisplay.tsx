import ReactQuill from "react-quill"

const QuillDisplay = ({ content }: { content: string }) => {
  const modules = {
    toolbar: false,
  }

  return <ReactQuill value={content} readOnly modules={modules} />
}

export default QuillDisplay
