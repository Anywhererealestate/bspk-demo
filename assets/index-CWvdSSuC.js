import{u as b,j as t}from"./index-B6u9ge13.js";const d=document.createElement("style");d.appendChild(document.createTextNode(`[data-bspk=otp-input] {
  width: fit-content;
  position: relative;
}
[data-bspk=otp-input] input[inputMode] {
  position: absolute;
  inset: 0;
  opacity: 0;
  border: none;
  caret-color: transparent;
}
[data-bspk=otp-input] [data-digits] {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--spacing-sizing-02);
  font: var(--font);
  width: fit-content;
  position: relative;
  pointer-events: none;
}
[data-bspk=otp-input] [data-digits] [data-digit] {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  border: 1px solid var(--stroke-neutral-base);
  flex-grow: 1;
  aspect-ratio: 1;
  width: var(--width);
  position: relative;
  outline: none;
  text-align: center;
}
[data-bspk=otp-input] input[inputMode]:focus + [data-digits] [data-digit][data-active] {
  outline: solid 2px var(--stroke-neutral-focus);
}
[data-bspk=otp-input] input[inputMode]:focus + [data-digits] [data-digit][data-active]:empty::before {
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
`));document.head.appendChild(d);function f({value:s,onChange:o,name:p,id:u,length:a=6,size:l="medium",invalid:c=!1,alphanumeric:n=!1,"aria-label":h="OTP input"}){const g=b(u),e=s||"",v=Math.min(e.length,a-1);return t.jsxs("div",{"data-bspk":"otp-input","data-invalid":c||void 0,"data-size":l||"medium",id:g,children:[t.jsx("input",{"aria-label":h,inputMode:n?"text":"numeric",name:p,onChange:r=>{o(r.target.value.trim().toUpperCase().slice(0,a))},type:n?"text":"number",value:e}),t.jsx("span",{"data-digits":!0,children:Array.from({length:a},(r,i)=>t.jsx("span",{"data-active":i===v||void 0,"data-digit":!0,children:e[i]},i))})]})}export{f as OTPInput};
