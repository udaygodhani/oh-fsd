import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserDataProvider from './context/data/UserDataProvider.jsx';

createRoot(document.getElementById('root')).render(
  <UserDataProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserDataProvider>
)
