import{s as w,f,a as b,l as A,g as m,h as I,O as T,c as U,m as L,d as j,j as s,a1 as E,i as S,N as i,L as N,x as k,M}from"../chunks/scheduler.b03a764b.js";import{S as O,i as $}from"../chunks/index.f06d7b37.js";import{g as q,r as D,u as H}from"../chunks/index.esm2017.b466dad1.js";import{g as R}from"../chunks/navigation.5cceff9e.js";function V(h){let a,e,t,u="Upload A Professional Image",v,l,d="Upload Image (png, jpg, jpeg, pdf):",n,o,y,p,C,_,x,B;return{c(){a=f("main"),e=f("div"),t=f("h1"),t.textContent=u,v=b(),l=f("label"),l.textContent=d,n=b(),o=f("input"),y=b(),p=f("button"),C=A("Continue"),this.h()},l(c){a=m(c,"MAIN",{class:!0});var g=I(a);e=m(g,"DIV",{class:!0});var r=I(e);t=m(r,"H1",{"data-svelte-h":!0}),T(t)!=="svelte-kx99dm"&&(t.textContent=u),v=U(r),l=m(r,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),T(l)!=="svelte-1kj988"&&(l.textContent=d),n=U(r),o=m(r,"INPUT",{type:!0,id:!0,accept:!0,class:!0}),y=U(r),p=m(r,"BUTTON",{class:!0});var P=I(p);C=L(P,"Continue"),P.forEach(j),r.forEach(j),g.forEach(j),this.h()},h(){s(l,"for","upload"),s(l,"class","svelte-1j1vhpt"),s(o,"type","file"),s(o,"id","upload"),s(o,"accept",".png, .jpg, .jpeg, .pdf"),s(o,"class","svelte-1j1vhpt"),s(p,"class",_=E(h[0]?"continue":"no-continue")+" svelte-1j1vhpt"),s(e,"class","center svelte-1j1vhpt"),s(a,"class","svelte-1j1vhpt")},m(c,g){S(c,a,g),i(a,e),i(e,t),i(e,v),i(e,l),i(e,n),i(e,o),i(e,y),i(e,p),i(p,C),x||(B=[N(o,"change",h[1]),N(p,"click",h[2])],x=!0)},p(c,[g]){g&1&&_!==(_=E(c[0]?"continue":"no-continue")+" svelte-1j1vhpt")&&s(p,"class",_)},i:k,o:k,d(c){c&&j(a),x=!1,M(B)}}}function z(h,a,e){let t,u=!1;return[u,async d=>{const n=d.target.files[0];n&&["image/png","image/jpg","image/jpeg","application/pdf"].includes(n.type)?(t=n,e(0,u=!0)):(alert("Please upload a valid image file (png, jpg, jpeg, pdf)."),e(0,u=!1))},async()=>{if(t){const d=q(),n=D(d,"images/"+t.name);await H(n,t),R("/home")}else alert("Please upload a valid image file (png, jpg, jpeg, pdf) before continuing.")}]}class Q extends O{constructor(a){super(),$(this,a,z,V,w,{})}}export{Q as component};