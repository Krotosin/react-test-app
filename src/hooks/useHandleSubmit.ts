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
        addReservationToLocalStorage,
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

        if(!isReady) {
            setSubmitError(new Error("API i/lub reservationList nie są gotowe."));
            return;
        };
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
            const form = event.currentTarget;
            const formData = new FormData(form);

            // Read form values
            const employeeIdRaw = formData.get("employee_id") as string;
            const employeeId = employeeIdRaw ? Number(employeeIdRaw) : NaN;

            const employeeName = formData.get("employee_name") as string;
            const employeeEmail = formData.get("employee_email") as string;
            const chosenDesk = formData.get("chosen_desk") as string;

            const reservationDateRaw = formData.get("reservation_date") as string;
            const reservationDate = reservationDateRaw ? new Date(reservationDateRaw) : undefined;
            
            const employee = apiEmployeeList.find( apiEmployee =>
                apiEmployee.id === employeeId && 
                apiEmployee.name === employeeName &&
                apiEmployee.email === employeeEmail
             );
            
            if(!employee) {
                setIsSubmitting(false);
                setSubmitSuccess(false);
                setSubmitError(new Error("Niepoprawne dane."));
                alert("Niepoprawne dane.");
                return;
            }

            await addReservationToLocalStorage({
                employeeId,
                employeeName,
                employeeEmail,
                chosenDesk,
                reservationDate
            });
            
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