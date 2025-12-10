import{z as v,D as w,o as y,p as E,j as e,B as k,w as B,M as I,E as D,L as O,y as b,G as S,u as z,H as f,T as A}from"./index-BojzlPhd.js";import{SvgMoreHoriz as C}from"./MoreHoriz-HGlrnFoT.js";const g=document.createElement("style");g.appendChild(document.createTextNode(`[data-bspk=breadcrumb] {
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
`));document.head.appendChild(g);function L({items:u,id:n,scrollLimit:p}){const s=`${n}-menu`,r=v(`breadcrumb-${n}`,u),{activeElementId:i,setActiveElementId:x,arrowKeyCallbacks:o}=w({ids:r.map(a=>a.id)}),h=()=>x(null),t=!!i,{elements:d,floatingStyles:j}=y({hide:!t,offsetOptions:4,refWidth:!1});E({elements:[d.floating,d.reference],callback:()=>h(),disabled:!t});const c=()=>{var a,l;if(!t){(a=d.reference)==null||a.click();return}i&&((l=S(i))==null||l.click())};return e.jsxs("li",{children:[e.jsx(k,{"aria-activedescendant":t&&i||void 0,"aria-controls":t?s:void 0,"aria-expanded":t,"aria-haspopup":"listbox","aria-owns":s,icon:e.jsx(C,{}),iconOnly:!0,innerRef:d.setReference,label:`Access to ${r.length} pages`,name:`${name}-country-code`,onClick:a=>{var m;x(!t&&((m=r[0])==null?void 0:m.id)||null),a.preventDefault()},onKeyDown:B({...o,ArrowDown:a=>{var l;t||c(),(l=o.ArrowDown)==null||l.call(o,a)},Space:c,Enter:c,Escape:h,"Ctrl+Option+Space":c},{preventDefault:!0,stopPropagation:!0}),role:"combobox",size:"small",variant:"tertiary"}),t&&e.jsx(I,{id:s,innerRef:d.setFloating,label:"Expanded breadcrumb",owner:"Breadcrumb",role:"menu",style:{...D(p,r.length),...j,width:"fit-content",maxWidth:"300px",minWidth:"150px"},children:r.map(a=>e.jsx(O,{...a,active:i===a.id,tabIndex:-1},a.id))}),e.jsx(b,{"aria-hidden":!0})]})}function M({id:u,items:n=[],scrollLimit:p}){const s=z(u);return n.length<2?null:e.jsx("nav",{"aria-label":"Breadcrumb","data-bspk":"breadcrumb",id:s,children:e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx(f,{href:n[0].href,label:n[0].label}),e.jsx(b,{"aria-hidden":!0})]}),n.length>5?e.jsx(L,{id:s,items:n.slice(1,n.length-1),scrollLimit:p}):n.slice(1,n.length-1).map((r,i)=>e.jsxs("li",{children:[e.jsx(f,{...r}),e.jsx(b,{"aria-hidden":!0})]},`Breadcrumb-${i}`)),e.jsx("li",{"aria-current":"true",children:e.jsx(A,{variant:"body-base",children:n[n.length-1].label})})]})})}export{M as Breadcrumb,L as BreadcrumbDropdown};
