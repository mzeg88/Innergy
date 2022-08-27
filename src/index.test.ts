import { updateSelectedServices, calculatePrice } from ".";
import { ServiceType } from "./shared/service-type";
import { ServiceYear } from "./shared/service-year";


describe("updateSelectedServices.select", () => {
    test("should select when not selected", () => {
        const result = updateSelectedServices([], { type: "Select", service: "Photography" });
        expect(result).toEqual(["Photography"]);
    });

    test("should not select the same service twice", () => {
        const result = updateSelectedServices(["Photography"], { type: "Select", service: "Photography" });
        expect(result).toEqual(["Photography"]);
    });

    test("should not select related service when main service is not selected", () => {
        const result = updateSelectedServices(["WeddingSession"], { type: "Select", service: "BlurayPackage" });
        expect(result).toEqual(["WeddingSession"]);
    });

    test("should not select related service when main service is not selected", () => {
        const result = updateSelectedServices([], { type: "Select", service: "TwoDayEvent" });
        expect(result).toEqual([]);
    });

    test("should select related service when main service is selected", () => {
        const result = updateSelectedServices(["WeddingSession", "VideoRecording"], {
            type: "Select",
            service: "BlurayPackage"
        });
        expect(result).toEqual(["WeddingSession", "VideoRecording", "BlurayPackage"]);
    });

    test("should select related service when main service is selected for VideoRecording and TwoDayEvent", () => {
        const result = updateSelectedServices(["WeddingSession", "VideoRecording"], {
            type: "Select",
            service: "TwoDayEvent"
        });
        expect(result).toEqual(["WeddingSession", "VideoRecording", "TwoDayEvent"]);
    });

    test("should select related service when one of main services is selected for Photography and TwoDayEvent", () => {
        const result = updateSelectedServices(["WeddingSession", "Photography"], {
            type: "Select",
            service: "TwoDayEvent"
        });
        expect(result).toEqual(["WeddingSession", "Photography", "TwoDayEvent"]);
    });
});

describe("updateSelectedServices.deselect", () => {
    test("should deselect", () => {
        const result = updateSelectedServices(["WeddingSession", "Photography"], {
            type: "Deselect",
            service: "Photography"
        });
        expect(result).toEqual(["WeddingSession"]);
    });

    test("should do nothing when service not selected", () => {
        const result = updateSelectedServices(["WeddingSession", "Photography"], {
            type: "Deselect",
            service: "TwoDayEvent"
        });
        expect(result).toEqual(["WeddingSession", "Photography"]);
    });


    test("should deselect related when last main service deselected for Photography and TwoDayEvent", () => {
        const result = updateSelectedServices(["WeddingSession", "Photography", "TwoDayEvent"], {
            type: "Deselect",
            service: "Photography"
        });
        expect(result).toEqual(["WeddingSession"]);
    });

    test("should deselect related when last main service deselected for VideoRecording and TwoDayEvent", () => {
        const result = updateSelectedServices(["WeddingSession", "VideoRecording", "TwoDayEvent"], {
            type: "Deselect",
            service: "VideoRecording"
        });
        expect(result).toEqual(["WeddingSession"]);
    });

    test("should deselect related when last main service deselected for VideoRecording and BluerayPackage", () => {
        const result = updateSelectedServices(["WeddingSession", "VideoRecording", "BlurayPackage"], {
            type: "Deselect",
            service: "VideoRecording"
        });
        expect(result).toEqual(["WeddingSession"]);
    });

    test("should not deselect related when at least one main service stays selected", () => {
        const result = updateSelectedServices(["WeddingSession", "Photography", "VideoRecording", "TwoDayEvent"], {
            type: "Deselect",
            service: "Photography"
        });
        expect(result).toEqual(["WeddingSession", "VideoRecording", "TwoDayEvent"]);
    });
});

describe.each([2020, 2021, 2022])("calculatePrice.zero (%i)", (year: ServiceYear) => {
    test("should be zero with no services selected", () => {
        const result = calculatePrice([], year);
        expect(result).toEqual({ basePrice: 0, finalPrice: 0 });
    });
});

describe.each([
    ["WeddingSession", 2020, 600],
    ["WeddingSession", 2021, 600],
    ["WeddingSession", 2022, 600],
    ["Photography", 2020, 1700],
    ["Photography", 2021, 1800],
    ["Photography", 2022, 1900],
    ["VideoRecording", 2020, 1700],
    ["VideoRecording", 2021, 1800],
    ["VideoRecording", 2022, 1900]
])("calculatePrice.singleService (%s, %i)", (service: ServiceType, year: ServiceYear, expectedPrice) => {
    test("no discount applied", () => {
        const result = calculatePrice([service], year);
        expect(result.basePrice).toBeGreaterThan(0);
        expect(result.finalPrice).toBeGreaterThan(0);
        expect(result.basePrice).toBe(result.finalPrice);
    });

    test("price matches requirements", () => {
        const result = calculatePrice([service], year);
        expect(result).toEqual({ basePrice: expectedPrice, finalPrice: expectedPrice });
    });
});


