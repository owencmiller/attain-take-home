import { View, Text, Image, StyleSheet, Platform, FlatList } from 'react-native';
import { CartItem, useCart } from '@/context/CartContext';
import commonStyles from '@/styles/commonStyles'
import ItemComponent, { Item } from '@/components/Item';


export default function CartScreen() {
  const { cart, setCart } = useCart();
  
  const getSubtotal = () => {
    return Array.from(cart.values()).reduce((total: number, cartItem: CartItem): number => {
      const price = cartItem.discounted_price 
        ? parseFloat(cartItem.discounted_price) 
        : parseFloat(cartItem.price);
      return total + price * cartItem.quantity;
    }, 0);
  };

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
      <Text style={commonStyles.title}>Your Cart</Text>
      <Text style={styles.subtotal}>Subtotal: ${getSubtotal()}</Text>
    </View>
    <View style={styles.itemContainer}>
        <FlatList
          data={Array.from(cart.values())}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
        />
    </View>
   </View> 
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  subtotal: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'DongleReg'
  },
  listContent: {
    backgroundColor: '#BDDADF',
  },
  itemContainer: {
    flex: 1,
    margin: 20,
  },
});
