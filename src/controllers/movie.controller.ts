import {Movie} from "../models/movie";
import {Op} from "sequelize";
import * as fs from "fs";
import {parse} from "csv-parse";
import {Request, Response} from "express";

export class MovieController {
    static getMovies = async (req: Request, res: Response) => {

        const title = req.query.title ?? ''
        const page = Number(req.query.page) ?? 0;
        const size = 2;

        const movies = await Movie.findAll({
            where: {
                title: {
                    [Op.iLike]: '%' + title + '%'
                }
            },
            order: [
                ['id', 'ASC'],
            ],
            limit: size,
            offset: page * size
        });

        res.send(movies);
    }

    static storeMovie = async (req: Request, res: Response) => {
        try {
            let csvData: string[] = [];
            // @ts-ignore
            fs.createReadStream(req.file?.path,'utf8')
                .pipe(parse({delimiter: ';'}))
                .on('data', (csvrow) => {
                    csvData = csvrow;
                })
                .on('end',() => {
                    this.saveMovie(csvData)
                });

            return res.status(200).send('success');
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    static updateMovie = async (req: Request, res: Response) => {
        try {
            const movie = await Movie.findByPk(req.params.movie_id);
            if (movie !== null) {
                await movie.update(req.body);
            }

            return res.status(200).send(movie);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    static deleteMovie = async (req: Request, res: Response) => {
        try {
            await Movie.destroy({
                where: {
                    id: req.params.movie_id
                }
            })
            return res.send('success');
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    private static saveMovie(csvData: string[])
    {
        csvData.forEach(async data => {
            const movie = await Movie.findOne({
                where: {
                    title: data
                },
            });
            if (movie === null) {
                await Movie.create({ title: data });
            }
        })
    }
}
