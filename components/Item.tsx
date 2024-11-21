// Item.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Define the props for the Item component
interface ItemProps {
  item: {
    id: number;
    name: string;
    image: string;
    // Include other properties from your item object as needed
  };
  onPress?: () => void;
}

export default function Item({item, onPress}:ItemProps) {
    return (
        <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <Text style={styles.itemName}>{item.name}</Text>
        </TouchableOpacity>
      ); 
}

// Styles specific to the Item component
const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  itemName: {
    marginTop: 10,
    textAlign: 'center',
  },
});
