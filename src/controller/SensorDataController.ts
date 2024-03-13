import { NextFunction, Request, Response } from "express";
import { SensorDataService } from "../services/SensorData.services";
import { validateInput } from "../middleware/ValidateInput";

const service = new SensorDataService();

export class SensorDataController {
  

  public reading  = async(
    {query}: Request,
    res: Response,
    next:NextFunction
  ) => {  
             validateInput({query})
             try {
                   return service.getReading({query});
                 }
             catch(error){
                  next(error);
                }
    

  }
}
