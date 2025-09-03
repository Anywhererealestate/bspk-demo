import{u as S,r as n,m as $,n as B,j as a,P as F,a as c,h as P,B as h,d as O}from"./index-DhaZVVcF.js";const w=document.createElement("style");w.appendChild(document.createTextNode(`[data-bspk=popover] {
  position: absolute;
  z-index: var(--z-index-tooltip-popover);
  background: var(--surface-neutral-t1-base);
  box-shadow: var(--drop-shadow-float);
  padding: var(--spacing-sizing-04);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  max-width: 300px;
  --arrow-size: var(--spacing-sizing-02);
  --arrow-offset: calc(var(--arrow-size) * -2);
  --arrow-background-color: var(--surface-neutral-t1-base);
  --position-left: 0px;
  --position-top: 0px;
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
  left: var(--position-left);
  border-top-color: var(--arrow-background-color);
  filter: drop-shadow(0 1px 1px var(--shadow-10));
}
[data-bspk=popover][data-placement^=right] [data-arrow] {
  top: var(--position-top);
  margin-left: calc(var(--arrow-offset) * 2);
  border-right-color: var(--arrow-background-color);
  filter: drop-shadow(-1px 0 1px var(--shadow-10));
}
[data-bspk=popover][data-placement^=bottom] [data-arrow] {
  left: var(--position-left);
  top: -15px;
  border-bottom-color: var(--arrow-background-color);
  filter: drop-shadow(0 -1px 1px var(--shadow-10));
}
[data-bspk=popover][data-placement^=left] [data-arrow] {
  top: var(--position-top);
  right: var(--arrow-offset);
  border-left-color: var(--arrow-background-color);
  filter: drop-shadow(1px 0 1px var(--shadow-10));
}
[data-bspk=popover] [data-content] {
  gap: var(--spacing-sizing-04);
  display: flex;
  flex-direction: column;
}
[data-bspk=popover] [data-cta-row] {
  display: flex;
  align-items: end;
  gap: var(--spacing-sizing-02);
  margin: 0 0 0 auto;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(w);function q({placement:s="top",header:k,content:m,callToAction:o,secondaryCallToAction:e,children:i,disabled:d=!1,refWidth:b=!1,...z}){var f,x,u;const p=S(),[j,l]=n.useState(!1),g=n.useRef(null),{elements:v,floatingStyles:y,middlewareData:r}=$({placement:s,strategy:"absolute",offsetOptions:22,arrowRef:g,hide:!j,refWidth:b});B({elements:[v.floating],callback:()=>l(!1)});const C=n.useMemo(()=>!d&&i&&n.cloneElement(i,{onClick:()=>l(t=>!t),"aria-describedby":p}),[i,d,p]),E=(f=r==null?void 0:r.arrow)!=null&&f.x?`${r.arrow.x}px`:"0px",R=()=>{var t;if((t=r==null?void 0:r.arrow)!=null&&t.x){if(s==="top-start"||s==="bottom-start")return"16px";if(s==="top"||s==="bottom")return`${r.arrow.x}px`;if(s==="top-end"||s==="bottom-end")return`${(r.arrow.x*2||32)-16}px`}return"0px"};return d?i:a.jsxs(a.Fragment,{children:[C,a.jsx(F,{children:a.jsxs("div",{"data-bspk":"popover","data-placement":(x=r==null?void 0:r.offset)==null?void 0:x.placement,id:p,ref:t=>{v.setFloating(t),v.setReference(document.querySelector(`[aria-describedby="${p}"]`))},style:{...y,...z.style},children:[a.jsxs("header",{children:[a.jsx(c,{variant:"heading-h6",children:k}),a.jsx("button",{"aria-label":"Close",onClick:()=>l(!1),children:a.jsx(P,{})})]}),a.jsxs("div",{"data-content":!0,children:[a.jsx(c,{as:"div",variant:"body-small",children:m}),a.jsxs("div",{"data-cta-row":!0,children:[(e==null?void 0:e.label)&&(e==null?void 0:e.onClick)&&a.jsx(h,{label:e.label,onClick:e.onClick,size:"small",variant:"secondary"}),(o==null?void 0:o.label)&&(o==null?void 0:o.onClick)&&a.jsx(h,{label:o.label,onClick:o.onClick,size:"small",variant:"primary"})]})]}),a.jsx("div",{"data-arrow":!0,ref:t=>{g.current=t},style:O({"--position-left":b?R():E,"--position-top":`${((u=r==null?void 0:r.arrow)==null?void 0:u.y)||0}px`})})]})})]})}export{q as Popover};
