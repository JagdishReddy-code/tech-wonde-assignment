import { IsNotEmpty } from 'class-validator';

/**
 * @description CreateCompanyDataDto Class to create a new company.
 * @author Jagdish Reddy
 * @since 0.0.1
 */
export class CreateCompanyDataDto {

    @IsNotEmpty()
        name: string;

    @IsNotEmpty()
        ceoName: string;
    
    @IsNotEmpty()
        companyAddress: string;
    
    @IsNotEmpty()
        inceptionDate: Date;

}
