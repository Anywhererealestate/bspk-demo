import{j as a,B as n}from"./index-BbuPn2hX.js";const e=document.createElement("style");e.appendChild(document.createTextNode(`[data-bspk=button-dock] {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: var(--spacing-sizing-02) var(--spacing-sizing-04);
  gap: var(--spacing-sizing-04);
}
[data-bspk=button-dock][data-arrangement=fill] {
  display: flex;
}
[data-bspk=button-dock][data-arrangement=fill] [data-bspk=button] {
  flex: 1;
}
[data-bspk=button-dock][data-arrangement=spread] {
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  align-items: center;
  width: 100%;
}
[data-bspk=button-dock][data-arrangement=spread] [data-bspk=button] {
  min-width: var(--spacing-sizing-12);
  justify-self: stretch;
}
[data-bspk=button-dock][data-arrangement=spread] [data-bspk=button]:first-child {
  grid-column: 1;
}
[data-bspk=button-dock][data-arrangement=spread] [data-bspk=button]:last-child {
  grid-column: 3;
}
[data-bspk=button-dock][data-mode=fixed] {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background: var(--surface-neutral-t1-base);
  box-shadow: var(--drop-shadow-north);
  z-index: var(--z-index-button-dock);
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(e);function c({primaryButton:d,secondaryButton:t,arrangement:i="fill",mode:r="inline"}){const o=t?i:"fill";return a.jsxs("div",{"data-arrangement":o,"data-bspk":"button-dock","data-mode":r,children:[t&&a.jsx(n,{size:"medium",variant:"secondary",...t}),a.jsx(n,{size:"medium",variant:"primary",...d})]})}export{c as ButtonDock};
