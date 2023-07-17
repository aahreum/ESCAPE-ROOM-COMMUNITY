import { collection, doc, getDocs } from "firebase/firestore"
import { styled } from "styled-components"
import { db } from "../firebase/firebase"
import SkeletonCard from "../components/posting/Card/SkeletonCard"

const Index = (): JSX.Element => {
  return (
    <Wrap>
      <h2>메인페이지</h2>
    </Wrap>
  )
}

const Wrap = styled.div`
  margin-top: 62px;
`

export default Index
