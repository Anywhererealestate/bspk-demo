import{m as p,j as a}from"./index-RrEq3ZfG.js";import{SvgStarFill as n}from"./StarFill-CTSJ1u_O.js";const h=document.createElement("style");h.appendChild(document.createTextNode(`[data-bspk=rating] {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
}
[data-bspk=rating][data-size=small] [data-star] {
  width: var(--spacing-sizing-06);
  height: var(--spacing-sizing-06);
}
[data-bspk=rating][data-size=small] svg {
  width: var(--spacing-sizing-04);
  height: var(--spacing-sizing-04);
}
[data-bspk=rating][data-size=medium] [data-star] {
  width: var(--spacing-sizing-08);
  height: var(--spacing-sizing-08);
}
[data-bspk=rating][data-size=medium] svg {
  width: var(--spacing-sizing-06);
  height: var(--spacing-sizing-06);
}
[data-bspk=rating][data-size=large] [data-star] {
  width: var(--spacing-sizing-10);
  height: var(--spacing-sizing-10);
}
[data-bspk=rating][data-size=large] svg {
  width: var(--spacing-sizing-08);
  height: var(--spacing-sizing-08);
}
[data-bspk=rating] [data-star] {
  outline: none;
  cursor: default;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: var(--surface-neutral-t3-low);
}
[data-bspk=rating] [data-star]:is(button) {
  cursor: pointer;
}
[data-bspk=rating] [data-star]:is(button):hover {
  transform: scale(1.2);
}
[data-bspk=rating] [data-star]:is(button):focus-visible {
  outline: 1px solid var(--stroke-neutral-focus);
  border-color: var(--stroke-neutral-focus);
  margin-bottom: 1px;
}
[data-bspk=rating] [data-star][data-fill=full] {
  color: var(--status-warning);
}
[data-bspk=rating] [data-star] [data-fill-half] {
  position: absolute;
  inset: 0 50% 0 0;
  overflow: hidden;
}
[data-bspk=rating] [data-star] [data-fill-half] [data-star] {
  color: var(--status-warning);
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(h);const d=5,l={large:32,medium:24,small:16};function m({size:t="medium",value:s,onChange:g}){const[i,o]=p(s,g);return g?a.jsx("div",{"aria-label":i?`${i} out of ${d} stars`:"Select a star rating","data-bspk":"rating","data-size":t,role:"radiogroup",children:Array.from({length:d},(f,r)=>{const e=u(r+1,i),c=i!==void 0&&Math.floor(i)===r;return a.jsxs("button",{"aria-checked":c,"aria-label":`Rate ${r+1}`,"data-fill":e,"data-star":!0,onClick:()=>o==null?void 0:o(r+1),role:"radio",tabIndex:c?0:-1,type:"button",children:[a.jsx(n,{width:l[t]}),e==="half"&&a.jsx("div",{"data-fill-half":!0,children:a.jsx("div",{"data-star":!0,children:a.jsx(n,{width:l[t]})})})]},r)})}):a.jsx("div",{"aria-label":i?`${i} out of ${d} stars`:"Rating","data-bspk":"rating","data-size":t,role:"img",children:Array.from({length:d},(f,r)=>{const e=u(r+1,i);return a.jsxs("div",{"data-fill":e,"data-star":!0,role:"presentation",tabIndex:-1,children:[a.jsx(n,{width:l[t]}),e==="half"&&a.jsx("div",{"data-fill-half":!0,children:a.jsx("div",{"data-star":!0,children:a.jsx(n,{width:l[t]})})})]},r)})})}function u(t,s){if(s!==void 0){if(s>=t)return"full";if(s==t-.5)return"half"}}export{m as Rating};
