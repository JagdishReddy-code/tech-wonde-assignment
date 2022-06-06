import { Team } from '@lib/core/schemas/team/team.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeamDto } from 'src/DTOs/team/team.dto';
import { BaseService } from '../base.service';

/**
 * @description Team Service, defined all team related method t interact with models or other services.
 * @author Jagdish Reddy
 */
@Injectable()
export class TeamService extends BaseService {

    constructor(@InjectModel(Team.name) private readonly teamModel: Model<Team>) {
        super();
    }

    /**
   * Create a Team.
   * @param {CreateTeamDto} newTeam Pass the data to create a new team.
   * @return {Promise<Team>}
   */
    async create(newTeam: CreateTeamDto): Promise<Team> {
        const newteamInstance = new this.teamModel(new CreateTeamDto(newTeam));
        await newteamInstance.save();
        this.logger.log('Created ' + newteamInstance);
        return newteamInstance;
    }

    /**
     * @description Find all teams by grouping with team.
     * @return {Promise<Team[]>}.
     */
    async findAll(): Promise<Team[]> {
        const teams = await this.teamModel.aggregate([
            {
                $lookup: {
                    from: 'company',
                    localField: 'company',
                    foreignField: '_id',
                    as: 'company',
                },
            },
            { $unwind: { path: '$company' } },
            {
                $group: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    _id: '$company',
                    teams: { $push: '$$ROOT' },
                },
            },
            {
                $project: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    _id: 0,
                    company: '$_id',
                    teams: '$teams',
                },
            },
        ]);
        // Append Teams into company.
        teams.map(team=>{
            const merge =  team.company['teams'] = team.teams;
            delete team.teams;
            return merge;
        })
        return teams;
    }

}
