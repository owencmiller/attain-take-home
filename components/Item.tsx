import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

export interface Item {
  id: number;
  name: string;
  image: string;
  price: string;
  supplier: string;
  discounted_price: string;
  unit_size: string;
}

interface ItemProps {
  item: Item;
  quantity: number;
  onAddToCart: (item: Item, quantity: number) => void;
}

interface ItemImageContainerProps {
  item: Item;
  quantity: number;
  onSale: boolean;
}

const ItemImageContainer = ({item, quantity, onSale} : ItemImageContainerProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <View>
      <Image
        source={
          imageError
            ? require('@/assets/images/icons8-no-image-50.png')
            : { uri: item.image }
        }
        onError={() => setImageError(true)}
        style={styles.itemImage}
      />
      {onSale && <Text style={styles.sale}>sale</Text>}
      
      {quantity == 0
        ? <View style={styles.quantityIndicatorLight}>
            <IconSymbol size={20} name="plus" color={'white'} /> 
          </View>
        : <View style={styles.quantityIndicatorDark}>
            <Text style={styles.quantityIndicatorText}>{quantity}</Text>
          </View>}
      
    </View>
  );
};

interface ItemModalProps {
  item: Item;
  onSale: boolean;
  tempQuantity: number;
  setTempQuantity: React.Dispatch<React.SetStateAction<number>>;
  handleAddToCart: () => void;
}

const ItemModal = ({item, onSale, tempQuantity, setTempQuantity, handleAddToCart,} : ItemModalProps) => (
  <><View style={styles.modalItem}>
    <Image source={{ uri: item.image }} style={styles.modalImage} />
    <View style={styles.modalText}>
      <Text style={styles.modalTitle}>{item.name}</Text>
      <View style={styles.modalItemInfo}>
        <Text>Unit Size</Text>
        <Text>{item.unit_size}</Text>
      </View>
      <View style={styles.modalItemInfo}>
        <Text>Price</Text>
        {onSale ? (
              <View style={styles.modalPrice}>
                <Text style={styles.discountedPrice}>${item.discounted_price} </Text>
                <Text style={styles.originalPrice}>${item.price}</Text>
              </View>
            ) : (
              <Text style={styles.price}>${item.price}</Text>)}
      </View>
    </View>
    </View>
    <View style={styles.quantityContainer}>
      <Text style={styles.quantityText}>Quantity</Text>
      <View style={styles.quantityChanger}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setTempQuantity(Math.max(0, tempQuantity - 1))}
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
    </View>
    
    <Pressable style={styles.addToCart} onPress={handleAddToCart}>
      <Text>Add to Cart</Text>
    </Pressable>
  
  </>
);

const ItemComponent = ({ item, quantity, onAddToCart } : ItemProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(quantity);
  const onSale = item.discounted_price !== '';

  const handleAddToCart = () => {
    onAddToCart(item, tempQuantity);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => setModalVisible(true)}
      >
        <ItemImageContainer item={item} quantity={quantity} onSale={onSale} />
        <View style={styles.textContainer}>
          <Text style={styles.supplier}>{item.supplier}</Text>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.priceContainer}>
            {onSale ? (
              <>
                <Text style={styles.discountedPrice}>${item.discounted_price} </Text>
                <Text style={styles.originalPrice}>${item.price}</Text>
              </>
            ) : (
              <Text style={styles.price}>${item.price}</Text>
            )}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <KeyboardAvoidingView style={styles.modalContent}>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}>
                    <IconSymbol size={28} name="xmark" color={'#336A81'} />
                </TouchableOpacity>

                <ItemModal
                  item={item}
                  onSale={onSale}
                  tempQuantity={tempQuantity}
                  setTempQuantity={setTempQuantity}
                  handleAddToCart={handleAddToCart}
                />
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default ItemComponent;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "DongleBold"
  },
  textContainer: {
    width: '100%',
    padding: 5,

  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemName: {
    color: "#4F899B",
    fontFamily: "DongleBold",
    fontSize: 23,
    lineHeight: 13,
    paddingTop: 15
  },
  supplier: {
    color: "#8ABDD2",
    textDecorationLine: 'underline'
  }, 
  priceContainer: {
    fontSize: 15,
  },
  price: {
    color: '#62bfdb',
  },
  originalPrice: {
    color: "red",
    textDecorationLine: "line-through",
  },
  discountedPrice: {
    color: "mediumseagreen",
  },
  sale: {
    backgroundColor: 'mediumseagreen',
    color: 'white',
    borderRadius: 10,
    width: 40,
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    left: -10,
  },
  quantityIndicatorLight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 25,
    height: 25,
    backgroundColor: '#61A5C2',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityIndicatorDark: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 25,
    height: 25,
    backgroundColor: '#336A81',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityIndicatorText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'DongleBold',
    position: 'absolute',
    top: -7,
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
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: "DongleBold",
  },
  modalItem: {
    flexDirection: "row",
  },
  modalItemInfo: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalText: {
    width: "70%",
    marginTop: 10,
  },
  modalImage: {
    width: '30%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  modalPrice: {
    flexDirection: 'row'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    fontFamily: 'DongleBold'
  },
  quantityChanger: {
    flexDirection: 'row',
    alignItems: 'center'
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
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'DongleBold'
  },
  addToCart: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    marginBottom: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
});
