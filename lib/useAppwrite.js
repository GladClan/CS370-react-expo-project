import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

export default function useAppwrite(funct) {
    const [data , setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    const fetchData = async () => {
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
    }

    fetchData();
    }, []);

    const refetch = () => fetchData();

    return { data, isLoading, refetch };
}