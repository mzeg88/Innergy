import { ServiceType } from "../shared/service-type";
import { uniq } from "../utils/uniq";

export type ChangeStateHandler = (services: ServiceType[], service: ServiceType) => ServiceType[];

export const returnPreviousServices : ChangeStateHandler  = (services: ServiceType[], service: ServiceType) : ServiceType[] => services;

export const addAndReturnUniqueServices : ChangeStateHandler =(services: ServiceType[], service: ServiceType) : ServiceType[] => uniq([...services,service]);

export const removeService : ChangeStateHandler = (services: ServiceType[], service: ServiceType): ServiceType[] => services.filter(e=>e!==service);

export const removeServiceWithExtraService = (extraService: ServiceType): ChangeStateHandler => 
    (services: ServiceType[], service: ServiceType): ServiceType[] => removeService(services, service).filter(e => e !== extraService);
