import * as Zod from "zod";

export const SCCreateGoal = Zod.object({
    title: Zod.string({
        message: 'The title of goal',
        required_error: 'The title of goal is required'
    }).min(5, "The title should have 5 or more characters"),
    desiredWeeklyFrequency: Zod.number({
        coerce: true
    })
    .int()
    .min(1,"The frequency should be greater that or equal to 1")
    .max(7, "The frequency cannot be than that 7")
})