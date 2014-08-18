/*
 * Sencha Animator 2013, all rights reserved
 */
if(typeof(AN)==="undefined"){var AN={}}AN.instances={symbols:[],controllers:[]};AN.apiVersion=1;
/*
 * Sencha Animator 2013, all rights reserved
 */
AN.Symbol=function(){return{currentTimeline:false,userData:{},lastTimelineClass:false,setConfig:function(b,f,a){AN.instances.symbols.push(this);this.containerEl=b;this.controller=a;this.data=f;this.events=this.data.events;this.timelines=[];this.timelinesById={};this.timelinesByName={};var e;for(var c=0;c<this.data.timelines.length;c++){e=this.data.timelines[c];this.timelines.push(e);this.timelinesById[e.id]=e;this.timelinesByName[e.name]=e}this.setupListeners();if(f.actions.init){f.actions.init.call(this.userData,this.controller,this)}var d=this;setTimeout(function(){d.goToTimelineByIndex(0)},0)},setupListeners:function(){var h=this;function f(i){if(i.target!==h.containerEl){h.onAnimationEnd();i.stopPropagation()}}this.containerEl.addEventListener("webkitAnimationEnd",f,false);this.containerEl.addEventListener("animationend",f,false);function a(l,j,i){l.addEventListener(j,function(m){i.call(h.userData,h.controller,m,h)},false)}var d,b,k,g;for(var e=0;e<this.events.length;e++){b=this.events[e];k=b.type;g=".an-symbol-"+b.id;d=this.containerEl.querySelector(g);for(var c=0;c<k.length;c++){a(d,k[c],b.handler)}}},onAnimationEnd:function(){this.runningAnimationCount--;if(this.runningAnimationCount===0){this.onAllAnimationEnd()}},onAllAnimationEnd:function(){var a=this.currentTimeline.endWaitTime;if(a){var b=this;this.symbolTimeout=setTimeout(function(){b.onTimelineFinish()},a*1000)}else{this.onTimelineFinish()}},fireTimelineEvent:function(a){if(this.currentTimeline[a]){this.currentTimeline[a].call(this.userData,this.controller,{},this)}},onTimelineFinish:function(){this.fireTimelineEvent("endAction")},forceRefresh:function(){this.forceRefreshValue=this.containerEl.offsetHeight},getUserData:function(){return this.userData},getSymbolMasterId:function(){return this.data.id},getParentSymbol:function(){var a=this.containerEl;while((a=a.parentNode)&&a!==this.controller.olElement){if(a.className.indexOf("an-symbol-container")!==-1){return this.controller.getSymbolByHtmlId(a.id)}}return null},getChildSymbols:function(){var c=this.containerEl.querySelectorAll(".an-symbol-container");var a=[];for(var b=0;b<c.length;b++){a.push(this.controller.getSymbolByHtmlId(c[b].id))}return a},getChildSymbolByInstanceId:function(b){var a=this.containerEl.querySelector(".an-symbol-container.an-symbol-"+b);return this.controller.getSymbolByHtmlId(a.id)},getContainerElement:function(){return this.containerEl},getController:function(){return this.controller},getTimelineByIndex:function(a){return this.timelines[a]},getTimelineById:function(a){return this.timelinesById[a]},getTimelineByName:function(a){return this.timelinesByName[a]},getCurrentTimeline:function(){return this.currentTimeline},restartTimeline:function(){this.goToTimeline(this.currentTimeline)},goToNextTimeline:function(){var b=this.timelines.indexOf(this.currentTimeline);var a=Math.min(b+1,this.timelines.length-1);if(b===a){return}this.goToTimelineByIndex(a)},goToPreviousTimeline:function(){var b=this.timelines.indexOf(this.currentTimeline);var a=Math.max(b-1,0);if(b===a){return}this.goToTimelineByIndex(a)},goToTimelineByIndex:function(a){this.goToTimeline(this.timelines[a])},goToTimelineById:function(a){this.goToTimeline(this.timelinesById[a])},goToTimelineByName:function(a){this.goToTimeline(this.timelinesByName[a])},goToTimeline:function(a){var c=this.currentTimeline;var b=false;if(c===a){b=true}if(c){this.fireTimelineEvent("exitAction")}this.runningAnimationCount=a.animationCount;this.currentTimeline=a;this.fireTimelineEvent("initAction");var d="t-"+a.id;clearTimeout(this.symbolTimeout);if(this.lastTimelineClass){this.adjustClasses([],[this.lastTimelineClass],this.containerEl);this.lastTimelineClass=false}if(b||this.controller.browser==="moz"){this.adjustClasses(["restart","run",d],[],this.containerEl);this.forceRefresh()}this.adjustClasses(["run",d],["restart"],this.containerEl);this.lastTimelineClass=d;this.fireTimelineEvent("startAction");if(a.animationCount===0){this.onAllAnimationEnd()}},getClassArray:function(c){var a=c.className;a=a.split(" ");var d=[];for(var b=0;b<a.length;b++){if(a[b]){d.push(a[b])}}return a},adjustClasses:function(f,c,b){var d=this.getClassArray(b);var e;for(var a=d.length-1;a>=0;a--){e=d[a];if(c.indexOf(e)!==-1){d.splice(a,1)}}for(var a=0;a<f.length;a++){if(d.indexOf(f[a])===-1){d.push(f[a])}}b.className=d.join(" ")}}};
/*
 * Sencha Animator 2013, all rights reserved
 */
