import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import AppRouter from "./routes/AppRouter"

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <AppRouter />
                {/* TODO: add global toaster/modal */}
            </CartProvider>
        </AuthProvider>
    )
}

export default App
