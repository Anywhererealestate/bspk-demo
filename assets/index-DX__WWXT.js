import{j as t,r as l}from"./index-BbuPn2hX.js";import{Chip as n}from"./index-cnzWhJoB.js";const e=document.createElement("style");e.appendChild(document.createTextNode(`[data-bspk=chip-group] {
  display: flex;
  gap: var(--spacing-sizing-02);
  width: 100%;
  flex-flow: row wrap;
  padding-bottom: var(--spacing-sizing-01);
}
[data-bspk=chip-group]:empty {
  display: none;
}
[data-bspk=chip-group][data-scroll] {
  overflow: auto;
  flex-wrap: nowrap;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(e);function c({overflow:r="wrap",items:a}){return t.jsx("div",{"data-bspk":"chip-group","data-scroll":r==="scroll"||void 0,children:a!=null&&a.length?a.map((p,o)=>l.createElement(n,{...p,key:p.label??o})):null})}export{c as ChipGroup};
