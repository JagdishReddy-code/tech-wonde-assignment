import { ToString } from '@lib/core/decorators/tostring.decorator';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { timestamps, DEFAULT_COLLATION, registerSchemaModel } from '@lib/core/schemas';

@ToString(['id', 'name'])
@Schema({
    collection: 'company',
    timestamps: timestamps,
    collation: DEFAULT_COLLATION,
    versionKey: false,
})
export class Company extends Document {

  @Prop({ required: true, maxlength: 50 })
      name: string;

  @Prop({ required: true, maxlength: 50 })
      ceoName: string;

  @Prop({ required: true, maxlength: 200 })
      companyAddress: string;

  @Prop({ default: new Date() })
      inceptionDate: Date;

}

registerSchemaModel(Company);
