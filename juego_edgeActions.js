
(function($,Edge,compId){var Composition=Edge.Composition,Symbol=Edge.Symbol;
//Edge symbol: 'stage'
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",0,function(sym,e){sym.play();sym.getSymbol("juego").stop();sym.getSymbol("juego").getSymbol("jugar-de-nuevo").stop(0);});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_juega}","click",function(sym,e){sym.play("ingresar");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_sigue}","click",function(sym,e){sym.play("intro-out");sym.getSymbol("juego").play("play-juego");});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",8000,function(sym,e){sym.stop();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",4000,function(sym,e){sym.stop();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_bienvenido}","click",function(sym,e){sym.play("ingresar");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_puerta-izq}","click",function(sym,e){sym.play("ingresar");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_puerta-der}","click",function(sym,e){sym.play("ingresar");});
//Edge binding end
})("stage");
//Edge symbol end:'stage'

//=========================================================

//Edge symbol: 'juego'
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",15500,function(sym,e){sym.play("inicio-juego");sym.$("mozquito1").css({"opacity":1});sym.$("mozquito2").css({"opacity":1});sym.$("mozquito3").css({"opacity":1});sym.$("mozquito1").show();sym.$("mozquito2").show();sym.$("mozquito3").show();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_mozquito1}","click",function(sym,e){if(sym.getPosition()>6500){sym.$("soplido")[0].play();sym.getSymbol("mano_vaquero").play("fumar");sym.$("cigarro-humo-1").css({"opacity":1});sym.getSymbol("cigarro-humo-1").play();setTimeout(function(){sym.$("cigarro-humo-1").css({"opacity":0});sym.$("mozquito1").hide();sym.$("humo1").css({"opacity":1});sym.$("estallido")[0].play();},500);setTimeout(function(){sym.$("humo1").css({"opacity":0});},800);var vida=sym.getVariable("vida");sym.setVariable("vida",vida-1);var count=sym.getVariable("count");sym.setVariable("count",count+1);setTimeout(function(){sym.$("Text").html(""+count);},300);}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_mozquito2}","click",function(sym,e){if(sym.getPosition()>8356){sym.$("soplido")[0].play();sym.getSymbol("mano_vaquero").play("fumar");sym.$("cigarro-humo-2").css({"opacity":1});sym.getSymbol("cigarro-humo-2").play();sym.$("boca-normal").css({"opacity":0});sym.$("boca-abajo").css({"opacity":1});setTimeout(function(){sym.$("boca-normal").css({"opacity":1});sym.$("boca-abajo").css({"opacity":0});},500);setTimeout(function(){sym.$("cigarro-humo-2").css({"opacity":0});sym.$("mozquito2").hide();sym.$("humo2").css({"opacity":1});sym.$("estallido")[0].play();},500);setTimeout(function(){sym.$("humo2").css({"opacity":0});},800);var vida=sym.getVariable("vida");sym.setVariable("vida",vida-1);var count=sym.getVariable("count");sym.setVariable("count",count+1);setTimeout(function(){sym.$("Text").html(""+count);},300);}});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",0,function(sym,e){sym.setVariable("count",1);sym.setVariable("vida",0);sym.$("reglas").css({"z-index":99999});sym.$("cigarro-humo-1").css({"opacity":0});sym.$("cigarro-humo-2").css({"opacity":0});sym.$("cigarro-humo-3").css({"opacity":0});sym.$("cigarro-humo-4").css({"opacity":0});sym.$("boca-abajo").css({"opacity":0});});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",11500,function(sym,e){var vida=sym.getVariable("vida");sym.setVariable("vida",vida+1);var vida=sym.getVariable("vida");sym.$("mozquito2").css({"opacity":0});if(vida>=3){sym.play("game-over");}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_mozquito3}","click",function(sym,e){if(sym.getPosition()>8356){sym.$("soplido")[0].play();sym.getSymbol("mano_vaquero").play("fumar");sym.$("cigarro-humo-3").css({"opacity":1});sym.getSymbol("cigarro-humo-3").play();setTimeout(function(){sym.$("cigarro-humo-3").css({"opacity":0});sym.$("mozquito3").hide();sym.$("humo3").css({"opacity":1});sym.$("estallido")[0].play();},500);setTimeout(function(){sym.$("humo3").css({"opacity":0});},800);var vida=sym.getVariable("vida");sym.setVariable("vida",vida-1);var count=sym.getVariable("count");sym.setVariable("count",count+1);setTimeout(function(){sym.$("Text").html(""+count);},300);}});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",13038,function(sym,e){var vida=sym.getVariable("vida");sym.setVariable("vida",vida+1);var vida=sym.getVariable("vida");sym.$("mozquito1").css({"opacity":0});if(vida>=3){sym.play("game-over");}});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",15000,function(sym,e){var vida=sym.getVariable("vida");sym.setVariable("vida",vida+1);var vida=sym.getVariable("vida");sym.$("mozquito3").css({"opacity":0});if(vida>=3){sym.play("game-over");}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_jugar-nuevo}","click",function(sym,e){var count=sym.getVariable("count");sym.setVariable("count",1);sym.$("Text").html(0);var vida=sym.getVariable("vida");sym.setVariable("vida",0);sym.$("mozquito1").css({"opacity":1});sym.$("mozquito2").css({"opacity":1});sym.$("mozquito3").css({"opacity":1});sym.play("play-juego");});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",17096,function(sym,e){sym.stop();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_como}","click",function(sym,e){sym.stop();sym.getSymbol("reglas").play("reglas-play");sym.$("boca-normal").hide();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",16000,function(sym,e){var count=sym.getVariable("count");sym.$("score-txt").html(count-1);});
//Edge binding end
})("juego");
//Edge symbol end:'juego'

//=========================================================

//Edge symbol: 'mozquito'
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",0,function(sym,e){sym.play();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",39,function(sym,e){sym.playReverse();});
//Edge binding end
})("mozquito");
//Edge symbol end:'mozquito'

//=========================================================

//Edge symbol: 'mano_vaquero'
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",250,function(sym,e){sym.stop();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",593,function(sym,e){sym.stop();});
//Edge binding end
})("mano_vaquero");
//Edge symbol end:'mano_vaquero'

//=========================================================

//Edge symbol: 'cigarro-humo'
(function(symbolName){})("cigarro-humo");
//Edge symbol end:'cigarro-humo'

//=========================================================

//Edge symbol: 'jugar-de-nuevo'
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",0,function(sym,e){sym.stop();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",1000,function(sym,e){sym.stop();});
//Edge binding end
})("jugar-de-nuevo");
//Edge symbol end:'jugar-de-nuevo'

//=========================================================

//Edge symbol: 'reglas'
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",0,function(sym,e){sym.stop();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",597,function(sym,e){sym.stop();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",1410,function(sym,e){sym.stop();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_fondo-como}","click",function(sym,e){sym.play("reglas-out");sym.getComposition().getStage().getSymbol("juego").$("boca-normal").show();sym.getComposition().getStage().getSymbol("juego").play();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_como-pergamino}","click",function(sym,e){sym.play("reglas-out");sym.getComposition().getStage().getSymbol("juego").$("boca-normal").show();sym.getComposition().getStage().getSymbol("juego").play();});
//Edge binding end
})("reglas");
//Edge symbol end:'reglas'
})(jQuery,AdobeEdge,"casino");