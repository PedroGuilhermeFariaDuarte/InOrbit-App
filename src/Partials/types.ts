export interface IGoals {
    completedAt: Date,
    id: string,
    title: string    
}

export type TSummary = {
    completed: number,
    goalsTotal: number,
    goalsPerDay: {
        [index: string]: IGoals[]
    }    
}