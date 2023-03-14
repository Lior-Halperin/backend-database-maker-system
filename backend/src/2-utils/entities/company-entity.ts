import { Entity, BaseEntity , PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { User } from "./user-entity";

@Entity()
export class Company extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    name: string 

    @OneToOne(() => User)
    @JoinColumn() // @JoinColumn must be set only on one side of relation - the side that must have the foreign key in the database table
    owner: User;
}
