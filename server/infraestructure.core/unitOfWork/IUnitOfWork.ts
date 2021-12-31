import { ClientSession } from 'mongoose';
import { ClientSessionOptions, TransactionOptions } from 'mongodb';

export interface ITransaction {
  rollback(): Promise<void>;
  commit(): Promise<void>
  session: ClientSession;
}

export interface ITransactionSessionOptions {
  transactionOptions?: TransactionOptions;
  sessionOptions?: ClientSessionOptions;
}

export interface IForkTransactionSessionOptions extends ITransactionSessionOptions {
  auto?: boolean;
}

export interface IUnitOfWorkStartArgs {
  session: ClientSession;
  transaction: ITransaction;
}

export interface IHasUnitOfWork {
  unitOfWork: IUnitOfWork;
}

export interface IUnitOfWork {
  createdAt: number;
  session: ClientSession;
  start(options?: ITransactionSessionOptions): Promise<ITransaction>;
  
  forkNew<C extends IHasUnitOfWork, T>(
    caller: C,
    action: (this: C, args: IUnitOfWorkStartArgs) => T | Promise<T>,
    options?: IForkTransactionSessionOptions
  ): Promise<T>;
}