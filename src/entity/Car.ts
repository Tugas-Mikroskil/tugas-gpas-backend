import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

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

    @Column({ nullable: true })
    image: string; // Main image

    @Column("text", { array: true, nullable: true })
    gallery: string[]; // Array for gallery images

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
