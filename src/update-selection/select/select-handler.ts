import { ServiceType } from "../../shared/service-type";
import { selectStrategy } from "./select-strategy";


export const selectHandler = (previouslySelectedServices: ServiceType[], service: ServiceType) : ServiceType[]=>{

    const handler = selectStrategy(previouslySelectedServices,service);

    const result = handler(previouslySelectedServices,service);
    
    return result;
}


