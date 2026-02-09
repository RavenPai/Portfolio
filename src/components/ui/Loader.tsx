interface LoaderProps {
    size?: number
    className?: string
}

export const Loader = ({ size = 80, className = '' }: LoaderProps) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <img
                src="/loading.gif"
                alt="Loading..."
                style={{ width: `${size}px`, height: `${size}px` }}
                className="object-contain"
            />
        </div>
    )
}
