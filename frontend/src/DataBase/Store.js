import {create} from "zustand"

const myStore = create((set)=> ({
    isUserLoggedIn:false,
    userDetails:{},
    changeLoginStatus: () => set((state)=> ({isUserLoggedIn:!state.isUserLoggedIn})),
    UserCredentials: (props) => set(()=>({userDetails:props}))
}))

export default myStore 