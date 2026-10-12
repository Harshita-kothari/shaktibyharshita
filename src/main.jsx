import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import AppRoutes from './AppRoutes';
createRoot(document.getElementById('root')).render(<StrictMode><AppRoutes/></StrictMode>);

if('serviceWorker' in navigator&&import.meta.env.PROD){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{});});}
