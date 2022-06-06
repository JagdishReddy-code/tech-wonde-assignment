import { ToString } from '@lib/core/decorators/tostring.decorator';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { timestamps, DEFAULT_COLLATION, registerSchemaModel, OneToMany } from '@lib/core/schemas';
import { Company } from '../company/company.schema';

@ToString(['id'])
@Schema({
    collection: 'team',
    timestamps: timestamps,
    collation: DEFAULT_COLLATION,
    versionKey: false,
})
export class Team extends Document {

  @OneToMany(Company, { required: true, maxlength: 50 })
      company: Company;

  @Prop({ required: true, maxlength: 50 })
      teamLeadName: string;

}

registerSchemaModel(Team);
