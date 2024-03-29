import { AppDataSource } from "../data-source";
import { SensorData } from "../entity/SensorData";

export class SensorDataService {
  private sensorDataRepository = AppDataSource.getRepository(SensorData);

  async getReading({ query }: any) {
    const { sensorId, startDate, endDate, metrics, stats } = query;

    //querybuilder for sensor data fetch
    const queryBuilder = this.sensorDataRepository
      .createQueryBuilder("SensorData")
      .where("SensorData.sensorId= :sensorId", { sensorId });

    //if no date are provided latest data is fetched for the sensorId
    if (!(startDate && endDate)) {
      const now = new Date();
      if (startDate && !endDate) {
        queryBuilder
          .andWhere("SensorData.recordedTime >= :start", {
            start: new Date(startDate as string),
          })
          .andWhere("SensorData.recordedTime <= :end", {
            end: now,
          });
      } else {
        now.setDate(now.getDate() - 1);
        queryBuilder.andWhere("SensorData.recordedTime >= :start", {
          start: now,
        });
      }
    } else {
      queryBuilder
        .andWhere("SensorData.recordedTime >= :start", {
          start: new Date(startDate as string),
        })
        .andWhere("SensorData.recordedTime <= :end", {
          end: new Date(endDate as string),
        });
    }
    //querybuilder to display metric and stats based on user input
    if (metrics && stats) {
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
