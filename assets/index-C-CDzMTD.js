import{j as a,z as b}from"./index-jcbivK3E.js";const p=document.createElement("style");p.appendChild(document.createTextNode(`[data-bspk=progression-stepper] {
  width: 100%;
  --circle-width: var(--spacing-sizing-09);
  --active-background-color: var(--surface-brand-primary);
  --active-foreground-color: var(--foreground-brand-on-primary);
  --inactive-background-color: var(--surface-neutral-t3-low);
  --inactive-foreground-color: var(--foreground-neutral-on-surface);
}
[data-bspk=progression-stepper] ol {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0;
  padding: 0;
}
[data-bspk=progression-stepper] ol li {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--spacing-sizing-02);
  flex-grow: 1;
}
[data-bspk=progression-stepper] ol li [data-line-circle] {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
[data-bspk=progression-stepper] ol li [data-line-circle] [data-line] {
  background-color: var(--inactive-background-color);
  height: 2px;
  flex-grow: 1;
}
[data-bspk=progression-stepper] ol li [data-line-circle] [data-circle] {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--circle-width);
  height: var(--circle-width);
  border-radius: 50%;
  background-color: none;
  border: 2px solid var(--inactive-background-color);
  font: var(--labels-large);
}
[data-bspk=progression-stepper] ol li [data-line-circle] [data-circle] svg {
  display: none;
  width: var(--spacing-sizing-06);
  height: var(--spacing-sizing-06);
}
[data-bspk=progression-stepper] ol li [data-content] {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 var(--spacing-sizing-10);
  font: var(--body-small);
  text-align: center;
}
[data-variant=horizontal] [data-bspk=progression-stepper] ol li [data-content] {
  align-items: center;
  justify-content: center;
  width: 100%;
}
[data-bspk=progression-stepper] ol li:first-of-type [data-line=before] {
  visibility: hidden;
}
[data-bspk=progression-stepper] ol li:last-of-type [data-line=after] {
  visibility: hidden;
}
[data-bspk=progression-stepper] ol li[data-status=complete] [data-line] {
  background-color: var(--active-background-color);
}
[data-bspk=progression-stepper] ol li[data-status=complete] [data-circle] {
  background-color: var(--active-background-color);
  border: 1px solid var(--active-background-color);
  color: var(--active-foreground-color);
}
[data-bspk=progression-stepper] ol li[data-status=complete] [data-circle] span {
  display: none;
}
[data-bspk=progression-stepper] ol li[data-status=complete] [data-circle] svg {
  display: block;
}
[data-bspk=progression-stepper] ol li[data-status=current] [data-line=before] {
  background-color: var(--active-background-color);
}
[data-bspk=progression-stepper] ol li[data-status=current] [data-circle] {
  border-color: var(--active-background-color);
}
[data-bspk=progression-stepper][data-variant=vertical] ol {
  flex-direction: column;
}
[data-bspk=progression-stepper][data-variant=vertical] li {
  flex-direction: row;
}
[data-bspk=progression-stepper][data-variant=vertical] li [data-line-circle] {
  flex-direction: column;
  width: var(--circle-width);
}
[data-bspk=progression-stepper][data-variant=vertical] li [data-line-circle] [data-line] {
  width: 2px;
  height: auto;
}
[data-bspk=progression-stepper][data-variant=vertical] li [data-content] {
  flex-direction: column;
  padding: var(--spacing-sizing-10) 0;
}
[data-bspk=progression-stepper][data-variant=widget] {
  --circle-width: var(--spacing-sizing-05);
}
[data-bspk=progression-stepper][data-variant=widget] label {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sizing-02);
  margin-bottom: var(--spacing-sizing-03);
  font: var(--body-small);
}
[data-bspk=progression-stepper][data-variant=widget] label [data-title] {
  font: var(--labels-base);
  color: var(--foreground-neutral-on-surface);
}
[data-bspk=progression-stepper][data-variant=widget] label [data-subtitle] {
  font: var(--body-x-small);
  color: var(--foreground-neutral-on-surface-variant-02);
}
[data-bspk=progression-stepper][data-variant=widget] ol {
  align-items: center;
  min-height: var(--spacing-sizing-09);
}
[data-bspk=progression-stepper][data-variant=widget] ol li {
  flex-grow: 1;
}
[data-bspk=progression-stepper][data-variant=widget] ol li [data-line-circle] [data-line=after] {
  flex-grow: 1;
}
[data-bspk=progression-stepper][data-variant=widget] ol li [data-line-circle] [data-line=before] {
  display: none;
}
[data-bspk=progression-stepper][data-variant=widget] ol li:last-of-type {
  flex-grow: 0;
}
[data-bspk=progression-stepper][data-variant=widget] ol li:last-of-type [data-line=after] {
  display: none;
}
[data-bspk=progression-stepper][data-variant=widget] ol li[data-status=current] {
  --circle-width: var(--spacing-sizing-09);
}
[data-bspk=progression-stepper][data-variant=widget] ol li[data-status=incomplete] [data-circle] span {
  display: none;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(p);function f({steps:e=[],completedStep:c=0,variant:r="horizontal",...g}){const i=Math.max(0,Math.min(c,e.length)),s=Math.min(i+1,e.length),n=e[s-1];return e!=null&&e.length?a.jsxs("div",{...g,"data-bspk":"progression-stepper","data-variant":r,children:[r==="widget"&&a.jsxs("label",{children:[a.jsx("span",{"data-title":!0,children:n.name}),a.jsx("span",{"data-subtitle":!0,children:(n==null?void 0:n.subtext)||(i===e.length?"Completed":a.jsxs(a.Fragment,{children:["Step ",s," of ",e.length]}))})]}),a.jsx("ol",{children:e.map(({name:u,subtext:l},d)=>{const o=d+1;let t="incomplete";return i>=o?t="complete":i+1===o&&(t="current"),a.jsxs("li",{"aria-current":t==="current"?"step":void 0,"data-status":t,"data-step":o,children:[a.jsxs("span",{"data-line-circle":!0,children:[a.jsx("span",{"data-line":"before"}),a.jsx("span",{"data-circle":!0,children:t==="complete"?a.jsx(b,{"aria-hidden":!0}):(r!=="widget"||t==="current")&&a.jsx("span",{children:o})}),a.jsx("span",{"data-line":"after"})]}),r!=="widget"&&a.jsxs("span",{"data-content":!0,children:[a.jsx("span",{"data-name":!0,children:u}),l&&a.jsx("span",{"data-subtext":!0,children:l})]})]},`step-${d}`)})})]}):null}export{f as ProgressionStepper};
