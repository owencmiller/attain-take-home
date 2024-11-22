# Attain Take-Home Expo App

This is a MVP app for Attain which replicates an order book. It includes a "Browse" tab where the user can 
select an item, specify a quantity, and add it to their cart. The cart data is stored via the CartContext 
and viewable in the "Cart" tab along with a calculated subtotal.

This started from the create-expo-app with a focus on development speed and visual replication of assignment. 

Tested only with iOS and Android Simulators on Intel Macbook Pro macOS 15.1.1.

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

   i
   ```

## TODO:
Since a goal of this project was development speed, there are still a few things to implement for completeness:
- Account for messier data, should the items only show when all data is present?
- Add cost breakdown for subtotal
- Checkout button?
- Some cleanup styles - move more styles into commonStyles.tsx and Colors.ts

## Screenshots

<img src="https://github.com/user-attachments/assets/4fefaaf2-784c-497b-9a26-98e92c6d3aa8" width="200" />
<img src="https://github.com/user-attachments/assets/794adcad-13ee-4928-af10-8afed39108ee" width="200" />
<img src="https://github.com/user-attachments/assets/ee177d46-a9ff-4d19-9076-994ade9e4f3f" width="200" />
