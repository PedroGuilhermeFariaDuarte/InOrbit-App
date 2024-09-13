import { PropsWithChildren } from "react";

// Schemas
import { SCCreateGoal } from "./schemas";

export interface ICreateProps extends PropsWithChildren<any> {
    // do anything
}

export type TCreateGoal = Zod.infer<typeof SCCreateGoal>