import { Company } from '@lib/core/schemas/company/company.schema';

/**
 * @description CreateTeamDto Class to create a new team with respect to company.
 * @author Jagdish Reddy
 * @since 0.0.1
 */
export class CreateTeamDto {

    company: Company;
    teamLeadName: string;
    constructor(data?: Record<string, any>) {
        this.company = data.company;
        this.teamLeadName = data.team_lead_name;
    }

}
