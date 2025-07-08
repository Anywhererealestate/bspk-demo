import{o as requireMoreHoriz,i as useId,k as useCombobox,j as jsxRuntimeExports,p as Link,B as Button,M as Menu,q as ListItem,T as Txt,s as ChevronRightExports}from"./index-B6c-xvyP.js";var MoreHorizExports=requireMoreHoriz();const style=document.createElement("style");style.appendChild(document.createTextNode(`[data-bspk=breadcrumb] {
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
`));document.head.appendChild(style);const BreadcrumbDivider=()=>jsxRuntimeExports.jsx(ChevronRightExports.SvgChevronRight,{"aria-hidden":!0});function Breadcrumb({id:propId,items:itemsProp}){const id=useId(propId),items=Array.isArray(itemsProp)?itemsProp:[],{elements,isOpen,menuProps,toggleProps,activeIndex}=useCombobox({refWidth:!1}),middleItems=items.slice(1,items.length-1);return items.length<2?null:jsxRuntimeExports.jsx("nav",{"aria-label":"Breadcrumb","data-bspk":"breadcrumb",id,children:jsxRuntimeExports.jsxs("ol",{children:[jsxRuntimeExports.jsxs("li",{children:[jsxRuntimeExports.jsx(Link,{href:items[0].href,label:items[0].label}),jsxRuntimeExports.jsx(BreadcrumbDivider,{})]}),items.length>5?jsxRuntimeExports.jsxs("li",{children:[jsxRuntimeExports.jsx(Button,{icon:jsxRuntimeExports.jsx(MoreHorizExports.SvgMoreHoriz,{}),innerRef:elements.setReference,label:`Access to ${middleItems.length} pages`,showLabel:!1,size:"small",toolTip:`${middleItems.length} pages`,variant:"tertiary",...toggleProps}),isOpen&&jsxRuntimeExports.jsx(Menu,{innerRef:elements.setFloating,itemDisplayCount:!1,...menuProps,style:{...menuProps.style,width:"200px"},children:middleItems.map((item,idx)=>jsxRuntimeExports.jsx(ListItem,{...item,active:activeIndex===idx||void 0,id:`${id}-item-${idx}`},`Breadcrumb-${idx}`))}),jsxRuntimeExports.jsx(BreadcrumbDivider,{})]}):middleItems.map((item,idx)=>jsxRuntimeExports.jsxs("li",{children:[jsxRuntimeExports.jsx(Link,{...item}),jsxRuntimeExports.jsx(BreadcrumbDivider,{})]},`Breadcrumb-${idx}`)),jsxRuntimeExports.jsx("li",{"aria-current":"true",children:jsxRuntimeExports.jsx(Txt,{variant:"body-base",children:items[items.length-1].label})})]})})}Breadcrumb.bspkName="Breadcrumb";export{Breadcrumb};
