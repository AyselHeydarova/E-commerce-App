import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { COLORS } from "../../style/colors";
import { CustomText } from "../../components/CustomText";
import { Btn } from "../../components/Btn";
import { Input } from "../../components";
import { GLOBAL_STYLES } from "../../style/globalStyles";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import { changeUsernameAndPhoto } from "../../API";

const getPermissions = async () => {
  try {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    if (result.status != "granted") {
      console.log("Access denied");
      return false;
    }
    return true;
  } catch (error) {
    console.log("catched error", error);
  }
};

export const Settings = ({ navigation }) => {
  const [userFields, setUserFields] = useState({
    username: "",
    userPhoto: "",
  });

  useEffect(() => {
    getPermissions().then((answer) => console.log("Permission answer", answer));
  }, []);

  const handleFieldChange = (name, value) => {
    setUserFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };

  const takeImageFromGallery = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    const newPath = `${FileSystem.documentDirectory}${image.uri
      .split("/")
      .pop()}`;

    const result = await FileSystem.moveAsync({
      from: image.uri,
      to: newPath,
    });

    image.uri = newPath;
    setUserFields((fields) => ({
      ...fields,
      userPhoto: image.uri,
    }));
  };

  const takePicture = async () => {
    const image = await ImagePicker.launchCameraAsync();
    setUserFields((fields) => ({
      ...fields,
      userPhoto: image.uri,
    }));
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.select({ ios: 120, android: 500 })}
        enabled
      >
        <StatusBar />
        <CustomText weight={"bold"} style={styles.title}>
          Settings
        </CustomText>
        <Input
          name="Username"
          value={userFields.username}
          onChangeText={(v) => handleFieldChange("username", v)}
        />
        <View style={styles.imgWraper}>
          <Image
            source={{ uri: userFields.userPhoto }}
            style={styles.img}
            resizeMode="contain"
          />
        </View>

        <View style={styles.row}>
          <Btn
            btnName="FROM GALLERY"
            bgColor={COLORS.PRIMARY}
            onPress={takeImageFromGallery}
            width={(Dimensions.get("window").width - 48) / 2}
            height={50}
          />
          <Btn
            btnName="TAKE PICTURE"
            onPress={takePicture}
            bgColor={COLORS.PRIMARY}
            width={(Dimensions.get("window").width - 48) / 2}
            height={50}
          />
        </View>

        <Btn
          btnName="SAVE CHANGES"
          bgColor={COLORS.PRIMARY}
          onPress={() => {
            changeUsernameAndPhoto(userFields);
            navigation.navigate("Profile");
          }}
          width={"100%"}
          height={50}
          containerStyle={{ marginTop: 16 }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },

  title: {
    color: COLORS.TEXT,
    fontSize: 34,
    lineHeight: 34,
    margin: GLOBAL_STYLES.MARGIN_LEFT,
  },
  btn: {
    marginBottom: 10,
  },

  img: {
    width: "100%",
    height: "100%",
  },

  imgWraper: {
    alignSelf: "center",
    width: 80,
    height: 80,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    borderRadius: 50,
    overflow: "hidden",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
