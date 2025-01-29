import { UserEntity } from "../entities/UserEntity";

export interface UserRepository {
  create(user: UserEntity): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  update(user: UserEntity): Promise<UserEntity>;
}
