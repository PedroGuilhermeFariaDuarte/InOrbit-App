import { useEffect, useState } from "react";

// Types
import { TSummary } from "./Partials/types";

// Partials
import { Home } from "./Partials/Home";
import { Summary } from "./Partials/Summary";

function App() {  
  const [summary, setSummary] = useState<TSummary | null>(null)

  useEffect(() => {
      fetch('http://localhost:3333/summary/week').then(resolver => resolver.json()).then(resolver => setSummary(resolver))
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-8">
      
      {
        summary?.goalsTotal! <= 0 &&  (<Home />)
      }

      {
           summary?.goalsTotal! >= 1 &&  (<Summary summary={summary!}/>)
      }      
    </div>
  )
}

export default App
