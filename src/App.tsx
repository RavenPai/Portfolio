import { Suspense, lazy } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { Preloader } from './components/common/Preloader'
import { Loader } from './components/ui/Loader'

const Home = lazy(() => import('./pages/Home'))

const App = () => {
  return (
    <ThemeProvider>
      <Preloader minDelay={2000}>
        <Suspense
          fallback={
            <div className="min-h-screen bg-page-light text-slate-500 dark:bg-page-dark dark:text-slate-300 flex items-center justify-center">
              <Loader size={100} />
            </div>
          }
        >
          <Home />
        </Suspense>
      </Preloader>
    </ThemeProvider>
  )
}

export default App
