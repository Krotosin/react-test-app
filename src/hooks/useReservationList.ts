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

    function addReservation(deskReservation: reservation) {
        try {
            setIsLoading(true);
            setError(null);
            
            const newReservation: reservation = {
                employeeId: deskReservation.employeeId,
                employeeName: deskReservation.employeeName,
                employeeEmail: deskReservation.employeeEmail,
                chosenDesk: deskReservation.chosenDesk,
                reservationDate: deskReservation.reservationDate
            };

            setReservationList((prevReservationList) => {
                const updatedReservationList = [...prevReservationList, newReservation];

                localStorage.setItem('reservations', JSON.stringify(updatedReservationList));

                return updatedReservationList;
            });
        } catch (error) {
            setError("Błąd w dodawaniu nowej rezerwacji.");
                console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        reservationList,
        addReservation,
        isLoading,
        setIsLoading,
        error
    }
}