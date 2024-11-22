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
import ItemComponent, {Item} from '@/components/Item';
import { useCart } from '@/context/CartContext';
import commonStyles from '@/styles/commonStyles'


export default function BrowseScreen() {
  const {cart, setCart} = useCart();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState('');

  const API_URL = 'https://retoolapi.dev/f0ee0v/items';

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setItems(data.filter((item:Item) => item.name !== null));
        setFilteredItems(data);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  
  const handleAddToCart = (item:Item, quantity:number) => {
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
    const filtered = items.filter((item:Item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const renderItem = ({item}) => (
    <ItemComponent 
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

      <View style={styles.itemContainer}>
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
        />
      </View>
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
    marginBottom: 80
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