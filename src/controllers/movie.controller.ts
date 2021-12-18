import {Movie} from "../models/movie";
import {Op} from "sequelize";
import * as fs from "fs";
import {parse} from "csv-parse";

export class MovieController {
    static getMovies = async (req: any, res: any) => {

        const title = req.query.title ?? ''
        const page = req.query.page ?? 0;
        const size = 5;

        const movies = await Movie.findAll({
            where: {
                title: {
                    [Op.iLike]: '%' + title + '%'
                }
            },
            limit: size,
            offset: page * size
        });

        res.send(movies);
    }

    static storeMovie = async (req: any, res: any) => {
        try {
            console.log(req.body)
            // let csvData: string[] = [];
            // fs.createReadStream(req.file.path)
            //     .pipe(parse({delimiter: ';'}))
            //     .on('data', (csvrow) => {
            //         console.log(csvrow);
            //         //do something with csvrow
            //         csvData.push(csvrow);
            //     })
            //     .on('end',function() {
            //         //do something with csvData
            //         console.log(csvData);
            //     });

            return res.code(200).send('moviesRoutes');
        } catch (error) {
            return res.code(400).send(error);
        }
    }

    static updateMovie = async (req: any, res: any) => {
        try {
            await Movie.update(
                { title: req.body.title },
                { where: { id: req.params.movie_id } }
            );
            const movie = await Movie.findByPk(req.params.movie_id);

            return res.code(200).send(movie);
        } catch (error) {
            return res.code(500).send(error);
        }
    }

    static deleteMovie = async (req: any, res: any) => {
        try {
            await Movie.destroy({
                where: {
                    id: req.params.movie_id
                }
            })
            return res.send('success');
        } catch (error) {
            return res.code(400).send(error);
        }
    }
}
