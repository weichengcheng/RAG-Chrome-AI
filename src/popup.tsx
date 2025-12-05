import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import ChromeApp from './ChromeApp.tsx'

createRoot(document.getElementById('chrome-root')!).render(
  <Suspense fallback={<div>后备UI</div>}>
    <ChromeApp />
  </Suspense>
)
