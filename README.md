Tailored Taste Mobile Application
Overview
Tailored Taste is a React Native mobile application designed for users to manage a culinary menu. The application enables users to view dishes categorized into starters, main courses, and desserts, add new dishes to the menu, and place orders. This README outlines the structure, functionality, and key features of the application.

Features
Dynamic Menu Display: The application presents a categorized menu, showcasing dishes under different courses: Starters, Main Courses, and Desserts.
Add Dish Functionality: Users can add new dishes to the menu by providing details such as name, description, price, and course type.
Order Placement: Users can place orders for specific dishes. A confirmation message is displayed for the selected dish when the "Order" button is clicked.
Animated Transitions: The app includes smooth animations to enhance the user experience when navigating between screens and displaying menu items.
Average Price Calculation: The average price of dishes in each category is calculated and displayed dynamically.
Code Structure
Screens: The application consists of various screens:

MenuScreen: Displays the categorized menu and allows users to place orders and navigate to the Add Dish screen.
AddDishScreen: Provides a form for users to input details of new dishes to be added to the menu.
Components:

Dish: Represents individual dishes in the menu, including attributes such as name, description, price, and course type.
Types: TypeScript is used for type definitions to ensure type safety across the application. This includes defining the Dish type and navigation props.

Styling: The application employs a consistent theme using color and font styles defined in a separate theme file, promoting a cohesive look and feel.

-Part 3- Added Remove button
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

The FlatList component is responsible for displaying all the dishes in the menu array.
For each dish, it shows the dish name, price, and course type.
Each dish also has a "Remove" button that calls the removeDish function, passing the id of the item to be removed.
This setup ensures that all the dishes are displayed properly, and allows the user to remove any dish they no longer want.
