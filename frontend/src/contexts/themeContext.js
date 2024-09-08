import { createContext } from "react";

const themeContext= createContext({
    theme: "dark",
    changeTheme: ()=>{}
});

export default themeContext;
export const ThemeProvider= themeContext.Provider;