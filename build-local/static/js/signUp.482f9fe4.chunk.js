"use strict";(self.webpackChunkharperdb_studio=self.webpackChunkharperdb_studio||[]).push([[150],{5313:(e,t,n)=>{n.r(t),n.d(t,{default:()=>_});var r=n(7313),o=n(238),a=n(3516),i=n(6782),s=n(5399),c=n(6597),l=n(1781),u=n(9327),f=n(8467),d=n(2135),p=n(3672),m=n.n(p),b=n(5733),h=n(7387),y=n(4757),g=n(576);var v=n(7360),x=n(6345);const j=async e=>{let{formData:t,theme:n}=e;const{firstname:r,lastname:o,email:a,subdomain:i,coupon_code:s,htuk:c,pageName:l,pageUri:u}=t;if(!r||!o||!a||!i)return{error:"All fields must be filled out"};if(!(0,y.Z)(a))return{error:"Please provide a valid email"};if(!(0,v.Z)(i))return{error:"subdomain: alphanumeric characters only"};if(i.length>16)return{error:"subdomain: max 16 characters"};if("akamai"===n&&-1===t.email.indexOf("harperdb.io")&&-1===t.email.indexOf("akamai.com"))return{error:"portal signup denied"};const f=await(async e=>{let{firstname:t,lastname:n,email:r,customer_name:o,subdomain:a,coupon_code:i,htuk:s,pageName:c,pageUri:l,login_domain:u=window.location.host}=e;return(0,g.Z)({endpoint:"addCustomer",method:"POST",payload:{firstname:t,lastname:n,email:r,customer_name:o,subdomain:a,coupon_code:i,htuk:s,pageName:c,pageUri:l,login_domain:u}})})({firstname:r,lastname:o,email:a,customer_name:"".concat(r,"'s Org"),subdomain:i,coupon_code:s,htuk:c,pageName:l,pageUri:u});return f.error?{error:f.message.replace("Bad request: ","").replace(/['"]+/g,"")}:(window._kmq&&(window._kmq.push(["identify",a]),window._kmq.push(["record","successful_signup",{email:a,firstname:r,lastname:o}])),f.temp_password?(0,x.Z)({email:a,pass:f.temp_password,loggingIn:!0}):{success:!0})};var O=n(7377),w=n(6449),k=n(6417);const _=function(){const{search:e}=(0,f.TH)(),{code:t,htuk:n,pageName:p,pageUri:y}=b.Z.parse(e),g=(0,h.Kw)(w.Z,(e=>e.auth)),v=(0,h.Kw)(w.Z,(e=>e.theme)),[x,_]=(0,r.useState)({}),[N,S]=(0,r.useState)({coupon_code:t,htuk:n,pageName:p,pageUri:y}),[P,C]=(0,r.useState)(!1);return m()((async()=>{if(x.submitted){const e=await j({formData:N,theme:v});!g.email&&e&&_(e)}}),[x]),(0,r.useEffect)((()=>{x.submitted||_({})}),[N]),x.submitted?(0,k.jsx)("div",{id:"login-form",children:(0,k.jsx)(O.Z,{header:"creating your account",spinner:!0,relative:!0})}):(0,k.jsxs)("div",{id:"login-form",className:"sign-up",children:[(0,k.jsx)(o.Z,{className:"mb-3",children:(0,k.jsxs)(a.Z,{className:"px-3",onKeyDown:e=>13!==e.keyCode||_({submitted:!0}),children:[(0,k.jsx)("div",{className:"sign-up-header",children:"Sign Up And Launch Your Free HarperDB Cloud Instance Today"}),(0,k.jsxs)(i.Z,{children:[(0,k.jsxs)(s.Z,{xs:"12",md:"8",children:[(0,k.jsxs)("div",{className:"sign-up-content",children:[(0,k.jsxs)("ul",{children:[(0,k.jsx)("li",{children:"Provision HarperDB Cloud and user-installed instances"}),(0,k.jsx)("li",{children:"Configure instance databases, tables, users, roles, and clustering"}),(0,k.jsx)("li",{children:"Create and monitor real-time charts based on custom queries"}),(0,k.jsx)("li",{children:"Bulk data import via CSV upload or URL"})]}),(0,k.jsx)("h3",{children:"Check Out Our Developer Resources Above"}),(0,k.jsxs)("ul",{className:"mt-3",children:[(0,k.jsx)("li",{children:"SDKs, Drivers, and language-specific Code Snippets"}),(0,k.jsx)("li",{children:"Video Tutorials"}),(0,k.jsx)("li",{children:"HarperDB Migrator"})]}),(0,k.jsx)("hr",{className:"mt-4 mb-3"}),(0,k.jsx)("div",{className:"d-none d-md-block",children:(0,k.jsxs)("div",{className:"disclaimer",children:["By creating an account, you agree to the\xa0",(0,k.jsx)("a",{href:"https://harperdb.io/legal/privacy-policy/",target:"_blank",rel:"noopener noreferrer",children:"Privacy Policy"}),"\xa0and\xa0",(0,k.jsx)("a",{href:"https://harperdb.io/legal/harperdb-cloud-terms-of-service/",target:"_blank",rel:"noopener noreferrer",children:"Terms of Service"})]})})]}),(0,k.jsx)("hr",{className:"mt-4 mb-3 d-block d-md-none"})]}),(0,k.jsx)(s.Z,{xs:"12",md:"4",children:(0,k.jsxs)(c.Z,{className:"sign-up-form",children:[(0,k.jsx)(l.Z,{id:"firstname",name:"fname",autoComplete:"given-name",className:"text-center mb-2",type:"text",title:"first name",placeholder:"first name",value:N.firstname||"",disabled:x.submitted,onChange:e=>S({...N,firstname:e.target.value})}),(0,k.jsx)(l.Z,{id:"lastname",name:"lname",autoComplete:"family-name",className:"text-center mb-2",type:"text",title:"last name",placeholder:"last name",value:N.lastname||"",disabled:x.submitted,onChange:e=>S({...N,lastname:e.target.value})}),(0,k.jsx)(l.Z,{id:"email",autoComplete:"email",name:"email",className:"text-center mb-2",type:"text",title:"email",placeholder:"email",value:N.email||"",disabled:x.submitted,onChange:e=>S({...N,email:e.target.value.toLowerCase()})}),(0,k.jsxs)(i.Z,{children:[(0,k.jsx)(s.Z,{className:"subdomain-form",children:(0,k.jsx)(l.Z,{id:"subdomain",name:"subdomain",className:"text-center mb-2",type:"text",title:"subdomain",placeholder:"subdomain",value:N.subdomain||"",disabled:x.submitted,onChange:e=>S({...N,subdomain:e.target.value.substring(0,15).toLowerCase()})})}),(0,k.jsxs)(s.Z,{className:"subdomain-label",children:[".harperdbcloud.com"," ",(0,k.jsx)(u.Z,{color:"link",onClick:()=>C(!P),children:(0,k.jsx)("i",{className:"fa fa-question-circle"})})]})]}),P&&(0,k.jsx)("i",{className:"subdomain-explanation",children:"The URL of your HarperDB Cloud Instances"}),(0,k.jsx)(l.Z,{id:"coupon_code",type:"text",className:"text-center mb-2",name:"coupon_code",title:"coupon code",placeholder:"coupon code (optional)",value:N.coupon_code||"",onChange:e=>S({...N,coupon_code:e.target.value}),disabled:x.submitted}),(0,k.jsxs)("div",{className:"d-block d-md-none",children:[(0,k.jsx)("hr",{}),(0,k.jsxs)("div",{className:"disclaimer text-center",children:["By creating an account, you agree to the\xa0",(0,k.jsx)("a",{href:"https://harperdb.io/legal/privacy-policy/",target:"_blank",rel:"noopener noreferrer",children:"Privacy Policy"}),"\xa0and\xa0",(0,k.jsx)("a",{href:"https://harperdb.io/legal/harperdb-cloud-terms-of-service/",target:"_blank",rel:"noopener noreferrer",children:"Terms of Service"})]}),(0,k.jsx)("hr",{})]}),(0,k.jsx)(u.Z,{id:"sign-up",color:"purple",block:!0,disabled:x.submitted,onClick:()=>_({submitted:!0}),children:x.submitted?(0,k.jsx)("i",{className:"fa fa-spinner fa-spin text-white"}):(0,k.jsx)("span",{children:"Sign Up For Free"})})]})})]})]})}),(0,k.jsx)("div",{className:"text-center",children:x.error?(0,k.jsxs)("div",{className:"login-nav-link error",children:[x.error,"\xa0"]}):(0,k.jsx)(d.OL,{to:"/",className:"login-nav-link",children:"Already Have An Account? Sign In Instead."})})]})}},7360:(e,t,n)=>{n.d(t,{Z:()=>r});const r=e=>e.match(/^[a-z0-9]+$/i)},4757:(e,t,n)=>{n.d(t,{Z:()=>r});const r=e=>/^\S+@\S+\.\S+$/.test(String(e).toLowerCase())},6597:(e,t,n)=>{n.d(t,{Z:()=>g});var r=n(7313),o=n(5192),a=n.n(o),i=n(986);function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}var c=["className","cssModule","tag","innerRef"];function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l.apply(this,arguments)}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,t){return d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},d(e,t)}function p(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=b(e);if(t){var o=b(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"===s(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return m(e)}(this,n)}}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function b(e){return b=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},b(e)}var h={children:a().node,tag:i.iC,innerRef:a().oneOfType([a().object,a().func,a().string]),className:a().string,cssModule:a().object},y=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&d(e,t)}(s,e);var t,n,o,a=p(s);function s(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(t=a.call(this,e)).getRef=t.getRef.bind(m(t)),t.submit=t.submit.bind(m(t)),t}return t=s,(n=[{key:"getRef",value:function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e}},{key:"submit",value:function(){this.ref&&this.ref.submit()}},{key:"render",value:function(){var e=this.props,t=e.className,n=e.cssModule,o=e.tag,a=void 0===o?"form":o,s=e.innerRef,f=u(e,c),d=(0,i.mx)(t,n);return r.createElement(a,l({},f,{ref:s,className:d}))}}])&&f(t.prototype,n),o&&f(t,o),Object.defineProperty(t,"prototype",{writable:!1}),s}(r.Component);y.propTypes=h;const g=y},1781:(e,t,n)=>{n.d(t,{Z:()=>x});var r=n(7313),o=n(5192),a=n.n(o),i=n(6123),s=n.n(i),c=n(986);function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}var u=["className","cssModule","type","bsSize","valid","invalid","tag","addon","plaintext","innerRef"];function f(){return f=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},f.apply(this,arguments)}function d(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t){return m=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},m(e,t)}function b(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=y(e);if(t){var o=y(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"===l(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return h(e)}(this,n)}}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return y=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},y(e)}var g={children:a().node,type:a().string,size:a().oneOfType([a().number,a().string]),bsSize:a().string,valid:a().bool,invalid:a().bool,tag:c.iC,innerRef:a().oneOfType([a().object,a().func,a().string]),plaintext:a().bool,addon:a().bool,className:a().string,cssModule:a().object},v=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&m(e,t)}(i,e);var t,n,o,a=b(i);function i(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(t=a.call(this,e)).getRef=t.getRef.bind(h(t)),t.focus=t.focus.bind(h(t)),t}return t=i,(n=[{key:"getRef",value:function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e}},{key:"focus",value:function(){this.ref&&this.ref.focus()}},{key:"render",value:function(){var e=this.props,t=e.className,n=e.cssModule,o=e.type,a=void 0===o?"text":o,i=e.bsSize,l=e.valid,p=e.invalid,m=e.tag,b=e.addon,h=e.plaintext,y=e.innerRef,g=d(e,u),v=["switch","radio","checkbox"].indexOf(a)>-1,x="select"===a,j="range"===a,O=m||(x||"textarea"===a?a:"input"),w="form-control";h?(w="".concat(w,"-plaintext"),O=m||"input"):j?w="form-range":x?w="form-select":v&&(w=b?null:"form-check-input"),g.size&&/\D/g.test(g.size)&&((0,c.O4)('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.'),i=g.size,delete g.size);var k=(0,c.mx)(s()(t,p&&"is-invalid",l&&"is-valid",!!i&&(x?"form-select-".concat(i):"form-control-".concat(i)),w),n);return("input"===O||m&&"function"===typeof m)&&(g.type="switch"===a?"checkbox":a),g.children&&!h&&"select"!==a&&"string"===typeof O&&"select"!==O&&((0,c.O4)('Input with a type of "'.concat(a,'" cannot have children. Please use "value"/"defaultValue" instead.')),delete g.children),r.createElement(O,f({},g,{ref:y,className:k,"aria-invalid":p}))}}])&&p(t.prototype,n),o&&p(t,o),Object.defineProperty(t,"prototype",{writable:!1}),i}(r.Component);v.propTypes=g;const x=v},3672:(e,t,n)=>{var r=n(7313);function o(e,t,n){var o="function"===typeof t;r.useEffect((function(){var n,r=!0,a=e((function(){return r}));return Promise.resolve(a).then((function(e){n=e})),function(){r=!1,o&&t(n)}}),o?n:t)}e.exports=o,e.exports.useAsyncEffect=o}}]);