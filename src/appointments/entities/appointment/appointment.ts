import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column()
  carDetails: string;

  @Column()
  repairType: string;
}