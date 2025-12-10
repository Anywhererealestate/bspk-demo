import{j as r,h as u}from"./index-BojzlPhd.js";const s=document.createElement("style");s.appendChild(document.createTextNode(`[data-bspk=badge-dot] {
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
`));document.head.appendChild(s);const o={6:1,8:2,10:2,12:2};function c({children:a,color:n="primary",size:t=6,outline:i=!1}){const e=t in o?t:6,d=r.jsx("sup",{"data-attachment":!!a||void 0,"data-bspk":"badge-dot","data-color":n,"data-outline":i||void 0,style:u({"--size":`${e}px`,"--outline-width":`${o[e]}px`})});return a?r.jsxs("span",{"data-attachment-wrapper":!0,children:[a,d]}):d}export{c as BadgeDot};
