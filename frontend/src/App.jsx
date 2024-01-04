
import Store from "./store"
import Login from "./components/user/Login"
function App() {
  const username  = "ecommerce web page"
 

  return (
    <>
   <h1>{username}</h1>
  <Store/>
  <Login/>
  </>

  )
}

export default App
