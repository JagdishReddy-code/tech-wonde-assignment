import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DEFAULT_COLLATION, registerSchemaModelAsync, timestamps } from '@lib/core/schemas';
import { ToString } from '@lib/core/decorators/tostring.decorator';
import * as bcrypt from 'bcryptjs';
import { Constants } from '@lib/core/constants';

@ToString(['id'])
@Schema({
    collection: 'account',
    timestamps: timestamps,
    collation: DEFAULT_COLLATION,
    versionKey: false,
})
export class Account extends Document {

  @Prop({ required: true, maxlength: 50, unique: true })
      email: string;

  @Prop({ required: true, maxlength: 500 })
      password: string;

  @Prop()
      enabled: boolean;

}

registerSchemaModelAsync(Account, [], (schema) => {
    return () => {
        schema.pre('save', async function () {
            this.password = await bcrypt.hash(
                this.password,
                Constants.BCRYPT_SALT_ROUNDS,
            );
        });

        return schema;
    };
});
