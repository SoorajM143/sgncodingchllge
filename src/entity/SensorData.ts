import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Sensor } from './Sensor';

@Entity()
export class SensorData {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Sensor)
    @JoinColumn()
    sensor: Sensor

    @Column()
    temperature: number

    @Column()
    humidity: number

    @Column()
    windspeed: number
    
    @Column({type: 'date'})
    recordedTime: string
}