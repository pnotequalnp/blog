import { GraphQLClient, gql } from 'graphql-request'

export const API_ENDPOINT = 'https://api.github.com/graphql';
export const API_HEADERS = {
  Authorization: `token ${process.env.GITHUB}`
};

export const client = new GraphQLClient(API_ENDPOINT, {
  headers: API_HEADERS
});

type RepoIn = {
  description?: string,
  id: string,
  name: string,
  object: {
    text?: string
  }
  primaryLanguage?: {
    name: string
  },
  stargazerCount: number,
  url: string
};

export type Repo<T> = {
  description?: string,
  id: string,
  language?: string,
  name: string,
  readme: T,
  stars: number,
  url: string
};

export const pinnedRepos = async (username: string): Promise<Repo<string>[]> =>
  client.request(gql`{
    user(login: "${username}") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            description
            id
            name
            object(expression: "main:README.md") {
              ... on Blob {
                text
              }
            }
            primaryLanguage {
              name
            }
            stargazerCount
            url
          }
        }
      }
    }
  }`)
    // .then(res => {console.log(res.user.pinnedItems.nodes); return res;})
    .then(res => res.user.pinnedItems.nodes.map((repo: RepoIn) => ({
    description: repo.description ?? null,
    id: repo.id,
    language: repo.primaryLanguage?.name ?? null,
    name: repo.name,
    readme: repo.object?.text ?? null,
    stars: repo.stargazerCount,
    url: repo.url
  })));
