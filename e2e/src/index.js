import "./styles.css";

import { renderValidatorWidget } from "./app";
import { bindValidatorDom } from "./dom";

const mountEl = document.getElementById("app");
if (!mountEl) {
  throw new Error("Mount element #app not found");
}

const widget = renderValidatorWidget();
mountEl.appendChild(widget);
bindValidatorDom(widget);
