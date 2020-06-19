import store from ".";

const SET_AUTH_DATA='SET_AUTH_DATA';
const SET_AUTH_DATA_FROM_AS='SET_AUTH_DATA_FROM_AS';



export const MODULE_NAME="auth";
export const selectAuthData=state=>state[MODULE_NAME];

//INITAIAL STATE

const initialState={
    token:null,
    refreshToken:null,
    tokenExpires:0,
    userID:null
};

export function authReducer(state=initialState,{type, payload}){
    switch (type){
        case SET_AUTH_DATA:
            console.log('set auth in reducer fired');
            return {
                ...state,
                token:payload.token,
                refreshToken:payload.refreshToken,
                tokenExpires:payload.tokenExpires,
                userID:payload.userID
            }
        case SET_AUTH_DATA_FROM_AS:
            console.log('set autf from as fired');
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}

//action creators

export const setAuthData=(payload)=>({
    type:SET_AUTH_DATA,
    payload
});


//middleWare
const FIREBASE_API_KEY='AIzaSyBxsJAJK05HY8yQEicfNxxuWq_4h13kp9I'
export const SignUp=(email,password,name)=>async dispatch =>{
    console.log('signup fired');
    try {
        const response=await fetch (`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    returnSecureToken:true,
                    email,
                    password
                }),
            }
        );
        const result=await response.json();
        console.log('result in signUp function firebase', result);
        if (!result.error){
            await fetch (`https://my-project-aysel.firebaseio.com/users/${result.localId}.json?auth=${result.idToken}`,
                {
                    method:'PUT',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        name:name
                    }),
                }
            );
            dispatch(setAuthData({
                token:result.idToken,
                refreshToken:result.refreshToken,
                tokenExpires:Date.now()+(result.expiresIn*1000)-15000,
                userID:result.localId
            }))
            console.log('setAuthData fired and state is: ', store.getState());

        }
    } catch (error) {
        console.log(error)
    }
}

//signIn
export const SignIn = (email, password) => async (dispatch) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            returnSecureToken: true,
            email,
            password,
          }),
        }
      );
      const result = await response.json();
      if (!result.error) {
        dispatch(
          setAuthData({
            token: result.idToken,
            refreshToken: result.refreshToken,
            tokenExpires: Date.now() + result.expiresIn * 1000 - 15000,
            userID: result.localId,
          })
        );
      }
    } catch (error) {
        console.log('error: ', error);
    }
  };
  


