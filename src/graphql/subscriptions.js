/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTrip = /* GraphQL */ `
  subscription OnCreateTrip(
    $filter: ModelSubscriptionTripFilterInput
    $owner: String
  ) {
    onCreateTrip(filter: $filter, owner: $owner) {
      id
      name
      description
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTrip = /* GraphQL */ `
  subscription OnUpdateTrip(
    $filter: ModelSubscriptionTripFilterInput
    $owner: String
  ) {
    onUpdateTrip(filter: $filter, owner: $owner) {
      id
      name
      description
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTrip = /* GraphQL */ `
  subscription OnDeleteTrip(
    $filter: ModelSubscriptionTripFilterInput
    $owner: String
  ) {
    onDeleteTrip(filter: $filter, owner: $owner) {
      id
      name
      description
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
