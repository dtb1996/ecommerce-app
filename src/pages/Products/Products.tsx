import { supabase } from "@/api/supabaseClient"
import type { Product } from "@/types/Product"
import { useEffect, useState } from "react"

export default function Products() {
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
        <>
            <h1>This is the Products page</h1>
            <div>
                {products.map((product) => (
                    <div key={product.id}>{product.name}</div>
                ))}
            </div>
        </>
    )
}
