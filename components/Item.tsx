// Item.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';

export interface ItemProps {
  id: number;
  name: string;
  image: string;
  price: string;
  discounted_price: string;
}

interface Props {
  item: ItemProps;
  quantity: number;
  onAddToCart: (item: ItemProps, quantity: number) => void;
}

export default function Item({item, quantity, onAddToCart}:Props) {
    let onSale = item.discounted_price != "" 

    const [modalVisible, setModalVisible] = useState(false);
    const [tempQuantity, setTempQuantity] = useState(0);
  
    const handleAddToCart = () => {
      onAddToCart(item, tempQuantity);
      setModalVisible(false);
    };

    return (
      <>
        <TouchableOpacity style={styles.itemContainer} onPress={() => setModalVisible(true)}>
          <Image source={{ uri: item.image }} style={styles.itemImage}/>
          {onSale ? <Text style={styles.sale}>sale</Text> : null}
          {quantity == null ? <Text style={styles.plusButton}>+</Text> : <Text style={styles.plusButton}>{quantity}</Text>}
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)} // Handles back button on Android
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <KeyboardAvoidingView
                  style={styles.modalContent}
                >
                  <Text style={styles.modalTitle}>{item.name}</Text>
                  <Image source={{ uri: item.image }} style={styles.modalImage} />
                  <Text style={styles.modalPrice}>Price: ${item.price}</Text>

                  {/* Quantity Adjustor */}
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => setTempQuantity(Math.max(1, tempQuantity - 1))}
                    >
                      <Text>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{tempQuantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => setTempQuantity(tempQuantity + 1)}
                    >
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Add to Cart Button */}
                  <Button title="Add to Cart" onPress={handleAddToCart} />
                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        </>
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
  },
  plusButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 30,
    height: 30,
    backgroundColor: '#336A81',
    color: 'white',
    fontSize: 24,
    borderRadius: 15,
    textAlign: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 16,
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
    borderRadius: 15,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
