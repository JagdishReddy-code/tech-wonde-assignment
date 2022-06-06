import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { modelDefinitionFactories, modelDefinitions} from '@lib/core/schemas/index';

/**
 * The common module which contains all the schemas across the app.
 *
 * @author Shashank Agrawal
 */
@Module({
    imports: [
        MongooseModule.forFeature(modelDefinitions),
        MongooseModule.forFeatureAsync(modelDefinitionFactories),
    ],
    exports: [MongooseModule],
})
export class SchemaModule {}
