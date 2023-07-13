import { useState } from "react"

export interface TextSaveState {
  contentTitle: string
  setContentTitle: React.Dispatch<React.SetStateAction<string>>
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
}

const useTextSaveState = (): TextSaveState => {
  const [contentTitle, setContentTitle] = useState("")
  const [content, setContent] = useState("")

  return {
    contentTitle,
    setContentTitle,
    content,
    setContent,
  }
}

export default useTextSaveState
