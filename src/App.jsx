import TypingArea from './components/TypingArea'

function App() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-bg-dark">
            <div className="absolute top-8 left-8">
                <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
                    TypeFlow
                </h1>
            </div>

            <TypingArea />

            <div className="absolute bottom-8 text-text-sub/20 text-sm">
                Premium Typing Experience
            </div>
        </div>
    )
}

export default App