describe.each([
    [2020, 300],
    [2021, 300],
    [2022, 0]
])("calcularePrice.photographyWithWeddingSessionPrice (%i increase by %i)", (year: ServiceYear, increase) => {
    test("price matches requirements", () => {
        const withoutSession = calculatePrice(["Photography"], year);
        const withSession = calculatePrice(["Photography", "WeddingSession"], year);

        const priceChangeWithSession = withSession.finalPrice - withoutSession.finalPrice;

        expect(withSession.basePrice).toBeGreaterThan(0);
        expect(withSession.finalPrice).toBeGreaterThan(0);
        expect(priceChangeWithSession).toEqual(increase);
    });

    test("discount applied", () => {
        const withoutSession = calculatePrice(["Photography"], year);
        const onlySession = calculatePrice(["WeddingSession"], year);
        const withSession = calculatePrice(["Photography", "WeddingSession"], year);

        const priceWithoutDiscounts = withoutSession.finalPrice + onlySession.finalPrice;

        expect(priceWithoutDiscounts).toBeGreaterThan(withSession.finalPrice);
    });

});


describe.each([
    [2020, 300],
    [2021, 300],
    [2022, 300]
])("calcularePrice.videoRecordingWithWeddingSessionPrice (%i increase by %i)", (year: ServiceYear, increase) => {
    test("price matches requirements", () => {
        const withoutSession = calculatePrice(["VideoRecording"], year);
        const withSession = calculatePrice(["VideoRecording", "WeddingSession"], year);

        const priceChangeWithSession = withSession.finalPrice - withoutSession.finalPrice;

        expect(priceChangeWithSession).toEqual(increase);
    });

    test("discount applied", () => {
        const withoutSession = calculatePrice(["VideoRecording"], year);
        const onlySession = calculatePrice(["WeddingSession"], year);
        const withSession = calculatePrice(["VideoRecording", "WeddingSession"], year);

        const priceWithoutDiscounts = withoutSession.finalPrice + onlySession.finalPrice;

        expect(priceWithoutDiscounts).toBeGreaterThan(withSession.finalPrice);
    });
});


//is package of photography + video an discount?
describe.each([
    [2020, 500],
    [2021, 500],
    [2022, 600]
])("calcularePrice.videoRecordingWithPhotographyPrice (%i increase by %i)", (year: ServiceYear, increase) => {
    test("price matches requirements", () => {
        const withoutPhotography = calculatePrice(["VideoRecording"], year);
        const withPhotography = calculatePrice(["VideoRecording", "Photography"], year);

        const priceChangeWithPhotography = withPhotography.finalPrice - withoutPhotography.finalPrice;

        expect(priceChangeWithPhotography).toEqual(increase);
    });

    test("discount applied", () => {
        const withoutPhotography = calculatePrice(["VideoRecording"], year);
        const onlyPhotography = calculatePrice(["Photography"], year);
        const withPhotography = calculatePrice(["VideoRecording", "Photography"], year);

        const priceWithoutDiscounts = withoutPhotography.finalPrice + onlyPhotography.finalPrice;

        expect(priceWithoutDiscounts).toBeGreaterThan(withPhotography.finalPrice);
    });
});


describe.each([
    [2020, 300],
    [2021, 300],
    [2022, 0]
])(
    "calcularePrice.videoRecordingWithPhotographyWithSessionPrice (%i increase by %i)",
    (year: ServiceYear, increase) => {
        test("price matches requirements", () => {
            const withoutSession = calculatePrice(["VideoRecording", "Photography"], year);
            const withSession = calculatePrice(["VideoRecording", "Photography", "WeddingSession"], year);

            const priceChangeWithSession = withSession.finalPrice - withoutSession.finalPrice;

            expect(withSession.basePrice).toBeGreaterThan(0);
            expect(withSession.finalPrice).toBeGreaterThan(0);
            expect(priceChangeWithSession).toEqual(increase);
        });

        test("discount applied", () => {
            const withoutSession = calculatePrice(["VideoRecording", "Photography"], year);
            const onlySession = calculatePrice(["WeddingSession"], year);
            const withSession = calculatePrice(["VideoRecording", "Photography", "WeddingSession"], year);

            const priceWithoutDiscounts = withoutSession.finalPrice + onlySession.finalPrice;

            expect(priceWithoutDiscounts).toBeGreaterThan(withSession.finalPrice);
        });
    }
);

