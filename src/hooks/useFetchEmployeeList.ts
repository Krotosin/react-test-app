import { useState, useEffect } from "react";
import fetchEmployeeList from "../utils/FetchEmployeeList";

export default function useFetchEmployeeList() {
    const [ employeeList, setEmployeeList ] = useState<{id: number, name: string, email: string }[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    
    useEffect(() => {
        fetchEmployeeList().then((employeeList) => {
            setEmployeeList(employeeList);
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, []);

    return { employeeList, isLoading, error};
}