import { AbstractBaseService } from '../../src/AbstractBaseService.ts';
import { LocalStorageService } from './LocalStorageService.ts';
import { ServicesProvider } from '../../src/ServiceResolverClass.ts';

export class DataService extends AbstractBaseService {
    public env: string;
    public dataType: string;
    constructor(provider: ServicesProvider, dataType: string) {
        super(provider );
        this.env =  'development';
        this.dataType = dataType;
    }
    getFromLocalStorage(key: string): string | null {
        const storageService =  this.servicesProvider.getService(LocalStorageService);
        return storageService.getItem(key);
    }

    async get<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }

}
