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
import { IconSymbol } from '@/components/ui/IconSymbol';


export default function BrowseScreen() {
  const {cart, setCart} = useCart();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [apiError, setApiError] = useState(false);

  const API_URL = 'https://retoolapi.dev/f0ee0v/items';

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        // We won't show items if we don't have a name for them
        setItems(data.filter((item:Item) => item.name !== null && item.price !== null));
        setFilteredItems(data);
      })
      .catch((error) => {
        setApiError(true);
        console.error('Error fetching items:', error);
      });
  }, []);

  
  const handleAddToCart = (item:Item, quantity:number) => {
    setCart(prevCart => {
      const updatedCart = new Map(prevCart);
      if (quantity === 0) {
        updatedCart.delete(item.id);
      } else {
        updatedCart.set(item.id, { ...item, quantity });
      }
      return updatedCart
    });
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
      quantity={cart.has(item.id) ? cart.get(item.id)!.quantity : 0}
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

      {apiError
        ? <View style={styles.errorContainer}>
            <IconSymbol size={70} name="exclamationmark.circle" color={'#336A81'} />
            <Text style={styles.errorText}>
              We had an issue retrieving available items. Please check back later or contact customer support.
            </Text>
          </View>
        : <View style={styles.itemContainer}>
            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.listContent}
            />
          </View>}
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
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    margin: 50
  },
  errorText: {
    textAlign: 'center',
    fontFamily: 'DongleReg',
    fontSize: 40,
    lineHeight: 40,
    marginTop: 20
  }
});