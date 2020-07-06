import { getUsersData } from "../API";

const SET_USERS = "SET_USERS";

export const setUsers = (payload) => ({
  type: SET_USERS,
  payload,
});

export const MODULE_NAME = "users";
export const selectUsers = (state) => state[MODULE_NAME];
export const selectUsernameByID = (state, ID) =>
  state[MODULE_NAME].filter((user) => user.id === ID).username;

const initialState = [];

export function usersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USERS:
      return [...state, ...payload];
    default:
      return state;
  }
}

export const setUsersData = () => async (dispatch, getState) => {
  try {
    const users = await getUsersData();
    dispatch(setUsers(users));

    console.log("SetUsersData", users);
  } catch (error) {
    console.log("setUsersData", error);
  }
};