//extra tests

describe.each([
    [2020, 2300,2000],
    [2021, 2400,2100],
    [2022, 2500,1900]
])("calcularePrice.photographyWithWeddingSessionPrice (year: %s, basePrice: %i, finalPrice %p)", (year: ServiceYear, basePrice, finalPrice) => {
    test("price matches requirements", () => {
        
        const actualPrice = calculatePrice(["Photography", "WeddingSession"], year);
        expect(actualPrice.basePrice).toEqual(basePrice);
        expect(actualPrice.finalPrice).toEqual(finalPrice);

    });
});

describe.each([
    [2020, 2300,2000],
    [2021, 2400,2100],
    [2022, 2500,2200]
])("calcularePrice.videoRecordingWithWeddingSessionPrice (year: %s, basePrice: %i, finalPrice %p)", (year: ServiceYear, basePrice,finalPrice) => {
    test("price matches requirements", () => {
        const actualPrice = calculatePrice(["VideoRecording", "WeddingSession"], year);
        expect(actualPrice.basePrice).toEqual(basePrice);
        expect(actualPrice.finalPrice).toEqual(finalPrice);
    });

});

describe.each([
    [2020, 2200,2200],
    [2021, 2300,2300],
    [2022, 2500,2500]
])("calcularePrice.videoRecordingWithPhotographyPrice (year: %s, basePrice: %i, finalPrice %p)", (year: ServiceYear, basePrice, finalPrice) => {
    test("price matches requirements", () => {
        const actualPrice = calculatePrice(["VideoRecording", "Photography"], year);
        expect(actualPrice.basePrice).toEqual(basePrice);
        expect(actualPrice.finalPrice).toEqual(finalPrice)
    });
});

describe.each([
    [2020, 2800,2500],
    [2021, 2900,2600],
    [2022, 3100,2500]
])(
    "calcularePrice.videoRecordingWithPhotographyWithSessionPrice (year: %s, basePrice: %i, finalPrice %p)",
    (year: ServiceYear, basePrice, finalPrice) => {
        test("price matches requirements", () => {
            const actualPrice = calculatePrice(["VideoRecording", "Photography", "WeddingSession"], year);
            expect(actualPrice.basePrice).toEqual(basePrice);
            expect(actualPrice.finalPrice).toEqual(finalPrice);
        });
    }
);


describe.each([
    [2020, 2000,2000],
    [2021, 2100,2100],
    [2022, 2200,2200]
])(
    "calcularePrice.videoRecordingWithExtraBlueRayPrice (year: %s, basePrice: %i, finalPrice %p)",
    (year: ServiceYear, basePrice, finalPrice) => {
        test("price matches requirements", () => {
            const actualPrice = calculatePrice(["VideoRecording", "BlurayPackage"], year);
            expect(actualPrice.basePrice).toEqual(basePrice);
            expect(actualPrice.finalPrice).toEqual(finalPrice);
        });
    }
);


describe.each([
    [2020, 1700,1700],
    [2021, 1800,1800],
    [2022, 1900,1900]
])(
    "calcularePrice.photographyWithExtraBlueRayPrice (year: %s, basePrice: %i, finalPrice %p)",
    (year: ServiceYear, basePrice, finalPrice) => {
        test("price matches requirements", () => {
            const actualPrice = calculatePrice(["Photography", "BlurayPackage"], year);
            expect(actualPrice.basePrice).toEqual(basePrice);
            expect(actualPrice.finalPrice).toEqual(finalPrice);
        });
    }
);


describe.each([
    [2020, 2600,2600],
    [2021, 2700,2700],
    [2022, 2900,2900]
])(
    "calcularePrice.videoRecordingWithPhotographyWithTwoDayEvent (year: %s, basePrice: %i, finalPrice %p)",
    (year: ServiceYear, basePrice, finalPrice) => {
        test("price matches requirements", () => {
            const actualPrice = calculatePrice(["VideoRecording", "Photography", "TwoDayEvent"], year);
            expect(actualPrice.basePrice).toEqual(basePrice);
            expect(actualPrice.finalPrice).toEqual(finalPrice);
        });
    }
);

describe.each([
    [2020, 600,600],
    [2021, 600,600],
    [2022, 600,600]
])(
    "calcularePrice.weddingSessionWithTwoDayEvent (year: %s, basePrice: %i, finalPrice %p)",
    (year: ServiceYear, basePrice, finalPrice) => {
        test("price matches requirements", () => {
            const actualPrice = calculatePrice(["WeddingSession", "TwoDayEvent"], year);
            expect(actualPrice.basePrice).toEqual(basePrice);
            expect(actualPrice.finalPrice).toEqual(finalPrice);
        });
    }
);