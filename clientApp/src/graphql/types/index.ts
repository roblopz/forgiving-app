import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  updatePlayer: Player;
};


export type MutationUpdatePlayerArgs = {
  input: UpdatePlayerInput;
};

export type Player = {
  __typename?: 'Player';
  hateLevel: Scalars['Float'];
  id: Scalars['ID'];
  name: Scalars['String'];
  status: PlayerStatus;
};

export enum PlayerStatus {
  Peace = 'PEACE',
  War = 'WAR'
}

export type Query = {
  __typename?: 'Query';
  getAllPlayers: Array<Player>;
  getPlayer: Player;
};


export type QueryGetPlayerArgs = {
  id: Scalars['String'];
};

export type UpdatePlayerInput = {
  hateLevel: Scalars['Float'];
  id: Scalars['ID'];
  status: PlayerStatus;
};

export type GetAllPlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPlayersQuery = { __typename?: 'Query', players: Array<{ __typename?: 'Player', id: string, name: string, hateLevel: number, status: PlayerStatus }> };


export const GetAllPlayersDocument = `
    query GetAllPlayers {
  players: getAllPlayers {
    id
    name
    hateLevel
    status
  }
}
    `;
export const useGetAllPlayersQuery = <
      TData = GetAllPlayersQuery,
      TError = unknown
    >(
      variables?: GetAllPlayersQueryVariables,
      options?: UseQueryOptions<GetAllPlayersQuery, TError, TData>
    ) =>
    useQuery<GetAllPlayersQuery, TError, TData>(
      variables === undefined ? ['GetAllPlayers'] : ['GetAllPlayers', variables],
      fetcher<GetAllPlayersQuery, GetAllPlayersQueryVariables>(GetAllPlayersDocument, variables),
      options
    );