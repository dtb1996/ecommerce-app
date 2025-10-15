import express from "express"
import fetch from "node-fetch"

const router = express.Router()

interface UnsplashPhoto {
    id: string
    urls: {
        small: string
        regular: string
        full: string
    }
    alt_description: string | null
}

interface UnsplashResponse {
    total: number
    total_pages: number
    results: UnsplashPhoto[]
}

// Caches images so Unsplash API isn't called repeatedly
const imageCache = new Map<string, string[]>()

router.get("/:keyword", async (req, res) => {
    try {
        const keyword = req.params.keyword
        const accessKey = process.env.UNSPLASH_ACCESS_KEY

        if (!accessKey) {
            return res.status(500).json({ error: "Missing Unsplash access key" })
        }

        if (imageCache.has(keyword)) {
            const cachedUrls = imageCache.get(keyword)!
            const randomUrl = cachedUrls[Math.floor(Math.random() * cachedUrls.length)]
            const imageResponse = await fetch(randomUrl)
            const imageBuffer = Buffer.from(await imageResponse.arrayBuffer())

            res.set("Content-Type", "image/jpeg")

            return res.send(imageBuffer)
        }

        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&client_id=${accessKey}&per_page=30`,
        )

        if (!response.ok) {
            throw new Error(`Unsplash API error: ${response.status}`)
        }

        const data = (await response.json()) as UnsplashResponse

        if (!data.results?.length) {
            return res.status(404).send("No image found")
        }

        const imageUrls = data.results.map((photo) => photo.urls.small)
        imageCache.set(keyword, imageUrls)

        const randomUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)]

        const imageResponse = await fetch(randomUrl)
        if (!imageResponse.ok) {
            throw new Error(`Failed to fetch image from Unsplash URL: ${randomUrl}`)
        }

        const imageBuffer = Buffer.from(await imageResponse.arrayBuffer())

        res.set("Content-Type", "image/jpeg")
        res.send(Buffer.from(imageBuffer))
    } catch (err) {
        console.error("Image proxy error: ", err)
        res.status(500).send("Error fetching image")
    }
})

export default router
