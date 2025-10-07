import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import Layout from "@/components/Layout/Layout"
import ProtectedRoute from "./ProtectedRoute"

const HomePage = lazy(() => import("@/pages/Home/Home"))
const LoginPage = lazy(() => import("@/pages/Login/Login"))
const CartPage = lazy(() => import("@/pages/Cart/Cart"))
const ProductsPage = lazy(() => import("@/pages/Products/Products"))

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/cart"
                            element={
                                <ProtectedRoute>
                                    <CartPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/products" element={<ProductsPage />} />
                    </Route>

                    {/* Todo: Add route for invalid paths */}
                    {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
