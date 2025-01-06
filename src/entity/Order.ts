import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  days: number;

  @Column({ nullable: true })
  carId: number;

  @Column()
  phoneNumber: string;

  @Column()
  citizenNumber: string;

  @Column()
  address: string;

  @Column()
  destination: string;
}