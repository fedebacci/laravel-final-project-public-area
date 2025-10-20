// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'



// # BOOTSTRAP SETUP
// - BOOTSTRAP CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// - BOOTSTRAP JS
import * as bootstrap from 'bootstrap';



// # CUSTOM RESOURCES SETUP
// - CUSTOM CSS
import './assets/css/index.css';
// - CUSTOM JS
import App from './App.jsx';



createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
