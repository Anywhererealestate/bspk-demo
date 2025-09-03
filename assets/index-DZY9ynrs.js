import{r as g,j as l,q as I,s as $,u as R,m as O,B as V,M as U}from"./index-DhaZVVcF.js";import{SvgSchedule as B}from"./Schedule-C8dzdCSH.js";const z=document.createElement("style");z.appendChild(document.createTextNode(`[data-bspk=time-input] {
  --border-color: var(--stroke-neutral-base);
  display: flex;
  flex-flow: row;
  background-color: var(--surface-neutral-t1-base);
  border: solid 1px var(--border-color);
  height: var(--field-height);
  border-radius: var(--radius-sm);
  padding: 0 0 0 var(--field-padding);
  width: 100%;
  justify-content: flex-start;
  align-items: center;
}
[data-bspk=time-input]:hover:not(:focus-within) {
  background: linear-gradient(var(--interactions-hover-opacity), var(--interactions-hover-opacity)), linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
}
[data-bspk=time-input]:active:not(:focus-within) {
  background: linear-gradient(var(--interactions-press-opacity), var(--interactions-press-opacity)), linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
}
[data-bspk=time-input][data-readonly] {
  --border-color: var(--stroke-neutral-disabled-light);
  background: linear-gradient(var(--interactions-disabled-opacity), var(--interactions-disabled-opacity)), linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
}
[data-bspk=time-input][data-disabled], [data-bspk=time-input]:has(input[disabled]) {
  --border-color: var(--stroke-neutral-disabled-light);
  background: linear-gradient(var(--interactions-disabled-opacity), var(--interactions-disabled-opacity)), linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
}
[data-bspk=time-input][data-disabled] > *, [data-bspk=time-input]:has(input[disabled]) > * {
  color: var(--foreground-neutral-disabled-on-surface);
}
[data-bspk=time-input][data-invalid] {
  --border-color: var(--status-error);
}
[data-bspk=time-input][data-size=small] {
  --field-padding: var(--spacing-sizing-02);
  --field-height: var(--spacing-sizing-08);
  --field-font: var(--body-small);
}
[data-bspk=time-input][data-size=medium] {
  --field-padding: var(--spacing-sizing-03);
  --field-height: var(--spacing-sizing-10);
  --field-font: var(--body-base);
}
[data-bspk=time-input][data-size=large] {
  --field-padding: var(--spacing-sizing-03);
  --field-height: var(--spacing-sizing-12);
  --field-font: var(--body-large);
}
[data-bspk=time-input] [aria-hidden] {
  font: var(--field-font);
}
[data-bspk=time-input] [data-input] {
  background-color: transparent !important;
  border: none;
  outline: none;
  padding: 0;
  height: var(--field-height);
  font: var(--field-font);
  min-width: 0;
  text-align: right;
  line-height: var(--field-height);
  width: fit-content;
}
[data-bspk=time-input] [data-input][data-type=meridiem] {
  text-transform: uppercase;
  margin-left: 0.25em;
}
[data-bspk=time-input] [data-input] * {
  pointer-events: none;
}
[data-bspk=time-input] [data-bspk=button] {
  margin-left: auto;
}
[data-bspk=time-input] [data-bspk=button]:focus {
  outline-offset: -4px;
  border-radius: var(--radius-md);
}
[data-bspk=time-input]:focus-within, [data-bspk=time-input][data-open] {
  --border-color: var(--stroke-neutral-focus);
  outline: 1px solid var(--stroke-neutral-focus);
}

[data-bspk-owner=time-input][data-bspk=menu] {
  overflow: hidden;
  height: 324px;
}
[data-bspk-owner=time-input][data-bspk=menu] [data-scroll-values] {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: start;
  gap: var(--spacing-sizing-04);
  padding: var(--spacing-sizing-04);
}
[data-bspk-owner=time-input][data-bspk=menu] [data-scroll-values] [data-scroll-column] {
  padding: 0 var(--spacing-sizing-01);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden auto;
  font: var(--labels-base);
  gap: var(--spacing-sizing-02);
  align-items: center;
  justify-content: start;
}
[data-bspk-owner=time-input][data-bspk=menu] [data-scroll-values] [data-scroll-column] span {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  width: var(--spacing-sizing-13);
  flex: 0;
  border-radius: var(--radius-sm);
  font: var(--labels-base);
  line-height: var(--spacing-sizing-10);
}
[data-bspk-owner=time-input][data-bspk=menu] [data-scroll-values] [data-scroll-column] span[aria-selected] {
  background: var(--surface-brand-primary);
  color: var(--foreground-brand-on-primary);
}
[data-bspk-owner=time-input][data-bspk=menu] [data-scroll-values] [data-scroll-column]:focus {
  outline: none;
}
[data-bspk-owner=time-input][data-bspk=menu] [data-scroll-values] [data-scroll-column]:focus span[data-active] {
  background: var(--interactions-neutral-hover-opacity);
  outline: 2px solid var(--interactions-neutral-hover-opacity);
  outline-offset: -2px;
}
[data-bspk-owner=time-input][data-bspk=menu] [data-scroll-values] [data-scroll-column]:focus span[data-active][aria-selected] {
  background: var(--surface-brand-primary);
  color: var(--foreground-brand-on-primary);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(z);function A({num:s,max:u,min:n,rollover:c=!1,defaultValue:h=n}){const r=typeof s=="number"?s:parseInt(s,10);return isNaN(r)?h??n:r>u?c?n:u:r<n?c?u:n:r}function N({options:s,selectedValue:u,type:n,onSelect:c,onTab:h}){const[r,p]=g.useState(-1),i=g.useRef(null),x=a=>d=>{d.preventDefault(),p(b=>{var m;const f=A({num:b+(a==="down"?1:-1),min:0,max:s.length-1,rollover:!0});return $((m=i.current)==null?void 0:m.children[f],i.current),f})};return l.jsx("div",{"aria-label":`Select ${n}`,"data-scroll-column":n,onClick:a=>{const d=a.target;d.dataset.value&&(c==null||c(d.dataset.value))},onFocus:()=>{var a;r<0&&s.length>0&&$((a=i.current)==null?void 0:a.children[r],i.current)},onKeyDown:I({ArrowDown:x("down"),ArrowUp:x("up"),ArrowLeft:a=>{var b,f;a.preventDefault();const d=a.currentTarget.previousElementSibling;d?d.focus():(f=(b=a.currentTarget.parentNode)==null?void 0:b.lastElementChild)==null||f.focus()},ArrowRight:a=>{var b,f;a.preventDefault();const d=a.currentTarget.nextElementSibling;d?d.focus():(f=(b=a.currentTarget.parentNode)==null?void 0:b.firstElementChild)==null||f.focus()},Enter:a=>{a.preventDefault(),r>=0&&r<s.length&&(c==null||c(s[r]))},Tab:h}),onMouseMove:a=>{const d=a.target;p(Number(d.dataset.index)),a.currentTarget.focus()},ref:a=>{a&&(i.current=a)},role:"listbox",tabIndex:0,children:s.map((a,d)=>l.jsx("span",{"aria-label":`${a}`.padStart(2,"0"),"aria-selected":`${a}`==`${u}`||void 0,"data-active":r===d||void 0,"data-index":d,"data-value":a,role:"option",children:`${a}`.padStart(2,"0")},`${a}`))})}const j={min:0,max:59},M={min:1,max:12},P="--";function D({ariaLabel:s,disabled:u,name:n,readOnly:c,defaultValue:h,type:r,onChange:p}){const i=g.useRef(null),x=(e=i.current)=>{e&&setTimeout(()=>{var o;(o=window.getSelection())==null||o.selectAllChildren(e)},10)},a=g.useCallback(e=>r==="meridiem"?(e==null?void 0:e.toString())||"AM":typeof e>"u"?P:A({num:e,rollover:!0,...r==="hours"?M:j}).toString().padStart(2,"0"),[r]);g.useEffect(()=>{i.current&&(i.current.textContent=a(h))},[h,a]);const d=()=>{var e;(e=window.getSelection())==null||e.removeAllRanges()},b=g.useCallback(e=>{var E;const o=(E=i.current)==null?void 0:E.textContent;if(r==="meridiem"){p(o==="AM"?"PM":"AM");return}const v=A({num:Number(o)+e,rollover:!0,...r==="minutes"?j:M});p(v),i.current&&(i.current.textContent=v.toString().padStart(2,"0"))},[r,p]),f=()=>_(i.current,"[data-input]"),m=()=>F(i.current,"[data-input]"),C=g.useCallback(e=>{var S,T,y;if(I({ArrowRight:()=>{var t;(t=f())==null||t.focus(),e.preventDefault()},ArrowLeft:()=>{var t;(t=m())==null||t.focus(),e.preventDefault()},ArrowUp:()=>{b(1),e.preventDefault()},ArrowDown:()=>{b(-1),e.preventDefault()},Enter:()=>{var t;return(t=i.current)==null?void 0:t.blur()},Escape:()=>{var t;return(t=i.current)==null?void 0:t.blur()},Backspace:()=>p(null),Tab:()=>{}})(e))return;if(e.preventDefault(),r==="meridiem"){const t=e.key.toUpperCase();if(t==="A"||t==="P"){p(`${t}M`),(S=f())==null||S.focus(),x();return}return}if(!/^\d$/.test(e.key))return;let o=Number(e.key);const v=(T=i.current)==null?void 0:T.textContent;if(r==="hours"&&v==="01"&&o<3||r==="minutes"&&Number(v)<6)o=+`${v}${o}`;else if(o===0)return;o=A({num:o,...r==="minutes"?j:M}),p(o),i.current&&(i.current.textContent=o.toString().padStart(2,"0")),r==="hours"&&o>2||r==="minutes"&&o>5?((y=f())==null||y.focus(),x(f())):x()},[r,b,p]);return l.jsx("span",{"aria-disabled":u,"aria-label":`${s} ${n.charAt(0).toUpperCase()+n.slice(1)}`,"aria-readonly":c,contentEditable:!c&&!u,"data-input":"","data-type":r,"data-value":h||void 0,id:`${n}`,onBlur:d,onClick:()=>{u||c||x()},onFocus:()=>{u||c||x()},onKeyDown:C,ref:e=>{e&&(i.current=e,e.textContent=a(h))},role:"spinbutton",tabIndex:0})}function _(s,u){let n=s==null?void 0:s.nextElementSibling;for(;n;){if(n.matches(u))return n;n=n.nextElementSibling}return null}function F(s,u){let n=s==null?void 0:s.previousElementSibling;for(;n;){if(n.matches(u))return n;n=n.previousElementSibling}return null}const K=[0,5,10,15,20,25,30,35,40,45,50,55],L=[1,2,3,4,5,6,7,8,9,10,11,12],H=["AM","PM"];function W({value:s,"aria-label":u,disabled:n,id:c,invalid:h,readOnly:r,name:p,size:i,"aria-describedby":x,"aria-errormessage":a}){const d=R(c),[b,f]=g.useState(s),[m,C]=g.useState(),[e,o]=g.useState(),[v,E]=g.useState("AM");g.useEffect(()=>{f(`${m==null?void 0:m.toString().padStart(2,"0")}:${e==null?void 0:e.toString().padStart(2,"0")} ${v||""}`.trim()),m!==void 0&&e===void 0&&o(0)},[m,e,v]);const[w,S]=g.useState(!1),{floatingStyles:T,elements:y}=O({strategy:"fixed",refWidth:!0,offsetOptions:4,hide:!w});return l.jsxs(l.Fragment,{children:[l.jsxs("div",{"aria-describedby":a||x||void 0,"data-aria-label":u||void 0,"data-bspk":"time-input","data-disabled":n||void 0,"data-invalid":h||void 0,"data-name":p||void 0,"data-open":w||void 0,"data-readonly":r||void 0,"data-size":i||void 0,"data-value":b||void 0,id:d,onClick:()=>{var t,k;(k=(t=y.reference)==null?void 0:t.querySelector("[tabIndex]"))==null||k.focus()},onKeyDown:I({Escape:()=>S(!1)}),ref:y.setReference,role:"group",children:[l.jsx(D,{ariaLabel:u,defaultValue:m,disabled:n,name:`${p}-hours`,onChange:t=>C(t||void 0),readOnly:r,type:"hours"}),l.jsx("span",{"aria-hidden":"true",children:":"}),l.jsx(D,{ariaLabel:u,defaultValue:e,disabled:n,name:`${p}-minutes`,onChange:t=>o(t||void 0),readOnly:r,type:"minutes"}),l.jsx(D,{ariaLabel:u,defaultValue:v,disabled:n,name:`${p}-meridiem`,onChange:t=>E(t||"AM"),readOnly:r,type:"meridiem"}),l.jsx(V,{icon:l.jsx(B,{}),iconOnly:!0,label:`${w?"Close":"Open"} Time Picker`,onClick:()=>{var t;S(!w),(t=y.reference)==null||t.focus()},variant:"tertiary"})]}),!!w&&l.jsx(U,{floating:!0,innerRef:t=>{var k;t&&(y.setFloating(t),(k=t.querySelector('[data-scroll-column="hours"]'))==null||k.focus())},onOutsideClick:()=>{S(!1)},owner:"time-input",scroll:!1,style:{...T},children:l.jsxs("div",{"data-scroll-values":!0,children:[l.jsx(N,{onSelect:C,options:L.map(t=>t),selectedValue:m,type:"hours"}),l.jsx(N,{onSelect:o,options:K,selectedValue:e,type:"minutes"}),l.jsx(N,{onSelect:E,onTab:t=>{t.preventDefault(),S(!1),setTimeout(()=>{var k;return(k=y.reference)==null?void 0:k.focus()},10)},options:H,selectedValue:v,type:"meridiem"})]})})]})}export{L as HOUR_OPTIONS,H as MERIDIEM_OPTIONS,K as MINUTE_OPTIONS,W as TimeInput};
