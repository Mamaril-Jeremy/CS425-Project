import{s as E,p as k,q as w,r as G,e as g,w as j,x as C,y as R,z as B,g as z,h as A,i as D,G as W,k as H,A as U}from"./scheduler.c7017695.js";import{S as F,i as I,d as p,v as J,a as y,h as K,t as d,c as L,b as _,e as v,o as P,p as S}from"./index.0adcff42.js";import{g as M}from"./tw-merge.dac1d172.js";const O="C:/GitHub/CS425-Project/plato/node_modules/flowbite-svelte/dist/utils/Wrapper.svelte";function N(i){let e;const n=i[5].default,l=j(n,i,i[4],null),r={c:function(){l&&l.c()},l:function(t){l&&l.l(t)},m:function(t,s){l&&l.m(t,s),e=!0},p:function(t,s){l&&l.p&&(!e||s&16)&&C(l,n,t,t[4],e?B(n,t[4],s,null):R(t[4]),null)},i:function(t){e||(_(l,t),e=!0)},o:function(t){d(l,t),e=!1},d:function(t){l&&l.d(t)}};return p("SvelteRegisterBlock",{block:r,id:N.name,type:"else",source:"(8:0) {:else}",ctx:i}),r}function q(i){let e=i[0],n,l;P(i[0]),S(i[0]);let r=i[0]&&h(i);const c={c:function(){r&&r.c(),n=g()},l:function(s){r&&r.l(s),n=g()},m:function(s,u){r&&r.m(s,u),y(s,n,u),l=!0},p:function(s,u){s[0]?e?E(e,s[0])?(r.d(1),P(s[0]),S(s[0]),r=h(s),e=s[0],r.c(),r.m(n.parentNode,n)):r.p(s,u):(r=h(s),e=s[0],r.c(),r.m(n.parentNode,n)):e&&(r.d(1),r=null,e=s[0])},i:function(s){l||(_(r,s),l=!0)},o:function(s){d(r,s),l=!1},d:function(s){s&&v(n),r&&r.d(s)}};return p("SvelteRegisterBlock",{block:c,id:q.name,type:"if",source:"(6:0) {#if show}",ctx:i}),c}function h(i){let e,n,l,r;const c=i[5].default,t=j(c,i,i[4],null);let s=[i[3]],u={};for(let o=0;o<s.length;o+=1)u=w(u,s[o]);const f={c:function(){e=z(i[0]),t&&t.c(),this.h()},l:function(a){e=A(a,(i[0]||"null").toUpperCase(),{});var m=D(e);t&&t.l(m),m.forEach(v),this.h()},h:function(){W(i[0])(e,u),H(e,O,6,2,101)},m:function(a,m){y(a,e,m),t&&t.m(e,null),n=!0,l||(r=U(i[2].call(null,e)),l=!0)},p:function(a,m){t&&t.p&&(!n||m&16)&&C(t,c,a,a[4],n?B(c,a[4],m,null):R(a[4]),null),W(a[0])(e,u=M(s,[m&8&&a[3]]))},i:function(a){n||(_(t,a),n=!0)},o:function(a){d(t,a),n=!1},d:function(a){a&&v(e),t&&t.d(a),l=!1,r()}};return p("SvelteRegisterBlock",{block:f,id:h.name,type:"child_dynamic_element",source:"(7:2) <svelte:element this={tag} use:use {...$$restProps}>",ctx:i}),f}function b(i){let e,n,l,r;const c=[q,N],t=[];function s(f,o){return f[1]?0:1}e=s(i),n=t[e]=c[e](i);const u={c:function(){n.c(),l=g()},l:function(o){n.l(o),l=g()},m:function(o,a){t[e].m(o,a),y(o,l,a),r=!0},p:function(o,[a]){let m=e;e=s(o),e===m?t[e].p(o,a):(K(),d(t[m],1,1,()=>{t[m]=null}),L(),n=t[e],n?n.p(o,a):(n=t[e]=c[e](o),n.c()),_(n,1),n.m(l.parentNode,l))},i:function(o){r||(_(n),r=!0)},o:function(o){d(n),r=!1},d:function(o){o&&v(l),t[e].d(o)}};return p("SvelteRegisterBlock",{block:u,id:b.name,type:"component",source:"",ctx:i}),u}function Q(i,e,n){const l=["tag","show","use"];let r=k(e,l),{$$slots:c={},$$scope:t}=e;J("Wrapper",c,["default"]);let{tag:s="div"}=e,{show:u}=e,{use:f=()=>{}}=e;return i.$$.on_mount.push(function(){u===void 0&&!("show"in e||i.$$.bound[i.$$.props.show])&&console.warn("<Wrapper> was created without expected prop 'show'")}),i.$$set=o=>{e=w(w({},e),G(o)),n(3,r=k(e,l)),"tag"in o&&n(0,s=o.tag),"show"in o&&n(1,u=o.show),"use"in o&&n(2,f=o.use),"$$scope"in o&&n(4,t=o.$$scope)},i.$capture_state=()=>({tag:s,show:u,use:f}),i.$inject_state=o=>{"tag"in e&&n(0,s=o.tag),"show"in e&&n(1,u=o.show),"use"in e&&n(2,f=o.use)},e&&"$$inject"in e&&i.$inject_state(e.$$inject),[s,u,f,r,t,c]}class Y extends F{constructor(e){super(e),I(this,e,Q,b,E,{tag:0,show:1,use:2}),p("SvelteRegisterComponent",{component:this,tagName:"Wrapper",options:e,id:b.name})}get tag(){throw new Error("<Wrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set tag(e){throw new Error("<Wrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}get show(){throw new Error("<Wrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set show(e){throw new Error("<Wrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}get use(){throw new Error("<Wrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set use(e){throw new Error("<Wrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}}export{Y as W};