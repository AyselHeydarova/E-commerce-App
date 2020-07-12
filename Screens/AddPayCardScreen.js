import React from "react";
import { Input } from "../components/Input";
import { View, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../style/globalStyles";
import { Btn } from "../components/Btn";
import { COLORS } from "../style/colors";
import { ScrollView } from "react-native-gesture-handler";
import { CustomText } from "../components/CustomText";
// import { CheckBox } from 'react-native-elements'


export const AddPayCardScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <CustomText>Your payment cards</CustomText>
                <CustomText>Add new card</CustomText>
                <Input name="Name on card" />
                <Input name="Card number" />
                <Input name="Expire Date" />
                <Input name="CVV" />
                <Btn
                    btnName={"Save card"}
                    width={"100%"}
                    height={48}
                    bgColor={COLORS.PRIMARY}
                    titleStyle={{ color: "#F5F5F5" }}
                
                />
                {/*<CheckBox*/}
                {/*    title='Click Here'*/}
                {/*    checked={this.state.checked}*/}
                {/*/>*/}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // alignItems: "center",
        backgroundColor: COLORS.BACKGROUND,
        padding: GLOBAL_STYLES.PADDING,
    },
});
