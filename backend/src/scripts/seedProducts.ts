import "dotenv/config"
import { faker } from "@faker-js/faker"
import { createClient } from "@supabase/supabase-js"

// === CONFIG ===
const PRODUCT_COUNT = 25
const SEED_ENV = process.env.SEED_ENV ?? "development"
const TABLE_NAME = SEED_ENV === "production" ? "products_prod" : "products_dev"

// Supabase client using service key
const supabaseUrl = process.env.SUPABASE_URL ?? ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY ?? ""

if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Backend URLs for images (production can point to deployed backend, dev uses placeholder)
const LOCAL_BACKEND_URL = process.env.BACKEND_URL_LOCAL ?? "https://via.placeholder.com/400"
const PROD_BACKEND_URL = process.env.BACKEND_URL_PROD ?? ""
const BASE_URL = SEED_ENV === "production" ? PROD_BACKEND_URL : LOCAL_BACKEND_URL

const categories = [
    { name: "Tech", keywords: ["laptop", "headphones", "smartphone", "keyboard", "monitor"] },
    { name: "Home", keywords: ["sofa", "lamp", "kitchen", "plants", "bookshelf"] },
    { name: "Fitness", keywords: ["weights", "yoga", "gym", "running", "bicycle"] },
    { name: "Clothing", keywords: ["shirt", "dress", "jacket", "shoes", "hoodie"] },
    { name: "Outdoors", keywords: ["tent", "mountain", "forest", "campfire", "hiking"] },
    { name: "Accessories", keywords: ["watch", "ring", "necklace", "bracelet", "sunglasses"] },
]

// Generates 3 distinct image URLs that hit your backend proxy
function generateImages(keyword: string): string[] {
    return Array.from({ length: 3 }).map((_, i) => {
        if (SEED_ENV === "production") {
            return `${BASE_URL}/api/image/${encodeURIComponent(keyword)}?sig=${i}`
        }
        // Local dev placeholder images
        return `${BASE_URL}?text=${encodeURIComponent(keyword)}+${i}`
    })
}

function generateProduct() {
    const category = faker.helpers.arrayElement(categories)
    const keyword = faker.helpers.arrayElement(category.keywords)
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 300, dec: 2 })),
        category: category.name,
        images: generateImages(keyword),
        in_stock: faker.datatype.boolean(0.8),
    }
}

async function seedProducts() {
    console.log(`\nSeeding ${PRODUCT_COUNT} products into table "${TABLE_NAME}"...`)

    // Check if table already has products
    const { data: existing, error: fetchError } = await supabase
        .from(TABLE_NAME)
        .select("id")
        .limit(1)

    if (fetchError) {
        console.error(`Error checking existing products in ${TABLE_NAME}:`, fetchError.message)
        process.exit(1)
    }

    if (existing && existing.length > 0) {
        console.log(`Products already exist in "${TABLE_NAME}" — skipping seeding.`)
        return
    }

    // Clear table first
    const { error: deleteError } = await supabase.from(TABLE_NAME).delete().neq("id", 0)
    if (deleteError) {
        console.error(`Error clearing ${TABLE_NAME}:`, deleteError.message)
        process.exit(1)
    }

    const products = Array.from({ length: PRODUCT_COUNT }).map(generateProduct)
    const { error: insertError } = await supabase.from(TABLE_NAME).insert(products)

    if (insertError) {
        console.error(`Error inserting products into ${TABLE_NAME}:`, insertError.message)
        process.exit(1)
    }

    console.log(`Successfully seeded ${PRODUCT_COUNT} products into "${TABLE_NAME}".`)
}

seedProducts().catch((err) => {
    console.error("Unhandled error:", err)
    process.exit(1)
})
