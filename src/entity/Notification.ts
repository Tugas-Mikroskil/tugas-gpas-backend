import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number; // Auto-generated primary key

    @Column({ unique: true })
    userId: string; // User ID (string)

    @Column()
    fcm_token: string; // Firebase Cloud Messaging token (string)
}