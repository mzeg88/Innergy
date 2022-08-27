import { ServiceType } from "../../shared/service-type";
import { deselectStrategy } from "./deselect-strategy";

export const deselectHandler = (previouslySelectedServices: ServiceType[], service: ServiceType) : ServiceType[]=>{

    const handler = deselectStrategy(previouslySelectedServices,service);

    const result = handler(previouslySelectedServices,service);
    
    return result;
}