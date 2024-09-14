import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

// Icons
import { CheckCircle2, Circle, Plus, X } from "lucide-react";

// Types
import { ICreateProps, TCreateGoal } from "./types";

// Components
import { Button } from "../../../../components/Button";

// Schemas
import { SCCreateGoal } from "./schemas";

export function Create(_props: ICreateProps) {

    const {formState, ...form} = useForm<TCreateGoal>({
        defaultValues: {
            title: '',
            desiredWeeklyFrequency: -1
        },
        resolver: zodResolver(SCCreateGoal)
    })

    // AUX Variables
    const QUERY_CLIENT = useQueryClient()
    const EMOJIS_BY_FREQUENCY_ON_WEEK: {[index: string]: any} = {
        "1": '🥱',
        "2": '🙂',
        "3": '😎',
        "4": '😜',
        "5": '🤨',
        "6": '🤯',
        "7": '🔥'
    }

    async function onSubmit(data: TCreateGoal){
        try {
            if(!data) throw new Error('The data is not valid');

            const GOAL_RESPONSE = await fetch('http://localhost:3333/goals/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if(GOAL_RESPONSE.status !== 201) throw new Error('The goal cannot be created');
           
            QUERY_CLIENT.invalidateQueries({
                queryKey: ['query-summary-week']
            })
            
            QUERY_CLIENT.invalidateQueries({
                queryKey: ['query-summary-peddings-goals']
            })  

            form.reset()
        } catch (error) {
            // do anything
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className="bg-transparent border-0 outline-none">
                <Button >
                    <Plus className="size-4"/> 
                    <span className="flex max-sm:hidden">Cadastrar meta</span>
                </Button> 
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-zinc-800/40 backdrop-blur-sm inset-0 fixed transition-all duration-[0.14s]"/>
                <Dialog.Content
                    className="fixed z-50 
                        right-0 top-0 
                        bottom-0 
                        w-[400px] h-screen 
                        border-l-2 border-zinc-900 bg-zinc-950 p-8
                        flex flex-col items-start justify-start gap-4
                        transition-all
                        duration-[0.14s]
                    "
                >
                    <Dialog.Title className="text-lg font-semibold text-zinc-50">
                        Cadastrar Meta
                    </Dialog.Title>
                    <Dialog.Description className="text-zinc-400 text-sm leading-relaxed">
                        Adicione atividades que <span className="underline cursor-default select-none">te fazem bem</span> e que você quer continuar
                        praticando toda semana.
                    </Dialog.Description>

                    <form
                        name="goal-create-form"
                        id="goal-create-form"
                        onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
                        className="w-full flex-1 flex flex-col justify-between"
                    >
                        <div className="w-full flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="title" className="font-medium text-sm tracking-tight leading-normal">
                                    Qual a atividade?
                                </label>
                                <input 
                                    id="title"
                                    type="text" 
                                    autoFocus
                                    placeholder="Praticar exercicios, meditar, etc..."
                                    {...form.register("title")}
                                    className="px-4 h-12 bg-black border border-zinc-900 rounded-lg placeholder-zinc-400
                                        outline-none text-sm hover:border-zinc-800
                                        focus-visible:border-pink-500
                                        focus-visible:ring-4 ring-pink-500/10
                                        transition-all
                                        duration-[0.14s]
                                    "
                                />
                                                                
                                <p data-haserror={formState.errors.title && true} className="hidden data-[haserror=true]:flex text-red-400 text-sm">
                                    {
                                        formState?.errors?.title?.message || 'Atenção!!!'
                                    }
                                </p>                                

                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="title" className="font-medium text-sm tracking-tight leading-normal">
                                    Qual a atividade?
                                </label>

                                <ul className="w-full h-full inset-0 flex flex-col gap-4">
                                    {
                                        Array(7).fill(null).map((_frequency,index) => (
                                            <span className="w-full h-auto 
                                                    flex cursor-pointer
                                                    overflow-hidden
                                                "
                                            >
                                                <input 
                                                    type="radio" 
                                                    {...form.register("desiredWeeklyFrequency")}
                                                    id={`desiredWeeklyFrequency_${index + 1}`} 
                                                    className="peer/FrequencyChecked hidden" 
                                                    value={index + 1}
                                                />
                                                <label 
                                                    className="
                                                        w-full h-full
                                                        bg-black
                                                        rounded-lg

                                                        border-[1px] border-zinc-600
                                                        hover:border-zinc-800

                                                        flex flex-row 
                                                        items-center justify-between gap-3
                                                        cursor-pointer
                                                        px-4 py-2.5
                                                        peer-checked/FrequencyChecked:[&_.z]:hidden
                                                        peer-checked/FrequencyChecked:[&_.d]:flex

                                                        peer-checked/FrequencyChecked:bg-[#ec489a56]
                                                        peer-checked/FrequencyChecked:border-pink-500

                                                        transition-all
                                                        duration-[0.14s]
                                                    " 
                                                    key={index} 
                                                    htmlFor={`desiredWeeklyFrequency_${index + 1}`}
                                                >
                                                    
                                                    <Circle className="size-4 text-zinc-600 z" />
                                                    <CheckCircle2 className="size-4 text-pink-500 hidden d" />
                                                    
                                                    <span className="flex-1
                                                            text-zinc-300 text-sm 
                                                            font-medium leading-none
                                                            flex flex-row flex-nowrap
                                                            items-center justify-center
                                                        "
                                                    >
                                                        {index + 1}x na semana
                                                    </span>

                                                    <span className="text-lg leading-none">
                                                        {EMOJIS_BY_FREQUENCY_ON_WEEK[index + 1]}
                                                    </span>
                                                </label>
                                            </span>
                                        ))
                                    }
                                </ul>

                                <p data-haserror={formState.errors.desiredWeeklyFrequency && true} className="hidden data-[haserror=true]:flex text-red-400 text-sm">
                                    {
                                        formState?.errors?.desiredWeeklyFrequency?.message || 'Atenção!!!'
                                    }
                                </p> 
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Dialog.Close asChild>
                                <Button className="bg-zinc-600 hover:bg-red-500 border-none">
                                    <X className="md:hidden"/> 
                                    <span className="flex max-sm:hidden">Fechar</span>                                    
                                </Button> 
                            </Dialog.Close>
                            <Button type="submit" className="flex-1 justify-center" form="goal-create-form">
                                <Plus /> 
                                <span className="flex max-sm:hidden">Criar meta</span>
                            </Button> 
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
