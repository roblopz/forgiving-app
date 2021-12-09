
import { Mapper } from "@automapper/core";

import { IDtoRegisterer } from "../dto";
import { Container, IoCToken } from "../IoC";

export function DtoRegisterer() : ClassDecorator {
  return function (target) {
    const tgt = target as unknown as new() => IDtoRegisterer;    
    const registerer = new tgt();
    const appMapper = Container.get<Mapper>(IoCToken.AppMapper);
    
    registerer.register(appMapper);
  };
}