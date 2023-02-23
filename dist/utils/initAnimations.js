(()=>{async function i(t){return t.isLoaded?!0:new Promise((e,o)=>{t.addEventListener("DOMLoaded",()=>{e(!0)})})}async function n(t){await Promise.all(t.map(i))}async function a(){let e=Webflow.require("lottie").lottie.getRegisteredAnimations();await n(e)}})();
//# sourceMappingURL=initAnimations.js.map
