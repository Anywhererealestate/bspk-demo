import{j as r,a as p,p as g,r as l}from"./index-DhaZVVcF.js";import{SvgKeyboardArrowUp as v}from"./KeyboardArrowUp-BqTXdqUo.js";const u=document.createElement("style");u.appendChild(document.createTextNode(`[data-bspk=accordion] {
  width: 100%;
}
[data-bspk=accordion] [data-accordion-section] {
  --border-bottom-color: var(--stroke-neutral-base);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
[data-bspk=accordion] [data-accordion-section][data-divider] [data-not-a-divider-divider] {
  display: block;
  height: 1px;
  width: calc(100% - var(--spacing-sizing-04));
  margin: -1px var(--spacing-sizing-02) 0;
  background-color: var(--border-bottom-color);
}
[data-bspk=accordion] [data-accordion-section][data-disabled] {
  --border-bottom-color: var(--stroke-neutral-disabled-light);
  background: linear-gradient(var(--interactions-disabled-opacity), var(--interactions-disabled-opacity)), linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
  color: var(--foreground-neutral-disabled-on-surface);
}
[data-bspk=accordion] [data-accordion-section] [data-accordion-header] {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: none;
  color: inherit;
  border: none;
  padding: var(--spacing-sizing-02);
  gap: var(--spacing-sizing-04);
  font: inherit;
  outline: inherit;
  cursor: pointer;
}
[data-bspk=accordion] [data-accordion-section] [data-accordion-header] [data-accordion-header-body] {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex: 1;
  gap: var(--spacing-sizing-03);
}
[data-bspk=accordion] [data-accordion-section] [data-accordion-header] [data-accordion-title-wrapper] {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
}
[data-bspk=accordion] [data-accordion-section] [data-accordion-header] [data-accordion-title-wrapper] [data-bspk=txt] {
  text-align: left;
}
[data-bspk=accordion] [data-accordion-section] [data-accordion-header]:not(:disabled):hover {
  background-image: linear-gradient(var(--interactions-neutral-hover-opacity), var(--interactions-neutral-hover-opacity)), linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
}
[data-bspk=accordion] [data-accordion-section] [data-accordion-header]:not(:disabled):active {
  background-image: linear-gradient(var(--interactions-neutral-press-opacity), var(--interactions-neutral-press-opacity)), linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
}
[data-bspk=accordion] [data-accordion-section] [data-accordion-header]:not(:disabled):focus-visible {
  outline: 2px solid var(--stroke-neutral-focus);
  border-color: var(--stroke-neutral-focus);
  margin-bottom: 1px;
}
[data-bspk=accordion] [data-accordion-section] [data-accordion-header]:disabled {
  cursor: not-allowed;
  color: var(--foreground-neutral-disabled-on-surface);
  border-color: var(--stroke-neutral-disabled-light);
}
[data-bspk=accordion] [data-accordion-section] [data-accordion-content] {
  padding: var(--spacing-sizing-01) var(--spacing-sizing-02) var(--spacing-sizing-04);
}
[data-bspk=accordion] [data-accordion-section] [data-not-a-divider-divider] {
  display: none;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(u);function f({children:o,title:s,subTitle:d,leading:n,isOpen:t=!1,toggleOpen:a,divider:e=!0,trailing:c,disabled:i=!1,id:b}){return r.jsxs("section",{"data-accordion-section":!0,"data-disabled":i||void 0,"data-divider":e||void 0,id:b,children:[r.jsxs("button",{"aria-expanded":!!t,"data-accordion-header":!0,disabled:i,onClick:i?void 0:a,children:[r.jsxs("span",{"data-accordion-header-body":!0,children:[n??null,r.jsxs("span",{"data-accordion-title-wrapper":!0,children:[r.jsx(p,{variant:"labels-base",children:s}),!!d&&r.jsx(p,{variant:"body-x-small",children:d})]}),c??null]}),t?r.jsx(v,{}):r.jsx(g,{})]}),t&&r.jsx("div",{"data-accordion-content":!0,children:o}),r.jsx("div",{"data-not-a-divider-divider":!0})]})}function k({items:o,singleOpen:s=!0}){const[d,n]=l.useState(()=>o.filter(a=>a.isOpen).map(a=>a.id));l.useEffect(()=>{n(o.filter(a=>a.isOpen).map(a=>a.id))},[o]);const t=a=>{n(e=>{const c=e.includes(a);return s?c?[]:[a]:c?e.filter(i=>i!==a):[...e,a]})};return r.jsx("div",{"data-bspk":"accordion",children:o.map((a,e)=>l.createElement(f,{...a,isOpen:d.includes(a.id),key:`${a.id}-${e}`,toggleOpen:()=>t(a.id)},a.children))})}export{k as Accordion};
