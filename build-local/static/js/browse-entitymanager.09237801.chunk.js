"use strict";(self.webpackChunkharperdb_studio=self.webpackChunkharperdb_studio||[]).push([[3],{6201:(e,t,n)=>{n.r(t),n.d(t,{default:()=>x});var r=n(7313),a=n(238),o=n(3516),s=n(7387),c=n(6782),i=n(5399),l=n(1781),u=n(9327),f=n(8467),d=n(6160),p=n(9859),m=n(5447);var h=n(8659),b=n(6417);const g=function(e){let{items:t,itemType:n,activeSchema:a,toggleDropItem:o,toggleCreate:g,baseUrl:y}=e;const v=(0,f.s0)(),x=(0,d.VY)(),j=(0,s.Kw)(m.Z,(e=>e.auth)),w=(0,s.Kw)(m.Z,(e=>e.url)),[N,Z]=(0,r.useState)(!1),[O,k]=(0,r.useState)(!1),[C,S]=(0,r.useState)(!1),[D,I]=(0,r.useState)(!1),[R,_]=(0,r.useState)(!1),P=async e=>{e.preventDefault();let r=!1;if(N&&!t.includes(N)||(k(!0),r=!0),N&&!N.match(/^\w+$/)&&(k(!0),r=!0,x.error("You may only use alphanumeric characters or underscores.")),N&&N.match(/^\d+$/)&&(k(!0),r=!0,x.error("You may not provide a number as a name.")),"table"!==n||C||(r=!0,I(!0)),r)return!1;_(!0);const o={operation:"create_".concat(n)};"table"===n?(o.schema=a,o.table=N,o.hash_attribute=C):o.schema=N;const s=await(0,p.Z)({operation:o,auth:j,url:w});return s.error?(_(!1),g(!1),x.error(s.message)):(0,h.Z)({auth:j,url:w})};return(0,r.useEffect)((()=>{o()}),[o]),(0,r.useEffect)((()=>{N&&t.find((e=>e===N))&&v("".concat(y,"/").concat(N))}),[t]),(0,b.jsxs)(c.Z,{className:"item-row form",children:[(0,b.jsx)(i.Z,{className:"input-holder",children:(0,b.jsx)(l.Z,{id:"name",invalid:O,onChange:e=>{k(!1),Z(e.target.value)},value:N||"",disabled:R,type:"text",name:"name",placeholder:"name"})}),"table"===n&&(0,b.jsx)(i.Z,{className:"input-holder",children:(0,b.jsx)(l.Z,{id:"hash_attribute",invalid:D,disabled:R,onChange:e=>{I(!1),S(e.target.value)},value:C||"",type:"test",name:"hash_attribute",placeholder:"hash attr."})}),(0,b.jsx)(i.Z,{className:"item-action",children:R?(0,b.jsx)(u.Z,{id:"creatingItem",color:"success",className:"round",children:(0,b.jsx)("i",{className:"fa fa-spinner fa-spin text-white"})}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(u.Z,{id:"createItem",color:"success",className:"round me-1",onClick:P,onKeyDown:e=>13!==e.keyCode||P(e),children:(0,b.jsx)("i",{className:"fa fa-check text-white"})}),(0,b.jsx)(u.Z,{id:"toggleCreate",color:"black",className:"round",onClick:()=>g(!1),children:(0,b.jsx)("i",{className:"fa fa-times text-white"})})]})})]})};const y=function(e){let{item:t,itemType:n,baseUrl:a,isActive:o,toggleDropItem:l,isDropping:g,activeSchema:y}=e;const v=(0,f.s0)(),x=(0,d.VY)(),[j,w]=(0,r.useState)(!1),[N,Z]=(0,r.useState)(!1),O=(0,s.Kw)(m.Z,(e=>e.auth)),k=(0,s.Kw)(m.Z,(e=>e.url));return(0,b.jsxs)(c.Z,{title:"View".concat(o?"ing":""," ").concat(n," ").concat(t),className:"item-row ".concat(o?"active":""),onClick:()=>!(o||g||j)&&v("".concat(a,"/").concat(t)),tabIndex:"0",children:[(0,b.jsx)(i.Z,{className:"item-label ".concat(j?"text-danger text-nowrap":""),children:j?"drop ".concat(t,"?"):t}),(0,b.jsx)(i.Z,{className:"item-action",children:N?(0,b.jsx)(u.Z,{tabIndex:"-1",disabled:!0,color:"purple",className:"round",children:(0,b.jsx)("i",{className:"fa fa-spinner fa-spin"})}):j?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(u.Z,{id:"confirmDropItem",color:"danger",className:"round me-1",title:"confirm drop ".concat(n," ").concat(t),onClick:()=>{w(!1),Z(!0),(async()=>{if(!n||!j)return!1;const e={operation:"drop_".concat(n)};"table"===n?(e.schema=y,e.table=t):e.schema=t;const r=await(0,p.Z)({operation:e,auth:O,url:k});r.error?(w(!1),Z(!1),x.error(r.message)):(await(0,h.Z)({auth:O,url:k}),v(a))})()},children:(0,b.jsx)("i",{className:"fa fa-check text-white"})}),(0,b.jsx)(u.Z,{id:"cancelDropItem",color:"black",className:"round",title:"Cancel drop ".concat(n," ").concat(t),onClick:()=>{w(!1)},children:(0,b.jsx)("i",{className:"fa fa-times text-white"})})]}):g?(0,b.jsx)(u.Z,{id:"dropItem",color:"danger",className:"round",title:"Drop ".concat(n," ").concat(t),onClick:()=>{w(t),l(!1)},children:(0,b.jsx)("i",{className:"fa fa-minus text-white"})}):o?(0,b.jsx)(u.Z,{tabIndex:"-1",color:"purple",className:"round",children:(0,b.jsx)("i",{className:"fa fa-chevron-right"})}):null})]},t)};const v=function(e){let{items:t,itemType:n,toggleDropItem:r,isDropping:a,toggleCreate:o,isCreating:s,showForm:l}=e;return(0,b.jsxs)(c.Z,{className:"floating-card-header",children:[(0,b.jsxs)(i.Z,{children:[n,"s"]}),l&&null!==t&&void 0!==t&&t.length?(0,b.jsxs)(i.Z,{className:"text-end",children:[(0,b.jsx)(u.Z,{id:"toggleRemove",color:"link",title:"Remove ".concat(n,"s"),className:"add-remove me-3",onClick:()=>{r(!a),o(!1)},children:(0,b.jsx)("i",{className:"fa fa-minus"})}),(0,b.jsx)(u.Z,{id:"toggleCreate",color:"link",title:"Add ".concat(n),className:"add-remove me-1",onClick:()=>{o(!s),r(!1)},children:(0,b.jsx)("i",{className:"fa fa-plus"})})]}):null]})};const x=function(e){var t;let{items:n,activeItem:c,activeSchema:i=!1,showForm:l,baseUrl:u,itemType:f}=e;const[d,p]=(0,r.useState)(!1),[h,x]=(0,r.useState)(!1),j=(0,s.Kw)(m.Z,(e=>e.registration)),[w,N]=(null===j||void 0===j||null===(t=j.version)||void 0===t?void 0:t.split("."))||[],Z=parseFloat("".concat(w,".").concat(N));return(0,r.useEffect)((()=>{x(),p()}),[c,i,n]),(0,b.jsxs)("div",{className:"entity-manager",children:[(0,b.jsx)(v,{items:n,itemType:f,isDropping:d,toggleDropItem:p,isCreating:h,toggleCreate:x,showForm:l}),(0,b.jsxs)(a.Z,{className:"my-3",children:[n&&n.length?(0,b.jsx)(o.Z,{className:"scrollable ".concat(h?"creating":""),children:n.map((e=>(0,b.jsx)(y,{item:e,itemType:f,baseUrl:u,isActive:c===e,isDropping:d,toggleDropItem:p,activeSchema:i},e)))}):null,l&&(n&&!n.length||h)?(0,b.jsx)(o.Z,{children:(0,b.jsx)(g,{items:n,itemType:f,baseUrl:u,activeSchema:i,isDropping:d,toggleDropItem:p,isCreating:h,toggleCreate:x})}):!n||n.length||l?null:(0,b.jsx)(o.Z,{children:(0,b.jsxs)("div",{className:"py-3 text-center no-content",children:["no visible ",Z>=4.2?"databases":"schemas"," or tables"]})})]})]})}},1781:(e,t,n)=>{n.d(t,{Z:()=>x});var r=n(7313),a=n(5192),o=n.n(a),s=n(6123),c=n.n(s),i=n(986);function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}var u=["className","cssModule","type","bsSize","valid","invalid","tag","addon","plaintext","innerRef"];function f(){return f=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},f.apply(this,arguments)}function d(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t){return m=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},m(e,t)}function h(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=g(e);if(t){var a=g(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"===l(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return b(e)}(this,n)}}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e){return g=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},g(e)}var y={children:o().node,type:o().string,size:o().oneOfType([o().number,o().string]),bsSize:o().string,valid:o().bool,invalid:o().bool,tag:i.iC,innerRef:o().oneOfType([o().object,o().func,o().string]),plaintext:o().bool,addon:o().bool,className:o().string,cssModule:o().object},v=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&m(e,t)}(s,e);var t,n,a,o=h(s);function s(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(t=o.call(this,e)).getRef=t.getRef.bind(b(t)),t.focus=t.focus.bind(b(t)),t}return t=s,(n=[{key:"getRef",value:function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e}},{key:"focus",value:function(){this.ref&&this.ref.focus()}},{key:"render",value:function(){var e=this.props,t=e.className,n=e.cssModule,a=e.type,o=void 0===a?"text":a,s=e.bsSize,l=e.valid,p=e.invalid,m=e.tag,h=e.addon,b=e.plaintext,g=e.innerRef,y=d(e,u),v=["switch","radio","checkbox"].indexOf(o)>-1,x="select"===o,j="range"===o,w=m||(x||"textarea"===o?o:"input"),N="form-control";b?(N="".concat(N,"-plaintext"),w=m||"input"):j?N="form-range":x?N="form-select":v&&(N=h?null:"form-check-input"),y.size&&/\D/g.test(y.size)&&((0,i.O4)('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.'),s=y.size,delete y.size);var Z=(0,i.mx)(c()(t,p&&"is-invalid",l&&"is-valid",!!s&&(x?"form-select-".concat(s):"form-control-".concat(s)),N),n);return("input"===w||m&&"function"===typeof m)&&(y.type="switch"===o?"checkbox":o),y.children&&!b&&"select"!==o&&"string"===typeof w&&"select"!==w&&((0,i.O4)('Input with a type of "'.concat(o,'" cannot have children. Please use "value"/"defaultValue" instead.')),delete y.children),r.createElement(w,f({},y,{ref:g,className:Z,"aria-invalid":p}))}}])&&p(t.prototype,n),a&&p(t,a),Object.defineProperty(t,"prototype",{writable:!1}),s}(r.Component);v.propTypes=y;const x=v}}]);