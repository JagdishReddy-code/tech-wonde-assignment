import { Body, Controller, Get, HttpCode, HttpStatus, Param,Post,Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCompanyDataDto } from 'src/DTOs/company/company.dto';
import { CompanyService } from 'src/services/company/company.service';
import { BaseController } from '../base.controller';

/**
 * @description Company Controller.
 * @author Jagdish Reddy
 */
@Controller('company')
@UseGuards(AuthGuard('jwt'))
export class CompanyController extends BaseController {

    constructor(private readonly companyService: CompanyService) {
        super();
    }

  /**
   * @description Post Route to create a new company.
   * @param {CreateCompanyDataDto} requestedData Requested Payload Type.
   * @return {Promise<any>}.
   */
  @Post('create')
  @HttpCode(HttpStatus.OK)
    async create(@Body() requestedData: CreateCompanyDataDto): Promise<any> {
        const response = await this.companyService.create(requestedData);
        return this.respond(response);
    }

  /**
   * @description Get Route to get a company by Id.
   * @param {string} id Id of the company.
   * @return {Promise<any>}
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<any> {
      const response = await this.companyService.findById(id);
      return this.respond(response);
  }
  /**
   * @description Get All companies, search by name.
   * @param {Record<string, any>} params Takes the query params.
   * @return {Promise<any>}.
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async getBySearch(@Query() params: Record<string, any>): Promise<any> {
      const response = await this.companyService.find(params.search);
      return this.respond(response);
  }

}
