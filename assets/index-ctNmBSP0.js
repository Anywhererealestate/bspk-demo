import{j as jsxRuntimeExports,T as Txt,v as InlineAlert}from"./index-B6c-xvyP.js";const style=document.createElement("style");style.appendChild(document.createTextNode(`[data-bspk=form-field] {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sizing-01);
}
[data-bspk=form-field] header {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
[data-bspk=form-field] header label {
  flex-grow: 1;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`));document.head.appendChild(style);function FormField({label,invalid,errorMessage:errorMessageProp,helperText:helperTextProp,children,labelTrailing,controlId,required}){const errorMessage=invalid&&errorMessageProp?errorMessageProp:void 0,errorMessageId=errorMessage?`${controlId}-error-message`:void 0,helperText=!invalid&&helperTextProp?helperTextProp:void 0,helperTextId=!errorMessage&&helperText?`${controlId}-helper-text`:void 0;return typeof children!="function"?null:jsxRuntimeExports.jsxs("div",{"data-bspk":"form-field","data-invalid":invalid||void 0,children:[jsxRuntimeExports.jsxs("header",{children:[jsxRuntimeExports.jsxs("label",{htmlFor:controlId,children:[jsxRuntimeExports.jsx(Txt,{as:"span",variant:"labels-small",children:label}),required&&jsxRuntimeExports.jsx(Txt,{as:"span",variant:"body-small",children:" (Required)"})]}),labelTrailing]}),children({invalid,"aria-describedby":helperTextId,"aria-errormessage":errorMessageId}),errorMessage&&jsxRuntimeExports.jsx(InlineAlert,{id:errorMessageId,variant:"error",children:errorMessage}),helperText&&jsxRuntimeExports.jsx(Txt,{id:helperTextId,variant:"body-small",children:helperText})]})}FormField.bspkName="FormField";export{FormField};
