
import { Mapper } from '@automapper/core';

import { GlobalContainer } from '@application.core/IoC/_global';
import { IDtoRegisterer } from "../dto";
import { IoCToken } from "../IoC/tokens";

export function DtoRegisterer() : ClassDecorator {
  return function (target) {
    const tgt = target as unknown as new() => IDtoRegisterer;    
    const registerer = new tgt();
    const appMapper = GlobalContainer.get<Mapper>(IoCToken.AppMapper);    
    registerer.register(appMapper);
  };
}