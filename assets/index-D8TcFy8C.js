import{j as a,A as n}from"./index-BojzlPhd.js";import{Breadcrumb as p}from"./index-CFiwPdk2.js";import"./MoreHoriz-HGlrnFoT.js";const r=document.createElement("style");r.appendChild(document.createTextNode(`[data-bspk=page-header] {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--background-base);
}
[data-bspk=page-header] [data-breadcrumb] {
  padding: var(--spacing-sizing-05) var(--spacing-sizing-05) 0;
}
[data-bspk=page-header] [data-header] {
  padding: var(--spacing-sizing-05);
  display: flex;
  justify-content: space-between;
  align-items: end;
}
[data-bspk=page-header] [data-header] [data-title] {
  display: flex;
  align-items: center;
  gap: var(--spacing-sizing-03);
}
[data-bspk=page-header] [data-header] [data-title] h1 {
  margin: 0;
  font: var(--heading-h3);
}
[data-bspk=page-header] [data-header][data-has-avatar] {
  align-items: center;
}
[data-bspk=page-header] [data-subheader] {
  padding: 0 var(--spacing-sizing-05);
  display: flex;
  align-items: end;
  justify-content: space-between;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(r);function l({actions:d,breadcrumb:t,avatar:e,subHeader:i,title:s}){return a.jsxs("span",{"data-bspk":"page-header",children:[t&&a.jsx("div",{"data-breadcrumb":!0,children:a.jsx(p,{...t})}),a.jsxs("div",{"data-has-avatar":!!e,"data-header":!0,children:[a.jsxs("div",{"data-title":!0,children:[e&&a.jsx(n,{...e,size:"xx-large"}),a.jsx("h1",{children:s})]}),d&&a.jsx("div",{"data-page-actions":!0,children:d})]}),i&&a.jsx("div",{"data-subheader":!0,children:i})]})}export{l as PageHeader};
