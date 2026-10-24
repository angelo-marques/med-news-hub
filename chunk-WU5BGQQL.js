import{a as ge}from"./chunk-MVPWXVOG.js";import{c as re,g as le}from"./chunk-XBEGCCKS.js";import{a as he,b as ue,c as fe}from"./chunk-VE2UDZHK.js";import{a as de,b as me}from"./chunk-LY4DWC2M.js";import{a as se}from"./chunk-RMLYPZM6.js";import{a as pe}from"./chunk-ETXHTPXV.js";import{a as ce}from"./chunk-OVO5JOU5.js";import"./chunk-S3JTG7SJ.js";import"./chunk-K6XSNQGH.js";import{B as U,C as Y,F as X,H as $,I as J,O as Z,P as ee,Q as te,R as ie,T as ne,U as ae,V as oe,d as Q,x as y}from"./chunk-2ECV5MQ6.js";import{$b as H,Ab as o,Bb as p,Gb as D,Hb as K,Ib as _,Kb as c,Lb as I,Mb as M,Ob as E,Pb as A,Qa as r,Qb as T,U as f,W as O,Wb as F,Y as d,Yb as s,_b as S,ca as C,cb as v,da as x,db as g,h as V,ka as L,kb as W,oa as N,rb as w,sb as h,tb as u,tc as G,va as B,vc as q,wb as j,xb as z,yb as m,zb as a}from"./chunk-OJHZRWD3.js";var ke=["text"],Oe=[[["mat-icon"]],"*"],we=["mat-icon","*"];function De(t,l){if(t&1&&p(0,"mat-pseudo-checkbox",1),t&2){let e=c();m("disabled",e.disabled)("state",e.selected?"checked":"unchecked")}}function Ie(t,l){if(t&1&&p(0,"mat-pseudo-checkbox",3),t&2){let e=c();m("disabled",e.disabled)}}function Ee(t,l){if(t&1&&(a(0,"span",4),s(1),o()),t&2){let e=c();r(),S("(",e.group.label,")")}}var Ae=new O("MAT_OPTION_PARENT_COMPONENT"),Te=new O("MatOptgroup");var R=class{source;isUserInput;constructor(l,e=!1){this.source=l,this.isUserInput=e}},_e=(()=>{class t{_element=d(B);_changeDetectorRef=d(G);_parent=d(Ae,{optional:!0});group=d(Te,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue="";get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=d(J).getId("mat-option-");get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=N(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new L;_text;_stateChanges=new V;constructor(){let e=d(U);e.load(ee),e.load(Y),this._signalDisableRipple=!!this._parent&&W(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||"").trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,n){let i=this._getHostElement();typeof i.focus=="function"&&i.focus(n)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!$(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new R(this,e))}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=v({type:t,selectors:[["mat-option"]],viewQuery:function(n,i){if(n&1&&E(ke,7),n&2){let b;A(b=T())&&(i._text=b.first)}},hostAttrs:["role","option",1,"mat-mdc-option","mdc-list-item"],hostVars:11,hostBindings:function(n,i){n&1&&_("click",function(){return i._selectViaInteraction()})("keydown",function(Ce){return i._handleKeydown(Ce)}),n&2&&(K("id",i.id),w("aria-selected",i.selected)("aria-disabled",i.disabled.toString()),F("mdc-list-item--selected",i.selected)("mat-mdc-option-multiple",i.multiple)("mat-mdc-option-active",i.active)("mdc-list-item--disabled",i.disabled))},inputs:{value:"value",id:"id",disabled:[2,"disabled","disabled",q]},outputs:{onSelectionChange:"onSelectionChange"},exportAs:["matOption"],ngContentSelectors:we,decls:8,vars:5,consts:[["text",""],["aria-hidden","true",1,"mat-mdc-option-pseudo-checkbox",3,"disabled","state"],[1,"mdc-list-item__primary-text"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"cdk-visually-hidden"],["aria-hidden","true","mat-ripple","",1,"mat-mdc-option-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"]],template:function(n,i){n&1&&(I(Oe),h(0,De,1,2,"mat-pseudo-checkbox",1),M(1),a(2,"span",2,0),M(4,1),o(),h(5,Ie,1,1,"mat-pseudo-checkbox",3),h(6,Ee,2,1,"span",4),p(7,"div",5)),n&2&&(u(i.multiple?0:-1),r(5),u(!i.multiple&&i.selected&&!i.hideSingleSelectionIndicator?5:-1),r(),u(i.group&&i.group._inert?6:-1),r(),m("matRippleTrigger",i._getHostElement())("matRippleDisabled",i.disabled||i.disableRipple))},dependencies:[he,Z],styles:[`.mat-mdc-option {
  -webkit-user-select: none;
  user-select: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  min-height: 48px;
  padding: 0 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  color: var(--mat-option-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-option-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-option-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-option-label-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-option-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-option-label-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-option:hover:not(.mdc-list-item--disabled) {
  background-color: var(--mat-option-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {
  background-color: var(--mat-option-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
  outline: 0;
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {
  background-color: var(--mat-option-selected-state-layer-color, var(--mat-sys-secondary-container));
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {
  color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option.mdc-list-item {
  align-items: center;
  background: transparent;
}
.mat-mdc-option.mdc-list-item--disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {
  opacity: 0.38;
}
.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 32px;
}
[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 16px;
  padding-right: 32px;
}
.mat-mdc-option .mat-icon,
.mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-icon,
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 0;
  margin-left: 16px;
}
.mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-left: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-right: 16px;
  margin-left: 0;
}
.mat-mdc-option .mat-mdc-option-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-family: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  margin-right: auto;
}
[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {
  margin-right: 0;
  margin-left: auto;
}
@media (forced-colors: active) {
  .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  [dir=rtl] .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-option-multiple {
  --mat-list-list-item-selected-container-color: var(--mat-list-list-item-container-color, transparent);
}

.mat-mdc-option-active .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return t})();var ye=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=g({type:t});static \u0275inj=f({imports:[X,pe,y]})}return t})();var P=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=g({type:t});static \u0275inj=f({imports:[ie,ue,_e,y]})}return t})();var ve=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=g({type:t});static \u0275inj=f({imports:[le,P,y,re,ye,P]})}return t})();var Fe=(t,l)=>l.id;function Re(t,l){t&1&&(a(0,"div",6)(1,"div",9),p(2,"mat-spinner",10),a(3,"p",11),s(4,"Carregando artigos..."),o()()())}function Pe(t,l){if(t&1&&(a(0,"div",13),p(1,"app-article-card",16),o()),t&2){let e=l.$implicit;r(),m("article",e)}}function Ve(t,l){t&1&&(a(0,"div",14)(1,"mat-icon",17),s(2,"search_off"),o(),a(3,"p",18),s(4,"Nenhum artigo encontrado."),o(),a(5,"p",19),s(6,"Tente ajustar os filtros ou termos de busca."),o()())}function Le(t,l){if(t&1){let e=D();a(0,"div",15)(1,"button",20),_("click",function(){C(e);let i=c(2);return x(i.articleService.prevPage())}),a(2,"mat-icon"),s(3,"chevron_left"),o()(),a(4,"span",21),s(5),o(),a(6,"button",22),_("click",function(){C(e);let i=c(2);return x(i.articleService.nextPage())}),a(7,"mat-icon"),s(8,"chevron_right"),o()()()}if(t&2){let e=c(2);r(),m("disabled",e.articleService.currentPage()===1),r(4),H(" P\xE1gina ",e.articleService.currentPage()," de ",e.articleService.totalPages()," "),r(),m("disabled",e.articleService.currentPage()===e.articleService.totalPages())}}function Ne(t,l){if(t&1&&(a(0,"div",12),j(1,Pe,2,1,"div",13,Fe,!1,Ve,7,0,"div",14),o(),h(4,Le,9,4,"div",15)),t&2){let e=c();r(),z(e.articleService.paginatedArticles()),r(3),u(e.articleService.totalPages()>1?4:-1)}}var be=class t{constructor(){this.articleService=d(se)}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=v({type:t,selectors:[["app-articles"]],decls:13,vars:2,consts:[[1,"max-w-7xl","mx-auto","px-4","sm:px-6","lg:px-8","py-8","animate-fade-in"],[1,"mb-8"],[1,"text-3xl","font-bold",2,"font-family","Georgia, serif","color","var(--text-primary)"],[1,"mt-2",2,"color","var(--text-secondary)"],[1,"grid","grid-cols-1","lg:grid-cols-4","gap-8"],["role","main",1,"lg:col-span-3"],[1,"flex","justify-center","py-24"],[1,"lg:col-span-1"],[1,"sticky","top-20"],[1,"text-center","space-y-4"],["diameter","48"],[2,"color","var(--text-secondary)"],[1,"grid","grid-cols-1","sm:grid-cols-2","xl:grid-cols-3","gap-6"],[1,"h-full"],[1,"col-span-3","text-center","py-16",2,"color","var(--text-secondary)"],[1,"flex","justify-center","items-center","gap-4","mt-8"],[3,"article"],[2,"font-size","64px","width","64px","height","64px"],[1,"mt-4","text-lg"],[1,"text-sm","mt-1"],["mat-icon-button","","aria-label","P\xE1gina anterior",3,"click","disabled"],[1,"text-sm",2,"color","var(--text-secondary)"],["mat-icon-button","","aria-label","Pr\xF3xima p\xE1gina",3,"click","disabled"]],template:function(e,n){e&1&&(a(0,"div",0)(1,"div",1)(2,"h1",2),s(3,"Todos os Artigos"),o(),a(4,"p",3),s(5),o()(),a(6,"div",4)(7,"main",5),h(8,Re,5,0,"div",6)(9,Ne,5,2),o(),a(10,"aside",7)(11,"div",8),p(12,"app-sidebar"),o()()()()),e&2&&(r(5),S(" ",n.articleService.filteredArticles().length," artigos processados por IA de fontes cient\xEDficas internacionais "),r(3),u(n.articleService.loading()?8:9))},dependencies:[Q,ne,te,oe,ae,me,de,ve,ce,ge,fe],encapsulation:2,changeDetection:0})}};export{be as ArticlesComponent};
