import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UserEntity, UserRole } from '../../../domain/entities/UserEntity';
import { v4 as uuid } from 'uuid';

export interface RegisterUserDTO {
  email: string;
  password: string;
  role: UserRole; 
}

export class RegisterUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(dto: RegisterUserDTO): Promise<UserEntity> {
    // Vérifier si l'email existe déjà
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new Error('Email already in use');
    }

    const user = new UserEntity(
      uuid(),
      dto.email,
      dto.password,
      dto.role,
      new Date(),
    );
    return await this.userRepo.create(user);
  }
}
