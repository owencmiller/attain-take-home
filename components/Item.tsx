// Item.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Define the props for the Item component
interface ItemProps {
  item: {
    id: number;
    name: string;
    image: string;
    price: string;
    supplier: string;
    discounted_price: string;
    // Include other properties from your item object as needed
  };
  onPress?: () => void;
}

export default function Item({item, onPress}:ItemProps) {
    let onSale = item.discounted_price != "" 
    return (
        <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          {onSale ? <Text style={styles.sale}>sale</Text> : null}

          <View style={styles.textContainer}>
            <Text style={styles.supplier}>{item.supplier}</Text>
            <Text style={styles.itemName}>{item.name}</Text>
            {onSale ?
                <Text>
                    <Text style={styles.price}>${item.price} </Text>
                    <Text style={styles.discount}>${item.discounted_price}</Text>
                </Text>
                :
                <Text style={styles.price}>${item.price}</Text>}
          </View>
        </TouchableOpacity>
      ); 
}

// Styles specific to the Item component
const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 25,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    fontFamily: "DongleBold"
  },
  textContainer: {
    width: '100%',
    padding: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  itemName: {
    color: "#4F899B",
  },
  supplier: {
    color: "#8ABDD2",
    textDecorationLine: 'underline'
  }, 
  price: {
    color: "mediumseagreen"
  },
  sale: {
    backgroundColor: 'mediumseagreen',
    color: 'white',
    borderRadius: 10,
    width: 40,
    textAlign: 'center',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  discount: {
    color: "red",
    textDecorationLine: "line-through"
  }
});
