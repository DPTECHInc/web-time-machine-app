import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";

export default function ShowResult() {
    const [result, setResult] = useState(null);
    const [resultUrl, setResultUrl] = useState(null);
    const [resultShow, setResultShow] = useState(false);
    // const [resultSearch, setResultSearch] = useState(null);

    const _handleShowResultAsync = async () => {
        try {
            const value = await AsyncStorage.getItem("@dataResult");
            if (value !== null) {
                // value previously stored
                const data = JSON.parse(value);
                const resultData = data.archived_snapshots.closest.url;
                setResultUrl(resultData);
                setResultShow(true);
            }
        } catch (e) {
            // error reading value
            console.log("Preview KO", e);
        }
    };

    const _handlePressButtonAsync = async () => {
        try {
            const value = await AsyncStorage.getItem("@dataResult");
            if (value !== null) {
                // value previously stored

                const data = JSON.parse(value);
                let result = await WebBrowser.openBrowserAsync(data.archived_snapshots.closest.url);
                setResult(result);
                console.log("Navigation vers site OK");
            }
        } catch (e) {
            // error reading value
            console.log("Affichage KO", e);
        }
    };

    return (
        <View>
            <Button title="Preview Result" onPress={_handleShowResultAsync} />
            <Button title="Open Result" onPress={_handlePressButtonAsync} />
            {resultShow && (
                <View style={styles.containerShow}>
                    <WebView source={{ uri: resultUrl }} />

                    <Button
                        onPress={() => {
                            setResultShow(false);
                        }}
                        title="Hide Results"
                    />
                </View>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    containerResult: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    containerShow: {
        maxHeight: 200,
    },
});
