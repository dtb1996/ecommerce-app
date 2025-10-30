export function getVisiblePages(
    currentPage: number,
    totalPages: number,
    maxVisible: number
): (number | string)[] {
    if (totalPages <= maxVisible) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | string)[] = []
    const firstPage = 1
    const lastPage = totalPages

    const showLeftEllipsis = currentPage > 3
    const showRightEllipsis = currentPage < totalPages - 2

    pages.push(firstPage)
    if (showLeftEllipsis) pages.push("…")

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)
    for (let i = start; i <= end; i++) {
        if (i !== firstPage && i !== lastPage) pages.push(i)
    }

    if (showRightEllipsis) pages.push("…")
    pages.push(lastPage)

    return pages
}
