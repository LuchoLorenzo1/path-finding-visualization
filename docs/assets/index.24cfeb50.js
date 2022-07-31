const E=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const l of t)if(l.type==="childList")for(const n of l.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(t){const l={};return t.integrity&&(l.integrity=t.integrity),t.referrerpolicy&&(l.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?l.credentials="include":t.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(t){if(t.ep)return;t.ep=!0;const l=r(t);fetch(t.href,l)}};E();function v(e,o,r){const a=e.length,t=e[0].length;let l=performance.now();const n=new Map;for(let u=0;u<a;u++)for(let d=0;d<t;d++)n.set(`${u}:${d}`,{peso:e[u][d],actual:1/0,camino:[]});const i=[],s=new Set;s.add(o),n.get(o).actual=0;let c=o;for(;!s.has(r)&&c;){let u=n.get(c),[d,m]=c.split(":");d=parseInt(d),m=parseInt(m);let k=[n.get(`${d+1}:${m}`),n.get(`${d-1}:${m}`),n.get(`${d}:${m+1}`),n.get(`${d}:${m-1}`)];for(const f of k)!f||u.actual+f.peso<f.actual&&(f.actual=u.actual+f.peso,f.camino=[...u.camino],f.camino.push(c));s.add(c),i.push(c),c=w(s,n)}let g=n.get(r);if(g.camino.length==0)return alert("es imposible llegar a destino"),NULL;var I=performance.now();return alert(`Dijkstra, time:${(I-l)/1e3}s, path length: ${g.camino.length}, nodes visited: ${s.size} `),[i,[...g.camino]]}function w(e,o){let r=1/0,a;for(const t of e){let l=o.get(t),[n,i]=t.split(":");n=parseInt(n),i=parseInt(i);let s=[`${n+1}:${i}`,`${n-1}:${i}`,`${n}:${i+1}`,`${n}:${i-1}`];for(const c of s){let g=o.get(c);!g||e.has(c)||l.actual+g.peso<r&&(r=l.actual+g.peso,a=c)}}return a}function L(e,o,r,a){document.getElementById(e).style.background="green",document.getElementById(o).style.background="blue";for(let t=1;t<r.length-1;t++)document.getElementById(r[t]).style.background="brown";for(let t=1;t<a.length;t++)document.getElementById(a[t]).style.background="yellow"}function B(e,o){const r=document.getElementById("grilla");r.innerHTML="";for(let a=0;a<e;a++){const t=document.createElement("tr");for(let l=0;l<o;l++){const n=document.createElement("td"),i=document.createTextNode("");n.classList.add("celda"),n.setAttribute("id",`${a}:${l}`),n.appendChild(i),t.appendChild(n)}t.classList.add("fila"),r.appendChild(t)}}function N(e,o,r,a,t){for(let l=0;l<e;l++)for(let n=0;n<o;n++){const i=document.getElementById(`${l}:${n}`);let s=r[l][n];s==1/0?i.style.background="black":s>1?i.style.background=`rgb(${200-10*s},${200-10*s},${100})`:i.style.background="white"}document.getElementById(a).style.background="green",document.getElementById(t).style.background="blue"}const j=1;var b=6,h=6,y="0:0",p="5:5",$=[];for(let e=0;e<b;e++){let o=[];for(let r=0;r<h;r++)o.push(j);$.push(o)}window.addEventListener("load",()=>{B(b,h),console.log(y),document.getElementById(y).style.background="green",document.getElementById(p).style.background="blue"});document.getElementById("start-algorithm").addEventListener("click",()=>{N(b,h,$,y,p);const e=v($,y,p);console.log(e),e&&(console.log(e[0]),console.log(e[1]),L(y,p,e[0],e[1]))});window.addEventListener("contextmenu",e=>{if(e.target.nodeName!="TD")return;e.preventDefault();let[o,r]=e.target.id.split(":");$[parseInt(o)][parseInt(r)]=1/0,e.target.style.background="black",e.target.style.color="white"});document.getElementById("grilla").addEventListener("click",e=>{if(e.target.id==y||e.target.id==p)return;let[o,r]=e.target.id.split(":");o=parseInt(o),r=parseInt(r);let a=++$[o][r];e.target.style.background=`rgb(${200-10*a},${200-10*a},${100})`});