function l(what) {return document.getElementById(what);}
function choose(arr) {return arr[Math.floor(Math.random()*arr.length)];}
function randomFloor(x) {if ((x%1)<Math.random()) return Math.floor(x); else return Math.ceil(x);}
String.prototype.replaceAll=function(search,replacement)
//{var target=this;return target.replace(new RegExp(search,'g'),replacement);};
{return this.split(search).join(replacement);};
function AddEvent(html_element,event_name,event_function)
{
	if(html_element.attachEvent) html_element.attachEvent("on" + event_name, function() {event_function.call(html_element);});
	else if(html_element.addEventListener) html_element.addEventListener(event_name, event_function, false);
}

function LoadScript(url,callback,onerror)
{
	var script=document.createElement('script');
	script.setAttribute('src',url);
	if (callback) script.onload=callback;
	if (onerror) script.onerror=onerror;
	document.head.appendChild(script);
	return script;
}

function ajax(url,callback)
{
	var ajaxRequest;
	try{ajaxRequest=new XMLHttpRequest();} catch (e){try{ajaxRequest=new ActiveXObject('Msxml2.XMLHTTP');} catch (e) {try{ajaxRequest=new ActiveXObject('Microsoft.XMLHTTP');} catch (e){alert("Something broke!");return false;}}}
	if (callback){ajaxRequest.onreadystatechange=function(){if(ajaxRequest.readyState==4){callback(ajaxRequest.responseText);}}}
	ajaxRequest.open('GET',url+'&nocache='+(new Date().getTime()),true);ajaxRequest.send(null);
}

var INFRAME=INFRAME||false;
var EDITOR=EDITOR||false;

G={};

