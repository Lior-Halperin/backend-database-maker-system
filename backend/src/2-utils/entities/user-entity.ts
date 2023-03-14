import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Role from "../../4-models/Role-model";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: "varchar",
    length: 150,
    unique: true,
})
  email: string;
  
  @Column({
    type: "enum",
    enum: Role,
    default: Role.User,
  })
  role: Role;

}
