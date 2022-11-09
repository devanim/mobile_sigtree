const memoryStore: any = {};

export const assetCache = {
    setItem: async (key: string, value: string): Promise<void> => {
        memoryStore[key] = value;
    },

    getAllKeys: async (): Promise<string[]> => {
        return Object.keys(memoryStore);
    },

    getItem: (key: string): string => {
        return memoryStore[key];
    },

    multiGet: async (keys: string[]): Promise<any[][]> => {
        const results: any[][] = [];
        for (const key of keys) {
            results.push([key, memoryStore[key]]);
        }

        return results;
    },

    multiRemove: async (keys: string[]): Promise<void> => {
        for (const key of keys) {
            delete memoryStore[key];
        }
    },

    removeItem: async (key: string): Promise<void> => {
        delete memoryStore[key];
    }
};