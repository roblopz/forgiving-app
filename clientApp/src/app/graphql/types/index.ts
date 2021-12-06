import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AppSettingsDto = {
  __typename?: 'AppSettingsDTO';
  currentConflict: ConflictDto;
};

export type ConflictDto = {
  __typename?: 'ConflictDTO';
  dateStarted: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserDto;
  updatePlayer: Player;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdatePlayerArgs = {
  input: UpdatePlayerInput;
};

export type Player = {
  __typename?: 'Player';
  hateLevel: Scalars['Float'];
  id: Scalars['ID'];
  imagePath?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  status: PlayerStatus;
};

export enum PlayerStatus {
  Peace = 'PEACE',
  War = 'WAR'
}

export type Query = {
  __typename?: 'Query';
  appSettings: AppSettingsDto;
  getAllPlayers: Array<Player>;
  getPlayer: Player;
};


export type QueryGetPlayerArgs = {
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onPlayerUpdated: Player;
};

export type UpdatePlayerInput = {
  hateLevel: Scalars['Float'];
  id: Scalars['ID'];
  status: PlayerStatus;
};

export type UserDto = {
  __typename?: 'UserDTO';
  id: Scalars['ID'];
  player?: Maybe<Player>;
  type: UserType;
  userName: Scalars['String'];
};

export enum UserType {
  Anon = 'ANON',
  Player = 'PLAYER'
}

export type AppSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type AppSettingsQuery = { __typename?: 'Query', appSettings: { __typename?: 'AppSettingsDTO', currentConflict: { __typename?: 'ConflictDTO', dateStarted: any } } };

export type PlayerFragment = { __typename?: 'Player', id: string, name: string, hateLevel: number, status: PlayerStatus, imagePath?: string | null | undefined };

export type GetAllPlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPlayersQuery = { __typename?: 'Query', players: Array<{ __typename?: 'Player', id: string, name: string, hateLevel: number, status: PlayerStatus, imagePath?: string | null | undefined }> };

export type OnPlayerUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnPlayerUpdatedSubscription = { __typename?: 'Subscription', updatedPlayer: { __typename?: 'Player', id: string, name: string, hateLevel: number, status: PlayerStatus, imagePath?: string | null | undefined } };

export type UpdatePlayerMutationVariables = Exact<{
  input: UpdatePlayerInput;
}>;


export type UpdatePlayerMutation = { __typename?: 'Mutation', updated: { __typename?: 'Player', id: string, name: string, hateLevel: number, status: PlayerStatus, imagePath?: string | null | undefined } };

export type UserFragment = { __typename?: 'UserDTO', id: string, type: UserType, userName: string, player?: { __typename?: 'Player', hateLevel: number, id: string, name: string, status: PlayerStatus } | null | undefined };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', user: { __typename?: 'UserDTO', id: string, type: UserType, userName: string, player?: { __typename?: 'Player', hateLevel: number, id: string, name: string, status: PlayerStatus } | null | undefined } };

export const PlayerFragmentDoc = gql`
    fragment Player on Player {
  id
  name
  hateLevel
  status
  imagePath
}
    `;
export const UserFragmentDoc = gql`
    fragment User on UserDTO {
  id
  player {
    hateLevel
    id
    name
    status
  }
  type
  userName
}
    `;
export const AppSettingsDocument = gql`
    query AppSettings {
  appSettings {
    currentConflict {
      dateStarted
    }
  }
}
    `;

/**
 * __useAppSettingsQuery__
 *
 * To run a query within a React component, call `useAppSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppSettingsQuery(baseOptions?: Apollo.QueryHookOptions<AppSettingsQuery, AppSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppSettingsQuery, AppSettingsQueryVariables>(AppSettingsDocument, options);
      }
export function useAppSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppSettingsQuery, AppSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppSettingsQuery, AppSettingsQueryVariables>(AppSettingsDocument, options);
        }
export type AppSettingsQueryHookResult = ReturnType<typeof useAppSettingsQuery>;
export type AppSettingsLazyQueryHookResult = ReturnType<typeof useAppSettingsLazyQuery>;
export type AppSettingsQueryResult = Apollo.QueryResult<AppSettingsQuery, AppSettingsQueryVariables>;
export const GetAllPlayersDocument = gql`
    query GetAllPlayers {
  players: getAllPlayers {
    ...Player
  }
}
    ${PlayerFragmentDoc}`;

/**
 * __useGetAllPlayersQuery__
 *
 * To run a query within a React component, call `useGetAllPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPlayersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPlayersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPlayersQuery, GetAllPlayersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPlayersQuery, GetAllPlayersQueryVariables>(GetAllPlayersDocument, options);
      }
export function useGetAllPlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPlayersQuery, GetAllPlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPlayersQuery, GetAllPlayersQueryVariables>(GetAllPlayersDocument, options);
        }
export type GetAllPlayersQueryHookResult = ReturnType<typeof useGetAllPlayersQuery>;
export type GetAllPlayersLazyQueryHookResult = ReturnType<typeof useGetAllPlayersLazyQuery>;
export type GetAllPlayersQueryResult = Apollo.QueryResult<GetAllPlayersQuery, GetAllPlayersQueryVariables>;
export const OnPlayerUpdatedDocument = gql`
    subscription OnPlayerUpdated {
  updatedPlayer: onPlayerUpdated {
    ...Player
  }
}
    ${PlayerFragmentDoc}`;

/**
 * __useOnPlayerUpdatedSubscription__
 *
 * To run a query within a React component, call `useOnPlayerUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnPlayerUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnPlayerUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnPlayerUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnPlayerUpdatedSubscription, OnPlayerUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnPlayerUpdatedSubscription, OnPlayerUpdatedSubscriptionVariables>(OnPlayerUpdatedDocument, options);
      }
export type OnPlayerUpdatedSubscriptionHookResult = ReturnType<typeof useOnPlayerUpdatedSubscription>;
export type OnPlayerUpdatedSubscriptionResult = Apollo.SubscriptionResult<OnPlayerUpdatedSubscription>;
export const UpdatePlayerDocument = gql`
    mutation UpdatePlayer($input: UpdatePlayerInput!) {
  updated: updatePlayer(input: $input) {
    ...Player
  }
}
    ${PlayerFragmentDoc}`;
export type UpdatePlayerMutationFn = Apollo.MutationFunction<UpdatePlayerMutation, UpdatePlayerMutationVariables>;

/**
 * __useUpdatePlayerMutation__
 *
 * To run a mutation, you first call `useUpdatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlayerMutation, { data, loading, error }] = useUpdatePlayerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePlayerMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlayerMutation, UpdatePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlayerMutation, UpdatePlayerMutationVariables>(UpdatePlayerDocument, options);
      }
export type UpdatePlayerMutationHookResult = ReturnType<typeof useUpdatePlayerMutation>;
export type UpdatePlayerMutationResult = Apollo.MutationResult<UpdatePlayerMutation>;
export type UpdatePlayerMutationOptions = Apollo.BaseMutationOptions<UpdatePlayerMutation, UpdatePlayerMutationVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $username: String!) {
  user: login(password: $password, username: $username) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const graphqlPath = "http://localhost:4000/graphql";