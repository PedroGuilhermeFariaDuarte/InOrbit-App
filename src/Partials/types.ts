export interface IGoals {
    completedAt: Date,
    id: string,
    title: string    
}

export interface IGoalsPedding extends IGoals {
    desiredWeeklyFrequency: number;
    completionCount: number;
}

export type TSummary = {
    completed: number,
    goalsTotal: number,
    goalsPerDay: {
        [index: string]: IGoals[]
    }    
}