import{r as l,j as e,g as j,w as k,B as w,D as T,y as R}from"./index-D3aR_18R.js";import{PageControl as I}from"./index-BAvo8fbV.js";const y=document.createElement("style");y.appendChild(document.createTextNode(`[data-bspk=carousel] {
  /*! 
  --gap: is set via inline style
  --item-width: is set via inline style
  */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  background: #fff;
  gap: var(--spacing-sizing-02);
}
[data-bspk=carousel] [data-items-container] {
  width: 100%;
  overflow: hidden;
}
[data-bspk=carousel] [data-items-track] {
  display: flex;
  align-items: center;
  gap: var(--gap);
  min-width: 0;
}
[data-bspk=carousel] [data-item-wrapper] {
  min-width: var(--item-width);
  overflow: hidden;
}
[data-bspk=carousel] [data-controls] {
  display: flex;
  align-items: center;
  gap: var(--spacing-sizing-02);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(y);const b=50;function E(p,d){const n=l.useRef(null),s=l.useRef(null);return{onTouchStart:t=>{s.current=null,n.current=t.targetTouches[0].clientX},onTouchMove:t=>{s.current=t.targetTouches[0].clientX},onTouchEnd:()=>{if(!n.current||!s.current)return;const t=n.current-s.current,a=t>b,h=t<-b;a?p():h&&d()}}}function $({label:p="carousel",children:d,itemWidth:n="80%",gap:s,style:m}){const g=s||16,f=typeof n=="number"?`${n}px`:n,t=l.useRef(null),[a,h]=l.useState(0),{items:C,total:u}=l.useMemo(()=>{const r=l.Children.toArray(d);return{items:r,total:r.length}},[d]),o=r=>()=>{h(i=>{var x;const v=Math.max(0,Math.min(u-1,r==="next"?i+1:i-1)),c=(x=t.current)==null?void 0:x.children[v];return c==null||c.focus(),c==null||c.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"}),v})},S=E(o("next"),o("prev"));return e.jsxs("div",{"aria-label":p,"aria-roledescription":"carousel","data-bspk":"carousel",role:"region",style:j({...m,"--gap":`${g}px`,"--item-width":f}),children:[e.jsx("div",{"data-items-container":!0,children:e.jsx("div",{"data-items-track":!0,...S,onKeyDownCapture:k({ArrowLeft:o("prev"),ArrowRight:o("next")},{preventDefault:!0,stopPropagation:!0}),ref:r=>t.current=r,children:C.map((r,i)=>e.jsx("div",{"aria-label":`Slide ${i+1} of ${u}`,"aria-roledescription":"slide","data-active":a===i||void 0,"data-item-wrapper":!0,role:"tabpanel",tabIndex:a===i?0:-1,children:r},i))})}),e.jsxs("div",{"data-controls":!0,children:[e.jsx(w,{"aria-label":"Previous Slide",disabled:a===0,icon:e.jsx(T,{"aria-hidden":!0}),iconOnly:!0,label:"Previous",onClick:o("prev"),variant:"tertiary"}),e.jsx(I,{currentPage:a+1,numPages:u}),e.jsx(w,{"aria-label":"Next Slide",disabled:a===u-1,icon:e.jsx(R,{"aria-hidden":!0}),iconOnly:!0,label:"Next",onClick:o("next"),variant:"tertiary"})]}),e.jsx("span",{"aria-live":"polite","data-sr-only":!0,children:`Slide ${a+1} of ${u}`})]})}export{$ as Carousel};
