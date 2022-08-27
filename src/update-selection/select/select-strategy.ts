import { ServiceType, hasVideoRecording, hasVideoRecordingOrPhotography } from "../../shared/service-type";
import { ChangeStateHandler, returnPreviousServices, addAndReturnUniqueServices } from "../change-state-handler";

export const selectStrategy = (services: ServiceType[], service: ServiceType) : ChangeStateHandler =>{
    if (service === "BlurayPackage" && !hasVideoRecording(services)){
        return returnPreviousServices;
    }
    else if (service === "TwoDayEvent" && !hasVideoRecordingOrPhotography(services)){
        return returnPreviousServices;
    }
    return addAndReturnUniqueServices;
};