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
      imageURL
      destinations {
        items {
          id
          tripId
          startDate
          endDate
          duration
          destination
          itinerary
          owner
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
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
      imageURL
      destinations {
        items {
          id
          tripId
          startDate
          endDate
          duration
          destination
          itinerary
          owner
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
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
      imageURL
      destinations {
        items {
          id
          tripId
          startDate
          endDate
          duration
          destination
          itinerary
          owner
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateDestination = /* GraphQL */ `
  subscription OnCreateDestination(
    $filter: ModelSubscriptionDestinationFilterInput
    $owner: String
  ) {
    onCreateDestination(filter: $filter, owner: $owner) {
      id
      tripId
      startDate
      endDate
      duration
      destination
      itinerary
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateDestination = /* GraphQL */ `
  subscription OnUpdateDestination(
    $filter: ModelSubscriptionDestinationFilterInput
    $owner: String
  ) {
    onUpdateDestination(filter: $filter, owner: $owner) {
      id
      tripId
      startDate
      endDate
      duration
      destination
      itinerary
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteDestination = /* GraphQL */ `
  subscription OnDeleteDestination(
    $filter: ModelSubscriptionDestinationFilterInput
    $owner: String
  ) {
    onDeleteDestination(filter: $filter, owner: $owner) {
      id
      tripId
      startDate
      endDate
      duration
      destination
      itinerary
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
