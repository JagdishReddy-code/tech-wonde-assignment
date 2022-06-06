import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { AsyncModelFactory,ModelDefinition} from '@nestjs/mongoose/dist/interfaces';
import { PropOptions } from '@nestjs/mongoose/dist/decorators/prop.decorator';

/**
 * Default case-insensitive search collation.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DEFAULT_COLLATION = { locale: 'en', strength: 2 };

export const modelDefinitions: ModelDefinition[] = [];
export const modelDefinitionFactories: AsyncModelFactory[] = [];

export function createSchemaForClass(
    clazz: any,
    methods?: string[],
): mongoose.Schema {
    const modelSchema = SchemaFactory.createForClass(clazz);

    methods = methods ?? [];
    methods.push('toString');

    methods.forEach((method) => {
        modelSchema.methods[method] = clazz.prototype[method];
    });

    return modelSchema;
}

export function registerSchemaModel(
    clazz: any,
    methods?: string[],
): mongoose.Schema {
    const modelSchema = createSchemaForClass(clazz, methods);

    modelDefinitions.push({
        name: clazz.name,
        schema: modelSchema,
    });

    return modelSchema;
}

/**
 * Register a schema asynchronously to achieve hooks. https://docs.nestjs.com/techniques/mongodb#hooks-middleware
 *
 * @param clazz
 * @param inject
 * @param factory
 * @return The generated schema.
 */
export function registerSchemaModelAsync(
    clazz: any,
    inject: any[],
    factory: (schema: mongoose.Schema) => any,
): mongoose.Schema {
    const modelSchema = createSchemaForClass(clazz);
    const factoryDefinition: AsyncModelFactory = {
        name: clazz.name,
        useFactory: factory(modelSchema),
        inject,
    };

    modelDefinitionFactories.push(factoryDefinition);

    return modelSchema;
}

/**
 * A DRY decorator to use references in Schema. This uses {@link Prop}.
 * @param schema The schema class to reference.
 * @param options Other options to pass to {@link Prop}.
 * @constructor
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const OneToMany = (
    schema: any,
    options: PropOptions = {},
): PropertyDecorator =>
    Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: schema.name,
        ...(options as Record<string, any>),
    });

/**
 * A DRY decorator to use number based enums in Schema. This uses {@link Prop}.
 * @param enumClass
 * @param options
 * @constructor
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EnumProp = (
    enumClass: any,
    options: PropOptions = {},
): PropertyDecorator =>
    Prop({
        type: Number,
        enum: enumClass,
        // Make it required by default (as most of the time, enums have default values).
        required: true,
        ...(options as Record<string, any>),
    });

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EnumArrayProp = (
    enumClass: any,
    options: PropOptions = {},
): PropertyDecorator =>
    Prop({
        type: [Number],
        enum: enumClass,
        // Make it required by default (as most of the time, enums have default values).
        required: true,
        ...(options as Record<string, any>),
    });

export const timestamps = { createdAt: 'created', updatedAt: 'updated' };
