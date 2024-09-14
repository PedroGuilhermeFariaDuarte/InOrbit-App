import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";

// Icons
import { CheckCircle2, Plus } from "lucide-react";

// Assets
import logoInOrbit from "../../assets/logo-header-in-orbit.svg";

// Partials
import { Create } from "../../components/Create";

// Types
import { IGoalsPedding } from "../types";
import { ISummaryProps } from "./types";

export function Summary({summary}: ISummaryProps) {
    // AUX Variables
    const GOALS_COMPLETED_TOTAL = summary?.completed || 0
    const GOALS_PEDDINGS_TOTAL = summary?.goalsTotal || 0
    const GOALS_COMPLETED_PERCENT = Math.floor(((summary.completed || 1)/ (summary.goalsTotal || 1)) * 100)
    const GOALS_COMPLETED_BY_TEXT = GOALS_COMPLETED_PERCENT + '%'
    const FIRST_DAY_OF_WEEK = dayjs().locale(ptBR).startOf('week').format('DD MMMM')
    const LAST_DAY_OF_WEEK = dayjs().locale(ptBR).endOf('week').format('DD MMMM')
    const QUERY_CLIENT = useQueryClient()
    const {data: GOALS_PEDDINGS_DATA, isFetching} = useQuery<IGoalsPedding[]>({
      queryKey: ['query-summary-peddings-goals'],
      queryFn: async () => await (await fetch("http://localhost:3333/goals/pendings")).json(),
      staleTime: 1500 * 60 
    })

    async function setCompletedGoal(goalId: string) {
        try {
            const GOAL_COMPLETED_RESPONSE = await fetch('http://localhost:3333/goals-completions/create', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept-type': 'application/json'
                },
                body: JSON.stringify({
                    goalId
                })
            })

            if(GOAL_COMPLETED_RESPONSE.status !== 201) throw new Error('The goal cannot be completed');

            QUERY_CLIENT.invalidateQueries({
                queryKey: ['query-summary-week', 'query-summary-peddings-goals']
            })            
        } catch (error) {
            // do anything
        }
    }

    return (
        <div className="w-full max-w-[480px] h-full flex flex-col gap-6 py-10 px-5 mx-auto">
            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex-1 flex items-center gap-2">
                    <img src={logoInOrbit} alt="in.orbit" />
                    <span 
                        title={`${FIRST_DAY_OF_WEEK} a ${LAST_DAY_OF_WEEK}`}
                        className="text-lg font-semibold 
                            capitalize text-ellipsis overflow-hidden whitespace-nowrap
                            select-none
                            cursor-default
                        "
                    >
                            {FIRST_DAY_OF_WEEK} <span className="!lowercase">a</span> {LAST_DAY_OF_WEEK}
                    </span>
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
                        Você completou <span className="text-zinc-100">{GOALS_COMPLETED_TOTAL}</span> de <span className="text-zinc-100">{GOALS_PEDDINGS_TOTAL}</span> metas nessa semana.
                    </span> 
                    <span>
                        {
                           GOALS_COMPLETED_BY_TEXT
                        }
                    </span>
                </div>

                <span className="w-full h-px bg-zinc-900"></span>

                <div className="w-full h-[100px] overflow-x-auto flex flex-row items-center flex-nowrap gap-3 rounded-lg  py-2">
                    {
                        !isFetching && GOALS_PEDDINGS_DATA!?.map((goal, _index) => (
                            <button
                                key={goal.id}
                                onClick={() => setCompletedGoal(goal.id)}
                                type="button"
                                disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
                                data-waittodo={QUERY_CLIENT.isFetching}
                                className="
                                    flex-1
                                    min-w-[155px]
                                    flex items-center
                                    px-3 py-2 gap-2 leading-none rounded-full 
                                    border border-dashed border-zinc-800
                                    text-sm text-zinc-300 
                                    hover:border-zinc-700
                                    disabled:opacity-50 disabled:pointer-events-none
                                    outline-none focus-visible:border-pink-500
                                    ring-pink-500/10
                                    focus-visible:ring-4
                                    text-ellipsis
                                    overflow-hidden
                                    whitespace-nowrap
                                    disabled:select-none
                                    disabled:cursor-not-allowed

                                    data-[waittodo=true]:bg-pink-500/50
                                    data-[waittodo=true]:border-pink-500
                                    data-[waittodo=true]:cursor-progress

                                    transition-all
                                    duration-[0.38s]
                                "
                            >
                                <Plus className="size-4 text-zinc-600" />
                                {goal.title}
                            </button>
                        ))
                    }

                    {
                        isFetching || !GOALS_PEDDINGS_DATA && (
                            <span className="text-zinc-50 font-medium cursor-default select-none">
                                Nenhuma meta pendente <span className="underline">nessa semana</span>
                            </span>
                        )
                    }
                </div>
                
                <h2 className="text-xl font-medium mb-3">Sua Semana</h2>

                <div className="h-full overflow-y-auto flex flex-col gap-6 rounded-lg">

                    {
                        Object.keys(summary?.goalsPerDay || {}).map((key, _index) => (
                            <div key={key} className="flex-1 flex flex-col gap-4">
                                <h3 className="font-medium capitalize flex gap-2 items-center">
                                    <span>
                                        {dayjs(new Date(key)).locale(ptBR).format('dddd')} 
                                    </span>
                                    <span className="text-zinc-500 text-xs lowercase">
                                        ({dayjs(new Date(key)).locale(ptBR).format("DD [de] MMMM")})
                                    </span>
                                </h3>

                                <ul className="h-auto flex flex-col gap-3">
                                    {
                                        summary?.goalsPerDay[key]?.map((summary) => (
                                            <li key={summary.id} className="w-full min-h-8 h-auto flex items-center gap-2">
                                                <CheckCircle2 className="size-4 text-pink-400"/>
                                                <span className="flex-1 text-sm text-zinc-400 text-ellipsis">
                                                    Você completou "<span className="text-zinc-100">{summary?.title}</span>" ás <span className="text-zinc-100">{dayjs(summary.completedAt).format('HH:mm:ss')}</span>
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