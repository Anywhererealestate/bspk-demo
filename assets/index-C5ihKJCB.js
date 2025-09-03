import{j as e,d}from"./index-DhaZVVcF.js";const t=document.createElement("style");t.appendChild(document.createTextNode(`[data-bspk=progression-stepper-bar] {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: var(--spacing-sizing-01);
}
[data-bspk=progression-stepper-bar][data-size=large] {
  --height: var(--spacing-sizing-02);
}
[data-bspk=progression-stepper-bar][data-size=small] {
  --height: var(--spacing-sizing-01);
}
[data-bspk=progression-stepper-bar] [data-steps] {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-sizing-01);
  height: var(--height);
}
[data-bspk=progression-stepper-bar] [data-steps] [data-step] {
  width: 100%;
  height: var(--height);
  min-width: var(--spacing-sizing-02);
  border-radius: var(--radius-sm);
  background: var(--surface-neutral-t3-low);
}
[data-bspk=progression-stepper-bar] [data-steps] [data-step][data-complete] {
  background: var(--surface-brand-primary);
}
[data-bspk=progression-stepper-bar] [data-label] {
  font: var(--labels-small);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(t);function l({stepCount:a,stepCompleted:p=0,size:i="large"}){const r=Math.min(p,a);return e.jsxs("div",{"data-bspk":"progression-stepper-bar","data-size":i,style:d({"--steps":a}),children:[e.jsx("div",{"data-steps":!0,children:Array.from({length:a},(n,s)=>e.jsx("div",{"data-complete":s<r||void 0,"data-step":s},s))}),e.jsxs("span",{"data-label":!0,children:[r," of ",a," steps completed."]})]})}export{l as ProgressionStepperBar};
