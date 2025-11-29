import "dotenv/config"
import { faker } from "@faker-js/faker"
import { supabase } from "../api/supabaseServerClient.ts"

const PRODUCT_COUNT = 25

const categories = [
    { name: "Tech", keywords: ["laptop", "headphones", "smartphone", "keyboard", "monitor"] },
    { name: "Home", keywords: ["sofa", "lamp", "kitchen", "plants", "bookshelf"] },
    { name: "Fitness", keywords: ["weights", "yoga", "gym", "running", "bicycle"] },
    { name: "Clothing", keywords: ["shirt", "dress", "jacket", "shoes", "hoodie"] },
    { name: "Outdoors", keywords: ["tent", "mountain", "forest", "campfire", "hiking"] },
    { name: "Accessories", keywords: ["watch", "ring", "necklace", "bracelet", "sunglasses"] },
]

const BASE_URL = process.env.VITE_API_URL ?? "http://localhost:5000"

// Generates 3 distinct image URLs that hit your backend proxy
function generateImages(keyword: string): string[] {
    return Array.from({ length: 3 }).map(
        (_, i) => `${BASE_URL}/api/image/${encodeURIComponent(keyword)}?sig=${i}`
    )
}

function generateProduct() {
    const category = faker.helpers.arrayElement(categories)
    const keyword = faker.helpers.arrayElement(category.keywords)
    const name = faker.commerce.productName()
    const description = faker.commerce.productDescription()
    const price = parseFloat(faker.commerce.price({ min: 10, max: 300, dec: 2 }))
    const images = generateImages(keyword)
    const in_stock = faker.datatype.boolean(0.8)

    return {
        name,
        description,
        price,
        category: category.name,
        images,
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

    const products = Array.from({ length: PRODUCT_COUNT }).map(() => generateProduct())

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
