import fastify from "fastify";
import moviesRoutes from "./routes/movies.routes";

export function build(opts={}) {
    const app = fastify(opts)

    app.register(moviesRoutes);

    return app
}

