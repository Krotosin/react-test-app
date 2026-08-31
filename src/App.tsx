import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Form from './components/Form.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Form 
        formId={'reservation_form'}
        formTitle={'Formularz rezerwacji'}
      />
    </StrictMode>,
)