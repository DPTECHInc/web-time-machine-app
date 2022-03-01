import React, { useState } from "react";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Search() {
    //CONST D'ETAT
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [searchWeb, setSearchWeb] = useState(null);
    const [result, setResult] = useState(null);

    //FONCTION recherche & fetch API
    const searchMachine = async () => {
        const timestamp = new Date(date)
            .toISOString()
            .replace(/[\/-\s,:T]/g, "")
            .split(".")[0];
        let url = "http://web.archive.org/wayback/available?url=" + searchWeb + "&timestamp=" + timestamp + "";
        // https://archive.org/wayback/available?url=example.com&timestamp=20060101

        try {
            const response = await fetch(url);
            const dataFetch = await response.json();
            console.log("OK", dataFetch);
            await AsyncStorage.setItem("@dataResult", JSON.stringify(dataFetch));
            setResult(dataFetch);
        } catch (error) {
            console.log("KO", error);
        }
    };
    //FONCTION DatePicker
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode("date");
    };

    const showTimepicker = () => {
        showMode("time");
    };
    return (
        <View>
            <View>
                <Text>Prêt à voyager ?!</Text>
                <FontAwesome name="hand-o-down" size={54} color="black" />
                <View>
                    <Button onPress={showDatepicker} title="Show date picker!" />
                </View>
                <View>
                    <Button onPress={showTimepicker} title="Show time picker!" />
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        dateFormat="year month day"
                    />
                )}
            </View>
            <View style={styles.buttonSearch}>
                <TextInput
                    placeholder="Votre Site internet"
                    value={searchWeb}
                    onChangeText={(searchWeb) => setSearchWeb(searchWeb)}
                ></TextInput>
                <Button onPress={searchMachine} title="C'est parti Marty!" />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    buttonSearch: {
        marginVertical: 10,
        backgroundColor: "#61dafb",
        borderWidth: 5,
    },
});
