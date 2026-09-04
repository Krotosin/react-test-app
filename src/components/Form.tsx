import "../styles/buttonSpinner.css"
import "../styles/table.css"

import React, { useState, useEffect } from "react";

import Fieldset from "./Fieldset.tsx";
import ReservationTable from "./ReservationTable.tsx";
import useHandleSubmit from "../hooks/useHandleSubmit.ts";
import useReservationList from "../hooks/useReservationList.ts";

type formProps = {
    formId: string;
    formTitle: string;
};

export default function Form({ formId, formTitle }: formProps) {

useEffect(() => {
  localStorage.clear();
}, [])

  const [ id, setId ] = useState<number>();
  const [ name, setName ] = useState<string>();
  const [ email, setEmail ] = useState<string>();
  const [ desk, setDesk] = useState<string>();
  const [ date, setDate ] = useState<Date>();

  const { handleSubmit, isSubmitting } = useHandleSubmit();
  const { reservationList } = useReservationList();

  const inputChoiceList = [
    ['Piętro 1.', 'Biurko 1.1', 'Biurko 1.2', 'Biurko 1.3'], 
    ['Piętro 2.', 'Biurko 2.1', 'Biurko 2.2', 'Biurko 2.3', 'Biurko 2.4', 'Biurko 2.5'],
    ['Piętro 3.', 'Biurko 3.1', 'Biurko 3.2', 'Biurko 3.3', 'Biurko 3.4'],
    ['Piętro 4.', 'Biurko 4.1', 'Biurko 4.2', 'Biurko 4.3', 'Biurko 4.4', 'Biurko 4.5', 'Biurko 4.6'],      
  ];
  
  return (
    <>
      <Fieldset fieldsetTitle={formTitle}>
        <form id={formId} name={formTitle} onSubmit={handleSubmit}>
          <label htmlFor="employee_id">Numer pracownika:</label>
          <input
            id='employee_id'
            name="employee_id"
            type='number'
            placeholder='0'
            required={true}
            value={id}
            onChange={(e) => {
              setId(Number(e.target.value));
            }}
          />
          
          <br/>
          
          <label htmlFor="employee_name">Imię i nazwisko:</label>
          <input
            id='employee_name'
            name="employee_name"
            type='text'
            placeholder="Jan Kowaski"
            required={true}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          
          <br/>
          
          <label htmlFor="employee_email">Firmowy adres email:</label>
          <input
            id='employee_email'
            name="employee_email"
            type='email'
            placeholder="jan.kowalski@email.com"
            required={true}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          
          <br/>
          <br/>
          
          <label htmlFor="chosen_desk">Numer rezerwowanego biurka:</label>
          <select
            id="chosen_desk"
            name="chosen_desk"
            required={true}
            value={desk}
            onChange={(e) => {
              setDesk(e.target.value);
            }} 
          >
          {inputChoiceList.map((optionGroup, index) => (
                    <optgroup key={index} label={optionGroup[0]}>
                        {optionGroup.slice(1).map((option, optionIndex) => (
                            <option key={optionIndex} value={option}>{option}</option>
                        ))}
                    </optgroup>
                ))}
          </select>
          
          <br/>
          
          <label htmlFor="employee_date">Data rezerwacji:</label>
          <input
            id='reservation_date'
            name="reservation_date"
            type='date'
            required={true}
            onChange={(e) => {
              setDate(new Date(e.target.value));
            }}
          />
          
          <br/>
          <br/>
          
          <button 
            id="submit-button" 
            type="submit"
            disabled={isSubmitting}
          >
            { isSubmitting ?  
              (
              <>
              <span id="spinner" className="spinner" aria-hidden="true"></span>
              <span>
                Ładowanie...
              </span>
              </>
              ) : (
              <span>
                Wyślij
              </span>
            )}
          </button>
        </form>
      </Fieldset>
      <br/>
      <br/>
      <ReservationTable/>
    </>
  );
};