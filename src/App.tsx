import "./App.css"

function App() {
    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-slate-800 text-white">
                <h1 className="text-4xl font-bold">Tailwind is working!</h1>
            </div>
            <div className="bg-bg-light shadow-elevation1 rounded-xl p-4 hover:shadow-elevation2 transition-shadow">
                <img src="/shoe.jpg" alt="Sneaker" className="rounded-md mb-3" />
                <h3 className="text-lg font-semibold text-text">AirLite Runner</h3>
                <p className="text-textMuted text-sm mb-2">$129.99</p>
                <button className="bg-primary text-white py-2 px-4 rounded-md hover:brightness-110">
                    Add to Cart
                </button>
            </div>
        </>
    )
}

export default App
