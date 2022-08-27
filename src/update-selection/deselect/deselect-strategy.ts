import { ServiceType, hasVideoRecording, hasBlueRayPackage, hasTwoDayEvent, hasPhotography } from "../../shared/service-type";
import { ChangeStateHandler, returnPreviousServices, removeServiceWithExtraService, removeService } from "../change-state-handler";

export const deselectStrategy = (services: ServiceType[], service: ServiceType) : ChangeStateHandler =>{
    if (service === "BlurayPackage" && !hasVideoRecording(services)){
        return returnPreviousServices;
    }
    
    else if (service === "VideoRecording" && hasBlueRayPackage(services)){
        return removeServiceWithExtraService("BlurayPackage");
    }

    else if (service === "VideoRecording" && hasTwoDayEvent(services) && !hasPhotography(services)){
        return removeServiceWithExtraService("TwoDayEvent");
    }

    else if (service === "Photography" && hasTwoDayEvent(services) && !hasVideoRecording(services)){
        return removeServiceWithExtraService("TwoDayEvent");
    }

    else if (service === "VideoRecording" && hasPhotography(services)){
        return removeService;
    }

    else if (service === "Photography" && hasVideoRecording(services)){
        return removeService;
    }

    return removeService
};