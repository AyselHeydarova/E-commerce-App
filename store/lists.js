
//acion types
const GET_AS_DATA='SET_AS_DATA_TO_REDUX';
const SET_USER='SET_USER';
const CREATE_USER='CREATE_USER';

//selectors
const MODULE_NAME='lists';
export const getLists=state=>state[MODULE_NAME].lists;
//reducer
const  initialState={
    currentUser:{
        username:"John Smith",
        avatarURL:'./assets/defaultUserAvatar.png'
    },
}

export function listsReducer (state=initialState, {type,payload}){
    switch (type){
        
        case SET_USER:
            return {
                ...state,
                currentUser:{
                    username:payload.username,
                    avatarURL:payload.avatarUri
                }
            }
        
        case GET_AS_DATA:
            return {
                ...state,
                ...payload
            }
        default:
            return state
    }
}


//action creators


export const setUser=(payload)=>({
    type:SET_USER,
    payload 
})

export const createUser=(payload)=>({
    type:CREATE_USER,
    payload //contains: target listId, listContentItem properties
})
