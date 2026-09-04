import { useState } from "react";
import sleep from "../utils/delay.ts"
import useFetchEmployeeList from "./useFetchEmployeeList";
import useReservationList from "./useReservationList";

export default function useHandleSubmit() {
    
    const { 
        employeeList: apiEmployeeList,
        isLoading: apiLoading,
        error: apiError
      } = useFetchEmployeeList();

    const { 
        addReservation,
        reservationList,
        isLoading: reservationListLoading,
        error: reservationListError
     } = useReservationList();

    const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
    const [ submitError, setSubmitError] = useState<Error | null>(null);
    const [ submitSuccess, setSubmitSuccess ] = useState<boolean>(false);

     const isReady = 
        !apiLoading &&
        !reservationListLoading &&
        !!apiEmployeeList &&
        !!reservationList &&
        !apiError && 
        !reservationListError;
    
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        // Checking if API fetch and localStorage handling is complete
        if(!isReady) {
            setSubmitError(new Error("API i/lub reservationList nie są gotowe."));
            return;
        };
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        // Main body of function
        try {
            const form = event.currentTarget;
            const formData = new FormData(form);

            // Read form values
            const employeeIdRaw = formData.get("employee_id") as string;
            const employeeId = employeeIdRaw ? Number(employeeIdRaw) : NaN;

            const employeeName = formData.get("employee_name") as string;
            const employeeEmail = formData.get("employee_email") as string;
            const chosenDesk = formData.get("chosen_desk") as string;

            const reservationDate = formData.get("reservation_date") as string;
            
            // Checking if submitted employee data matches employee list
            const employeeCheck = apiEmployeeList.find( apiEmployee =>
                apiEmployee.id === employeeId && 
                apiEmployee.name === employeeName &&
                apiEmployee.email === employeeEmail
            );
            if(!employeeCheck) {
                setIsSubmitting(false);
                setSubmitSuccess(false);
                setSubmitError(new Error("Niepoprawne dane."));
                alert("Niepoprawne dane.");
                return;
            };

            //Check to prevent multiple reservations for the same desk on the same day
            const reservationDateCheck = reservationList.find( reservation =>
                reservation.chosenDesk === chosenDesk && 
                reservation.reservationDate === reservationDate
            );
            if(reservationDateCheck){
                setIsSubmitting(false);
                setSubmitSuccess(false);
                setSubmitError(new Error("Próba rezerwacji biurka już zarezerwowanego."));
                alert("To biurko jest już zarezerwowane na ten dzień.");
                return;
            };

            //Check to prevent an employee from reserving multiple desks for one day
            const reservationEmployeeCheck = reservationList.find( reservation =>
                reservation.employeeId === employeeId && 
                reservation.employeeName === employeeName &&
                reservation.employeeEmail === employeeEmail &&
                reservation.reservationDate === reservationDate
            );
            if(reservationEmployeeCheck){
                setIsSubmitting(false);
                setSubmitSuccess(false);
                setSubmitError(new Error("Próba rezerwacji dwóch biurek w jeden dzień"));
                alert("Nie można zarezerwować dwóch biurek na ten sam dzień.");
                return;
            };

            // Adding reservation to reservationList
            await addReservation({
                employeeId,
                employeeName,
                employeeEmail,
                chosenDesk,
                reservationDate
            });
            
            // Simulating loading
            await sleep(1000);
            
            setSubmitSuccess(true);
        } catch (err) {
            const submitError = err instanceof Error ? err : new Error("Submit failed");
            setSubmitError(submitError);
        } finally {
            setIsSubmitting(false);
        }
    };
    return {
        handleSubmit,
        isSubmitting,
        submitSuccess,
        submitError
    }
};