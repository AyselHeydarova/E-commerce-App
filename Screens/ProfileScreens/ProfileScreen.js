import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS } from "../../style/colors";
import { CustomText } from "../../components/CustomText";
import { Forward } from "../../Icons/Forward";
import { logOut } from "../../store/auth";
import { connect } from "react-redux";
import { getCurrentUserData, selectUserData } from "../../store/users";
import { selectCurrentProduct } from "../../store/products";
import { LogOut } from "../../Icons/LogOut";
import { GLOBAL_STYLES } from "../../style/globalStyles";

const mapStateToProps = (state) => ({
  user: selectUserData(state),
  product: selectCurrentProduct(state),
});

export const ProfileScreen = connect(mapStateToProps, {
  getCurrentUserData,
  logOut,
})(({ getCurrentUserData, navigation, user, logOut }) => {
  const handleGetCurrentUserData = async () => {
    try {
      await getCurrentUserData();
    } catch (error) {
      console.log("getNewData", error);
    }
  };

  useEffect(() => {
    handleGetCurrentUserData();
  }, []);

  const profileSections = [
    {
      sectionName: "My Orders",
      dutyOfSection: `Already have ${user.orders.length} orders`,
      screenTo: "MyOrders",
    },
    {
      sectionName: "Shipping addresses",
      dutyOfSection: `${(user.shippingAddresses || []).length} addresses`,
      screenTo: "ShippingAddressesScreen",
    },
    {
      sectionName: "Payment methods",
      dutyOfSection: `${(user.paymentMethods || []).length} payment methods `,
      screenTo: "PaymentMethods",
    },
    {
      sectionName: "Settings",
      dutyOfSection: "Change photo and username",
      screenTo: "Settings",
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.logoutWrapper}>
        <CustomText weight={"bold"} style={styles.title}>
          My Profile
        </CustomText>

        <LogOut width={30} height={30} onPress={() => logOut()} />
      </View>
      <View style={styles.userInfoSection}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              user.userPhoto === undefined
                ? "https://icon-library.com/images/icon-panda/icon-panda-25.jpg"
                : user.userPhoto,
          }}
        />
        <View style={styles.text}>
          <CustomText weight={"bold"} style={styles.name}>
            {user.username}
          </CustomText>
          <CustomText weight={"medium"} style={styles.email}>
            {user.email}
          </CustomText>
        </View>
      </View>
      <FlatList
        data={profileSections}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.profileSection}
            key={`${item.sectionName}`}
            onPress={() => navigation.navigate(item.screenTo)}
          >
            <View style={styles.text}>
              <CustomText weight={"bold"} style={styles.sectionName}>
                {item.sectionName}
              </CustomText>
              <CustomText style={styles.sectionDesc}>
                {item.dutyOfSection}
              </CustomText>
            </View>
            <Forward height={20} width={20} color={COLORS.GRAY} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.sectionName}
      />
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
    marginVertical: 24,
  },
  email: {
    color: COLORS.GRAY,
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 15,
    marginLeft: 30,
  },
  name: {
    color: COLORS.TEXT,
    fontSize: 20,
    lineHeight: 22,
    marginLeft: 30,
    marginBottom: 8,
  },

  sectionName: {
    color: COLORS.TEXT,
    fontSize: 18,
    marginBottom: 8,
  },

  sectionDesc: {
    color: COLORS.GRAY,
    fontSize: 14,
  },

  profileSection: {
    width: "100%",
    height: 72,
    borderBottomWidth: 0.5,
    borderColor: COLORS.GRAY,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  text: {
    marginTop: 10,
  },
  userInfoSection: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: "white",
  },

  logoutWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
  },
});
