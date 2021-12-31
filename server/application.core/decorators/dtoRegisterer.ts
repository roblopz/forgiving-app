
import { Mapper } from '@automapper/core';

import { IDtoRegisterer } from "../dto";
import { GlobalContainer } from "../IoC/container";
import { IoCToken } from "../IoC/tokens";

export function DtoRegisterer() : ClassDecorator {
  return function (target) {
    const tgt = target as unknown as new() => IDtoRegisterer;    
    const registerer = new tgt();
    const appMapper = GlobalContainer.get<Mapper>(IoCToken.AppMapper);    
    registerer.register(appMapper);
  };
}