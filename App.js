import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/navigation/Navigation";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

axios.defaults.baseURL = process.env.BASE_URL

export default function App() {
  return (
    <NavigationContainer>
        <StatusBar style="light"/>
        <Navigation/>
    </NavigationContainer>
  );
}

