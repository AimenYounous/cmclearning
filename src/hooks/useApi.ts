import { useState, useEffect, useCallback } from 'react';

interface UseApiOptions<T> {
    immediate?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
}

export function useApi<T>(
    apiCall: () => Promise<T>,
    options: UseApiOptions<T> = {}
) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await apiCall();
            setData(result);
            options.onSuccess?.(result);
            return result;
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'An error occurred';
            setError(message);
            options.onError?.(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [apiCall]);

    useEffect(() => {
        if (options.immediate !== false) {
            execute();
        }
    }, []);

    return { data, isLoading, error, execute, setData };
}
