import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import Auth0ProviderWrapper from './helper/Auth0ProviderWrapper.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Auth0ProviderWrapper>
      <App />
    </Auth0ProviderWrapper>
  </BrowserRouter>
);
