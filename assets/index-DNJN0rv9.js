var ve=Object.defineProperty;var Ee=(t,e,n)=>e in t?ve(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var G=(t,e,n)=>Ee(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(o){if(o.ep)return;o.ep=!0;const l=n(o);fetch(o.href,l)}})();function w(){}function me(t){return t()}function le(){return Object.create(null)}function N(t){t.forEach(me)}function pe(t){return typeof t=="function"}function j(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let x;function L(t,e){return t===e?!0:(x||(x=document.createElement("a")),x.href=e,t===x.href)}function Pe(t){return Object.keys(t).length===0}function B(t,e){t.appendChild(e)}function _(t,e,n){t.insertBefore(e,n||null)}function p(t){t.parentNode&&t.parentNode.removeChild(t)}function ge(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function b(t){return document.createElement(t)}function Q(t){return document.createTextNode(t)}function Z(){return Q(" ")}function Me(){return Q("")}function m(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ke(t){return Array.from(t.childNodes)}function Ce(t,e){e=""+e,t.data!==e&&(t.data=e)}function O(t,e,n,r){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,"")}function Se(t,e,{bubbles:n=!1,cancelable:r=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:r})}let S;function C(t){S=t}function _e(){if(!S)throw new Error("Function called outside component initialization");return S}function ee(t){_e().$$.on_mount.push(t)}function Ne(){const t=_e();return(e,n,{cancelable:r=!1}={})=>{const o=t.$$.callbacks[e];if(o){const l=Se(e,n,{cancelable:r});return o.slice().forEach(i=>{i.call(t,l)}),!l.defaultPrevented}return!0}}const M=[],ue=[];let k=[];const se=[],Ae=Promise.resolve();let J=!1;function Ie(){J||(J=!0,Ae.then(be))}function K(t){k.push(t)}const V=new Set;let P=0;function be(){if(P!==0)return;const t=S;do{try{for(;P<M.length;){const e=M[P];P++,C(e),Te(e.$$)}}catch(e){throw M.length=0,P=0,e}for(C(null),M.length=0,P=0;ue.length;)ue.pop()();for(let e=0;e<k.length;e+=1){const n=k[e];V.has(n)||(V.add(n),n())}k.length=0}while(M.length);for(;se.length;)se.pop()();J=!1,V.clear(),C(t)}function Te(t){if(t.fragment!==null){t.update(),N(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(K)}}function He(t){const e=[],n=[];k.forEach(r=>t.indexOf(r)===-1?e.push(r):n.push(r)),n.forEach(r=>r()),k=e}const W=new Set;let E;function te(){E={r:0,c:[],p:E}}function ne(){E.r||N(E.c),E=E.p}function g(t,e){t&&t.i&&(W.delete(t),t.i(e))}function y(t,e,n,r){if(t&&t.o){if(W.has(t))return;W.add(t),E.c.push(()=>{W.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}function X(t){return(t==null?void 0:t.length)!==void 0?t:Array.from(t)}function re(t){t&&t.c()}function D(t,e,n){const{fragment:r,after_update:o}=t.$$;r&&r.m(e,n),K(()=>{const l=t.$$.on_mount.map(me).filter(pe);t.$$.on_destroy?t.$$.on_destroy.push(...l):N(l),t.$$.on_mount=[]}),o.forEach(K)}function F(t,e){const n=t.$$;n.fragment!==null&&(He(n.after_update),N(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Re(t,e){t.$$.dirty[0]===-1&&(M.push(t),Ie(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Y(t,e,n,r,o,l,i=null,s=[-1]){const u=S;C(t);const c=t.$$={fragment:null,ctx:[],props:l,update:w,not_equal:o,bound:le(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(u?u.$$.context:[])),callbacks:le(),dirty:s,skip_bound:!1,root:e.target||u.$$.root};i&&i(c.root);let d=!1;if(c.ctx=n?n(t,e.props||{},(a,f,...h)=>{const v=h.length?h[0]:f;return c.ctx&&o(c.ctx[a],c.ctx[a]=v)&&(!c.skip_bound&&c.bound[a]&&c.bound[a](v),d&&Re(t,a)),f}):[],c.update(),d=!0,N(c.before_update),c.fragment=r?r(c.ctx):!1,e.target){if(e.hydrate){const a=ke(e.target);c.fragment&&c.fragment.l(a),a.forEach(p)}else c.fragment&&c.fragment.c();e.intro&&g(t.$$.fragment),D(t,e.target,e.anchor),be()}C(u)}class q{constructor(){G(this,"$$");G(this,"$$set")}$destroy(){F(this,1),this.$destroy=w}$on(e,n){if(!pe(n))return w;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const o=r.indexOf(n);o!==-1&&r.splice(o,1)}}$set(e){this.$$set&&!Pe(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const xe="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(xe);function ce(t,e,n){const r=t.slice();return r[9]=e[n],r}function fe(t){let e,n,r,o,l,i,s;return{c(){e=b("a"),n=b("img"),l=Z(),m(n,"class","thumbnail svelte-7w3f0l"),L(n.src,r=t[9].url)||m(n,"src",r),m(n,"alt",o="img "+t[9].id),m(e,"id",i=`thumbnail-${t[9].id}`),m(e,"href",s=t[9].url),m(e,"class","thumbnail-wrapper svelte-7w3f0l"),O(e,"left",t[9].posX+"px"),O(e,"top",t[9].posY+"px")},m(u,c){_(u,e,c),B(e,n),B(e,l)},p(u,c){c&1&&!L(n.src,r=u[9].url)&&m(n,"src",r),c&1&&o!==(o="img "+u[9].id)&&m(n,"alt",o),c&1&&i!==(i=`thumbnail-${u[9].id}`)&&m(e,"id",i),c&1&&s!==(s=u[9].url)&&m(e,"href",s),c&1&&O(e,"left",u[9].posX+"px"),c&1&&O(e,"top",u[9].posY+"px")},d(u){u&&p(e)}}}function Oe(t){let e,n=X(t[0]),r=[];for(let o=0;o<n.length;o+=1)r[o]=fe(ce(t,n,o));return{c(){e=b("div");for(let o=0;o<r.length;o+=1)r[o].c()},m(o,l){_(o,e,l);for(let i=0;i<r.length;i+=1)r[i]&&r[i].m(e,null)},p(o,[l]){if(l&1){n=X(o[0]);let i;for(i=0;i<n.length;i+=1){const s=ce(o,n,i);r[i]?r[i].p(s,l):(r[i]=fe(s),r[i].c(),r[i].m(e,null))}for(;i<r.length;i+=1)r[i].d(1);r.length=n.length}},i:w,o:w,d(o){o&&p(e),ge(r,o)}}}const $=30;function We(t,e,n,r,o,l){return!(t+(o+$)<=n||n+(o+$)<=t||e+(l+$)<=r||r+(l+$)<=e)}function Le(){const t=document.querySelector(".thumbnail");if(!t)return{tMaxWidth:100,tMaxHeight:100};const e=window.getComputedStyle(t),n=parseInt(e.maxWidth)||100,r=parseInt(e.maxHeight)||100;return{tMaxWidth:n,tMaxHeight:r}}function Be(t,e,n){let{pageNumber:r}=e,{pageHeight:o}=e,{pageWidth:l}=e,{thumbnails:i=[]}=e;const s=Ne();ee(async()=>{n(0,i=d()),s("pageRendered",{thumbnailCount:i.length})});function u(){return l<=600}function c(){let f=$,h=$;return r==0?{topStart:h,leftStart:f}:(u()?h+=r*o:f+=r*l,{topStart:h,leftStart:f})}function d(){const h=[],v=[],{tMaxWidth:A,tMaxHeight:I}=Le(),{topStart:z,leftStart:we}=c();return i.forEach(T=>{let H,R,oe;const ie=document.getElementById(`thumbnail-${T.id}`);if(!ie)throw new Error(`Cannot find elem thumbnail-${T.id} to set randomised position.`);let U=0;do({posX:H,posY:R}=a(we,z,I,A)),oe=h.some(({posX:ye,posY:$e})=>We(H,R,ye,$e,A,I)),U++;while(oe&&U<50);if(U>=50){console.warn(`Skipping thumbnail ${T.id} due to space constraints.`);return}h.push({element:ie,posX:H,posY:R}),v.push({...T,posX:H,posY:R})}),v}function a(f,h,v,A){let I=h+o-$-v,z=f+l-$-A;return{posX:Math.floor(Math.random()*(z-f)+f),posY:Math.floor(Math.random()*(I-h)+h)}}return t.$$set=f=>{"pageNumber"in f&&n(1,r=f.pageNumber),"pageHeight"in f&&n(2,o=f.pageHeight),"pageWidth"in f&&n(3,l=f.pageWidth),"thumbnails"in f&&n(0,i=f.thumbnails)},[i,r,o,l]}class Xe extends q{constructor(e){super(),Y(this,e,Be,Oe,j,{pageNumber:1,pageHeight:2,pageWidth:3,thumbnails:0})}}function ae(t,e,n){const r=t.slice();return r[1]=e[n].thumbnails,r[9]=n,r}function de(t){let e,n,r=X(t[0]),o=[];for(let i=0;i<r.length;i+=1)o[i]=he(ae(t,r,i));const l=i=>y(o[i],1,1,()=>{o[i]=null});return{c(){for(let i=0;i<o.length;i+=1)o[i].c();e=Me()},m(i,s){for(let u=0;u<o.length;u+=1)o[u]&&o[u].m(i,s);_(i,e,s),n=!0},p(i,s){if(s&29){r=X(i[0]);let u;for(u=0;u<r.length;u+=1){const c=ae(i,r,u);o[u]?(o[u].p(c,s),g(o[u],1)):(o[u]=he(c),o[u].c(),g(o[u],1),o[u].m(e.parentNode,e))}for(te(),u=r.length;u<o.length;u+=1)l(u);ne()}},i(i){if(!n){for(let s=0;s<r.length;s+=1)g(o[s]);n=!0}},o(i){o=o.filter(Boolean);for(let s=0;s<o.length;s+=1)y(o[s]);n=!1},d(i){i&&p(e),ge(o,i)}}}function he(t){let e,n,r,o;return n=new Xe({props:{thumbnails:t[1],pageNumber:t[9],pageHeight:t[3],pageWidth:t[2]}}),n.$on("pageRendered",t[4]),{c(){e=b("div"),re(n.$$.fragment),r=Z(),m(e,"class","page")},m(l,i){_(l,e,i),D(n,e,null),B(e,r),o=!0},p(l,i){const s={};i&1&&(s.thumbnails=l[1]),n.$set(s)},i(l){o||(g(n.$$.fragment,l),o=!0)},o(l){y(n.$$.fragment,l),o=!1},d(l){l&&p(e),F(n)}}}function je(t){let e,n,r=t[1].length&&de(t);return{c(){e=b("div"),r&&r.c(),m(e,"class","photos-wrapper svelte-win4jz")},m(o,l){_(o,e,l),r&&r.m(e,null),n=!0},p(o,[l]){o[1].length?r?(r.p(o,l),l&2&&g(r,1)):(r=de(o),r.c(),g(r,1),r.m(e,null)):r&&(te(),y(r,1,1,()=>{r=null}),ne())},i(o){n||(g(r),n=!0)},o(o){y(r),n=!1},d(o){o&&p(e),r&&r.d()}}}const De=5;function Fe(t,e,n){const r=window.innerWidth,o=window.innerHeight;let l=[],i=0,s=[];function u(a){i+=a.detail.thumbnailCount,c()}function c(){if(i>=s.length)return;const a=s.slice(i,i+De);n(0,l=[...l,{pageStart:i,thumbnails:a}])}ee(async()=>{await d()});async function d(){const a="https://rkimmiblogserver.fly.dev/api/photos-blog/thumbnails";try{let h=await(await fetch(a)).json();n(1,s=h.images),c()}catch(f){console.error("Error loading thumbnails:",f)}}return[l,s,r,o,u]}class Ye extends q{constructor(e){super(),Y(this,e,Fe,je,j,{})}}function qe(t){let e;return{c(){e=b("div"),e.textContent="wip photo preview"},m(n,r){_(n,e,r)},p:w,d(n){n&&p(e)}}}function ze(t){let e,n=t[0].title+"",r,o,l,i,s;return{c(){e=b("h1"),r=Q(n),o=Z(),l=b("img"),L(l.src,i=t[0].url)||m(l,"src",i),m(l,"alt",s=t[0].title)},m(u,c){_(u,e,c),B(e,r),_(u,o,c),_(u,l,c)},p(u,c){c&1&&n!==(n=u[0].title+"")&&Ce(r,n),c&1&&!L(l.src,i=u[0].url)&&m(l,"src",i),c&1&&s!==(s=u[0].title)&&m(l,"alt",s)},d(u){u&&(p(e),p(o),p(l))}}}function Ue(t){let e;function n(l,i){return l[0]?ze:qe}let r=n(t),o=r(t);return{c(){e=b("div"),o.c()},m(l,i){_(l,e,i),o.m(e,null)},p(l,[i]){r===(r=n(l))&&o?o.p(l,i):(o.d(1),o=r(l),o&&(o.c(),o.m(e,null)))},i:w,o:w,d(l){l&&p(e),o.d()}}}function Ge(t,e,n){let{id:r}=e,o;return ee(async()=>{if(!o){const l=await fetch(`/api/photos/${r}`);n(0,o=await l.json())}}),t.$$set=l=>{"id"in l&&n(1,r=l.id)},[o,r]}class Ve extends q{constructor(e){super(),Y(this,e,Ge,Ue,j,{id:1})}}function Je(t){let e,n;return e=new Ye({}),{c(){re(e.$$.fragment)},m(r,o){D(e,r,o),n=!0},p:w,i(r){n||(g(e.$$.fragment,r),n=!0)},o(r){y(e.$$.fragment,r),n=!1},d(r){F(e,r)}}}function Ke(t){let e,n;return e=new Ve({props:{id:t[0]}}),{c(){re(e.$$.fragment)},m(r,o){D(e,r,o),n=!0},p(r,o){const l={};o&1&&(l.id=r[0]),e.$set(l)},i(r){n||(g(e.$$.fragment,r),n=!0)},o(r){y(e.$$.fragment,r),n=!1},d(r){F(e,r)}}}function Qe(t){let e,n,r,o;const l=[Ke,Je],i=[];function s(u,c){var d;return(d=u[0])!=null&&d.length?0:1}return n=s(t),r=i[n]=l[n](t),{c(){e=b("main"),r.c(),m(e,"class","svelte-1tyzdic")},m(u,c){_(u,e,c),i[n].m(e,null),o=!0},p(u,[c]){let d=n;n=s(u),n===d?i[n].p(u,c):(te(),y(i[d],1,1,()=>{i[d]=null}),ne(),r=i[n],r?r.p(u,c):(r=i[n]=l[n](u),r.c()),g(r,1),r.m(e,null))},i(u){o||(g(r),o=!0)},o(u){y(r),o=!1},d(u){u&&p(e),i[n].d()}}}function Ze(t,e,n){let{url:r=""}=e,{photoIdParam:o=null}=e;addEventListener("DOMContentLoaded",()=>{const s=new URLSearchParams(window.location.search);n(0,o=s.get("photo"));const u=document.getElementsByTagName("body")[0],[c,d]=i();u.style.backgroundColor=c,u.style.color=d});const l=new Map([[0,["#bd1818","white"]],[12,["#ffffaa","brown"]],[16,["#18BD70","black"]],[20,["#A7A7F3","white"]]]);function i(){let s="",u="";const d=new Date().getHours();for(let[a,[f,h]]of l)if(d>=a)s=f,u=h;else break;return[s,u]}return t.$$set=s=>{"url"in s&&n(1,r=s.url),"photoIdParam"in s&&n(0,o=s.photoIdParam)},[o,r]}class et extends q{constructor(e){super(),Y(this,e,Ze,Qe,j,{url:1,photoIdParam:0})}}new et({target:document.getElementById("app")});
