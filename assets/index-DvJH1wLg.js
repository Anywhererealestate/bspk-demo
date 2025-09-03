import{j as d,d as n}from"./index-DhaZVVcF.js";const r=document.createElement("style");r.appendChild(document.createTextNode(`[data-bspk=badge-dot] {
  /*! 
  --size: is set via inline style 
  --outline-width: is set via inline style
  */
  display: block;
  width: var(--size, 6px);
  height: var(--size, 6px);
  border-radius: var(--radius-full);
  background-color: var(--background);
}
[data-bspk=badge-dot][data-color=primary] {
  --background: var(--foreground-brand-primary);
}
[data-bspk=badge-dot][data-color=secondary] {
  --background: var(--foreground-brand-secondary);
}
[data-bspk=badge-dot][data-outline] {
  border: var(--outline-width) solid var(--surface-neutral-t1-base);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(r);const i={6:1,8:2,10:2,12:2};function l({children:a,color:o="primary",size:t=6,outline:s=!1}){const e=d.jsx("sup",{"data-attachment":!!a||void 0,"data-bspk":"badge-dot","data-color":o,"data-outline":s||void 0,style:n({"--size":`${t}px`,"--outline-width":`${i[t]}px`})});return a?d.jsxs("span",{"data-attachment-wrapper":!0,children:[a,e]}):e}export{l as BadgeDot};
