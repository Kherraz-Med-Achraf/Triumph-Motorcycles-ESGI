import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
} from "@nestjs/common";

import { CreateCompanyMotorcycleUseCase } from "../../../application/use-cases/companyMotorcycle/CreateCompanyMotorcycleUseCase";
import { GetCompanyMotorcycleUseCase } from "../../../application/use-cases/companyMotorcycle/GetCompanyMotorcycleUseCase";
import { GetAllCompanyMotorcyclesUseCase } from "../../../application/use-cases/companyMotorcycle/GetAllCompanyMotorcyclesUseCase";
import { GetCompanyMotorcyclesByCompanyUseCase } from "../../../application/use-cases/companyMotorcycle/GetCompanyMotorcyclesByCompanyUseCase";
import { GetCompanyMotorcyclesByMotorcycleUseCase } from "../../../application/use-cases/companyMotorcycle/GetCompanyMotorcyclesByMotorcycleUseCase";
import { UpdateCompanyMotorcycleUseCase } from "../../../application/use-cases/companyMotorcycle/UpdateCompanyMotorcycleUseCase";
import { DeleteCompanyMotorcycleUseCase } from "../../../application/use-cases/companyMotorcycle/DeleteCompanyMotorcycleUseCase";

import { CreateCompanyMotorcycleDTO } from "../../../application/use-cases/companyMotorcycle/CreateCompanyMotorcycleDTO";
import { UpdateCompanyMotorcycleDTO } from "../../../application/use-cases/companyMotorcycle/UpdateCompanyMotorcycleDTO";

@Controller("company-motorcycles")
export class CompanyMotorcycleController {
  constructor(
    private readonly createCompanyMotorcycleUC: CreateCompanyMotorcycleUseCase,
    private readonly getCompanyMotorcycleUC: GetCompanyMotorcycleUseCase,
    private readonly getAllCompanyMotorcyclesUC: GetAllCompanyMotorcyclesUseCase,
    private readonly getByCompanyUC: GetCompanyMotorcyclesByCompanyUseCase,
    private readonly getByMotorcycleUC: GetCompanyMotorcyclesByMotorcycleUseCase,
    private readonly updateCompanyMotorcycleUC: UpdateCompanyMotorcycleUseCase,
    private readonly deleteCompanyMotorcycleUC: DeleteCompanyMotorcycleUseCase
  ) {}

  @Post()
  async create(@Body() dto: CreateCompanyMotorcycleDTO) {
    try {
      const link = await this.createCompanyMotorcycleUC.execute(dto);
      return { message: "Lien créé", link };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException("An unexpected error occurred");
    }
  }

  @Get()
  async findAll() {
    return this.getAllCompanyMotorcyclesUC.execute();
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    const link = await this.getCompanyMotorcycleUC.execute(id);
    if (!link) {
      throw new BadRequestException("Lien introuvable");
    }
    return link;
  }

  @Get("company/:companyId")
  async findByCompany(@Param("companyId") companyId: string) {
    return this.getByCompanyUC.execute(companyId);
  }

  @Get("motorcycle/:motoId")
  async findByMotorcycle(@Param("motoId") motoId: string) {
    return this.getByMotorcycleUC.execute(motoId);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: Omit<UpdateCompanyMotorcycleDTO, "id">
  ) {
    try {
      const updated = await this.updateCompanyMotorcycleUC.execute({
        ...dto,
        id,
      });
      if (!updated) {
        throw new BadRequestException("Lien introuvable");
      }
      return { message: "Lien mis à jour", updated };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException("An unexpected error occurred");
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    try {
      await this.deleteCompanyMotorcycleUC.execute(id);
      return { message: "Lien supprimé" };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException("An unexpected error occurred");
    }
  }
}
