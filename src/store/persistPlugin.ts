import storage from "redux-persist/lib/storage";

export const configGenerator = (key: string,keyPrefix?: string, whitelist?: string[]) => {
    return {
        key: key,
        keyPrefix: keyPrefix||'',
        storage,
        whitelist: whitelist,
    }
}