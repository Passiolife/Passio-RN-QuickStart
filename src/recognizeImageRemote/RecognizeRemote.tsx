import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Modal,
  ImageBackground,
  Pressable,
  Button,
  Dimensions,
} from "react-native";
import {
  PassioIconView,
  IconSize,
  PassioSDK,
  PassioFoodItem,
  PassioAdvisorFoodInfo,
} from "@passiolife/nutritionai-react-native-sdk-v3";
import { CameraView } from "expo-camera";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import useRecognizeRemote from "./useRecognizeRemote";
import { Images } from "../assets";

export interface Props {
  onClose: () => void;
  onFoodDetail: (passioFoodItem: PassioFoodItem) => void;
}

// FoodSearchScreen component
export const RecognizeImageRemote = (props: Props) => {
  // Get styles object from the searchStyle function

  // Destructure values from the custom hook
  const {
    sheetRef,
    cameraViewRef,
    loading,
    passioSpeechRecognitionModel,
    facing,
    permission,
    pictureUri,
    handlePickerImage,
    toggleCameraFacing,
    handleCapture,
    handleCloseModal,
    requestPermission,
    onScanImage,
    handleSheetClose,
  } = useRecognizeRemote(props);

  const styles = recognizeRemoteStyle();
  // Function to render each item in the FlatList
  const renderSearchItem = ({ item }: { item: PassioAdvisorFoodInfo }) => {

    const info = `${item.portionSize} | ${item.foodDataInfo?.nutritionPreview?.calories ?? item?.packagedFoodItem?.ingredients?.[0].referenceNutrients?.calories?.value} kcal`
    const name = item?.foodDataInfo?.foodName ?? item?.packagedFoodItem?.name ?? item?.recognisedName
    const iconID = item?.foodDataInfo?.iconID ?? item?.packagedFoodItem?.iconId

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={async () => {
          if (item.packagedFoodItem) {
            props.onFoodDetail(item.packagedFoodItem);
          } else {
            if (item.foodDataInfo) {
              const dataInfo = await PassioSDK.fetchFoodItemForDataInfo(
                item?.foodDataInfo
              );
              if (dataInfo) {
                props.onFoodDetail(dataInfo);
              }
            }
          }
        }}>
        <View style={styles.itemIconContainer}>
          <PassioIconView
            style={styles.itemIcon}
            config={{
              passioID: iconID ?? "",
              iconSize: IconSize.PX360,
            }}
          />
        </View>
        <View style={{flex:1}}>
          <Text style={[styles.itemFoodName,{textTransform:"capitalize"}]}>{name}</Text>
          <Text style={styles.itemFoodName}>
            {info}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };



  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View style={styles.permissionContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.takeAPhotoText}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  // Render the component
  return (
    <View style={styles.container}>
      {!!pictureUri && (
        <Modal
          visible={!!pictureUri}
          transparent
          animationType="fade"
          onRequestClose={handleCloseModal}>
          <View style={styles.modalContainer}>
            <ImageBackground
              source={{ uri: pictureUri }}
              style={styles.capturedImage}
              resizeMode="contain">
              <SafeAreaView style={styles.imagePreviewBtnContainer}>
              {loading && (
                  <View style={styles.loaderContainer}>
                    <ActivityIndicator size={"large"} color={"blue"} />
                  </View>
                )}
                <View />
                {!loading && (
                  <View style={styles.modalFooterContainer}>
                    <TouchableOpacity
                      style={styles.imagePreviewIcon}
                      onPress={handleCloseModal}>
                      <Image
                        style={styles.closeIcon_}
                        resizeMode="contain"
                        source={Images.CLOSE_ICON}
                        tintColor={"#FB3748"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.imagePreviewIcon}
                      onPress={onScanImage}>
                      <Image
                        style={styles.rightIcon}
                        resizeMode="contain"
                        source={Images.RIGHT_ICON}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </SafeAreaView>
            </ImageBackground>
          </View>
        </Modal>
      )}
      <CameraView style={styles.container} facing={facing} ref={cameraViewRef}>
        <SafeAreaView>
          {!pictureUri && (
            <>
              <View style={styles.headerIconContainer}>
                <TouchableOpacity
                  style={styles.headerIcon}
                  onPress={props.onClose}>
                  <Image
                    style={styles.closeIcon}
                    resizeMode="contain"
                    source={Images.CLOSE_ICON}
                    tintColor={"white"}
                  />
                </TouchableOpacity>
              </View>

              <Image
                source={Images.CAMERA_FRAME_ICON}
                resizeMode="contain"
                style={styles.cameraFrame}
              />
              <Text style={styles.takeAPhotoText}>
                Take a Photo of your Meal
              </Text>
              <View style={styles.bottomContainer}>
                <TouchableOpacity
                  style={styles.galleryIcon}
                  onPress={handlePickerImage}>
                  <Image
                    resizeMode="contain"
                    source={Images.GALLERY_ICON}
                    tintColor={"white"}
                  />
                </TouchableOpacity>
                <Pressable style={styles.captureIcon} onPress={handleCapture}>
                  <View style={styles.captureButton} />
                </Pressable>
                <TouchableOpacity
                  style={styles.toggleCameraIcon}
                  onPress={toggleCameraFacing}>
                  <Image
                    style={styles.splitIcon}
                    resizeMode="contain"
                    source={Images.SPLIT_ICON}
                    tintColor={"white"}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </SafeAreaView>

        {passioSpeechRecognitionModel && (
          <BottomSheet ref={sheetRef} enableDynamicSizing>
            <SafeAreaView style={styles.container}>
              <TouchableOpacity
                style={styles.bottomSheetCloseIcon}
                onPress={handleSheetClose}>
                <Image
                  style={styles.closeIcon}
                  resizeMode="contain"
                  source={Images.CLOSE_ICON}
                  tintColor={"white"}
                />
              </TouchableOpacity>
              <BottomSheetFlatList
                data={passioSpeechRecognitionModel}
                keyExtractor={(_, index) => `${index}`}
                renderItem={renderSearchItem}
                contentContainerStyle={{paddingTop:80}}
                ListFooterComponent={() => <View style={styles.spacer} />}
              />
            </SafeAreaView>
          </BottomSheet>
        )}
      </CameraView>

    </View>
  );
};

// Styles for the component
const recognizeRemoteStyle = () =>
  StyleSheet.create({
    closeIcon: {
      height: 24,
      width: 24,
    },
    itemContainer: {
      padding: 12,
      flex: 1,
      marginVertical: 4,
      marginHorizontal: 16,
      backgroundColor: "rgba(238, 242, 255, 1)",
      flexDirection: "row",
      borderRadius: 8,
    },
    itemFoodName: {
      flex: 1,
      marginHorizontal: 8,
      fontSize: 16,
    },
    itemIconContainer: {
      height: 46,
      width: 46,
      borderRadius: 30,
      overflow: "hidden",
    },
    itemIcon: {
      height: 46,
      width: 46,
    },
    container: {
      flex: 1,
    },
    headerIcon: {
      height: 40,
      width: 40,
      borderRadius: 20,
      backgroundColor: "#00000059",
      alignItems: "center",
      justifyContent: "center",
    },
    bottomSheetCloseIcon: {
      height: 40,
      width: 40,
      borderRadius: 20,
      position: "absolute",
      top: 5,
      right: 0,
      zIndex: 1,
      marginRight: 20,
      backgroundColor: "#00000059",
      alignItems: "center",
      justifyContent: "center",
    },
    headerIconContainer: {
      marginTop: 16,
      marginHorizontal: 20,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    cameraFrame: {
      width: "90%",
      height: "75%",
      marginTop: 10,
      alignSelf: "center",
    },
    takeAPhotoText: {
      fontSize: 16,
      color: "#FFFFFF",
      fontWeight: "500",
      textShadowColor: "black",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      textAlign: "center",
      marginTop: 5,
      marginBottom: 12,
    },
    bottomContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      alignItems: "center",
    },
    galleryIcon: {
      width: 56,
      height: 56,
      borderRadius: 8,
      backgroundColor: "#41414173",
      alignItems: "center",
      justifyContent: "center",
    },
    captureIcon: {
      height: 72,
      width: 72,
      borderRadius: 36,
      borderWidth: 5,
      borderColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
    captureButton: {
      width: 55,
      height: 55,
      borderRadius: 27,
      backgroundColor: "white",
    },
    toggleCameraIcon: {
      height: 48,
      width: 48,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#00000059",
    },
    splitIcon: {
      height: 30,
      width: 30,
    },
    capturedImage: {
      height: "100%",
      width: "100%",
    },
    imagePreviewBtnContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 20,
      marginBottom: 50,
    },
    imagePreviewIcon: {
      height: 52,
      width: 52,
      borderRadius: 26,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF59",
    },
    rightIcon: {
      height: 20,
      width: 20,
    },
    closeIcon_: {
      height: 20,
      width: 20,
    },
    permissionContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      flex: 1,
      backgroundColor: "#000000CC",
      justifyContent: "center",
      alignItems: "center",
    },
    modalFooterContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
    loaderContainer: {
      backgroundColor:"rgba(238, 242, 255, 0.5)",
      top:Dimensions.get("window").height/2.5,
      width:200,
      height:100,
      position:'absolute',
      alignSelf: "center",
      zIndex:1000,
      justifyContent:'center',
    },
    spacer: { height: 50 },
  });
