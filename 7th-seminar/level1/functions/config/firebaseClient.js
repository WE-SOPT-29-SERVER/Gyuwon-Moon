const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyDOtnPi_dxNhj4JxPRFk0zDVHLDI1GUf9w",
  authDomain: "wesopt29-server.firebaseapp.com",
  projectId: "wesopt29-server",
  storageBucket: "wesopt29-server.appspot.com",
  messagingSenderId: "776228906949",
  appId: "1:776228906949:web:8854429decafcc58c80dac",
  measurementId: "G-4GF8042YQT"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

module.exports = { firebaseApp, firebaseAuth, firebaseConfig };