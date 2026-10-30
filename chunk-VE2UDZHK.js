import{c as w}from"./chunk-LY4DWC2M.js";import{a as H}from"./chunk-RMLYPZM6.js";import{b as U}from"./chunk-ETXHTPXV.js";import{a as G}from"./chunk-OVO5JOU5.js";import{a as q}from"./chunk-K6XSNQGH.js";import{F as R,L as B,R as j,T as N,U as V,V as Q,d as P,x as y}from"./chunk-2ECV5MQ6.js";import{Ab as n,Bb as I,Gb as v,Ib as m,Kb as d,Oa as T,Qa as r,U as g,Vb as k,Wb as A,Y as D,Yb as o,Zb as h,ca as b,cb as p,da as u,db as f,mc as F,oa as O,rb as _,sb as C,tb as S,vb as z,wb as L,xb as M,yb as x,zb as a}from"./chunk-OJHZRWD3.js";var et=(()=>{class i{_animationsDisabled=B();state="unchecked";disabled=!1;appearance="full";constructor(){}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=p({type:i,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(t,c){t&2&&A("mat-pseudo-checkbox-indeterminate",c.state==="indeterminate")("mat-pseudo-checkbox-checked",c.state==="checked")("mat-pseudo-checkbox-disabled",c.disabled)("mat-pseudo-checkbox-minimal",c.appearance==="minimal")("mat-pseudo-checkbox-full",c.appearance==="full")("_mat-animation-noopable",c._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(t,c){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--mat-pseudo-checkbox-full-unselected-icon-color, var(--mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--mat-pseudo-checkbox-full-selected-icon-color, var(--mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-full-selected-checkmark-color, var(--mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2,changeDetection:0})}return i})();var K=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=f({type:i});static \u0275inj=g({imports:[y]})}return i})();var X=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=f({type:i});static \u0275inj=g({imports:[R,j,K,y,w]})}return i})();var Z=(i,s)=>s.id;function $(i,s){if(i&1){let e=v();a(0,"button",16),m("click",function(){b(e);let c=d();return u(c.clearFilters())}),a(1,"mat-icon",17),o(2,"clear"),n(),o(3," Limpar filtros "),n()}}function Y(i,s){if(i&1){let e=v();a(0,"button",18),m("click",function(){let c=b(e).$implicit,l=d();return u(l.selectCategory(l.articleService.selectedCategory()===c?null:c))}),o(1),n()}if(i&2){let e=s.$implicit,t=d();k("background",t.articleService.selectedCategory()===e?"var(--link-color)":"var(--tag-bg)")("color",t.articleService.selectedCategory()===e?"white":"var(--tag-color)"),_("aria-pressed",t.articleService.selectedCategory()===e),r(),h(e)}}function J(i,s){if(i&1){let e=v();a(0,"div",19),m("click",function(){let c=b(e).$implicit,l=d();return u(l.selectSource(l.articleService.selectedSource()===c.id?null:c.id))}),a(1,"div",20),I(2,"div",21),a(3,"span",22),o(4),n()(),a(5,"a",23),m("click",function(c){return c.stopPropagation()}),a(6,"mat-icon",24),o(7,"open_in_new"),n()()()}if(i&2){let e=s.$implicit,t=d();k("background",t.articleService.selectedSource()===e.id?e.color+"20":"transparent"),_("aria-pressed",t.articleService.selectedSource()===e.id)("aria-label","Filtrar por "+e.name),r(2),k("background",e.color),r(2),h(e.name),r(),x("href",e.url,T),_("aria-label","Visitar "+e.name)}}var W=class i{constructor(){this.articleService=D(H);this.sources=q;this.searchInput=O("");this.categories=["Oncologia","Cardiologia","Neurologia","Infectologia","Gen\xF4mica","Farmacologia","Sa\xFAde Mental","Pediatria","Imunologia","Endocrinologia"];this.aiProcessedCount=F(()=>this.articleService.articles().filter(s=>s.aiProcessed).length)}onSearch(s){this.searchInput.set(s),this.articleService.setSearch(s)}selectCategory(s){this.articleService.setCategory(s)}selectSource(s){this.articleService.setSource(s)}clearFilters(){this.articleService.setSearch(""),this.articleService.setCategory(null),this.articleService.setSource(null),this.searchInput.set("")}static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275cmp=p({type:i,selectors:[["app-sidebar"]],decls:46,vars:5,consts:[["role","complementary","aria-label","Barra lateral \u2013 Filtros e fontes",1,"space-y-6"],[1,"rounded-xl","p-4",2,"background","var(--bg-secondary)","border","1px solid var(--border-color)"],[1,"font-bold","text-sm","mb-3","flex","items-center","gap-2",2,"color","var(--text-primary)"],[2,"font-size","18px","color","var(--link-color)"],[1,"relative"],["type","search","placeholder","Buscar artigos...","aria-label","Campo de busca de artigos",1,"w-full","px-3","py-2","rounded-lg","text-sm","outline-none",2,"background","var(--bg-primary)","border","1.5px solid var(--border-color)","color","var(--text-primary)",3,"input","value"],[1,"mt-2","text-xs","flex","items-center","gap-1","cursor-pointer",2,"color","var(--link-color)","background","none","border","none","padding","0"],[1,"flex","flex-wrap","gap-2"],[1,"text-xs","px-2.5","py-1","rounded-full","cursor-pointer","transition-all","font-medium","border-none",3,"background","color"],[1,"space-y-2"],["role","button",1,"flex","items-center","justify-between","p-2","rounded-lg","transition-all","cursor-pointer",2,"hover","opacity-80",3,"background"],[1,"rounded-xl","p-4",2,"background","var(--bg-highlight)","border","1px solid var(--border-color)"],[1,"font-bold","text-sm","mb-3","flex","items-center","gap-2",2,"color","#1B5E20"],[2,"font-size","18px","color","#388E3C"],[1,"space-y-2","text-sm",2,"color","#2E7D32"],[1,"flex","justify-between"],[1,"mt-2","text-xs","flex","items-center","gap-1","cursor-pointer",2,"color","var(--link-color)","background","none","border","none","padding","0",3,"click"],[2,"font-size","14px","width","14px","height","14px"],[1,"text-xs","px-2.5","py-1","rounded-full","cursor-pointer","transition-all","font-medium","border-none",3,"click"],["role","button",1,"flex","items-center","justify-between","p-2","rounded-lg","transition-all","cursor-pointer",2,"hover","opacity-80",3,"click"],[1,"flex","items-center","gap-2"],[1,"w-2.5","h-2.5","rounded-full","flex-shrink-0"],[1,"text-sm","font-medium",2,"color","var(--text-primary)"],["target","_blank","rel","noopener noreferrer",1,"no-underline",2,"opacity","0.6",3,"click","href"],[2,"font-size","14px","width","14px","height","14px","color","var(--link-color)"]],template:function(e,t){e&1&&(a(0,"aside",0)(1,"div",1)(2,"h3",2)(3,"mat-icon",3),o(4,"search"),n(),o(5," Busca Inteligente "),n(),a(6,"div",4)(7,"input",5),m("input",function(l){return t.onSearch(l.target.value)}),n()(),C(8,$,4,0,"button",6),n(),a(9,"div",1)(10,"h3",2)(11,"mat-icon",3),o(12,"category"),n(),o(13," Especialidades "),n(),a(14,"div",7),L(15,Y,2,6,"button",8,z),n()(),a(17,"div",1)(18,"h3",2)(19,"mat-icon",3),o(20,"source"),n(),o(21," Fontes Cient\xEDficas "),n(),a(22,"div",9),L(23,J,8,9,"div",10,Z),n()(),a(25,"div",11)(26,"h3",12)(27,"mat-icon",13),o(28,"analytics"),n(),o(29," Estat\xEDsticas "),n(),a(30,"div",14)(31,"div",15)(32,"span"),o(33,"Total de artigos:"),n(),a(34,"strong"),o(35),n()(),a(36,"div",15)(37,"span"),o(38,"Exibindo:"),n(),a(39,"strong"),o(40),n()(),a(41,"div",15)(42,"span"),o(43,"Com resumo IA:"),n(),a(44,"strong"),o(45),n()()()()()),e&2&&(r(7),x("value",t.searchInput()),r(),S(t.articleService.searchQuery()||t.articleService.selectedCategory()||t.articleService.selectedSource()?8:-1),r(7),M(t.categories),r(8),M(t.sources),r(12),h(t.articleService.articles().length),r(5),h(t.articleService.filteredArticles().length),r(5),h(t.aiProcessedCount()))},dependencies:[P,N,Q,V,X,w,U,G],styles:["[_nghost-%COMP%]{display:block}input[type=search][_ngcontent-%COMP%]:focus{border-color:var(--link-color)!important;box-shadow:0 0 0 3px #1976d21a}input[type=search][_ngcontent-%COMP%]::placeholder{color:var(--text-secondary)}"],changeDetection:0})}};export{et as a,K as b,W as c};
