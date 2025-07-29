/// <reference types="vite/client" />
export {}
declare global {
    interface Window{
        RUNTIME_ENV?: Record<string, string>
    }
}