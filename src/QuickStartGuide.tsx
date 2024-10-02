import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { type PassioFoodItem } from "@passiolife/nutritionai-react-native-sdk-v3";
import FoodDetail from "./editor/FoodDetail";
import { RecognizeImageRemote } from "./recognizeImageRemote";
import { FeatureButton } from "./components/FeatureButton";

type ViewType = "recognizeImageRemote" | "Home";
const logo = require("./assets/passio_logo.png");

export const QuickStartGuide = () => {
  const [viewType, setViewType] = useState<ViewType>("Home");
  const [passioFoodItem, setPassioFoodItem] = useState<PassioFoodItem | null>(
    null
  );

  const onBackToHome = useCallback(() => {
    setViewType("Home");
  }, []);

  const onRecognizeImageRemote = useCallback(() => {
    setViewType("recognizeImageRemote");
  }, []);

  return (
    <>
      {(() => {
        switch (viewType) {
          case "recognizeImageRemote":
            return (
              <RecognizeImageRemote
                onClose={onBackToHome}
                onFoodDetail={setPassioFoodItem}
              />
            );

          default:
            return (
              <ScrollView>
                <Image
                  source={logo}
                  style={styles.logo}
                  resizeMode="contain"
                  resizeMethod="resize"
                />
                <View style={styles.actions}>
                  <Text
                    style={{
                      color: "white",
                      margin: 16,
                      fontSize: 18,
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                  >
                    Views showing raw output of the SDK and various UX examples.
                  </Text>
                    <FeatureButton
                      title="Camera & Photos"
                      info="Use the camera, single photo, or photo roll to detect your foods."
                      onClick={onRecognizeImageRemote}
                    />
                </View>
              </ScrollView>
            );
        }
      })()}
      <Modal visible={passioFoodItem !== null}>
        {passioFoodItem ? (
          <FoodDetail
            onClose={() => {
              setPassioFoodItem(null);
            }}
            passioFoodItem={passioFoodItem}
          />
        ) : null}
      </Modal>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: "absolute",
    backgroundColor: "white",
    top: Dimensions.get("window").height / 2,
    bottom: 0,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 150,
    padding: 16,
    right: 0,
    left: 0,
  },
  logo: {
    height: 150,
    width: 300,
    alignSelf: "center",
    marginVertical: 32,
  },
  actions: {
    flex: 1,
  },
});
