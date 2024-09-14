// Assets
import { CheckCircle2, Plus } from "lucide-react";
import logoInOrbit from "../../assets/logo-header-in-orbit.svg";

// Partials
import { Create } from "../../components/Create";

// Types
import { ISummaryProps } from "./types";

export function Summary({summary}: ISummaryProps) {
    // AUX Variables
    const GOALS_COMPLETED_PERCENT = Math.floor((8 / 15) * 100)
    const GOALS_COMPLETED_BY_TEXT = GOALS_COMPLETED_PERCENT + '%'
    
    return (
        <div className="w-full max-w-[480px] h-full flex flex-col gap-6 py-10 px-5 mx-auto">
            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={logoInOrbit} alt="in.orbit" />
                    {}
                    <span className="text-lg font-semibold">8 a 13 de Agosto</span>
                </div>
                <Create />
            </div>

            <div className="min-h-16 flex-1 flex flex-col gap-3">
                <div className="w-full bg-zinc-900 rounded-full h-2">
                    <span
                        className="rounded-full flex bg-gradient-to-r from-pink-500 to-violet-500 h-full"
                        style={{
                            width: `${GOALS_COMPLETED_PERCENT}%`
                        }}
                    >
                    </span>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>
                        Você completou <span className="text-zinc-100">8</span>  de <span className="text-zinc-100">15</span> metas nessa semana.
                    </span> 
                    <span>
                        {
                           GOALS_COMPLETED_BY_TEXT
                        }
                    </span>
                </div>

                <span className="w-full h-px bg-zinc-900"></span>

                <div className="w-full h-[100px] overflow-y-auto flex flex-row items-center flex-wrap gap-3 rounded-lg  py-2 border-b-2 border-b-zinc-900">
                    {
                        Array(7).fill(null).map((_, index) => (
                            <button 
                                key={index}
                                type="button"
                                disabled={(index % 2) ? true : false}
                                className="
                                    flex items-center 
                                    px-3 py-2 gap-2 leading-none rounded-full 
                                    border border-dashed border-zinc-800
                                    text-sm text-zinc-300 
                                    hover:border-zinc-700
                                    disabled:opacity-50 disabled:pointer-events-none
                                    outline-none focus-visible:border-pink-500
                                    ring-pink-500/10
                                    focus-visible:ring-4
                                "
                            >
                                <Plus className="size-4 text-zinc-600" />
                                Meditar
                            </button>
                        ))
                    }
                </div>
                
                <h2 className="text-xl font-medium">Sua Semana</h2>

                <div className="h-full overflow-y-auto flex flex-col gap-6 rounded-lg">

                    {
                        Object.keys(summary.goalsPerDay).map((key, _index) => (
                            <div key={key} className="flex-1 flex flex-col gap-4">
                                <h3 className="font-medium">Domingo <span className="text-zinc-500 text-xs">({new Date(key).toLocaleDateString()})</span></h3>

                                <ul className="h-auto flex flex-col gap-3">
                                    {
                                        summary.goalsPerDay[key].map((summary) => (
                                            <li key={summary.id} className="w-full min-h-8 h-auto flex items-center gap-2">
                                                <CheckCircle2 className="size-4 text-pink-400"/>
                                                <span className="flex-1 text-sm text-zinc-400 text-ellipsis">
                                                    Você completou "<span className="text-zinc-100">{summary.title}</span>" ás <span className="text-zinc-100">{new Date(summary.completedAt).getHours()}</span>
                                                </span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}