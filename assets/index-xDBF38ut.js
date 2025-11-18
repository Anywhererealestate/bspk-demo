import{j as t}from"./index-B9nh3IQ5.js";import{SvgStarFill as e}from"./StarFill-D2EmfONN.js";const c=document.createElement("style");c.appendChild(document.createTextNode(`[data-bspk=rating] {
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
`));document.head.appendChild(c);const d=5,l={large:32,medium:24,small:16};function u({size:i="medium",value:a,onChange:n}){return n?t.jsx("div",{"aria-label":a?`${a} out of ${d} stars`:"Select a star rating","data-bspk":"rating","data-size":i,role:"radiogroup",children:Array.from({length:d},(f,r)=>{const s=g(r+1,a),o=a!==void 0&&Math.floor(a)===r;return t.jsxs("button",{"aria-checked":o,"aria-label":`Rate ${r+1}`,"data-fill":s,"data-star":!0,onClick:()=>n==null?void 0:n(r+1),role:"radio",tabIndex:o?0:-1,type:"button",children:[t.jsx(e,{width:l[i]}),s==="half"&&t.jsx("div",{"data-fill-half":!0,children:t.jsx("div",{"data-star":!0,children:t.jsx(e,{width:l[i]})})})]},r)})}):t.jsx("div",{"aria-label":a?`${a} out of ${d} stars`:"Rating","data-bspk":"rating","data-size":i,role:"img",children:Array.from({length:d},(f,r)=>{const s=g(r+1,a);return t.jsxs("div",{"data-fill":s,"data-star":!0,role:"presentation",tabIndex:-1,children:[t.jsx(e,{width:l[i]}),s==="half"&&t.jsx("div",{"data-fill-half":!0,children:t.jsx("div",{"data-star":!0,children:t.jsx(e,{width:l[i]})})})]},r)})})}function g(i,a){if(a!==void 0){if(a>=i)return"full";if(a==i-.5)return"half"}}export{u as Rating};
