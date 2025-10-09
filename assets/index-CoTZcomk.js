import{r as v,j as t,O as P,B as S}from"./index-DwG5tqeq.js";const d=document.createElement("style");d.appendChild(document.createTextNode(`[data-bspk=password-input] {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
[data-bspk=password-input] [data-bspk=text-input] {
  padding-right: 0;
}
[data-bspk=password-input] [data-bspk=text-input] [data-bspk=button] {
  font: var(--button-font);
  height: 100%;
}
[data-bspk=password-input] [data-disabled] [data-toggle-visibility-button],
[data-bspk=password-input] [data-readonly] [data-toggle-visibility-button] {
  cursor: default;
}
[data-bspk=password-input][data-size=small] {
  --button-font: var(--labels-small);
}
[data-bspk=password-input][data-size=medium] {
  --button-font: var(--labels-base);
}
[data-bspk=password-input][data-size=large] {
  --button-font: var(--labels-large);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(d);function B({disabled:r,readOnly:i,size:p="medium","aria-label":l,"aria-describedby":u,"aria-errormessage":b,inputProps:c,inputRef:g,name:w,onChange:f,required:m,value:a,containerRef:h,id:x,invalid:y,...k}){const[n,C]=v.useState(!1),j=()=>{r||i||C(s=>!s)};return t.jsx("div",{...k,"data-bspk":"password-input",children:t.jsx(P,{"aria-describedby":u,"aria-errormessage":b,"aria-label":l,autoComplete:"off",containerRef:h,disabled:r,id:x,inputProps:c,inputRef:g,invalid:y,leading:!n&&t.jsx(t.Fragment,{children:Array.from({length:(a==null?void 0:a.length)||0},(s,e)=>t.jsx("span",{},e))}),name:w,onChange:f,onClick:s=>{var e,o;(o=(e=s.currentTarget)==null?void 0:e.querySelector("input"))==null||o.focus()},owner:"password-input",readOnly:i,required:m,showClearButton:!1,size:p,trailing:!r&&!i&&t.jsx(S,{label:n?"Hide":"Show",onClick:j,variant:"tertiary"}),type:n?"text":"password",value:a})})}export{B as PasswordInput};