AN.Controller=function(){return{currentScene:false,userData:{},setConfig:function(a){AN.instances.controllers.push(this);this.events=a.events;this.prefix=a.cssPrefix;this.projectActions=a.projectActions;this.basePath=a.basePath?a.basePath:"";this.olElement=document.querySelector("#"+a.parentId+" ol");var d=this.olElement.children;this.useOrmma=a.ormma;this.scenes=[];this.scenesById={};this.sceneByName={};var g;for(var e=0;e<a.scenes.length;e++){g=a.scenes[e];g.element=d[e];g.timelinesById={};g.timelinesByName={};for(var c=0;c<g.timelines.length;c++){g.timelinesById[g.timelines[c].id]=g.timelines[c];g.timelinesByName[g.timelines[c].name]=g.timelines[c]}this.scenesById[g.id]=g;this.scenes.push(g);if(g.name){this.sceneByName[g.name]=g}}this.setupListeners();this.startSceneByName=this.goToSceneByName;this.startSceneById=this.goToSceneById;this.startSceneByID=this.startSceneById;this.symbolInstancesByHtmlId={};this.symbolInstancesById={};this.symbols=[];var h,b,f;for(var e=0;e<a.symbols.length;e++){h=a.symbols[e];this.symbolInstancesById[h.id]=[];b=this.olElement.querySelectorAll(".an-symbol-container-"+h.id);for(var c=0;c<b.length;c++){f=new AN.Symbol();f.setConfig(b[c],h,this);this.symbolInstancesByHtmlId[b[c].id]=f;this.symbolInstancesById[h.id].push(f);this.symbols.push(f)}}this.fireAction(this.projectActions,"init");this.goToScene(this.scenes[0])},setupListeners:function(){var l=this;this.browser="unknown";if(document.body.style.MozAnimationName!==undefined){this.browser="moz"}function h(j){var i;if(l.browser==="moz"){i=j.target;while(i=i.parentNode){if(i===l.currentScene.element){l.onAnimationEnd();return}}}else{l.onAnimationEnd()}}this.olElement.addEventListener("webkitAnimationEnd",h,false);this.olElement.addEventListener("animationend",h,false);function c(i){i.element.addEventListener("mousemove",function(j){i.mousemoveAction.call(l.userData,l,j)},false)}var g;for(var e=0;e<this.scenes.length;e++){g=this.scenes[e];if(g.mousemoveAction){c(g)}}function a(m,j,i){m.addEventListener(j,function(n){i.call(l.userData,l,n)},false)}var f,b,k;for(var e=0;e<this.events.length;e++){b=this.events[e];k=b.type;f=document.getElementById(b.id);for(var d=0;d<k.length;d++){a(f,k[d],b.handler)}}},onAnimationEnd:function(){this.runningAnimationCount--;if(this.runningAnimationCount===0){this.onAllAnimationEnd()}},onAllAnimationEnd:function(){var a=this.currentScene.currentTimeline.endWaitTime;if(a){var b=this;this.sceneTimeout=setTimeout(function(){b.onSceneFinish()},a*1000)}else{this.onSceneFinish()}},forceRefresh:function(a){this.forceRefreshValue=a.element.offsetHeight},fireAction:function(b,a){if(b&&b[a]){b[a].call(this.userData,this)}},getSymbolByHtmlId:function(a){return this.symbolInstancesByHtmlId[a]},getSymbolByInstanceId:function(b){var a=this.olElement.querySelector(".an-symbol-container.an-symbol-"+b);return this.getSymbolByHtmlId(a.id)},getSymbols:function(){return this.symbols},getSymbolsBySymbolMasterId:function(a){return this.symbolInstancesById[a]},getUserData:function(){return this.userData},getTimelineByIndex:function(a){return this.currentScene.timelines[a]},getTimelineById:function(a){return this.currentScene.timelinesById[a]},getTimelineByName:function(a){return this.currentScene.timelinesByName[a]},getCurrentTimeline:function(){return this.currentScene.currentTimeline},getCurrentScene:function(){return this.currentScene},getSceneByIndex:function(a){return this.scenes[a]},getSceneById:function(a){return this.scenesById[a]},getSceneByName:function(a){return this.sceneByName[a]},goToNextTimeline:function(){var b=this.currentScene.timelines.indexOf(this.currentScene.currentTimeline);var a=Math.min(b+1,this.currentScene.timelines.length-1);if(a===b){return}this.goToTimelineByIndex(a)},goToPreviousTimeline:function(){var b=this.currentScene.timelines.indexOf(this.currentScene.currentTimeline);var a=Math.max(b-1,0);if(b===a){return}this.goToTimelineByIndex(a)},goToTimelineById:function(a){this.goToScene(this.currentScene,this.currentScene.timelinesById[a])},goToTimelineByName:function(a){this.goToScene(this.currentScene,this.currentScene.timelinesByName[a])},goToTimelineByIndex:function(a){this.goToScene(this.currentScene,this.currentScene.timelines[a])},goToTimeline:function(a){this.goToScene(this.currentScene,a)},goToNextScene:function(){var b=this.scenes.indexOf(this.currentScene);var a=Math.min(b+1,this.scenes.length-1);if(b===a){return}this.goToSceneByIndex(a)},goToPreviousScene:function(){var a=this.scenes.indexOf(this.currentScene);var b=Math.max(a-1,0);if(a===b){return}this.goToSceneByIndex(b)},goToSceneByIndex:function(a){this.goToScene(this.scenes[a])},goToSceneByName:function(a){this.goToScene(this.sceneByName[a])},goToSceneById:function(a,b){var c=this.scenesById[a];this.goToScene(c,c.timelinesById[b])},goToScene:function(g,f){var d=g;var e=this.currentScene;var a=f;var c=e?e.currentTimeline:false;if(a===undefined){a=d.timelines[0]}var b=false;if(c===a&&e===d){b=true}else{if(e){e.element.setAttribute("class","")}}this.fireAction(c,"exitAction");clearTimeout(this.sceneTimeout);if(e!==d){this.fireAction(e,"exitAction");this.fireAction(d,"initAction")}this.fireAction(a,"initAction");this.runningAnimationCount=a.animationCount;this.currentScene=d;d.currentTimeline=a;var h="t-"+a.id;if(b||this.browser==="moz"){d.element.setAttribute("class","run restart "+h);this.forceRefresh(d)}d.element.setAttribute("class","run "+h);if(!b&&this.useOrmma){this.ormmaNextScene(d)}this.fireAction(a,"startAction");if(a.animationCount===0){this.onAllAnimationEnd()}},replayScene:function(){console.warn("replayScene is deprecated. Use restartScene instead.");this.restartScene()},restartScene:function(){this.goToScene(this.currentScene)},restartTimeline:function(){this.goToScene(this.currentScene,this.currentScene.currentTimeline)},onSceneFinish:function(){this.fireAction(this.currentScene.currentTimeline,"endAction")},goToURL:function(a){document.location.href=a},getElementById:function(a){return document.getElementById(this.getElementIdById(a))},getElementIdById:function(a){return this.prefix+a},getUrlForLocalAsset:function(b){var a="assets/"+b;if(this.basePath){a=this.basePath+"/"+a}return a},ormmaNextScene:function(c){var a=ormma.getState();if(c.dimensions.expanded){var i=ormma.getMaxSize();if(a!=="expanded"){ormma.expand({x:0,y:0,width:i.width,height:i.height})}var b="";var d=c.element.offsetHeight;var g=c.element.offsetWidth;var e=(i.height-d)/2;var h=(i.width-g)/2;b+=" translate3d("+Math.round(h)+"px,"+Math.round(e)+"px,0)";if(c.dimensions.fit){var f=Math.min(i.width/g,i.height/d);b+=" scale3d("+f+","+f+",1)"}c.element.style.webkitTransform=b}else{if(a==="expanded"){ormma.close()}ormma.resize(c.dimensions.width,c.dimensions.height)}}}};
window.addEventListener('load', function(){
    var configData = {
        parentId: 'an-anim',
        cssPrefix: '',
        ormma: false,
        mraid: false,
        layout: {"type":"absolute","width":800,"height":1280},
        scenes: [{id: 0,name: 'Introduccion',dimensions: {height: 1280,width: 800,expanded: false,fit: false}, timelines: [{id: "0",name: 'intro',animationCount: 8,duration: 0.761,lastKeyframeTime: 1.749},{id: "1cUuQg",name: 'puertas',animationCount: 10,duration: 1.376,lastKeyframeTime: 2.745,endAction: function(controller) {
controller.goToNextScene();
}}]},{id: 4,name: 'sigue',dimensions: {height: 1280,width: 800,expanded: false,fit: false}, timelines: [{id: "1cUuQg",name: 'continua',animationCount: 5,duration: 1.493,lastKeyframeTime: 1.752},{id: "yI69rP",name: 'sale-continua',animationCount: 6,duration: 2.932,lastKeyframeTime: 2.932,endAction: function(controller) {
controller.startSceneByID(5);
}}]},{id: 5,name: 'juego',dimensions: {height: 1280,width: 800,expanded: false,fit: false}, timelines: [{id: "yI69rP",name: 'principio',animationCount: 31,duration: 0,lastKeyframeTime: 42.463,endAction: function(controller,event,symbolController) {


},startAction: function(controller,event,symbolController) {
/*controlar vida*/
setTimeout(function(){
	var vida_1 =quizData.contador;     
    if(vida_1==0){
		controller.goToTimelineByName('game-over');  
    }   
    
}, 26000); 
/**/

var explo_1 = controller.getSymbolByInstanceId('N74OD3Mt');
explo_1.goToTimelineByName('normal');

},initAction: function(controller,event,symbolController) {
//Enter your custom js code here; 
//E.g. controller.goToNextScene()
//See docs or use autocompletion for other calls
//For mouse/touch events, the event object is also available
//if called within a symbol, the symbolController object is also available
if (typeof(quizData) === "undefined") {
    quizData = {};
}

quizData.contador = 0;

document.getElementById('moz-1').style.display="block";
document.getElementById('cu-m1').style.display="block";



}},{id: "9WulbF",name: 'game-over',animationCount: 3,duration: 0,lastKeyframeTime: 1.755},{id: "wpTOhl",name: 'reglas',animationCount: 3,duration: 0,lastKeyframeTime: 1.755},{id: "aFoLHp",name: 'victoria',animationCount: 2,duration: 0,lastKeyframeTime: 1.755}]}],
        symbols: [{id: 'RnFEIU',name: 'mano',events: [],actions: {}, timelines: [{id: "FW3EeP",name: 'mano-2',animationCount: 0,duration: 0,lastKeyframeTime: 0},{id: "0",name: 'mano-1',animationCount: 1,duration: 0.248,lastKeyframeTime: 0.248,endAction: function(controller, event, symbolController) {
symbolController.goToTimelineById('FW3EeP');
}}]},{id: 'BmGZNd',name: 'boca',events: [],actions: {}, timelines: [{id: "0",name: 'normal',animationCount: 0,duration: 0,lastKeyframeTime: 0},{id: "gCCHYb",name: 'abajo',animationCount: 1,duration: 0.252,lastKeyframeTime: 0.252,endAction: function(controller, event, symbolController) {
symbolController.goToTimelineById('0');
}}]},{id: 'mHWgaH',name: 'humo',events: [],actions: {}, timelines: [{id: "PHsMca",name: 'no-humo',animationCount: 0,duration: 0,lastKeyframeTime: 0},{id: "0",name: 'si-humo',animationCount: 1,duration: 0.37,lastKeyframeTime: 0.37}]},{id: 'dRckep',name: 'mozquito',events: [],actions: {init: function(controller, symbolController) {


}
}, timelines: [{id: "0",name: 'normal',animationCount: 0,duration: 0,lastKeyframeTime: 0,endAction: function(controller, event, symbolController) {
symbolController.restartTimeline();
},initAction: function(controller,event,symbolController) {
//Enter your custom js code here; 
//E.g. controller.goToNextScene()
//See docs or use autocompletion for other calls
//For mouse/touch events, the event object is also available
//if called within a symbol, the symbolController object is also available

//Stores some information in a variable
//The stored information can be anything - string, number, or reference to an object
//
//NOTE: the variable can be accessed later from anywhere
//in the same controller in the following way:
//var theVariable = this.myVariable;

//create a global object/namespace for us to use


}},{id: "uJePBb",name: 'cambio',animationCount: 2,duration: 0.133,lastKeyframeTime: 0.252}]}],
        projectActions: {},
        events: [{id: "an-obj-4",type: ['click'],handler: function(controller) {
controller.startSceneByID(0,'1cUuQg');
}},{id: "an-obj-5",type: ['click'],handler: function(controller) {
controller.startSceneByID(0,'1cUuQg');
}},{id: "an-obj-9",type: ['click'],handler: function(controller) {
controller.startSceneByID(0,'1cUuQg');
}},{id: "an-obj-10",type: ['click'],handler: function(controller) {
controller.startSceneByID(0,'1cUuQg');
}},{id: "an-obj-19",type: ['click'],handler: function(controller) {
controller.startSceneByID(4,'yI69rP');
}},{id: "mano",type: ['click'],handler: function(controller,event,symbolController) {

//Selects a symbol instance and selects the instance that should be played
//Parameters:
//symbol_instance_id - id of symbol instance to be selected
//timeline_index - index of symbol timeline to be started (first is 0)

var symbol = controller.getSymbolInstanceById('XK0o0yqr');
symbol.goToTimelineByIndex(0);



}},{id: "como-jugar-btn",type: ['click'],handler: function(controller) {
controller.startSceneByID(5,'wpTOhl');
}},{id: "moz-1",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*boca*/
var boca = controller.getSymbolByInstanceId('8jcOa9GJ');
boca.goToTimelineByName('abajo');
/*boca*/



/*ocultar*/
setTimeout(function(){	
    document.getElementById('moz-1').style.display="none";
    document.getElementById('cu-m1').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_abajo = controller.getSymbolByInstanceId('tNWQp2bA');
humo_abajo.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_1 = controller.getSymbolByInstanceId('N74OD3Mt');
explo_1.goToTimelineByName('cambio');
/*explotar mozquito*/




}},{id: "moz-2",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-2').style.display="none";
    document.getElementById('cu-m2').style.display="none";
}, 300); 
/*ocultar*/

/*humo*/
var humo_arriba = controller.getSymbolByInstanceId('OCp2uDqQ');
humo_arriba.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_2 = controller.getSymbolByInstanceId('qoG5WA2x');
explo_2.goToTimelineByName('cambio');
/*explotar mozquito*/






}},{id: "moz-3",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-3').style.display="none";
    document.getElementById('cu-m3').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_1 = controller.getSymbolByInstanceId('8uwXqflK');
humo_lat_1.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_3 = controller.getSymbolByInstanceId('5qf2FsZi');
explo_3.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-4",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-4').style.display="none";
    document.getElementById('cu-m4').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_2 = controller.getSymbolByInstanceId('SOuvPCsO');
humo_lat_2.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_4 = controller.getSymbolByInstanceId('teG12Wjk');
explo_4.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-5",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*boca*/
var boca = controller.getSymbolByInstanceId('8jcOa9GJ');
boca.goToTimelineByName('abajo');
/*boca*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-5').style.display="none";
    document.getElementById('cu-m5').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_abajo = controller.getSymbolByInstanceId('tNWQp2bA');
humo_abajo.goToTimelineByName('si-humo');
/*humo*/



/*explotar mozquito*/
var explo_5 = controller.getSymbolByInstanceId('WRIRuOOF');
explo_5.goToTimelineByName('cambio');
/*explotar mozquito*/




}},{id: "moz-6",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-6').style.display="none";
    document.getElementById('cu-m6').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_arriba = controller.getSymbolByInstanceId('OCp2uDqQ');
humo_arriba.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_6 = controller.getSymbolByInstanceId('TTnXMnES');
explo_6.goToTimelineByName('cambio');
/*explotar mozquito*/






}},{id: "moz-7",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-7').style.display="none";
    document.getElementById('cu-m7').style.display="none";
}, 200); 
/*ocultar*/


