const request = require('supertest')

const getIndex = require('../app')

require('dotenv').config()

describe("GET /test", () => {
    it("Should get a 404 page", async () => {
        const response = await request(getIndex)
            .get("/test")
            .set({
                "Content-Type": "text/html"
            })

        expect(response.statusCode).toBe(404)
    })
})
