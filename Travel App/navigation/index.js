import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../src/screens/Home";
import Welcome from "../src/screens/Welcome";

const Stack = createNativeStackNavigator();

function Navigation(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Welcome" component={Welcome} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
