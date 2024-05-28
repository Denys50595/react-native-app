import {action, observable} from 'mobx';

interface Order {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

class OrderStore {
  @observable accessor orders: Order[] = [];

  constructor() {}

  @action addOrder(item: Omit<Order, 'quantity'>) {
    const existingOrder = this.orders.find(order => order.id === item.id);
    if (existingOrder) {
      existingOrder.quantity += 1;
    } else {
      this.orders.push({...item, quantity: 1});
      console.log('addOrder', this.orders);
    }
  }

  @action removeOrder(itemId: string) {
    const orderIndex = this.orders.findIndex(
      (order: Order) => order.id === itemId,
    );
    if (orderIndex !== -1) {
      if (this.orders[orderIndex].quantity > 1) {
        this.orders[orderIndex].quantity -= 1;
      } else {
        this.orders.splice(orderIndex, 1);
      }
    }
  }

  @action clearOrders() {
    this.orders = [];
    console.log(this.orders);
  }

  get orderCount() {
    return this.orders.reduce((count, order) => count + order.quantity, 0);
  }

  get totalAmount() {
    return this.orders.reduce(
      (total, order) => total + order.quantity * order.price,
      0,
    );
  }
}

const store = new OrderStore();
export default store;
