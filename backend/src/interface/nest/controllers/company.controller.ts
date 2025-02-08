import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { CreateCompanyUseCase } from "../../../application/use-cases/company/CreateCompanyUseCase";
import { GetCompanyUseCase } from "../../../application/use-cases/company/GetCompanyUseCase";
import { GetAllCompaniesUseCase } from "../../../application/use-cases/company/GetAllCompaniesUseCase";
import { UpdateCompanyUseCase } from "../../../application/use-cases/company/UpdateCompanyUseCase";
import { DeleteCompanyUseCase } from "../../../application/use-cases/company/DeleteCompanyUseCase";
import { CreateCompanyDTO } from "../../../application/use-cases/company/CreateCompanyDTO";
import { UpdateCompanyDTO } from "../../../application/use-cases/company/UpdateCompanyDTO";
import { CompanyAlreadyExistsException } from "../../../domain/exceptions/company/CompanyAlreadyExistsException";
import { CompanyNotFoundException } from "../../../domain/exceptions/company/CompanyNotFoundException";
import { CompanyUpdateFailedException } from "../../../domain/exceptions/company/CompanyUpdateFailedException";

import { AdminGuard } from "../guards/AdminGuard";
import { ZodError } from "zod";

@Controller("companies")
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly getCompanyUseCase: GetCompanyUseCase,
    private readonly getAllCompaniesUseCase: GetAllCompaniesUseCase,
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase
  ) {}

  @UseGuards(AdminGuard)
  @Post("create")
  async create(@Body() body: CreateCompanyDTO) {
    try {
      return await this.createCompanyUseCase.execute(body);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: "Création échouée",
          errors: error.format(),
        });
      }
      if (error instanceof CompanyAlreadyExistsException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @UseGuards(AdminGuard)
  @Get(":id")
  async getCompany(@Param("id") id: string) {
    try {
      return await this.getCompanyUseCase.execute(id);
    } catch (error) {
      if (error instanceof CompanyNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @UseGuards(AdminGuard)
  @Get()
  async getAllCompanies() {
    return await this.getAllCompaniesUseCase.execute();
  }

  @UseGuards(AdminGuard)
  @Put(":id")
  async updateCompany(@Param("id") id: string, @Body() body: UpdateCompanyDTO) {
    try {
      return await this.updateCompanyUseCase.execute(id, body);
    } catch (error) {
      if (error instanceof CompanyNotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: "Validation échouée",
          errors: error.format(),
        });
      }
      if (error instanceof CompanyUpdateFailedException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @UseGuards(AdminGuard)
  @Delete(":id")
  async deleteCompany(@Param("id") id: string) {
    try {
      await this.deleteCompanyUseCase.execute(id);
      return { message: "Société supprimée avec succès." };
    } catch (error) {
      if (error instanceof CompanyNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
