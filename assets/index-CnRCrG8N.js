import{j as a,e as o,f as l,g,h as c}from"./index-DhaZVVcF.js";import{SvgWarningFill as p}from"./WarningFill-DAAIKsJB.js";const s=document.createElement("style");s.appendChild(document.createTextNode(`[data-bspk=banner-alert] {
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
[data-bspk=banner-alert] [data-content] header button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0 0 0 auto;
  color: var(--foreground-neutral-on-surface-variant-01);
  height: var(--spacing-sizing-08);
  width: var(--spacing-sizing-08);
}
@media (any-pointer: coarse) {
  [data-bspk=banner-alert] [data-content] header button {
    height: var(--spacing-sizing-12);
    width: var(--spacing-sizing-12);
  }
}
[data-bspk=banner-alert] [data-content] header button svg {
  width: var(--spacing-sizing-04);
  height: var(--spacing-sizing-04);
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
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 var(--spacing-sizing-03);
  height: var(--spacing-sizing-12);
  font: var(--labels-small);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(s);function u({variant:r="informational",onClose:e,header:t,callToAction:n,body:i,elevated:d=!1}){return a.jsxs("div",{"data-bspk":"banner-alert","data-elevated":d||void 0,"data-variant":r,role:"alert",children:[a.jsxs("div",{"data-icon-bar":!0,children:[r==="error"&&a.jsx(o,{}),r==="informational"&&a.jsx(l,{}),r==="success"&&a.jsx(g,{}),r==="warning"&&a.jsx(p,{})]}),a.jsxs("div",{"data-content":!0,children:[(t||e)&&a.jsxs("header",{children:[a.jsx("span",{children:t}),typeof e=="function"&&a.jsx("button",{"aria-label":"Close",onClick:e,type:"button",children:a.jsx(c,{})})]}),a.jsxs("div",{"data-body":!0,children:[a.jsx("span",{children:i}),(n==null?void 0:n.label)&&(n==null?void 0:n.onClick)&&a.jsx("button",{onClick:n.onClick,children:n.label})]})]})]})}export{u as BannerAlert};
