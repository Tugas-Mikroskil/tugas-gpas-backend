import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity({ name: "cars" })
  export class Car {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ nullable: false })
    name: string;
  
    @Column({ type: "int", nullable: false })
    seats: number;
  
    @Column({ type: "numeric", precision: 10, scale: 2, nullable: false })
    price: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  