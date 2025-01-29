import { Controller, Post, Body } from '@nestjs/common';
import { CreateConcessionUseCase, CreateConcessionDTO } from '../../../application/use-cases/concession/CreateConcessionUseCase';

@Controller('concessions')
export class ConcessionController {
  constructor(private readonly createConcessionUseCase: CreateConcessionUseCase) {}

  @Post()
  async create(@Body() dto: CreateConcessionDTO) {
    const concession = await this.createConcessionUseCase.execute(dto);
    return { message: 'Concession created', concession };
  }
}
