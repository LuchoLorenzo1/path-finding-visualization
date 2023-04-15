const k=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}};k();class O{constructor(t,e=null){this.items=[],this.compare=e||this.__defaultCompare}push(t){this.items.push(t),this.heapifyUp(this.size-1)}pop(){if(this.size===0)return null;this.__swap(0,this.size-1);const t=this.items.pop();return this.heapifyDown(0),t}peek(){return this.size>0?this.items[0]:null}clear(){this.items.splice(0,this.size)}get size(){return this.items.length}heapifyDown(t){const e=t*2+1,n=t*2+2;if(e>this.size-1)return;let i=e;n<this.size&&this.compare(this.items[e],this.items[n])>0&&(i=n),this.compare(this.items[t],this.items[i])>0&&(this.__swap(t,i),this.heapifyDown(i))}heapifyUp(t){const e=Math.floor((t-1)/2);e>=0&&this.compare(this.items[e],this.items[t])>0&&(this.__swap(t,e),this.heapifyUp(e))}__defaultCompare(t,e){return t===e?0:t>e?1:-1}__swap(t,e){[this.items[t],this.items[e]]=[this.items[e],this.items[t]]}}class D{constructor(t,e,n,i=0){this.weight=n,this.id=`${t}:${e}`,this.x=t,this.y=e,this.actual=1/0,this.heuristic=i}}class L{constructor(t,e,n,i=!1,o=null){this.M=e,this.N=t,this.diagonals=i,this.matrix=[];for(let a=0;a<t;a++){let h=[];for(let d=0;d<e;d++){let m=0;o&&(m=o(a,d));let r=new D(a,d,n[a][d],m);h.push(r)}this.matrix.push(h)}}get(t,e){return 0<=t&&t<this.N&&0<=e&&e<this.M?this.matrix[t][e]:NaN}adjacents(t){let e;this.diagonals?e=[[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]]:e=[[0,1],[1,0],[-1,0],[0,-1]];let n=[];for(const i of e){let o=this.get(t.x+i[0],t.y+i[1]);n.push(o)}return n}}let N=null;class M{static get state(){return N||(N=new M)}constructor(){this._state={},window.Context=this}get state(){return this._state}set(t,e){return this._state[t]=e,e}get(t){return this._state[t]}}const{state:g}=M,G=()=>{const s=g.get("N"),t=g.get("M"),e=g.get("weights"),n=g.get("origin"),i=g.get("destination"),o=new L(s,t,e,!1),a=o.get(n[0],n[1]),h=o.get(i[0],i[1]);a.actual=0,h.visited=!1;const d=new O([],(l,b)=>l.actual==b.actual?0:l.actual>b.actual?1:-1),m=[];let r=a;for(;!h.visited&&r;){for(const l of o.adjacents(r))l.actual>r.actual+l.weight&&(l.actual=r.actual+l.weight,l.lastVisited||(d.push(l),l.lastVisited=r));m.push([r.x,r.y]),r.visited=!0,r=d.pop()}const v=[];for(r=h.lastVisited;r.id!=a.id;)v.push([r.x,r.y]),r=r.lastVisited;return[m,v.reverse()]},H=()=>{const s=g.get("N"),t=g.get("M"),e=g.get("weights"),n=g.get("origin"),i=g.get("destination"),o=new L(s,t,e,!1,(l,b)=>Math.sqrt((i[0]-l)**2+(i[1]-b)**2)),a=o.get(n[0],n[1]),h=o.get(i[0],i[1]);a.actual=0,h.visited=!1;const d=new O([],(l,b)=>{let B=l.actual+l.heuristic-(b.actual+b.heuristic);return B==0?0:B>0?1:-1}),m=[];let r=a;for(;!h.visited&&r;){for(const l of o.adjacents(r))l.actual+l.heuristic>r.actual+r.heuristic+l.weight&&(l.actual=r.actual+l.weight,l.lastVisited||(d.push(l),l.lastVisited=r));m.push([r.x,r.y]),r.visited=!0,r=d.pop()}const v=[];for(r=h.lastVisited;r.id!=a.id;)v.push([r.x,r.y]),r=r.lastVisited;return[m,v.reverse()]},R=()=>{const s=g.get("N"),t=g.get("M"),e=g.get("weights"),n=g.get("origin"),i=g.get("destination"),o=new L(s,t,e),a=o.get(n[0],n[1]),h=o.get(i[0],i[1]);a.actual=0,h.visited=!1;const d=[];let m=a;const r=v=>{if(!h.visited){for(const l of o.adjacents(v))if(!l.visited&&l.weight<1/0&&l.id!=a.id){if(l.id==h.id){h.visited=!0;return}if(d.push([l.x,l.y]),l.visited=!0,r(l),h.visited)return}}};return d.push([m.x,m.y]),r(m),[d,d]},{state:p}=M,f=document.getElementById("canvas"),w=f.getContext("2d");f.width=window.innerWidth;f.height=window.innerHeight;w.globalAlpha=1;const _=1;let c;const C=s=>{c=new S(s)},z=s=>{f.width=window.innerWidth,f.height=window.innerHeight,C(s)};window.addEventListener("resize",()=>z(c.N),!1);const $=()=>{c.weights=[];for(let s=0;s<c.N;s++){let t=[];for(let e=0;e<c.M;e++)t.push(_);c.weights.push(t)}w.clearRect(0,0,f.width,f.height),c.setObjects(),p.set("weights",c.weights)};class S{constructor(t){this.N=p.set("N",t),this.cellw=Math.floor(f.width/this.N),this.M=p.set("M",Math.round(f.height/this.cellw)),this.cellh=this.cellw,this.weights=[];for(let a=0;a<this.N;a++){let h=[];for(let d=0;d<this.M;d++)h.push(_);this.weights.push(h)}let[e,n]=p.set("origin",[Math.floor(this.N*.1),Math.floor(this.M*.1)]),[i,o]=p.set("destination",[Math.floor(this.N*.8),Math.floor(this.M*.8)]);this.objects={origin:[e,n,"#00ff00"],destination:[i,o,"#ff0000"]},p.set("weights",this.weights),this.setObjects()}setObject(t,e,n){e>this.N-1||n>this.M-1||(this.clean(this.objects[t][0],this.objects[t][1]),p.set(t,[this.objects[t][0],this.objects[t][1]]),this.objects[t][0]=e,this.objects[t][1]=n,this.setObjects())}setObjects(){for(const t in this.objects)p.set(t,[this.objects[t][0],this.objects[t][1]]),this.paint(this.objects[t][0],this.objects[t][1],this.objects[t][2])}isObject(t,e){if(!(t>this.N-1||e>this.M-1)){for(const n in this.objects)if(this.objects[n][0]==t&&this.objects[n][1]==e)return n;return!1}}paint(t,e,n){w.fillStyle=n,w.fillRect(t*this.cellw,e*this.cellh,this.cellw,this.cellh)}weigh(t,e,n){t>this.N-1||e>this.M-1||(this.weights[t][e]=n,n==1/0?this.paint(t,e,"#000000"):this.paint(t,e,"#00ff00"))}reset(){w.clearRect(0,0,f.width,f.height);for(let t=0;t<this.N;t++)for(let e=0;e<this.M;e++){let n=this.weights[t][e];n==1/0?this.paint(t,e,"#000000"):n==0&&this.paint(t,e,"#ffffff")}this.setObjects()}clean(t,e){w.fillStyle="#ffffff",w.fillRect(t*this.cellw,e*this.cellh,this.cellw,this.cellh),this.weights[t][e]=_}}let j=-1,y=null;window.addEventListener("mouseup",()=>{j=-1,y=null});const x=s=>{const t=f.getBoundingClientRect();return[Math.floor((s.clientX-t.left)/c.cellw),Math.floor((s.clientY-t.top)/c.cellh)]};f.addEventListener("mouseup",s=>{if(!y)return;let[t,e]=x(s);c.setObject(y,t,e),y=null});const A=s=>{let[t,e]=x(s);if(y){c.setObject(y,t,e);return}let n=c.isObject(t,e);if(n){y=n;return}let i=1/0;j==0?c.weigh(t,e,i):j==2&&c.clean(t,e)};f.addEventListener("mousedown",s=>{p.get("animating")||(p.get("isClean")||(c.reset(),p.set("isClean",!0)),j=s.button,A(s))});f.addEventListener("mousemove",s=>{j!=-1&&A(s)});f.addEventListener("mouseleave",()=>{j=-1,y=null});f.addEventListener("contextmenu",s=>{s.preventDefault();let[t,e]=x(s);c.isObject(t,e)||c.clean(t,e)});const W=(s,t)=>{const e=2-p.get("speed");console.log(e);let n=0;for(let i=1;i<s.length-1;i++){n+=e;let o=s[i];setTimeout(()=>{w.globalAlpha=.4,c.paint(o[0],o[1],"#ff00ff"),w.globalAlpha=1},n)}n+=100;for(let i=0;i<t.length;i++){let o=t[i];setTimeout(()=>{w.globalAlpha=.9,c.paint(o[0],o[1],"#444400"),w.globalAlpha=1},n),n+=e}setTimeout(()=>{p.set("animating",!1),p.set("isClean",!1)},n)},{state:u}=M,V=new Map([["Dijkstra",G],["A*",H],["dfs",R]]);window.addEventListener("load",()=>{u.set("speed",1);const s=u.set("N",10),t=u.set("M",10);u.set("origin",[Math.floor(s*.1),Math.floor(t*.1)]),u.set("destination",[0,1]),u.set("animating",!1),u.set("isClean",!0),u.set("selectedWeight",1/0),C(u.get("N"),u.get("M"));const e=document.getElementById("select-algorithm");V.forEach((n,i)=>{const o=document.createElement("option");o.value=i,o.innerText=i,e.appendChild(o)})});document.getElementById("grid-size").onchange=s=>{u.get("animating")||z(+s.target.value)};document.getElementById("clean-grilla").addEventListener("click",()=>{u.get("animating")||$()});document.getElementById("run").addEventListener("click",()=>{u.get("animating")||T()});const T=()=>{if(u.get("animating"))return;u.set("animating",!0),u.get("isClean")||$();const s=document.getElementById("select-algorithm"),t=V.get(s.value)();if(!t){u.set("animating",!1);return}W(t[0],t[1])};document.getElementById("algorithm-speed-input").onchange=s=>{u.set("speed",s.target.value)};const I=document.getElementById("menu-container"),U=document.getElementById("menu-button"),q=["algorithms","grid","terrain","nodes"];U.addEventListener("click",()=>{I.style.display=="none"?I.style.display="block":I.style.display="none"});document.getElementById("menu-container").addEventListener("click",s=>{let t=s.target.id.split("-");!q.includes(t[0])||P(t[0])});let E="algorithms";function P(s){E!=s&&(document.getElementById(`${E}-menu`).style.display="none",document.getElementById(`${s}-menu`).style.display="grid",document.getElementById(`${E}-option`).classList.replace("active","inactive"),document.getElementById(`${s}-option`).classList.replace("inactive","active"),E=s)}
