import{j as r}from"./index-CD4JLMnK.js";import{SvgStarFill as d}from"./StarFill-CDe81EiV.js";const g=document.createElement("style");g.appendChild(document.createTextNode(`[data-bspk=rating] {
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

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(g);const l=5,o={large:32,medium:24,small:16};function b({size:i="medium",value:t,onChange:a}){const c=a?"button":"div";return r.jsx("div",{"aria-label":a?"Select a star rating":t?`${t} out of ${l} stars`:"Rating","data-bspk":"rating","data-size":i,role:a?"radiogroup":"img",children:Array.from({length:l},(u,s)=>{const e=p(s+1,t),n=t!==void 0&&Math.floor(t)===s;return r.jsxs(c,{"aria-checked":n,"aria-hidden":!a,"aria-label":a?`Rate ${s+1}`:void 0,"data-fill":e,"data-star":!0,onClick:()=>a==null?void 0:a(s+1),role:a?"radio":"presentation",tabIndex:a&&n?0:-1,type:"button",children:[r.jsx(d,{width:o[i]}),e==="half"&&r.jsx("div",{"data-fill-half":!0,children:r.jsx("div",{"data-star":!0,children:r.jsx(d,{width:o[i]})})})]},s)})})}function p(i,t){if(t!==void 0){if(t>=i)return"full";if(t==i-.5)return"half"}}export{b as Rating};
