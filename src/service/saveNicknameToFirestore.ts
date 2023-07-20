import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase/firestore"

export const saveNicknameToFirestore = async (nickname: string) => {
  try {
    await addDoc(collection(db, "users"), {
      nickname: nickname,
    })
  } catch (error) {
    console.error("Firestore 저장 오류:", error)
  }
}
