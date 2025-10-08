import { Link, useParams } from "react-router-dom"
import styles from "./ProductDetails.module.scss"
import { useEffect, useState } from "react"
import { supabase } from "@/api/supabaseClient"
import placeholder from "@assets/images/placeholder.svg"
import type { Product } from "@/types/Product"

export default function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null)

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
                <img src={placeholder} alt={product.name} />
                <div className={styles.info}>
                    <h1>{product.name}</h1>
                    <p className={styles.price}>${product.price.toFixed(2)}</p>
                    <p>{product.description}</p>
                    <button>Add to Cart</button>
                    {/* TODO: add quantity selector */}
                    <p>Category: {product.category}</p>
                </div>
            </div>
            <Link to="/products">Back to Products</Link>
        </div>
    ) : (
        <p>Loading...</p>
    )
}
