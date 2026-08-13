import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import Form from './components/Form.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Form 
        supplied_id={'reservation_form'}
        form_title={'Formularz rezerwacji'}
      />
    </StrictMode>,
)