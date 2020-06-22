import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView,Button, Text, Image } from "react-native";
import { connect } from "react-redux";

import {
  SignUp,
  selectAuthData,
  SignIn
} from "../store/auth"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Input } from "../components/Field";
import rightIcon from '../assets/rightArrow.png'
import { Btn } from "../components/Btn";


const mapStateToProps = (state) => ({
  authData: selectAuthData(state),
});

export const AuthForm = connect(mapStateToProps, {
  SignUp, SignIn
})(({ SignUp, authData, SignIn, forSignUp=true}) => {
  
  const [fields, setFields] = useState({
    name:"",
    email: "",
    password: "",
  });
  const {userID}= authData;
  const fieldChangeHandler = (name, value) =>
    {
      setFields((fields) => ({
      ...fields,
      [name]: value,
    }));
    console.log('fields now: ',fields);
  }

  const submitSignUp = () => {
    SignUp(fields.email, fields.password, fields.name);
  };
  const submitSignIn = () => {
    SignIn(fields.email, fields.password);
  };

  
  return (
    <View style={styles.container}>
        {userID ? (
          <Text>authorized</Text>
        ) : forSignUp? (
            <>
          <View style={styles.signUpContainer}>
            <Input name={'Name'} onChangeHandler={(value)=>fieldChangeHandler('name',value)} value={fields.name}/>
            <Input name={'Email'} onChangeHandler={(value)=>fieldChangeHandler('email',value)} value={fields.email}/>
            <Input name={'Password'} onChangeHandler={(value)=>fieldChangeHandler('password',value)} value={fields.password}/>
            <TouchableOpacity style={styles.redirectTo}>
              <Text style={styles.toSignIntext}>Already have an account?</Text>
              <Image style={{width:15, height:6}} source={{uri:'../../assets/rightArrow.png'}}/>
            </TouchableOpacity>
          </View>
            <TouchableOpacity onPress={submitSignUp}>
              <Btn btnName="SIGN UP" width={'100%'} height={48} bgColor={'#EF3651'} titleStyle={{color:'#F5F5F5'}} />
            </TouchableOpacity>

          </>
        ):(
          <View style={styles.signInContainer}>
            <Input name={'Email'} onChangeHandler={(value)=>fieldChangeHandler('email',value)} value={fields.email}/>
            <Input name={'Password'} onChangeHandler={(value)=>fieldChangeHandler('password',value)} value={fields.password}/>
            <TouchableOpacity style={styles.redirectTo}>
              <Text style={styles.toSignIntext}>Forgot your password?</Text>
              <Image style={{width:15, height:6}} source={{uri:'../../assets/rightArrow.png'}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={submitSignIn}>
              <Btn btnName="LOGIN" width={'100%'} height={48} bgColor={'#EF3651'} titleStyle={{color:'#F5F5F5'}} />
            </TouchableOpacity>
          </View>
        )}
    </View>
  );
});

const styles=StyleSheet.create({
  container:{
    paddingHorizontal:15
  },
  signUpContainer:{
    width:'100%',
    alignItems:'center',

  },
  redirectTo:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'flex-end',
    alignItems:'center',
    marginBottom:25
  },
  toSignIntext:{
    color:'white',
    marginRight:8

  }
})