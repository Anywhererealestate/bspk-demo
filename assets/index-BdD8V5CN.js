import{j as a,r as o,E as l}from"./index-B9nh3IQ5.js";const s=document.createElement("style");s.appendChild(document.createTextNode(`[data-bspk=chip] {
  flex-direction: row;
  gap: var(--spacing-sizing-02);
  height: var(--spacing-sizing-08);
  text-wrap: nowrap;
  font: var(--labels-small);
  color: var(--foreground-neutral-on-surface-variant-01);
  background-color: var(--surface-neutral-t1-base);
  border: 1px solid var(--stroke-neutral-low);
  border-radius: var(--radius-sm);
  padding: 0 var(--spacing-sizing-03);
}
[data-bspk=chip] [data-touch-target] {
  min-width: var(--spacing-sizing-12);
  min-height: var(--spacing-sizing-12);
}
[data-bspk=chip]:not([data-flat]) {
  box-shadow: var(--drop-shadow-raise);
}
[data-bspk=chip][data-variant=filter] {
  cursor: pointer;
}
[data-bspk=chip][data-disabled] {
  color: var(--foreground-neutral-disabled-on-surface);
  cursor: not-allowed;
  border-color: var(--stroke-neutral-disabled-light);
  background-color: var(--interactions-disabled-opacity);
}
[data-bspk=chip]:not([data-disabled]):hover {
  background-color: var(--interactions-neutral-hover-opacity);
}
[data-bspk=chip]:not([data-disabled]):active {
  background-color: var(--interactions-neutral-press-opacity);
}
[data-bspk=chip]:not([data-disabled]):focus {
  outline: 1px solid var(--stroke-neutral-focus);
  border-color: var(--stroke-neutral-focus);
}
[data-bspk=chip][data-selected] {
  background-color: var(--surface-brand-primary-highlight);
  border-color: var(--stroke-brand-primary);
}
[data-bspk=chip] [data-chip-icon] {
  display: flex;
  align-items: center;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(s);function h({flat:i=!1,disabled:e=!1,label:n,selected:c=!1,leadingIcon:d,onClick:p,trailingIcon:t,trailingBadge:r}){return a.jsxs("button",{"data-bspk":"chip","data-disabled":e||void 0,"data-flat":i||void 0,"data-selected":c||void 0,"data-touch-target-parent":!0,disabled:e,onClick:e?void 0:p,children:[o.isValidElement(d)&&a.jsx("span",{"aria-hidden":"true","data-chip-icon":!0,children:d}),a.jsx("span",{children:n}),o.isValidElement(t)&&a.jsx("span",{"aria-hidden":"true","data-chip-icon":!0,children:t}),r&&!t&&a.jsx(l,{count:r.count,size:r.size,surfaceBorder:r.surfaceBorder}),a.jsx("span",{"data-touch-target":!0})]})}export{h as Chip};
