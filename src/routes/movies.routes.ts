import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import { MovieController} from "../controllers/movie.controller";

const moviesRoutes: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.get('/movies', MovieController.getMovies)
    server.post('/movies', MovieController.storeMovie)
    server.patch('/movies/:movie_id', MovieController.updateMovie)
    server.delete('/movies/:movie_id', MovieController.deleteMovie)
}

export default moviesRoutes
