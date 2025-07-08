import{e as reactExports,u as useFloating,f as useOutsideClick,j as jsxRuntimeExports,P as Portal,T as Txt,C as CloseExports,B as Button}from"./index-B6c-xvyP.js";const style=document.createElement("style");style.appendChild(document.createTextNode(`[data-bspk=popover] {
  position: absolute;
  z-index: var(--z-index-tooltip-popover);
  background: var(--surface-neutral-t1-base);
  box-shadow: var(--drop-shadow-float);
  padding: var(--spacing-sizing-04);
  width: 300px;
  border-radius: var(--radius-large);
  display: flex;
  flex-direction: column;
  --arrow-size: var(--spacing-sizing-02);
  --arrow-offset: calc(var(--arrow-size) * -2);
  --arrow-background-color: var(--surface-neutral-t1-base);
}
[data-bspk=popover] header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sizing-02);
  gap: var(--spacing-sizing-04);
}
[data-bspk=popover] header button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0 0 0 auto;
  color: var(--foreground-neutral-on-surface-variant-01);
  height: var(--spacing-sizing-06);
  width: var(--spacing-sizing-06);
}
[data-bspk=popover] header button svg {
  width: var(--spacing-sizing-06);
  height: var(--spacing-sizing-06);
}
[data-bspk=popover] [data-arrow] {
  z-index: 1;
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: var(--arrow-size) var(--arrow-size) var(--arrow-size) var(--arrow-size);
  border-color: transparent;
}
[data-bspk=popover][data-placement^=top] [data-arrow] {
  bottom: var(--arrow-offset);
  border-top-color: var(--arrow-background-color);
  filter: drop-shadow(0 2px 1px var(--shadow-10));
}
[data-bspk=popover][data-placement^=right] [data-arrow] {
  margin-left: calc(var(--arrow-offset) * 2);
  border-right-color: var(--arrow-background-color);
  filter: drop-shadow(-2px 0 1px var(--shadow-10));
}
[data-bspk=popover][data-placement^=bottom] [data-arrow] {
  top: var(--arrow-offset);
  border-bottom-color: var(--arrow-background-color);
  filter: drop-shadow(0 -2px 1px var(--shadow-10));
}
[data-bspk=popover][data-placement=bottom-start] [data-arrow] {
  margin-left: var(--arrow-offset);
}
[data-bspk=popover][data-placement=bottom-end] [data-arrow] {
  margin-left: calc(var(--arrow-offset) * -1);
}
[data-bspk=popover][data-placement^=left] [data-arrow] {
  right: var(--arrow-offset);
  border-left-color: var(--arrow-background-color);
  filter: drop-shadow(2px 0 1px var(--shadow-10));
}
[data-bspk=popover] [data-content] {
  gap: var(--spacing-sizing-04);
  display: flex;
  flex-direction: column;
}
[data-bspk=popover] [data-call-to-action] {
  margin: 0 0 0 auto;
  /* background: none;
  border: none;
  cursor: pointer;
  padding: 0 var(--spacing-sizing-03);
  height: var(--spacing-sizing-12);
  font: var(--labels-small);
  color: var(--foreground-brand-primary); */
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(style);function Popover({placement="top",header,content,callToAction,children,disabled=!1}){var _a,_b,_c;const id=reactExports.useId(),[show,setShow]=reactExports.useState(!1),arrowRef=reactExports.useRef(null),{elements,floatingStyles,middlewareData}=useFloating({placement,strategy:"absolute",offsetOptions:22,arrowRef,hide:!show});useOutsideClick([elements.floating],()=>setShow(!1));const child=reactExports.useMemo(()=>!disabled&&children&&reactExports.cloneElement(children,{onClick:()=>setShow(prev=>!prev),"aria-describedby":id}),[children,disabled,id]);return disabled?children:jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment,{children:[child,jsxRuntimeExports.jsx(Portal,{children:jsxRuntimeExports.jsxs("div",{"data-bspk":"popover","data-placement":(_a=middlewareData==null?void 0:middlewareData.offset)==null?void 0:_a.placement,id,ref:node=>{elements.setFloating(node),elements.setReference(document.querySelector(`[aria-describedby="${id}"]`))},style:floatingStyles,children:[jsxRuntimeExports.jsxs("header",{children:[jsxRuntimeExports.jsx(Txt,{variant:"heading-h6",children:header}),jsxRuntimeExports.jsx("button",{"aria-label":"Close",onClick:()=>setShow(!1),children:jsxRuntimeExports.jsx(CloseExports.SvgClose,{})})]}),jsxRuntimeExports.jsxs("div",{"data-content":!0,children:[jsxRuntimeExports.jsx(Txt,{as:"div",variant:"body-small",children:content}),(callToAction==null?void 0:callToAction.label)&&(callToAction==null?void 0:callToAction.onClick)&&jsxRuntimeExports.jsx(Button,{"data-call-to-action":!0,label:callToAction.label,onClick:callToAction.onClick,size:"small",variant:"secondary"})]}),jsxRuntimeExports.jsx("div",{"data-arrow":!0,ref:node=>{arrowRef.current=node},style:{left:`${(_b=middlewareData==null?void 0:middlewareData.arrow)==null?void 0:_b.x}px`,top:`${(_c=middlewareData==null?void 0:middlewareData.arrow)==null?void 0:_c.y}px`}})]})})]})}Popover.bspkName="Popover";export{Popover};
