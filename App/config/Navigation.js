import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Options from "../screens/Options";
import CurrencyList from "../screens/CurrencyList";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

const MainStack = createStackNavigator();
const MainStackScreen = () => {
  <MainStack.Navigator>
    <MainStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <MainStack.Screen name="Options" component={Options} />
  </MainStack.Navigator>;
};

const ModalStack = createStackNavigator();
const ModalStackScreen = () => {
  <ModalStack.Navigator mode="modal">
    <ModalStack.Screen
      name="Main"
      component={MainStackScreen}
      options={{ headerShown: false }}
    />
    <ModalStack.Screen
      name="CurrencyList"
      component={CurrencyList}
      options={({ navigation, route }) => ({
        title: route.params?.title,
        headerLeft: null,
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Entypo
              name="cross"
              size={30}
              color={colors.blue}
              style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
        ),
      })}
    />
  </ModalStack.Navigator>;
};

export default () => {
  <NavigationContainer>
    <ModalStackScreen />
  </NavigationContainer>;
};
