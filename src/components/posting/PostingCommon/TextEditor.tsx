import { Dispatch, SetStateAction } from "react"
import { styled } from "styled-components"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

interface TextEditorType {
  setContent: Dispatch<SetStateAction<string>>
  content: string
}

const TextEditor = ({ setContent, content }: TextEditorType): JSX.Element => {
  const modules = {
    toolbar: {
      container: [
        [{ header: "3" }, { header: "4" }],
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
    <QuillEditor
      placeholder="내용을 입력해주세요."
      modules={modules}
      theme="snow"
      onChange={setContent}
      value={content}
    />
  )
}

const QuillEditor = styled(({ ...props }) => <ReactQuill {...props} />).withConfig({
  shouldForwardProp: (prop) => prop !== "excludeProp",
})`
  .ql-picker-label {
    color: var(--color-gray-100);
    &:hover {
      color: var(--color-primary-500);
    }
  }

  .ql-container {
    border: none;
  }

  .ql-picker-options {
    > span > svg > line {
      stroke: var(--color-gray-900);
    }
  }

  .ql-stroke,
  .ql-fill {
    stroke: var(--color-gray-100);
  }

  .ql-toolbar {
    padding: 12px 8px;

    display: flex;
    align-items: center;

    border: none;
    border-bottom: 1px solid var(--color-gray-300);
    border-radius: 8px 8px 0px 0px;
    background-color: var(--color-gray-600);

    @media ${(props) => props.theme.tablet} {
      gap: 8px;
      flex-wrap: wrap;
    }

    > .ql-formats {
      @media ${(props) => props.theme.tablet} {
        margin-right: 0px;
      }
    }
  }

  .ql-header[value="3"] {
    &::after {
      content: "H1";
      color: var(--color-gray-100);
      font-weight: 700;
    }
  }

  .ql-header[value="4"] {
    &::after {
      content: "H2";
      color: var(--color-gray-100);
      font-weight: 700;
    }
  }

  .ql-editor {
    height: 480px;

    background-color: var(--color-gray-700);
    border-radius: 0px 0px 8px 8px;

    font-size: 16px;

    &::before {
      font-family: "SUIT", sans-serif;
      font-weight: 100;
      font-style: normal;
      color: var(--color-gray-200);
    }

    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--color-gray-300);
      border-radius: 10px;
    }
  }
`

export default TextEditor
