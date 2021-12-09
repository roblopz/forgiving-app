import { AuthChecker } from 'type-graphql';
import { IGraphqlCtx } from '@application.core/graphql';

export const graphqlAuthChecker: AuthChecker<IGraphqlCtx> = ({ context }, roles) => {
  if (!context.user) return false;
  else if (roles && roles.length) {
    if (!roles.includes(context.user.type)) return false;
  }

  return true;
};
