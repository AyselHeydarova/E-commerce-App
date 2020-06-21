import React, {useState} from 'react';
import {StyleSheet, View, StatusBar, FlatList, TouchableOpacity, Image} from "react-native";
import {COLORS} from "../../style/colors";
import {CustomText} from "../../components/CustomText";
import {Forward} from "../../Icons/Forward";
import {Back} from "../../Icons/Back";
import {Btn} from "../../components/Btn";
import {Order} from "../../components/Order";
import {GLOBAL_STYLES} from "../../style/globalStyles";

export const MyOrders = () => {
    const [isDeliveredClicked,setIsDeliveredClicked]=useState(true);
    const [isProcessingClicked,setIsProcessingClicked]=useState(false);
    const [isCancelledClicked,setIsCancelledClicked]=useState(false);

    const handleDelivered=()=>{
        setIsDeliveredClicked(true);
        setIsProcessingClicked(false);
        setIsCancelledClicked(false);
    };
    const handleProcessing=()=>{
        setIsDeliveredClicked(false);
        setIsProcessingClicked(true);
        setIsCancelledClicked(false);
    };
    const handleCancelled=()=>{
        setIsDeliveredClicked(false);
        setIsProcessingClicked(false);
        setIsCancelledClicked(true);
    };
    return (
        <View style={styles.container}>
            <StatusBar/>
            <TouchableOpacity style={styles.backIcon}>
                <Back/>
            </TouchableOpacity>
            <CustomText weight={'bold'} style={styles.title}>
                My Orders
            </CustomText>

           <View style={styles.btns}>
               <Btn width={110}
                    height={34}
                    btnName={'Delivered'}
                    titleStyle={{ color:isDeliveredClicked? COLORS.DARK:COLORS.TEXT}}
                    bgColor={isDeliveredClicked?COLORS.TEXT:COLORS.BACKGROUND}
                    onPress={handleDelivered}

               />
               <Btn
                   btnName={'Processing'}
                   width={110}
                   height={34}
                   titleStyle={{ color:isProcessingClicked? COLORS.DARK:COLORS.TEXT}}
                   bgColor={isProcessingClicked?COLORS.TEXT:null}
                   onPress={()=>handleProcessing()}

               />
               <Btn
                   btnName={'Cancelled'}
                   width={110}
                   height={34}
                   titleStyle={{ color:isCancelledClicked? COLORS.DARK:COLORS.TEXT}}
                   bgColor={isCancelledClicked?COLORS.TEXT:null}
                   onPress={handleCancelled }
               />
           </View>
            <FlatList
                 data={["a","b","c"]}
                renderItem={({item}) => (
                 <Order />

                )}
                keyExtractor={item => item}
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
        margin:  GLOBAL_STYLES.MARGIN_LEFT,

    },
    backIcon: {
        marginTop: 20,
        marginLeft: GLOBAL_STYLES.MARGIN_LEFT,
    },




});