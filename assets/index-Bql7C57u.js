import{j as d,A as i}from"./index-BsfVAUQm.js";const s=document.createElement("style");s.appendChild(document.createTextNode(`[data-bspk=avatar-group] {
  width: 100%;
}
[data-bspk=avatar-group] [data-wrap] {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: end;
  overflow: hidden;
}
[data-bspk=avatar-group] [data-gap="01"] {
  gap: var(--spacing-sizing-01);
}
[data-bspk=avatar-group] [data-gap="02"] {
  gap: var(--spacing-sizing-02);
}
[data-bspk=avatar-group] [data-stacked="02"]:not(:last-child) {
  margin-right: -8px;
}
[data-bspk=avatar-group] [data-stacked="01"]:not(:last-child) {
  margin-right: -4px;
}
`));document.head.appendChild(s);function u({items:a,size:t="small",max:r=5,variant:e}){if(!Array.isArray(a)||!(a!=null&&a.length))return null;const n=a.length-r,p=t==="x-small"||t==="small";return d.jsx("div",{"data-bspk":"avatar-group","data-max":r,"data-size":t,"data-variant":e,children:d.jsxs("div",{"data-gap":e==="spread"?p?"01":"02":void 0,"data-wrap":!0,children:[a.slice(0,r).map((o,l)=>d.jsx(i,{"data-stacked":e==="stacked"?p?"01":"02":void 0,...o,size:t},l)),n>0&&d.jsx("div",{"aria-hidden":!0,"data-bspk":"avatar","data-color":"white","data-size":t,children:d.jsxs("span",{"data-overflow-count":!0,children:["+",n]})})]})})}export{u as AvatarGroup};
