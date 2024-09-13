// Types
import { IButtonProps } from "./types";

export function Button ({children, ...props}: IButtonProps){
    return (
        <button 
            type="button" 
            className="px-4 py-2.5 rounded-lg bg-violet-500 text-violet-50 
                flex flex-row items-center gap-2 text-small font-medium tracking-tighter
                hover:bg-violet-600
                hover:active:bg-violet-700
                transition-colors
                duration-[0.38s]
            "
            {...props}
        >
            {children}
        </button>
    )
}