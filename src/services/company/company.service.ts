import { OperationFailedException } from '@lib/core/exceptions/operation-failed-exception';
import { Company } from '@lib/core/schemas/company/company.schema';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyDataDto } from 'src/DTOs/company/company.dto';
import { BaseService } from '../base.service';

/**
 * @description Company Service, defined all company related methods.
 */
@Injectable()
export class CompanyService extends BaseService {

    constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
    ) {
        super();
    }

    /**
   * Create a Company.
   *
   * @param {CreateCompanyDataDto} newCompany - Pass the payload to create.
   * @return {Promise<Company>}
   */
    async create(newCompany: CreateCompanyDataDto): Promise<Company> {
        const newCompanyInstance = new this.companyModel(
            newCompany,
        );
        console.log(newCompanyInstance  )
        await newCompanyInstance.save();
        this.logger.log('Created ' + newCompanyInstance);
        return newCompanyInstance;
    }

    /**
     * @description Find a company by ID.
     * @param {string} id - Pass the ID.
     * @return {Promise<Company>}
     */
    async findById(id: string): Promise<Company> {
        const company = await this.companyModel.findById(id).exec();
        if (!company) {
            this.logger.warn(`No company is found with id: ${id}`);
            throw new OperationFailedException('No Company found', HttpStatus.NOT_FOUND);
        }
        return company;
    }

    /**
     * @description Find all Companies based on match citeria, and send companies array
     * @param {string} searchQuery - Pass the searchquery
     * @return {Promise<Company[]>}. 
     */
    async find(searchQuery: string): Promise<Company[]> {
        const query = {
            name: {
                $regex: searchQuery,
                $options: 'i',
            },
        };
        const company = await this.companyModel.find(query).exec();
        if (!company) {
            this.logger.warn(`No company is found with id: ${searchQuery}`);
            throw new OperationFailedException('No engagement found');
        }
        return company;
    }

}
