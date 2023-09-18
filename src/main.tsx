import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto-condensed/700.css';
import { App } from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<App />);