/*humo*/
var humo_lat_1 = controller.getSymbolByInstanceId('8uwXqflK');
humo_lat_1.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_8 = controller.getSymbolByInstanceId('81BBHPA4');
explo_8.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-8",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-8').style.display="none";
    document.getElementById('cu-m8').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_2 = controller.getSymbolByInstanceId('SOuvPCsO');
humo_lat_2.goToTimelineByName('si-humo');
/*humo*/


/*explotar mozquito*/
var explo_8 = controller.getSymbolByInstanceId('HfzMz4yE');
explo_8.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-9",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*boca*/
var boca = controller.getSymbolByInstanceId('8jcOa9GJ');
boca.goToTimelineByName('abajo');
/*boca*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-9').style.display="none";
    document.getElementById('cu-m9').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_abajo = controller.getSymbolByInstanceId('tNWQp2bA');
humo_abajo.goToTimelineByName('si-humo');
/*humo*/


/*explotar mozquito*/
var explo_9 = controller.getSymbolByInstanceId('x3KpOyK3');
explo_9.goToTimelineByName('cambio');
/*explotar mozquito*/




}},{id: "moz-10",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-10').style.display="none";
    document.getElementById('cu-m10').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_arriba = controller.getSymbolByInstanceId('OCp2uDqQ');
humo_arriba.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_10 = controller.getSymbolByInstanceId('GIB1yFvX');
explo_10.goToTimelineByName('cambio');
/*explotar mozquito*/






}},{id: "moz-11",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-11').style.display="none";
    document.getElementById('cu-m11').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_1 = controller.getSymbolByInstanceId('8uwXqflK');
humo_lat_1.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_11 = controller.getSymbolByInstanceId('nWWPWo2T');
explo_11.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-12",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-12').style.display="none";
    document.getElementById('cu-m12').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_2 = controller.getSymbolByInstanceId('SOuvPCsO');
humo_lat_2.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_12 = controller.getSymbolByInstanceId('hrvBhKtG');
explo_12.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "jugar-nuevo",type: ['click'],handler: function(controller) {
controller.startSceneByID(5,'yI69rP');
}},{id: "moz-13",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*boca*/
var boca = controller.getSymbolByInstanceId('8jcOa9GJ');
boca.goToTimelineByName('abajo');
/*boca*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-13').style.display="none";
    document.getElementById('cu-m13').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_abajo = controller.getSymbolByInstanceId('tNWQp2bA');
humo_abajo.goToTimelineByName('si-humo');
/*humo*/


/*explotar mozquito*/
var explo_13 = controller.getSymbolByInstanceId('zkKySFFs');
explo_13.goToTimelineByName('cambio');
/*explotar mozquito*/




}},{id: "moz-14",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-14').style.display="none";
    document.getElementById('cu-m14').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_arriba = controller.getSymbolByInstanceId('OCp2uDqQ');
humo_arriba.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_14 = controller.getSymbolByInstanceId('Mo7yRV8y');
explo_14.goToTimelineByName('cambio');
/*explotar mozquito*/






}},{id: "moz-15",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-15').style.display="none";
    document.getElementById('cu-m15').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_1 = controller.getSymbolByInstanceId('8uwXqflK');
humo_lat_1.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_15 = controller.getSymbolByInstanceId('CBPowRUp');
explo_15.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-16",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-16').style.display="none";
    document.getElementById('cu-m16').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_2 = controller.getSymbolByInstanceId('SOuvPCsO');
humo_lat_2.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_16 = controller.getSymbolByInstanceId('SrMvG2Sx');
explo_16.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-17",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*boca*/
var boca = controller.getSymbolByInstanceId('8jcOa9GJ');
boca.goToTimelineByName('abajo');
/*boca*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-17').style.display="none";
    document.getElementById('cu-m17').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_abajo = controller.getSymbolByInstanceId('tNWQp2bA');
humo_abajo.goToTimelineByName('si-humo');
/*humo*/


/*explotar mozquito*/
var explo_17 = controller.getSymbolByInstanceId('3t118R1g');
explo_17.goToTimelineByName('cambio');
/*explotar mozquito*/




}},{id: "moz-18",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-18').style.display="none";
    document.getElementById('cu-m18').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_arriba = controller.getSymbolByInstanceId('OCp2uDqQ');
humo_arriba.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_18 = controller.getSymbolByInstanceId('b5vOMIqO');
explo_18.goToTimelineByName('cambio');
/*explotar mozquito*/






}},{id: "moz-19",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-19').style.display="none";
    document.getElementById('cu-m19').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_1 = controller.getSymbolByInstanceId('8uwXqflK');
humo_lat_1.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_19 = controller.getSymbolByInstanceId('GtWUAdcU');
explo_19.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-20",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-20').style.display="none";
    document.getElementById('cu-m20').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_2 = controller.getSymbolByInstanceId('SOuvPCsO');
humo_lat_2.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_20 = controller.getSymbolByInstanceId('UsAnI2O7');
explo_20.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-21",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*boca*/
var boca = controller.getSymbolByInstanceId('8jcOa9GJ');
boca.goToTimelineByName('abajo');
/*boca*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-21').style.display="none";
    document.getElementById('cu-m21').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_abajo = controller.getSymbolByInstanceId('tNWQp2bA');
humo_abajo.goToTimelineByName('si-humo');
/*humo*/


/*explotar mozquito*/
var explo_21 = controller.getSymbolByInstanceId('zyOnvOL1');
explo_21.goToTimelineByName('cambio');
/*explotar mozquito*/




}},{id: "moz-22",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-22').style.display="none";
    document.getElementById('cu-m22').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_arriba = controller.getSymbolByInstanceId('OCp2uDqQ');
humo_arriba.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_22 = controller.getSymbolByInstanceId('973Hy6r1');
explo_22.goToTimelineByName('cambio');
/*explotar mozquito*/






}},{id: "moz-23",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-23').style.display="none";
    document.getElementById('cu-m23').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_1 = controller.getSymbolByInstanceId('8uwXqflK');
humo_lat_1.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_23 = controller.getSymbolByInstanceId('G9ZMz68Q');
explo_23.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-24",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-24').style.display="none";
    document.getElementById('cu-m24').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_2 = controller.getSymbolByInstanceId('SOuvPCsO');
humo_lat_2.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_24 = controller.getSymbolByInstanceId('gXlaYByB');
explo_24.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-25",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*boca*/
var boca = controller.getSymbolByInstanceId('8jcOa9GJ');
boca.goToTimelineByName('abajo');
/*boca*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-25').style.display="none";
    document.getElementById('cu-m25').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_abajo = controller.getSymbolByInstanceId('tNWQp2bA');
humo_abajo.goToTimelineByName('si-humo');
/*humo*/


/*explotar mozquito*/
var explo_25 = controller.getSymbolByInstanceId('7ZjbXGLf');
explo_25.goToTimelineByName('cambio');
/*explotar mozquito*/




}},{id: "moz-26",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-26').style.display="none";
    document.getElementById('cu-m26').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_arriba = controller.getSymbolByInstanceId('OCp2uDqQ');
humo_arriba.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_26 = controller.getSymbolByInstanceId('swla4Cgc');
explo_26.goToTimelineByName('cambio');
/*explotar mozquito*/






}},{id: "moz-27",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-27').style.display="none";
    document.getElementById('cu-m27').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_1 = controller.getSymbolByInstanceId('8uwXqflK');
humo_lat_1.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_27 = controller.getSymbolByInstanceId('yJnaBTMp');
explo_27.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-28",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-28').style.display="none";
    document.getElementById('cu-m28').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_2 = controller.getSymbolByInstanceId('SOuvPCsO');
humo_lat_2.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_28 = controller.getSymbolByInstanceId('bkPlqlft');
explo_28.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-29",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*boca*/
var boca = controller.getSymbolByInstanceId('8jcOa9GJ');
boca.goToTimelineByName('abajo');
/*boca*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-29').style.display="none";
    document.getElementById('cu-m29').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_abajo = controller.getSymbolByInstanceId('tNWQp2bA');
humo_abajo.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_29 = controller.getSymbolByInstanceId('T7CcAE4k');
explo_29.goToTimelineByName('cambio');
/*explotar mozquito*/




}},{id: "moz-30",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-30').style.display="none";
    document.getElementById('cu-m30').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_arriba = controller.getSymbolByInstanceId('OCp2uDqQ');
humo_arriba.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_30 = controller.getSymbolByInstanceId('ZY6iSpwm');
explo_30.goToTimelineByName('cambio');
/*explotar mozquito*/






}},{id: "moz-31",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-31').style.display="none";
    document.getElementById('cu-m31').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_1 = controller.getSymbolByInstanceId('8uwXqflK');
humo_lat_1.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_31 = controller.getSymbolByInstanceId('zUt5EjBg');
explo_31.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-32",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-32').style.display="none";
    document.getElementById('cu-m32').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_2 = controller.getSymbolByInstanceId('SOuvPCsO');
humo_lat_2.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_32 = controller.getSymbolByInstanceId('iDZzjdNs');
explo_32.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-33",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*boca*/
var boca = controller.getSymbolByInstanceId('8jcOa9GJ');
boca.goToTimelineByName('abajo');
/*boca*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-33').style.display="none";
    document.getElementById('cu-m33').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_abajo = controller.getSymbolByInstanceId('tNWQp2bA');
humo_abajo.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_33 = controller.getSymbolByInstanceId('sJXoGksS');
explo_33.goToTimelineByName('cambio');
/*explotar mozquito*/




}},{id: "moz-34",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-34').style.display="none";
    document.getElementById('cu-m34').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_arriba = controller.getSymbolByInstanceId('OCp2uDqQ');
humo_arriba.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_34 = controller.getSymbolByInstanceId('JR9D64Ov');
explo_34.goToTimelineByName('cambio');
/*explotar mozquito*/






}},{id: "moz-35",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-35').style.display="none";
    document.getElementById('cu-m35').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_1 = controller.getSymbolByInstanceId('8uwXqflK');
humo_lat_1.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_35 = controller.getSymbolByInstanceId('gSspNSLf');
explo_35.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-36",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-36').style.display="none";
    document.getElementById('cu-m36').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_2 = controller.getSymbolByInstanceId('SOuvPCsO');
humo_lat_2.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_35 = controller.getSymbolByInstanceId('vJaVduCu');
explo_35.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-37",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*boca*/
var boca = controller.getSymbolByInstanceId('8jcOa9GJ');
boca.goToTimelineByName('abajo');
/*boca*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-37').style.display="none";
    document.getElementById('cu-m37').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_abajo = controller.getSymbolByInstanceId('tNWQp2bA');
humo_abajo.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_37 = controller.getSymbolByInstanceId('d2IM3v1f');
explo_37.goToTimelineByName('cambio');
/*explotar mozquito*/




}},{id: "moz-38",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-38').style.display="none";
    document.getElementById('cu-m38').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_arriba = controller.getSymbolByInstanceId('OCp2uDqQ');
humo_arriba.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_38 = controller.getSymbolByInstanceId('dydKwUPg');
explo_38.goToTimelineByName('cambio');
/*explotar mozquito*/






}},{id: "moz-39",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-39').style.display="none";
    document.getElementById('cu-m39').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_1 = controller.getSymbolByInstanceId('8uwXqflK');
humo_lat_1.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_39 = controller.getSymbolByInstanceId('fg73zaZm');
explo_39.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-40",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-40').style.display="none";
    document.getElementById('cu-m40').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_2 = controller.getSymbolByInstanceId('SOuvPCsO');
humo_lat_2.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_40 = controller.getSymbolByInstanceId('7yfzxtoE');
explo_40.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-41",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*boca*/
var boca = controller.getSymbolByInstanceId('8jcOa9GJ');
boca.goToTimelineByName('abajo');
/*boca*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-41').style.display="none";
    document.getElementById('cu-m41').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_abajo = controller.getSymbolByInstanceId('tNWQp2bA');
humo_abajo.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_41 = controller.getSymbolByInstanceId('2zLGjftb');
explo_41.goToTimelineByName('cambio');
/*explotar mozquito*/




}},{id: "moz-42",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-42').style.display="none";
    document.getElementById('cu-m42').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_arriba = controller.getSymbolByInstanceId('OCp2uDqQ');
humo_arriba.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_42 = controller.getSymbolByInstanceId('I4Eds0QG');
explo_42.goToTimelineByName('cambio');
/*explotar mozquito*/






}},{id: "moz-43",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-43').style.display="none";
    document.getElementById('cu-m43').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_1 = controller.getSymbolByInstanceId('8uwXqflK');
humo_lat_1.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_43 = controller.getSymbolByInstanceId('f1oK16de');
explo_43.goToTimelineByName('cambio');
/*explotar mozquito*/








}},{id: "moz-44",type: ['click'],handler: function(controller,event,symbolController) {
/*aumentar el contador*/
quizData.contador++;
var theVariable =quizData.contador;

try {
    var elementId = controller.getElementIdById('score');
    document.querySelector('#' + elementId + ' > span').innerText = '' + theVariable
} catch (err) {
    console.error(err);
}
/*aumentar el contador*/

/*mano*/
var mano = controller.getSymbolByInstanceId('XK0o0yqr');
mano.goToTimelineByName('mano-1');
/*mano*/

/*ocultar*/
setTimeout(function(){
	document.getElementById('moz-44').style.display="none";
    document.getElementById('cu-m44').style.display="none";
}, 200); 
/*ocultar*/

/*humo*/
var humo_lat_2 = controller.getSymbolByInstanceId('SOuvPCsO');
humo_lat_2.goToTimelineByName('si-humo');
/*humo*/

/*explotar mozquito*/
var explo_44 = controller.getSymbolByInstanceId('qAfvxIq1');
explo_44.goToTimelineByName('cambio');
/*explotar mozquito*/








}}],
        externalResources: [{"url":"","type":"js"}]
    };
    setTimeout(function(){
       var controller = new AN.Controller;
       controller.setConfig(configData);
    },0);
}, false);