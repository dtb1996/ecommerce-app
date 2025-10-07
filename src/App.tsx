import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Cart from "./pages/Cart/Cart"
import { useEffect, useState } from "react"
import type { Product } from "./types/Product"
import { supabase } from "./api/supabaseClient"

function App() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts(): Promise<void> {
        const { data, error } = await supabase.from("products").select()
        console.log("Supabase data:", data)
        if (error) {
            console.error("Error fetching products:", error)
            setProducts([])
        } else if (data) {
            setProducts(data)
        }
    }

    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/products">Products</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                    path="/products"
                    element={
                        <>
                            <h1>This is the Products page</h1>
                            <div>
                                {products.map((product) => (
                                    <div key={product.id}>{product.name}</div>
                                ))}
                            </div>
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
