import Input_field from "./InputField.tsx"
import Input_select from "./InputSelect.tsx"
import Button from "./Button.tsx"
import TableDisplay from "./TableDisplay.tsx"
import Fieldset from "./Fieldset.tsx"

const api_url = 'https://jsonplaceholder.typicode.com/users'

type Props = {
    supplied_id: string;
    form_title: string;
};

interface employee {
    id: number,
    name: string,
    email: string,
}


function set_loading_state(is_loading: boolean) {
    const submit_button = document.getElementById("submit_button") as HTMLButtonElement;
    const button_text = document.getElementById("button_text") as HTMLSpanElement;
    const spinner = document.getElementById("spinner") as HTMLSpanElement;

    submit_button.disabled = is_loading;
    spinner.classList.toggle('visible', is_loading);
    button_text.textContent = is_loading ? "Ładowanie... " : "Wyślij";
}

async function fetch_employee_list() {
    try {
        const response = await fetch(api_url);
        if (!response.ok){
            alert("An error has occured - please check you internet connection, and try again in a moment.");
            throw new Error(`HTTP error: ${response.status}`)
        }
        const api_employee_list: employee[] = await response.json();
        return api_employee_list.map((employee) => [employee.id, employee.name, employee.email])
    }
    catch(error) {
        alert("An error has occured - please check you internet connection, and try again in a moment.");
        throw new Error('An error in the API fetch has occured:', { cause: error });
    }    
}


async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    set_loading_state(true); // Simulate loading

    const table_body = document.getElementById('reservation_table_body') as HTMLTableSectionElement; // Getting the table body element

    const submitted_name = (event.currentTarget.elements.namedItem('employee_name') as HTMLInputElement).value;     // Getting the data from the form fields
    const submitted_email = (event.currentTarget.elements.namedItem('employee_email') as HTMLInputElement).value;
    const submitted_desk = (event.currentTarget.elements.namedItem('chosen_desk') as HTMLSelectElement).value;
    const submitted_date = (event.currentTarget.elements.namedItem('reservation_date') as HTMLInputElement).value;

    const form_data = [submitted_name, submitted_email, submitted_desk, submitted_date]; // Saving the for mdata in an array for easier handling
    const employee_list = await fetch_employee_list();

    let is_user_allowed: boolean = false;

    for(let i = 0; i < employee_list.length; i++) {
        if (employee_list[i][1] === submitted_name && employee_list[i][2] === submitted_email) {
            is_user_allowed = true;
            break;
        }
    }
    
    setTimeout(() => {

    if(!is_user_allowed) {
      alert("Niepoprawne dane - proszę sprawdzić imię i nazwisko oraz adres e-mail.");
      set_loading_state(false);
    } else {
      const new_row = table_body.insertRow();
      form_data.forEach((data) => {
        const new_cell = new_row.insertCell();
        new_cell.textContent = data;
      });
      set_loading_state(false);
    };

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
            isRequired={true}
          />
          <Input_field
            supplied_id='employee_email'
            supplied_label='Adres e-mail: '
            supplied_type='email'
            isRequired={true}
          />
          <br/>
          <Input_select
            supplied_id='chosen_desk'
            supplied_label='Wybierz biurko '
            isRequired={true}
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
            isRequired={true}
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