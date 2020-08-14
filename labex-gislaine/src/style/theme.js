import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
   "common": {
       "black": "#000",
       "white": "#fff"
   }, "background": {
       "paper": "rgba(255, 95, 0, 1)",
       "default": "rgba(0, 0, 0, 1)"
   }, "primary": {
       "light": "rgba(255, 95, 0, 1)",
       "main": "rgba(166, 62, 0, 1)",
       "dark": "rgba(34, 13, 0, 1)",
       "contrastText": "rgba(255, 229, 210, 1)"
   }, "secondary": {
       "light": "rgba(166, 62, 0, 1)",
       "main": "rgba(34, 13, 0, 1)",
       "dark": "rgba(0, 0, 0, 1)",
       "contrastText": "rgba(255, 95, 0, 1)"
   }, "error": {
       "light": "#e57373",
       "main": "#f44336",
       "dark": "#d32f2f",
       "contrastText": "#fff"
   }, "text": {
       "primary": "rgba(255, 229, 210, 1)",
       "secondary": "rgba(34, 13, 0, 1)",
       "disabled": "rgba(0, 0, 0, 1)",
       "hint": "rgba(255, 255, 255, 1)"
   }
 }
 });