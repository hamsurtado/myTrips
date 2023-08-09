/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTrip = /* GraphQL */ `
  query GetTrip($id: ID!) {
    getTrip(id: $id) {
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
export const listTrips = /* GraphQL */ `
  query ListTrips(
    $filter: ModelTripFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrips(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        owner
        imageURL
        destinations {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getDestination = /* GraphQL */ `
  query GetDestination($id: ID!) {
    getDestination(id: $id) {
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
export const listDestinations = /* GraphQL */ `
  query ListDestinations(
    $filter: ModelDestinationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDestinations(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const destinationsByTripIdAndId = /* GraphQL */ `
  query DestinationsByTripIdAndId(
    $tripId: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDestinationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    destinationsByTripIdAndId(
      tripId: $tripId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
