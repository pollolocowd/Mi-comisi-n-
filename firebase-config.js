const firebaseConfig = {
  apiKey: "AIzaSyAfokPF39lK8KLmli2isWseQxDT9yWQbAg",
  authDomain: "mi-banca-fcf37.firebaseapp.com",
  databaseURL: "https://mi-banca-fcf37-default-rtdb.firebaseio.com",
  projectId: "mi-banca-fcf37",
  storageBucket: "mi-banca-fcf37.appspot.com",
  messagingSenderId: "881335101774",
  appId: "1:881335101774:web:c496e479c988cf6cd6561f"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();