import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase/firebase"

export const saveNicknameToFirestore = async (nickname: string) => {
  try {
    await addDoc(collection(db, "users"), {
      nickname: nickname,
    })
    console.log(nickname + ": 닉네임이 Firestore에 저장되었습니다.")
  } catch (error) {
    console.error("Firestore 저장 오류:", error)
  }
}
