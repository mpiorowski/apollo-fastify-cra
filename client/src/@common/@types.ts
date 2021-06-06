import { CombinedError, OperationContext, OperationResult } from "urql";

export type GraphqlQuery<T> = {
  response: T;
  fetching: boolean;
  error?: CombinedError;
  reexecuteQuery: () => void;
};

export type GraphqlMutation<T> = {
  response: T;
  fetching: boolean;
  error?: CombinedError;
  mutate: (variables?: T, context?: Partial<OperationContext>) => Promise<OperationResult>;
};
