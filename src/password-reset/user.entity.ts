import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column({ unique: true })
  declare email: string;

  @Column()
  declare password: string;

  @Column({ nullable: true })
  resetToken?: string;
}
