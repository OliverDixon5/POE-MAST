import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, Button, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../theme'; 

const WelcomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Tailored Taste</Text>
      <Text style={styles.subtitle}>Crafted Cuisine, Personalized to Perfection</Text>
      <View style={styles.buttonContainer}>
        <Button title="Welcome" onPress={() => navigation.navigate('Menu')} color={COLORS.accent} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.tan,
  },
  title: {
    fontSize: 32,
    fontFamily: FONTS.heading,
    color: COLORS.white,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: FONTS.main,
    color: COLORS.grey,
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: COLORS.accent,
    padding: 1,
    borderRadius: 5,
  },
});
export default WelcomeScreen;
