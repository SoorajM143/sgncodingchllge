import { AppDataSource } from "../data-source";
import { Sensor } from "../entity/Sensor";


export class SensorService {
    private sensorRepository = AppDataSource.getRepository(Sensor);


    async findAll() {
        return this.sensorRepository.find();
    }

    async findOne (id:number) {
        return this.sensorRepository.findOne({where: {id}})
    }
}