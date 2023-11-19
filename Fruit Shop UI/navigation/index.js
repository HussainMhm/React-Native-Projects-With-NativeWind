import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../screens/Cart";
import Product from "../screens/Product";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

function Navigation(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
                <Stack.Screen name="Product" options={{ headerShown: false }} component={Product} />
                <Stack.Screen name="Cart" options={{ headerShown: false }} component={Cart} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
