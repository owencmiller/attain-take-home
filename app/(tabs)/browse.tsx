// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import Item, {ItemProps} from '@/components/Item'; // Import the Item component
import { useCart } from '@/context/CartContext';
import commonStyles from '@/styles/commonStyles'


export default function BrowseScreen() {
  // State variables to hold data and search text
  const {cart, setCart} = useCart();
  const [items, setItems] = useState([]); // Original list of items
  const [filteredItems, setFilteredItems] = useState([]); // Filtered list based on search
  const [searchText, setSearchText] = useState(''); // Text entered in the search bar

  // Replace 'YOUR_API_URL_HERE' with your actual API endpoint
  const API_URL = 'https://retoolapi.dev/f0ee0v/items';

  // Fetch items from the API when the component mounts
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setItems(data.filter((item:ItemProps) => item.name !== null)); // Set the original items
        setFilteredItems(data); // Set the filtered items to display
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  
  const handleAddToCart = (item:ItemProps, quantity:number) => {
    setCart(prevCart => {    
      if (quantity === 0) {
        const { [item.id]: _, ...rest } = prevCart;
        return rest;
      }
  
      return {
        ...prevCart,
        [item.id]: quantity,
      };});
    console.log('Cart:', cart);
  };


  const handleSearch = (text : string) => {
    setSearchText(text);
    const filtered = items.filter((item:ItemProps) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const renderItem = ({item}) => (
    <Item 
      item={item}
      onAddToCart={handleAddToCart}
      quantity={cart[item.id]}
      />
  );

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.header}>
        <Text style={commonStyles.title}>Order Book</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#000" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Items"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>

      </View>

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
  },
  listContent: {
    backgroundColor: '#BDDADF',
  },
  itemContainer: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
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