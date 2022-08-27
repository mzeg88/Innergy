import { ServiceYear } from "../../shared/service-year";

export const costProvider = {
    photographyCost: (year: ServiceYear): number => {
        switch (year) {
            case 2020:
                return 1700;
                break;
            case 2021:
                return 1800;
                break;
            case 2022:
                return 1900;
            default:
                throw new Error(`Price for year ${year} not found`);
                break;
        }

    },

    videoCost: (year: ServiceYear): number => {

        switch (year) {
            case 2020:
                return 1700;
                break;
            case 2021:
                return 1800;
                break;
            case 2022:
                return 1900;
            default:
                throw new Error(`Price for year ${year} not found`);
                break;
        }

    },
    packageVideoAndPhotography: (year: ServiceYear): number => {

        switch (year) {
            case 2020:
                return 2200;
                break;
            case 2021:
                return 2300;
                break;
            case 2022:
                return 2500;
            default:
                throw new Error(`Price for year ${year} not found`);
                break;
        }

    },
    weddingSessionCost: (year: ServiceYear): number => {
        return 600;
    },
    weddingSessionWithPhotographyOrVideoCost: (year: ServiceYear): number => {
        return 300;
    },
    extraBlueRayCost: (year: ServiceYear): number => {
        return 300;
    },
    twoDayEventCost: (year: ServiceYear): number => {
        return 400;
    },
};