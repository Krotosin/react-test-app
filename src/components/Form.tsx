import Input_field from "./InputField.tsx"
import Input_select from "./InputSelect.tsx"
import Button from "./Button.tsx"
import TableDisplay from "./TableDisplay.tsx"
import Fieldset from "./Fieldset.tsx"

type Props = {
    supplied_id: string;
    form_title: string;
};


function set_loading_state(is_loading: boolean) {
    const submit_button = document.getElementById("submit_button") as HTMLButtonElement;
    const button_text = document.getElementById("button_text") as HTMLSpanElement;
    const spinner = document.getElementById("spinner") as HTMLSpanElement;

    submit_button.disabled = is_loading;
    spinner.classList.toggle('visible', is_loading);
    button_text.textContent = is_loading ? "Ładowanie... " : "Wyślij";
}


function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    set_loading_state(true);

    const submitted_name = (event.currentTarget.elements.namedItem('employee_name') as HTMLInputElement).value;
    const submitted_email = (event.currentTarget.elements.namedItem('employee_email') as HTMLInputElement).value;
    const submitted_desk = (event.currentTarget.elements.namedItem('chosen_desk') as HTMLSelectElement).value;
    const submitted_date = (event.currentTarget.elements.namedItem('reservation_date') as HTMLInputElement).value;

    const form_data = [submitted_name, submitted_email, submitted_desk, submitted_date];

    const table_body = document.getElementById('reservation_table_body') as HTMLTableSectionElement;

    setTimeout(() => {
      const new_row = table_body.insertRow();
      form_data.forEach((data) => {
        const new_cell = new_row.insertCell();
        new_cell.textContent = data;
      });
      set_loading_state(false);
    }, 1000 ); // Simulate a delay for loading state
    
  }

export default function Form({ supplied_id, form_title }: Props) {  
  return (
    <>
      <Fieldset fieldset_title={form_title}>
        <form id={supplied_id} name={form_title} method="post" onSubmit={handleSubmit}>
          <Input_field
            supplied_id='employee_name'
            supplied_label='Imię i nazwisko: '
            supplied_type='text'
            isRequired={false}
          />
          <Input_field
            supplied_id='employee_email'
            supplied_label='Adres e-mail: '
            supplied_type='email'
            isRequired={false}
          />
          <br/>
          <Input_select
            supplied_id='chosen_desk'
            supplied_label='Wybierz biurko '
            isRequired={false}
            choice_list={[
              ['Piętro 1.', 'Biurko 1.1', 'Biurko 1.2', 'Biurko 1.3'], 
              ['Piętro 2.', 'Biurko 2.1', 'Biurko 2.2', 'Biurko 2.3', 'Biurko 2.4', 'Biurko 2.5'],
              ['Piętro 3.', 'Biurko 3.1', 'Biurko 3.2', 'Biurko 3.3', 'Biurko 3.4'],
              ['Piętro 4.', 'Biurko 4.1', 'Biurko 4.2', 'Biurko 4.3', 'Biurko 4.4', 'Biurko 4.5', 'Biurko 4.6'],      
            ]}
          />
          <br/>
          <Input_field
            supplied_id='reservation_date'
            supplied_label='Data rezerwacji: '
            supplied_type='date'
            isRequired={false}
          />
          <Button 
          supplied_id='submit_button'
          supplied_type='submit'
          supplied_label={'Wyślij'}
          />
        </form>
      </Fieldset>
      <br/>
      <br/>
      <TableDisplay 
      supplied_id={'reservation_table'}
      table_title={'Tabela rezerwacji'}
      columns={['Imię i nazwisko', 'Adres e-mail', 'Wybrane biurko', 'Data rezerwacji']}
      />      
    </>
  );
};