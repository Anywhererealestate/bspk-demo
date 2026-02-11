import{j as s,k as n}from"./index-CCPwwar8.js";const t=document.createElement("style");t.appendChild(document.createTextNode(`ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation] {
  width: 100%;
  border-top: solid 1px var(--stroke-neutral-low);
  box-sizing: border-box;
  background-color: var(--background-base);
  height: var(--spacing-sizing-13);
  gap: var(--spacing-sizing-02);
}
ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation][data-variant=elevated] {
  box-shadow: var(--drop-shadow-north);
}
ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation]:has(:focus-visible) {
  outline: none;
}
ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation] li {
  flex: 1;
  position: relative;
  height: var(--spacing-sizing-13);
  color: var(--foreground-neutral-on-surface-variant-02);
  font: var(--labels-x-small);
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation] li[data-pseudo=focus] > ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation] li, ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation] li:focus-visible {
  outline: solid 2px var(--stroke-neutral-focus);
  isolation: isolate;
}
ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation] li[aria-selected=true] {
  color: var(--foreground-brand-primary);
}
ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation] li[aria-selected=true]::after {
  content: "";
  position: absolute;
  top: 0;
  width: var(--spacing-sizing-06);
  height: 2px;
  border-radius: 0 0 2px 2px;
  background-color: var(--foreground-brand-primary);
}
ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation] li[aria-disabled=true] {
  color: var(--foreground-neutral-disabled-on-surface);
}
[data-pseudo=hover] ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation] li:not([aria-disabled=true]), ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation] li:not([aria-disabled=true]):hover {
  background-color: var(--interactions-neutral-hover-opacity);
}
[data-pseudo=active] ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation] li:not([aria-disabled=true]), ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation] li:not([aria-disabled=true]):active {
  background-color: var(--interactions-neutral-press-opacity);
}
ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation] li:first-child {
  padding-left: var(--spacing-sizing-02);
}
ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation] li:last-child {
  padding-right: var(--spacing-sizing-02);
}
ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation][data-mode=fixed] {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background: var(--surface-neutral-t1-base);
  box-shadow: var(--drop-shadow-north);
  z-index: var(--z-index-button-dock);
}

@media (width >= 640px) {
  ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation] li {
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-sizing-02);
  }
  ul[data-bspk-utility=tab-list][data-bspk=bottom-navigation] li[data-active=true]::after {
    width: var(--spacing-sizing-12);
  }
}
/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(t);function d({mode:a="inline",variant:i="flat",...o}){return s.jsx(n,{"data-bspk":"bottom-navigation","data-mode":a,"data-variant":i,size:"large",...o})}export{d as BottomNavigation};
