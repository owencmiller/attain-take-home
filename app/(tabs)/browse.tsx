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



export default function BrowseScreen() {
  // State variables to hold data and search text
  const [cart, setCart] = useState([])
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
    setCart((prevCart) => [...prevCart, { ...item, quantity }]);
    console.log('Cart:', cart);
  };


  // Function to handle search input and filter items
  const handleSearch = (text : string) => {
    setSearchText(text);
    const filtered = items.filter((item:ItemProps) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  // Render each item in the grid
  const renderItem = ({ item }) => (
    <Item 
      item={item}
      onAddToCart={handleAddToCart}
      quantity={cart.find(cartItem => cartItem.id == item.id)?.quantity}
      />
  );

  return (
    <View style={styles.container}>
      {/* Header with title and search bar */}
      <View style={styles.header}>
        <Text style={styles.title}>Order Book</Text>
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

      {/* Scrollable grid of items */}
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Display items in two columns
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDDADF', 
  },
  header: {
    padding: 20,
    paddingTop: 70,
    backgroundColor: '#336A81',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
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