class LocalStorageService {
    get<T>(key: string): T | null {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item): null;
        } catch (error) {
            return null;
        }
    }

    set<T>(key: string, value: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {}
    }
}

export const localStorageService = new LocalStorageService();
