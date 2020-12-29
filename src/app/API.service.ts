/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export type GetAssetQuery = {
  __typename: "Asset";
  name: string | null;
  USDValue: string | null;
  imageUrl: string | null;
};

export type ListAssetsQuery = {
  __typename: "Asset";
  name: string | null;
  USDValue: string | null;
  imageUrl: string | null;
};

export type ListLaunchPoolsQuery = {
  __typename: "LaunchPool";
  url: string | null;
  stackedAsset: {
    __typename: "Asset";
    name: string | null;
    USDValue: string | null;
    imageUrl: string | null;
  } | null;
  earnedAsset: {
    __typename: "Asset";
    name: string | null;
    USDValue: string | null;
    imageUrl: string | null;
  } | null;
  totalPoolReward: number | null;
  totalPoolStacked: number | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async GetAsset(name?: string): Promise<GetAssetQuery> {
    const statement = `query GetAsset($name: String) {
        getAsset(name: $name) {
          __typename
          name
          USDValue
          imageUrl
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (name) {
      gqlAPIServiceArguments.name = name;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetAssetQuery>response.data.getAsset;
  }
  async ListAssets(): Promise<Array<ListAssetsQuery>> {
    const statement = `query ListAssets {
        listAssets {
          __typename
          name
          USDValue
          imageUrl
        }
      }`;
    const response = (await API.graphql(graphqlOperation(statement))) as any;
    return <Array<ListAssetsQuery>>response.data.listAssets;
  }
  async ListLaunchPools(): Promise<Array<ListLaunchPoolsQuery>> {
    const statement = `query ListLaunchPools {
        listLaunchPools {
          __typename
          url
          stackedAsset {
            __typename
            name
            USDValue
            imageUrl
          }
          earnedAsset {
            __typename
            name
            USDValue
            imageUrl
          }
          totalPoolReward
          totalPoolStacked
        }
      }`;
    const response = (await API.graphql(graphqlOperation(statement))) as any;
    return <Array<ListLaunchPoolsQuery>>response.data.listLaunchPools;
  }
}
