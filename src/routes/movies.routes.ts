import { MovieController} from "../controllers/movie.controller";
import express, {Router} from "express";
import cors from "cors";
import multer from "multer";

const upload = multer({dest: 'uploads/'});
const router = Router();
router.use(cors());
router.use(express.json());

router.get('/movies', MovieController.getMovies);
router.post('/movies', upload.single('file'), MovieController.storeMovie);
router.patch('/movies/:movie_id', MovieController.updateMovie)
router.delete('/movies/:movie_id', MovieController.deleteMovie)

export default router
