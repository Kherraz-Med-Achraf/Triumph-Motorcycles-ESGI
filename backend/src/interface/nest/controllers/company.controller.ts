// src/interface/nest/controllers/company.controller.ts
import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { ZodError } from "zod";
import { CreateCompanyUseCase } from "../../../application/use-cases/company/CreateCompanyUseCase";
import { CreateCompanyDTO } from "../../../application/use-cases/company/CreateCompanyDTO";
import { ManagerUserNotFoundException } from "../../../domain/exceptions/ManagerUserNotFoundException";

@Controller("companies")
export class CompanyController {
  constructor(private readonly createCompanyUseCase: CreateCompanyUseCase) {}

  @Post()
  async createCompany(@Body() dto: CreateCompanyDTO) {
    try {
      // Appel du Use Case
      const company = await this.createCompanyUseCase.execute(dto);
      return company;
    } catch (error) {
      if (error instanceof ZodError) {
        // Erreur de validation Zod
        throw new BadRequestException({
          message: "Création de la company échouée",
          errors: error.format(),
        });
      }
      if (error instanceof ManagerUserNotFoundException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
