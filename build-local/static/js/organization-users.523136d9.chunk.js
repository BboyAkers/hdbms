"use strict";(self.webpackChunkharperdb_studio=self.webpackChunkharperdb_studio||[]).push([[583],{7389:(e,s,a)=>{a.r(s),a.d(s,{default:()=>R});var t=a(7313),r=a(6782),n=a(5399),i=a(7387),l=a(4122),o=a(8467),c=a(6449),d=a(9327),u=a(238),m=a(3516),h=a(6160),g=a(6855),x=a(6417);const p={tableData:!1,dataTableColumns:[],filtered:[],sorted:[{id:"email",desc:!1}],page:0,loading:!1,totalPages:1,pageSize:20,autoRefresh:!1,showFilter:!1,lastUpdate:!1};const j=function(){var e,s;const{customer_id:a}=(0,o.UO)(),l=(0,h.VY)(),j=(0,o.s0)(),[f,v]=(0,t.useState)(p),Z=null===(e=f.sorted[0])||void 0===e?void 0:e.id,b=null===(s=f.sorted[0])||void 0===s?void 0:s.desc,N=(0,i.Kw)(c.Z,(e=>e.auth)),_=(0,i.Kw)(c.Z,(e=>e.users)),w=[{Header:"email address",accessor:"email"},{Header:"status",accessor:"orgs[0].status"}],C=(0,t.useCallback)((e=>{N.user_id===e?l.error("Edit your own profile by clicking the user icon in the top nav"):j("/o/".concat(a,"/users/").concat(e))}),[N.user_id,a]);return(0,t.useEffect)((()=>{if(f.tableData.length&&Z){const e=[...[...f.tableData]].sort(((e,s)=>e[Z]>s[Z]&&b?-1:e[Z]>s[Z]||b?1:-1));v({...f,tableData:e})}}),[Z,b]),(0,t.useEffect)((()=>{_&&w&&v({...f,tableData:_,dataTableColumns:w,totalPages:Math.ceil((_.length||f.pageSize)/f.pageSize)})}),[_,v,f.pageSize]),(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(r.Z,{className:"floating-card-header",children:[(0,x.jsx)(n.Z,{children:"existing org users"}),(0,x.jsx)(n.Z,{className:"text-end",children:(0,x.jsx)(d.Z,{color:"link",tabIndex:"0",title:"Filter Users",className:"me-3",onClick:()=>v({...f,filtered:f.showFilter?[]:f.filtered,showFilter:!f.showFilter}),children:(0,x.jsx)("i",{className:"fa fa-search"})})})]}),(0,x.jsx)(u.Z,{className:"my-3",children:(0,x.jsx)(m.Z,{className:"react-table-holder",children:(0,x.jsx)(g.Z,{columns:f.dataTableColumns,data:f.tableData,currentPage:f.page,pageSize:f.pageSize,totalPages:f.totalPages,showFilter:f.showFilter,sorted:f.sorted,loading:!_||f.loading&&!f.autoRefresh,onFilteredChange:e=>v({...f,filtered:e}),onSortedChange:e=>v({...f,sorted:e}),onPageChange:e=>v({...f,pageSize:e}),onPageSizeChange:e=>v({...f,page:0,pageSize:e}),onRowClick:e=>C(e.user_id)})})})]})};var f=a(3672),v=a.n(f),Z=a(9842),b=a(2274),N=a(576);const _=async e=>{let{auth:s,customer_id:a,user_id:t,user_id_owner:r,status:n}=e;return(0,N.Z)({endpoint:"updateOrgUser",method:"POST",payload:{customer_id:a,user_id:t,user_id_owner:r,status:n},auth:s})};var w=a(2261),C=a(511);const S=async e=>{let{auth:s,customer_id:a}=e,t=null;try{t=await(0,N.Z)({endpoint:"getUsers",method:"POST",payload:{customer_id:a},auth:s});let e=[];return Array.isArray(t)&&(e=[...t].sort(((e,s)=>e.email>s.email?1:-1))),c.Z.update((s=>{s.users=e}))}catch(r){return(0,w.Z)({type:"lms data",status:"error",url:C.Z.lms_api_url,operation:"getUsers",request:{customer_id:a},error:{catch:r.toString()},customer_id:a})}};var y=a(4220);const P=function(){const{user_id:e}=(0,o.UO)(),{customer_id:s}=(0,o.UO)(),a=(0,h.VY)(),l=(0,i.Kw)(c.Z,(e=>e.auth)),u=(0,i.Kw)(c.Z,(s=>s.users&&s.users.find((s=>s.user_id===e))),[e]),[m,g]=(0,t.useState)(!1),[p,j]=(0,t.useState)({});return v()((()=>{var e,a;g(u&&(null===(e=u.orgs)||void 0===e||null===(a=e.find((e=>{var a;return(null===(a=e.customer_id)||void 0===a?void 0:a.toString())===s})))||void 0===a?void 0:a.status))}),[u,s]),v()((async()=>{const{submitted:t,processing:r}=p;if(t&&!r){const t="declined"===m?"invited":"accepted"===m?"owner":"owner"===m?"accepted":"invited";g(t);const r=await _({auth:l,user_id:e,user_id_owner:l.user_id,customer_id:s,status:t});r.error?(a.error(r.message),j({})):(a.success("User role updated to ".concat("accepted"===t?"user":t)),j({}),S({auth:l,customer_id:s}))}}),[p]),(0,x.jsx)(Z.SV,{onError:(e,a)=>(0,w.Z)({error:{message:e.message,componentStack:a},customer_id:s}),FallbackComponent:y.Z,children:["invited","declined"].includes(m)?"declined"===m?(0,x.jsxs)(r.Z,{children:[(0,x.jsxs)(n.Z,{xs:"8",className:"py-1",children:["User declined invitation to join",(0,x.jsx)("br",{}),(0,x.jsx)("span",{className:"text-small",children:"reinvite them by clicking this button"})]}),(0,x.jsx)(n.Z,{xs:"4",children:(0,x.jsx)(d.Z,{id:"reinviteOrganizationUser",block:!0,color:"success",onClick:()=>j({submitted:!0}),disabled:p.submitted,children:p.submitted?(0,x.jsx)("i",{className:"fa fa-spinner fa-spin text-white"}):(0,x.jsx)("span",{children:"Reinvite User"})})})]}):(0,x.jsx)(r.Z,{children:(0,x.jsxs)(n.Z,{className:"py-1",children:["User has not yet accepted invitation",(0,x.jsx)("br",{}),(0,x.jsx)("span",{className:"text-small",children:"You must wait for them to accept before modifying them"})]})}):(0,x.jsxs)(r.Z,{children:[(0,x.jsxs)(n.Z,{xs:"8",className:"py-1",children:["Is Owner",(0,x.jsx)("br",{}),(0,x.jsx)("span",{className:"text-small",children:"can invite other users, add instances"})]}),(0,x.jsx)(n.Z,{xs:"4",children:(0,x.jsx)("div",{className:"role-toggle-holder",children:(0,x.jsx)(b.Z,{checked:"owner"===m,onChange:()=>j({submitted:!0})})})})]})})};var k=a(1781),U=a(5447);const E=function(){const{user_id:e,customer_id:s}=(0,o.UO)(),{pathname:a}=(0,o.TH)(),l=(0,o.s0)(),u=(0,h.VY)(),[m,g]=(0,t.useState)({}),[p,j]=(0,t.useState)({}),f=(0,i.Kw)(c.Z,(e=>e.auth));return(0,x.jsx)(Z.SV,{onError:(e,a)=>(0,w.Z)({error:{message:e.message,componentStack:a},customer_id:s}),FallbackComponent:y.Z,children:(0,x.jsxs)(r.Z,{children:[(0,x.jsxs)(n.Z,{xs:"4",className:"py-1",children:["Delete Org User",(0,x.jsx)("br",{}),(0,x.jsx)("span",{className:"text-small",children:"user will be removed from this organization"})]}),(0,x.jsx)(n.Z,{xs:"4",children:(0,x.jsx)(k.Z,{id:"delete_username",onChange:e=>g({delete_username:e.target.value}),type:"text",className:"text-center",title:"confirm username to delete",placeholder:'Enter "DELETE" here to enable deletion.',value:m.delete_username||""})}),(0,x.jsx)(n.Z,{xs:"4",children:(0,x.jsx)(d.Z,{id:"deleteUser",block:!0,color:"danger",onClick:async()=>{if("DELETE"!==m.delete_username)u.error("Please type DELETE to delete this user");else{j({submitted:!0});const t=await _({auth:f,user_id:e,user_id_owner:f.user_id,customer_id:s,status:"removed"});-1!==t.message.indexOf("successfully")?(u.success(t.message),U.Z.update((e=>{e.lastUpdate=Date.now()})),j({}),setTimeout((()=>l(a.replace("/".concat(e),""))),100)):(u.error(t.message),j({}))}},disabled:"DELETE"!==m.delete_username||p.submitted,children:p.submitted?(0,x.jsx)("i",{className:"fa fa-spinner fa-spin text-white"}):(0,x.jsx)("span",{children:"Delete User"})})})]})})};const O=function(e){let{userEmail:s}=e;const{user_id:a}=(0,o.UO)(),{pathname:t}=(0,o.TH)(),i=(0,o.s0)();return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:"floating-card-header",children:["existing org users > edit > ",(0,x.jsx)("b",{children:s})]}),(0,x.jsx)(u.Z,{className:"my-3",children:(0,x.jsxs)(m.Z,{children:[(0,x.jsx)(P,{}),(0,x.jsx)("hr",{className:"my-3"}),(0,x.jsx)(E,{}),(0,x.jsx)("hr",{className:"my-3"}),(0,x.jsxs)(r.Z,{children:[(0,x.jsxs)(n.Z,{xs:"8",className:"py-1",children:["Return to User List",(0,x.jsx)("br",{}),(0,x.jsx)("span",{className:"text-small",children:"make no further changes to this user"})]}),(0,x.jsx)(n.Z,{xs:"4",children:(0,x.jsx)(d.Z,{id:"returnToOrganizationUserList",block:!0,color:"grey",onClick:()=>i(t.replace("/".concat(a),"")),children:"Return to User List"})})]})]})})]})};var z=a(4757),F=a(1891);const T=function(e){let{refreshUsers:s,userEmails:a}=e;const r=(0,o.s0)(),{customer_id:n}=(0,o.UO)(),l=(0,i.Kw)(c.Z,(e=>e.auth)),[h,g]=(0,t.useState)({}),[p,j]=(0,t.useState)({}),f="132px";return v()((async()=>{const{email:e}=p,{submitted:t}=h;if(t){if((0,z.Z)(e))if(a&&a.includes(e))g({error:"This user has already been invited"});else if(e===l.email)g({error:"You cannot invite yourself"});else{g({processing:!0});const a=await(async e=>{let{auth:s,email:a,customer_id:t,login_domain:r=window.location.host}=e;return(0,N.Z)({endpoint:"addUser",method:"POST",payload:{email:a,customer_id:t,login_domain:r,user_id:s.user_id},auth:s})})({auth:l,email:e,customer_id:n});a.error?g({error:a.message}):(window._kmq&&window._kmq.push(["record","added org user"]),s(),g({success:a.message}))}else g({error:"Please enter a valid email"});setTimeout((()=>j({})),2e3)}}),[h]),v()((()=>g({})),[p]),(0,x.jsx)(Z.SV,{onError:(e,s)=>(0,w.Z)({error:{message:e.message,componentStack:s},customer_id:n}),FallbackComponent:y.Z,children:(0,x.jsx)("div",{className:"mt-3 mb-4",children:l.email_bounced?(0,x.jsx)(u.Z,{children:(0,x.jsxs)(m.Z,{children:[(0,x.jsx)("b",{children:"Unable to Add New Org User"}),(0,x.jsx)("br",{}),(0,x.jsx)("br",{}),"Your email address seems to be unreachable. Please update it to ensure billing, upgrade, and other critical system announcements reach you.",(0,x.jsx)("br",{}),(0,x.jsx)("br",{}),(0,x.jsx)(d.Z,{id:"updateEmail",onClick:()=>r("/profile"),title:"Update My Email",block:!0,className:"mt-3",color:"danger",children:"Update My Email"})]})}):h.processing?(0,x.jsx)(F.Z,{height:f,status:"processing",header:"Adding User",subhead:"The Account Airedale Is A Good Boy"}):h.success?(0,x.jsx)(F.Z,{height:f,status:"success",header:"Success!",subhead:h.success}):h.error?(0,x.jsx)(F.Z,{height:f,status:"error",header:h.error,subhead:"Please try again"}):(0,x.jsx)(u.Z,{children:(0,x.jsxs)(m.Z,{children:[(0,x.jsx)(k.Z,{id:"email",type:"text",className:"mb-3 text-center",name:"email",placeholder:"email address",onChange:e=>j({...p,email:e.target.value.toLowerCase()}),disabled:h.submitted}),(0,x.jsx)(d.Z,{id:"addOrganizationUser",color:"success",block:!0,onClick:()=>g({submitted:!0}),disabled:h.submitted,children:"Add Org User"})]})})})})};var D=a(6047);const R=function(){const{user_id:e,customer_id:s}=(0,o.UO)(),a=(0,i.Kw)(c.Z,(e=>e.auth)),d=(0,i.Kw)(c.Z,(e=>e.users)),u=e&&d&&d.find((s=>s.user_id===e)),m=(0,t.useCallback)((()=>{a&&s&&S({auth:a,customer_id:s})}),[a,s]);return(0,t.useEffect)((()=>{m(),(0,D.Z)({auth:a,customer_id:s})}),[]),(0,l.Z)((()=>m()),C.Z.refresh_content_interval),(0,x.jsxs)(r.Z,{children:[(0,x.jsxs)(n.Z,{xl:"3",lg:"4",md:"5",xs:"12",children:[(0,x.jsx)("span",{className:"floating-card-header",children:"add org user"}),(0,x.jsx)(T,{refreshUsers:m,userEmails:d&&d.map((e=>"declined"!==e.orgs[0].status&&e))})]}),(0,x.jsx)(n.Z,{xl:"9",lg:"8",md:"7",xs:"12",className:"pb-5",children:u?(0,x.jsx)(O,{userEmail:u.email}):(0,x.jsx)(j,{refreshUsers:m})})]})}},6855:(e,s,a)=>{a.d(s,{Z:()=>Z});var t=a(7313),r=a(5110),n=a(1781),i=a(9842),l=a(6782),o=a(5399),c=a(6417);const d=e=>{let{headerGroups:s,onSortedChange:a,sorted:t,showFilter:r}=e;return s.map((e=>(0,c.jsxs)("div",{...e.getHeaderGroupProps(),children:[(0,c.jsx)(l.Z,{className:"header g-0",children:e.headers.map((e=>{var s,r;return(0,c.jsx)(o.Z,{onClick:()=>{var s,r;return a([{id:e.id,desc:(null===(s=t[0])||void 0===s?void 0:s.id)===e.id&&!(null!==(r=t[0])&&void 0!==r&&r.desc)}])},className:"".concat((null===(s=t[0])||void 0===s?void 0:s.id)===e.id?"sorted":""," ").concat(null!==(r=t[0])&&void 0!==r&&r.desc?"desc":"asc"," ").concat(-1!==e.id.indexOf("hdb-narrow")?"action":""," px-1"),children:(0,c.jsx)("div",{className:"text-renderer",children:e.render("Header")})},e.id)}))}),r&&(0,c.jsx)(l.Z,{className:"filter g-0",children:e.headers.map((e=>(0,c.jsx)(o.Z,{className:-1!==e.id.indexOf("hdb-narrow")?"action":"",children:e.render("Filter")},e.id)))})]})))};var u=a(9327);const m=function(e){let{page:s,pageSize:a,totalPages:t,onPageChange:r,onPageSizeChange:i,loading:d}=e;return(0,c.jsxs)(l.Z,{className:"pagination",children:[(0,c.jsx)(o.Z,{xs:"12",sm:"2",className:"previous",children:(0,c.jsx)(u.Z,{className:"mb-2 btn-pagination",color:"purple",block:!0,onClick:()=>r(s-1),disabled:!t||0===s,children:(0,c.jsx)("i",{className:"fa fa-chevron-left"})})}),(0,c.jsxs)(o.Z,{xs:"12",sm:"4",className:"paginator",children:[(0,c.jsx)("i",{className:"fa fa-book me-2"}),(0,c.jsx)(n.Z,{className:"mb-2",type:"number",value:s+1,min:1,max:t,onChange:e=>r(e.target.value-1)}),(0,c.jsxs)("div",{className:"page-count",children:["\xa0/\xa0",d?(0,c.jsx)("i",{className:"fa fa-spinner fa-spin"}):t]})]}),(0,c.jsx)(o.Z,{xs:"12",sm:"4",className:"page-size",children:(0,c.jsx)(n.Z,{className:"mb-2",type:"select",value:a,onChange:e=>i(e.target.value),children:[20,50,100,250].map((e=>(0,c.jsxs)("option",{value:e,children:[e," rows"]},e)))})}),(0,c.jsx)(o.Z,{xs:"12",sm:"2",className:"next",children:(0,c.jsx)(u.Z,{className:"mb-2 pull-right btn-pagination",block:!0,color:"purple",onClick:()=>r(s+1),disabled:!t||s+1===t,children:(0,c.jsx)("i",{className:"fa fa-chevron-right"})})})]})};const h=function(e){let{previousPage:s,canPreviousPage:a,pageIndex:t,gotoPage:r,setPageSize:i,pageCount:d,nextPage:m,canNextPage:h,loading:g}=e;return(0,c.jsxs)(l.Z,{className:"pagination",children:[(0,c.jsx)(o.Z,{xs:"12",sm:"2",className:"previous",children:(0,c.jsx)(u.Z,{className:"mb-2 btn-pagination",color:"purple",block:!0,onClick:s,disabled:!d||!a,children:(0,c.jsx)("i",{className:"fa fa-chevron-left"})})}),(0,c.jsxs)(o.Z,{xs:"12",sm:"4",className:"paginator",children:[(0,c.jsx)("i",{className:"fa fa-book me-2"}),(0,c.jsx)(n.Z,{className:"mb-2",type:"number",value:t+1||1,min:1,max:d,onChange:e=>r(e.target.value?Number(e.target.value)-1:0)}),(0,c.jsxs)("div",{className:"page-count",children:["\xa0/\xa0",g?(0,c.jsx)("i",{className:"fa fa-spinner fa-spin"}):d]})]}),(0,c.jsx)(o.Z,{xs:"12",sm:"4",className:"page-size",children:(0,c.jsx)(n.Z,{className:"mb-2",type:"select",onChange:e=>{r(0),setTimeout((()=>i(e.target.value)),1e3)},children:[20,50,100,250].map((e=>(0,c.jsxs)("option",{value:e,children:[e," rows"]},e)))})}),(0,c.jsx)(o.Z,{xs:"12",sm:"2",className:"next",children:(0,c.jsx)(u.Z,{className:"mb-2 pull-right btn-pagination",block:!0,color:"purple",onClick:m,disabled:!d||!h,children:(0,c.jsx)("i",{className:"fa fa-chevron-right"})})})]})};const g=function(e){let{prepareRow:s,row:a,onRowClick:t=!1}=e;return s(a),(0,c.jsx)(l.Z,{onClick:()=>t&&t(a.original),className:"g-0",children:a.cells.map((e=>(0,c.jsx)(o.Z,{className:-1!==e.column.id.indexOf("hdb-narrow")?"action":"",children:e.render("Cell")},"".concat(e.row.id,"-").concat(e.column.id))))})};var x=a(2261),p=a(4220);function j(e){let{value:s}=e;return(0,c.jsx)("div",{className:"text-renderer",children:s})}function f(e){let{src:s}=e;const[a,r]=(0,t.useState)(!1),[n,i]=(0,t.useState)(!1);return(0,c.jsxs)("div",{className:"image-renderer",onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),children:[(0,c.jsx)("i",{className:"fa fa-image"}),a&&n?(0,c.jsxs)("div",{className:"preview-image no-image",children:[(0,c.jsx)("i",{className:"fa fa-ban text-danger"}),(0,c.jsx)("div",{className:"mt-2",children:"image failed to load"})]}):a?(0,c.jsx)("img",{onError:i,alt:s,src:s,className:"preview-image"}):null]})}const v={Filter:e=>{let{column:{filterValue:s,setFilter:a}}=e;return(0,c.jsx)(n.Z,{type:"text",value:s||"",onChange:e=>a(e.target.value||void 0)})},Cell:e=>{let{value:s}=e;return(e=>{switch(Object.prototype.toString.call(e)){case"[object Array]":case"[object Object]":return(0,c.jsx)(j,{value:JSON.stringify(e)});case"[object Boolean]":return(0,c.jsx)(j,{value:e?"true":"false"});case"[object String]":return(s=e)&&(s.match(/^https?.*\.(jpeg|jpg|gif|png)$/)||-1!==s.indexOf("data:image"))?(0,c.jsx)(f,{src:e}):(0,c.jsx)(j,{value:e});default:return(0,c.jsx)(j,{value:e})}var s})(s)}};const Z=function(e){let{columns:s,data:a,currentPage:n,pageSize:l,totalPages:o,onFilteredChange:u,onSortedChange:j,onPageChange:f,onPageSizeChange:Z,showFilter:b,onRowClick:N,sorted:_,loading:w,manual:C=!1}=e;const{headerGroups:S,page:y,rows:P,prepareRow:k,state:U,setAllFilters:E,canPreviousPage:O,canNextPage:z,pageOptions:F,pageCount:T,gotoPage:D,nextPage:R,previousPage:A,setPageSize:L}=(0,r.useTable)({columns:s,data:a,defaultColumn:v,onFilteredChange:u,onSortedChange:j,onPageChange:f,onPageSizeChange:Z,onRowClick:N,manualPagination:C,manualFilters:C,initialState:{pageIndex:n,pageSize:l}},r.useFilters,r.usePagination),[K,V]=(0,t.useState)(!0),I=C||!y.length?P:y;return(0,t.useEffect)((()=>{!b&&U.filters.length?E([]):u(U.filters)}),[U.filters,b]),(0,t.useEffect)((()=>{setTimeout((()=>V(!1)),100)}),[null===I||void 0===I?void 0:I.length]),(0,c.jsxs)(i.SV,{onError:(e,s)=>(0,x.Z)({error:{message:e.message,componentStack:s}}),FallbackComponent:p.Z,children:[(0,c.jsxs)("div",{className:"react-table-scroller",children:[(0,c.jsx)(d,{headerGroups:S,onSortedChange:j,sorted:_,showFilter:b}),w||K?(0,c.jsx)("div",{className:"centered text-center",children:(0,c.jsx)("i",{className:"fa fa-spinner fa-spin"})}):I.length?I.map((e=>(0,c.jsx)(g,{row:e,prepareRow:k,onRowClick:N},e.id))):(0,c.jsxs)("div",{className:"centered text-center",children:[(0,c.jsx)("i",{className:"fa fa-exclamation-triangle text-danger"}),(0,c.jsx)("div",{className:"mt-2 text-darkgrey",children:"no records"})]})]}),C?(0,c.jsx)(m,{page:n,pageSize:l,totalPages:o,onPageChange:f,onPageSizeChange:Z,loading:w}):(0,c.jsx)(h,{previousPage:A,pageSize:l,canPreviousPage:O,pageIndex:U.pageIndex,pageOptions:F,gotoPage:D,setPageSize:L,pageCount:T,nextPage:R,canNextPage:z,loading:w})]})}},1891:(e,s,a)=>{a.d(s,{Z:()=>i});a(7313);var t=a(238),r=a(3516),n=a(6417);const i=function(e){let{header:s,subhead:a=" ",height:i,status:l,className:o}=e;return(0,n.jsx)(t.Z,{className:"form-status ".concat(o),children:(0,n.jsxs)(r.Z,{className:"text-center",style:{height:i},children:[(0,n.jsx)("div",{className:"text-bold",children:s}),(0,n.jsx)("div",{className:"py-4",children:(0,n.jsx)("i",{className:"fa fa-lg ".concat("processing"===l?"fa-spinner fa-spin text-purple":"success"===l?"fa-check-circle text-purple":"fa-exclamation-triangle text-danger")})}),(0,n.jsx)("div",{className:"text-grey",children:a})]})})}},6047:(e,s,a)=>{a.d(s,{Z:()=>o});var t=a(576),r=a(6449),n=a(2261),i=a(511),l=a(2174);const o=async e=>{let{auth:s,customer_id:a}=e,o=null;try{var c;return o=await(0,t.Z)({endpoint:"getCustomer",method:"POST",payload:{customer_id:a},auth:s}),(0,l.Z)({auth:s,customer_id:a,stripe_id:null===(c=o)||void 0===c?void 0:c.stripe_id}),o.error||r.Z.update((e=>{var s;e.customer={...o,customer_id:a},e.hasCard=null===(s=o.stripe_payment_methods)||void 0===s?void 0:s[0]})),o}catch(d){return(0,n.Z)({type:"lms data",status:"error",url:i.Z.lms_api_url,operation:"getCustomer",request:{customer_id:a},error:{catch:d.toString()},customer_id:a})}}},2174:(e,s,a)=>{a.d(s,{Z:()=>c});var t=a(576),r=a(6449),n=a(2261),i=a(8329),l=a(9274),o=a(511);const c=async e=>{let{auth:s,customer_id:a,stripe_id:c}=e;try{const e=await(0,t.Z)({endpoint:"getPrepaidSubscriptions",method:"POST",payload:{customer_id:a,stripe_id:c},auth:s});return!e.error&&r.Z.update((s=>{s.subscriptions={cloud_storage:(0,l.Z)(e.cloud_storage||[]),cloud_compute:(0,i.Z)(e.cloud_compute||[]),wavelength_compute:(0,i.Z)(e.wavelength_compute||[]),local_compute:(0,i.Z)(e.local_compute||[])}}))}catch(d){return(0,n.Z)({type:"lms data",status:"error",url:o.Z.lms_api_url,operation:"getPrepaidSubscriptions",error:{catch:d.toString()}})}}},5447:(e,s,a)=>{a.d(s,{Z:()=>t});const t=new(a(7387).yh)({})},4757:(e,s,a)=>{a.d(s,{Z:()=>t});const t=e=>/^\S+@\S+\.\S+$/.test(String(e).toLowerCase())}}]);