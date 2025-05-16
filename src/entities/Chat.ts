/** @format */

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sender!: string;

  @Column("text")
  message!: string;

  @Column("datetime")
  timestamp!: Date;
}
