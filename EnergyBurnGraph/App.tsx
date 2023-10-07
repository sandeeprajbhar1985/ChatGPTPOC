import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

// Simulated data for orders
const orders = [
  { id: 1, type: 'in-person', timestamp: '2023-07-12T10:30:00Z' },
  { id: 2, type: 'in-person', timestamp: '2023-07-12T10:31:00Z' },
  { id: 3, type: 'online', timestamp: '2023-07-12T10:32:00Z' },
  // ... Add more orders here
];

const App = () => {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  // Function to dispatch an order
  const dispatchOrder = () => {
    if (currentOrders.length < 3) {
      const orderToDispatch = orders.shift(); // Retrieve the earliest order
      setCurrentOrders([...currentOrders, orderToDispatch]);
    }
  };

  // Function to complete an order
  const completeOrder = (orderId) => {
    const updatedOrders = currentOrders.filter((order) => order.id !== orderId);
    const completedOrder = currentOrders.find((order) => order.id === orderId);
    setCompletedOrders([...completedOrders, completedOrder]);
    setCurrentOrders(updatedOrders);
  };

  useEffect(() => {
    // Simulate random arrival of customers every few seconds
    const interval = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 5) + 1; // Generate a random number of customers (1-5)
      const newOrders = [];
      for (let i = 0; i < randomNum; i++) {
        if (orders.length > 0) {
          const orderToDispatch = orders.shift(); // Retrieve the earliest order
          newOrders.push(orderToDispatch);
        }
      }
      setCurrentOrders([...currentOrders, ...newOrders]);
    }, 3000); // Change the interval time as desired (in milliseconds)

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentOrders]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Current Orders:</Text>
      {currentOrders.map((order) => (
        <Text key={order.id}>
          Order #{order.id} ({order.type}) - {order.timestamp}
          <Button title="Complete Order" onPress={() => completeOrder(order.id)} />
        </Text>
      ))}
      <Text>Completed Orders:</Text>
      {completedOrders.map((order) => (
        <Text key={order.id}>Order #{order.id} ({order.type}) - {order.timestamp}</Text>
      ))}
      <Button title="Dispatch Order" onPress={dispatchOrder} />
    </View>
  );
};

export default App;
