import { hasBlueRayPackage, hasPhotography, hasTwoDayEvent, hasVideoRecording, hasVideoRecordingOrPhotography, hasWeddingSession, ServiceType } from "../shared/service-type";
import { ServiceYear } from "../shared/service-year";
import { costProvider } from "./costs/cost-provider";
import { Price } from "./price";

export type PriceCalculationRule = (price: Price, selectedServices: ServiceType[], selectedYear: ServiceYear) => Price;



export const getPriceForPhotographyOnly: PriceCalculationRule = (price: Price, selectedServices: ServiceType[], selectedYear: ServiceYear): Price => {

    if (hasPhotography(selectedServices) && !hasVideoRecording(selectedServices)) {
        return {
            basePrice: costProvider.photographyCost(selectedYear),
            finalPrice: costProvider.photographyCost(selectedYear),
        }
    }

    return price;
}

export const getPriceForVideoRecordingOnly: PriceCalculationRule = (price: Price, selectedServices: ServiceType[], selectedYear: ServiceYear): Price => {

    if (hasVideoRecording(selectedServices) && !hasPhotography(selectedServices)) {
        return {
            basePrice: costProvider.videoCost(selectedYear),
            finalPrice: costProvider.videoCost(selectedYear),
        }
    }

    return price;
}

export const getPriceForPhotographyAndVideoRecordingPackage: PriceCalculationRule = (price: Price, selectedServices: ServiceType[], selectedYear: ServiceYear): Price => {

    if (hasPhotography(selectedServices) && hasVideoRecording(selectedServices)) {
        return {
            basePrice: costProvider.packageVideoAndPhotography(selectedYear),
            finalPrice: costProvider.packageVideoAndPhotography(selectedYear),
        }
    }

    return price;
}

export const getPriceForWeddingSession: PriceCalculationRule = (price: Price, selectedServices: ServiceType[], selectedYear: ServiceYear): Price => {

    if (hasWeddingSession(selectedServices)) {
        return {
            basePrice: price.basePrice + costProvider.weddingSessionCost(selectedYear),
            finalPrice: price.finalPrice + costProvider.weddingSessionCost(selectedYear),
        }
    }

    return price;
}


export const getPriceForTwoDayEvent: PriceCalculationRule = (price: Price, selectedServices: ServiceType[], selectedYear: ServiceYear): Price => {

    if (hasTwoDayEvent(selectedServices) && (hasVideoRecordingOrPhotography(selectedServices))) {
        return {
            basePrice: price.basePrice + costProvider.twoDayEventCost(selectedYear),
            finalPrice: price.finalPrice + costProvider.twoDayEventCost(selectedYear),
        }
    }

    return price;
}

export const getPriceForBluerayPackage: PriceCalculationRule = (price: Price, selectedServices: ServiceType[], selectedYear: ServiceYear): Price => {

    if (hasBlueRayPackage(selectedServices) && hasVideoRecording(selectedServices)) {
        return {
            basePrice: price.basePrice + costProvider.extraBlueRayCost(selectedYear),
            finalPrice: price.finalPrice + costProvider.extraBlueRayCost(selectedYear),
        }
    }

    return price;
}


export const getPriceWithWeddingSessionDiscount: PriceCalculationRule = (price: Price, selectedServices: ServiceType[], selectedYear: ServiceYear): Price => {

    if (hasWeddingSession(selectedServices) && hasPhotography(selectedServices) && selectedYear === 2022) {

        const discount = costProvider.weddingSessionCost(selectedYear);

        return {
            basePrice: price.basePrice,
            finalPrice: price.finalPrice - discount,
        }
    }

    else if (hasWeddingSession(selectedServices) && hasVideoRecordingOrPhotography(selectedServices)) {

        const discount = costProvider.weddingSessionCost(selectedYear) - costProvider.weddingSessionWithPhotographyOrVideoCost(selectedYear);

        return {
            basePrice: price.basePrice,
            finalPrice: price.finalPrice - discount,
        }
    }

    return price;
}


