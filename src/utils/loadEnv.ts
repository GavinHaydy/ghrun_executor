export async function LoadRuntimeEnv(): Promise<Record<string, string>> {
    const res = await fetch('/config.env');
    const text = await res.text();

    const env: Record<string, string> = {};
    text.split('\n').forEach((line) => {
        const [key, ...rest] = line.split('=');
        if (key && !key.startsWith('#')) {
            env[key.trim()] = rest.join('=').trim();
        }
    });

    return env;
}