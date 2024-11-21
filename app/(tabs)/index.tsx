import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { useCart } from '@/context/CartContext';
import commonStyles from '@/styles/commonStyles'

export default function HomeScreen() {
  const { cart } = useCart();
  return (
   <View style={commonStyles.container}>
    <View style={commonStyles.header}>
      <Text style={commonStyles.title}>Welcome!</Text>
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
});
