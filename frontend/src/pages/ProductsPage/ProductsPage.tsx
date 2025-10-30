import { ProductCard } from "@/components/ProductCard/ProductCard"
import { useEffect, useState } from "react"
import styles from "./ProductsPage.module.scss"
import { Button } from "@/components/common/Button/Button"
import { LuListFilter } from "react-icons/lu"
import ProductFilters from "@/components/ProductFilters/ProductFilters"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"
import { useProducts } from "@/hooks/useProducts"
import { useResponsiveProducts } from "@/hooks/useResponsiveProducts"
import { getVisiblePages } from "@/utils/pagination"

export default function ProductsPage() {
    const {
        filteredProducts,
        categories,
        priceRange,
        selectedCategory,
        setSelectedCategory,
        selectedPriceRange,
        setSelectedPriceRange,
    } = useProducts()

    const { isMobile, productsPerPage } = useResponsiveProducts()
    const [currentPage, setCurrentPage] = useState<number>(1)

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    // Clamp currentPage
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages || 1)
        }
    }, [currentPage, totalPages])

    const startIndex = (currentPage - 1) * productsPerPage
    const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)
    const visiblePages = getVisiblePages(currentPage, totalPages, isMobile ? 4 : 6)

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
                    {currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className={styles.pagination}>
                    <Button
                        className={styles.paginationButton}
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <FaArrowLeft />
                        Previous
                    </Button>
                    <div className={styles.pages}>
                        {visiblePages.map((page, i) =>
                            page === "…" ? (
                                <span key={`ellipsis-${i}`} className={styles.ellipsis}>
                                    …
                                </span>
                            ) : (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page as number)}
                                    className={page === currentPage ? styles.active : ""}
                                >
                                    {page}
                                </button>
                            )
                        )}
                    </div>
                    <Button
                        className={styles.paginationButton}
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <FaArrowRight />
                    </Button>
                </div>
            </section>
        </div>
    )
}
