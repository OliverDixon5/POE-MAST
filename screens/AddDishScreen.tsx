import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dish } from '../types';
import { COLORS, FONTS } from '../theme';

type AddDishScreenProps = {
  navigation: any;
  route: {
    params: {
      menu: Dish[];
      setMenu: React.Dispatch<React.SetStateAction<Dish[]>>;
    };
  };
};

const AddDishScreen: React.FC<AddDishScreenProps> = ({ navigation, route }) => {
  const { menu, setMenu } = route.params;

  const [newDishName, setNewDishName] = useState('');
  const [newDishDescription, setNewDishDescription] = useState('');
  const [newDishPrice, setNewDishPrice] = useState('');
  const [newDishCourse, setNewDishCourse] = useState('Starter');
  const [openCourseDropdown, setOpenCourseDropdown] = useState(false);
  const [courseOptions, setCourseOptions] = useState([
    { label: 'Starter', value: 'Starter' },
    { label: 'Main Course', value: 'Main Course' },
    { label: 'Dessert', value: 'Dessert' },
  ]);

  const addDish = () => {
    const nameIsValid = /^[A-Za-z\s]+$/.test(newDishName);
    const descriptionIsValid = /^[A-Za-z\s]+$/.test(newDishDescription);
    const priceIsValid = /^\d+(\.\d{1,2})?$/.test(newDishPrice);
    const priceValue = parseFloat(newDishPrice);

    if (!nameIsValid || !descriptionIsValid || !priceIsValid || priceValue <= 0) {
      Alert.alert('Invalid Input', 'Please ensure all fields are filled correctly.');
      return;
    }

    const newDish: Dish = {
      id: `${Date.now()}`,
      name: newDishName,
      description: newDishDescription,
      course: newDishCourse,
      price: priceValue,
    };

    setMenu([...menu, newDish]);
    setNewDishName('');
    setNewDishDescription('');
    setNewDishPrice('');
    Alert.alert('Success', 'Dish added to the menu.');
  };

  const removeDish = (id: string) => {
    setMenu(menu.filter(dish => dish.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Menu</Text>

      <TextInput
        placeholder="Dish Name"
        value={newDishName}
        onChangeText={setNewDishName}
        style={styles.input}
      />
      <TextInput
        placeholder="Dish Description"
        value={newDishDescription}
        onChangeText={setNewDishDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={newDishPrice}
        onChangeText={setNewDishPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <DropDownPicker
        open={openCourseDropdown}
        value={newDishCourse}
        items={courseOptions}
        setOpen={setOpenCourseDropdown}
        setValue={setNewDishCourse}
        containerStyle={{ height: 40 }}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
      <TouchableOpacity style={styles.addButton} onPress={addDish}>
        <Text style={styles.addButtonText}>Add Dish</Text>
      </TouchableOpacity>

      <Text style={styles.subHeader}>Current Menu</Text>
      <FlatList
        data={menu}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.dishItem}>
            <Text style={styles.dishText}>
              {item.name} - R{item.price.toFixed(2)} ({item.course})
            </Text>
            <TouchableOpacity
              onPress={() => removeDish(item.id)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.navigate('Menu')}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: COLORS.tan,
  },
  header: {
    fontSize: 28,
    fontFamily: FONTS.heading,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: COLORS.grey,
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  dropdown: {
    backgroundColor: 'white',
    borderColor: COLORS.grey,
  },
  dropdownContainer: {
    backgroundColor: COLORS.white,
  },
  addButton: {
    backgroundColor: COLORS.accent,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 20,
    fontFamily: FONTS.main,
    color: COLORS.darkTan,
    marginVertical: 10,
  },
  dishItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginVertical: 5,
  },
  dishText: {
    fontSize: 16,
    color: COLORS.black,
  },
  removeButton: {
    backgroundColor: COLORS.tan,
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: COLORS.accent,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default AddDishScreen;
