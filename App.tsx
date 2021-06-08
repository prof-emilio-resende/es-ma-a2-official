import React, { useState } from "react";
import {
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import uploadToAnonymousFilesAsync from "anonymous-files";

import img from "./assets/icon.png";

interface LocalImage {
    localUri: string;
    remoteUri?: string;
}

export default function App() {
    const [selectedImage, setSelectedImage] = useState<LocalImage | null>(null);

    const openImagePickerAsync = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("no permissions to open gallery!");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) return;

        const imageObj = { localUri: pickerResult.uri } as LocalImage;

        if (Platform.OS === "web") {
            const remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
            console.log(remoteUri);
            imageObj.remoteUri = remoteUri;
        }

        setSelectedImage(imageObj);
    };

    const openShareDialogAsync = async () => {
        if (!(await Sharing.isAvailableAsync()) || selectedImage === null) {
            alert(`Sharing not available...your image is here: ${selectedImage?.remoteUri}`);
            return;
        }

        await Sharing.shareAsync(selectedImage.remoteUri ?? selectedImage.localUri);
    };

    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text>Hey, select one image!</Text>
            </View>
            {selectedImage === null && (
                <Image source={img} style={styles.image} resizeMode="contain" />
            )}
            {selectedImage !== null && (
                <Image
                    source={{
                        uri: selectedImage.localUri,
                    }}
                    style={styles.image}
                    resizeMode="contain"
                />
            )}

            <View style={styles.actions}>
                <TouchableOpacity
                    onPress={openImagePickerAsync}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Clique aqui!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={openShareDialogAsync}
                    style={[styles.button, styles.buttonShare]}
                >
                    <Ionicons
                        name="share-outline"
                        size={16}
                        style={styles.buttonText}
                    />
                    <Text style={styles.buttonText}>Compartilhar</Text>
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
        width: 300,
        height: 300,
    },
    actions: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: Dimensions.get("screen").width,
    },
    button: {
        borderWidth: 1,
        borderColor: "#cccccc",
        padding: 10,
        ...Platform.select({
            ios: {
                borderRadius: 25,
                backgroundColor: "#cccccc",
            },
            android: {
                borderRadius: 5,
                backgroundColor: "#00aaff",
            },
        }),
    },
    buttonShare: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        ...Platform.select({
            ios: {
                color: "#000",
            },
            android: {
                color: "#fff",
            },
        }),
    },
});
