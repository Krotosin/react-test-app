import { useState, useEffect } from "react";
import type { reservation } from "../utils/reservationType";

export default function useReservationList() {
    const [ reservationList, setReservationList ] = useState<reservation[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        try {
            const storedReservations = localStorage.getItem('reservations');
            if (storedReservations) {
                setReservationList(JSON.parse(storedReservations));
            }
        } catch(error) {
            setError("Wystąpił błąd w odczytywaniu listy rezerwacji.")
            console.error(error);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('reservations', JSON.stringify(reservationList));
    }, [reservationList]);

    function addReservationToLocalStorage(newReservation: reservation) {
        try {
            setIsLoading(true);
            setError(null);
            setReservationList(prevReservationList => [...prevReservationList, newReservation]);
        } catch (error) {
            setError("Błąd w dodawaniu nowej rezerwacji.");
                console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        reservationList,
        addReservationToLocalStorage,
        isLoading,
        setIsLoading,
        error
    }
}