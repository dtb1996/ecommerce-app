import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import Layout from "@/components/Layout/Layout"
import ProtectedRoute from "./ProtectedRoute"

const HomePage = lazy(() => import("@/pages/HomePage/HomePage"))
const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage"))
const CartPage = lazy(() => import("@/pages/CartPage/CartPage"))
const ProductsPage = lazy(() => import("@/pages/ProductsPage/ProductsPage"))
const ProductDetailsPage = lazy(() => import("@/pages/ProductDetailsPage/ProductDetailsPage"))

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
                                // <ProtectedRoute>
                                <CartPage />
                                // </ProtectedRoute>
                            }
                        />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/products/:id" element={<ProductDetailsPage />} />
                    </Route>

                    {/* Todo: Add route for invalid paths */}
                    {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
