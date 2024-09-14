import { PropsWithChildren } from "react";

// Types
import { TSummary } from "../types";

export interface ISummaryProps  extends PropsWithChildren<any> {
    summary: TSummary
}