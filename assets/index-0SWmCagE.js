import{j as n,r as R,a as m}from"./index-BsfVAUQm.js";const C=document.createElement("style");C.appendChild(document.createTextNode(`[data-bspk=slider],
[data-bspk=range-slider] {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 10px;
}
[data-bspk=slider] [data-top-labels],
[data-bspk=slider] [data-bottom-labels],
[data-bspk=range-slider] [data-top-labels],
[data-bspk=range-slider] [data-bottom-labels] {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  user-select: none;
}
[data-bspk=slider] [data-top-labels],
[data-bspk=range-slider] [data-top-labels] {
  color: var(--foreground-neutral-on-surface-variant-01);
}
[data-bspk=slider] [data-bottom-labels],
[data-bspk=range-slider] [data-bottom-labels] {
  color: var(--foreground-neutral-on-surface-variant-02);
}
[data-bspk=slider] [data-slider-parent],
[data-bspk=range-slider] [data-slider-parent] {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
[data-bspk=slider] [data-slider-body],
[data-bspk=range-slider] [data-slider-body] {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
}
[data-bspk=slider] [data-slider-background],
[data-bspk=range-slider] [data-slider-background] {
  position: absolute;
  background: var(--surface-neutral-t3-low);
  height: var(--spacing-sizing-01);
  border-radius: 2px;
  left: 0;
  right: 0;
  cursor: pointer;
}
[data-bspk=slider] [data-slider-fill],
[data-bspk=range-slider] [data-slider-fill] {
  position: absolute;
  height: var(--spacing-sizing-01);
  background-color: var(--foreground-brand-primary);
  border-radius: 2px;
  left: 0;
  cursor: pointer;
}
[data-bspk=slider] [data-slider-knob],
[data-bspk=range-slider] [data-slider-knob] {
  position: absolute;
  border: 1px solid var(--stroke-neutral-low);
  border-radius: 50%;
  width: var(--spacing-sizing-04);
  height: var(--spacing-sizing-04);
  background-color: white;
  box-sizing: border-box;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.32);
  cursor: pointer;
}
[data-bspk=slider] [data-slider-knob]:focus-visible,
[data-bspk=range-slider] [data-slider-knob]:focus-visible {
  outline: 2px solid var(--stroke-neutral-focus);
}
[data-bspk=slider] [data-interval-dot],
[data-bspk=range-slider] [data-interval-dot] {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: var(--foreground-neutral-on-surface-variant-01);
  transform: translate(-50%) rotate(45deg);
}
[data-bspk=slider] [data-interval-dot][data-filled-section],
[data-bspk=range-slider] [data-interval-dot][data-filled-section] {
  background-color: var(--foreground-brand-on-primary);
}
[data-bspk=slider][data-disabled] [data-slider-knob], [data-bspk=slider][data-readonly] [data-slider-knob],
[data-bspk=range-slider][data-disabled] [data-slider-knob],
[data-bspk=range-slider][data-readonly] [data-slider-knob] {
  cursor: default;
}
[data-bspk=slider][data-disabled] [data-interval-dot], [data-bspk=slider][data-readonly] [data-interval-dot],
[data-bspk=range-slider][data-disabled] [data-interval-dot],
[data-bspk=range-slider][data-readonly] [data-interval-dot] {
  background-color: var(--foreground-neutral-disabled-on-surface);
}
[data-bspk=slider][data-disabled] [data-interval-dot][data-filled-section], [data-bspk=slider][data-readonly] [data-interval-dot][data-filled-section],
[data-bspk=range-slider][data-disabled] [data-interval-dot][data-filled-section],
[data-bspk=range-slider][data-readonly] [data-interval-dot][data-filled-section] {
  background-color: var(--foreground-brand-on-primary);
}
[data-bspk=slider][data-disabled] [data-slider-fill], [data-bspk=slider][data-readonly] [data-slider-fill],
[data-bspk=range-slider][data-disabled] [data-slider-fill],
[data-bspk=range-slider][data-readonly] [data-slider-fill] {
  background-color: var(--foreground-neutral-disabled-on-surface);
  cursor: default;
}
[data-bspk=slider][data-disabled] [data-slider-background], [data-bspk=slider][data-readonly] [data-slider-background],
[data-bspk=range-slider][data-disabled] [data-slider-background],
[data-bspk=range-slider][data-readonly] [data-slider-background] {
  background: var(--interactions-disabled-opacity);
  cursor: default;
}
[data-bspk=slider][data-disabled] [data-bottom-labels],
[data-bspk=range-slider][data-disabled] [data-bottom-labels] {
  color: var(--foreground-neutral-disabled-on-surface);
}
[data-bspk=slider][data-disabled] [data-value-label],
[data-bspk=range-slider][data-disabled] [data-value-label] {
  color: var(--foreground-neutral-disabled-on-surface);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(C);function I({step:g,max:c,min:a,value:l}){if(g<=0)return null;const p=Math.floor((c-a)/g),f=[];for(let o=1;o<p;o++){const u=o*g,b=u/(c-a)*100;f.push(n.jsx("div",{"data-filled-section":typeof l=="number"?u<l?"":void 0:u<l[0]?"":void 0,"data-interval-dot":!0,style:{left:`${b}%`}},o))}return f}const T=({min:g,max:c,step:a})=>{const l=f=>Math.min(Math.max(f,g),c);return{normalizeSliderValue:f=>{let o=l(f);return o=Math.round(o/a)*a,o=parseFloat(o.toFixed(10)),l(o)}}};function X({value:g,onChange:c,min:a,max:l,label:p,marks:f=!1,step:o=1,disabled:u=!1,readOnly:b=!1,name:K,formatNumber:j}){const x=g||a,h=(t,r)=>(j==null?void 0:j(t,r))||t.toString(),$=R.useRef(null),v=R.useRef(null),{normalizeSliderValue:y}=T({min:a,max:l,step:o}),s=Array.isArray(x);let e=s?x[0]:x,i=s?x[1]:x;s&&e>i&&([e,i]=[i,e]);const z=s?[h(e,"rangeStart"),h(i,"rangeEnd")].join(" - "):h(e,"rangeStart"),w=Math.min(Math.max((e-a)/(l-a)*100,0),100),D=Math.min(Math.max((i-a)/(l-a)*100,0),100),L=t=>{const r=$.current;if(!r)return a;const{left:d,width:k}=r.getBoundingClientRect();let S=(t-d)/k;return S=Math.max(0,Math.min(1,S)),y(a+S*(l-a))},M=t=>{if(v.current===null||u||b)return;const r=L(t.clientX),d=y(r);let k=d;s&&(k=v.current===0?[d,i]:[e,d]),c(k)},V=()=>{v.current=null,window.removeEventListener("mousemove",M),window.removeEventListener("mouseup",V)},F=t=>{if(u||b)return;const r=L(t.clientX);let d=y(r);s&&(Math.abs(r-e)<Math.abs(r-i)?(d=[r,i],v.current=0):(d=[e,r],v.current=1)),c(d)},A=t=>r=>{u||b||(r.stopPropagation(),v.current=t,window.addEventListener("mousemove",M),window.addEventListener("mouseup",V))},E=t=>r=>{if(u||b)return;let d=t===0?e:i;if(r.key==="ArrowLeft")d-=o;else if(r.key==="ArrowRight")d+=o;else return;d=y(d);let k=d;s&&(t===0?k=[d,i]:k=[e,d]),c(k)};return R.useEffect(()=>()=>{window.removeEventListener("mousemove",M),window.removeEventListener("mouseup",V)},[]),n.jsxs("div",{"data-bspk":"slider","data-disabled":u||void 0,"data-readonly":b||void 0,children:[n.jsx("input",{name:K,type:"hidden",value:s?`${e},${i}`:e}),n.jsxs("div",{"data-top-labels":!0,children:[n.jsx(m,{variant:"labels-small",children:p}),n.jsx(m,{"data-value-label":!0,children:z})]}),n.jsxs("div",{"data-slider-parent":!0,children:[n.jsxs("div",{"aria-disabled":u||void 0,"aria-label":p,"aria-readonly":b||void 0,"aria-valuemax":l,"aria-valuemin":a,"aria-valuenow":e,"aria-valuetext":z,"data-slider-body":!0,onClick:F,onKeyDown:t=>{u||b||(t.key==="ArrowLeft"||t.key==="ArrowRight")&&(s||E(0)(t))},ref:$,role:"slider",tabIndex:u?-1:0,children:[n.jsx("div",{"data-slider-background":!0}),n.jsx("div",{"data-slider-fill":!0,style:{left:s?`${w}%`:"0%",width:s?`${D-w}%`:`${w}%`}}),f&&n.jsx(I,{max:l,min:a,step:o,value:s?[e,i]:e})]}),s&&n.jsx("div",{"aria-label":`${p} start`,"aria-valuemax":l,"aria-valuemin":a,"aria-valuenow":e,"aria-valuetext":e.toString(),"data-slider-knob":!0,onKeyDown:E(0),onMouseDown:A(0),role:"slider",style:{left:`calc(${w}% - 8px)`},tabIndex:u?-1:0}),n.jsx("div",{"aria-label":s?`${p} end`:p,"aria-valuemax":l,"aria-valuemin":a,"aria-valuenow":i,"aria-valuetext":i==null?void 0:i.toString(),"data-slider-knob":!0,onKeyDown:E(s?1:0),onMouseDown:A(s?1:0),role:"slider",style:{left:`calc(${D}% - 8px)`},tabIndex:u?-1:0})]}),n.jsxs("div",{"data-bottom-labels":!0,children:[n.jsx(m,{"data-min-label":!0,variant:"body-small",children:h(a,"min")}),n.jsx(m,{"data-max-label":!0,variant:"body-small",children:h(l,"max")})]})]})}export{X as Slider};
