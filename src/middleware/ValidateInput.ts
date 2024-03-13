import { NextFunction, Request, Response } from "express";
import BadRequestError from "../errors/BadRequestError";
import { Metrics, Stats } from "../model/AppConstants";
import moment from "moment";


export const validateInput = ({query}:any) =>{

    const {sensorId, startDate, endDate, metrics, stats} = query;

    if(!sensorId){
        throw new BadRequestError({code: 400, message: "SensorId is required!", logging: true});
      }
  
      if(startDate){
        const date = moment(startDate as string, 'YYYY-MM-DD', true);
            if (!date.isValid()) {
              throw new BadRequestError({code: 400, message: "Invalid start date: Enter date in 'YYYY-MM-DD format", logging: true})
      }
      else{
        const diff = moment().diff(startDate as string, 'days');
        if(diff > 30 || diff < 0){
          throw new BadRequestError({code: 400, message: "Invalid start date: Select Date between today and last 30 days", logging: true})
        }
          }
    }
  
      if(stats && metrics){
        const statOptions:string[] = Object.values(Stats);
        const metric:string[] = (metrics as string).split(',');
        const metricsOptions:string[] = Object.values(Metrics);
        if(!statOptions.includes(stats as string)){
          throw new BadRequestError({code: 400, message: "Invalid Stat: Enter either AVG,MAX, MIN, SUM", logging: true})
        }
  
        metric.forEach((item) => {
          if(!metricsOptions.includes(item as string)){
            throw new BadRequestError({code: 400, message: "Invalid Metric: Enter temperature, humidity, wind", logging: true})
          }
        })
      }
      else if(stats || metrics) {
        throw new BadRequestError({code: 400, message: "Invalid Query: Enter Stat and MetricS", logging: true})
      }
  
  
  
      if(endDate){
        const date = moment(endDate as string, 'YYYY-MM-DD', true);
            if (!date.isValid()) {
              throw new BadRequestError({code: 400, message: "Invalid End date: Enter date in 'YYYY-MM-DD format", logging: true})
      }
      else{
        const diff = moment().diff(endDate as string, 'days');
        if(diff > 30 || diff < 0){
          throw new BadRequestError({code: 400, message: "Invalid end date: Select Date between today and last 30 days", logging: true})
        }
          }
      }

}