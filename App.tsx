import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import MenuScreen from './screens/MenuScreen';
import AddDishScreen from './screens/AddDishScreen';


type Dish = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
};


const Stack = createStackNavigator();

const App: React.FC = () => {
  
  const [menu, setMenu] = useState<Dish[]>([]); 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Menu">
          {props => <MenuScreen {...props} menu={menu} setMenu={setMenu} />}
        </Stack.Screen>
        <Stack.Screen name="AddDish">
          {props => <AddDishScreen {...props} route={{ params: { menu, setMenu } }} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;