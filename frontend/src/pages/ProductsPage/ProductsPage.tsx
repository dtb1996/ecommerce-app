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
    const [filtersOpen, setFiltersOpen] = useState<boolean>(false)
    const [headerHeight, setHeaderHeight] = useState(0)

    useEffect(() => {
        const updateHeaderHeight = () => {
            const banner = document.getElementById("banner")
            const navbar = document.getElementById("navbar")
            if (banner && navbar) {
                setHeaderHeight(banner.offsetHeight + navbar.offsetHeight)
            }
        }

        updateHeaderHeight()
        window.addEventListener("resize", updateHeaderHeight)

        // Observe DOM changes (banner toggling)
        const observer = new MutationObserver(updateHeaderHeight)
        const banner = document.getElementById("banner")
        if (banner) observer.observe(banner, { childList: true, subtree: true })

        return () => {
            window.removeEventListener("resize", updateHeaderHeight)
            observer.disconnect()
        }
    }, [])

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    // Clamp currentPage
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages || 1)
        }
    }, [currentPage, totalPages])

    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = Math.min(currentPage * productsPerPage, filteredProducts.length)
    const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)
    const visiblePages = getVisiblePages(currentPage, totalPages, isMobile ? 4 : 6)
    const currentPageProductsRange = `${startIndex + 1} - ${endIndex}`

    return (
        <div className={`${styles.page} ${isMobile && filtersOpen ? styles.filtersOpen : ""}`}>
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

            {isMobile && filtersOpen && (
                <div className={styles.mobileFiltersOverlay} onClick={() => setFiltersOpen(false)}>
                    <div
                        className={styles.mobileFilters}
                        style={{
                            top: `${headerHeight}px`,
                            height: `calc(100vh - ${headerHeight}px)`,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ProductFilters
                            categories={categories}
                            priceRange={priceRange}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            selectedPriceRange={selectedPriceRange}
                            onPriceChange={setSelectedPriceRange}
                            onClose={() => setFiltersOpen(false)}
                        />
                    </div>
                </div>
            )}

            <section className={styles.productsArea}>
                <div className={styles.pageInfo}>
                    <h3>{selectedCategory ? selectedCategory : "All Products"}</h3>

                    <p>{`Showing ${currentPageProductsRange} of ${filteredProducts.length} Product${filteredProducts.length === 1 ? "" : "s"}`}</p>

                    <Button onClick={() => setFiltersOpen(true)} className={styles.filtersButton}>
                        <LuListFilter />
                    </Button>
                </div>

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
