import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "cars" })
export class Car {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ type: "int", nullable: false })
    seats: number;

    @Column({ type: "numeric", precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ nullable: true })
    image: string; // Main image

    @Column("text", { array: true, nullable: true })
    gallery: string[]; // Array for gallery images

    @Column({ nullable: true })
    description: string; // Main image

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
