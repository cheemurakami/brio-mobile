import React from 'react';
import { Text, View, Image } from "react-native";
import bg from "../styles/ScreenStyle.js";
import text from "../styles/TextStyle.js";

function DashboardPage() {
    return (
        <>
        <View style={bg.container}>
                <Text style={text.header}>Your Check-In</Text>
        </View>
        </>
    )
}
export default DashboardPage
