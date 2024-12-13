import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';

export default function useAppwrite(funct) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await funct();
            setData(response);
        } catch (error) {
            console.log(error);
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false);
        }
    }, [funct]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, refetch: fetchData };
}