// esbuild entry: bundle React 18 from node_modules and expose it as the
// globals the kit + app screens expect (window.React / window.ReactDOM).
// The app was written for an in-browser Babel + UMD-React setup; this makes
// the same global-scope code run from a self-contained, CDN-free bundle.
import React from "react";
import * as ReactDOMClient from "react-dom/client";
window.React = React;
window.ReactDOM = ReactDOMClient;
