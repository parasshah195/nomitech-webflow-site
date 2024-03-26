"use strict";(()=>{var t="data-carbon-pop-el",E="component",r="molecule",h="count",d="init-screen",m="end-screen",S="success-message",p="reset",M="--carbon-pop-grayscale",T="--carbon-pop-scale-factor",l=10,L=4,o="hide",c="is-visible",g=5e3;function C(){new i().initGame()}var i=class{constructor(){if(this.allMolecules=Array.from(document.querySelectorAll(`[${t}="${r}"]`)),this.moleculesPopped=[],this.moleculesDisplayed=[],this.moleculesPending=[],this.allSuccessMessages=Array.from(document.querySelectorAll(`[${t}="${S}"]`)),this.successMessagesShown=[],this.successMessagesPending=[],this.componentEl=document.querySelector(`[${t}="${E}"]`),this.initialScreenEl=document.querySelector(`[${t}="${d}"]`),this.popCountEl=document.querySelector(`[${t}="${h}"]`),this.endScreenEl=document.querySelector(`[${t}="${m}"]`),this.resetButtonEl=document.querySelector(`[${t}="${p}"]`),!this.initialScreenEl||!this.endScreenEl||this.allMolecules.length===0){console.error("Carbon Pop Game: Unable to initialize since one or more of the required elements not found"),window.DEBUG("Component",this.componentEl,"Initial screen",this.initialScreenEl,"End screen",this.endScreenEl,"Molecules",this.allMolecules);return}this.allMolecules.forEach(e=>{e.addEventListener("click",this.onMoleculePop.bind(this))}),this.resetButtonEl.addEventListener("click",this.onResetButtonClick.bind(this))}initGame(){if(window.innerWidth<=767){window.DEBUG("Not initializing Carbon Pop Game for mobile screen");return}this.moleculesPopped=[],this.moleculesDisplayed=[],this.moleculesPending=[...this.allMolecules],this.successMessagesShown=[],this.successMessagesPending=[...this.allSuccessMessages],this.allMolecules.forEach(e=>{e.classList.add(o)}),this.updateCSSVars(),this.updatePopCount(),this.showInitialScreen(),this.showRandomMolecules()}showInitialScreen(){this.initialScreenEl.style.display="block",this.endScreenEl.style.display="none"}showEndScreen(){this.initialScreenEl.style.display="none",this.endScreenEl.style.display="block"}showRandomMolecules(){if(this.moleculesPending.length===0){window.DEBUG("No more molecules to show",this.moleculesPending);return}for(;this.moleculesDisplayed.length<L;){let e=this.getRandomIndex(this.moleculesPending.length),s=this.moleculesPending.splice(e,1)[0];s.classList.remove(o),this.moleculesDisplayed.push(s)}}onMoleculePop(e){let s=e.target;s.classList.add(o);let n=this.moleculesDisplayed.indexOf(s);this.moleculesDisplayed.splice(n,1),this.moleculesPopped.push(s),this.updatePopCount(),this.updateCSSVars(),this.showSuccessMessage(),this.moleculesPending.length===0&&this.moleculesDisplayed.length===0?this.showEndScreen():this.showRandomMolecules()}showSuccessMessage(){let e=this.getRandomIndex(this.successMessagesPending.length),s=this.successMessagesPending.splice(e,1)[0];s.classList.add(c),this.successMessagesShown.push(s),setTimeout(()=>{s.classList.remove(c)},g)}updateCSSVars(){let e=this.getMoleculesPoppedCount(),s=(l-e)*l,n=e?e/l:0;this.componentEl.style.setProperty(M,`${s}%`),this.componentEl.style.setProperty(T,`${n}`)}updatePopCount(){this.popCountEl.innerText=this.getMoleculesPoppedCount().toString()}onResetButtonClick(){this.initGame()}getMoleculesPoppedCount(){return this.moleculesPopped.length}getRandomIndex(e){return Math.floor(Math.random()*e)}};})();
