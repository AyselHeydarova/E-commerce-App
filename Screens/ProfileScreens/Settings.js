import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { COLORS } from "../../style/colors";
import { CustomText } from "../../components/CustomText";
import { Back } from "../../Icons/Back";
import { Btn } from "../../components/Btn";
import { Order } from "../../components/Order";
import { Input } from "../../components/Input";
import { GLOBAL_STYLES } from "../../style/globalStyles";

import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import { changeUsernameAndPhoto } from "../../store/users";

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

export const Settings = connect(null, {
  //   changeUsernameAndAvatar,
})(({ navigation, changeUsernameAndAvatar }) => {
  const [userFields, setUserFields] = useState({
    username: "",
    userPhoto: "",
  });

  useEffect(() => {
    getPermissions().then((answer) => console.log("Permission answer", answer));
  }, []);

  const username = userFields.username;
  const userPhoto = userFields.userPhoto;

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

  //   const saveChangesHandler = () => {
  //     changeUsernameAndAvatar({ username, userAvatar });
  //     navigation.navigate("Home");
  //   };

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
          placeholder="Enter your FullName"
          label="user name"
          value={userFields.username}
          onChangeText={(v) => handleFieldChange("username", v)}
        />
        <View style={styles.imgWraper}>
          <Image
            source={{ uri: userPhoto }}
            style={styles.img}
            resizeMode="contain"
          />
        </View>

        <View style={styles.row}>
          <Btn
            btnName="FROM GALLERY"
            bgColor={COLORS.PRIMARY}
            onPress={takeImageFromGallery}
            // style={styles.btn}
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
          onPress={() => changeUsernameAndPhoto(userFields)}
          //   style={styles.btn}
          width={"100%"}
          height={50}
          containerStyle={{ marginTop: 16 }}
        />
      </KeyboardAvoidingView>
    </View>
  );
});

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

// export const Settings = ({ navigation }) => {
//   return (
//     <KeyboardAvoidingView
//       behavior="padding"
//       keyboardVerticalOffset={Platform.select({ ios: 120, android: 500 })}
//       enabled
//       style={styles.container}
//     >
//       <StatusBar />
//       <TouchableOpacity style={styles.backIcon}>
//         <Back />
//       </TouchableOpacity>
//       <CustomText weight={"bold"} style={styles.title}>
//         Settings
//       </CustomText>

//       <CustomText weight={"medium"} style={styles.infoTitle}>
//         Personal Information
//       </CustomText>
//       <Input name={"Full name"} />
//       <Input name={"Date of birth"} />

//       <View style={[styles.header, { marginTop: 30 }]}>
//         <CustomText weight={"medium"} style={styles.infoTitle}>
//           Password
//         </CustomText>
//         <TouchableOpacity onPress={() => navigation.navigate("PasswordChange")}>
//           <CustomText style={styles.btnText}>Change</CustomText>
//         </TouchableOpacity>
//       </View>
//       <Input marginLeft={20} name={"Password"} secureTextEntry={true} />
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.BACKGROUND,
//   },
//   title: {
//     color: COLORS.TEXT,
//     fontSize: 34,
//     lineHeight: 34,
//     margin: GLOBAL_STYLES.MARGIN_LEFT,
//   },
//   btnText: {
//     color: COLORS.GRAY,
//     fontSize: 14,
//     lineHeight: 38,
//     marginRight: GLOBAL_STYLES.MARGIN_LEFT,
//   },
//   backIcon: {
//     marginTop: 20,
//     marginLeft: GLOBAL_STYLES.MARGIN_LEFT,
//   },
//   infoTitle: {
//     fontSize: 19,
//     lineHeight: 20,
//     marginLeft: GLOBAL_STYLES.MARGIN_LEFT,
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
// });
