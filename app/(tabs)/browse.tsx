// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import Item from '@/components/Item'; // Import the Item component



export default function BrowseScreen() {
  // State variables to hold data and search text
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
        setItems(data); // Set the original items
        setFilteredItems(data); // Set the filtered items to display
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  // Function to handle search input and filter items
  const handleSearch = (text : string) => {
    setSearchText(text);
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  // Render each item in the grid
  const renderItem = ({ item }) => (
    <Item 
      item={item}
      onPress={() => {console.log(item.name)}}
      />
  );

  return (
    <View style={styles.container}>
      {/* Header with title and search bar */}
      <View style={styles.header}>
        <Text style={styles.title}>Browse Items</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by name"
          value={searchText}
          onChangeText={handleSearch}
        />
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
    backgroundColor: '#336A81', 
  },
  header: {
    padding: 20,
    backgroundColor: '#336A81',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  searchBar: {
    marginTop: 10,
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
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