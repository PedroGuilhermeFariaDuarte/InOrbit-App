import * as Zod from "zod";

export const SCCreateGoal = Zod.object({
    title: Zod.string(),
    desiredWeeklyFrequency: Zod.number().int().min(1).max(7, "The frequency cannot be than that 7")
})