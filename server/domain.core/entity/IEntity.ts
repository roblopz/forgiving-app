import { ObjectId } from 'mongodb';

export { ObjectId };
export type IdType = string | ObjectId;
export interface IEntity { _id: IdType; }