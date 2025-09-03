import{u as i,j as r,a as d}from"./index-DhaZVVcF.js";const p=a=>{const s=a.strokeWidth||10,e=100,t=i();return r.jsxs("svg",{...a,"data-animated":!0,fill:"none",viewBox:`0 0 ${e*2} ${e*2}`,children:[r.jsxs("defs",{children:[r.jsxs("linearGradient",{id:`${t}spinner-secondHalf`,children:[r.jsx("stop",{offset:"50%",stopColor:"currentColor",stopOpacity:0}),r.jsx("stop",{offset:"100%",stopColor:"currentColor",stopOpacity:"0.375"})]}),r.jsxs("linearGradient",{id:`${t}spinner-firstHalf`,children:[r.jsx("stop",{offset:"0%",stopColor:"currentColor",stopOpacity:1}),r.jsx("stop",{offset:"100%",stopColor:"currentColor",stopOpacity:"0.375"})]})]}),r.jsxs("g",{strokeWidth:s*2,children:[r.jsx("path",{d:`M ${s} ${e} A ${e-s} ${e-s} 0 0 1 ${e+(e-s)} ${e}`,stroke:`url(#${t}spinner-secondHalf)`}),r.jsx("path",{d:`M ${e+(e-s)} ${e} A ${e-s} ${e-s} 0 0 1 ${s} ${e}`,stroke:`url(#${t}spinner-firstHalf)`}),r.jsx("path",{d:`M ${s} ${e} A ${e-s} ${e-s} 0 0 1 ${s} ${e-2}`,stroke:"currentColor",strokeLinecap:"round"})]})]})},l=document.createElement("style");l.appendChild(document.createTextNode(`[data-bspk=progress-circle] {
  --animation-speed: 1.5s;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sizing-02);
  align-items: center;
  justify-content: center;
}
[data-bspk=progress-circle][data-label-position=top] {
  flex-direction: column-reverse;
}
[data-bspk=progress-circle][data-label-position=left] {
  flex-direction: row-reverse;
}
[data-bspk=progress-circle][data-label-position=right] {
  flex-direction: row;
}
[data-bspk=progress-circle] svg {
  color: var(--foreground-brand-secondary);
  animation: spin var(--animation-speed) linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
  0% {
    transform: rotate(0deg);
  }
}
[data-bspk=progress-circle][data-size=small] svg {
  width: 32px;
}
[data-bspk=progress-circle][data-size=medium] svg {
  width: 40px;
}
[data-bspk=progress-circle][data-size=large] svg {
  width: 48px;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(l);function n({label:a,labelPosition:s,size:e="medium"}){let t="labels-base";e==="small"?t="labels-small":e==="large"&&(t="labels-large");const o=i();return r.jsxs("div",{"aria-labelledby":o,"data-bspk":"progress-circle","data-label-position":s,"data-size":e,role:"progressbar",children:[r.jsx(n.SVG,{}),r.jsx(d,{id:o,variant:t,children:a||"Loading ..."})]})}n.SVG=p;export{n as ProgressCircle};
