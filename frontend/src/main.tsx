import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import './styles.css';
import ErrorBoundary from './helpers/ErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(
    <ErrorBoundary>
          <App />
    </ErrorBoundary>
)
