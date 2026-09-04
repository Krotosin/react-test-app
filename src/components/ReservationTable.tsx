import useReservationList from "../hooks/useReservationList.ts";
import type { reservation } from "../utils/reservationType.ts";

export default function ReservationTable(){
    
    const { reservationList } = useReservationList();

    const tableColumns = [
        'Numer pracownika', 
        'Imię i nazwisko', 
        'Adres e-mail', 
        'Wybrane biurko', 
        'Data rezerwacji'];
    const tableTitle = "Tabela rezerwacji"
    const tableId = "reservation_table"

    const localStorageContent = localStorage.getItem("reservations")
    const tableContent = JSON.parse(localStorageContent);

    return (
            <>
                <table id={tableId}>
                   <caption>{tableTitle}</caption>
                   <thead id={`${tableId}_head`}>
                        <tr>
                            {tableColumns.map((column, columnIndex) => (
                                <td key={columnIndex}>{column}</td>
                            ))}
                        </tr>
                   </thead>
                   <tbody id={`${tableId}_body`}>
                        {tableContent.map((reservation: reservation, reservationIndex: number) => (
                            <tr key={reservationIndex}>
                                <td>{reservation.employeeId}</td>
                                <td>{reservation.employeeName}</td>
                                <td>{reservation.employeeEmail}</td>
                                <td>{reservation.chosenDesk}</td>
                                <td>{String(reservation.reservationDate)}</td>
                            </tr>

                        ))}
                   </tbody>
                </table>
            </>
    )
}