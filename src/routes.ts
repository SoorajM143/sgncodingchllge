import { param } from "express-validator";
import { SensorController } from "./controller/SensorController";
import { SensorDataController } from "./controller/SensorDataController";

export const Routes = [{
    method: "get",
    route: "/api/sensors",
    controller: SensorController,
    action: "all",
    validation: []
},
{
    method: "get",
    route: "/api/sensors/:id",
    controller: SensorController,
    action: "one",
    validation: [
        param('id').isInt(),
    ],
},
{
    method: "get",
    route: "/api/sensorsData",
    controller: SensorDataController,
    action: "reading",
    validation: []

}]