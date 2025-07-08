import{i as useId,k as useCombobox,e as reactExports,j as jsxRuntimeExports,d as TextInput,l as SearchExports,T as Txt}from"./index-B6c-xvyP.js";import{Listbox}from"./index-B6iYA3vK.js";const style=document.createElement("style");style.appendChild(document.createTextNode(`[data-bspk=search-bar] {
  display: flex;
  width: 100%;
  min-width: 300px;
}

[data-bspk=no-items-found] {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-sizing-08) var(--spacing-sizing-04);
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sizing-03);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(style);function SearchBar({itemDisplayCount:itemCount,items,noResultsMessage,placeholder="Search","aria-label":ariaLabel,id:idProp,inputRef,name,size="medium",onSelect,value,onChange,disabled=!1}){const id=useId(idProp),{isOpen,toggleProps:{onClick,onKeyDownCapture,...triggerProps},menuProps,closeMenu,elements}=useCombobox({placement:"bottom-start"}),inputRefLocal=reactExports.useRef(null),containerRefLocal=reactExports.useRef(null);return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment,{children:[jsxRuntimeExports.jsx("div",{"data-bspk":"search-bar",children:jsxRuntimeExports.jsx(TextInput,{"aria-label":ariaLabel,autoComplete:"off",containerRef:node=>{node&&(containerRefLocal.current=node,elements.setReference(node))},disabled,id,inputRef:node=>{inputRef==null||inputRef(node||null),inputRefLocal.current=node},leading:jsxRuntimeExports.jsx(SearchExports.SvgSearch,{}),name,onChange:str=>onChange(str),onClick:()=>{items!=null&&items.length&&onClick()},...triggerProps,onKeyDownCapture:event=>{var _a,_b;if(onKeyDownCapture(event)){(_a=inputRefLocal.current)==null||_a.blur(),(_b=containerRefLocal.current)==null||_b.focus();return}},placeholder,size,value})}),isOpen&&jsxRuntimeExports.jsx(Listbox,{innerRef:elements.setFloating,itemDisplayCount:itemCount,items,onChange:(selectedValues,event)=>{event==null||event.preventDefault();const item=items==null?void 0:items.find(i=>i.value===selectedValues[0]);onSelect==null||onSelect(item),onChange((item==null?void 0:item.label)||""),closeMenu()},...menuProps,children:!!(value!=null&&value.length)&&!(items!=null&&items.length)&&jsxRuntimeExports.jsxs("div",{"data-bspk":"no-items-found",children:[jsxRuntimeExports.jsx(Txt,{as:"div",variant:"heading-h5",children:"No results found"}),noResultsMessage&&jsxRuntimeExports.jsx(Txt,{as:"div",variant:"body-base",children:noResultsMessage})]})})]})}SearchBar.bspkName="SearchBar";export{SearchBar};
