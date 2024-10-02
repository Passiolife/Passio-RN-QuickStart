import React, {  } from "react";
import {
    StyleSheet,
    Text,
    Pressable,
  } from "react-native";
export const FeatureButton = ({
    title,
    info,
    onClick,
  }: {
    title: string;
    info?: string;
    onClick: () => void;
  }) => {
    return (
      <Pressable style={styles.buttonContainer} onPress={onClick}>
        <Text style={styles.buttonText}>{title}</Text>
        <Text style={styles.buttonInfo}>{info}</Text>
      </Pressable>
    );
  };


const styles = StyleSheet.create({
   
    buttonContainer: {
      padding: 16,
      borderRadius: 12,
      marginHorizontal: 16,
      borderLeftWidth: 3,
      borderColor: "white",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      shadowOffset: { width: 0, height: 0.1 },
      shadowOpacity: 0.5,
      shadowRadius: 0.5,
      marginVertical: 6,
    },
    buttonText: {
      flex: 1,
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    buttonInfo: {
      flex: 1,
      marginTop: 4,
      color: "white",
      fontWeight: "400",
    },
  });
  