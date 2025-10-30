import{u as E,r as g,n as F,o as O,j as a,p as S,q as $,T as w,B as l,l as B,g as q}from"./index-1nR9Hce4.js";const h=document.createElement("style");h.appendChild(document.createTextNode(`[data-bspk=popover] {
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
[data-bspk=popover] header [data-bspk=button][data-close] {
  margin-right: calc(var(--spacing-sizing-02) * -1);
  margin-top: calc(var(--spacing-sizing-02) * -1);
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
`));document.head.appendChild(h);function X({placement:e="top",header:k,content:m,callToAction:t,secondaryCallToAction:o,children:b,disabled:z=!1,refWidth:c,...j}){var f,x,u;const n=E(),[i,d]=g.useState(!1),v=g.useRef(null),{elements:p,floatingStyles:y,middlewareData:r}=F({placement:e,strategy:"absolute",offsetOptions:22,arrowRef:v,hide:!i,refWidth:c});O({elements:[p.floating],callback:()=>d(!1),disabled:!i});const R=(f=r==null?void 0:r.arrow)!=null&&f.x?`${r.arrow.x}px`:"0px",C=()=>{var s;if((s=r==null?void 0:r.arrow)!=null&&s.x){if(e==="top-start"||e==="bottom-start")return"16px";if(e==="top"||e==="bottom")return`${r.arrow.x}px`;if(e==="top-end"||e==="bottom-end")return`${(r.arrow.x*2||32)-16}px`}return"0px"};return z?b({}):a.jsxs(a.Fragment,{children:[b({onClick:()=>d(!i),"aria-describedby":n}),i&&a.jsx(S,{children:a.jsx($.FocusTrap,{focusTrapOptions:{fallbackFocus:()=>p.floating||document.body,clickOutsideDeactivates:!0},children:a.jsxs("div",{"data-bspk":"popover","data-placement":(x=r==null?void 0:r.offset)==null?void 0:x.placement,id:n,ref:s=>{p.setFloating(s),p.setReference(document.querySelector(`[aria-describedby="${n}"]`))},style:{...y,...j.style},children:[a.jsxs("header",{children:[a.jsx(w,{variant:"heading-h6",children:k}),a.jsx(l,{"data-close":!0,icon:a.jsx(B,{}),iconOnly:!0,label:"Close",onClick:()=>d(!1),variant:"tertiary"})]}),a.jsxs("div",{"data-content":!0,children:[a.jsx(w,{as:"div",variant:"body-small",children:m}),a.jsxs("div",{"data-cta-row":!0,children:[(o==null?void 0:o.label)&&(o==null?void 0:o.onClick)&&a.jsx(l,{label:o.label,onClick:o.onClick,size:"small",variant:"secondary"}),(t==null?void 0:t.label)&&(t==null?void 0:t.onClick)&&a.jsx(l,{label:t.label,onClick:t.onClick,size:"small",variant:"primary"})]})]}),a.jsx("div",{"data-arrow":!0,ref:s=>{v.current=s},style:q({"--position-left":c?C():R,"--position-top":`${((u=r==null?void 0:r.arrow)==null?void 0:u.y)||0}px`})})]})})})]})}export{X as Popover};