G.Launch=function()
{
	if (!INFRAME)
	{
		l('topBar').innerHTML=
		'<div><b>Idle Game Maker</b>&trade; &copy; <a href="https://orteil.dashnet.org" target="_blank">Orteil</a>, 2021 - <a href="https://dashnet.org" target="_blank">DashNet</a></div>'+
		'<div><a href="http://twitter.com/orteil42" target="_blank">twitter</a></div>'+
		'<div><a href="http://orteil42.tumblr.com" target="_blank">tumblr</a></div>'+
		'<div>Help? Bugs? Ideas? Check out the <a href="http://reddit.com/r/idlegamemaker/" target="_blank">subreddit</a>!</div>'+
		'<div><a style="font-weight:bold;" href="./help.html" target="_blank">Game-making help</a></div>'+
		'<div>Also : <a href="https://orteil.dashnet.org/cookieclicker/" target="_blank">Cookie Clicker</a></div>'+
		'';
	}

	G.Init=function(){};
	G._Init=function()
	{
		G.T=0;
		G.drawT=0;
		G.fps=30;
		
		G.l=l('game');
		G.wrapl=l('wrap');
		
		G.local=true;
		if (window.location.protocol=='http:' || window.location.protocol=='https:') G.local=false;
		G.isIE=false;
		if (document.documentMode || /Edge/.test(navigator.userAgent)) G.isIE=true;
		
		if (!G.local && !INFRAME)
		{
			window.cookieconsent_options={"message":"This website uses cookies for ads and traffic analysis.","dismiss":"Got it!","learnMore":"Learn more","link":"http://orteil.dashnet.org/cookieconsentpolicy.html","target":"_blank","theme":"http://orteil.dashnet.org/cookieconsent.css","domain":"dashnet.org"};
			LoadScript("//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/1.0.9/cookieconsent.min.js");
		}
		
		G.w=window.innerWidth;
		G.h=window.innerHeight;
		G.resizing=false;
		if (!G.stabilizeResize) G.stabilizeResize=function(){}
		G._stabilizeResize=function()
		{
			G.resizing=false;
			G.stabilizeResize();
		}
		G.resize=function()
		{
			G.resizing=true;
		}
		window.addEventListener('resize',function(event)
		{
			G.w=window.innerWidth;
			G.h=window.innerHeight;
			G.resize();
		});
	
		G.mouseDown=false;//mouse button just got pressed
		G.mouseUp=false;//mouse button just got released
		G.mousePressed=false;//mouse button is currently down
		G.clickL=0;//what element got clicked
		AddEvent(document,'mousedown',function(event){G.mouseDown=true;G.mousePressed=true;G.mouseDragFrom=event.target;G.mouseDragFromX=G.mouseX;G.mouseDragFromY=G.mouseY;});
		AddEvent(document,'mouseup',function(event){G.mouseUp=true;G.mouseDragFrom=0;});
		AddEvent(document,'click',function(event){G.clickL=event.target;});
		
		G.mouseX=0;
		G.mouseY=0;
		G.mouseMoved=0;
		G.draggedFrames=0;//increment every frame when we're moving the mouse and we're clicking
		G.GetMouseCoords=function(e)
		{
			var posx=0;
			var posy=0;
			if (!e) var e=window.event;
			if (e.pageX||e.pageY)
			{
				posx=e.pageX;
				posy=e.pageY;
			}
			else if (e.clientX || e.clientY)
			{
				posx=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
				posy=e.clientY+document.body.scrollTop+document.documentElement.scrollTop;
			}
			var x=0;
			var y=0;
			G.mouseX=posx-x;
			G.mouseY=posy-y;
			G.mouseMoved=1;
		}
		AddEvent(document,'mousemove',G.GetMouseCoords);
		
		G.Scroll=0;
		G.handleScroll=function(e)
		{
			if (!e) e=event;
			G.Scroll=(e.detail<0||e.wheelDelta>0)?1:-1;
		};
		AddEvent(document,'DOMMouseScroll',G.handleScroll);
		AddEvent(document,'mousewheel',G.handleScroll);
		
		G.keys={};//key is being held down
		G.keysD={};//key was just pressed down
		G.keysU={};//key was just pressed up
		//shift=16, ctrl=17
		AddEvent(window,'keyup',function(e){
			if ((document.activeElement.nodeName=='TEXTAREA' || document.activeElement.nodeName=='INPUT') && e.keyCode!=27) return;
			if (e.keyCode==27) {}//esc
			else if (e.keyCode==13) {}//enter
			G.keys[e.keyCode]=0;
			G.keysD[e.keyCode]=0;
			G.keysU[e.keyCode]=1;
		});
		AddEvent(window,'keydown',function(e){
			if (!G.keys[e.keyCode])//prevent repeats
			{
				if (e.ctrlKey && e.keyCode==83) {e.preventDefault();}//ctrl-s
				if ((document.activeElement.nodeName=='TEXTAREA' || document.activeElement.nodeName=='INPUT') && e.keyCode!=27) return;
				if (e.keyCode==32) {e.preventDefault();}//space
				G.keys[e.keyCode]=1;
				G.keysD[e.keyCode]=1;
				G.keysU[e.keyCode]=0;
				//console.log('Key pressed : '+e.keyCode);
			}
		});
		AddEvent(window,'blur',function(e){
			G.keys={};
			G.keysD={};
			G.keysU={};
		});
		
		//latency compensator stuff
		G.time=new Date().getTime();
		G.fpsMeasure=new Date().getTime();
		G.accumulatedDelay=0;
		G.catchupLogic=0;
		G.fpsStartTime=0;
		G.frameNumber=0;
		G.getFps=function()
		{
			G.frameNumber++;
			var currentTime=(Date.now()-G.fpsStartTime )/1000;
			var result=Math.ceil((G.frameNumber/currentTime));
			if (currentTime>1)
			{
				G.fpsStartTime=Date.now();
				G.frameNumber=0;
			}
			return result;
		}
		
		var div=document.createElement('div');
		div.id='fpsCounter';
		G.wrapl.appendChild(div);
		G.fpsCounter=div;
		var div=document.createElement('canvas');
		div.id='fpsGraph';
		div.width=128;
		div.height=64;
		G.wrapl.appendChild(div);
		G.fpsGraph=div;
		G.fpsGraphCtx=G.fpsGraph.getContext('2d');
		var ctx=G.fpsGraphCtx;
		ctx.fillStyle='#000';
		ctx.fillRect(0,0,128,64);
		G.currentFps=0;
		G.previousFps=0;
		
		G.resize();
		
		G.Init();
		
		G.Loop();
	}
	
	//callbacks system : basically we have functions that return HTML but also add a callback to the callbacks array; after the HTML has been added to the DOM we call G.addCallbacks() to apply all the pending callbacks - this lets us centralize HTML and callbacks in one function
	G.Callbacks=[];
	G.callbackDepth=0;
	G.addCallbacks=function()
	{
		if (G.callbackDepth>0) return false;//prevent nesting callbacks
		G.callbackDepth++;
		var len=G.Callbacks.length;
		for (var i=0;i<len;i++)
		{G.Callbacks[i]();}
		G.Callbacks=[];
		G.callbackDepth--;
	}
	G.pushCallback=function(func)
	{
		G.Callbacks.push(func);
	}
	
	
	G.buttonsN=0;
	G.button=function(obj)
	{
		//returns a string for a new button; creates a callback that must be applied after the html has been created, with G.addCallbacks()
		//obj can have text, tooltip (text that shows on hover), onclick (function executed when button is clicked), classes (CSS classes added to the button), id (force button to have that id)
		var id=obj.id||('button-'+G.buttonsN);
		var str='<div '+(obj.style?('style="'+obj.style+'" '):'')+'class="systemButton'+(obj.classes?(' '+obj.classes):'')+'" id="'+id+'">'+(obj.text||'-')+'</div>';
		if (obj.onclick || obj.tooltip)
		{
			G.pushCallback(function(id,obj){return function(){
				if (l(id))
				{
					if (typeof obj.tooltip==='function') G.addTooltip(l(id),{func:obj.tooltip});
					else G.addTooltip(l(id),{text:obj.tooltip});
					if (obj.onclick) l(id).onclick=obj.onclick;
				}
			}}(id,obj));
		}
		G.buttonsN++;
		return str;
	}
	
	G.textN=0;
	G.updateTextTimer=function(id,func,freq)
	{
		var el=l('updatabletextspan-'+id);
		if (el)
		{
			var delay=freq*1000;
			if (freq<0) {freq=-freq;delay=100;}//a trick : the first update always occurs 100ms after being declared
			el.innerHTML=func();
			G.addCallbacks();
			setTimeout(function(id,func){return function(){G.updateTextTimer(id,func,freq);}}(id,func),delay);
		}
	}
	G.selfUpdatingText=function(func,freq)
	{
		if (!freq) freq=1;
		//returns a string for a span of text that updates itself every second; creates a callback that must be applied after the html has been created, with G.addCallbacks()
		var id=G.textN;
		var str='<span class="updatabletextspan" id="updatabletextspan-'+id+'">'+func()+'</span>';
		G.pushCallback(function(id,func,freq){return function(){
			G.updateTextTimer(id,func,-freq);
		}}(id,func,freq));
		G.textN++;
		return str;
	}
	
	G.tooltipdN=0;
	G.tooltipped=function(text,obj,style)
	{
		var id='tooltippedspan-'+G.tooltipdN;
		//var str='<span class="tooltippedspan"'+(style?' style="'+style+'"':'')+' id="'+id+'">'+text+'</span>';
		var div=document.createElement('div');
		//weird trickery here, don't even ask
		div.innerHTML=text;
		if (div.firstChild.nodeType==3) div.innerHTML='<span>'+div.innerHTML+'</span>';
		if (!div.firstChild.id) div.firstChild.id=id;
		else id=div.firstChild.id;
		str=div.innerHTML;
		G.pushCallback(function(id,obj){return function(){
			if (typeof obj==='string') G.addTooltip(l(id),{text:obj});
			else G.addTooltip(l(id),obj);
		}}(id,obj));
		G.tooltipdN++;
		return str;
	}
	
	
	
	/*=====================================================================================
	LOGIC
	=======================================================================================*/
	G.Logic=function(){}
	G._Logic=function()
	{
		G.Logic();
		if (G.T%5==0 && G.resizing) {G._stabilizeResize();}
		
		if (G.mouseUp) G.mousePressed=false;
		G.mouseDown=false;
		G.mouseUp=false;
		if (G.mouseMoved && G.mousePressed) G.draggedFrames++; else if (!G.mousePressed) G.draggedFrames=0;
		G.mouseMoved=0;
		G.Scroll=0;
		G.clickL=0;
		G.keysD={};
		G.keysU={};
		if (document.activeElement.nodeName=='TEXTAREA' || document.activeElement.nodeName=='INPUT') G.keys={};
		
		G.T++;
	}
	
	/*=====================================================================================
	DRAW
	=======================================================================================*/
	G.Draw=function(){};
	G._Draw=function()
	{
		G.Draw();
		G.drawT++;
	}
	
	/*=====================================================================================
	MAIN LOOP
	=======================================================================================*/
	G.Loop=function()
	{
		//update game logic !
		G.catchupLogic=0;
		G._Logic();
		G.catchupLogic=1;
		
		//latency compensator
		G.accumulatedDelay+=((new Date().getTime()-G.time)-1000/G.fps);
		G.accumulatedDelay=Math.min(G.accumulatedDelay,1000*5);//don't compensate over 5 seconds; if you do, something's probably very wrong
		G.time=new Date().getTime();
		while (G.accumulatedDelay>0)
		{
			G._Logic();
			G.accumulatedDelay-=1000/G.fps;//as long as we're detecting latency (slower than target fps), execute logic (this makes drawing slower but makes the logic behave closer to correct target fps)
		}
		G.catchupLogic=0;
		
		if (!document.hidden || document.hasFocus() || G.T%5==0) G._Draw();
		
		//fps counter and graph
		G.previousFps=G.currentFps;
		G.currentFps=G.getFps();
		if (INFRAME && !EDITOR)
		{
			l('fpsCounter').innerHTML=G.currentFps+' fps';
			var ctx=G.fpsGraphCtx;
			ctx.drawImage(G.fpsGraph,-1,0);
			ctx.fillStyle='rgb('+Math.round((1-G.currentFps/G.fps)*128)+',0,0)';
			ctx.fillRect(128-1,0,1,64);
			ctx.strokeStyle='#fff';
			ctx.beginPath();
			ctx.moveTo(128-1,(1-G.previousFps/G.fps)*64);
			ctx.lineTo(128,(1-G.currentFps/G.fps)*64);
			ctx.stroke();
		}
		setTimeout(G.Loop,1000/G.fps);
	}
}

