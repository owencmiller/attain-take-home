# Attain Take-Home Expo App

This is a MVP app for Attain which replicates an order book. It includes a "Browse" tab where the user can 
select an item, specify a quantity, and add it to their cart. The cart data is stored via the CartContext
which is keyed by item id.

This started from the create-expo-app with a focus on development speed and visual replication of assignment.

## Get started

1. Install dependencies

   ```bash
   npm install 
   ```

2. Start the app

   ```bash
    npx expo start
   ```
3. Launch iOS Simulator via expo
   ```bash
   › Press i │ open iOS simulator
   i
   ```

## TODO:
Since a goal of this project was development speed, there are still a few things to implement for completeness:
- Account for bad data from API
- Cart View
- SubTotal & Checkout