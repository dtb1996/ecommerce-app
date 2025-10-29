import { supabase } from "@/api/supabaseClient"
import { ProductCard } from "@/components/ProductCard/ProductCard"
import type { Product } from "@/types/Product"
import { useEffect, useState } from "react"
import styles from "./ProductsPage.module.scss"
import { Button } from "@/components/common/Button/Button"
import { LuListFilter } from "react-icons/lu"
import ProductFilters from "@/components/ProductFilters/ProductFilters"

export default function ProductsPage() {
    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [filterProducts, setFilteredProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 0 })
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 300])

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts(): Promise<void> {
        const { data, error } = await supabase.from("products").select()

        if (error) {
            console.error("Error fetching products:", error)
            setAllProducts([])
            setFilteredProducts([])
        } else if (data) {
            setAllProducts(data)
            setFilteredProducts(data)

            // Get unique categories
            const uniqueCategories = Array.from(new Set(data.map((p) => p.category)))
            setCategories(uniqueCategories)

            //Get min and max prices
            const prices = data.map((p) => p.price)
            setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) })
        }
    }

    useEffect(() => {
        const filtered = allProducts.filter((p) => {
            const inCategory = !selectedCategory || p.category === selectedCategory
            const inPriceRange =
                p.price >= selectedPriceRange[0] && p.price <= selectedPriceRange[1]
            return inCategory && inPriceRange
        })
        setFilteredProducts(filtered)
    }, [selectedCategory, selectedPriceRange, allProducts])

    useEffect(() => {
        if (priceRange.min < priceRange.max) {
            setSelectedPriceRange([priceRange.min, priceRange.max])
        }
    }, [priceRange.min, priceRange.max])

    useEffect(() => {
        if (allProducts.length) {
            const prices = allProducts.map((p) => p.price)
            const minPrice = Math.min(...prices)
            const maxPrice = Math.max(...prices)
            setPriceRange({ min: minPrice, max: maxPrice })
            setSelectedPriceRange([minPrice, maxPrice])
        }
    }, [allProducts])

    return (
        <div className={styles.page}>
            <aside className={styles.filters}>
                {priceRange.max > priceRange.min && (
                    <ProductFilters
                        categories={categories}
                        priceRange={priceRange}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        selectedPriceRange={selectedPriceRange}
                        onPriceChange={setSelectedPriceRange}
                    />
                )}
            </aside>

            <section className={styles.productsArea}>
                <Button onClick={() => {}} className={styles.filtersButton}>
                    <LuListFilter />
                </Button>

                <div className={styles.productsGrid}>
                    {filterProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className={styles.pagination}>{/* TODO: add page selector/arrows here */}</div>
            </section>
        </div>
    )
}
