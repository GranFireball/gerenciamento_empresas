import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from './routes/index.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from './components/toast/index.tsx';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Toast/>
        <AppRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
