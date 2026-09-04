import { useState, useEffect } from "react";
import type { reservation } from "../utils/reservationType";

export default function useReservationList() {
    const [ reservationList, setReservationList ] = useState<reservation[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    function addReservation(newReservation: reservation) {
        try {
            setIsLoading(true);
            setError(null);
            setReservationList(prev => [...prev, newReservation]);
        } catch (err) {
            setError("Błąd w dodawaniu nowej rezerwacji.");
                console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        localStorage.setItem('reservations', JSON.stringify(reservationList));
    }, [reservationList]);

    return {
        reservationList,
        setReservationList,
        addReservation,
        isLoading,
        setIsLoading,
        error
    }
}