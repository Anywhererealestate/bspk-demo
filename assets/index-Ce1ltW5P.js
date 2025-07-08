import{j as jsxRuntimeExports,A as Avatar}from"./index-B6c-xvyP.js";const style=document.createElement("style");style.appendChild(document.createTextNode(`[data-bspk=avatar-group] {
  width: 100%;
}
[data-bspk=avatar-group] [data-wrap] {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: end;
  gap: var(--spacing-sizing-02);
  overflow: hidden;
}
`));document.head.appendChild(style);function AvatarGroup({items,size="small",max=5,variant}){if(!Array.isArray(items)||!(items!=null&&items.length))return null;const overFlowCount=items.length-max;return jsxRuntimeExports.jsx("div",{"data-bspk":"avatar-group","data-max":max,"data-size":size,"data-variant":variant,children:jsxRuntimeExports.jsxs("div",{"data-wrap":!0,children:[items.map((item,index)=>jsxRuntimeExports.jsx(Avatar,{...item,size},index)),overFlowCount>0&&jsxRuntimeExports.jsx("div",{"aria-hidden":!0,"data-bspk":"avatar","data-color":"white","data-size":size,children:jsxRuntimeExports.jsxs("span",{"data-overflow-count":!0,children:["+",overFlowCount]})})]})})}AvatarGroup.bspkName="AvatarGroup";export{AvatarGroup};
