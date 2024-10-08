import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Animated, ScrollView, TouchableOpacity } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import { COLORS, FONTS } from '../theme';

type Dish = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
};

type MenuScreenProps = {
  navigation: any; 
  menu: Dish[];
  setMenu: Dispatch<SetStateAction<Dish[]>>;
};

const MenuScreen: React.FC<MenuScreenProps> = ({ navigation, menu, setMenu }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  
  useEffect(() => {
    const defaultDishes: Dish[] = [
      { id: '1', name: 'Caesar Salad', description: 'Fresh romaine lettuce with Caesar dressing', course: 'Starter', price: 75 },
      { id: '2', name: 'Grilled Chicken', description: 'Marinated chicken breast grilled to perfection', course: 'Main Course', price: 150 },
      { id: '3', name: 'Chocolate Cake', description: 'Rich chocolate cake with icing', course: 'Dessert', price: 50 },
    ];

    
    if (menu.length === 0) {
      setMenu(defaultDishes);
    }
  }, [menu.length, setMenu]);

  const getAveragePrice = (course: string) => {
    const dishesInCourse = menu.filter(dish => dish.course === course);
    const totalPrice = dishesInCourse.reduce((sum, dish) => sum + dish.price, 0);
    return dishesInCourse.length > 0 ? (totalPrice / dishesInCourse.length).toFixed(2) : 0;
  };
  const [addedToCartId, setAddedToCartId] = useState<string | null>(null);
  const renderDish = ({ item }: { item: Dish }) => (
    <Animated.View style={[styles.dishItem, { opacity: fadeAnim }]}>
      <Text style={styles.dishName}>{item.name} - R{item.price}</Text>
      <Text style={styles.dishDescription}>{item.description}</Text>
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => {
            setAddedToCartId(item.id);
            setTimeout(() => setAddedToCartId(null), 2000);
        }}
      >
        <Text style={styles.orderButtonText}>Order</Text>
      </TouchableOpacity>
      {addedToCartId === item.id && <Text style={styles.addedToCartText}>{item.name} added to cart</Text>}
    </Animated.View>
  );

  const renderCategory = (course: string) => (
    <View>
      <Text style={styles.courseHeader}>{course}</Text>
      <FlatList
        data={menu.filter(dish => dish.course === course)}
        keyExtractor={(item) => item.id}
        renderItem={renderDish}
        scrollEnabled={false} 
      />
      <Text style={styles.averagePriceText}>Average Price: R{getAveragePrice(course)}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Our Menu</Text>
      
      {menu.length === 0 ? (
        <Text style={styles.noDishesText}>No dishes available. Please add some!</Text>
      ) : (
        <>
          {renderCategory('Starter')}
          {renderCategory('Main Course')}
          {renderCategory('Dessert')}
          
          <Text style={styles.subHeader}>Dishes Available: {menu.length}</Text>
        </>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Add a Dish"
          onPress={() => navigation.navigate('AddDish', { menu, setMenu })}
          color={COLORS.accent}
        />
      </View>
    </ScrollView>
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
  courseHeader: {
    fontSize: 24,
    fontFamily: FONTS.heading,
    color: COLORS.accent,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  dishItem: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    marginVertical: 5,
    borderRadius: 5,
    borderColor: COLORS.darkTan,
    borderWidth: 1,
  },
  dishName: {
    fontSize: 18,
    color: COLORS.black,
  },
  dishDescription: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.7)', 
  },
  orderButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    alignSelf: 'flex-start', 
  },
  orderButtonText: {
    color: 'white',
    fontSize: 14,
  },
  addedToCartText: {
    fontSize: 14,
    color: COLORS.black,
    marginTop: 5,
  },
  averagePriceText: {
    fontSize: 16,
    color: COLORS.darkTan,
    marginTop: 10,
    fontStyle: 'italic',
  },
  noDishesText: {
    fontSize: 18,
    color: COLORS.red,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontFamily: FONTS.main,
    color: COLORS.darkTan,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: COLORS.accent,
    padding: 10,
    borderRadius: 5,
  },
});

export default MenuScreen;
