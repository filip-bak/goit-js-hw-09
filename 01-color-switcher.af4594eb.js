!function(){document.body;var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");e.disabled=!0;var n=null;function d(){return document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}t.addEventListener("click",(function(){d(),n=setInterval(d,1e3),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(function(){clearInterval(n),t.disabled=!1,e.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.af4594eb.js.map