import { db } from './firebaseConfig';

function addOrder(order) {
  db.collection('orders').add(order)
    .then((docRef) => {
      console.log("Order added with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding order: ", error);
    });
}

// Ejemplo de uso:
const order = {
  userId: "user123",
  items: [
    { name: "Lomo Saltado", quantity: 2 },
    { name: "Aji de Gallina", quantity: 1 }
  ],
  total: 12000,
  status: "pending",
  createdAt: firebase.firestore.FieldValue.serverTimestamp()
};

addOrder(order);
