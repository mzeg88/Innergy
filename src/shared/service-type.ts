
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";



export type ServiceTypeCheck = (services: ServiceType[]) => boolean;

export const hasVideoRecording : ServiceTypeCheck = (services: ServiceType[]): boolean => services.includes("VideoRecording");
export const hasPhotography : ServiceTypeCheck = (services: ServiceType[]): boolean => services.includes("Photography");
export const hasBlueRayPackage : ServiceTypeCheck = (services: ServiceType[]): boolean => services.includes("BlurayPackage");
export const hasTwoDayEvent : ServiceTypeCheck = (services : ServiceType[]): boolean => services.includes("TwoDayEvent");
export const hasWeddingSession : ServiceTypeCheck = (services : ServiceType[]): boolean => services.includes("WeddingSession");
export const hasVideoRecordingOrPhotography : ServiceTypeCheck = (services : ServiceType[]): boolean => hasVideoRecording(services) || hasPhotography(services);