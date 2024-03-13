import { Metrics } from "./AppConstants"


export interface SensorDataQuery{
    id: number,
    startDate?: Date,
    endDate?: Date,
    metrics?: Array<Metrics>,
    stats?: string,
    sensorId: number;
}