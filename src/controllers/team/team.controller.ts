import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTeamDto } from 'src/DTOs/team/team.dto';
import { TeamService } from 'src/services/team/team.service';
import { BaseController } from '../base.controller';

/**
 * @description Team Controller.
 * @author Jagdish Reddy
 */
@Controller('team')
@UseGuards(AuthGuard('jwt'))
export class TeamController extends BaseController {

    constructor(private readonly teamService: TeamService) {
        super();
    }

    /**
     * @description Post request to create a team under a company.
     * @param {CreateTeamDto} requestedData Requested Payload to create a Team.
     * @return {Promise<any>}
     */
    @Post('create')
    @HttpCode(HttpStatus.OK)
    async create(@Body() requestedData: CreateTeamDto): Promise<any> {
        const response = await this.teamService.create(requestedData);
        return this.respond(response);
    }

    /**
     * @description Get All Teams by grouping with team.
     * @return {Promise<any>}.
     */
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(): Promise<any> {
        const response = await this.teamService.findAll();
        return this.respond(response);
    }

}
