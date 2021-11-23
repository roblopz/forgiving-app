import { Mapper } from "@automapper/core";

export interface IDtoRegisterer {
  register(appMapper: Mapper): void;
}