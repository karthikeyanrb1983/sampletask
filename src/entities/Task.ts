/** @format */

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum TaskStatus {
  PENDING = "pending",
  COMPLETED = "completed",
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status!: TaskStatus;
}
