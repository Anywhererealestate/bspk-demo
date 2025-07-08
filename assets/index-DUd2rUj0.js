import{e as reactExports,j as jsxRuntimeExports,c as cssWithVars}from"./index-B6c-xvyP.js";const style=document.createElement("style");style.appendChild(document.createTextNode(`[data-bspk=progress-bar] {
  /*! --width: is set via inline style */
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--spacing-sizing-01);
}
[data-bspk=progress-bar] progress {
  opacity: 0;
  position: absolute;
}
[data-bspk=progress-bar] [data-bar] {
  width: 100%;
  height: var(--spacing-sizing-02);
  background-color: var(--surface-neutral-t3-low);
  border-radius: var(--radius-small);
}
[data-bspk=progress-bar] [data-bar]::after {
  content: "";
  display: block;
  height: 100%;
  background-color: var(--foreground-brand-primary);
  border-radius: var(--radius-small);
  width: var(--width);
  transition: width 0.3s;
}
[data-bspk=progress-bar][data-size=small] [data-bar] {
  height: var(--spacing-sizing-01);
}
[data-bspk=progress-bar] label {
  font-size: var(--labels-small);
  width: 100%;
  text-align: center;
}
[data-bspk=progress-bar][data-align=left] label {
  text-align: left;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(style);function ProgressBar({size="large",completion=0,align="center",label}){const id=reactExports.useId();return jsxRuntimeExports.jsxs("div",{"data-align":align,"data-bspk":"progress-bar","data-size":size,children:[jsxRuntimeExports.jsxs("progress",{"aria-busy":completion<100,"aria-label":"A bounded progress bar from 0 to 100","aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":completion,id,max:"100",value:completion,children:[completion,"%"]}),jsxRuntimeExports.jsx("div",{"aria-hidden":!0,"data-bar":!0,style:cssWithVars({"--width":`${completion}%`})}),jsxRuntimeExports.jsx("label",{htmlFor:id,children:label})]})}ProgressBar.bspkName="ProgressBar";export{ProgressBar};
