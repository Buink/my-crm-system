import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBSG9ZyemV3MhGQdM5ZzLwy6Cc8f7LouL0",
    authDomain: "vue-crm-dade9.firebaseapp.com",
    projectId: "vue-crm-dade9",
    storageBucket: "vue-crm-dade9.appspot.com",
    messagingSenderId: "494709417581",
    appId: "1:494709417581:web:710281aa1cf7370b500164",
    measurementId: "G-CQ49GJZFFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default {
    app, analytics
}