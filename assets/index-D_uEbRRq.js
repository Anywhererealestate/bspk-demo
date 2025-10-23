import{u as x,r as w,j as p}from"./index-jcbivK3E.js";const h=document.createElement("style");h.appendChild(document.createTextNode(`[data-bspk=otp-input] {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--spacing-sizing-02);
  font: var(--font);
  width: fit-content;
}
[data-bspk=otp-input] [data-digit] {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  border: 1px solid var(--stroke-neutral-base);
  flex-grow: 1;
  aspect-ratio: 1;
  width: var(--width);
  position: relative;
  outline: none;
}
[data-bspk=otp-input] [data-digit]:hover:not(:focus)::after {
  background: var(--interaction-hover-opacity);
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--radius-sm);
}
[data-bspk=otp-input] [data-digit]:active::after {
  background: var(--interaction-press-opacity);
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--radius-sm);
}
[data-bspk=otp-input] [data-digit]:focus:not(:active) {
  outline: solid 2px var(--stroke-neutral-focus);
}
[data-bspk=otp-input] [data-digit]:focus:not(:active):empty::before {
  content: "";
  width: 2px;
  height: calc(var(--caret-height) - 8px);
  background: var(--stroke-neutral-high);
  animation: blink-caret 1s step-end infinite;
}
@keyframes blink-caret {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
[data-bspk=otp-input][data-size=small] {
  --width: var(--spacing-sizing-08);
  --font: var(--subheader-medium);
  --caret-height: var(--subheader-medium-line-height);
}
[data-bspk=otp-input][data-size=medium] {
  --width: var(--spacing-sizing-10);
  --font: var(--subheader-large);
  --caret-height: var(--subheader-large-line-height);
}
[data-bspk=otp-input][data-size=large] {
  --width: var(--spacing-sizing-12);
  --font: var(--subheader-x-large);
  --caret-height: var(--subheader-x-large-line-height);
}
[data-bspk=otp-input][data-invalid] [data-digit] {
  border-color: var(--status-error);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(h);function z({value:d,onChange:f,name:g,id:b,length:s=6,size:m="medium",invalid:v=!1}){const k=x(b),a=(d==null?void 0:d.slice(0,s))||"",u=w.useRef(null),o=r=>{var t;return(t=u.current)==null?void 0:t.children[r+1]},y=(r,t)=>{const e=a.split("");return e[r]=t,e.join("")},c=r=>f(r.slice(0,s).toUpperCase());return p.jsxs("div",{"data-bspk":"otp-input","data-invalid":v||void 0,"data-size":m||"medium",id:k,ref:u,children:[p.jsx("input",{name:g,type:"hidden",value:a}),Array.from({length:s},(r,t)=>p.jsx("span",{"aria-label":`OTP digit ${t+1}`,"data-digit":t+1,onClick:e=>{var i;a[t]||a[t-1]||(e.preventDefault(),(i=o(a.length))==null||i.focus())},onKeyDown:e=>{var i,n;if(e.key==="Backspace"&&a){const l=a.slice(0,-1);c(l),(i=o(l.length))==null||i.focus()}e.key.length===1&&(c(y(t,e.key)),(n=o(t+1))==null||n.focus())},onPaste:e=>{var n;const i=e.clipboardData.getData("text").trim();c(i),(n=o(s-1))==null||n.focus()},role:"textbox",tabIndex:0,children:(a==null?void 0:a[t])||""},t))]})}export{z as OTPInput};
