import React, {useState} from 'react';
import {StyleSheet, View, StatusBar, FlatList, TouchableOpacity, Image} from "react-native";
import {COLORS} from "../../style/colors";
import {CustomText} from "../../components/CustomText";
import {Forward} from "../../Icons/Forward";


export const ProfileScreen = ({
                                  orderCount,
                                  shippingAddresses,
                                  paymentMethods,
                                  navigation,
                                  username = 'Matilda Brown',
                                  email = "matildabrown@mail.com",
                                  avatar="https://i1.sndcdn.com/avatars-000530040327-sk6iwk-t500x500.jpg"
                              }) => {
    const profileSections = [
        {
            sectionName: "My Orders",
            dutyOfSection: `Already have ${orderCount} orders`,
            screenTo: "MyOrders"
        },
        {
            sectionName: "Shipping addresses",
            dutyOfSection: `${shippingAddresses} addresses`,
            screenTo: "ShippingAddressesScreen"
        },
        {
            sectionName: "Payment methods",
            dutyOfSection: `Visa ${paymentMethods} `,
            screenTo: "PasswordChange"
        },
        {
            sectionName: "Settings",
            dutyOfSection: "Notifications, password",
            screenTo: "Settings"
        },

    ];
    return (
        <View style={styles.container}>
            <StatusBar/>
            <CustomText weight={'bold'} style={styles.title}>
                My Profile
            </CustomText>

            <View style={styles.userInfoSection}>
                <Image style={styles.avatar}
                       source={{uri: avatar}}/>
                <View style={styles.text}>
                    <CustomText weight={'bold'} style={styles.name}>
                        {username}
                    </CustomText>
                    <CustomText weight={'medium'} style={styles.email}>
                        {email}
                    </CustomText>
                </View>
            </View>
            <FlatList
                data={profileSections}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.profileSection} key={`${item.sectionName}`}
                                      onPress={() => navigation.navigate(item.screenTo)}>
                        <View style={styles.text}>
                            <CustomText weight={'bold'} style={styles.name}>
                                {item.sectionName}
                            </CustomText>
                            <CustomText style={styles.email}>
                                {item.dutyOfSection}
                            </CustomText>
                        </View>
                        <Forward height={20} width={20} color={COLORS.GRAY}/>
                    </TouchableOpacity>

                )}
                keyExtractor={item => item.sectionName}
            />

        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    title: {
        color: COLORS.TEXT,
        fontSize: 34,
        lineHeight: 34,
        margin: 30,

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

    profileSection: {
        width: '100%',
        borderBottomWidth: 0.3,
        borderColor: COLORS.GRAY,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 10,

    },
    {
      sectionName: "Shipping addresses",
      dutyOfSection: `${shippingAddresses} addresses`,
    },
    {
      sectionName: "Payment methods",
      dutyOfSection: `Visa ${paymentMethods} `,
    },
    {
      sectionName: "Settings",
      dutyOfSection: "Notifications, password",
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar />
      <CustomText weight={"bold"} style={styles.title}>
        My Profile
      </CustomText>

      <View style={styles.userInfoSection}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              "https://i1.sndcdn.com/avatars-000530040327-sk6iwk-t500x500.jpg",
          }}
        />
        <View style={styles.text}>
          <CustomText weight={"bold"} style={styles.name}>
            Matilda Brown
          </CustomText>
          <CustomText weight={"medium"} style={styles.email}>
            matildabrown@mail.com
          </CustomText>
        </View>
      </View>
      <FlatList
        data={profileSections}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.profileSection}
            key={`${item.sectionName}`}
          >
            <View style={styles.text}>
              <CustomText weight={"bold"} style={styles.name}>
                {item.sectionName}
              </CustomText>
              <CustomText style={styles.email}>{item.dutyOfSection}</CustomText>
            </View>
            <Forward height={20} width={20} color={COLORS.GRAY} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.sectionName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  title: {
    color: COLORS.TEXT,
    fontSize: 34,
    lineHeight: 34,
    margin: 30,
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

  profileSection: {
    width: "100%",
    borderBottomWidth: 0.3,
    borderColor: COLORS.GRAY,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
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
    marginLeft: 30,
  },
});
