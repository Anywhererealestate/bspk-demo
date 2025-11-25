import{j as a,h as l,i as c,k as p,B as s,l as g}from"./index-C-uVBXFi.js";import{SvgWarningFill as b}from"./WarningFill-bRQgZdPm.js";const i=document.createElement("style");i.appendChild(document.createTextNode(`[data-bspk=banner-alert] {
  --color: var(--status-information);
  --on-color: var(--status-on-information);
  display: flex;
  flex-direction: row;
  border: 2px solid var(--color);
  border-radius: var(--radius-md);
  background-color: var(--surface-neutral-t1-base);
  width: 100%;
}
[data-bspk=banner-alert][data-variant=error] {
  --color: var(--status-error);
  --on-color: var(--status-on-error);
}
[data-bspk=banner-alert][data-variant=success] {
  --color: var(--status-success);
  --on-color: var(--status-on-success);
}
[data-bspk=banner-alert][data-variant=warning] {
  --color: var(--status-warning);
  --on-color: var(--status-on-warning);
}
[data-bspk=banner-alert][data-elevated] {
  box-shadow: var(--drop-shadow-raise);
}
[data-bspk=banner-alert] [data-icon-bar] {
  flex: 1;
  padding: var(--spacing-sizing-04) var(--spacing-sizing-03);
  background: var(--color);
  color: var(--on-color);
}
[data-bspk=banner-alert] [data-icon-bar] svg {
  width: var(--spacing-sizing-06);
  height: var(--spacing-sizing-06);
}
[data-bspk=banner-alert] [data-content] {
  flex: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-sizing-02) var(--spacing-sizing-02) var(--spacing-sizing-02) var(--spacing-sizing-04);
}
[data-bspk=banner-alert] [data-content] header {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-sizing-03);
  height: var(--spacing-sizing-12);
  align-items: center;
}
[data-bspk=banner-alert] [data-content] header span {
  flex: 1;
  display: flex;
  align-items: center;
  color: var(--foreground-neutral-on-surface);
  font: var(--heading-h6);
}
@media (any-pointer: coarse) {
  [data-bspk=banner-alert] [data-content] header span {
    font: var(--heading-h6);
  }
}
[data-bspk=banner-alert] [data-content] [data-body] {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sizing-02);
  padding: 0 var(--spacing-sizing-02) var(--spacing-sizing-02) 0;
}
[data-bspk=banner-alert] [data-content] [data-body] span {
  font: var(--body-base);
}
[data-bspk=banner-alert] [data-content] [data-body] button {
  margin-left: auto;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(i);function x({variant:n="informational",onClose:e,header:t,callToAction:r,body:d,elevated:o=!1}){return a.jsxs("div",{"data-bspk":"banner-alert","data-elevated":o||void 0,"data-variant":n,role:"alert",children:[a.jsxs("div",{"data-icon-bar":!0,children:[n==="error"&&a.jsx(l,{}),n==="informational"&&a.jsx(c,{}),n==="success"&&a.jsx(p,{}),n==="warning"&&a.jsx(b,{})]}),a.jsxs("div",{"data-content":!0,children:[(t||e)&&a.jsxs("header",{children:[a.jsx("span",{children:t}),typeof e=="function"&&a.jsx(s,{icon:a.jsx(g,{}),iconOnly:!0,label:"Close",onClick:e,size:"small",variant:"tertiary"})]}),a.jsxs("div",{"data-body":!0,children:[a.jsx("span",{children:d}),(r==null?void 0:r.label)&&(r==null?void 0:r.onClick)&&a.jsx(s,{label:r.label,onClick:r.onClick,size:"small",variant:"tertiary"})]})]})]})}export{x as BannerAlert};
