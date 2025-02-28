/**
 * Root Schema Representation
 */
export type ModelIntrospectionSchema = {
  version: 1;
  models: SchemaModels;
  nonModels: SchemaNonModels;
  enums: SchemaEnums;
};
/**
 * Top-level Entities on a Schema
 */
export type SchemaModels = Record<string, SchemaModel>;
export type SchemaNonModels = Record<string, SchemaNonModel>;
export type SchemaEnums = Record<string, SchemaEnum>;

export type SchemaModel = {
  name: string;
  fields: Fields;
  attributes?: ModelAttribute[];
  pluralName: string;
  syncable?: boolean;
  primaryKeyInfo: PrimaryKeyInfo;
};
export type SchemaNonModel = {
  name: string;
  fields: Fields;
  attributes?: ModelAttribute[];
};
export type SchemaEnum = {
  name: string;
  values: string[];
  attributes?: ModelAttribute[];
  fieldAttributes?: Record<string, ModelAttribute[]>;
};

export type ModelAttribute = { type: string; properties?: { [key: string]: any } };
/**
 * Field Definition
 */
export type Fields = Record<string, Field>;
export type Field = {
  name: string;
  type: FieldType;
  index: number;
  isArray: boolean;
  isRequired: boolean;
  isReadOnly?: boolean;
  isArrayNullable?: boolean;
  attributes?: FieldAttribute[];
  association?: AssociationType;
};
export type FieldType =
  | 'ID'
  | 'String'
  | 'Int'
  | 'Float'
  | 'AWSDate'
  | 'AWSTime'
  | 'AWSDateTime'
  | 'AWSTimestamp'
  | 'AWSEmail'
  | 'AWSURL'
  | 'AWSIPAddress'
  | 'Boolean'
  | 'AWSJSON'
  | 'AWSPhone'
  | { enum: string }
  | { model: string }
  | { nonModel: string };
export type FieldAttribute = ModelAttribute;
/**
 * Field-level Relationship Definitions
 */
export enum CodeGenConnectionType {
  HAS_ONE = 'HAS_ONE',
  BELONGS_TO = 'BELONGS_TO',
  HAS_MANY = 'HAS_MANY',
}
export type AssociationBaseType = {
  connectionType: CodeGenConnectionType;
};

export type AssociationHasMany = AssociationBaseType & {
  connectionType: CodeGenConnectionType.HAS_MANY;
  associatedWith: string[];
};
export type AssociationHasOne = AssociationBaseType & {
  connectionType: CodeGenConnectionType.HAS_ONE;
  associatedWith: string[];
  targetNames: string[];
};

export type AssociationBelongsTo = AssociationBaseType & {
  connectionType: CodeGenConnectionType.BELONGS_TO;
  targetNames: string[];
};
export type AssociationType = AssociationHasMany | AssociationHasOne | AssociationBelongsTo;

export type PrimaryKeyInfo = {
  isCustomPrimaryKey: boolean;
  primaryKeyFieldName: string;
  sortKeyFieldNames: string[];
};
