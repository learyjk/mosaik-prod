(()=>{document.addEventListener("DOMContentLoaded",()=>{let a=!1,i=document.querySelector("form");if(!i)return;let c=i.querySelector(".w-tab-content");if(!c)return;let m=c.querySelectorAll("[data-w-tab]"),f=i.querySelector(".w-tab-menu");if(!f)return;let p=f.querySelectorAll("a");if(!p)return;let n=i.querySelector('[wb-data="next-button"]');if(!n)return;let u=i.querySelector('[wb-data="submit-button"]');if(!u)return;a&&console.log("selectors finished");let r=0,s=m.length;a&&console.log({numberOfSteps:s}),a&&console.log({currentStep:r});let b=document.querySelectorAll("input"),g=t=>{let e=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;return!!t.match(e)},L=t=>{let{type:e,value:l,checked:o}=t;if(e==="text")return l.length>0;if(e==="email")return g(l);if(e==="radio")return o},E=()=>{let t=c.children[r].querySelectorAll("input");console.log({stepInputs:t});for(let e of t){let l=e.required,o=L(e);if(e.type==="radio"){if(o)return!0}else if(l&&!o)return!1}return!0},d=t=>{r===s-1?n.classList.add("hide"):n.classList.remove("hide"),t?(n.classList.remove("disabled"),u.classList.remove("disabled")):(n.classList.add("disabled"),u.classList.add("disabled"))};d(!1);let S=t=>{let e=t.target.type,l=t.target.value,o=E();d(o)},v=t=>{r++;let e=m[r].querySelector("input");if(!e)return;let l=e.type,o=e.value,y=L(e);d(y),p[r].click()},q=t=>{let e=new FormData(t);return{name:e.get("name")?.toString()||"",email:e.get("email")?.toString()||"",phone:e.get("phone")?.toString()||"",role:e.get("role")?.toString()||""}};Webflow.push(function(){$("form").submit(function(){if(r===s-1){document.querySelector(".bg_radial-gradient")?.classList.remove("opacity-0"),document.querySelectorAll(".demo-shapes")?.forEach(M=>{M.classList.remove("opacity-0")});let t=this,{name:e,email:l,phone:o,role:y}=q(t),h=document.querySelector("#calendly-button");return h&&(h.href+=`?name=${encodeURIComponent(e)}&email=${encodeURIComponent(l)}`),!0}else return!1})}),b.forEach(t=>{t.addEventListener("input",S)}),n?.addEventListener("click",v),document.addEventListener("keypress",function(t){if(r!==s-1&&t.key==="Enter"){if(n.classList.contains("disabled"))return;setTimeout(()=>{n.click()},500)}})});})();
//# sourceMappingURL=index.js.map
