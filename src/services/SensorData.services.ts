import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { SensorData } from "../entity/SensorData";

export class SensorDataService {
  private sensorDataRepository = AppDataSource.getRepository(SensorData);

  async getReading({ query }: any) {
    const { sensorId, startDate, endDate, metrics, stats } = query;

    const queryBuilder = this.sensorDataRepository
      .createQueryBuilder("SensorData")
      .where("SensorData.sensorId= :sensorId", { sensorId });

    if (!(startDate && endDate)) {
      const now = new Date();
      now.setDate(now.getDate() - 1);
      queryBuilder.andWhere("SensorData.recordedTime >= :start", {
        start: now,
      });
    } else {
      queryBuilder
        .andWhere("SensorData.recordedTime > :start", {
          start: new Date(startDate as string),
        })
        .andWhere("SensorData.recordedTime < :end", {
          end: new Date(endDate as string),
        });
    }
  if(metrics && stats){
      const metric = (metrics as string).split(",");
      let len = metric.length;
      queryBuilder.select(
        `${stats}(SensorData.${metric[0]})`,
        `${stats} of ${metric[0]}:`
      );
      for (let i = 1; i < len; i++) {
        const col = metric[i].toLowerCase();
        queryBuilder.addSelect(`${stats}(${col})`, `${stats} of ${metric[i]}:`);
      }
    }
    

    return stats ? queryBuilder.getRawOne() : queryBuilder.getMany();
  }
}
