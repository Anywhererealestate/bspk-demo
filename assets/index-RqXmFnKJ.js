import{u,l as b,j as e,L as t,m as l,B as h,a as x}from"./index-wsd66Ljd.js";import{SvgMoreHoriz as p}from"./MoreHoriz-KCbKVOmz.js";import{ListItemMenu as j}from"./index-BBAlGLyq.js";const n=document.createElement("style");n.appendChild(document.createTextNode(`[data-bspk=breadcrumb] {
  width: 100%;
}
[data-bspk=breadcrumb] ol {
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  list-style: none;
  gap: var(--spacing-sizing-02);
}
[data-bspk=breadcrumb] ol li {
  display: flex;
  gap: var(--spacing-sizing-02);
}
`));document.head.appendChild(n);function v({id:d,items:c=[],scrollLimit:o}){const s=u(d),a=b(`breadcrumb-${s}`,c);return a.length<2?null:e.jsx("nav",{"aria-label":"Breadcrumb","data-bspk":"breadcrumb",id:s,children:e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx(t,{href:a[0].href,label:a[0].label}),e.jsx(l,{"aria-hidden":!0})]}),a.length>5?e.jsxs("li",{children:[e.jsx(j,{hideWhenClosed:!0,itemOnClick:({setShow:r})=>r(!1),items:a.slice(1,a.length-1),label:"Expanded breadcrumb",owner:"Breadcrumb",placement:"bottom",role:"menu",scrollLimit:o,width:"200px",children:(r,{setRef:i,itemCount:m})=>e.jsx(h,{...r,icon:e.jsx(p,{}),iconOnly:!0,innerRef:i,label:`Access to ${m} pages`,onClick:r.onClick,size:"small",variant:"tertiary"})}),e.jsx(l,{"aria-hidden":!0})]}):a.slice(1,a.length-1).map((r,i)=>e.jsxs("li",{children:[e.jsx(t,{...r}),e.jsx(l,{"aria-hidden":!0})]},`Breadcrumb-${i}`)),e.jsx("li",{"aria-current":"true",children:e.jsx(x,{variant:"body-base",children:a[a.length-1].label})})]})})}export{v as Breadcrumb};
