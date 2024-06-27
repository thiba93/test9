import React from "react"
import { View, StyleSheet, SafeAreaView } from "react-native"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }) => (
  <SafeAreaView style={styles.container}>
    <Header />
    <View style={styles.content}>{children}</View>
    <Footer />
  </SafeAreaView>
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Montserrat",
  },
  content: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FBF9F1",
  },
})

export default Layout
