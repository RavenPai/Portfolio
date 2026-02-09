import { useState, useEffect, type ReactNode } from 'react'
import { Loader } from '../ui/Loader'

interface PreloaderProps {
    children: ReactNode
    minDelay?: number
}

export const Preloader = ({ children, minDelay = 2000 }: PreloaderProps) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const startTime = Date.now()

        const handleLoad = () => {
            const elapsedTime = Date.now() - startTime
            const remainingTime = Math.max(0, minDelay - elapsedTime)

            setTimeout(() => {
                setIsLoading(false)
            }, remainingTime)
        }

        if (document.readyState === 'complete') {
            handleLoad()
        } else {
            window.addEventListener('load', handleLoad)
            return () => window.removeEventListener('load', handleLoad)
        }
    }, [minDelay])

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-slate-950 transition-opacity duration-500">
                <Loader size={100} />
            </div>
        )
    }

    return <>{children}</>
}
