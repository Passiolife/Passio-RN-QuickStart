import * as React from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PassioConfigurationView } from "./PassioConfigurationView";

export default function App() {
  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <PassioConfigurationView />
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
