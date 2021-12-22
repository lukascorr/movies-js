import express from "express";
import MoviesRoutes from "./routes/movies.routes";

const app = express();

app.use(MoviesRoutes)

export default app
