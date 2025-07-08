import ReclaimComponent from "@/components/ReclaimComponent";
import { useAbstraxionAccount } from "@burnt-labs/abstraxion-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { isConnected, logout } = useAbstraxionAccount();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>ZKtls / Reclaim</Text>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          This tab provides zero-knowledge proof functionality using Reclaim
          Protocol. You can verify your identity without revealing sensitive
          data. This is a proof of concept and is not production ready.
        </Text>
      </View>

      <View style={styles.componentContainer}>
        <ReclaimComponent />
      </View>

      {isConnected && (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff",
    textAlign: "center",
  },
  notConnectedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  notConnectedText: {
    fontSize: 16,
    color: "#cccccc",
    textAlign: "center",
  },
  descriptionContainer: {
    backgroundColor: "#111111",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333333",
  },
  descriptionText: {
    fontSize: 14,
    color: "#cccccc",
    lineHeight: 20,
  },
  componentContainer: {
    backgroundColor: "#111111",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333333",
  },
  logoutButton: {
    backgroundColor: "#ff4444",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
});
