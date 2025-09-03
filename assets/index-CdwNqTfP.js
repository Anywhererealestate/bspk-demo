import{u as g,i as x,j as e,L as c,k as n,B as j,M as f,l as y,a as v}from"./index-DhaZVVcF.js";import{SvgMoreHoriz as k}from"./MoreHoriz-BIlUU59r.js";const m=document.createElement("style");m.appendChild(document.createTextNode(`[data-bspk=breadcrumb] {
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
`));document.head.appendChild(m);function $({id:u,items:r}){const l=g(u),a=Array.isArray(r)?r:[],{elements:d,isOpen:h,menuProps:o,toggleProps:p,activeIndex:b}=x({refWidth:!1}),t=a.slice(1,a.length-1);return a.length<2?null:e.jsx("nav",{"aria-label":"Breadcrumb","data-bspk":"breadcrumb",id:l,children:e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx(c,{href:a[0].href,label:a[0].label}),e.jsx(n,{"aria-hidden":!0})]}),a.length>5?e.jsxs("li",{children:[e.jsx(j,{icon:e.jsx(k,{}),iconOnly:!0,innerRef:d.setReference,label:`Access to ${t.length} pages`,size:"small",toolTip:`${t.length} pages`,variant:"tertiary",...p}),h&&e.jsx(f,{innerRef:d.setFloating,itemCount:t.length,itemDisplayCount:t.length<=10?t.length:10,...o,role:"navigation",style:{...o.style,width:"200px"},children:t.map((i,s)=>e.jsx(y,{...i,active:b===s||void 0,id:`${l}-item-${s}`},`Breadcrumb-${s}`))}),e.jsx(n,{"aria-hidden":!0})]}):t.map((i,s)=>e.jsxs("li",{children:[e.jsx(c,{...i}),e.jsx(n,{"aria-hidden":!0})]},`Breadcrumb-${s}`)),e.jsx("li",{"aria-current":"true",children:e.jsx(v,{variant:"body-base",children:a[a.length-1].label})})]})})}export{$ as Breadcrumb};
