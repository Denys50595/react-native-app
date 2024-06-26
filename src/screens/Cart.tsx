import React, {useCallback} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import OrderStore from '../store/OrderStore';
import {observer} from 'mobx-react';

const Cart = observer(() => {
  const {orders, totalAmount} = OrderStore;

  const handleAdd = useCallback((order: any) => {
    OrderStore.removeOrder(order);
  }, []);

  const handleRemove = useCallback((id: string) => {
    OrderStore.removeOrder(id);
  }, []);

  const handleClear = useCallback(() => {
    OrderStore.clearOrders();
  }, []);

  return (
    <>
      <View>
        {orders.map((order: any) => (
          <View style={style.cartItem} key={order.id}>
            <Text>{order.title}</Text>
            <Text>
              x{order.quantity} - ${order.price * order.quantity}
            </Text>
            <Button title="Add" onPress={() => handleAdd(order)} />
            <Button title="Remove" onPress={() => handleRemove(order.id)} />
          </View>
        ))}
        <Text style={{textAlign: 'center'}}>Total: ${totalAmount}</Text>
      </View>
      <Button
        title="Confirm Order"
        onPress={() => {
          Alert.alert(
            'Order Confirmed',
            `Your order for $${totalAmount} has been placed.`,
            [
              {
                text: 'Cancel',
                onPress: () => console.warn('Cancel'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => handleClear()},
            ],
          );
        }}
      />
    </>
  );
});

export const style = StyleSheet.create({
  cartItem: {
    backgroundColor: '#FFF',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default Cart;
