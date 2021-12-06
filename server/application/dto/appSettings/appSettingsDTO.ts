import { Field, ObjectType } from "type-graphql";
import { ConflictDTO } from "./conflictDTO";

@ObjectType()
export class AppSettingsDTO {
  @Field(_type => ConflictDTO)
  currentConflict: ConflictDTO;
}