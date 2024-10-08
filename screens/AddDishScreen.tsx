import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
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
    // Validation checks
    const nameIsValid = /^[A-Za-z\s]+$/.test(newDishName);
    const descriptionIsValid = /^[A-Za-z\s]+$/.test(newDishDescription);
    const priceIsValid = /^\d+(\.\d{1,2})?$/.test(newDishPrice);
    const priceValue = parseFloat(newDishPrice);

    if (!nameIsValid) {
      Alert.alert('Invalid Input', 'Dish name can only contain letters and spaces.');
      return;
    }
    if (!descriptionIsValid) {
      Alert.alert('Invalid Input', 'Dish description can only contain letters and spaces.');
      return;
    }
    if (!priceIsValid) {
      Alert.alert('Invalid Input', 'Price must be a valid number.');
      return;
    }
    if (priceValue < 0 || priceValue > 1000) {
      Alert.alert('Out of Range', 'Price must be between R0 and R1000.');
      return;
    }
    if (!newDishCourse) {
      Alert.alert('Select Course', 'Please select a course for the dish.');
      return;
    }

    const newDish: Dish = {
      id: (menu.length + 1).toString(),
      name: newDishName,
      description: newDishDescription,
      course: newDishCourse,
      price: priceValue,
    };

    setMenu([...menu, newDish]); 
    navigation.navigate('Menu'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Dish</Text>

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
        placeholder="Select Course"
        dropDownContainerStyle={styles.dropdown}
      />

      <TouchableOpacity style={styles.buttonContainer} onPress={addDish}>
        <Text style={styles.addButtonText}>Add Dish</Text>
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
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0', 
  },
  dropdown: {
    backgroundColor: '#f0f0f0', 
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: COLORS.accent,
    padding: 10, 
    borderRadius: 5,
    alignItems: 'center', 
    marginTop: 20, 
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddDishScreen;
