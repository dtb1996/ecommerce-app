import { AuthProvider } from "./context/AuthContext"
import AppRouter from "./routes/AppRouter"

function App() {
    return (
        <AuthProvider>
            <AppRouter />
            {/* TODO: add global toaster/modal */}
        </AuthProvider>
    )
}

export default App
