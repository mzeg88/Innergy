import { ServiceType } from "./service-type";

export type ActionType = "Select" | "Deselect";
export interface Action{
    type: ActionType,
    service: ServiceType
};