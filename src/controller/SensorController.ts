import { NextFunction, Request, Response } from "express";
import { SensorService } from "../services/Sensor.service";


const service = new SensorService();

export class SensorController {
    
    public all = async(request: Request, response: Response, next: NextFunction) => {      
        try {
        return service.findAll();  
        }
        catch(error){
            next(error)
        }
       
    }

    public one = async (request: Request, response: Response, next: NextFunction) => {
        try{
        return service.findOne(+request.params.id);
        }
        catch(error){
            next(error)
        }
    }
}