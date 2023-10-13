// animal.entities.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  Especie: string;

  @Column()
  Raza: string;

  @Column()
  Genero: string;

  @Column()
  Edad: number;
}
