import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: string; // Match the type of User.id (number)

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  days: number;

  @Column({ nullable: true })
  carId: number; // Match the type of Car.id (number)

  @Column()
  phoneNumber: string;

  @Column()
  citizenNumber: string;

  @Column()
  address: string;

  @Column()
  destination: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}