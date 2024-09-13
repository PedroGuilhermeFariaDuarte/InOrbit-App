import { Home } from "./Partials/Home"
import { Summary } from "./Partials/Summary"


function App() {  

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-8">
      <Home />
      <Summary />
    </div>
  )
}

export default App
