import{d as P,_ as V,a as q,q as z}from"./YArB2Qkr.js";import{d as D,q as E,z as R,A as c,B as S,C as T,D as U,c as M,e as h,E as t,f as r,g as e,w as y,G as j,t as a,y as F,l as G,K as v,i as k,H}from"./DmaMFHg2.js";import{_ as W}from"./BGmFh02g.js";import{_ as J}from"./Di3jVPmG.js";import{u as O}from"./Ck_H0VPU.js";import{_ as Q}from"./DlAUqK2U.js";const X={key:0},Y={class:"text-sm font-extralight"},Z={class:"writing mx-auto px-4 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"},tt={class:"info-section mt-1 flex flex-col gap-2 sm:flex-row sm:gap-4"},et=D({__name:"[...slug]",async setup(ot){let n,u;const s=E(),{locale:_,t:m,localeProperties:$}=R(),C=c(()=>Array.isArray(s.params.slug)?s.params.slug:[s.params.slug]),p=c(()=>F(G(_.value,"articles",...C.value))),b=c(()=>`articles_${_.value}`),{data:o}=([n,u]=S(async()=>O(p.value,async()=>await z(b.value).path(p.value).first(),"$WKxwz6obVu")),n=await n,u(),n);if(!o.value)throw T({statusCode:404,statusMessage:"Page not found"});const{copy:d}=U();function A(){d(`${window.location.origin}${s.fullPath}`),v.success(m("global.article_link_copied"))}return P({meta_k:{usingInput:!0,handler:()=>{d(`${window.location.origin}${s.fullPath}`),v.success(m("global.article_link_copied"))}}}),(i,l)=>{var g,x,f,w;const B=V,L=H,I=W,K=J,N=q;return t(o)?(k(),M("div",X,[r(B,{page:t(o),"is-writing":t(s).path.includes("/articles/")},null,8,["page","is-writing"]),r(I,{to:"/writing",class:"mx-auto my-8 flex cursor-pointer items-center gap-2 px-4 text-muted hover:text-primary transition-colors duration-200 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"},{default:y(()=>[r(L,{name:"lucide:arrow-left",class:"size-4"}),e("span",Y,a(i.$t("navigation.writing")),1)]),_:1}),e("article",Z,[e("h1",null,a((g=t(o))==null?void 0:g.title),1),e("div",tt,[e("p",null,a((x=t(o))==null?void 0:x.date),1),l[0]||(l[0]=e("p",{class:"hidden sm:block"}," | ",-1)),e("p",null,a((f=t(o))==null?void 0:f.readingTime)+" "+a(i.$t("writing.readingTime")),1),l[1]||(l[1]=e("p",{class:"hidden sm:block"}," | ",-1)),r(K,{text:i.$t("writing.copy_link"),shortcuts:["⌘","K"]},{default:y(()=>[e("p",{class:"flex cursor-pointer select-none items-center gap-1 transition-colors duration-200 hover:text-primary",onClick:A},a(i.$t("writing.share")),1)]),_:1},8,["text"])]),t(o)?(k(),j(N,{key:0,dir:((w=t($))==null?void 0:w.dir)??"ltr",value:t(o)},null,8,["dir","value"])):h("",!0)])])):h("",!0)}}}),ct=Q(et,[["__scopeId","data-v-058df20d"]]);export{ct as default};
