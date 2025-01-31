import { UserEntity } from "../entities/UserEntity";

export interface UserRepository {
  create(user: UserEntity): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  update(user: UserEntity): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
