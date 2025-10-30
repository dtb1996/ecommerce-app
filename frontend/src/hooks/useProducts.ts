import { supabase } from "@/api/supabaseClient"
import type { Product } from "@/types/Product"
import { useEffect, useState } from "react"

export function useProducts() {
    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 0 })
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 300])

    useEffect(() => {
        async function fetchProducts() {
            const { data, error } = await supabase.from("products").select()

            if (error) {
                console.error(error)
                setAllProducts([])
                setFilteredProducts([])
                return
            }

            setAllProducts(data)
            setFilteredProducts(data)

            const uniqueCategories = Array.from(new Set(data.map((p) => p.category)))
            setCategories(uniqueCategories)

            const prices = data.map((p) => p.price)
            const minPrice = Math.min(...prices)
            const maxPrice = Math.max(...prices)
            setPriceRange({ min: minPrice, max: maxPrice })
            setSelectedPriceRange([minPrice, maxPrice])
        }

        fetchProducts()
    }, [])

    useEffect(() => {
        const filtered = allProducts.filter(
            (p) =>
                (!selectedCategory || p.category === selectedCategory) &&
                p.price >= selectedPriceRange[0] &&
                p.price <= selectedPriceRange[1]
        )

        setFilteredProducts(filtered)
    }, [allProducts, selectedCategory, selectedPriceRange])

    return {
        allProducts,
        filteredProducts,
        categories,
        priceRange,
        selectedCategory,
        setSelectedCategory,
        selectedPriceRange,
        setSelectedPriceRange,
    }
}
