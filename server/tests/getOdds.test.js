const sqlite3 = require('sqlite3')
const request = require('supertest')

const getOdds = require('../app')

require('dotenv').config()

describe("POST /process", () => {
    it("Should get odds = 0", async () => {
        const response = await request(getOdds)
            .post("/process")
            .send({
                countdown: 7,
                bounty_hunters: [
                    {
                        planet: "Hoth",
                        day: 6
                    },
                    {
                        planet: "Hoth",
                        day: 7
                    },
                    {
                        planet: "Hoth",
                        day: 8
                    }
                ]
            })
            .set({
                "Content-Type": "application/json"
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.proba).toBe(0)
        
    })
})

describe("POST /process", () => {
    it("Should get odds = 81", async () => {
        const response = await request(getOdds)
            .post("/process")
            .send({
                countdown: 8,
                bounty_hunters: [
                    {
                        planet: "Hoth",
                        day: 6
                    },
                    {
                        planet: "Hoth",
                        day: 7
                    },
                    {
                        planet: "Hoth",
                        day: 8
                    }
                ]
            })
            .set({
                "Content-Type": "application/json"
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.proba).toBe(81)
    })
})

describe("POST /process", () => {
    it("Should get odds = 90", async () => {
        const response = await request(getOdds)
            .post("/process")
            .send({
                countdown: 9,
                bounty_hunters: [
                    {
                        planet: "Hoth",
                        day: 6
                    },
                    {
                        planet: "Hoth",
                        day: 7
                    },
                    {
                        planet: "Hoth",
                        day: 8
                    }
                ]
            })
            .set({
                "Content-Type": "application/json"
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.proba).toBe(90)
    })
})

describe("POST /process", () => {
    it("Should get odds = 100", async () => {
        const response = await request(getOdds)
            .post("/process")
            .send({
                countdown: 10,
                bounty_hunters: [
                    {
                        planet: "Hoth",
                        day: 6
                    },
                    {
                        planet: "Hoth",
                        day: 7
                    },
                    {
                        planet: "Hoth",
                        day: 8
                    }
                ]
            })
            .set({
                "Content-Type": "application/json"
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.proba).toBe(100)
    })
})