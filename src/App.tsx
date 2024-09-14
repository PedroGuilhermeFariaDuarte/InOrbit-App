// Assets
import logoInOrbit from "./assets/logo-header-in-orbit.svg";

// Types
import { TSummary } from "./Partials/types";

// Partials
import { useQuery } from "@tanstack/react-query";
import { Home } from "./Partials/Home";
import { Summary } from "./Partials/Summary";

function App() {  

  // const isFetching = useIsFetching({
  //   queryKey: ['query-summary-week','query-summary-peddings-goals']
  // })
  
  // AUX Variables
  const {data: SUMMARY_DATA, isFetching } = useQuery<TSummary>({
    queryKey: ['query-summary-week'],
    queryFn: async () => await (await fetch('http://localhost:3333/summary/week')).json(),
    staleTime: 1500 * 60,
  })

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-8 relative">

      <div 
        data-wait={isFetching}
        className="flex flex-row flex-nowrap gap-6 
          items-center justify-center 
          p-4 absolute -left-full bottom-4 
          data-[wait=true]:left-4
          rounded-lg 
          border-2 border-pink-500 bg-pink-500/50
          cursor-default
          select-none
          transition-all
          duration-[0.38s]
          shadow-lg
          shadow-black/95

          max-sm:w-14
          max-sm:h-14
          max-sm:rounded-full
        "
      >
        <img src={logoInOrbit} alt="in-Orbit" />
        <span className="text-sm text-zinc-50 font-medium max-sm:hidden">
          Carregando seu <span className="underline">resumo semanal...</span>
        </span>
      </div>       

      {
        SUMMARY_DATA?.goalsTotal! <= 0 &&  (<Home />)
      }

      {
        SUMMARY_DATA?.goalsTotal! >= 1 &&  (<Summary summary={SUMMARY_DATA!}/>)
      }      
    </div>
  )
}

export default App
