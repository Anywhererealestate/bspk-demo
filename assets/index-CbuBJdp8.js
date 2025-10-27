import{r as c,f as x,j as e,S as k}from"./index-BjWHQFAY.js";import{SvgKeyboardArrowUp as m}from"./KeyboardArrowUp-CVX76bE6.js";const b=document.createElement("style");b.appendChild(document.createTextNode(`[data-bspk=accordion] {
  width: 100%;
  padding: var(--spacing-sizing-02);
}
[data-bspk=accordion] > section {
  --border-bottom-color: var(--stroke-neutral-base);
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--foreground-neutral-on-surface);
}
[data-bspk=accordion] > section[data-disabled] {
  --border-bottom-color: var(--stroke-neutral-disabled-light);
  background: linear-gradient(var(--interactions-disabled-opacity), var(--interactions-disabled-opacity)), linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
  color: var(--foreground-neutral-disabled-on-surface);
}
[data-bspk=accordion] > section button[data-header] {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: none;
  color: inherit;
  border: none;
  padding: 0 var(--spacing-sizing-02);
  gap: var(--spacing-sizing-02);
  font: inherit;
  cursor: pointer;
  outline: none;
  min-height: var(--spacing-sizing-12);
}
[data-bspk=accordion] > section button[data-header] [data-title-subtitle] {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
}
[data-bspk=accordion] > section button[data-header] [data-title-subtitle] [data-title] {
  font: var(--labels-base);
}
[data-bspk=accordion] > section button[data-header] [data-title-subtitle] [data-subtitle] {
  font: var(--body-x-small);
  color: var(--foreground-neutral-on-surface-variant-01);
}
[data-bspk=accordion] > section button[data-header] [data-arrow] {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--spacing-sizing-02);
}
[data-bspk=accordion] > section button[data-header]:not(:disabled):hover {
  background-image: linear-gradient(var(--interactions-neutral-hover-opacity), var(--interactions-neutral-hover-opacity)), linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
}
[data-bspk=accordion] > section button[data-header]:not(:disabled):active {
  background-image: linear-gradient(var(--interactions-neutral-press-opacity), var(--interactions-neutral-press-opacity)), linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
}
[data-bspk=accordion] > section button[data-header]:disabled {
  cursor: not-allowed;
  color: var(--foreground-neutral-disabled-on-surface);
  border-color: var(--stroke-neutral-disabled-light);
}
[data-bspk=accordion] > section:has(:focus-visible) {
  outline: 2px solid var(--stroke-neutral-focus);
  border-color: var(--stroke-neutral-focus);
  margin-bottom: 1px;
}
[data-bspk=accordion] > section [data-content] {
  padding: var(--spacing-sizing-01) var(--spacing-sizing-02) var(--spacing-sizing-04);
}
[data-bspk=accordion] [data-divider] {
  display: block;
  height: 1px;
  width: calc(100% - var(--spacing-sizing-04));
  margin: -1px var(--spacing-sizing-02) 0;
  background-color: var(--border-bottom-color);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(b);function w({items:l,singleOpen:g=!0}){const i=c.useMemo(()=>l.map(a=>({...a,id:a.id||`accordion-item-${x(8)}`,isOpen:a.disabled?!1:a.isOpen||!1})),[l]),[f,u]=c.useState(()=>i.filter(a=>a.isOpen).map(a=>a.id));c.useEffect(()=>{u(i.filter(a=>a.isOpen).map(a=>a.id))},[i]);const v=a=>()=>u(r=>{const n=r.includes(a);return g?n?[]:[a]:n?r.filter(o=>o!==a):[...r,a]});return e.jsx("div",{"data-bspk":"accordion",children:i.map(({children:a,title:r,subtitle:n,leading:o,trailing:p,disabled:d,id:t},h)=>{const s=f.includes(t);return e.jsxs("section",{"data-disabled":d||void 0,id:t,children:[e.jsxs("button",{"aria-controls":`${t}-content`,"aria-expanded":s,"data-header":!0,disabled:d||void 0,onClick:d?void 0:v(t),children:[o&&e.jsx("span",{"data-leading":!0,children:o}),e.jsxs("span",{"data-title-subtitle":!0,children:[e.jsx("span",{"data-title":!0,children:r}),n&&e.jsx("span",{"data-subtitle":!0,children:n})]}),p&&e.jsx("span",{"data-trailing":!0,children:p}),e.jsx("span",{"data-arrow":!0,children:s?e.jsx(m,{}):e.jsx(k,{})})]}),s&&e.jsx("div",{"data-content":!0,"data-hidden":!s||void 0,id:`${t}-content`,children:a}),e.jsx("span",{"data-divider":!0})]},t||h)})})}export{w as Accordion};
