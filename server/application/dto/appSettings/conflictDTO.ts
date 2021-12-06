import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ConflictDTO {
  @Field(_type => Date)
  dateStarted: Date;
}