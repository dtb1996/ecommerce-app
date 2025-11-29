import { useParams } from "react-router-dom"
import styles from "./ProductDetailsPage.module.scss"
import { useEffect, useState } from "react"
import { supabase } from "@/api/supabaseClient"
import placeholder from "@assets/images/placeholder.svg"
import type { Product } from "@/types/Product"
import QuantitySelector from "@/components/common/QuantitySelector/QuantitySelector"
import { Button } from "@/components/common/Button/Button"
import { useCart } from "@/context/CartContext"
import AdditionalDetails from "./AdditionalDetails"
import ProductShowcase from "../HomePage/ProductShowcase/ProductShowcase"
import { useProducts } from "@/hooks/useProducts"

const colors = ["#4f4631", "#314f4a", "#31344f"]
const sizes = ["small", "medium", "large", "x-large"]

export default function ProductDetailsPage() {
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [activeImage, setActiveImage] = useState<number>(0)
    const [activeColor, setActiveColor] = useState(colors[0] || null)
    const [activeSize, setActiveSize] = useState(sizes[0] || null)
    const { addToCart } = useCart()

    // Demo similar products
    const { allProducts } = useProducts()
    const similarProducts = allProducts.slice(0, 4)

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
                if (!data.images || !data.images.length) {
                    data.images = [placeholder, placeholder, placeholder]
                }
                setProduct(data)
            }
        }

        fetchProduct()
    }, [id])

    return product ? (
        <div className={styles.page}>
            <section className={styles.details}>
                <div className={styles.imageSection}>
                    <div className={styles.imageSelector}>
                        {product.images.map((img, index) => (
                            <Button key={index} onClick={() => setActiveImage(index)}>
                                <img
                                    className={activeImage === index ? styles.selected : ""}
                                    src={img ?? placeholder}
                                    alt={`${product.name} ${index + 1}`}
                                />
                            </Button>
                        ))}
                    </div>

                    <img
                        className={styles.mainImage}
                        src={product.images[activeImage] ?? placeholder}
                        alt={product.name}
                    />
                </div>

                <div className={styles.info}>
                    <h2 className={styles.productName}>{product.name}</h2>

                    <h4 className={styles.price}>${product.price.toFixed(2)}</h4>

                    <p className={`${styles.description} ${styles.borderBottom}`}>
                        {product.description}
                    </p>

                    <div className={`${styles.colorSelector} ${styles.borderBottom}`}>
                        <h4>Select Color</h4>
                        <div className={styles.colors}>
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    className={`${styles.color} ${activeColor === color ? styles.active : ""}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setActiveColor(color)}
                                >
                                    {activeColor === color ? "✔" : ""}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`${styles.sizeSelector} ${styles.borderBottom}`}>
                        <h4>Choose Size</h4>
                        <div className={styles.sizes}>
                            {sizes.map((size) => (
                                <Button
                                    key={size}
                                    className={`${styles.size} ${activeSize === size ? styles.active : ""}`}
                                    style={{ backgroundColor: size }}
                                    onClick={() => setActiveSize(size)}
                                >
                                    {size}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.cartButtons}>
                        <QuantitySelector quantity={1} />
                        <Button
                            className={styles.addToCartButton}
                            onClick={() => addToCart(product, 1)}
                            children={"Add to Cart"}
                        />
                    </div>
                </div>
            </section>

            <section className={styles.additionalDetails}>
                <AdditionalDetails />
            </section>

            <section className={styles.similarItems}>
                <ProductShowcase
                    title="You Might Also Like"
                    products={similarProducts}
                    showViewAllButton={false}
                />
            </section>
        </div>
    ) : (
        <p>Loading...</p>
    )
}
