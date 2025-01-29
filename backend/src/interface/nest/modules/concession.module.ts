import { Module } from '@nestjs/common';
import { ConcessionController } from '../controllers/concession.controller';
import { ConcessionUseCaseProviders } from '../providers/concession/ConcessionUseCaseProviders';

@Module({
  controllers: [ConcessionController],
  providers: [...ConcessionUseCaseProviders],
})
export class ConcessionModule {}
