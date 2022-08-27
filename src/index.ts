import { Price } from "./price-calculator/price";
import { 
    getPriceForBluerayPackage, 
    getPriceForPhotographyAndVideoRecordingPackage, 
    getPriceForPhotographyOnly, 
    getPriceForVideoRecordingOnly, 
    getPriceForTwoDayEvent, 
    getPriceForWeddingSession, 
    getPriceWithWeddingSessionDiscount, 
    PriceCalculationRule 
} from "./price-calculator/price-calculation-rules";
import { ServiceType } from "./shared/service-type";
import { ServiceYear } from "./shared/service-year";
import { selectHandler } from "./update-selection/select/select-handler";
import { deselectHandler } from "./update-selection/deselect/deselect-handler";
import { Action } from "./shared/action";


export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: Action
) => {
       switch (action.type) {
        case "Select":
            return selectHandler(previouslySelectedServices,action.service);
        case "Deselect":
            return deselectHandler(previouslySelectedServices,action.service);
        default:
            return previouslySelectedServices;
       }
    };



const rules : PriceCalculationRule[] = [
    getPriceForPhotographyOnly,
    getPriceForVideoRecordingOnly,
    getPriceForPhotographyAndVideoRecordingPackage,
    getPriceForWeddingSession,
    getPriceForTwoDayEvent,
    getPriceForBluerayPackage,
    getPriceWithWeddingSessionDiscount
];

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear): Price => {
    
    let basePrice : Price = {
        basePrice: 0,
        finalPrice: 0,
    };

    for (const rule of rules) {
       basePrice = rule(basePrice,selectedServices,selectedYear); 
    }

    return basePrice;
};






