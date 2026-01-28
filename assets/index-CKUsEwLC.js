import{j as s}from"./index-BJ5oyAgX.js";const l=document.createElement("style");l.appendChild(document.createTextNode(`[data-bspk=page-control] {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: var(--radius-full);
  border: 1px solid var(--stroke-neutral-low);
  padding: var(--spacing-sizing-02);
  gap: var(--spacing-sizing-02);
  width: fit-content;
  background-color: var(--surface-neutral-t1-base);
}
[data-bspk=page-control] [data-dot] {
  background-color: var(--surface-neutral-t3-low);
  border-radius: var(--radius-full);
  width: var(--spacing-sizing-02);
  height: var(--spacing-sizing-02);
}
[data-bspk=page-control] [data-dot][data-active] {
  background-color: var(--foreground-brand-primary);
}
[data-bspk=page-control] [data-dot][data-size=x-small] {
  width: var(--spacing-sizing-01);
  height: var(--spacing-sizing-01);
}
[data-bspk=page-control] [data-dot][data-size=small] {
  width: 6px;
  height: 6px;
}
[data-bspk=page-control][data-variant=floating] {
  box-shadow: var(--drop-shadow-float);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(l);const d=5;function g({currentPage:i,numPages:r,variant:o="flat"}){const n=Number(r),a=Number(i);return n<2||a<1||a>n?null:s.jsx("span",{"aria-label":`Page ${a} of ${n}`,"data-bspk":"page-control","data-variant":o||void 0,role:"img",children:p(a-1,n).map(({pageIndex:t,size:e},c)=>s.jsx("span",{"aria-hidden":"true","data-active":t+1===a||void 0,"data-dot":t,"data-size":e,role:"presentation"},c+1))})}function p(i,r){if(r<=d)return Array.from({length:r},(n,a)=>({size:"medium",pageIndex:a}));const o=Math.max(0,Math.min(i-2,r-d));return Array.from({length:d},(n,a)=>{const t=o+a;let e="medium";return a===0&&t>0&&(e="x-small"),a===1&&t>1&&(e="small"),a===3&&t<r-2&&(e="small"),a===4&&t<r-1&&(e="x-small"),{pageIndex:t,size:e}})}export{g as PageControl};
