import { useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import"./css/style.css"
import Main from "./components/Main"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Main/>
      <Footer/>
    </>
  )
}

export default App

