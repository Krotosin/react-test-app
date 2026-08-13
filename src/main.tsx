import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import Form from './components/Form.tsx'
import TableDisplay from './components/TableDisplay.tsx'
import Fieldset from './components/Fieldset.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Fieldset fieldset_title={"Dane rezerwacji"}>
      <Form 
        supplied_id={'reservation_form'}
        form_title={'Formularz rezerwacji'}
      />
    </Fieldset>
    
    <TableDisplay 
    supplied_id={'reservation_table'}
    table_title={'Tabela rezerwacji'}
    columns={['Imię i nazwisko', 'Adres e-mail', 'Wybrane biurko', 'Data rezerwacji']}
    />
    </StrictMode>,
)
