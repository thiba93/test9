/* eslint-disable no-console */
import React from "react"
import { Text, StyleSheet, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const Header = () => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => console.log("Navigate to Home")}>
        <Text style={styles.logo}>AIRNEIS</Text>
      </TouchableOpacity>

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => console.log("Navigate to Search")}>
          <Icon name="magnify" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Navigate to Cart")}>
          <Icon name="cart-outline" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Navigate to Cart")}>
          <Icon name="menu" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
)
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#92C7CF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  logo: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 120,
  },
})

export default Header
