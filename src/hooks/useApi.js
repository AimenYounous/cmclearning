import { useState, useEffect, useCallback } from 'react';
export function useApi(apiCall, options = {}) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const execute = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await apiCall();
            setData(result);
            options.onSuccess?.(result);
            return result;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'An error occurred';
            setError(message);
            options.onError?.(message);
            throw err;
        }
        finally {
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
