import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";
import Search from "./screens/searchApp";
import ShowResult from "./screens/showApp";

export default function App() {
    const [loggedIn, setLoggedIn] = useState("");
    const [passIn, setPassIn] = useState("");
    const [isConnected, setIsConnected] = useState(true);

    if (isConnected != false) {
        return (
            <View style={styles.container}>
                <Text>Bienvenue sur la Machine </Text>
                <Search />
                <ShowResult />
                <StatusBar style="auto" />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <TextInput
                    title="Identifiant"
                    placeholder="Votre identifiant"
                    onChangeText={(loggedIn) => setLoggedIn(loggedIn)}
                    value={loggedIn}
                ></TextInput>
                <TextInput
                    title="Mot de passe"
                    placeholder="Votre mot de passe"
                    onChangeText={(passIn) => setPassIn(passIn)}
                    value={passIn}
                    secureTextEntry={passIn}
                ></TextInput>
                <Button onPress={() => setIsConnected(true)}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
