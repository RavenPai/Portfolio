import { Suspense, lazy } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'

const Home = lazy(() => import('./pages/Home'))

const App = () => {
  return (
    <ThemeProvider>
      <Suspense
        fallback={
          <div className="min-h-screen bg-page-light text-slate-500 dark:bg-page-dark dark:text-slate-300 flex items-center justify-center">
            Loading portfolio...
          </div>
        }
      >
        <Home />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
