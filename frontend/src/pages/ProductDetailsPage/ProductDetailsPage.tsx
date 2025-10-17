import { Link, useParams } from "react-router-dom"
import styles from "./ProductDetailsPage.module.scss"
import { useEffect, useState } from "react"
import { supabase } from "@/api/supabaseClient"
import placeholder from "@assets/images/placeholder.svg"
import type { Product } from "@/types/Product"
import QuantitySelector from "@/components/common/QuantitySelector/QuantitySelector"
import { Button } from "@/components/common/Button/Button"
import { useCart } from "@/context/CartContext"

export default function ProductDetailsPage() {
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const { addToCart } = useCart()

    useEffect(() => {
        const fetchProduct = async () => {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single()

            if (error) {
                console.error("Error fetching product:", error)
            } else {
                setProduct(data)
            }
        }

        fetchProduct()
    }, [id])

    return product ? (
        <div className={styles.page}>
            <div className={styles.details}>
                <img src={product.image_url ?? placeholder} alt={product.name} />
                <div className={styles.info}>
                    <h1>{product.name}</h1>
                    <p className={styles.price}>${product.price.toFixed(2)}</p>
                    <p>{product.description}</p>
                    <QuantitySelector quantity={1} />
                    <Button onClick={() => addToCart(product, 1)} children={"Add to Cart"} />
                    <p>Category: {product.category}</p>
                </div>
            </div>
            <Link to="/products">Back to Products</Link>
            <Button style={{ width: "400px", padding: "0.75rem 1rem" }} children={"Add to Cart"} />
        </div>
    ) : (
        <p>Loading...</p>
    )
}
