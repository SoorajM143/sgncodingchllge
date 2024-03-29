import express from "express";
import bodyParser from "body-parser";
import {Request, Response} from "express";
import { Routes } from "./routes";
import {validationResult} from "express-validator";
import { errorHandler } from "./middleware/error";

const app = express();
app.use(bodyParser.json());
Routes.forEach(route => {
  (app as any)[route.method](route.route,
    ...route.validation,
    async (req: Request, res: Response, next: Function) => {

        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }

            const result = await(new (route.controller as any))[route.action](req,res,next);
           res.json(result)
        } catch(err){
            next(err);
        }
    }
    )
})
app.use(errorHandler);

export default app;