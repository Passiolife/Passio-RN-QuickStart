import { useState, useCallback, useEffect, useRef } from "react";
import {
  PassioAdvisorFoodInfo,
  PassioSDK,
} from "@passiolife/nutritionai-react-native-sdk-v3";
import type { Props } from "./RecognizeRemote";
import { launchImageLibrary } from "react-native-image-picker";
import { Alert } from "react-native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import BottomSheet from "@gorhom/bottom-sheet";

const useRecognizeRemote = ({}: Props) => {
  const cameraViewRef = useRef<CameraView>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [passioSpeechRecognitionModel, setPassioSpeechRecognitionModel] =
    useState<PassioAdvisorFoodInfo[] | null>();
  const [facing, setFacing] = useState<CameraType>("back");
  const [pictureUri, setPictureUri] = useState<string>("");
  const [permission, requestPermission] = useCameraPermissions();
  const sheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    requestPermission();
  }, []);

  const handleSheetClose = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const toggleCameraFacing = useCallback(() => {
    setFacing((current: CameraType) => (current === "back" ? "front" : "back"));
  }, []);

  const handleCapture = useCallback(async () => {
    try {
      const picture = await cameraViewRef.current?.takePictureAsync();
      setPictureUri(picture?.uri ?? "");
    } catch (_) {
      Alert.alert("error while capture image");
    }
  }, []);

  const handlePickerImage = useCallback(async () => {
    try {
      const { assets } = await launchImageLibrary({
        mediaType: "photo",
      });
      setPictureUri(assets?.[0].uri ?? "");
    } catch (err) {
      setLoading(false);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setPictureUri("");
  }, []);

  const onScanImage = () => {
    setLoading(true);
    setPassioSpeechRecognitionModel(null);
    PassioSDK.recognizeImageRemote(
      pictureUri?.replace("file://", "") ?? "",
      undefined,
      "RES_512"
    )
      .then((candidates) => {
        if (candidates?.length === 0){
          Alert.alert("unable to find any food.");
        }else{
          setPassioSpeechRecognitionModel(candidates);
        }
      })
      .catch((e) => {
        Alert.alert("Unable to recognized this image");
      })
      .finally(() => {
        setLoading(false);
        handleCloseModal();
      });
  };

  return {
    cameraViewRef,
    sheetRef,
    passioSpeechRecognitionModel,
    loading,
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
  };
};

export default useRecognizeRemote;
