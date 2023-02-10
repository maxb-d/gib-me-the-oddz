const request = require('supertest')

const getIndex = require('../app')

require('dotenv').config()

describe("GET /", () => {
    it("Should get the index splash page of the server", async () => {
        const response = await request(getIndex)
            .get("/")
            .set({
                "Content-Type": "text/html"
            })

        expect(response.statusCode).toBe(200)
    })
})
