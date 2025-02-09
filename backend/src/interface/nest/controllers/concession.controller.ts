import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    UseGuards,
    Put,
    Delete,
    BadRequestException,
  } from "@nestjs/common";
  
  import { CreateConcessionUseCase } from "../../../application/use-cases/concession/CreateConcessionUseCase";
  import { CreateConcessionDTO } from "../../../application/use-cases/concession/CreateConcessionDTO";
  
  import { GetAllConcessionsUseCase } from "../../../application/use-cases/concession/GetAllConcessionsUseCase";
  import { GetConcessionUseCase } from "../../../application/use-cases/concession/GetConcessionUseCase";
  import { GetConcessionFromUserUseCase } from "../../../application/use-cases/concession/GetConcessionFromUserUseCase";

  import { UpdateConcessionUseCase } from "../../../application/use-cases/concession/UpdateConcessionUseCase";
  import { UpdateConcessionDTO } from "../../../application/use-cases/concession/UpdateConcessionDTO";
  import { DeleteConcessionUseCase } from "../../../application/use-cases/concession/DeleteConcessionUseCase";
  
  import { ZodError } from "zod";
  import { AdminGuard } from "../guards/AdminGuard";
  import { ConcessionNotFoundException } from "../../../domain/exceptions/concession/ConcessionNotFoundException";
  
  @Controller("concessions")
  export class ConcessionController {
    constructor(
      private readonly createConcessionUseCase: CreateConcessionUseCase,
      private readonly getAllConcessionsUseCase: GetAllConcessionsUseCase,
      private readonly getConcessionFromUserUseCase: GetConcessionFromUserUseCase,
      private readonly getConcessionUseCase: GetConcessionUseCase,
      private readonly updateConcessionUseCase: UpdateConcessionUseCase,
      private readonly deleteConcessionUseCase: DeleteConcessionUseCase
    ) {}
    @UseGuards(AdminGuard)
    @Post("create")
    async create(@Body() body: CreateConcessionDTO) {
      try {
        const concession = await this.createConcessionUseCase.execute(body);
        return { message: "Concession created", concession };
      } catch (error) {
        if (error instanceof ZodError) {
          throw new BadRequestException(error.issues);
        }
        throw error;
      }
    }
    @UseGuards(AdminGuard)
    @Get()
    async findAll() {
      return await this.getAllConcessionsUseCase.execute();
    }
    @UseGuards(AdminGuard)
    @Get(":id")
    async findOne(@Param("id") id: string) {
      try {
        return await this.getConcessionUseCase.execute(id);
      } catch (error) {
        if (error instanceof ConcessionNotFoundException) {
          throw new BadRequestException(error.message);
        }
        throw error;
      }
    }
    @UseGuards(AdminGuard)
    @Get("user/:userId")
    async getByUserId(@Param("userId") userId: string) {
      return this.getConcessionFromUserUseCase.execute(userId);
    }
    @UseGuards(AdminGuard)
    @Put(":id")
    async update(@Param("id") id: string, @Body() body: UpdateConcessionDTO) {
      try {
        const dto = { ...body, id };
        return await this.updateConcessionUseCase.execute(dto);
      } catch (error) {
        if (error instanceof ZodError) {
          throw new BadRequestException(error.issues);
        }
        if (error instanceof ConcessionNotFoundException) {
          throw new BadRequestException(error.message);
        }
        throw error;
      }
    }
    @UseGuards(AdminGuard)
    @Delete(":id")
    async remove(@Param("id") id: string) {
      try {
        await this.deleteConcessionUseCase.execute(id);
        return { message: "Concession deleted" };
      } catch (error) {
        if (error instanceof ConcessionNotFoundException) {
          throw new BadRequestException(error.message);
        }
        throw error;
      }
    }
  }
  