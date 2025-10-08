import "dotenv/config"
import { faker } from "@faker-js/faker"
import { supabase } from "../api/supabaseServerClient.ts"

const PRODUCT_COUNT = 25

const categories = [
    { name: "Tech", keyword: "electronics,gadgets" },
    { name: "Home", keyword: "furniture,decor" },
    { name: "Fitness", keyword: "gym,fitness" },
    { name: "Clothing", keyword: "fashion,clothes" },
    { name: "Outdoors", keyword: "camping,hiking" },
    { name: "Accessories", keyword: "watches,jewelry" },
]

const getImageUrl = (keyword: string) =>
    `https://source.unsplash.com/400x400/?${encodeURIComponent(keyword)}`

function generateProduct() {
    const category = faker.helpers.arrayElement(categories)
    const name = faker.commerce.productName()
    const description = faker.commerce.productDescription()
    const price = parseFloat(faker.commerce.price({ min: 10, max: 300, dec: 2 }))
    const image_url = getImageUrl(category.keyword)
    const in_stock = faker.datatype.boolean(0.8)

    return {
        name,
        description,
        price,
        category: category.name,
        image_url,
        in_stock,
    }
}

async function seedProducts() {
    console.log(`\nStarting product seed (${PRODUCT_COUNT} items)...`)

    // Prevent duplicate seeding
    const { data: existing, error: fetchError } = await supabase
        .from("products")
        .select("id")
        .limit(1)

    if (fetchError) {
        console.error("Error checking existing products:", fetchError.message)
        process.exit(1)
    }

    if (existing && existing.length > 0) {
        console.log("Products already exist — skipping seeding.")
        process.exit(0)
    }

    const products = Array.from({ length: PRODUCT_COUNT }, generateProduct)

    const { error } = await supabase.from("products").insert(products)

    if (error) {
        console.error("Error inserting products:", error.message)
        process.exit(1)
    }

    console.log(`Successfully seeded ${PRODUCT_COUNT} products.`)
}

seedProducts().catch((err) => {
    console.error("Unhandled error:", err)
    process.exit(1)
})
