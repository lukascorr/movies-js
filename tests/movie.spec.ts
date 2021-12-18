import request from "supertest";
import {build} from "../src/app";

const app = build()

describe("GET /movies", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/movies").send();
        expect(response.statusCode).toBe(200);
    });
});

describe("POST /movies", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/movies").send();
        expect(response.statusCode).toBe(200);
    });
});

describe("UPDATE /movies/:id", () => {
    test("should respond with a 200 status code", async () => {
        const body = {
            title: 'nuevo nombre'
        };

        const response = await request(app).patch("/movies/1").send();
        expect(response.statusCode).toBe(200);
    });
});

describe("DELETE /movies/:id", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).delete("/movies/1").send();
        expect(response.statusCode).toBe(200);
    });
});
