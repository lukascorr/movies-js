import supertest from "supertest";
import app from "../src/app"
import {db} from "../src/database/config";
import {Sequelize} from "sequelize";

describe("tests api movies", () => {
    let thisDb: Sequelize = db

    beforeAll(async () => {
        await thisDb.sync()
    })

    it("GET /movies", async () => {
        const response = await supertest(app).get("/movies?page=0");
        expect(response.statusCode).toBe(200);
    });

    it("POST /movies", async () => {
        const response = await supertest(app).post("/movies").attach('file', __dirname + '/movies.csv');
        expect(response.statusCode).toBe(200);
    });

    it("UPDATE /movies/:id", async () => {
        const body = {
            title: 'nuevo nombre'
        };

        const response = await supertest(app).patch("/movies/1").send(body);
        expect(response.statusCode).toBe(200);
    });

    it("DELETE /movies/:id", async () => {
        const response = await supertest(app).delete("/movies/1").send();
        expect(response.statusCode).toBe(200);
    });

    afterAll(async () => {
        await thisDb.close()
    })
});
