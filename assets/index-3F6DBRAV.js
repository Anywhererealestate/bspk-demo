import{r as c,d as m,j as t,S as h}from"./index-BJ5oyAgX.js";import{SvgKeyboardArrowUp as x}from"./KeyboardArrowUp-BdeL3m4s.js";const b=document.createElement("style");b.appendChild(document.createTextNode(`[data-bspk=accordion] {
  display: block;
  width: 100%;
  padding: var(--spacing-sizing-02);
}
[data-bspk=accordion]:empty {
  display: none;
}
[data-bspk=accordion] > [data-bspk=accordion-item] {
  --border-bottom-color: var(--stroke-neutral-base);
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--foreground-neutral-on-surface);
}
[data-bspk=accordion] > [data-bspk=accordion-item][data-disabled] {
  --border-bottom-color: var(--stroke-neutral-disabled-light);
  background: linear-gradient(var(--interactions-disabled-opacity), var(--interactions-disabled-opacity)), linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
  color: var(--foreground-neutral-disabled-on-surface);
}
[data-bspk=accordion] > [data-bspk=accordion-item] button[data-header] {
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
[data-bspk=accordion] > [data-bspk=accordion-item] button[data-header] [data-title-subtitle] {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
}
[data-bspk=accordion] > [data-bspk=accordion-item] button[data-header] [data-title-subtitle] [data-title] {
  font: var(--labels-base);
}
[data-bspk=accordion] > [data-bspk=accordion-item] button[data-header] [data-title-subtitle] [data-subtitle] {
  font: var(--body-x-small);
  color: var(--foreground-neutral-on-surface-variant-01);
}
[data-bspk=accordion] > [data-bspk=accordion-item] button[data-header] [data-arrow] {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--spacing-sizing-02);
}
[data-bspk=accordion] > [data-bspk=accordion-item] button[data-header] [data-arrow] svg {
  width: var(--spacing-sizing-06);
}
[data-bspk=accordion] > [data-bspk=accordion-item] button[data-header]:not(:disabled):hover {
  background-image: linear-gradient(var(--interactions-neutral-hover-opacity), var(--interactions-neutral-hover-opacity)), linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
}
[data-bspk=accordion] > [data-bspk=accordion-item] button[data-header]:not(:disabled):active {
  background-image: linear-gradient(var(--interactions-neutral-press-opacity), var(--interactions-neutral-press-opacity)), linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
}
[data-bspk=accordion] > [data-bspk=accordion-item] button[data-header]:disabled {
  cursor: not-allowed;
  color: var(--foreground-neutral-disabled-on-surface);
  border-color: var(--stroke-neutral-disabled-light);
}
[data-bspk=accordion] > [data-bspk=accordion-item]:has(:focus-visible) {
  outline: 2px solid var(--stroke-neutral-focus);
  border-color: var(--stroke-neutral-focus);
  margin-bottom: 1px;
}
[data-bspk=accordion] > [data-bspk=accordion-item] [data-content] {
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
`));document.head.appendChild(b);function w({items:l,singleOpen:g=!0}){const i=c.useMemo(()=>l.map(a=>({...a,id:a.id||`accordion-item-${m(8)}`,isOpen:a.disabled?!1:a.isOpen||!1})),[l]),[f,p]=c.useState(()=>i.filter(a=>a.isOpen).map(a=>a.id));c.useEffect(()=>{p(i.filter(a=>a.isOpen).map(a=>a.id))},[i]);const v=a=>()=>p(r=>{const n=r.includes(a);return g?n?[]:[a]:n?r.filter(o=>o!==a):[...r,a]});return t.jsx("div",{"data-bspk":"accordion",children:i.map(({children:a,title:r,subtitle:n,leading:o,trailing:u,disabled:d,id:e},k)=>{const s=f.includes(e);return t.jsxs("section",{"data-bspk":"accordion-item","data-disabled":d||void 0,id:e,children:[t.jsxs("button",{"aria-controls":`${e}-content`,"aria-expanded":s,"data-header":!0,disabled:d||void 0,onClick:d?void 0:v(e),children:[o&&t.jsx("span",{"data-leading":!0,children:o}),t.jsxs("span",{"data-title-subtitle":!0,children:[t.jsx("span",{"data-title":!0,children:r}),n&&t.jsx("span",{"data-subtitle":!0,children:n})]}),u&&t.jsx("span",{"data-trailing":!0,children:u}),t.jsx("span",{"data-arrow":!0,children:s?t.jsx(x,{}):t.jsx(h,{})})]}),s&&t.jsx("div",{"data-content":!0,id:`${e}-content`,children:a}),t.jsx("span",{"data-divider":!0})]},e||k)})})}export{w as Accordion};
