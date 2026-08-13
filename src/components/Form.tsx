import Input_field from "./InputField.tsx"
import Input_select from "./InputSelect.tsx"
import Button from "./Button.tsx"

type Props = {
    supplied_id: string;
    form_title: string;
};

export default function Form({ supplied_id, form_title }: Props) {
  return (
  <form id={supplied_id} name={form_title} method="post">
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
  );
};