import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import img from "./assets/icon.png";

export default function App() {
    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text>
                    Hey, select one image!
                </Text>
            </View>
            <Image source={img} style={styles.image} resizeMode="contain" />
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => alert("vai!")} style={styles.button}>
                    <Text style={styles.buttonText}>Clique aqui!</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
    },
    image: {
        flex: 1,
    },
    actions: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
      borderWidth: 1,
      borderColor: "#cccccc",
      padding: 10,
      ...Platform.select({
        ios: {
          borderRadius: 25,
          backgroundColor: '#cccccc',
        },
        android: {
          borderRadius: 5,
          backgroundColor: '#00aaff',
        },
      })
    },
    buttonText: {    
      ...Platform.select({
        ios: {
          color: '#000',
        },
        android: {
          color: '#fff',
        },
      })
    },
});