G.Launch();

if (!INFRAME)
{
	window.onload=function()
	{
		if (!G.ready)
		{
			G.ready=true;
			var vars={};
			var parts=window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(m,key,value){vars[key]=value;});
			G.vars=vars;
			if (G.vars.e)
			{
				l('code').innerHTML='<iframe id="editor" src="editor.html"></iframe>';
				l('wrap').classList.add('withCode');
			}
			if (G.vars.g)
			{
				l('game').innerHTML='<iframe id="player" src="player.html"></iframe>';
			}
			else
			{
				l('game').innerHTML='<iframe id="main" src="main.html"></iframe>';
			}
		}
	};
	G.loadedEditor=false;
	G.loadedPlayer=false;
	window.addEventListener('message',function(e)
	{
		if (e.data.playerReady && !G.loadedPlayer)
		{
			G.loadedPlayer=true;
			l('player').contentWindow.postMessage({launch:true,loc:window.location.origin,vars:G.vars},'*');
		}
		else if (e.data.editorReady) {}
		else if (e.data.code && !G.loadedEditor && l('editor'))
		{
			G.loadedEditor=true;
			l('editor').contentWindow.postMessage({code:e.data.code},'*');
		}
		else if (e.data.refresh)
		{
			l('game').innerHTML='<iframe id="player" src="player.html"></iframe>';
			setTimeout(function(){l('player').contentWindow.postMessage({launch:true,loc:window.location.origin,vars:G.vars,code:e.data.refresh},'*');},100);
		}
	});
}
else
{
	if (!G.ready)
	{
		if (EDITOR)
		{
			G.ready=true;
			G.timeSinceTyped=0;
			l('game').innerHTML=`
			<div id="codeWrap">
				<textarea id="code"></textarea>
			</div>
			`;
			AddEvent(l('code'),'input',function(){G.timeSinceTyped=Math.ceil(G.fps/2);});
			G.Logic=function(){
				if (G.timeSinceTyped>0) G.timeSinceTyped--;
				if (G.timeSinceTyped==1) parent.postMessage({refresh:l('code').value},'*');
			}
			G._Init();
			parent.postMessage({editorReady:true},'*');
		}
		else
		{
			parent.postMessage({playerReady:true},'*');
		}
	}
	window.addEventListener('message',function(e)
	{
		if (EDITOR)
		{
			if (e.data.code)
			{
				l('code').value=e.data.code;
				l('game').style.display='block';
			}
		}
		else
		{
			if (!G.ready && e.data.launch)
			{
				G.ready=true;
				if (e.data.loc==window.location.origin)
				{
					if (e.data.code) TOPARSE=e.data.code;
					G.urlVars=e.data.vars;
					LoadScript('game.js?v='+(document.lastModified),G._Init);
				}
			}
		}
	});
}