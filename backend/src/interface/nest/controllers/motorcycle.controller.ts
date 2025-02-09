import { 
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    Query,
    BadRequestException
  } from "@nestjs/common";
  import { CreateMotorcycleUseCase } from "../../../application/use-cases/motorcycle/CreateMotorcycleUseCase";
  import { UpdateMotorcycleUseCase } from "../../../application/use-cases/motorcycle/UpdateMotorcycleUseCase";
  import { CheckMaintenanceDueUseCase } from "../../../application/use-cases/motorcycle/CheckMaintenanceDueUseCase";
  import { PerformMaintenanceUseCase } from "../../../application/use-cases/motorcycle/PerformMaintenanceUseCase";
  import { GetAllMotorcyclesUseCase } from "../../../application/use-cases/motorcycle/GetAllMotorcyclesUseCase";
  import { FindMotorcyclesByConcessionUseCase } from "../../../application/use-cases/motorcycle/FindMotorcyclesByConcessionUseCase";
  import { FindMotorcycleByVinUseCase } from "../../../application/use-cases/motorcycle/FindMotorcycleByVinUseCase";
  import { DeleteMotorcycleUseCase } from "../../../application/use-cases/motorcycle/DeleteMotorcycleUseCase";
  
  import { CreateMotorcycleDTO } from "../../../application/use-cases/motorcycle/CreateMotorcycleDTO";
  import { UpdateMotorcycleDTO } from "../../../application/use-cases/motorcycle/UpdateMotorcycleDTO";
  import { CheckMaintenanceDTO } from "../../../application/use-cases/motorcycle/CheckMaintenanceDTO";
  import { PerformMaintenanceDTO } from "../../../application/use-cases/motorcycle/PerformMaintenanceDTO";
  
  import { MotorcycleNotFoundException } from "../../../domain/exceptions/motorcycle/MotorcycleNotFoundException";
  import { ConcessionNotFoundException } from "../../../domain/exceptions/concession/ConcessionNotFoundException";
import { VinAlreadyExistsException } from "../../../domain/exceptions/motorcycle/VinAlreadyExistsException";
  import { ZodError } from "zod";
  
  @Controller("motorcycles")
  export class MotorcycleController {
    constructor(
      private readonly createMotorcycleUseCase: CreateMotorcycleUseCase,
      private readonly updateMotorcycleUseCase: UpdateMotorcycleUseCase,
      private readonly checkMaintenanceDueUseCase: CheckMaintenanceDueUseCase,
      private readonly performMaintenanceUseCase: PerformMaintenanceUseCase,
      private readonly getAllMotorcyclesUseCase: GetAllMotorcyclesUseCase,
      private readonly findMotorcyclesByConcessionUseCase: FindMotorcyclesByConcessionUseCase,
      private readonly findMotorcycleByVinUseCase: FindMotorcycleByVinUseCase,
      private readonly deleteMotorcycleUseCase: DeleteMotorcycleUseCase
    ) {}
  
    @Post()
    async create(@Body() body: CreateMotorcycleDTO) {
      try {
        const moto = await this.createMotorcycleUseCase.execute(body);
        return { message: "Moto créée", moto };
      } catch (error) {
        if (error instanceof ZodError) {
          throw new BadRequestException(error.issues);
        }
        if (error instanceof ConcessionNotFoundException) {
          throw new BadRequestException(error.message);
        }
        if (error instanceof VinAlreadyExistsException) {
          throw new BadRequestException(error.message);
        }
        throw error;
      }
    }
  
    @Get()
    async findAll() {
      return await this.getAllMotorcyclesUseCase.execute();
    }
  
    @Get("concession/:concessionId")
    async findByConcession(@Param("concessionId") concessionId: string) {
      return await this.findMotorcyclesByConcessionUseCase.execute(concessionId);
    }
  
    @Get("vin/:vin")
    async findByVin(@Param("vin") vin: string) {
      const moto = await this.findMotorcycleByVinUseCase.execute(vin);
      if (!moto) {
        throw new BadRequestException("Moto introuvable avec ce VIN");
      }
      return moto;
    }
  
    @Get(":id/check-maintenance")
    async checkMaintenance(
      @Param("id") motorcycleId: string,
      @Query() query: any
    ) {
      // On attend ?currentMileage=... ou ?currentDate=...
      try {
        const dto: CheckMaintenanceDTO = {
          motorcycleId,
          currentMileage: query.currentMileage ? Number(query.currentMileage) : undefined,
          currentDate: query.currentDate,
        };
        return await this.checkMaintenanceDueUseCase.execute(dto);
      } catch (error) {
        if (error instanceof ZodError) {
          throw new BadRequestException(error.issues);
        }
        throw error;
      }
    }
  
    @Post(":id/maintenance")
    async performMaintenance(
      @Param("id") motorcycleId: string,
      @Body() body: PerformMaintenanceDTO
    ) {
      try {
        const { motorcycleId: _ignored, ...rest } = body;
        const dto: PerformMaintenanceDTO = {
          motorcycleId,
          ...rest
        };
        await this.performMaintenanceUseCase.execute(dto);
        return { message: "Maintenance effectuée" };
      } catch (error) {
        throw error;
      }
    }
    
  
    @Put(":id")
    async update(@Param("id") id: string, @Body() body: UpdateMotorcycleDTO) {
      try {
        const updated = await this.updateMotorcycleUseCase.execute({ ...body, id });
        return { message: "Moto mise à jour", updated };
      } catch (error) {
        if (error instanceof MotorcycleNotFoundException) {
          throw new BadRequestException(error.message);
        }
        if (error instanceof ZodError) {
          throw new BadRequestException(error.issues);
        }
        throw error;
      }
    }
  
    @Delete(":id")
    async remove(@Param("id") id: string) {
      try {
        await this.deleteMotorcycleUseCase.execute(id);
        return { message: "Moto supprimée" };
      } catch (error) {
        if (error instanceof MotorcycleNotFoundException) {
          throw new BadRequestException(error.message);
        }
        throw error;
      }
    }
  }
  