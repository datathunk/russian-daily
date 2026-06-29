// Shim: map jsxDEV → jsx so CF Workers SSR doesn't crash on dev-mode React calls
export { jsx as jsxDEV, jsx, jsxs, Fragment } from "react/jsx-runtime";
