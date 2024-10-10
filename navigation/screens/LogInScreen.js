import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IP_Auth } from "../../components/const";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonEdit from "../../components/button";
import Logo from "../../assets/logo_activeEats.png";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const IP = IP_Auth;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const checkIfUserLoggedIn = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        console.log("userToken", userToken);
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de la connexion de l'utilisateur :",
          error
        );
      } finally {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }).start();
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
      }
    };
  
    checkIfUserLoggedIn();
  }, []);


  const handleLogin = async () => {
    try {

      // TEMPORAIRE
      navigation.navigate("MainTabs");

    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage(error.message);
    }
  };

  // Fonction pour naviguer vers la page SignUpScreen
  const goToSignUpScreen = () => {
    navigation.navigate("SignUp");
  };

  if (isLoading) {
    return (
      <View style={styles.containerloading}>
        <Animated.Image
          source={Logo}
          style={[styles.logo, { opacity: fadeAnim }]}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <View style={styles.sendButtonContainer}>
        <ButtonEdit
          style={styles.sendButton}
          theme="primary-full"
          label="Se connecter"
          onPress={handleLogin}
        />
      </View>
      <View style={styles.sendButtonContainer}>
        <ButtonEdit
          style={styles.sendButton}
          theme="primary-border"
          label="Créer un compte"
          onPress={goToSignUpScreen}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "white"
  },
  containerloading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  logo: {
    width: 200,
    height: 200,
    marginRight: 20,
  },
  input: {
    height: 50,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  sendButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});

export default LogInScreen;
