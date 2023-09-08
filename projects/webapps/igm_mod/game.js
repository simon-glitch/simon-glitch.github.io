/*=====================================================================================
HELPER FUNCTIONS
=======================================================================================*/

function triggerAnim(element,anim)
{
	if (!element) return;
	element.classList.remove(anim);
	void element.offsetWidth;
	element.classList.add(anim);
}

function isNumber(n)
{return (!isNaN(parseFloat(n)) && isFinite(n));}

function parseNum(n)
{
	if (n===true) return 1;
	else if (n===false) return 0;
	else if (isNaN(n)) return 0;
	else return n;
}

var luck=function(x)
{
	if (Math.random()<x/100) return true; else return false;
}
var rand=function(x,y)
{
	if (!y) y=0;
	if (y<x) {var tmp=x;x=y;y=tmp;}
	y++;
	return Math.floor(Math.random()*(y-x)+x);
}
var frand=function(x,y)
{
	if (!y) y=0;
	if (y<x) {var tmp=x;x=y;y=tmp;}
	return (Math.random()*(y-x)+x);
}

//String2 is a pseudo-string type with some added functions that are as ambiguous in purpose as they are buggy
var String2=function(str)
{
	this.val=str;
}
String2.prototype.toString=function(){return this.val;}

/*
	String2.gulp(str) : if the string begins with str, remove str from the string and return what we gulped; else return false
	If str is unspecified, gulp a whole word until the next space and return it
	If a quote " is encountered, keep gulping until the next quote
	Example :
		var str=STR2('set value3 to 100');
		if (str.gulp('set'))
		{
			var val=str.gulpUntil('to');
			var amount=str.gulpUntil();
			console.log(val,amount);
		}
*/
String2.prototype.gulp=function(str,isSymbol)
{
	if (str)
	{
		if (!isSymbol) str=str+=' ';
		if (this.val.indexOf(str)==0)
		{
			this.val=this.val.substring(str.length);
			if (isSymbol && this.val.charAt(0)==' ') this.val=this.val.substring(1);//remove first space
			return str;
		}
		else return false;
	}
	else
	{
		if ((this.val.split('"').length-1)>=2 && (this.val.indexOf(' ')>this.val.indexOf('"')))
		{
			var str=this.val.substring(0,this.val.indexOf('"',this.val.indexOf('"')+1)+1);
			this.val=this.val.substring(str.length+1);
			return str;
		}
		else if (this.val.indexOf(' ')>0)
		{
			var str=this.val.substring(0,this.val.indexOf(' '));
			this.val=this.val.substring(str.length+1);
			return str;
		}
		else
		{
			var str=this.val;this.val='';return str;
		}
	}
}
String2.prototype.gulpSymbol=function(str){return this.gulp(str,true);}//like gulp, but ignores spaces
String2.prototype.gulpUntil=function(str,isSymbol,toEnd)
{
	//gulp all words until str (str is not included in the result, and removed from the String2)
	//if str is unspecified (or toEnd is true and str wasn't found), just return the rest of the string
	var bumpStr=str;
	var paddedBumpStr=bumpStr;
	if (!isSymbol) paddedBumpStr=' '+paddedBumpStr;
	if (!str || (toEnd && this.val.indexOf(paddedBumpStr)==-1))
	{
		var str=this.val;
		this.val='';
		return str;
	}
	else if (this.val.indexOf(paddedBumpStr)>=0)
	{
		var str=this.val.substring(0,this.val.indexOf(paddedBumpStr));
		if (isSymbol) this.val=this.val.substring(str.length+bumpStr.length);
		else this.val=this.val.substring(str.length+1+bumpStr.length);
		if (this.val.charAt(0)==' ') this.val=this.val.substring(1);//remove first space
		if (this.val.charAt(this.val.length-1)==' ') this.val=this.val.slice(0,-1);//remove last space
		return str;
	}
	else return false;
}
String2.prototype.gulpUntilSymbol=function(str,toEnd){return this.gulpUntil(str,true,toEnd);}//like gulpUntil, but ignores spaces
var STR2=function(str)//shortcut
{return new String2(str);}


//the old Beautify function from Cookie Clicker, shortened to B(value)
//initially adapted from http://cookieclicker.wikia.com/wiki/Frozen_Cookies_%28JavaScript_Add-on%29
function formatEveryThirdPower(notations)
{
	return function (value)
	{
		var base = 0,
		notationValue = '';
		if (!isFinite(value)) return 'Inf.';
		if (value >= 1000)
		{
			value /= 1000;
			while(Math.round(value) >= 1000)
			{
				value /= 1000;
				base++;
			}
			if (base >= notations.length) {return 'Inf.';} else {notationValue = notations[base];}
		}
		return (value<1000000000000?( Math.round(value * 10) / 10 ):Math.floor(value)) + notationValue;
	};
}

function rawFormatter(value) {return Math.round(value * 1000) / 1000;}

var formatLong=[' thousand',' million',' billion',' trillion',' quadrillion',' quintillion',' sextillion',' septillion',' octillion',' nonillion'];
var prefixes=['','un','duo','tre','quattuor','quin','sex','septen','octo','novem'];
var suffixes=['decillion','vigintillion','trigintillion','quadragintillion','quinquagintillion','sexagintillion','septuagintillion','octogintillion','nonagintillion'];
for (var i in suffixes)
{
	for (var ii in prefixes)
	{
		formatLong.push(' '+prefixes[ii]+suffixes[i]);
	}
}

var formatShort=['k','M','B','T','Qa','Qi','Sx','Sp','Oc','No'];
var prefixes=['','Un','Do','Tr','Qa','Qi','Sx','Sp','Oc','No'];
var suffixes=['D','V','T','Qa','Qi','Sx','Sp','O','N'];
for (var i in suffixes)
{
	for (var ii in prefixes)
	{
		formatShort.push(' '+prefixes[ii]+suffixes[i]);
	}
}
formatShort[10]='Dc';


var numberFormatters =
[
	formatEveryThirdPower(formatShort),
	formatEveryThirdPower(formatLong),
	rawFormatter
];
var numberFormatter=numberFormatters[2];
function Beautify(value,floats)
{
	var negative=(value<0);
	var decimal='';
	var fixed=value.toFixed(floats);
	if (Math.abs(value)<1000 && floats>0 && Math.floor(fixed)!=fixed) decimal='.'+(fixed.toString()).split('.')[1];
	value=Math.floor(Math.abs(value));
	if (floats>0 && fixed==value+1) value++;
	var formatter=numberFormatter;
	var output=formatter(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
	if (output=='0') negative=false;
	return negative?'-'+output:output+decimal;
}
var B=Beautify;


function BeautifyTime(value)
{
	//value should be in seconds
	value=Math.max(Math.ceil(value,0));
	var years=Math.floor(value/31536000);
	value-=years*31536000;
	var days=Math.floor(value/86400);
	value-=days*86400;
	var hours=Math.floor(value/3600)%24;
	value-=hours*3600;
	var minutes=Math.floor(value/60)%60;
	value-=minutes*60;
	var seconds=Math.floor(value)%60;
	var str='';
	if (years) str+=B(years)+'Y';
	if (days || str!='') str+=B(days)+'d';
	if (hours || str!='') str+=hours+'h';
	if (minutes || str!='') str+=minutes+'m';
	if (seconds || str!='') str+=seconds+'s';
	if (str=='') str+='0s';
	return str;
}
var BT=BeautifyTime;


var sayTime=function(time,detail)
{
	//time is a value where one second is equal to 1000.
	//detail skips days when >1, hours when >2, minutes when >3 and seconds when >4.
	//if detail is -1, output something like "3 hours, 9 minutes, 48 seconds"
	if (time<=0) return '';
	var str='';
	var detail=detail||0;
	time=Math.floor(time);
	var second=1000;
	if (detail==-1)
	{
		var days=0;
		var hours=0;
		var minutes=0;
		var seconds=0;
		if (time>=second*60*60*24) days=(Math.floor(time/(second*60*60*24)));
		if (time>=second*60*60) hours=(Math.floor(time/(second*60*60)));
		if (time>=second*60) minutes=(Math.floor(time/(second*60)));
		if (time>=second) seconds=(Math.floor(time/(second)));
		hours-=days*24;
		minutes-=hours*60+days*24*60;
		seconds-=minutes*60+hours*60*60+days*24*60*60;
		if (days>10) {hours=0;}
		if (days) {minutes=0;seconds=0;}
		if (hours) {seconds=0;}
		var bits=[];
		if (days>0) bits.push(B(days)+' day'+(days==1?'':'s'));
		if (hours>0) bits.push(B(hours)+' hour'+(hours==1?'':'s'));
		if (minutes>0) bits.push(B(minutes)+' minute'+(minutes==1?'':'s'));
		if (seconds>0) bits.push(B(seconds)+' second'+(seconds==1?'':'s'));
		if (bits.length==0) str='less than 1 second';
		else str=bits.join(', ');
	}
	else
	{
		if (time>=second*60*60*24*2 && detail<2) str=B(Math.floor(time/(second*60*60*24)))+' days';
		else if (time>=second*60*60*24 && detail<2) str='1 day';
		else if (time>=second*60*60*2 && detail<3) str=B(Math.floor(time/(second*60*60)))+' hours';
		else if (time>=second*60*60 && detail<3) str='1 hour';
		else if (time>=second*60*2 && detail<4) str=B(Math.floor(time/(second*60)))+' minutes';
		else if (time>=second*60 && detail<4) str='1 minute';
		else if (time>=second*2 && detail<5) str=B(Math.floor(time/(second)))+' seconds';
		else if (time>=second && detail<5) str='1 second';
		else str='less than 1 second';
	}
	return str;
}

function cap(str)
{return str.charAt(0).toUpperCase()+str.slice(1);}

//file save function from https://github.com/eligrey/FileSaver.js
var saveAs=saveAs||function(view){"use strict";if(typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var doc=view.document,get_URL=function(){return view.URL||view.webkitURL||view},save_link=doc.createElementNS("http://www.w3.org/1999/xhtml","a"),can_use_save_link="download"in save_link,click=function(node){var event=new MouseEvent("click");node.dispatchEvent(event)},is_safari=/Version\/[\d\.]+.*Safari/.test(navigator.userAgent),webkit_req_fs=view.webkitRequestFileSystem,req_fs=view.requestFileSystem||webkit_req_fs||view.mozRequestFileSystem,throw_outside=function(ex){(view.setImmediate||view.setTimeout)(function(){throw ex},0)},force_saveable_type="application/octet-stream",fs_min_size=0,arbitrary_revoke_timeout=500,revoke=function(file){var revoker=function(){if(typeof file==="string"){get_URL().revokeObjectURL(file)}else{file.remove()}};if(view.chrome){revoker()}else{setTimeout(revoker,arbitrary_revoke_timeout)}},dispatch=function(filesaver,event_types,event){event_types=[].concat(event_types);var i=event_types.length;while(i--){var listener=filesaver["on"+event_types[i]];if(typeof listener==="function"){try{listener.call(filesaver,event||filesaver)}catch(ex){throw_outside(ex)}}}},auto_bom=function(blob){if(/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)){return new Blob(["\ufeff",blob],{type:blob.type})}return blob},FileSaver=function(blob,name,no_auto_bom){if(!no_auto_bom){blob=auto_bom(blob)}var filesaver=this,type=blob.type,blob_changed=false,object_url,target_view,dispatch_all=function(){dispatch(filesaver,"writestart progress write writeend".split(" "))},fs_error=function(){if(target_view&&is_safari&&typeof FileReader!=="undefined"){var reader=new FileReader;reader.onloadend=function(){var base64Data=reader.result;target_view.location.href="data:attachment/file"+base64Data.slice(base64Data.search(/[,;]/));filesaver.readyState=filesaver.DONE;dispatch_all()};reader.readAsDataURL(blob);filesaver.readyState=filesaver.INIT;return}if(blob_changed||!object_url){object_url=get_URL().createObjectURL(blob)}if(target_view){target_view.location.href=object_url}else{var new_tab=view.open(object_url,"_blank");if(new_tab==undefined&&is_safari){view.location.href=object_url}}filesaver.readyState=filesaver.DONE;dispatch_all();revoke(object_url)},abortable=function(func){return function(){if(filesaver.readyState!==filesaver.DONE){return func.apply(this,arguments)}}},create_if_not_found={create:true,exclusive:false},slice;filesaver.readyState=filesaver.INIT;if(!name){name="download"}if(can_use_save_link){object_url=get_URL().createObjectURL(blob);setTimeout(function(){save_link.href=object_url;save_link.download=name;click(save_link);dispatch_all();revoke(object_url);filesaver.readyState=filesaver.DONE});return}if(view.chrome&&type&&type!==force_saveable_type){slice=blob.slice||blob.webkitSlice;blob=slice.call(blob,0,blob.size,force_saveable_type);blob_changed=true}if(webkit_req_fs&&name!=="download"){name+=".download"}if(type===force_saveable_type||webkit_req_fs){target_view=view}if(!req_fs){fs_error();return}fs_min_size+=blob.size;req_fs(view.TEMPORARY,fs_min_size,abortable(function(fs){fs.root.getDirectory("saved",create_if_not_found,abortable(function(dir){var save=function(){dir.getFile(name,create_if_not_found,abortable(function(file){file.createWriter(abortable(function(writer){writer.onwriteend=function(event){target_view.location.href=file.toURL();filesaver.readyState=filesaver.DONE;dispatch(filesaver,"writeend",event);revoke(file)};writer.onerror=function(){var error=writer.error;if(error.code!==error.ABORT_ERR){fs_error()}};"writestart progress write abort".split(" ").forEach(function(event){writer["on"+event]=filesaver["on"+event]});writer.write(blob);filesaver.abort=function(){writer.abort();filesaver.readyState=filesaver.DONE};filesaver.readyState=filesaver.WRITING}),fs_error)}),fs_error)};dir.getFile(name,{create:false},abortable(function(file){file.remove();save()}),abortable(function(ex){if(ex.code===ex.NOT_FOUND_ERR){save()}else{fs_error()}}))}),fs_error)}),fs_error)},FS_proto=FileSaver.prototype,saveAs=function(blob,name,no_auto_bom){return new FileSaver(blob,name,no_auto_bom)};if(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob){return function(blob,name,no_auto_bom){if(!no_auto_bom){blob=auto_bom(blob)}return navigator.msSaveOrOpenBlob(blob,name||"download")}}FS_proto.abort=function(){var filesaver=this;filesaver.readyState=filesaver.DONE;dispatch(filesaver,"abort")};FS_proto.readyState=FS_proto.INIT=0;FS_proto.WRITING=1;FS_proto.DONE=2;FS_proto.error=FS_proto.onwritestart=FS_proto.onprogress=FS_proto.onwrite=FS_proto.onabort=FS_proto.onerror=FS_proto.onwriteend=null;return saveAs}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content);if(typeof module!=="undefined"&&module.exports){module.exports.saveAs=saveAs}else if(typeof define!=="undefined"&&define!==null&&define.amd!=null){define([],function(){return saveAs})}


	
/*=====================================================================================
ENGINE
=======================================================================================*/

var TOPARSE=TOPARSE||false;

