import { Container, inject, injectable } from 'inversify';
import { ClientSession, Connection } from 'mongoose';

import { IoCToken } from '@application.core/IoC/tokens';
import { IAppDB } from '@infraestructure.core/database/IAppDB';
import { IForkTransactionSessionOptions, IHasUnitOfWork, ITransaction, ITransactionSessionOptions, IUnitOfWork, IUnitOfWorkStartArgs } from '@infraestructure.core/unitOfWork';

class SessionProvider {
  current?: ClientSession = null;
}

@injectable()
export class UnitOfWork implements IUnitOfWork {
  createdAt = Date.now();
  sessionProvider = new SessionProvider();
  private connection: Connection;

  get session() {
    return this.sessionProvider.current;
  }

  constructor(
    @inject(IoCToken.Container) private container: Container,
    @inject(IoCToken.AppDB) { connection }: IAppDB
  ) {
    this.connection = connection;
  }

  async start(options: ITransactionSessionOptions = {}): Promise<ITransaction> {
    if (!this.session) {
      this.sessionProvider.current = await this.connection.startSession(options.sessionOptions);
      this.session.startTransaction(options.transactionOptions);
    }
      
    return {
      commit: async () => {
        try {
          const { transaction: nativeTransaction, hasEnded } = this.session;
          if (!hasEnded && nativeTransaction.isActive && !nativeTransaction.isCommitted)
            await this.session.commitTransaction();
        } finally {
          this.sessionProvider.current = null;
        }
      },
      rollback: async () => {
        const { transaction: nativeTransaction, hasEnded } = this.session;
        if (!hasEnded && nativeTransaction.isActive && !nativeTransaction.isCommitted)
          await this.session?.abortTransaction();
        this.sessionProvider.current = null;
      },
      session: this.session
    };
  }

  async forkNew<C extends IHasUnitOfWork, T>(
    caller: C,
    action: (this: C, args: IUnitOfWorkStartArgs) => T | Promise<T>,
    options: IForkTransactionSessionOptions = { auto: true }
  ): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const forkedThis = this.container.resolve<IHasUnitOfWork>((caller as any).constructor);
    const transaction = await forkedThis.unitOfWork.start(options);
    
    try {
      const res = await action.call(forkedThis, {
        session: forkedThis.unitOfWork.session, 
        transaction 
      } as IUnitOfWorkStartArgs);

      const { hasEnded, transaction: nativeTransaction } = transaction.session || {};
      const shouldCommit = options.auto && !hasEnded && nativeTransaction?.isActive && !nativeTransaction?.isCommitted;

      if (shouldCommit)
        await transaction.commit();
      
      return res;
    } catch(err) {
      const { hasEnded, transaction: nativeTransaction } = transaction.session || {};
      const shouldRollback = options.auto && !hasEnded && nativeTransaction?.isActive && !nativeTransaction?.isCommitted;

      if (shouldRollback)
        await transaction.rollback();
      throw err;
    }
  }
}