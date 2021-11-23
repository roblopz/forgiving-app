
import { Mapper } from "@automapper/core";
import { IDtoRegisterer } from "@domain/core/IDtoRegisterer";
import { IoCToken } from "@domain/core/IoCToken";
import { AppContainer } from "../IoC/container";

export function DtoRegisterer() : ClassDecorator {
  return function (target) {
    const tgt = target as unknown as new() => IDtoRegisterer;    
    const registerer = new tgt();
    registerer.register(AppContainer.get<Mapper>(IoCToken.AppMapper));
  };
}