import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PersistanceService {
    set(key: string, value: unknown) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            console.log('Saving data to local storage');
        } catch (error) {
            console.error('Error saving to local storage', error);
        }
    }

    get(key: string): unknown {
        try {
            const localStorageData = localStorage.getItem(key);
            return localStorageData ? JSON.parse(localStorageData) : null;
        } catch (error) {
            console.error('Error getting from local storage', error);
            return null;
        }
    }
}
