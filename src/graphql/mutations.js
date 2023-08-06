/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTrip = /* GraphQL */ `
  mutation CreateTrip(
    $input: CreateTripInput!
    $condition: ModelTripConditionInput
  ) {
    createTrip(input: $input, condition: $condition) {
      id
      name
      description
      owner
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
export const updateTrip = /* GraphQL */ `
  mutation UpdateTrip(
    $input: UpdateTripInput!
    $condition: ModelTripConditionInput
  ) {
    updateTrip(input: $input, condition: $condition) {
      id
      name
      description
      owner
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
export const deleteTrip = /* GraphQL */ `
  mutation DeleteTrip(
    $input: DeleteTripInput!
    $condition: ModelTripConditionInput
  ) {
    deleteTrip(input: $input, condition: $condition) {
      id
      name
      description
      owner
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
export const createDestination = /* GraphQL */ `
  mutation CreateDestination(
    $input: CreateDestinationInput!
    $condition: ModelDestinationConditionInput
  ) {
    createDestination(input: $input, condition: $condition) {
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
export const updateDestination = /* GraphQL */ `
  mutation UpdateDestination(
    $input: UpdateDestinationInput!
    $condition: ModelDestinationConditionInput
  ) {
    updateDestination(input: $input, condition: $condition) {
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
export const deleteDestination = /* GraphQL */ `
  mutation DeleteDestination(
    $input: DeleteDestinationInput!
    $condition: ModelDestinationConditionInput
  ) {
    deleteDestination(input: $input, condition: $condition) {
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
