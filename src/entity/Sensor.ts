import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Sensor {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type: 'text'})
    name: string;
}