G.Init=function()
{
	
	G.stabilizeResize=function()
	{
	}
	
	/*=====================================================================================
	SETTINGS
	=======================================================================================*/
	G.settings={
		'vol':{val:100},
		'autosave':{val:1},
		'numdisp':{val:0,onchange:function(val){
			val=parseInt(val);
			if (val>=0 && val<=2) numberFormatter=numberFormatters[val];
		}},
		'cssfilts':{val:1,onchange:function(val){
			if (val)
			{
				G.l.classList.remove('filtersOff');
				G.l.classList.add('filtersOn');
			}
			else
			{
				G.l.classList.remove('filtersOn');
				G.l.classList.add('filtersOff');
			}
		}},
		'particles':{val:2},
		'showFPS':{val:G.local?1:0,onchange:function(val){
			if (val)
			{
				G.fpsGraph.style.display='block';
				G.fpsCounter.style.display='block';
			}
			else
			{
				G.fpsGraph.style.display='none';
				G.fpsCounter.style.display='none';
			}
		}},
	};
	for (var i in G.settings){G.settings[i].key=i;}
	G.setSetting=function(what,val)
	{
		G.settings[what].val=val;
		if (G.settings[what].onchange) G.settings[what].onchange(G.settings[what].val);
	}
	G.getSetting=function(what)
	{
		return G.settings[what].val;
	}
	G.loadSettings=function()
	{
		for (var i in G.settings)
		{
			if (G.settings[i].onchange) G.settings[i].onchange(G.settings[i].val);
		}
	}
	
	G.makeChoices=function(o)
	{
		var str='';
		var buttonIds=[];
		for (var i in o.list)
		{
			buttonIds.push('button-'+(G.buttonsN+parseInt(i)));
		}
		for (var i in o.list)
		{
			var id=parseInt(i);
			str+=G.button({
				text:o.list[i].text,
				classes:'tickbox '+(o.val()==id?'on':'off'),
				tooltip:o.list[i].tooltip,
				onclick:function(e){
					for (var i in buttonIds)
					{
						l(buttonIds[i]).classList.remove('on');
						l(buttonIds[i]).classList.add('off');
						if (e.target.id==buttonIds[i])
						{
							var id=parseInt(i);
							o.func(id);
						}
					}
					e.target.classList.remove('off');
					e.target.classList.add('on');
					triggerAnim(e.target,'glow');
				},
			});
		}
		return str;
	}
	G.makeTick=function(o)
	{
		if (!o.off) o.off=o.on;
		return G.button({
			text:(o.val()?o.on:o.off),
			classes:'tickbox '+(o.val()?'on':'off'),
			tooltip:o.tooltip,
			onclick:function(e){
				if (o.val()) o.func(0); else o.func(1);
				if (o.val())
				{
					e.target.classList.remove('off');
					e.target.classList.add('on');
					e.target.innerHTML=o.on;
				}
				else
				{
					e.target.classList.remove('on');
					e.target.classList.add('off');
					e.target.innerHTML=o.off;
				}
				triggerAnim(e.target,'glow');
			},
		});
	}
	
	
	/*=====================================================================================
	SAVE & LOAD
	=======================================================================================*/
	
	G.saveTo=0;//we save the game to the key "IGM-"+game's url
	G.save=function(returnOnly)
	{
		if (!G.saveTo) return false;
		G.doEffectsForAll('save');
		G.doEffectsForAll('undo grants');
		var str='';
		str+='BEGIN|';
		var list=[];
			list.push('1');//engine version
			list.push(G.startDate);
			list.push(parseInt(Date.now()));//time last played
		str+=list.join(';');
		str+='|SET|';
		var list=[];
		for (var i in G.settings)
		{
			var me=G.settings[i];
			list.push(me.key+','+parseInt(me.val));
		}
		str+=list.join(';');
		str+='|RES|';
		var list=[];
		for (var i in G.res)
		{
			var me=G.res[i];
			list.push(me.key+','+((me.show<<1)|(me.lit))+','+me.amount+','+me.maxAmount+','+me.earned);
		}
		str+=list.join(';');
		str+='|BTN|';
		var list=[];
		for (var i in G.buttons)
		{
			var me=G.buttons[i];
			list.push(me.key+','+((me.show<<1)|(me.lit))+','+me.clicks);
		}
		str+=list.join(';');
		str+='|BLD|';
		var list=[];
		for (var i in G.buildings)
		{
			var me=G.buildings[i];
			list.push(me.key+','+((me.show<<1)|(me.lit))+','+me.amount+','+me.maxAmount);
		}
		str+=list.join(';');
		str+='|UPG|';
		var list=[];
		for (var i in G.upgrades)
		{
			var me=G.upgrades[i];
			list.push(me.key+','+((me.show<<1)|(me.lit))+','+me.owned);
		}
		str+=list.join(';');
		str+='|ACH|';
		var list=[];
		for (var i in G.achievs)
		{
			var me=G.achievs[i];
			list.push(me.key+','+((me.show<<1)|(me.lit))+','+me.owned);
		}
		str+=list.join(';');
		str+='|ITM|';
		//group up items by base key
		var itemsByBase=[];
		for (var i in G.items)
		{
			if (!itemsByBase[G.items[i].base.key]) itemsByBase[G.items[i].base.key]=[];
			itemsByBase[G.items[i].base.key].push(G.items[i]);
		}
		var list=[];
		for (var i in itemsByBase)
		{
			var list2=[];
			for (var ii in itemsByBase[i])
			{
				var me=itemsByBase[i][ii];
				list2.push(((me.show<<1)|(me.lit)));
			}
			list.push(i+'/'+list2.join('/'));
		}
		str+=list.join(';');
		str+='|SHN|';
		var list=[];
		for (var i in G.shinies)
		{
			var me=G.shinies[i];
			list.push(me.key+','+me.clicks);
		}
		str+=list.join(';');
		str+='|END';
		G.doEffectsForAll('do grants');
		str=window.btoa(str);
		if (returnOnly) return str;
		localStorage[G.saveTo]=str;
		if (localStorage[G.saveTo]!=str) return false;
		G.toast({text:'Game saved',classes:'center',dur:3});
		return true;
	}
	G.saveData=0;
	G.applyLoad=function(data)
	{
		if (!G.saveData) return false;
		var str=data||G.saveData;
		try{str=window.atob(str);}catch(err){return false;}
		G.saveData=0;
		str=str.split('|');
		if (str[0]!='BEGIN' || str[str.length-1]!='END') return false;
		var blocks=[];
		var blockNames=['BEGIN','SET','RES','BTN','BLD','UPG','ACH','ITM'];
		for (var i in str)
		{
			if (i>0)
			{
				if (blockNames.indexOf(str[i])==-1 && blockNames.indexOf(str[i-1])!=-1) blocks[str[i-1]]=str[i].split(';');
			}
		}
		for (var block in blocks)
		{
			if (block=='ITM')
			{
				for (var subblock in blocks[block])
				{
					var things=blocks[block][subblock].split('/');
					var key=things[0];
					if (G.thingsByName[key])
					{
						var base=G.thingsByName[key];
						things.shift();
						for (var thing in things)
						{
							var bits=things[thing].split(',');
							var i=0;
							var me={};
							var vis=parseInt(bits[i++]);me.show=vis>>1;me.lit=vis&1;
							G.gainItem(base,me);
						}
					}
				}
			}
			else if (block=='BEGIN')
			{
				var i=0;
				var bits=blocks[block];
				G.saveUsedEngineVersion=parseInt(bits[i++]);
				G.startDate=parseInt(bits[i++]);
				G.lastDate=parseInt(bits[i++]);
			}
			else
			{
				for (var thing in blocks[block])
				{
					var bits=blocks[block][thing].split(',');
					var i=0;
					var key=bits[i++];
					if (block=='SET' && G.settings[key])
					{
						var me=G.settings[key];
						G.settings[key].val=parseInt(bits[i++]);
					}
					else if (G.thingsByName[key])
					{
						var me=G.thingsByName[key];
						if (block=='RES')
						{
							var vis=parseInt(bits[i++]);me.show=vis>>1;me.lit=vis&1;
							me.amount=parseFloat(bits[i++]);
							me.maxAmount=parseFloat(bits[i++]);
							me.earned=parseFloat(bits[i++]);
						}
						else if (block=='BTN')
						{
							var vis=parseInt(bits[i++]);me.show=vis>>1;me.lit=vis&1;
							me.clicks=parseInt(bits[i++]);
						}
						else if (block=='BLD')
						{
							var vis=parseInt(bits[i++]);me.show=vis>>1;me.lit=vis&1;
							me.amount=parseFloat(bits[i++]);
							me.maxAmount=parseFloat(bits[i++]);
						}
						else if (block=='UPG')
						{
							var vis=parseInt(bits[i++]);me.show=vis>>1;me.lit=vis&1;
							me.owned=parseInt(bits[i++]);
						}
						else if (block=='ACH')
						{
							var vis=parseInt(bits[i++]);me.show=vis>>1;me.lit=vis&1;
							me.owned=parseInt(bits[i++]);
						}
						else if (block=='SHN')
						{
							me.clicks=parseInt(bits[i++]);
						}
					}
				}
			}
		}
		G.toast({text:'Game loaded',classes:'center',dur:3});
		return true;
	}
	G.load=function(data)
	{
		//reset the game and get the save data
		//(the save data is parsed inside G.parse using G.applyLoad)
		//the data parameter lets us load arbitrary save data; if none is specified, use localStorage instead
		G.turnOff();
		G.saveData=0;
		if (!data && G.saveTo) var data=localStorage[G.saveTo];
		if (!data) data=0;
		G.saveData=data;
		try {
			G.Reset(-1);
			var done=G.parse(G.data);
		}
		catch(e)
		{
			G.context='(javascript)';
			console.log(e);
			G.parseError(e.message);
			return false;
		}
		if (done && !G.parsedOnce)
		{
			//TODO : remove stylesheets first
			//load stylesheets
			G.stylesheetUrls=G.stylesheets.slice(0);
			G.stylesheets=[];
			G.stylesheetsToLoad=0;
			var onCompletion=function()
			{
				G.stylesheetsToLoad--;
				if (G.stylesheetsToLoad<=0)
				{
					G.turnOn();
				}
			}
			var onBadCompletion=function()
			{
				G.stylesheetsToLoad--;
				if (G.stylesheetsToLoad<=0)
				{
					//TODO : display a warning message; perhaps a confirm prompt
					setTimeout(G.turnOn,1000);
				}
			}
			if (G.stylesheetUrls.length==0) G.stylesheetUrls.push('stuff/basic.css');
			for (var i in G.stylesheetUrls)
			{
				var me={url:G.stylesheetUrls[i],loaded:false};
				G.stylesheets.push(me);
				G.stylesheetsToLoad++;
			}
			for (var i in G.stylesheets)
			{
				var me=G.stylesheets[i];
				if (me.url.endsWith('.css'))
				{
					var link=document.createElement('link');
					link.type='text/css';
					link.rel='stylesheet';
					link.href=me.url;
					link.onload=function(me){return function(){me.loaded=true;onCompletion();}}(me);
					link.onerror=function(me){return function(){console.log('WARNING : Failed to load the stylesheet at '+me.url+'.');onBadCompletion();}}(me);
					document.head.appendChild(link);
				}
				else if (!G.local)
				{
					ajax('server.php?q=fetch|'+me.url,function(me){return function(out){
						if (out=='[NONE]')
						{
							console.log('WARNING : Failed to load the stylesheet at '+me.url+'.');
							onBadCompletion();
							return false;
						}
						var css=document.createElement('style');
						css.type='text/css';
						css.rel='stylesheet';
						css.innerHTML=out;
						document.head.appendChild(css);
						me.loaded=true;
						onCompletion();
					}}(me));
				}
				else
				{
					console.log('WARNING : Failed to load the stylesheet at '+me.url+'.');
					onBadCompletion();
				}
			}
			
			if (G.css!='')
			{
				var css=document.createElement('style');
				css.type='text/css';
				css.innerHTML=G.css;
				document.getElementsByTagName('head')[0].appendChild(css);
			}
			
			if (G.bloomFilter>0)
			{
				//disabled (problems in Firefox, slowdowns on complex games, all-around just kinda gaudy)
				/*var bloom=document.createElementNS('http://www.w3.org/2000/svg','svg');
				bloom.innerHTML=`
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
					<defs>
						<filter id="bloom" x="0" y="0" width="100%" height="100%">
							<feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
							<feColorMatrix in="blur" type="matrix" values="
								1 0 0 0 0
								0 1 0 0 0
								0 0 1 0 0
								0 0 0 `+G.bloomFilter+` 0
							" result="blur2" />
							<feComposite result="mix" operator="atop" in2="SourceGraphic" in="blur2" />
							<feBlend in2="blur2" in="mix" result="out" mode="overlay" />
						</filter>
					</defs>
				</svg>
				`;
				document.head.appendChild(bloom);*/
			}
			G.parsedOnce=true;
		}
		else if (done)
		{
			setTimeout(G.turnOn,10);
		}
		G.loadSettings();
	}
	G.clear=function(data)
	{
		//completely get rid of the save data
		if (G.saveTo) localStorage.removeItem(G.saveTo);
		G.load();
		G.loadSettings();
	}
	
	G.getSaveData=function(){return G.save(true);}
	G.loadFromData=function(data){return G.load(data);}
	
	
	G.fileSave=function()
	{
		var filename='IGM-'+(G.name.replace(/[^a-zA-Z0-9]+/g,'')||'game');
		var text=G.getSaveData();
		var blob=new Blob([text],{type:'text/plain;charset=utf-8'});
		saveAs(blob,filename+'.txt');
		G.toast({text:'File saved to '+filename+'.txt',classes:'center',dur:3});
	}
	G.fileLoad=function(e)
	{
		if (e.target.files.length==0) return false;
		var file=e.target.files[0];
		var reader=new FileReader();
		reader.onload=function(e)
		{
			G.loadFromData(e.target.result);
		}
		reader.readAsText(file);
	}
	
	
	/*=====================================================================================
	GET GAME SOURCE
	=======================================================================================*/
	
	G.parsedOnce=false;//we've parsed the data at least once; this helps prevent declaring stylesheets more than once etc
	G.playing=false;
	
	G.dataLoaded=function(data)
	{
		if (data=='[NONE]') {G.noData();return false;}
		if (G.local) G.data=TOPARSE;
		else if (data) G.data=data;
		else {G.noData();return false;}
		console.log('Got '+B(G.data.length)+' characters of data.');
		parent.postMessage({code:G.data},'*');
		G.load();
	}
	
	G.noData=function()
	{
		var str=G.url||'';
			str=str.replaceAll('&','&amp;');
			str=str.replaceAll('<','&lt;');
			str=str.replaceAll('>','&gt;');
			str=str.replaceAll('"','&quot;');
			str=str.replaceAll('\'','&apos;');
		
		G.l.innerHTML=`
			<div id="errorWrap">
				<div id="noGameData">
					<b>Woops!</b><br>
					The specified game data<br>
					<small>(`+str+`)</small><br>
					could not be found.<br>
					<a href="./index.html" target="_top">Go back to homepage</a>
				</div>
			</div>
		`;
		G.l.classList.add('on');
	}
	
	if (G.urlVars && G.urlVars.g)
	{
		//load data file
		G.url=decodeURIComponent(G.urlVars.g);
		
		if (G.url.indexOf('/')==0) G.url='./games'+G.url+'.txt';
		else if (!G.local && G.url.indexOf('www.')!=0 && G.url.indexOf('http://')!=0 && G.url.indexOf('https://')!=0) G.url='http://pastebin.com/raw.php?i='+G.url;
		
		console.log('Fetching game at '+G.url+'...');
		G.saveTo=G.url;
		if (TOPARSE) setTimeout(G.dataLoaded,100);
		else if (G.local) LoadScript(G.url,G.dataLoaded,function(){G.noData();});
		else ajax('server.php?q=fetch|'+G.url,G.dataLoaded);
	}
	else G.noData();
	
	
	/*=====================================================================================
	RESET
	=======================================================================================*/
	G.Reset=function()
	{
		//G.Reset is called on save load.
		//Most of the engine's code (perhaps more than necessary) is in here as we want to start as fresh as possible on each data load.
		
		G.T=0;
		G.domReady=false;
		G.playing=false;
		
		G.l.innerHTML=`
			<div id="content"></div>
			<div id="meta-buttons">
				<div class="meta-button" id="meta-button-settings"></div>
				<div class="meta-button" id="meta-button-info"></div>
			</div>
			<div id="shinies" class="shadowed"></div>
			<div id="particles" class="shadowed"></div>
			<div id="toasts" class="shadowed"></div>
			<div id="popups"><div id="darken" class="off"></div></div>
			<div id="tooltip">
				<div id="tooltipPU" class="tooltipPoint"></div>
				<div id="tooltipPD" class="tooltipPoint"></div>
				<div id="tooltipPL" class="tooltipPoint"></div>
				<div id="tooltipPR" class="tooltipPoint"></div>
				<div id="tooltipContent"></div>
			</div>
		`;
		
		
		/*=====================================================================================
		LOG
		=======================================================================================*/
		G.initLog=function()
		{
			G.logL=l('log')||0;
			G.logLin=0;
			G.logs=[];
			G.maxLogs=50;
			if (G.logL)
			{
				G.logLin=l('logInner');
			}
		}
		G.log=function(text,classes)
		{
			if (!G.logL) return false;
			var scrolled=!(Math.abs(G.logL.scrollTop-(G.logL.scrollHeight-G.logL.offsetHeight))<3);
			var me={};
			var str='<div class="messageContent"><div>'+text+'</div></div>';
			me.text=str;
			var div=document.createElement('div');
			div.innerHTML=str;
			div.className='message popInVertical'+(classes?(' '+classes):'');
			me.l=div;
			G.logLin.appendChild(div);
			G.logs.push(me);
			if (G.logs.length>G.maxLogs)
			{
				var el=G.logLin.firstChild;
				for (var i in G.logs)
				{
					if (G.logs[i].l==el)
					{
						G.logs.splice(i,1);
						break;
					}
				}
				G.logLin.removeChild(el);
			}
			if (!scrolled) G.logL.scrollTop=G.logL.scrollHeight-G.logL.offsetHeight;
			G.addCallbacks();
		}
		G.clearLog=function()
		{
			G.logs=[];
			G.logLin.innerHTML='';
		}
		G.initLog();
		
		
		/*=====================================================================================
		PARTICLES
		=======================================================================================*/
		G.particlesL=l('particles');
		G.particlesN=50;
		G.particlesI=0;
		G.particles=[];
		G.particlesReset=function()
		{
			var str='';
			for (var i=0;i<G.particlesN;i++)
			{
				str+='<div id="particle-'+i+'" class="particle"><div id="particleText-'+i+'" class="particleText"></div></div>';
			}
			G.particlesL.innerHTML=str;
			
			for (var i=0;i<G.particlesN;i++)
			{
				G.particles[i]={id:i,low:false,t:-1,x:0,y:0,xd:0,yd:0,l:l('particle-'+i),lt:l('particleText-'+i)};
			}
		}
		G.particlesReset();
		
		G.particleAt=function(el,icon,text)
		{
			if (G.getSetting('particles')==0) return false;
			var me=G.particles[G.particlesI];
			/*var box=el.getBoundingClientRect();
			var x=box.left;
			var y=box.top;
			var w=box.right-x;
			var h=box.bottom-y;
			me.x=x+w*0.2+Math.random()*w*0.6-24;
			me.y=y+h*0.2+Math.random()*h*0.6-24-48;*/
			me.x=G.mouseX-24+(Math.random()*20-10);
			me.y=G.mouseY-24-48+(Math.random()*20-10);
			me.xd=Math.random()*8-4;
			me.yd=-Math.random()*8-4;
			me.r=Math.random()*90-45;
			me.t=0;
			if (text) me.lt.innerHTML=text;
			me.baseCSS='display:block;'+G.resolveIcon(icon,true);
			if (G.getSetting('particles')<3 && (G.currentFps<20 || G.getSetting('particles')==1))
			{
				//if low fps, trigger simple CSS animation instead
				me.low=true;
				me.l.style.cssText=me.baseCSS+'opacity:0;left:'+Math.floor(me.x)+'px;top:'+Math.floor(me.y)+'px;';
				triggerAnim(me.l,'particlePop');
			}
			else {me.low=false;me.l.classList.remove('particlePop');}
			G.particlesI++;
			if (G.particlesI>=G.particlesN) G.particlesI=0;
		}
		G.particlesLogic=function()
		{
			for (var i=0;i<G.particlesN;i++)
			{
				var me=G.particles[i];
				if (!me.low && me.t>=0)
				{
					var r=Math.pow(me.t/20,0.15);
					var r2=Math.pow(me.t/20,5);
					me.l.style.cssText=me.baseCSS+'opacity:'+(1-r2)+';transform:translate('+me.x+'px,'+me.y+'px) rotate('+(me.r*(1-r))+'deg) scale('+(0.5+0.5*r)+','+(1.5-0.5*r)+');transform-origin:50% 100%;';
					me.x+=me.xd;
					me.y+=me.yd;
					me.xd*=0.95;
					me.yd+=1;
					me.yd=Math.min(me.yd,6);
					me.t++;
					if (me.t>20)
					{
						me.t=-1;
						me.l.style.cssText='display:none;';
						me.lt.innerHTML='';
					}
				}
			}
		}
		
		/*=====================================================================================
		POPUPS
		=======================================================================================*/
		G.popupsL=l('popups');
		G.popups=[];
		G.popup=function(el,o)
		{
			//TODO : handle el
			var me={};
			for (var i in o){me[i]=o[i];}
			me.l=document.createElement('div');
			var classes='popup';
			if (me.classes) classes+=' '+me.classes;
			me.l.className=classes;
			me.l.innerHTML=(me.text||'');
			if (me.init) me.init(me);
			var buttonl=document.createElement('div');
			buttonl.innerHTML='x';
			buttonl.className='closeButton closesThePopup';
			me.l.insertBefore(buttonl,me.l.firstChild);
			var closers=me.l.getElementsByClassName('closesThePopup');
			for (var i in closers)
			{AddEvent(closers[i],'click',function(me){return function(){G.closePopup(me);}}(me));}
			G.popupsL.appendChild(me.l);
			G.popups.push(me);
			G.addCallbacks();
			return me;
		}
		G.closePopup=function(me)
		{
			if (!me) var me=G.popups[G.popups.length-1];
			if (me.onClose) me.onClose(me);
			G.popups.splice(G.popups.indexOf(me),1);
			me.l.parentNode.removeChild(me.l);
		}
		G.popupDraw=function()
		{
			var topb=0;
			var bottomb=G.h;
			var leftb=0;
			var rightb=G.w;
			for (var i in G.popups)
			{
				var me=G.popups[i];
				if (me.func) me.func(me);
				me.l.style.left=Math.floor((rightb-leftb)/2-me.l.clientWidth/2)+'px';
				me.l.style.top=Math.floor((bottomb-topb)/2-me.l.clientHeight/2)+'px';
				me.l.style.opacity=1;
			}
		}
		
		/*=====================================================================================
		TOASTS
		=======================================================================================*/
		G.toastsL=l('toasts');
		G.toasts=[];
		G.toast=function(o)
		{
			var me={};
			for (var i in o){me[i]=o[i];}
			me.l=document.createElement('div');
			var classes='toast popInVertical';
			if (me.classes) classes+=' '+me.classes;
			me.l.className=classes;
			me.l.innerHTML=(me.text||'');
			me.t=0;
			me.toDie=0;
			if (me.init) me.init(me);
			var buttonl=document.createElement('div');
			buttonl.innerHTML='x';
			buttonl.className='closeButton closesThePopup';
			me.l.insertBefore(buttonl,me.l.firstChild);
			var closers=me.l.getElementsByClassName('closesThePopup');
			for (var i in closers)
			{AddEvent(closers[i],'click',function(me){return function(){G.closeToast(me);}}(me));}
			G.toastsL.appendChild(me.l);
			G.toasts.push(me);
			G.addCallbacks();
			return me;
		}
		G.closeToast=function(me)
		{
			if (!me) var me=G.toasts[G.toasts.length-1];
			if (me.toDie) return false;
			me.toDie=1;
			me.l.classList.remove('popInVertical');
			me.l.classList.add('popOutVertical');
			if (me.onClose) me.onClose(me);
		}
		G.killToast=function(me)
		{
			if (!me) var me=G.toasts[G.toasts.length-1];
			G.toasts.splice(G.toasts.indexOf(me),1);
			me.l.parentNode.removeChild(me.l);
		}
		G.toastLogic=function()
		{
			for (var i in G.toasts)
			{
				var me=G.toasts[i];
				if (me.toDie)
				{
					me.toDie++;
					if (me.toDie>=G.fps*0.3) G.killToast(me);
				}
				else
				{
					me.t++;
					if (me.dur>0 && me.t>=me.dur*G.fps) G.closeToast(me);
				}
			}
		}
		
		/*=====================================================================================
		TOOLTIP
		=======================================================================================*/
		G.tooltipL=l('tooltip');
		G.tooltipContentL=l('tooltipContent');
		G.tooltipPU=l('tooltipPU');
		G.tooltipPD=l('tooltipPD');
		G.tooltipPL=l('tooltipPL');
		G.tooltipPR=l('tooltipPR');
		G.pseudoHover=new Event('pseudoHover');
		G.tooltipReset=function()
		{
			G.tooltip={
				parent:0,origin:0,classes:'',text:'',on:false,settled:false,t:0,
			};
		}
		G.tooltipReset();
		G.addTooltip=function(el,o)
		{
			AddEvent(el,'mouseover',function(el,o){return function(){
				var settled=(el==G.tooltip.parent);
				G.showTooltip(el,o);
				if (settled) G.tooltip.settled=true;
			}}(el,o));
			AddEvent(el,'pseudoHover',function(el,o){return function(){
				G.showTooltip(el,o);
			}}(el,o));
			AddEvent(el,'mouseout',function(el,o){return function(){
				G.hideTooltip(el);
			}}(el,o));
		}
		G.showTooltip=function(el,o)
		{
			G.tooltipReset();
			var me=G.tooltip;
			me.on=true;
			for (var i in o){me[i]=o[i];}
			me.parent=el;
			if (!me.origin) me.origin='top';
		}
		G.hideTooltip=function(el)
		{
			var prev=G.tooltip.parent;
			if (el==-1) G.tooltipReset();
			else if (!el || el==prev)
			{
				G.tooltipReset();
				if (!prev) G.tooltip.settled=true;
				var underneath=document.elementFromPoint(G.mouseX,G.mouseY);
				if (underneath && prev && underneath!=prev)
				{
					underneath.dispatchEvent(G.pseudoHover);
					G.tooltip.settled=true;
				}
			}
		}
		G.tooltipDraw=function()
		{
			var me=G.tooltip;
			if (me.on)
			{
				if (!me.parent || !document.body.contains(me.parent)) {G.hideTooltip();}
				else
				{
					if (!me.settled)
					{
						if (me.classes) G.tooltipL.className=me.classes;
						if (me.text) G.tooltipContentL.innerHTML=me.text;
						G.tooltipL.style.opacity='0';
						G.tooltipL.style.display='block';
						G.tooltipL.classList.remove('stretchIn');
						G.tooltipL.classList.remove('stretchInV');
					}
					if (me.func && me.t%10==0) G.tooltipContentL.innerHTML=me.func();
					
					var div=me.parent;
					var box=div.getBoundingClientRect();
					
					var topb=0;
					var bottomb=G.h;
					var leftb=0;
					var rightb=G.w;
					var margin=8;
					var tx=G.tooltipL.offsetLeft;
					var ty=G.tooltipL.offsetTop;
					var tw=G.tooltipL.clientWidth;
					var th=G.tooltipL.clientHeight;
					var x=0;
					var y=0;
					var i=0;
					var origin=me.origin;
					
					//try to fit within the screen
					var spins=[];
					if (origin=='top') spins=['top','bottom','right','left'];
					else if (origin=='bottom') spins=['bottom','top','right','left'];
					else if (origin=='left') spins=['left','right','top','bottom'];
					else if (origin=='right') spins=['right','left','top','bottom'];
					
					for (var i=0;i<4;i++)
					{
						var spin=spins[i];
						origin=spin;
						if (spin=='top')
						{
							x=(box.left+box.right)/2;
							y=box.top;
							x=x-tw/2;
							y=y-th-margin;
							x=Math.max(0,Math.min(G.w-tw,x));
						}
						else if (spin=='bottom')
						{
							x=(box.left+box.right)/2;
							y=box.bottom;
							x=x-tw/2;
							y=y+margin;
							x=Math.max(0,Math.min(G.w-tw,x));
						}
						else if (spin=='left')
						{
							x=box.left;
							y=(box.top+box.bottom)/2;
							x=x-tw-margin;
							y=y-th/2;
							y=Math.max(0,Math.min(G.h-th,y));
						}
						else if (spin=='right')
						{
							x=box.right;
							y=(box.top+box.bottom)/2;
							x=x+margin;
							y=y-th/2;
							y=Math.max(0,Math.min(G.h-th,y));
						}
						if (y>=topb && y+th<=bottomb && x>=leftb && x+tw<=rightb) break;
					}
					
					G.tooltipPU.style.display='none';
					G.tooltipPD.style.display='none';
					G.tooltipPL.style.display='none';
					G.tooltipPR.style.display='none';
					if (origin=='top')
					{
						G.tooltipPD.style.display='block';
						G.tooltipPD.style.left=Math.floor((box.left+box.right)/2-x-6)+'px';
						G.tooltipPD.style.bottom=Math.floor(-6)+'px';
					}
					else if (origin=='bottom')
					{
						G.tooltipPU.style.display='block';
						G.tooltipPU.style.left=Math.floor((box.left+box.right)/2-x-6)+'px';
						G.tooltipPU.style.top=Math.floor(-6)+'px';
					}
					else if (origin=='left')
					{
						G.tooltipPR.style.display='block';
						G.tooltipPR.style.right=Math.floor(-6)+'px';
						G.tooltipPR.style.top=Math.floor((box.top+box.bottom)/2-y-6)+'px';
					}
					else if (origin=='right')
					{
						G.tooltipPL.style.display='block';
						G.tooltipPL.style.left=Math.floor(-6)+'px';
						G.tooltipPL.style.top=Math.floor((box.top+box.bottom)/2-y-6)+'px';
					}
					
					if (!me.settled) triggerAnim(G.tooltipL,(origin=='top' || origin=='bottom')?'stretchIn':'stretchInV');
					me.settled=true;
					
					G.tooltipL.style.left=Math.floor(x)+'px';
					G.tooltipL.style.top=Math.floor(y)+'px';
					G.tooltipL.style.opacity='1';
					me.t++;
				}
			}
			else
			{
				if (!me.settled)
				{
					me.settled=true;
					G.tooltipL.classList.remove('stretchIn');
					G.tooltipL.classList.remove('stretchInV');
					G.tooltipL.style.opacity='0';
					triggerAnim(G.tooltipL,'fadeOutQuick');
					//G.tooltipL.style.display='none';
					//G.tooltipL.className='';
				}
			}
		}
		
		/*=====================================================================================
		THINGS
		=======================================================================================*/
		G.thingsN=0;
		G.things=[];//by id
		G.thingsByName=[];//by name id
		G.thingsByTag={};
		G.res=[];//by id
		G.buttons=[];//by id
		G.buildings=[];//by id
		G.upgrades=[];//by id
		G.itemTypes=[];//by id
		G.items=[];//by id
			G.itemsN=0;
		G.achievs=[];//by id
		G.shinies=[];//by id
		G.boxes=[];//by id
		
		G.Thing=function(o)
		{
			if (o.ids) var ids=o.ids.substring(1,o.ids.length).split('|');
			for (var i in ids)
			{
				ids[i]=G.makeSafe(ids[i]);
			}
			this.key='-';
			if (ids) this.key=ids[0];
			if (ids) this.name=ids[0]; else this.name='???';
			
			this.tags=0;
			this.classes='';
			this.show=1;
			this.lit=0;
			this.alwaysHidden=0;//overrides .show
			
			this.refreshText=true;//if true, change the text during Draw
			this.toRefresh=1;//if 1, update visibility
			
			if (G.baseThing)
			{
				for (var i in G.baseThing)
				{
					if (i=='effects')
					{
						if (!this[i]) this[i]={};
						for (var ii in G.baseThing[i])
						{
							if (!this[i][ii]) this[i][ii]=[];
							this[i][ii]=G.baseThing[i][ii];
						}
					}
					else this[i]=G.baseThing[i];
				}
			}
			for (var i in o)
			{
				if (i=='effects')
				{
					if (!this[i]) this[i]={};
					for (var ii in o[i])
					{
						if (!this[i][ii]) this[i][ii]=[];
						this[i][ii]=this[i][ii].concat(o[i][ii]);
					}
				}
				else if (Array.isArray(o[i]) && this[i]) this[i]=this[i].concat(o[i]);
				else this[i]=o[i];
			}
			if (!this.plural) this.plural=this.name;
			if (this.type=='item') this.id='ITEM'+G.itemsN;
			else this.id=G.thingsN;
			this.ids=[];
			if (ids) this.ids=ids;
			if (this.tags) this.tags=this.tags.split(' '); else this.tags=[];
			for (var i in this.tags)
			{
				this.tags[i]=G.makeSafe(this.tags[i]);
				if (!G.thingsByTag[this.tags[i]]) G.thingsByTag[this.tags[i]]=[];
				G.thingsByTag[this.tags[i]].push(this);
			}
			
			if (this.type=='res') G.res.push(this);
			else if (this.type=='button') G.buttons.push(this);
			else if (this.type=='building') G.buildings.push(this);
			else if (this.type=='upgrade') G.upgrades.push(this);
			else if (this.type=='itemType') G.itemTypes.push(this);
			else if (this.type=='item') G.items.push(this);
			else if (this.type=='achiev') G.achievs.push(this);
			else if (this.type=='shiny') G.shinies.push(this);
			else if (this.type=='box') G.boxes.push(this);
			else {G.parseError('The type "'+this.type+'" is not recognized.');return {type:0};}
			
			if (this.type!='item' && this.type!='box') G.things.push(this);
			if (ids) {for (var i in ids){G.thingsByName[ids[i]]=this;}}
			//console.log(this);
			if (this.type=='item') G.itemsN++; else if (this.type!='box') G.thingsN++;
			return this;
		}
		G.createThing=function(thing)
		{
			if (thing)
			{
				if (thing.ids=='*TEMPLATE') {G.baseThing=thing;}
				else new G.Thing(thing);
			}
		}
		G.copyEffects=function(effects)
		{
			//returns new effects by type cloned from the original; this lets us do have a Thing using the same effects as another
			var out={};
			for (var effectType in effects)
			{
				out[effectType]=[];
				for (var i in effects[effectType])
				{
					var eff={};
					for (var ii in effects[effectType][i])
					{
						eff[ii]=effects[effectType][i][ii];
					}
					if (eff.type=='if')
					{
						eff.effs=G.copyEffects(eff.effs);
					}
					out[effectType].push(eff);
				}
			}
			return out;
		}
		
		G.shiniesE=[];
		G.shiniesL=l('shinies');
		G.shiniesN=0;
		G.spawnShiny=function(type)
		{
			var fail=false;
			var me={
				type:type,
				x:0,
				y:0,
				t:0,
				tm:Math.max(0,G.fps*type.dur*type.durMult),
			};
			me.l=document.createElement('div');
			var moves=me.type.moves;
			if ('anywhere' in moves)
			{
				me.x=Math.random()*G.w;
				me.y=Math.random()*(G.h);
			}
			else if ('onRight' in moves)
			{
				me.x=G.w;
				me.y=Math.random()*(G.h);
			}
			else if ('onLeft' in moves)
			{
				me.x=0;
				me.y=Math.random()*(G.h);
			}
			else if ('onBottom' in moves)
			{
				me.x=Math.random()*G.w;
				me.y=(G.h);
			}
			else if ('onTop' in moves)
			{
				me.x=Math.random()*G.w;
				me.y=0;
			}
			else if ('onMouse' in moves)
			{
				me.x=G.mouseX;
				me.y=G.mouseY;
			}
			else if ('onThing' in moves || 'onBox' in moves)
			{
				if ('onThing' in moves) var it=moves['onThing'];
				else var it=moves['onBox'];
				if (it && it.l)
				{
					var box=it.l.getBoundingClientRect();
					me.x=box.left+Math.random()*(box.right-box.left);
					me.y=box.top+Math.random()*(box.bottom-box.top);
				}
				else fail=true;
			}
			
			me.a=0;
			if ('randomAngle' in moves)
			{
				me.a=Math.random()*360;
			}
			me.d=0;
			if ('moveRandom' in moves)
			{
				me.d=Math.random();
			}
			
			if (fail) return false;
			
			var classes='thing shiny';
			if (me.type.classes) classes+=' '+me.type.classes;
			if (!me.type.noClick)
			{
				AddEvent(me.l,'click',function(me){return function(){
					if (me.t<me.tm) {me.type.click();me.t=me.tm;}
				}}(me));
			}
			var str='';
			if (!me.type.icon) classes+=' noIcon';
			else
			{
				var icon=G.resolveIcon(me.type.icon);
				str+='<div class="thing-icon shiny-icon" style="'+icon+'"></div>';
			}
			if (me.type.noText || !me.type.customName) classes+=' noText';
			else str+='<div class="thing-text shiny-text">'+me.type.name+'</div>';
			me.l.innerHTML=str;
			me.l.className=classes;
			G.shiniesL.appendChild(me.l);
			me.offx=-me.l.clientWidth/2;
			me.offy=-me.l.clientHeight/2;
			me.id=G.shiniesN;
			G.shiniesN++;
			G.shiniesE.push(me);
		}
		G.shiniesLogic=function()
		{
			var shinies=[];
			for (var i in G.shiniesE)
			{
				var me=G.shiniesE[i];
				me.t++;
				if (me.t>=me.tm)
				{
					me.l.parentNode.removeChild(me.l);
				}
				else shinies.push(me);
			}
			G.shiniesE=shinies;
		}
		G.shiniesDraw=function()
		{
			for (var i in G.shiniesE)
			{
				var me=G.shiniesE[i];
				var moves=me.type.moves;
				var r=me.t/me.tm;
				var x=me.x;
				var y=me.y;
				var o=1;
				var a=me.a;
				var s=1;
				if ('fade' in moves)
				{
					if (r<0.15) o=r/0.15;
					else if (r<0.85) o=1;
					else o=1-(r-0.85)/0.15;
				}
				if ('grow' in moves) s*=r;
				else if ('shrink' in moves) s*=1-r;
				else if ('growShrink' in moves) s*=Math.sqrt(1-(1-r*2)*(1-r*2));
				if ('wiggle' in moves)
				{
					a+=Math.sin(me.t*(moves['wiggle']||0.25)+me.id)*18;
				}
				if ('spinCW' in moves) a+=me.t*(moves['spinCW']||1);
				else if ('spinCCW' in moves) a-=me.t*(moves['spinCCW']||1);
				else if ('spinRandom' in moves) a+=me.t*(me.id%2==0?1:-1)*(moves['spinRandom']||1);
				if ('pulse' in moves)
				{
					s*=1+0.05*Math.sin(me.t*(moves['pulse']||0.35)+me.id);
				}
				if ('followMouse' in moves)
				{
					x=G.mouseX;
					y=G.mouseY;
				}
				else if ('followMouseSlow' in moves)
				{
					x+=(G.mouseX-x)*(moves['followMouseSlow']||0.1);
					y+=((G.mouseY)-y)*(moves['followMouseSlow']||0.1);
					me.x=x;
					me.y=y;
				}
				else if ('moveRandom' in moves)
				{
					x+=Math.sin(me.d*Math.PI*2)*(moves['moveRandom']||3);
					y+=Math.cos(me.d*Math.PI*2)*(moves['moveRandom']||3);
					me.x=x;
					me.y=y;
				}
				else if ('moveLeft' in moves) x=moves['moveLeft']||(me.x*(1-r));
				else if ('moveRight' in moves) x=moves['moveRight']||(me.x+(G.w-me.x)*(r));
				else if ('moveTop' in moves) y=moves['moveTop']||(me.y*(1-r));
				else if ('moveBottom' in moves) y=moves['moveBottom']||(me.y+(G.h-me.y)*(r));
				if ('bobVertical' in moves)
				{
					y+=Math.sin(me.t*(moves['bobVertical']||0.2)+me.id)*8;
				}
				if ('bobHorizontal' in moves)
				{
					x+=Math.cos(me.t*(moves['bobHorizontal']||0.2)+me.id)*8;
				}
				var sx=s;
				var sy=s;
				if ('bounce' in moves)
				{
					var bounce=me.t*(moves['bounce']||0.05)+me.id;
					y-=Math.abs(Math.cos(bounce)*128)-64;
					/*sx=1+Math.sin(bounce*2+0.3*(Math.PI*2))*0.2;
					sy=1+Math.sin(bounce*2-0.2*(Math.PI*2))*0.2;
					a+=Math.sin(bounce*2-0.15*(Math.PI*2))*18+12;*/
				}
				x+=me.offx;
				y+=me.offy;
				me.l.style.transform='translate('+(x)+'px,'+(y)+'px) rotate('+(a)+'deg) scale('+(sx)+','+(sy)+')';
				me.l.style.opacity=o;
			}
		}
		
		G.A=0;
		
		G.itemsMax=100;//how many items can be owned maximum
		G.itemsTotal=0;//how many items we currently have
		G.gainItem=function(thing,o)
		{
			if (G.itemsTotal>=G.itemsMax) return false;
			if (thing && thing.type=='itemType')
			{
				var inherit=['name','classes','costs','effects'];
				var data={type:'item',base:thing};
				for (var i in inherit)
				{
					data[inherit[i]]=thing[inherit[i]];
				}
				data.effects=G.copyEffects(data.effects);
				for (var i in o)
				{
					data[i]=o[i];
				}
				var item=new G.Thing(data);
				item.tags=thing.tags;
				if (G.domReady) item.createDom();
				G.itemsTotal++;
				return item;
			}
			else console.log('Couldn\'t create the item : ',thing,o||'no extra parameters');
			return false;
		}
		G.loseItem=function(thing)
		{
			if (thing && thing.type=='itemType')
			{
				var ret=false;
				for (var i in G.items)
				{
					var item=G.items[i];
					if (item.base==thing && !item.removed)
					{
						item.remove();
						ret=item;
						break;
					}
				}
				return ret;
			}
			else if (thing && thing.type=='item')
			{
				thing.remove();
				return thing;
			}
			else console.log('Couldn\'t lose the item : ',thing);
			return false;
		}
		G.Thing.prototype.remove=function()
		{
			if (this.type=='item' && !this.removed)
			{
				this.removed=true;
				this.doEffects('undo grants');
				if (G.domReady) this.removeDom();
				G.itemsTotal--;
				G.itemsToRefresh=true;
			}
		}
		G.itemsToRefresh=true;
		G.refreshItems=function()
		{
			G.itemsToRefresh=false;
			var arr=[];
			for (var i in G.items)
			{
				var me=G.items[i];
				if (!me.removed)
				{
					arr.push(me);
				}
				else
				{
					if (G.things.indexOf(me)!=-1) G.things.splice(G.things.indexOf(me),1);
				}
			}
			G.items=arr;
		}
		
		G.Thing.prototype.tooltip=function()
		{
			var me=this;
			var str='';
			if (!me.noBuy && me.costs.length>0)//me.type=='res' || me.type=='building')
			{
				str+='<div class="costs">'+G.getCostsStr(me.getCosts())+'</div>';
			}
			if (me.icon) str+='<div class="thing-icon" style="'+G.resolveIcon(me.icon,true)+'"></div>';
			if (me.name) str+='<div class="title">'+me.name+'</div>';
			if ((me.type=='upgrade' || me.type=='achiev') && me.owned) str+='<div class="subtitle">(owned)</div>';
			if (me.type=='res' || me.type=='building') str+='<div class="subtitle">(amount : '+B(me.amount)+')</div>';
			if (me.showEarned) str+='<div class="subtitle">(total earned : '+B(me.earned)+')</div>';
			if (me.showMax) str+='<div class="subtitle">(max : '+B(me.maxAmount)+')</div>';
			if (me.showClicks) str+='<div class="subtitle">(clicks : '+B(me.clicks)+')</div>';
			if (me.desc) str+='<div class="desc"><div>'+G.getTextValue(me.desc,me)+'</div></div>';
			return str;
		}
		
		G.Thing.prototype.updateDisplayed=function()
		{
			var me=this;
			var hide=false;
			if (me.alwaysHidden || !me.show) hide=true;
			else
			{
				if (me.hiddenWhen0)
				{
					if ((me.type=='building' || me.type=='res') && me.amount<=0) hide=true;
					else if ((me.type=='upgrade' || me.type=='achiev') && me.owned<=0) hide=true;
				}
				if (!hide && me.reqFunc)
				{
					if ((me.type=='building' || me.type=='res') && !me.checkReqs()) hide=true;
					else if ((me.type=='upgrade' || me.type=='achiev') && me.owned<=0 && !me.checkReqs()) hide=true;
				}
			}
			me.displayed=hide?0:1;
		}
		
		G.Thing.prototype.createDom=function()
		{
			var me=this;
			if (!me.alwaysHidden && me.type!='itemType')
			{
				//select which box we should put this in; first by tag, then by type
				var box=0;
				var category=0;
				for (var i in me.tags)
				{
					if (G.thingPlacement[me.tags[i]]) {category=me.tags[i];box=G.thingPlacement[category];break;}
				}
				if (!box)
				{
					if (me.type=='res') category='Resources';
					else if (me.type=='button') category='Buttons';
					else if (me.type=='building') category='Buildings';
					else if (me.type=='upgrade') category='Upgrades';
					else if (me.type=='achiev') category='Achievements';
					else if (me.type=='item') category='Items';
					if (category && G.thingPlacement[category])
					{
						box=G.thingPlacement[category];
					}
				}
				if (box && box.type && box.type=='box')
				{
					me.box=box;
					var classes='thing '+me.type;
					if (me.classes) classes+=' '+me.classes;
					if (false && me.show) classes+=' visible'; else classes+=' hidden';
					if (me.lit) classes+=' lit'; else classes+=' dim';
					if (!me.icon) classes+=' noIcon';
					if (me.noText) classes+=' noText';
					if (me.tags) classes+=' tag-'+me.tags.join(' tag-');
					var iconClasses='thing-icon';
					if (me.iconClasses) iconClasses+=' '+me.iconClasses;
					var icon=G.resolveIcon(me.icon);
					var div=me.box.childrenl[category];
					var str='';
					str+='<div id="thing-'+me.id+'" class="'+classes+'">';
					if (me.box.showIcons && me.icon) str+='<div id="thing-icon-'+me.id+'" class="'+iconClasses+'" style="'+icon+'"></div>';
					if (me.text && !me.noText) str+='<div id="thing-text-'+me.id+'" class="thing-text">'+G.getTextValue(me.text,me)+'</div>';
					else if ((me.box.showNames && !me.noText) || !me.icon) str+='<div id="thing-text-'+me.id+'" class="thing-text">'+me.name+'</div>';
					if (me.box.showCosts && !me.noBuy && me.costs.length>0 && !me.noText) str+='<div id="thing-costs-'+me.id+'" class="thing-costs"></div>';
					str+='</div>';
					div.appendChild(document.createRange().createContextualFragment(str));
					
					me.l=l('thing-'+me.id)||0;
					me.iconl=l('thing-icon-'+me.id)||0;
					me.textl=l('thing-text-'+me.id)||0;
					me.costsl=l('thing-costs-'+me.id)||0;
					if (me.l)
					{
						AddEvent(me.l,'click',function(me){return function(){me.click();}}(me));
						if (me.tooltip && !me.noTooltip && !me.box.noTooltip)
						{
							var obj={func:function(me){return function(){return me.tooltip();}}(me)};
							if (me.tooltipOrigin) obj.origin=me.tooltipOrigin;
							else if (me.box.tooltipOrigin) obj.origin=me.box.tooltipOrigin;
							if (me.tooltipClasses) obj.classes=me.tooltipClasses;
							else if (me.box.tooltipClasses) obj.classes=me.box.tooltipClasses;
							G.addTooltip(me.l,obj);
						}
					}
				}
			}
		}
		G.Thing.prototype.getQuickDom=function(id)
		{
			//returns simplified non-gameplay DOM with no bindings save for tooltip, such as something you'd see in the stats page
			var me=this;
			var classes='thing '+me.type;
			if (me.classes) classes+=' '+me.classes;
			if (!me.icon) classes+=' noIcon';
			if (me.noText) classes+=' noText';
			if (me.tags) classes+=' tag-'+me.tags.join(' tag-');
			var iconClasses='thing-icon';
			if (me.iconClasses) iconClasses+=' '+me.iconClasses;
			var icon=G.resolveIcon(me.icon);
			var str='';
			str+='<div '+(id?'id="'+id+'" ':'')+'class="'+classes+'">';
			str+='<div class="'+iconClasses+'" style="'+icon+'"></div>';
			if (!me.icon) str+='<div class="thing-text">'+me.name+'</div>';
			str+='</div>';
			if (me.tooltip && !me.noTooltip)
			{
				var obj={func:function(me){return function(){return me.tooltip();}}(me)};
				if (me.tooltipClasses) obj.classes=me.tooltipClasses;
				str=G.tooltipped(str,obj,'display:inline-block;');
			}
			
			return str;
		}
		G.Thing.prototype.removeDom=function()
		{
			if (G.tooltip.parent==this.l) G.hideTooltip();
			this.l.parentNode.removeChild(this.l);
			delete this.l;
			delete this.iconl;
			delete this.textl;
			delete this.costsl;
		}
		
		G.Thing.prototype.getCosts=function(amount)
		{
			//also see : G.getCostsStr, G.spendCosts
			var costs=this.costs;
			var costsByThing={};
			var amount=typeof amount==='undefined'?1:amount;
			var mult=1;
			var refund=false;
			if (amount<0) refund=true;
			if (refund) amount=Math.min(this.amount,Math.abs(amount));
			if (this.type=='building' && refund) mult*=this.refundRate;
			var add=this.costAdd;
			mult*=this.costMult;
			if (refund) mult*=this.refundMult;
			for (var n=0;n<amount;n++)
			{
				for (var i in costs)
				{
					for (var ii in costs[i])
					{
						var me=costs[i][ii];
						var w=me.w;
						if (!costsByThing[w.id]) costsByThing[w.id]=0;
						if (refund && this.type=='building' && this.amount==0){}
						else
						{
							var v=(me.v);
							if (this.type=='building') v=(me.v*Math.pow(this.costRate,Math.max(0,this.amount+(refund?-n:n))));
							v+=add;
							v+=w.costAdd;
							if (this.costAddFor[w.id]) v+=this.costAddFor[w.id];
							v*=mult;
							v*=w.costMult;
							if (refund) v*=w.refundMult;
							if (this.costMultFor[w.id]) v*=this.costMultFor[w.id];
							if (refund && this.refundMultFor[w.id]) v*=this.refundMultFor[w.id];
							costsByThing[w.id]+=v;
						}
					}
				}
			}
			return costsByThing;
		}
		
		G.Thing.prototype.checkReqs=function()
		{
			if (this.reqFunc && this.reqFunc()) return true;
			else return false;
		}
		
		G.Thing.prototype.logic=function()
		{
			//every logic tick
			if (true)
			{
				var me=this;
				if (me.type=='res')
				{
					if (me.amountD!=me.amount) me.refreshText=true;
					if (Math.abs(me.amount-me.amountD)<0.01) {me.amountD=me.amount;}
					else {me.amountD+=(me.amount-me.amountD)*(Math.abs(me.amount-me.amountD)<10?0.5:0.1);}
				}
				else if (me.type=='shiny')
				{
					if (me.freq>0)
					{
						if (me.timeLeft>0)
						{
							me.timeLeft--;
							if (me.timeLeft==0)
							{
								G.spawnShiny(me);
								me.timeLeft=-1;
							}
						}
						if (me.timeLeft==-1)//init time
						{
							me.timeLeft=Math.ceil(Math.max(0,(me.freq+Math.random()*me.freqV)*me.freqMult)*G.fps);
						}
					}
				}
			}
		}
		
		G.Thing.prototype.draw=function()
		{
			//every draw tick
			var me=this;
			if (me.l && !me.alwaysHidden)
			{
				if (me.toRefresh)
				{
					if (me.toRefresh!=2) me.updateDisplayed();
					if (!me.displayed)
					{
						if (G.tooltip.parent==me.l) G.hideTooltip(-1);
						me.l.classList.add('hidden');
						me.l.classList.remove('visible');
					}
					else
					{
						me.l.classList.add('visible');
						me.l.classList.remove('hidden');
						
						var lit=me.lit;
						if (lit)
						{
							this.l.classList.add('lit');
							this.l.classList.remove('dim');
						}
						else
						{
							this.l.classList.add('dim');
							this.l.classList.remove('lit');
						}
					}
				}
				if (me.text && (me.toRefresh || G.drawT%10==0))
				{
					me.textl.innerHTML=G.getTextValue(me.text,me);
				}
				me.toRefresh=0;
				if (me.displayed)
				{
					if (me.text)
					{
					}
					else if (me.refreshText)
					{
						me.refreshText=false;
						if (me.type=='res')
						{
							var str=me.plural+' : ';
							str+=B(Math.floor(me.amountD));
							if (me.box.showPs)
							{
								var ps=me.ps;
								if (ps>0) str+=' (+'+B(ps,1)+'/s)';
								else if (ps<0) str+=' ('+B(ps,1)+'/s)';
								//else str+=' (0/s)';
							}
							me.textl.innerHTML=str;
						}
						else if (me.type=='building')
						{
							var str=me.plural+' : ';
							str+=B(me.amount);
							me.textl.innerHTML=str;
						}
					}
					if (me.type=='res')
					{
						if (me.ps>0) me.l.classList.add('earning');
						else me.l.classList.remove('earning');
						if (me.ps<0) me.l.classList.add('losing');
						else me.l.classList.remove('losing');
					}
					if (G.drawT%10==0)
					{
						var owned=0;
						if (me.owned && (me.type=='upgrade' || me.type=='achiev')) owned=1;
						else if (me.amount>0 && (me.type=='res' || me.type=='building')) owned=1;
						if (me.costs.length>0)
						{
							var amount=1;
							if (me.type=='building') {amount=G.bulk;}
							var costs=G.getCostsStr(me.getCosts(amount),(me.type=='upgrade'?(owned>0):0),true);
							if (!me.noText && me.costsl) me.costsl.innerHTML=costs.str;
							if (costs.lacking>0 && (!owned || me.type=='building')) me.l.classList.add('cantAfford');
							else me.l.classList.remove('cantAfford');
						}
						me.updateOwned(owned>0);
					}
				}
			}
		}
		
		G.bulk=1;//how much of buildings we buy at once (or sell, if negative)
		
		G.Thing.prototype.click=function()
		{
			if (true)
			{
				var win=false;
				var out=0;
				if (this.type=='button' || this.type=='shiny')
				{
					this.clicks++;
					win=true;
				}
				if (this.type=='building' && !this.noBuy)
				{
					var amount=G.bulk;
					if (amount<0)//selling
					{
						amount=Math.max(-this.amount,amount);
						if (this.amount+amount>=0) out=G.refundCosts(this.getCosts(amount));
					}
					else if (!this.limit || this.limit()>=this.amount+amount)//buying
					{
						out=G.spendCosts(this.getCosts(amount));
					}
					if (out)
					{
						this.doEffects('undo grants');
						this.earn(amount);
						win=true;
					}
				}
				else if (this.type=='upgrade' && !this.owned && !this.noBuy)
				{
					out=G.spendCosts(this.getCosts());
					if (out)
					{
						this.doEffects('undo grants');
						this.earn(1);
						win=true;
					}
				}
				
				var out2=this.doEffects('click',true);
				if (out2.produced && out.produced)
				{
					for (var i in out2.produced)
					{
						if (!out.produced[i]) out.produced[i]=0;
						out.produced[i]+=out2.produced[i];
					}
				}
				else out=out2;
				
				if (win && this.l)
				{
					if (this.type=='button') G.hideTooltip();
					if (out && !G.noParticles)
					{
						for (var i in out.produced)
						{G.particleAt(this.l,G.things[i].icon,(G.things[i].icon?'':(G.things[i].name))+(out.produced[i]>0?'+':'')+B(out.produced[i]));}
					}
				}
			}
		}
		
		G.Thing.prototype.updateOwned=function(val)
		{
			if (val) {this.l.classList.add('owned');this.l.classList.remove('notOwned');}
			else {this.l.classList.add('notOwned');this.l.classList.remove('owned');}
		}
		G.Thing.prototype.set=function(v)
		{
			var w=this;
			if (w.type=='res' || w.type=='building')
			{
				if (w.type=='building') v=Math.round(v);
				w.amount=v;
				if (w.type=='res' && v>0) w.earned=Math.max(v,w.earned);
				if (!w.canBeNegative) w.amount=Math.max(0,w.amount);
				w.maxAmount=Math.max(w.amount,w.maxAmount);
				this.updateOwned(this.amount>0);
				this.refreshText=true;
			}
			else if (w.type=='upgrade' || w.type=='achiev')
			{
				var v2=v?1:0;
				if (w.owned!=v2 && w.l)
				{
					w.updateOwned(v2>0);
				}
				w.owned=v2;
			}
		}
		G.Thing.prototype.earn=function(v)
		{
			var w=this;
			if (w.type=='res' || w.type=='building')
			{
				if (w.type=='building') v=Math.round(v);
				var old=w.amount;
				w.amount+=v;
				if (w.type=='res' && v>0) w.earned+=v;
				if (!w.canBeNegative) w.amount=Math.max(0,w.amount);
				if (w.amount-old>0) w.doEffects('earn');
				else if (w.amount-old<0) w.doEffects('lose');
				w.maxAmount=Math.max(w.amount,w.maxAmount);
				if (w.l)
				{
					w.updateOwned(w.amount>0);
				}
				w.refreshText=true;
			}
			else if (w.type=='upgrade' || w.type=='achiev')
			{
				var v2=v?1:0;
				if (w.owned!=v2 && w.l)
				{
					w.updateOwned(v2>0);
				}
				w.owned=v2;
				if (w.owned) w.doEffects('earn');
				else w.doEffects('lose');
				
				if (w.owned && w.type=='achiev')
				{
					var str='';
					if (w.icon) str+='<div class="thing-icon" style="'+G.resolveIcon(w.icon,true)+'"></div>';
					if (w.name) str+='Got achievement :<div class="title">'+w.name+'</div>'; else str+='Got achievement!';
					G.toast({text:str,dur:10});
				}
			}
		}
		G.Thing.prototype.grant=function(v)
		{
			var w=this;
			if (w.type=='res' || w.type=='building')
			{
				if (w.type=='building') v=Math.round(v);
				w.amount+=v;
				if (w.type=='res' && v>0) w.earned=Math.max(w.earned,w.amount);
				if (!w.canBeNegative) w.amount=Math.max(0,w.amount);
				w.maxAmount=Math.max(w.amount,w.maxAmount);
				if (w.l)
				{
					w.updateOwned(w.amount>0);
				}
				w.refreshText=true;
			}
		}
		G.Thing.prototype.light=function()
		{
			if (this.lit || this.alwaysHidden) return false;
			this.lit=1;
			this.toRefresh=1;
		}
		G.Thing.prototype.dim=function()
		{
			if (!this.lit || this.alwaysHidden) return false;
			this.lit=0;
			this.toRefresh=1;
		}
		G.Thing.prototype.display=function()
		{
			if (this.show || this.alwaysHidden) return false;
			this.show=1;
			this.toRefresh=1;
		}
		G.Thing.prototype.hide=function()
		{
			if (!this.show || this.alwaysHidden) return false;
			this.show=0;
			this.toRefresh=1;
		}
		
		G.doEffectsForAll=function(type)
		{
			var things=[];
			for (var i in G.things)
			{
				var me=G.things[i];
				if (me.type=='button' || me.type=='res' || (me.type=='building' && me.amount>0) || (me.type=='upgrade' && me.owned) || (me.type=='achiev' && me.owned)) things.push(me);
			}
			for (var i in G.items)
			{things.push(G.items[i]);}
		
			for (var i in things)
			{
				var me=things[i];
				me.doEffects(type);
			}
		}
		
		/*=====================================================================================
		TICK
		=======================================================================================*/
		G.tick=function()
		{
			//every second :
			
			var things=[];
			for (var i in G.things)
			{
				var me=G.things[i];
				if (me.type=='button' || me.type=='res' || (me.type=='building' && me.amount>0) || (me.type=='upgrade' && me.owned) || (me.type=='achiev' && me.owned)) things.push(me);
			}
			for (var i in G.items)
			{things.push(G.items[i]);}
			
			//reset boosts and production
			for (var i in G.things)
			{
				var me=G.things[i];
				me.ps=0;
				me.boostAdd=0;
				me.boostMult=1;
				me.boostAddFor=[];
				me.boostMultFor=[];
				me.costAdd=0;
				me.costMult=1;
				me.refundMult=1;
				me.costAddFor=[];
				me.costMultFor=[];
				me.refundMultFor=[];
				if (me.type=='shiny')
				{
					me.durMult=1;
					me.freqMult=1;
				}
			}
			
			//cache boosts
			for (var i in things)
			{
				var me=things[i];
				me.doEffects('cache boosts');
			}
			
			//apply grants
			for (var i in things)
			{
				var me=things[i];
				me.doEffects('do grants');
			}
			
			//cache production
			for (var i in things)
			{
				var me=things[i];
				me.doEffects('cache ps');
			}
			
			//tick
			for (var i in things)
			{
				var me=things[i];
				me.doEffects('tick');
			}
			
			//apply production
			for (var i in things)
			{
				var me=things[i];
				if (me.type=='res' || me.type=='building')
				{
					if (me.ps!=0)
					{
						me.earn(me.ps);
					}
				}
			}
			
			for (var i in G.things)
			{
				var me=G.things[i];
				if (me.isAlways) me.amount=me.isAlways();
				if (me.limit) me.amount=Math.min(me.limit(),me.amount);
				if (me.type=='achiev' && !me.owned)
				{
					if (me.checkReqs())
					{
						me.earn(1);
					}
				}
				var old=me.displayed||0;
				me.updateDisplayed();
				if (me.displayed!=old) me.toRefresh=2;//triggers a refresh without re-running updateDisplayed()
			}
		}
		
		/*=====================================================================================
		EFFECTS
		=======================================================================================*/
		G.effectNestLevel=0;
		G.localVars=[];
		G.doEffect=function(effect,owner,context,amount,out)
		{
			G.effectNestLevel++;
			if (G.effectNestLevel>10) {G.effectNestLevel--;return false;}//possible endless loop
			var me=effect;
			var type=me.type;
			if (me.w)
			{
				var w=me.w;
				if (w==='this') w=owner;
				else if (w[0]==='this') w=[owner];
			}
			if (type=='if' || type=='else')
			{
				var pass=false;
				if (me.cond && context!='undo grants')//when undoing grants, disregard conditions
				{
					var amount2=0;
					if (!owner) amount2=0;
					else
					{
						if (owner.type=='building' || owner.type=='res') amount2=owner.amount;
						else if (owner.type=='upgrade' || owner.type=='achiev') amount2=(owner.owned?1:0);
						else if (owner.type=='button' || owner.type=='shiny') amount2=owner.clicks;
					}
					if (me.cond(owner,amount2)) pass=true;
				}
				else pass=true;
				
				if (pass)
				{
					for (var i in me.effs)
					{
						G.doEffect(me.effs[i],owner,context,amount,out);
					}
				}
				else if (me.or)
				{
					for (var i in me.or)
					{
						G.doEffect(me.or[i],owner,context,amount,out);
					}
				}
			}
			else if (type=='grant' && context=='do grants' && !me.done)
			{
				me.done=true;
				w.grant(amount*G.getVarValue(me.v,owner));
			}
			else if (type=='grant' && context=='undo grants' && me.done)
			{
				me.done=false;
				w.grant(-amount*G.getVarValue(me.v,owner));
			}
			else if (context=='do grants' || context=='undo grants') {}
			else if (context=='cache boosts')
			{
				if (type=='increase yield' || type=='lower yield')
				{
					var w=G.getThings(me.w,owner);
					var gain=amount*G.getVarValue(me.v,owner);
					if (type=='lower yield') gain*=-1;
					for (var i=0;i<w.length;i++)
					{
						w[i].boostAdd+=gain;
					}
				}
				else if (type=='multiply yield')
				{
					var w=G.getThings(me.w,owner);
					var gain=amount*G.getVarValue(me.v,owner);
					for (var i=0;i<w.length;i++)
					{
						w[i].boostMult*=gain;
					}
				}
				else if (type=='increase yield for' || type=='lower yield for')
				{
					var w=G.getThings(me.w,owner);
					var z=G.getThings(me.z,owner);
					var gain=amount*G.getVarValue(me.v,owner);
					if (type=='lower yield for') gain*=-1;
					for (var i=0;i<w.length;i++)
					{
						for (var ii=0;ii<z.length;ii++)
						{
							if (!w[i].boostAddFor[z[ii].id]) w[i].boostAddFor[z[ii].id]=0;
							w[i].boostAddFor[z[ii].id]+=gain;
						}
					}
				}
				else if (type=='multiply yield for')
				{
					var w=G.getThings(me.w,owner);
					var z=G.getThings(me.z,owner);
					var gain=amount*G.getVarValue(me.v,owner);
					for (var i=0;i<w.length;i++)
					{
						for (var ii=0;ii<z.length;ii++)
						{
							if (!w[i].boostMultFor[z[ii].id]) w[i].boostMultFor[z[ii].id]=1;
							w[i].boostMultFor[z[ii].id]*=gain;
						}
					}
				}
				else if (type=='increase cost' || type=='lower cost')
				{
					var w=G.getThings(me.w,owner);
					var gain=amount*G.getVarValue(me.v,owner);
					if (type=='lower cost') gain*=-1;
					for (var i=0;i<w.length;i++)
					{
						w[i].costAdd+=gain;
					}
				}
				else if (type=='multiply cost')
				{
					var w=G.getThings(me.w,owner);
					var gain=amount*G.getVarValue(me.v,owner);
					for (var i=0;i<w.length;i++)
					{
						w[i].costMult*=gain;
					}
				}
				else if (type=='multiply refund')
				{
					var w=G.getThings(me.w,owner);
					var gain=amount*G.getVarValue(me.v,owner);
					for (var i=0;i<w.length;i++)
					{
						w[i].refundMult*=gain;
					}
				}
				else if (type=='multiply duration')
				{
					var w=G.getThings(me.w,owner);
					var gain=amount*G.getVarValue(me.v,owner);
					for (var i=0;i<w.length;i++)
					{
						if (w[i].type=='shiny') w[i].durMult*=gain;
					}
				}
				else if (type=='multiply frequency')
				{
					var w=G.getThings(me.w,owner);
					var gain=amount*G.getVarValue(me.v,owner);
					for (var i=0;i<w.length;i++)
					{
						if (w[i].type=='shiny') w[i].freqMult*=gain;
					}
				}
			}
			else if (context=='cache ps')
			{
				if (type=='yield' || type=='lose')
				{
					var w=G.getThings(me.w,owner);
					var v=amount;
					if (me.v) v*=G.getVarValue(me.v,owner);
					if (owner.type=='item') owner=owner.base;
					for (var i=0;i<w.length;i++)
					{
						var w2=w[i];
						if (w2.type=='res' || w2.type=='building')
						{
							if (type=='lose') v=-v;
							else if (w.type!='building')
							{
								v+=w2.boostAdd;
								v*=w2.boostMult;
								
								v+=owner.boostAdd;
								v*=owner.boostMult;
								
								if (owner.boostAddFor[w2.id]) v+=owner.boostAddFor[w2.id];
								if (owner.boostMultFor[w2.id]) v*=owner.boostMultFor[w2.id];
							}
							w2.ps+=v;
						}
					}
				}
			}
			else//on tick, on click, others
			{
				if (type=='set')
				{
					var w=G.getThings(me.w,owner);
					var v=G.getVarValue(me.v,owner);
					for (var i=0;i<w.length;i++)
					{
						if (w[i].type=='res' || w[i].type=='building') w[i].set(v);
					}
				}
				else if (type=='set var')
				{
					var w=me.w;
					var v=G.getVarValue(me.v,owner);
					G.localVars[w]=v;
				}
				else if ((type=='yield' || type=='lose') && context!='tick')
				{
					var w2=G.getThings(me.w,owner);
					var v=amount;
					if (me.v) v*=G.getVarValue(me.v,owner);
					if (owner.type=='item') owner=owner.base;
					for (var i=0;i<w2.length;i++)
					{
						var w=w2[i];
						if ((w.type=='upgrade' || w.type=='achiev'))
						{
							if (type=='yield' && !w.owned) {w.owned=1;w.doEffects('earn');}
							else if (type=='lose' && w.owned) {w.owned=0;w.doEffects('lose');}
						}
						else if (w.type=='itemType' || w.type=='item')
						{
							if (type=='yield')//gain V items of type W, or of the same type as the existing item W
							{
								if (w.type=='item') w=w.base;
								for (var ii=0;ii<v;ii++)
								{
									var newItem=G.gainItem(w);
								}
							}
							else//lose V items of type W, or lose the specified existing item
							{
								if (w.type=='itemType')
								{
									var v2=('v' in me?v:100);
									if (v2<0) v2=0;
									for (var ii=0;ii<v2;ii++)
									{
										G.loseItem(w);
									}
								}
								else
								{
									G.loseItem(w);
								}
							}
						}
						else
						{
							if (w.type=='res' || w.type=='building')
							{
								var v2=(('v' in me || type=='yield')?v:w.amount);
								if (type=='lose') v2=-v2;
								else if (w.type=='res')
								{
									v2+=w.boostAdd;
									v2*=w.boostMult;
									
									v2+=owner.boostAdd;
									v2*=owner.boostMult;
									
									if (owner.boostAddFor[w.id]) v2+=owner.boostAddFor[w.id];
									if (owner.boostMultFor[w.id]) v2*=owner.boostMultFor[w.id];
								}
								
								if (out && v2!=0)
								{
									if (!out.produced[w.id]) out.produced[w.id]=0;
									out.produced[w.id]+=v2;
								}
								w.earn(v2);
							}
						}
					}
				}
				else if (type=='spawn')
				{
					if (me.w.type=='shiny') G.spawnShiny(me.w);
				}
				else if (type=='log')
				{
					if (me.classes) G.log(G.getTextValue(me.w,owner,1),me.classes);
					else G.log(G.getTextValue(me.w,owner,1));
				}
				else if (type=='clear log')
				{
					G.clearLog();
				}
				else if (type=='toast')
				{
					G.toast({text:'<div>'+G.getTextValue(me.w,owner,1)+'</div>',classes:'center',dur:10});
				}
				else if (type=='echo')
				{
					console.log(owner.name+' : '+G.makeUnsafe(G.getTextValue(me.w,owner,1)));
				}
				else if (type=='do')
				{
					for (var i in w)
					{
						var it=w[i];
						if (it.effects[me.v]) it.doEffects(me.v);
					}
				}
				else if (type=='light')
				{
					var w=G.getThings(me.w,owner);
					for (var i in w){w[i].light();}
				}
				else if (type=='dim')
				{
					var w=G.getThings(me.w,owner);
					for (var i in w){w[i].dim();}
				}
				else if (type=='show')
				{
					var w=G.getThings(me.w,owner);
					for (var i in w){w[i].display();}
				}
				else if (type=='hide')
				{
					var w=G.getThings(me.w,owner);
					for (var i in w){w[i].hide();}
				}
				else if (type=='anim')
				{
					if (owner.l) triggerAnim(owner.l,me.w);
				}
				else if (type=='animicon')
				{
					if (owner.iconl) triggerAnim(owner.iconl,me.w);
				}
				else if (type=='eval' && G.local)
				{
					eval(me.w);
				}
			}
			G.effectNestLevel--;
		}
		
		G.effectsByContext={
			'start':'start',
			'save':'save',
			'load':'load',
			'earn':'earn',
			'lose':'lose',
			'tick':'tick',
			'cache ps':'tick',
			'cache boosts':'tick',
			'do grants':'tick',
			'undo grants':'tick',
			'click':'click',
		};
		G.Thing.prototype.doEffects=function(context,returnOut)
		{
			if (returnOut)
			{
				var out={};
				out.produced={};
			}
			var amount=1;
			if (this.type=='building') amount=this.amount;
			
			var custom=false;
			if (!G.effectsByContext[context]) custom=true;
			var resetVars=true;
			if (custom || context=='earn' || context=='lose') resetVars=false;
			
			if (resetVars) G.localVars=[];
			var effs=this.effects[G.effectsByContext[context]]||this.effects[context]||[];
			for (var i in effs)
			{
				G.doEffect(effs[i],this,context,amount,out);
			}
			if (resetVars) G.localVars=[];
			
			if (returnOut) return out;
		}
		
		
		G.spendCosts=function(costs,mult)
		{
			var out={produced:{}};
			var mult=mult||1;
			for (var i in costs)
			{
				var w=G.things[i];
				var v=costs[i];
				if (!w.canBeNegative && w.amount<v*mult) return false;
			}
			for (var i in costs)
			{
				var w=G.things[i];
				var v=costs[i]*mult;
				w.earn(-v);
				if (v!=0)
				{
					if (!out.produced[w.id]) out.produced[w.id]=0;
					out.produced[w.id]-=v;
				}
			}
			return out;
		}
		G.refundCosts=function(costs)
		{
			var out={produced:{}};
			for (var i in costs)
			{
				var w=G.things[i];
				var v=-costs[i];
				if (!w.canBeNegative && w.amount<v) return false;
			}
			for (var i in costs)
			{
				var w=G.things[i];
				var v=-costs[i];
				w.earn(-v);
				if (v!=0)
				{
					if (!out.produced[w.id]) out.produced[w.id]=0;
					out.produced[w.id]-=v;
				}
			}
			return out;
		}
		
		
		/*=====================================================================================
		HELPERS
		=======================================================================================*/
		
		G.getCostsStr=function(costs,neutral,specialOutput)
		{
			var str='';
			var notEnough=0;
			var t=0;
			for (var i in costs)
			{
				var w=G.things[i];
				var v=costs[i];
				if (v>w.amount && w.ps<=0) t=-1;
				else if (w.ps>0 && t!=-1) t=Math.max(t,(v-w.amount)/w.ps);
				var classes='cost';
				if (!neutral && !w.canBeNegative && v>w.amount) {classes+=' notEnough';notEnough++;}
				else if (!neutral) classes+=' hasEnough';
				str+='<div class="'+classes+'">'+B(v)+' '+(v==1?w.name:w.plural)+'</div>';
			}
			if (t>0 && !neutral) str+='<div class="costTimeRemaining">(in '+sayTime(t*1000+750)+')</div>';
			if (!specialOutput) return str;
			else return {str:str,lacking:notEnough};
		}
		
		G.resolveIcon=function(icon,small)
		{
			//returns a bit of CSS
			var str='';
			if (icon)
			{
				str='background-image:';
				for (var ii in icon)
				{
					str+='url('+icon[ii].url+'),';
				}
				str=str.slice(0,-1);
				str+=';background-position:';
				for (var ii in icon)
				{
					str+=icon[ii].x+'px '+icon[ii].y+'px,';
				}
				str=str.slice(0,-1);
				if (small)
				{
					str+=';background-size:';
					for (var ii in icon)
					{
						if (icon[ii].tile) str+='auto,';
						else str+='100%,';
					}
					str=str.slice(0,-1);
				}
				str+=';';
			}
			return str;
		}
		
		G.strToList=function(str)
		{
			//convert a string such as "3 gold, 1 banana, 11 monkeys" into an array of things [{w:Thing,v:3}...]
			var list={};
			var str=str.replaceAll(', and ',',');
			var str=str.replaceAll(' and ',',');
			var str=str.replaceAll(', ',',');
			str=str.split(',');
			for (var i in str)
			{
				var bit=str[i].split(' ');
				if (bit[1] && G.thingsByName[bit[1]])
				{
					var val=parseFloat(bit[0]);
					var thing=bit[1];//G.thingsByName[bit[1]];
					if (list[thing]) list[thing]+=val;
					else list[thing]=val;
				}
			}
			var list2=[];
			for (var i in list)
			{
				list2.push({w:G.thingsByName[i],v:list[i]});
			}
			return list2;
		}
		
		G.strToThings=function(str)
		{
			//convert a string such as "monkeys, tagged:fruit" into an array of things [Thing...]
			var list=[];
			var str=str.replaceAll(', and ',',');
			var str=str.replaceAll(' and ',',');
			var str=str.replaceAll(', ',',');
			str=str.split(',');
			for (var i in str)
			{
				var bit=str[i].split(':');
				if (bit[0] && G.thingsByName[bit[0]] && list.indexOf(bit[0])==-1) list.push(bit[0]);
				//TODO : tags
				/*if (bit[1] && G.thingsByName[bit[0]])
				{
					var val=parseFloat(bit[0]);
					var thing=bit[1];//G.thingsByName[bit[1]];
					if (list[thing]) list[thing]+=val;
					else list[thing]=val;
				}*/
			}
			var list2=[];
			for (var i in list)
			{
				list2.push(G.thingsByName[list[i]]);
			}
			return list2;
		}
		
		/*=====================================================================================
		PARSE EXPRESSION STRING TO FUNCTION
		=======================================================================================*/
		G.parseToFunc=function(cmd,dummyTest)
		{
			/*	this function takes a string and returns a function based on the string that can be safely executed
				if dummyTest is true, test the syntax safely; if no syntax error, return 'ok'; otherwise, return the error text
				examples :
					G.parseToFunc('floor(gold/10)+3');
					G.parseToFunc('max(random(2,luck),2)*2');
				available operations :
					a+b
					a-b
					a*b
					a/b
					floor(a)
					round(a)
					ceil(a)
					roundr(a) (returns a rounded up or down randomly depending on its value; 0.1 is much more likely to be rounded down than up)
					min(a,b)
					max(a,b)
					pow(a,b)
					chance(a) chance(a%) (a is between 0 and 100; returns true if pass, false otherwise)
					random(a) random(a,b)
					frandom(a) frandom(a,b)
					a=b a==b a is b
					a!=b !(a=b) a isn't b
					&& and
					|| or
					this (if the function is called with func(Thing,Thing.amount) this will return the Thing's amount)
					thingKey (returns the Thing's amount if res or building; if upgrade or achiev, return 1 if owned, 0 if not)
					$localVar (returns the value of the local variable with that name)
					have thingKey (returns whether we have the upgrade or achiev, or if the res or building is above 0)
			*/
			
			//put a space before and after every word and number
			var cmd2='';
			var inWord=0;
			cmd='('+cmd+')';
			for (var i=0;i<cmd.length;i++)
			{
				var it=cmd.charAt(i);
				if (G.Kalphanum.indexOf(it)!=-1 || it==':')
				{
					if (!inWord) cmd2+=' ';
					inWord=1;
				}
				else
				{
					if (inWord) cmd2+=' ';
					inWord=0;
				}
				cmd2+=it;
			}
			cmd2=cmd2.replace(/ +(?= )/g,'');//remove all multiple spaces
			
			
			var tokens=[];
			var str=STR2(cmd2);
			var ok=1;
			var prevKeyword='';
			var setKeyword=0;
			
			while(ok && str.val.length>0)
			{
				var setKeyword=0;
				if (str.gulpSymbol(',')) tokens.push(',');
				else if (str.gulpSymbol('('))
				{
					if (prevKeyword=='floor') tokens.push('Math.floor(');
					else if (prevKeyword=='round') tokens.push('Math.round(');
					else if (prevKeyword=='ceil') tokens.push('Math.ceil(');
					else if (prevKeyword=='roundr') tokens.push('randomFloor(');
					else if (prevKeyword=='min') tokens.push('Math.min(');
					else if (prevKeyword=='max') tokens.push('Math.max(');
					else if (prevKeyword=='pow') tokens.push('Math.pow(');
					else if (prevKeyword=='chance') tokens.push('luck(');
					else if (prevKeyword=='random') tokens.push('rand(');
					else if (prevKeyword=='frandom') tokens.push('frand(');
					else tokens.push('(');
				}
				else if (str.gulpSymbol(')')) tokens.push(')');
				else if (str.gulpSymbol('+')) tokens.push('+');
				else if (str.gulpSymbol('-')) tokens.push('-');
				else if (str.gulpSymbol('*')) tokens.push('*');
				else if (str.gulpSymbol('/')) tokens.push('/');
				else if (str.gulpSymbol('<=')) tokens.push('<=');
				else if (str.gulpSymbol('>=')) tokens.push('>=');
				else if (str.gulpSymbol('<')) tokens.push('<');
				else if (str.gulpSymbol('>')) tokens.push('>');
				else if (str.gulpSymbol('%)') || str.gulpSymbol('% )')) tokens.push(')');
				else if (str.gulpSymbol('%')) tokens.push('%');
				else if (str.gulpSymbol('isn \' t ') || str.gulpSymbol('!=')) tokens.push('!=');
				else if (str.gulp('is') || str.gulpSymbol('==') || str.gulpSymbol('=')) tokens.push('==');
				else if (str.gulpSymbol('!')) tokens.push('!');
				else if (str.gulp('and')) tokens.push('&&');
				else if (str.gulp('or')) tokens.push('||');
				else if (str.gulp('this')) tokens.push(dummyTest?'V':'v');
				else if (str.gulp('ItemsLeft')) tokens.push(' (G.itemsMax-G.itemsTotal) ');
				else if (str.gulp('lit')) tokens.push(dummyTest?'V':'w?w.lit:0');
				else if (str.gulp('dim')) tokens.push(dummyTest?'V':'w?(!w.lit):0');
				else if (str.val.charAt(0)=='$')
				{
					str.gulpSymbol('$');
					var localVar='$'+str.gulp();
					localVar=G.validateVar(localVar);
					if (dummyTest) tokens.push('V'); else tokens.push('(G.localVars[\''+localVar+'\']||0)');
				}
				else
				{
					var tkn=str.gulp();
					//console.log('	doing ['+tkn+']');
					if (	tkn=='have'
						|| 	tkn=='no'
						|| 	tkn=='floor'
						|| 	tkn=='round'
						|| 	tkn=='roundr'
						|| 	tkn=='ceil'
						|| 	tkn=='min'
						|| 	tkn=='max'
						|| 	tkn=='pow'
						|| 	tkn=='chance'
						|| 	tkn=='random'
						|| 	tkn=='frandom'
					){setKeyword=tkn;}
					else if (G.thingsByName[tkn.split(':')[0]])
					{
						var tkn2=tkn.split(':')[1];
						if (tkn2)
						{
							if (	tkn2=='clicks'
								||	tkn2=='ps'
								||	tkn2=='max'
								||	tkn2=='earned'
							){}
							else {ok=0;tokens.push(tkn);}
						}
						if (ok)
						{
							if (dummyTest) tokens.push('V');
							else
							{
								var thing=G.thingsByName[tkn.split(':')[0]];
								if (tkn2=='ps' && thing.type=='res') tokens.push('(G.things['+thing.id+'].ps)');
									else if (tkn2=='ps') tokens.push('(false)');
								else if (tkn2=='clicks' && (thing.type=='button' || thing.type=='shiny')) tokens.push('(G.things['+thing.id+'].clicks)');
									else if (tkn2=='clicks') tokens.push('(false)');
								else if (tkn2=='max' && (thing.type=='res' || thing.type=='building')) tokens.push('(G.things['+thing.id+'].maxAmount)');
									else if (tkn2=='max') tokens.push('(false)');
								else if (tkn2=='earned' && (thing.type=='res')) tokens.push('(G.things['+thing.id+'].earned)');
									else if (tkn2=='earned') tokens.push('(false)');
								else if (prevKeyword=='have')
								{
									if (thing.type=='res' || thing.type=='building') tokens.push('(G.things['+thing.id+'].amount>0)');
									else if (thing.type=='upgrade' || thing.type=='achiev') tokens.push('(G.things['+thing.id+'].owned==1)');
								}
								else if (prevKeyword=='no')
								{
									if (thing.type=='res' || thing.type=='building') tokens.push('(G.things['+thing.id+'].amount==0)');
									else if (thing.type=='upgrade' || thing.type=='achiev') tokens.push('(G.things['+thing.id+'].owned==0)');
								}
								else if (thing.type=='res' || thing.type=='building') tokens.push('G.things['+thing.id+'].amount');
								else if (thing.type=='upgrade' || thing.type=='achiev') tokens.push('(G.things['+thing.id+'].owned==1)');
								else {ok=0;tokens.push(tkn);}
							}
						}
					}
					else if (isNumber(tkn)) {tokens.push(parseFloat(tkn)+'');}
					else {ok=0;tokens.push(tkn);}
				}
				if (setKeyword) prevKeyword=setKeyword; else prevKeyword='';
			}
			//console.log('	[ '+tokens.join(' ][ ')+' ]');
			var funcBody=tokens.join(' ');
			funcBody='return parseNum( '+funcBody+' );';
			if (!ok && tokens[tokens.length-1])
			{
				//console.log('	ERROR : '+tokens[tokens.length-1]);
				if (dummyTest) return 'Failed to parse "'+tokens[tokens.length-1]+'"';
				else return false;
			}
			else
			{
				if (dummyTest) funcBody='var V=1; '+funcBody;
				else funcBody='var w=w||0;var v=v||0; '+funcBody;
				//console.log('	'+funcBody);
				var func=0;
				var result=0;
				try
				{
					func=new Function('w','v',funcBody);
					if (dummyTest) result=func();
					if (dummyTest) return 'ok'; else return func;
					//console.log('	Result is '+result);
				} catch (e)
				{
					if (true)//e instanceof SyntaxError)
					{
						if (dummyTest)
						{
							//console.log(funcBody);
							//console.log(e);
							return 'Error when executing function : "'+e.message+'".';
						}
						else return false;
					}
				}
			}
		}
		
		/*=====================================================================================
		PARSER
		=======================================================================================*/
		G.line=0;
		G.lineNums=[];
		G.foundError=false;
		G.context='';
		G.parseError=function(str)
		{
			var rawStr=str;
			
			if (!G.foundError)
			{
				G.l.innerHTML=`
					<div id="errorWrap">
						<div id="error">
							The game couldn't function due to the following problems :
							<div id="errors"></div>
							<small>You may want to contact the author of this game.</small>
						</div>
					</div>
				`;
				G.l.classList.add('on');
			}
			
			var str=str||'';
				str=str.replaceAll('&','&amp;');
				str=str.replaceAll('<','&lt;');
				str=str.replaceAll('>','&gt;');
				str=str.replaceAll('"','&quot;');
				str=str.replaceAll('\'','&apos;');
			
			var div=document.createElement('div');
			div.className='error';
			div.innerHTML='&bull; ERROR '+(G.context||'(unidentified)')+' :<br>['+str+']';
			l('errors').appendChild(div);
			console.log('ERROR '+(G.context||'(unidentified)')+' : '+rawStr);
			
			G.foundError=true;
			return false;
		}
		G.shorten=function(str,len)
		{
			if (str.length<len) return str; else return str.substring(0,len)+'…';
		}
		
		//sanitizing functions
		//regexps are used scarcely because I don't trust myself with those
		G.Kalpha='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ';
		G.Kalphanum='.1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ';
		G.Knum='.1234567890';
		G.Kvar='1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ';
		G.reservedKeywords=['this','that','all','except','but','is','isn\'t','no','not','have','floor','round','ceil','max','min','include','by','and','or','for','per','in','if','end','else','name','desc','tag','tags','Box','Boxes','Building','Buildings','Resource','Resources','Button','Buttons','Shiny','Shinies','Upgrade','Upgrades','Item','Items','Achievement','Achievements','Setting','Settings','slot1','slot2','slot3','slot4','prop1','prop2','prop3','prop4'];
		G.checkId=function(str)
		{
			//raise an error if str is not alphanumeric or collides with a reserved word
			if (G.reservedKeywords.indexOf(str)!=-1) return G.parseError('"'+str+'" is a reserved keyword, pick another one!');
			else if (str.length>20) return G.parseError('"'+str+'" is longer than 20 characters, the maximum allowed size for keys.');
			else
			{
				var fail=false;
				var letterFound=false;
				for (var i=0;i<str.length;i++)
				{
					var it=str.charAt(i);
					if (G.Kalphanum.indexOf(it)==-1) {fail=true;break;}
					if (G.Kalpha.indexOf(it)!=-1) {letterFound=true;}
				}
				if (fail || !letterFound) return G.parseError('"'+str+'" is not a valid key. A key can only contain letters and digits.');
			}
			return true;
		}
		G.validateId=function(ids)
		{
			//perform G.checkId on the declaring token of a new Thing (in the form *key1|key2|key3)
			var ids=ids.substring(1,ids.length).split('|');
			for (var i in ids)
			{
				if (G.thingsByName[ids[i]]) return G.parseError('There is already something with the id "'+ids[i]+'" ('+G.thingsByName[ids[i]].name+').');
				if (!G.checkId(ids[i])) return false;
			}
			return true;
		}
		G.Kclass=/^([a-z_]|-[a-z_-])[a-z\d_-]*$/i;
		G.validateClasses=function(str)
		{
			//raise an error if str isn't composed of alphanumeric words separated by spaces
			var bits=str.split(' ');
			for (var i in bits)
			{
				if (!G.Kclass.test(bits[i])) return G.parseError('"'+bits[i]+'" is not a valid CSS class name.');
			}
			return str;
		}
		G.validateVar=function(str)
		{
			if (str.charAt(0)!='$') return G.parseError('"'+str+'" is not a valid variable name.');
			str=str.substring(1);
			if (str.length<=0) return G.parseError('"'+str+'" is too short for a variable name.');
			var fail=false;
			for (var i=0;i<str.length;i++)
			{
				var it=str.charAt(i);
				if (G.Kvar.indexOf(it)==-1) {fail=true;break;}
			}
			str='$'+str;
			if (fail) return G.parseError('"'+str+'" is not a valid variable name as it is not alphanumeric.');
			return str;
		}
		
		G.makeSafe=function(str)
		{
			//makes the string okay to use in html without triggering any tags, hopefully
			str=str||'';
			str=str.replaceAll('&','&amp;');
			str=str.replaceAll('<','&lt;');
			str=str.replaceAll('>','&gt;');
			str=str.replaceAll('"','&quot;');
			str=str.replaceAll('\'','&apos;');
			return str;
		}
		G.makeUnsafe=function(str)
		{
			str=str||'';
			str=str.replaceAll('&lt;','<');
			str=str.replaceAll('&gt;','>');
			str=str.replaceAll('&quot;','"');
			str=str.replaceAll('&apos;','\'');
			str=str.replaceAll('&amp;','&');
			return str;
		}
		G.makeHTML=function(str)
		{
			//G.makeSafe, plus additional stuff
			//replace pseudotags
			str=G.makeSafe(str);
			str=str.replace(/&lt;\/&gt;/gi,'<br>');
			str=str.replace(/&lt;\/\/&gt;/gi,'</div><div>');
			str=str.replace(/&lt;\.&gt;/gi,'</div><div>&bull; ');
			str=str.replace(/&lt;t&gt;/gi,'<div class="title">').replace(/&lt;\/t&gt;/gi,'</div>');
			str=str.replace(/&lt;b&gt;/gi,'<b>').replace(/&lt;\/b&gt;/gi,'</b>');
			str=str.replace(/&lt;i&gt;/gi,'<i>').replace(/&lt;\/i&gt;/gi,'</i>');
			str=str.replace(/&lt;u&gt;/gi,'<u>').replace(/&lt;\/u&gt;/gi,'</u>');
			str=str.replace(/&lt;q&gt;/gi,'<q>').replace(/&lt;\/q&gt;/gi,'</q>');
			str=str.replace(/&lt;#([0-9A-F]{3,6})&gt;/gi,'<span style="color:#$1;">').replace(/&lt;\/#&gt;/gi,'</span>');
			return str;
		}
		
		//grabbers
		G.grabThing=function(str)
		{
			//"bunny" will return the Thing with the key "bunny"
			if (str=='this') return 'this';
			else if (str.indexOf(':')!=-1)
			{
				//return G.thingsByTag[???]
				return G.parseError('Selectors ("'+str+'") do not work for this command.');
			}
			else if (!G.thingsByName[str]) return G.parseError('Nothing found with the key "'+str+'".');
			return G.thingsByName[str];
		}
		G.grabThings=function(str)
		{
			//output is always an array
			//"bunny" will return the Thing with the key "bunny"
			//"Upgrades" will return all Things with type "upgrade"
			//"tag:animal" will return all Things with the tag "animal"
			if (str=='this') return ['this'];
			else if (str.indexOf(':')!=-1)//selector
			{
				var bits=str.split(':');
				var type=0;
				var tag=0;
				var notTag=0;
				var specials=[];
				for (var i=0;i<bits.length;i++)
				{
					var me=bits[i];
					if (me=='tag' && bits[i+1]) {i++;tag=G.makeSafe(bits[i]);}
					else if (me=='notTag' && bits[i+1]) {i++;notTag=G.makeSafe(bits[i]);}
					else if (me=='Buttons') type='button';
					else if (me=='Resources') type='res';
					else if (me=='Buildings') type='building';
					else if (me=='Upgrades') type='upgrade';
					else if (me=='Achievements') type='achiev';
					else if (me=='Items') type='itemType';
					else if (me=='Shinies') type='shiny';
					else if (me=='All') {}
					else if (	me=='owned'
							||	me=='notOwned'
								) specials.push(me);
					else if (me=='') {}
					else return G.parseError('In the selector "'+str+'", failed to understand "'+me+'".');
				}
				var arr=[];
				for (var i in G.things)
				{
					var me=G.things[i];
					if (
						(!type || me.type==type)
					&&	(!tag || me.tags.includes(tag))
					&&	(!notTag || !me.tags.includes(notTag))
					) arr.push(me);
				}
				if (specials.length>0)
				{
					var obj={w:arr};
					for (var i in specials){obj[specials[i]]=1;}
					return obj;
				}
				else return arr;
			}
			else if (!G.thingsByName[str]) return G.parseError('Nothing found with the key "'+str+'".');
			return [G.thingsByName[str]];
		}
		G.getThings=function(w,owner)
		{
			if (w.w)
			{
				var arr=[];
				for (var i in w.w)
				{
					var me=w.w[i];
					if ((!w.owned || (me.amount>0 || me.owned))
					&&	(!w.notOwned || (me.amount<=0 || !me.owned))
					) arr.push(me);
				}
				return arr;
			}
			else if (w[0]=='this') return [owner];
			//TODO : items
			else return w;
		}
		
		G.KisFunc=('+-*/=<>()%!,:').split('');
		G.isFunc=function(str)
		{
			//check if the string contains one of the above characters
			for (var i=0;i<G.KisFunc.length;i++){if (str.indexOf(G.KisFunc[i])!=-1) return true;}
			return false;
		}
		G.grabVar=function(str)
		{
			//"4" will return 4
			//"bunny" will return the Thing with the key "bunny"
			//"(4+bunnies*3)" will return a function that executes that operation
			//"$local" will return the local variable named "local" (or 0 if not found)
			if (str=='this') return 'this';
			if (str.charAt(0)!='(' && G.isFunc(str)) str='('+str+')';
			if (str.charAt(0)=='(' && str.charAt(str.length-1)==')')
			{
				var success=G.parseToFunc(str,1);
				if (success=='ok') return {type:'f',f:G.parseToFunc(str)};
				return G.parseError('Syntax error in "'+str+'" : '+success);
			}
			if (str.charAt(0)=='$') return {type:'l',l:str};
			if (isNumber(str)) return parseFloat(str);
			if (!G.thingsByName[str]) return G.parseError('"'+str+'" is not a valid thing, local variable, number, or expression.');
			return G.thingsByName[str];
		}
		G.getVarValue=function(w,thing)
		{
			if (w=='this' && thing) return thing.amount;
			else if (w.type)
			{
				var amount=0;
				if (w.type=='building' || w.type=='res') amount=w.amount;
				else if (w.type=='upgrade' || w.type=='achiev') amount=(w.owned?1:0);
				if (w.type=='f')
				{
					if (!thing) amount=0;
					else
					{
						if (thing.type=='building' || thing.type=='res') amount=thing.amount;
						else if (thing.type=='upgrade' || thing.type=='achiev') amount=(thing.owned?1:0);
						else if (thing.type=='button' || thing.type=='shiny') amount=thing.clicks;
					}
					return w.f(thing,amount);
				}
				else if (w.type=='l')
				{
					if (!G.localVars[w.l]) return 0;
					else return G.localVars[w.l];
				}
				else return amount;
				return 0;
			}
			else return w;
		}
		
		G.grabText=function(str)
		{
			var bits=[];
			var bit='';
			//chop into bits
			var inTkn=false;
			for (var i=0;i<str.length;i++)
			{
				var c=str.charAt(i);
				var add=false;
				if (c=='[')
				{
					if (inTkn>0) add=true;
					else
					{
						bits.push({t:G.makeHTML(bit)});
						bit='';
					}
					inTkn++;
				}
				else if (c==']' && inTkn>0)
				{
					inTkn--;
					if (inTkn>0) add=true;
					else
					{
						//bits.push({c:bit});
						if (bit.indexOf('?')==0)//[?(test)|(exp1)|(exp2)]=>if (test) is >0, return (exp1), else return (exp2)
						{
							bit=bit.substring(1).split('|');
							var X=bit[0]||0;
							var Y=bit[1]||'';
							var Z=bit[2]||'';
							bits.push({i:G.grabVar(X),w1:G.grabText(Y),w2:G.grabText(Z)});
						}
						else if (bit.indexOf('s?')==0)//[s?(exp)]=>if (exp) is !=1, return "s"
						{
							bit=bit.substring(2);
							var X=bit||0;
							bits.push({s:G.grabVar(X)});
						}
						else if (bit.indexOf('n:')==0)//[n:thingId]=>returns the name of the given thing
						{
							bit=bit.substring(2);
							var X=bit||0;
							if (X=='this') bits.push({ns:true});
							else
							{
								if (!G.thingsByName[X]) return G.parseError('"'+X+'" is not a valid thing.');
								bits.push({n:G.thingsByName[X]});
							}
						}
						else if (bit.indexOf('p:')==0)//[p:thingId]=>returns the plural of the given thing
						{
							bit=bit.substring(2);
							var X=bit||0;
							if (X=='this') bits.push({ps:true});
							else
							{
								if (!G.thingsByName[X]) return G.parseError('"'+X+'" is not a valid thing.');
								bits.push({p:G.thingsByName[X]});
							}
						}
						else bits.push({w:G.grabVar(bit)});//[(exp)]=>value of exp
						bit='';
					}
				}
				else add=true;
				if (add) bit+=c;
			}
			if (bit!='') bits.push({t:G.makeHTML(bit)});
			//console.log(bits);
			return bits;
		}
		G.getTextValue=function(w,thing,wrapMode)
		{
			var str='';
			for (var i in w)
			{
				var bit=w[i];
				if (bit.t) str+=bit.t;//raw text
				else if (bit.i) str+=G.getVarValue(bit.i,thing)?G.getTextValue(bit.w1,thing,1):G.getTextValue(bit.w2,thing,1);//ternary
				else if (bit.s) str+=(G.getVarValue(bit.s,thing)!=1)?'s':'';//s if !=1
				else if (bit.w) str+=B(G.getVarValue(bit.w,thing));//var
				else if (bit.n) str+=bit.n.name;//name
				else if (bit.p) str+=bit.n.plural;//plural
				else if (bit.ns) str+=thing.name;//name self
				else if (bit.ps) str+=thing.plural;//plural self
			}
			if (wrapMode==1) return str;
			else if (wrapMode==2) return '<div style="display:inline;">'+str+'</div>';
			return '<div>'+str+'</div>';
		}
		
		G.applyIncludes=function(str)
		{
			var out='';
			var lines=[];
			str=str.replaceAll('[i:','[include ');
			str=STR2(str);
			while (str.val.length>0)
			{
				out+=str.gulpUntilSymbol('[include ',true);
				if (str.val.length>0)
				{
					var bit=str.val;
					var incStr='';
					var inInclude=true;
					var inStr=false;
					var trailSpace=false;
					for (var i=0;i<bit.length;i++)
					{
						var it=bit.charAt(i);
						if (it==']' && !inStr) {inInclude=false;if (bit.charAt(i+1)==' '){trailSpace=true;};break;}
						else if (it=='"' && inInclude) inStr=!inStr;
						incStr+=it;
					}
					
					var bits=STR2(incStr);
					var inc=G.includes[bits.gulp()];
					
					var incContents=inc.mono?inc.text:inc.lines.join('///NEWLINE///');
					var args={};
					for (var i in inc.args){args[i]=inc.args[i];}
					while(bits.val.length>0)
					{
						var arg=STR2(bits.gulp());
						if (arg.gulpSymbol('%'))
						{
							var name=arg.gulpUntilSymbol('="',true);
							var def=arg.gulpUntilSymbol('"',true);
							if ((name in args) && def) args[name]=def;
						}
					}
					for (var i in args)
					{
						incContents=incContents.replaceAll('[%'+i+']',args[i]||'???');
					}
					if (!inc.mono) {lines=incContents.split('///NEWLINE///');break;}
					else out+=incContents;
					
					if (trailSpace) out+=' ';
					str.gulpSymbol(incStr+']');
				}
			}
			if (lines.length>0) return lines; else return [out];
		}
		
		G.parse=function(toParse)
		{
			
			var game={
				name:'Untitled',
				author:'Anonymous',
				desc:'',
				created:0,
				updated:0,
				version:0,
				forumPost:0,
				costRate:1.15,
				refundRate:0.5,
				css:'',
				stylesheets:[],
				spritesheets:{},
				noParticles:false,
				noBulkParticles:false,
			};
			
			G.foundError=false;
			G.context='when initializing';
			
			G.line=0;
			
			G.includes=[];
			
			for (var STEP=0;STEP<2;STEP++)//pre-parse on the first step, then turn into proper lines on the second
			{
				if (STEP==0) G.context='when pre-parsing';
				else G.context='when parsing';
				var lines=toParse.split(String.fromCharCode(10));
				var lines2=[];
				var lineNum=0;
				var lineNums=[];
				
				var inComment=false;//inside a multiline comment
				
				for (var i in lines)
				{
					var line=lines[i].trim();
					if (line.length>0)
					{
						if (line.substring(0,2)=='/*') {inComment=true;}//multiline comment start
						if (line.slice(-2)=='*/') {inComment=false;line='';/*line.slice(0,-2);*/}//multiline comment end
						if (inComment || line.substring(0,2)=='//') {}//comment
						else lines2.push(line);lineNums.push(lineNum);
					}
					lineNum++;
				}
				lines=lines2;
				G.lineNums=lineNums;
				
				if (STEP==1)
				{
					var i=0;
					while(i<lines.length)
					{
						if (i<lines.length-1)
						{
							var next=lines[i+1];
							var out=G.applyIncludes(next);
							lines.splice(i+1,1);
							for (var ii=out.length-1;ii>=0;ii--)
							{
								lines.splice(i+1,0,out[ii]);
							}
						}
						i++;
					}
				}
				
				//chop into blocks
				var blockNames={
					'Let\'s make a game!':	'main',
					'Settings':				'settings',
					'CSS':					'css',
					'Includes':				'includes',
					'Layout':				'layout',
					'Resources':			'resources',
					'Buttons':				'buttons',
					'Buildings':			'buildings',
					'Upgrades':				'upgrades',
					'Items':				'items',
					'Achievements':			'achievs',
					'Shinies':				'shinies',
				};
				var contentBlocks=['Resources','Buttons','Buildings','Upgrades','Items','Achievements','Shinies'];
				var blocksNamesById={};for (var i in blockNames){blocksNamesById[blockNames[i]]=i;}
				var blocks={};
				var block=0;
				var prevBlock=0;
				for (var i in lines)
				{
					var me=lines[i];
					if (blockNames[me])
					{
						prevBlock=block;
						block=blockNames[me];
						if (!blocks[block]) blocks[block]=[];
						if (contentBlocks.includes(me)) blocks[block].push('new block');
					}
					else if (block) {blocks[block].push(me);}
				}
				
				if (STEP==0 && blocks['includes'])
				{
					var thing=0;
					var i=0;
					//for (var i in blocks['includes'])
					while(i<blocks['includes'].length)
					{
						var line=STR2(blocks['includes'][i]);
						if (line.gulpSymbol('*include '))
						{
							if (thing!=0) G.includes[thing.name]=thing;
							thing={};
							thing.name=line.gulp();
							thing.args={};
							while(line.val.length>0)
							{
								if (line.gulpSymbol(':'))//mono (only one line)
								{
									thing.mono=true;
									thing.text=line.val;
									G.includes[thing.name]=thing;
									thing=0;
								}
								else
								{
									var arg=STR2(line.gulp());
									if (arg.gulpSymbol('%'))
									{
										var name=arg.gulpUntilSymbol('="',true);
										var def=arg.gulpUntilSymbol('"',true);
										if (def) thing.args[name]=def;
										else thing.args[name]=0;
									}
								}
							}
							if (thing)//still in thing therefore not mono
							{
								thing.lines=[];
							}
						}
						else if (thing)
						{
							thing.lines.push(line.val);
						}
						
						if (i<blocks['includes'].length-1)
						{
							var next=blocks['includes'][i+1];
							var out=G.applyIncludes(next);
							blocks['includes'].splice(i+1,1);
							for (var ii=out.length-1;ii>=0;ii--)
							{
								blocks['includes'].splice(i+1,0,out[ii]);
							}
						}
						i++;
						if (i>1000) {console.log('TOO MUCH INCLUDING HAPPENING!!! THERE IS A BUG SOMEWHERE PROBABLY AAAAAHHHH');i+=10000;}
					}
					if (thing!=0) G.includes[thing.name]=thing;
				}
				delete blocks['includes'];
				
				if (STEP==0)
				{
					//default layout
					if (!blocks['layout'] || blocks['layout'][0]=='use default' || blocks['layout'].length==0)
					{
						if (blocks['layout'] && blocks['layout'][0]=='use default') blocks['layout'].splice(0,1);
						blocks['layout']=((
`*main
	contains:res, buttons
	*res
		contains:Resources
		class:fullWidth
	*buttons
		contains:Buttons
*store
	contains:buildings, upgrades
	*buildings
		contains:BulkDisplay, Buildings
		header:<t>Buildings</t>
		tooltip origin:left
	*upgrades
		contains:Upgrades
		header:<t>Upgrades</t>
		costs:hide
		names:hide`
						).split(String.fromCharCode(10))).concat(blocks['layout']);
					}
					//paste back into 1 string
					toParse='';
					for (var i in blocks)
					{
						toParse+=blocksNamesById[i]+String.fromCharCode(10);
						toParse+=blocks[i].join(String.fromCharCode(10))+String.fromCharCode(10);
					}
				}
			}
			
			if (lines[0]!='Let\'s make a game!') return G.parseError('A valid source file must begin with "Let\'s make a game!"');
			
			var block='main';
			var thing=0;//not an actual Thing at this stage; this is an anonymous object that gets filled with properties as we define them; when we change blocks or start declaring another Thing, this gets turned into an actual Thing
			var virtualLineNum=0;
			
			var inEffects=false;//inside a thing's effects: / end effects
			var effectsType=0;//the type of the current effect block; can be "click", "tick", "sell", "c:customEffectName" etc
			var ends=0;//+1 everytime we start a new effect or condition block, -1 if we find "end"
			
			G.baseThing=0;//this is a pseudo-thing which can be defined in a section, making all subsequent Things use it as a base
			
			
			for (var block in blocks)
			{
				thing=0;ok=1;G.baseThing=0;
				for (var i in blocks[block])
				{
					G.line=virtualLineNum;
					var me=blocks[block][i];//lines[i];
					//G.context='on line '+(G.lineNums[G.line]||'?')+', "'+G.shorten(me,30)+'"';
					G.context='on line "'+G.shorten(me,30)+'"';//line numbers are unreliable in the current system
					
					var ok=0;
					
					//if (me.substring(0,2)=='/*') {ok=1;inComment=true;}//multiline comment start
					//if (me.slice(-2)=='*/') {ok=1;inComment=false;}//multiline comment end
					//if (ok || inComment || me.substring(0,2)=='//') {ok=1;}//comment
					if (true)
					{
						var prop=me.substring(0,me.indexOf(':')).toLowerCase();
						var val=me.substring(me.indexOf(':')+1);
						//we don't run G.makeSafe on the initial val because some commands, such as expressions, may use different handlers
						if (me=='new block') {G.baseThing=0;ok=1;}
						else if (block=='main')
						{
							ok=1;
							if (prop=='name') game.name=G.makeSafe(val);
							else if (prop=='by' || prop=='author') game.author=G.makeSafe(val);
							else if (prop=='desc') game.desc=val;
							else if (prop=='created') game.created=G.makeSafe(val);
							else if (prop=='updated') game.updated=G.makeSafe(val);
							else if (prop=='version') game.version=parseFloat(val);
							else if (prop=='forum post') game.forumPost=parseInt(val);
							else ok=0;
						}
						else if (block=='settings')
						{
							ok=1;
							if (prop=='background')
							{
								game.background=G.makeSafe(val);
							}
							else if (prop=='tiling background')
							{
								game.background=G.makeSafe(val);
								game.backgroundTile=true;
							}
							else if (prop=='spritesheet')
							{
								var sprites=G.makeSafe(val).split(', ');
								game.spritesheets[sprites[0]]={name:sprites[0],w:parseInt(sprites[1].split(' by ')[0]),h:parseInt(sprites[1].split(' by ')[1]),url:sprites[2]};
							}
							else if (prop=='stylesheet')
							{
								game.stylesheets.push(val);
							}
							else if (prop=='bloom')
							{
								G.bloomFilter=Math.min(100,Math.max(0,parseFloat(val)))/200;
							}
							else if (prop=='building cost increase') game.costRate=parseFloat(val.replace('%',''))/100;
							else if (prop=='building cost refund') game.refundRate=parseFloat(val.replace('%',''))/100;
							else if (me=='no particles') game.noParticles=true;
							else if (me=='no bulk particles') game.noBulkParticles=true;
						}
						else if (block=='css')
						{
							ok=1;
							if (me) game.css+=''+/*G.makeSafe*/(me)+String.fromCharCode(10);
						}
						else if (block=='layout' || block=='resources' || block=='buttons' || block=='shinies' || block=='buildings' || block=='upgrades' || block=='items' || block=='achievs')
						{
							//create and edit things
							ok=1;
							var effects=thing.effects;
							if (me.charAt(0)=='*')
							{
								G.createThing(thing);
								
								if (me=='*TEMPLATE'){}
								else if (!G.validateId(me)) return false;
								
								var type='';
								if (block=='layout') type='box';
								if (block=='resources') type='res';
								else if (block=='buttons') type='button';
								else if (block=='buildings') type='building';
								else if (block=='upgrades') type='upgrade';
								else if (block=='items') type='itemType';
								else if (block=='achievs') type='achiev';
								else if (block=='shinies') type='shiny';
								thing={type:type};
								thing.ids=me;
								
								if (thing.type=='box')
								{
									thing.showCosts=true;
									thing.showNames=true;
									thing.showIcons=true;
									thing.showPs=true;
								}
								else
								{
									thing.effects={};
									/*
										.effects is groups of effects by effectType
										ie.:
										.effects={
											'click':['effect text 1','effect text 2'],
											'tick':['effect text 1','effect text 2'],
										};
										the effect texts are parsed into actual effects later on
									*/
									thing.costs=[];
									thing.reqs=[];
									thing.costRate=game.costRate;
									thing.refundRate=game.refundRate;
									
									if (thing.type=='shiny')
									{
										thing.freq=0;
										thing.freqV=0;
										thing.dur=10;//default to 10 secs duration
										thing.moves=[];
									}
								}
							}
							//boxes only
							else if (!thing) G.parseError('Trying to edit something, but there is nothing to edit.');
							else if (type=='box')
							{
								if (prop=='contains')
								{
									if (!thing.children){thing.children=[];}
									val=G.makeSafe(val).split(', ');
									for (var ii in val){thing.children.push(val[ii]);}
								}
								else if (prop=='in')
								{
									thing.isIn=G.makeSafe(val);
								}
								else if (prop=='costs') thing.showCosts=(val=='show'?true:false);
								else if (prop=='names') thing.showNames=(val=='show'?true:false);
								else if (prop=='icons') thing.showIcons=(val=='show'?true:false);
								else if (prop=='ps') thing.showPs=(val=='show'?true:false);
								else if (prop=='header') thing.header=val;
								else if (prop=='footer') thing.footer=val;
								else if (prop=='class') thing.classes=G.validateClasses(val);
								else if (prop=='tooltip origin' && (val=='top' || val=='bottom' || val=='left' || val=='right')) thing.tooltipOrigin=G.makeSafe(val);
								else if (prop=='tooltip class') thing.tooltipClasses=G.validateClasses(val);
								else if (me=='no tooltip') thing.noTooltip=true;
								else ok=0;
							}
							//general
							else if (prop=='name') {val=val.split('|');thing.name=G.makeSafe(val[0]);thing.plural=(G.makeSafe(val[1])||G.makeSafe(val[0]));thing.customName=true;}
							else if (prop=='desc') thing.desc=val;
							else if (prop=='text') thing.text=val;
							else if (prop=='tag' || prop=='tags') thing.tags=G.makeSafe(val);
							else if (prop=='class') thing.classes=G.validateClasses(val);
							else if (prop=='icon class') thing.iconClasses=G.validateClasses(val);
							else if (prop=='icon') thing.icon=G.makeSafe(val);
							else if (prop=='start with' && (thing.type=='res' || thing.type=='building')) thing.startWith=parseFloat(val);
							else if ((me=='start with' || me=='owned') && (thing.type=='upgrade' || thing.type=='achiev')) thing.startWith=true;
							else if (prop=='is always' && (thing.type=='res' || thing.type=='building')) {thing.isAlways=val;}
							else if (me=='can be negative' && (thing.type=='res')) {thing.canBeNegative=true;}
							else if (me=='show max' && (thing.type=='res' || thing.type=='building')) thing.showMax=true;
							else if (me=='show earned' && (thing.type=='res')) thing.showEarned=true;
							else if (me=='show clicks' && thing.type=='button') thing.showClicks=true;
							else if (prop=='cost') thing.costs.push((val));
							else if (prop=='cost increase') thing.costRate=parseFloat(val.replace('%',''))/100;
							else if (prop=='cost refund') thing.refundRate=parseFloat(val.replace('%',''))/100;
							else if (prop=='req') thing.reqs.push((val));
							else if (me=='unlocked') thing.unlocked=true;//(val=='true' || val=='yes');
							else if (me=='no text') thing.noText=true;
							else if (me=='no click') thing.noClick=true;
							else if (me=='shown') thing.show=1;
							else if (me=='hidden') thing.show=0;
							else if (me=='lit') thing.lit=1;
							else if (me=='dim') thing.lit=0;
							else if (me=='always hidden') thing.alwaysHidden=1;
							else if (me=='hidden when 0') thing.hiddenWhen0=true;
							else if (me=='no buy') thing.noBuy=true;
							else if (prop=='limit' && thing.type=='building') thing.limit=val;
							else if (prop=='movement' && thing.type=='shiny') thing.moves=G.makeSafe(val).split(' ');
							else if (prop=='frequency' && thing.type=='shiny') thing.freq=parseFloat(val);
							else if (prop=='frequency variation' && thing.type=='shiny') thing.freqV=parseFloat(val);
							else if (prop=='duration' && thing.type=='shiny') thing.dur=parseFloat(val);
							//effects
							else if (prop=='passive' || prop.indexOf('on ')==0)
							{
								if (inEffects || ends>0) G.parseError('Attempted to start an effect inside another effect.');
								else
								{
									ends++;
									inEffects=true;
									var type='tick';//"passive" just redirects to "on tick"
									if (prop!='passive') type=prop.substring(3);
									/*if (	type=='passive'
									||		type=='click'
									||		type=='tick'
									||		type=='start'
									||		type=='save'
									||		type=='load'
									||		type=='earn'
									||		type=='lose'
									) effectsType=type;
									else G.parseError('The effect type "'+type+'" was not recognized.');*/
									if (G.validateId(type)) effectsType=type; else G.parseError('The effect type "'+type+'" is invalid.');
									if (val && val.length>0)//1-line effect
									{
										if (!thing.effects[effectsType]) thing.effects[effectsType]=[];
										thing.effects[effectsType].push(val);
										ends--;inEffects=false;effectsType=0;
									}
									else
									{
										if (!thing.effects[effectsType]) thing.effects[effectsType]=[];
									}
								}
							}
							else if (me=='end')
							{
								ends--;
								if (ends>0 && effectsType)
								{
									//end to a condition inside an effect block
									thing.effects[effectsType].push(me);
								}
								else if (ends==0 && effectsType)
								{
									//end to an effect block
									//if (!thing.effects[effectsType]) thing.effects[effectsType]=[];
									//thing.effects[effectsType].push(val);
									inEffects=false;effectsType=0;
								}
								else if (ends<0) G.parseError('Tried to end conditions or effects when there were none started.');
							}
							else if (inEffects && effectsType)
							{
								if (me.indexOf('if (')==0)
								{
									if (me.charAt(me.length-1)==')') ends++;//only ends++ for multi-line condition blocks
								}
								thing.effects[effectsType].push(me);
							}
							else if (me.indexOf('if (')==0 || me.indexOf('else if (')==0) G.parseError('Tried to start a condition outside of an effect block.');
							//visual
							else if (prop=='tooltip origin' && (val=='top' || val=='bottom' || val=='left' || val=='right')) thing.tooltipOrigin=G.makeSafe(val);
							else if (prop=='tooltip class') thing.tooltipClasses=G.validateClasses(val);
							else if (me=='no tooltip') thing.noTooltip=true;
							else ok=0;
						}
					}
					if (G.foundError || !ok) return G.parseError('Could not parse "'+G.shorten(me,30)+'".');
					virtualLineNum++;
				}
				G.createThing(thing);
				if (inEffects || ends>0) return G.parseError('An effects block was not closed properly.');
				G.baseThing=0;
			}
			
			G.spritesheets=game.spritesheets||{};
			
			
			//turn text into valid text objects
			if (game.desc) game.desc=G.grabText(game.desc);
			var props=['header','footer'];
			for (var i in G.boxes)
			{
				var me=G.boxes[i];
				G.context='when parsing text for the box "'+G.shorten(me.key,30)+'"';
				for (var ii in props)
				{
					if (me[props[ii]]) me[props[ii]]=G.grabText(me[props[ii]]);
				}
			}
			var props=['desc','text'];
			for (var i in G.things)
			{
				var me=G.things[i];
				G.context='when parsing text for the thing "'+G.shorten(me.name,30)+'"';
				for (var ii in props)
				{
					if (me[props[ii]]) me[props[ii]]=G.grabText(me[props[ii]]);
				}
			}
			
			
			//clean icons, costs, reqs and effects
			
			var gulpCond=function(str)
			{
				//get whatever is within the next "if ()", parse it into a function and return that function
				if (str.gulp('if') && str.gulpSymbol('('))
				{
					var parens=1;
					var cond='';
					//find matching parens
					for (var i=0;i<str.val.length;i++)
					{
						var it=str.val.charAt(i);
						if (it=='(') parens++;
						else if (it==')') parens--;
						if (parens==0) {break;}
						cond+=it+'';
					}
					if (cond!='')
					{
						str.gulpSymbol(cond+')');
						return G.grabVar('('+cond+')');
					}
				}
				return false;
			}
			
			for (var i in G.things)
			{
				var me=G.things[i];
				
				if (me.icon)
				{
					G.context='when getting the icon for the thing "'+G.shorten(me.name,30)+'"';
					var icons=[];
					var icon=me.icon.split(' ');
					for (var ii in icon)
					{
						if (icon[ii].charAt(icon[ii].length-1)==']')//tile
						{
							var sheet=G.spritesheets[icon[ii].split('[')[0]];
							var coords=icon[ii].substring(icon[ii].indexOf('[')+1,icon[ii].indexOf(']')).split(',');
							icons.push({tile:true,url:sheet.url,x:-parseInt(coords[0])*sheet.w,y:-parseInt(coords[1])*sheet.h});
						}
						else icons.push({url:icon[ii],x:0,y:0});//plain image
					}
					me.icon=icons;
				}
				
				if (me.type=='shiny')
				{
					G.context='when preparing the shiny "'+G.shorten(me.name,30)+'"';
					var moves={};
					var recMoves=('anywhere,onRight,onLeft,onTop,onBottom,onMouse,onThing,onBox,followMouse,followMouseSlow,wiggle,pulse,randomAngle,spinCW,spinCCW,spinRandom,fade,grow,shrink,growShrink,moveRandom,moveLeft,moveRight,moveTop,moveBottom,bobVertical,bobHorizontal,bounce').split(',');
					var wMoves=('onThing,onBox').split(',');//moves that accept a thing instead of a number
					for (var ii in me.moves)
					{
						var it=me.moves[ii].split(':');
						if (recMoves.indexOf(it[0])==-1) G.parseError('"'+it[0]+'" is not a recognized movement type.');
						else if(wMoves.indexOf(it[0])!=-1 && !G.thingsByName[it[1]]) G.parseError('The movement type "'+me.moves[ii]+'" has an invalid parameter.');
						else if(wMoves.indexOf(it[0])!=-1) moves[it[0]]=G.thingsByName[it[1]];
						else moves[it[0]]=parseFloat(it[1]||0);
					}
					me.moves=moves;
				}
				
				if (me.noClick)
				{
					if (!me.classes) me.classes='noClick';
					else me.classes+=' noClick';
				}
				
				G.context='when preparing the thing "'+G.shorten(me.name,30)+'"';
				if (me.isAlways) me.isAlways=G.grabVar('('+me.isAlways+')').f;
				if (me.limit) me.limit=G.grabVar('('+me.limit+')').f;
				
				var condStack=[];//the first one is the condition effect currently being filled
				
				//breaking up one-line effects and pre-parsing
				for (var effectType in me.effects)
				{
					G.context='when parsing the effect block "'+G.shorten(effectType,30)+'" for the thing "'+G.shorten(me.name,30)+'"';
					var list=[];
					var effs=me.effects[effectType];
					var elses=0;
					for (var ii in effs)
					{
						var cond=0;
						var str=STR2(effs[ii]);
						if (str.val=='end' && elses>0)
						{
							//double ends if we're closing an else
							for (var iii=0;iii<elses;iii++) list.push({type:'?',eff:'end'});
							elses--;
						}
						if (str.val=='else')
						{
							list.push({type:'else',effs:[]});
							str.val='';
							elses++;
						}
						else
						{
							var isElse=str.gulp('else');
							if (isElse) elses++;
							cond=gulpCond(str);
							if (cond.type && cond.type=='f')
							{
								list.push({type:(isElse?'else':'if'),cond:cond.f,effs:[],or:[]});
							}
						}
						if (str.val.length>0)
						{
							list.push({type:'?',eff:str.val});
							if (cond) list.push({type:'?',eff:'end'});
						}
						if (G.foundError) return false;
					}
					me.effects[effectType]=list;
				}
				
				for (var effectType in me.effects)
				{
					G.context='when parsing the effect block "'+G.shorten(effectType,30)+'" for the thing "'+G.shorten(me.name,30)+'"';
					var list=[];
					var effs=me.effects[effectType];
					for (var ii in effs)
					{
						var eff=effs[ii];
						if (eff.type=='if' || eff.type=='else')
						{
							if (eff.type=='else' && condStack.length>0) condStack[0].or.push(eff);
							else if (condStack.length>0) condStack[0].effs.push(eff);
							else list.push(eff);
							condStack.unshift(eff);
						}
						if (eff.type=='?')
						{
							var str=STR2(eff.eff);
							delete eff.eff;
							
							var add=true;
							
							var cmd=str.val;
							
							if (str.val=='end')
							{
								add=false;
								if (condStack.length>0) condStack.shift();
								eff.type='end';
							}
							else
							{
								var whatDo=0;
								if (str.gulpSymbol('log('))
								{
									var classes=G.validateClasses(str.gulpUntilSymbol(')'));
									eff={type:'log',w:G.grabText(str.gulpUntil()),classes:classes};
								}
								else if (str.gulp('log')) eff={type:'log',w:G.grabText(str.gulpUntil())};
								else if (str.val==('clear log') || str.val==('clean log')) eff={type:'clear log'};
								else if (str.gulp('toast')) eff={type:'toast',w:G.grabText(str.gulpUntil())};
								else if (str.gulp('echo')) eff={type:'echo',w:G.grabText(str.gulpUntil())};
								else if (str.gulp('eval')) eff={type:'eval',w:str.gulpUntil()};
								
								else if (str.gulp('do'))
								{eff={type:'do'};whatDo='do X with Ys';}
							
								else if (str.gulp('anim icon')) eff={type:'animicon',w:G.validateClasses(str.gulpUntil())};
								else if (str.gulp('anim')) eff={type:'anim',w:G.validateClasses(str.gulpUntil())};
								
								else if (str.gulp('light')) {eff={type:'light'};whatDo='do Xs';}
								else if (str.gulp('dim')) {eff={type:'dim'};whatDo='do Xs';}
								else if (str.gulp('show')) {eff={type:'show'};whatDo='do Xs';}
								else if (str.gulp('hide')) {eff={type:'hide'};whatDo='do Xs';}
							
								else if (str.gulp('spawn'))
								{eff={type:'spawn'};whatDo='do X';}
								
								else if (str.gulp('yield') || str.gulp('gain') || str.gulp('win') || str.gulp('get'))
								{eff={type:'yield'};whatDo='do X Ys';}
								
								else if (str.gulp('lose'))
								{eff={type:'lose'};whatDo='do X Ys';}
							
								else if (str.gulp('grant'))
								{eff={type:'grant'};whatDo='do X Y';}
							
								else if (str.gulp('increase cost of'))
								{eff={type:'increase cost'};whatDo='change Xs by Y';}
								else if (str.gulp('lower cost of'))
								{eff={type:'lower cost'};whatDo='change Xs by Y';}
								else if (str.gulp('multiply cost of'))
								{eff={type:'multiply cost'};whatDo='change Xs by Y';}
								else if (str.gulp('multiply refund of'))
								{eff={type:'multiply refund'};whatDo='change Xs by Y';}
							
								else if (str.gulp('increase yield of') || str.gulp('increase gain of'))
								{eff={type:'increase yield'};whatDo='change Xs by Y';}
								else if (str.gulp('lower yield of') || str.gulp('lower gain of'))
								{eff={type:'lower yield'};whatDo='change Xs by Y';}
								else if (str.gulp('multiply yield of') || str.gulp('multiply gain of'))
								{eff={type:'multiply yield'};whatDo='change Xs by Y';}
							
								else if (str.gulp('multiply duration of'))
								{eff={type:'multiply duration'};whatDo='change Xs by Y';}
								else if (str.gulp('multiply frequency of'))
								{eff={type:'multiply frequency'};whatDo='change Xs by Y';}
							
								if (eff.type=='?')
								{
									//this one is a bit annoying
									var tmp=STR2(str.val);
									var type=tmp.gulp();
									if (type=='increase' || type=='lower' || type=='multiply')
									{
										var Z=tmp.gulp();
										if (tmp.gulp('yield of') || tmp.gulp('gain of'))
										{
											eff={type:type+' yield for'};whatDo='change Zs for Xs by Y';
											str.val=Z+' for '+tmp.val;
										}
									}
								}
								
								if (eff.type=='?')//still nothing?
								{
									//test for "X is Y" or "X=Y"
									str.val=str.val.replace(' = ','=');
									str.val=str.val.replace('=',' = ');
									var bits=str.val.split(' ');
									if (bits[1] && (bits[1]=='is' || bits[1]=='are' || bits[1]=='=') && bits[0].length>0 && bits[2])
									{
										bits[1]='=';
										str.val=bits.join(' ');
										if (str.val.charAt(0)=='$') {eff={type:'set var'};whatDo='$X=Y';}
										else {eff={type:'set'};whatDo='X=Y';}
									}
								}
								
								if (whatDo=='X=Y')
								{
									//X is a selector, Y is a number or variable
									var bits=str.val.split(' = ');
									var X=bits[0]||0;
									var Y=bits[1]||0;
									if (X) eff.w=G.grabThings(X);
									if (Y) eff.v=G.grabVar(Y);
								}
								else if (whatDo=='$X=Y')
								{
									//X is a local var, Y is a number or variable
									var bits=str.val.split(' = ');
									var X=bits[0]||0;
									var Y=bits[1]||0;
									if (X) eff.w=G.validateVar(X);
									if (Y) eff.v=G.grabVar(Y);
								}
								else if (whatDo=='do X')
								{
									//X is a thing
									var X=str.gulp();
									if (X) eff.w=G.grabThing(X);
								}
								else if (whatDo=='do Xs')
								{
									//X is a selector
									var X=str.gulp();
									if (X) eff.w=G.grabThings(X);
								}
								else if (whatDo=='do X Y')
								{
									//X can be a number or a variable, but Y is always a thing
									//X may be absent
									var Y=str.val.split(' ');Y=Y[Y.length-1];
									var X=str.gulpUntil(Y);
									if (X) eff.v=G.grabVar(X);
									if (Y) eff.w=G.grabThing(Y);
								}
								else if (whatDo=='do X Ys')
								{
									//X can be a number or a variable, but Y is always a selector
									//X may be absent
									var Y=str.val.split(' ');Y=Y[Y.length-1];
									var X=str.gulpUntil(Y);
									if (X) eff.v=G.grabVar(X);
									if (Y) eff.w=G.grabThings(Y);
								}
								else if (whatDo=='change X by Y')
								{
									//X is a thing, Y is a number or variable
									eff.w=G.grabThing(str.gulpUntil('by'));
									eff.v=G.grabVar(str.gulpUntil());
								}
								else if (whatDo=='change Xs by Y')
								{
									//X is a selector, Y is a number or variable
									eff.w=G.grabThings(str.gulpUntil('by'));
									eff.v=G.grabVar(str.gulpUntil());
								}
								else if (whatDo=='change Zs for Xs by Y')
								{
									//X is a selector, Y is a number or variable, Z is a selector
									eff.z=G.grabThings(str.gulpUntil('for'));
									eff.w=G.grabThings(str.gulpUntil('by'));
									eff.v=G.grabVar(str.gulpUntil());
								}
								else if (whatDo=='do X with Ys')
								{
									//X is an effect name, Y is a selector
									if (str.val.indexOf(' with ')==-1)
									{
										eff.v=str.val;
										eff.w=G.grabThings('this');
									}
									else
									{
										eff.v=str.gulpUntil('with');
										eff.w=G.grabThings(str.gulpUntil());
									}
									if (!G.validateId(eff.v)) G.parseError('The effect type "'+eff.v+'" is invalid.');
									//else if (eff.w && !eff.w.effects[eff.v]) G.parseError(eff.w.name+' does not have any effects named "'+eff.v+'".');
								}
							}
							if (eff.type=='?') {add=false;G.parseError('Could not parse the effect "'+G.shorten(cmd,30)+'".');}
							
							if (add)
							{
								if (condStack.length>0) condStack[0].effs.push(eff);
								else list.push(eff);
							}
						}
						if (G.foundError) return false;
					}
					me.effects[effectType]=list;
				}
				
				G.context='when parsing costs for the thing "'+G.shorten(me.name,30)+'"';
				var list=[];
				for (var ii in me.costs)
				{
					list.push(G.strToList(me.costs[ii]));
				}
				me.costs=list;
				
				//construct a func that checks reqs
				G.context='when parsing requirements for the thing "'+G.shorten(me.name,30)+'"';
				if (me.reqs.length>0)
				{
					var str=me.reqs.join(', ');
					str=str.replaceAll(', and ',',');
					str=str.replaceAll(' and ',',');
					str=str.replaceAll(', ',',');
					var list=str.split(',');
					var str='';
					for (var ii in list)
					{
						var bits=list[ii].split(' ');
						if (bits[2] && (bits[2]=='clicks' || bits[2]=='click')) {bits[2]=0;bits[1]+=':clicks';}
						if (bits[2] && (bits[2]=='per') && bits[3] && (bits[3]=='second')) {bits[2]=0;bits[3]=0;bits[1]+=':ps';}
						if (bits[0] && bits[1] && !bits[2] && isNumber(bits[0])) str+=bits[1]+' >= '+bits[0];
						else str+=list[ii];
						str+=' and ';
					}
					str='( '+str+' 1 )';
					me.reqFunc=G.grabVar(str).f;
					if (G.foundError) return false;
				}
			}
			
			//setup game
			G.context='when initializing data';
			for (var i in G.things)
			{
				var me=G.things[i];
				if (me.type!='box')
				{
					me.boostAdd=0;
					me.boostMult=1;
					me.boostAddFor=[];
					me.boostMultFor=[];
					me.costAdd=0;
					me.costMult=1;
					me.refundMult=1;
					me.costAddFor=[];
					me.costMultFor=[];
					me.refundMultFor=[];
				}
				if (me.type=='button' || me.type=='shiny')
				{
					me.clicks=0;
				}
				if (me.type=='shiny')
				{
					me.timeLeft=-1;
					me.durMult=1;
					me.freqMult=1;
				}
				if (me.type=='res' || me.type=='building')
				{
					me.amount=0;
					if (me.startWith) me.amount=me.startWith;
					me.maxAmount=me.amount;
				}
				if (me.type=='res')
				{
					me.ps=0;
					me.amountD=me.amount;
					me.earned=me.amount;
				}
				if (me.type=='upgrade' || me.type=='achiev')
				{
					me.owned=0;
					if (me.startWith) me.owned=1;
				}
			}
			
			G.startDate=parseInt(Date.now());
			
			//parse the load data if any
			var loadedData=G.applyLoad();
			
			//build layout
			
			if (game.background) G.l.style.backgroundImage='url('+game.background+')';
			if (game.backgroundTile) G.l.classList.add('tilingBackground'); else G.l.classList.remove('tilingBackground');
			
		
			G.thingPlacement={
				'Resources':'none',
				'Buttons':'none',
				'Buildings':'none',
				'Upgrades':'none',
				'Achievements':'none',
				'Items':'none',
			};
			
			G.specialBoxes={
					'BulkDisplay':`<div id="bulkDisplay" class="box-bit"><div class="box-bit-content"></div></div>`,
					'Log':`<div id="log" class="box-bit"><div id="logOuter" class="box-bit-content"><div id="logInner"></div></div></div>`,
			};
			
			//put boxes inside each other
			for (var i in G.boxes)
			{
				var me=G.boxes[i];
				G.context='when placing the box "'+G.shorten(me.key,30)+'"';
				me.name=me.key;
				if (!me.children) me.children=[];
				if (me.isIn)
				{
					var it=me.isIn;
					if (G.thingsByName[it] && G.thingsByName[it].type=='box')
					{
						if (!G.thingsByName[it].children) G.thingsByName[it].children=[];
						G.thingsByName[it].children.push(me.name);
					}
					else return G.parseError('Tried to put the box "'+me.name+'" in the box "'+it+'", but "'+it+'" is not an existing box.');
				}
			}
			for (var i in G.boxes)
			{
				var me=G.boxes[i];
				G.context='when placing the box "'+G.shorten(me.key,30)+'"';
				for (var ii in me.children)
				{
					var it=me.children[ii];
					
					//generic Thing keyword
					if (G.thingPlacement[it]) G.thingPlacement[it]=me;
					//special predefined elements
					else if (G.specialBoxes[it]) {me.children[ii]={type:'special',str:G.specialBoxes[it]};}
					//tag
					else if (it.indexOf('tag:')==0){
						var tag=it.slice(4);
						me.children[ii]=tag;
						G.thingPlacement[tag]=me;
					}
					//other box
					else if (G.thingsByName[it] && G.thingsByName[it].type=='box') {G.thingsByName[it].parent=me;me.children[ii]=G.thingsByName[it];}
					else return G.parseError('Tried to put "'+it+'" in the box "'+me.name+'", but "'+it+'" is not an existing box or a valid Thing keyword.');
				}
			}
			
			//create dom
			G.context='when placing boxes';
			var rootBoxes=[];
			for (var i in G.boxes)
			{
				var me=G.boxes[i];
				if (!me.parent) rootBoxes.push(me);
			}
			var getBoxStr=function(box)
			{
				var str='';
				if (box.type && box.type=='special')
				{
					return box.str;
				}
				else if (box.type && box.type=='box')
				{
					for (var i in box.children){str+=getBoxStr(box.children[i]);}
					var content=str;
					var classes='box';
					if (box.classes) classes+=' '+box.classes;
					str='<div class="'+classes+'" id="box-'+box.name+'">';
					if (box.header) str+='<div class="box-header">'+G.getTextValue(box.header)+'</div>';
					if (box.footer) str+='<div class="box-footer">'+G.getTextValue(box.footer)+'</div>';
					str+=content;
					str+='</div>';
					return str;
				}
				else {return '<div class="box-things" id="box-things-'+box+'"></div>';}
			}
			var str='';
			for (var i in rootBoxes)
			{
				str+=getBoxStr(rootBoxes[i]);
			}
			l('content').innerHTML=str;
			
			for (var i in G.boxes)
			{
				var me=G.boxes[i];
				me.l=l('box-'+me.name)||0;
				me.childrenl={};
				for (var ii in me.children)
				{
					var child=me.children[ii];
					if (child.type && child.type=='box')
					{}
					else {me.childrenl[child]=l('box-things-'+child)||0;}
				}
			}
			
			//place things
			G.context='when placing things';
			for (var i in G.things)
			{
				G.things[i].createDom();
			}
			for (var i in G.items)
			{
				G.items[i].createDom();
			}
			
			G.context='in the final stages of initialization';
			
			//bulk display
			G.bulkDisplay=l('bulkDisplay')||0;
			if (G.bulkDisplay)
			{
				G.addTooltip(G.bulkDisplay,{func:function(){return '<div class="title">Bulk-buying and selling</div><div class="desc"><div>Buy 50 at once by pressing Shift.</div><div>Sell 1 by pressing Ctrl.</div><div>Sell 50 at once by pressing Shift+Ctrl.</div></div>';}});
				G.bulkDisplay=G.bulkDisplay.getElementsByClassName('box-bit-content')[0];
			}
			
			//log
			G.initLog();
			
			//info and settings
			var me=l('meta-button-info');
			G.addTooltip(me,{func:function(){return '<div class="title">Info & Stats</div><div class="desc"><div>View information about this game, and statistics about your playthrough.</div></div>';}});
			AddEvent(me,'click',function(){G.setMainPopup('info');});
			
			var me=l('meta-button-settings');
			G.addTooltip(me,{func:function(){return '<div class="title">Settings</div><div class="desc"><div>Import and export your game data, and edit settings for video, audio and gameplay.</div></div>';}});
			AddEvent(me,'click',function(){G.setMainPopup('settings');});
			
			G.darkenL=l('darken');
			AddEvent(G.darkenL,'click',function(){G.setMainPopup();});
			
			//setTimeout(function(){G.setMainPopup('settings');},100);
			
			G.mainPopup=0;
			G.mainPopupEl=0;
			G.setMainPopup=function(what)
			{
				if (what && what!=G.mainPopup)
				{
					if (G.mainPopupEl) G.closePopup(G.mainPopupEl);
					G.darkenL.className='on';
					if (what=='settings')
					{
						var text=`
						<div class="headerTitle">Settings</div>
						<div style="padding:4px;overflow-y:auto;">
						
							<div style="display:flex;justify-content:space-evenly;align-items:center;padding:8px;text-align:center;">
								<div>`+
								G.button({
									text:'Save',
									tooltip:'Save your game.<br>If Autosave is enabled, the game saves by itself every 30 seconds.<br>You may also save with Ctrl+S.',
									onclick:function(e){
										triggerAnim(e.target,'glow');
										G.save();
									},
								})
								+`<br>`+
								G.button({
									text:'Load',
									tooltip:'Reload your game.',
									onclick:function(e){
										triggerAnim(e.target,'glow');
										G.load();
									},
								})
								+`</div>
								<div>`+
								G.button({
									text:'Export',
									tooltip:'Export your save data to a file.<br>Use this to backup your save or to share it with other players.',
									onclick:function(e){
										triggerAnim(e.target,'glow');
										/*G.popup(0,{text:`
											<div class="headerTitle">Export save</div>
											<div style="padding:4px;overflow-y:auto;overflow-x:hidden;text-align:center;">
											<div>This is your save code.<br>Copy it and keep it somewhere safe!</div>
												<textarea id="textareaPrompt" style="margin-top:8px;width:100%;height:128px;overflow-x:hidden;
												overflow-y:scroll;" readonly>`+(0)+`</textarea>
												<div class="footerTitle hoverShine closesThePopup">Done</div>
											</div>
										`});*/
										G.fileSave();
									},
								})
								+`<br>`+
								G.button({
									text:'Import<input id="FileLoadInput" type="file" style="cursor:pointer;opacity:0;position:absolute;left:0px;top:0px;width:100%;height:100%;" onchange="G.fileLoad(event);"/>',
									tooltip:'Import save data from a file that was previously exported.',
									onclick:function(e){
										triggerAnim(e.target,'glow');
										/*G.popup(0,{text:`
											<div class="headerTitle">Import save</div>
											<div style="padding:4px;overflow-y:auto;overflow-x:hidden;text-align:center;">
											<div>Please paste in the code that was given to you on save export.</div>
												<textarea id="textareaPrompt" style="margin-top:8px;width:100%;height:128px;overflow-x:hidden;
												overflow-y:scroll;">`+(0)+`</textarea>
												<div class="footerTitle hoverShine closesThePopup">Load</div>
											</div>
										`});*/
									},
								})
								+`</div>
								<div>`+
								G.button({
									text:'Wipe',
									classes:'red',
									tooltip:'Wipe your data for this game.<br>You will lose all your progress.<br>This cannot be undone!',
									onclick:function(e){
										triggerAnim(e.target,'glow');
										G.clear();
									},
								})
								+`</div>
							</div>
							
							<div class="listing b">Autosave : `+G.makeTick({
								val:function(){return G.getSetting('autosave');},
								on:'On',off:'Off',
								func:function(val){G.setSetting('autosave',val);},
								tooltip:'If this is enabled, the game will auto-save every 30 seconds.',
							})+`</div>
							<div class="listing b">Number display : `+G.makeChoices({
								val:function(){return G.getSetting('numdisp');},
								func:function(val){G.setSetting('numdisp',val);},
								list:
								[
									{text:'Shortest',tooltip:'Numbers will be displayed in the form<br><b>1k, 1T, 1UnD</b>.'},
									{text:'Short',tooltip:'Numbers will be displayed in the form<br><b>1 thousand, 1 trillion, 1 undecillion</b>.'},
									{text:'Full',tooltip:'Numbers will be displayed in the form<br><b>1,000, 1,000,000,000,000, 1e+36</b>.'},
								],
							})+`</div>
							<div class="listing b">Particles : `+G.makeChoices({
								val:function(){return G.getSetting('particles');},
								func:function(val){G.setSetting('particles',val);},
								list:
								[
									{text:'None',tooltip:'No particles will be displayed.'},
									{text:'Low',tooltip:'Particles are displayed in low-performance mode.'},
									{text:'Auto',tooltip:'Particles are displayed in high-performance mode, but switch to low-performance mode in low fps.'},
									{text:'Full',tooltip:'Particles are displayed in high-performance mode.'},
								],
							})+`</div>
							<div class="listing b">CSS filters : `+G.makeTick({
								val:function(){return G.getSetting('cssfilts');},
								on:'On',off:'Off',
								func:function(val){G.setSetting('cssfilts',val);},
								tooltip:'CSS filters are visual effects such as blur and shadows which may lower performance in some browsers.',
							})+`</div>
							<div class="listing b">Show fps : `+G.makeTick({
								val:function(){return G.getSetting('showFPS');},
								on:'On',off:'Off',
								func:function(val){G.setSetting('showFPS',val);},
								tooltip:'Display the framerate graph in the bottom-left.',
							})+`</div>
						</div>
						`;
					}
					else if (what=='info')
					{
						var text=`
						<div class="headerTitle">Info</div>
						<div style="padding:4px;overflow-y:auto;">
							<div class="sectionTitle">About</div>
							<div class="listing">You are playing <b>`+G.name+`</b>`+(G.version?' v.'+B(G.version):'')+`, by <b>`+(G.author||'Anonymous')+`</b>.
							`+(G.forumPost?'<div><a href="http://forum.dashnet.org/discussion/'+G.forumPost+'" target="_blank">[View this game\'s forum post]</a></div>':'')+`
							</div>
							`+(G.desc?'<div class="listing desc"><div>'+G.getTextValue(G.desc)+'</div></div>':'')+`
							<div class="listing">Game started <b>`+G.selfUpdatingText(function(){return sayTime(parseInt(Date.now())-G.startDate);})+` ago</b>.</div>
							<div class="sectionTitle">Achievements</div>
							<div class="listing b" style="max-width:640px;margin:auto;">
								`+G.selfUpdatingText(function(){
									var str='';
									var owned=0;
									var total=0;
									for (var i in G.achievs)
									{
										var me=G.achievs[i];
										if (me.owned) {str+=me.getQuickDom();owned++;}
										total++;
									}
									str='<div>Owned : '+B(owned)+'/'+B(total)+'</div><div style="padding:8px;">'+str+'</div>';
									return str;
								},5)+`
							</div>
						</div>
						`;
						//TODO : custom stats
					}
					G.mainPopupEl=G.popup(0,{
						text:text+'<div class="footerTitle hoverShine closesThePopup">Close</div>',
						classes:'mainPopup',
						onClose:function(me){G.mainPopup=0;G.mainPopupEl=0;G.darkenL.className='off';},
					});
				}
				else if (G.mainPopupEl) {G.closePopup(G.mainPopupEl);what=0;}
				G.mainPopup=what;
				G.hideTooltip();
			}
			
			
			if (loadedData) G.doEffectsForAll('load');
			else G.doEffectsForAll('start');
			
			//all done!
			
			for (var i in game){G[i]=game[i];}
			return true;
		}
	}
	
	G.Reset();
}

G.turnOn=function()
{
	G.l.classList.add('on');
	G.domReady=true;
	G.playing=true;
}
G.turnOff=function()
{
	G.l.classList.remove('on');
	G.domReady=false;
	G.playing=false;
}

/*=====================================================================================
BASIC FLOW
=======================================================================================*/
G.Logic=function()
{
	if (G.playing)
	{
		if (G.T%G.fps==1) G.tick();
		for (var i in G.things)
		{
			G.things[i].logic();
		}
		if (G.itemsToRefresh) G.refreshItems();
		
		//keys
		if (G.keysD[27])//esc
		{
			if (G.popups.length>0) G.closePopup();
		}
		if (G.keys[17] && G.keysD[83])//ctrl-s
		{
			G.save();
		}
		
		var oldBulk=G.bulk;
		G.bulk=1;
		if (G.keys[16]) G.bulk=50;//shift
		if (G.keys[17]) G.bulk=-G.bulk;//ctrl
		if (G.bulk!=oldBulk && !G.noBulkParticles) G.particleAt(G.l,0,(G.bulk<0?'Selling '+B(-G.bulk):'Buying '+B(G.bulk)));
		
		if (G.getSetting('autosave') && (G.T+1)%(G.fps*30)==0) G.save();
	}
	G.shiniesLogic();
	G.particlesLogic();
	G.toastLogic();
}

G.Draw=function()
{
	if (G.playing)
	{
		for (var i in G.things)
		{
			G.things[i].draw();
		}
		
		if (G.bulkDisplay) G.bulkDisplay.innerHTML=(G.bulk>0?'Buying':'Selling')+' <b>'+B(Math.abs(G.bulk))+'</b>';
	}
	G.shiniesDraw();
	G.popupDraw();
	G.tooltipDraw();
}