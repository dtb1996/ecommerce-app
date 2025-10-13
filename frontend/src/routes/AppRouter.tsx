import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import Layout from "@/components/Layout/Layout"
import ProtectedRoute from "./ProtectedRoute"
import { CheckoutProvider } from "@/context/CheckoutContext"

const HomePage = lazy(() => import("@/pages/HomePage/HomePage"))
const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage"))
const CartPage = lazy(() => import("@/pages/CartPage/CartPage"))
const ProductsPage = lazy(() => import("@/pages/ProductsPage/ProductsPage"))
const ProductDetailsPage = lazy(() => import("@/pages/ProductDetailsPage/ProductDetailsPage"))
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage/CheckoutPage"))
const ShippingInfoPage = lazy(() => import("@/components/Checkout/ShippingForm"))
const ReviewPage = lazy(() => import("@/pages/ReviewPage/ReviewPage"))
const SuccessPage = lazy(() => import("@/pages/SuccessPage/SuccessPage"))

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

                        {/* Checkout */}
                        <Route path="/checkout" element={<CheckoutPage />}>
                            <Route index element={<Navigate to="shipping" replace />} />
                            <Route path="shipping" element={<ShippingInfoPage />} />
                            <Route path="review" element={<ReviewPage />} />
                            <Route path="success" element={<SuccessPage />} />
                        </Route>
                    </Route>

                    {/* Todo: Add route for invalid paths */}
                    {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
