import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "cars" })
export class Car {
    @PrimaryGeneratedColumn()
    id: number; // Use number for auto-increment IDs

    @Column({ nullable: false })
    name: string;

    @Column({ type: "int", nullable: false })
    seats: number;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false }) // Use decimal for numeric
    price: number;

    @Column({ nullable: true })
    image: string; // Main image

    @Column("json", { nullable: true }) // Use JSON for array data
    gallery: string[]; // Array for gallery images

    @Column({ nullable: true })
    description: string; // Description

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}