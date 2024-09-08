import { createContext } from "react";

const userContext= createContext({
    username: "",
    email: "",
    fullName: "",
    isAdmin: ""
});

export default userContext;
export const UserProvider= userContext.Provider;