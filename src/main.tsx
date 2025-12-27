// StrictMode
import { Suspense, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import App from './App.tsx'
import './ts-interview.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>后备UI</div>}>
        <App />
      </Suspense>
    </Provider>
  </StrictMode>,
)
