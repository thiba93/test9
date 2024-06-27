/* eslint-disable no-console */
import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"

const Footer = () => (
  <View style={styles.footer}>
    <View style={styles.linksContainer}>
      <TouchableOpacity>
        <Text style={styles.linkText}>CGU</Text>
      </TouchableOpacity>
      <Text style={styles.linkText}>-</Text>
      <TouchableOpacity>
        <Text style={styles.linkText}>Mention légales</Text>
      </TouchableOpacity>
      <Text style={styles.linkText}>-</Text>
      <TouchableOpacity>
        <Text style={styles.linkText}>Contact</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.socialIconsContainer}>
      <TouchableOpacity onPress={() => console.log("Navigate to Instagram")}>
        <Image
          source={require("../../public/instagram.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log("Navigate to LinkedIn")}>
        <Image
          source={require("../../public/linkedin.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  </View>
)
const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#92C7CF",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  linksContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 4,
  },
  socialIconsContainer: {
    flexDirection: "row",
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
})

export default Footer
