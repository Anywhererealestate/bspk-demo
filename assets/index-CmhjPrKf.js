import{j as t,r as l}from"./index-B6u9ge13.js";import{Chip as n}from"./index-CrfPryP1.js";const p=document.createElement("style");p.appendChild(document.createTextNode(`[data-bspk=chip-group] {
  display: flex;
  gap: var(--spacing-sizing-02);
  width: 100%;
  flex-flow: row wrap;
  padding-bottom: var(--spacing-sizing-01);
}
[data-bspk=chip-group][data-scroll] {
  overflow: auto;
  flex-wrap: nowrap;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(p);function i({overflow:r="wrap",items:a}){return t.jsx("div",{"data-bspk":"chip-group","data-scroll":r==="scroll"||void 0,children:a!=null&&a.length?a.map((e,o)=>l.createElement(n,{...e,key:e.label??o})):null})}export{i as ChipGroup};
