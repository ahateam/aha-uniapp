var __pageFrameStartTime__ = Date.now();
var __webviewId__;
var __wxAppCode__ = {};
var __WXML_GLOBAL__ = {
  entrys: {},
  defines: {},
  modules: {},
  ops: [],
  wxs_nf_init: undefined,
  total_ops: 0
};
var $gwx;

/*v0.5vv_20190312_syb_scopedata*/window.__wcc_version__='v0.5vv_20190312_syb_scopedata';window.__wcc_version_info__={"customComponents":true,"fixZeroRpx":true,"propValueDeepCopy":false};
var $gwxc
var $gaic={}
$gwx=function(path,global){
if(typeof global === 'undefined') global={};if(typeof __WXML_GLOBAL__ === 'undefined') {__WXML_GLOBAL__={};
}__WXML_GLOBAL__.modules = __WXML_GLOBAL__.modules || {};
function _(a,b){if(typeof(b)!='undefined')a.children.push(b);}
function _v(k){if(typeof(k)!='undefined')return {tag:'virtual','wxKey':k,children:[]};return {tag:'virtual',children:[]};}
function _n(tag){$gwxc++;if($gwxc>=16000){throw 'Dom limit exceeded, please check if there\'s any mistake you\'ve made.'};return {tag:'wx-'+tag,attr:{},children:[],n:[],raw:{},generics:{}}}
function _p(a,b){b&&a.properities.push(b);}
function _s(scope,env,key){return typeof(scope[key])!='undefined'?scope[key]:env[key]}
function _wp(m){console.warn("WXMLRT_$gwx:"+m)}
function _wl(tname,prefix){_wp(prefix+':-1:-1:-1: Template `' + tname + '` is being called recursively, will be stop.')}
$gwn=console.warn;
$gwl=console.log;
function $gwh()
{
function x()
{
}
x.prototype = 
{
hn: function( obj, all )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && ( all || obj.__wxspec__ !== 'm' || this.hn(obj.__value__) === 'h' ) ? "h" : "n";
}
return "n";
},
nh: function( obj, special )
{
return { __value__: obj, __wxspec__: special ? special : true }
},
rv: function( obj )
{
return this.hn(obj,true)==='n'?obj:this.rv(obj.__value__);
},
hm: function( obj )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && (obj.__wxspec__ === 'm' || this.hm(obj.__value__) );
}
return false;
}
}
return new x;
}
wh=$gwh();
function $gstack(s){
var tmp=s.split('\n '+' '+' '+' ');
for(var i=0;i<tmp.length;++i){
if(0==i) continue;
if(")"===tmp[i][tmp[i].length-1])
tmp[i]=tmp[i].replace(/\s\(.*\)$/,"");
else
tmp[i]="at anonymous function";
}
return tmp.join('\n '+' '+' '+' ');
}
function $gwrt( should_pass_type_info )
{
function ArithmeticEv( ops, e, s, g, o )
{
var _f = false;
var rop = ops[0][1];
var _a,_b,_c,_d, _aa, _bb;
switch( rop )
{
case '?:':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : rev( ops[3], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '&&':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : wh.rv( _a );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '||':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? wh.rv(_a) : rev( ops[2], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '+':
case '*':
case '/':
case '%':
case '|':
case '^':
case '&':
case '===':
case '==':
case '!=':
case '!==':
case '>=':
case '<=':
case '>':
case '<':
case '<<':
case '>>':
_a = rev( ops[1], e, s, g, o, _f );
_b = rev( ops[2], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
switch( rop )
{
case '+':
_d = wh.rv( _a ) + wh.rv( _b );
break;
case '*':
_d = wh.rv( _a ) * wh.rv( _b );
break;
case '/':
_d = wh.rv( _a ) / wh.rv( _b );
break;
case '%':
_d = wh.rv( _a ) % wh.rv( _b );
break;
case '|':
_d = wh.rv( _a ) | wh.rv( _b );
break;
case '^':
_d = wh.rv( _a ) ^ wh.rv( _b );
break;
case '&':
_d = wh.rv( _a ) & wh.rv( _b );
break;
case '===':
_d = wh.rv( _a ) === wh.rv( _b );
break;
case '==':
_d = wh.rv( _a ) == wh.rv( _b );
break;
case '!=':
_d = wh.rv( _a ) != wh.rv( _b );
break;
case '!==':
_d = wh.rv( _a ) !== wh.rv( _b );
break;
case '>=':
_d = wh.rv( _a ) >= wh.rv( _b );
break;
case '<=':
_d = wh.rv( _a ) <= wh.rv( _b );
break;
case '>':
_d = wh.rv( _a ) > wh.rv( _b );
break;
case '<':
_d = wh.rv( _a ) < wh.rv( _b );
break;
case '<<':
_d = wh.rv( _a ) << wh.rv( _b );
break;
case '>>':
_d = wh.rv( _a ) >> wh.rv( _b );
break;
default:
break;
}
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '-':
_a = ops.length === 3 ? rev( ops[1], e, s, g, o, _f ) : 0;
_b = ops.length === 3 ? rev( ops[2], e, s, g, o, _f ) : rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
_d = _c ? wh.rv( _a ) - wh.rv( _b ) : _a - _b;
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '!':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = !wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
case '~':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = ~wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
default:
$gwn('unrecognized op' + rop );
}
}
function rev( ops, e, s, g, o, newap )
{
var op = ops[0];
var _f = false;
if ( typeof newap !== "undefined" ) o.ap = newap;
if( typeof(op)==='object' )
{
var vop=op[0];
var _a, _aa, _b, _bb, _c, _d, _s, _e, _ta, _tb, _td;
switch(vop)
{
case 2:
return ArithmeticEv(ops,e,s,g,o);
break;
case 4: 
return rev( ops[1], e, s, g, o, _f );
break;
case 5: 
switch( ops.length )
{
case 2: 
_a = rev( ops[1],e,s,g,o,_f );
return should_pass_type_info?[_a]:[wh.rv(_a)];
return [_a];
break;
case 1: 
return [];
break;
default:
_a = rev( ops[1],e,s,g,o,_f );
_b = rev( ops[2],e,s,g,o,_f );
_a.push( 
should_pass_type_info ?
_b :
wh.rv( _b )
);
return _a;
break;
}
break;
case 6:
_a = rev(ops[1],e,s,g,o);
var ap = o.ap;
_ta = wh.hn(_a)==='h';
_aa = _ta ? wh.rv(_a) : _a;
o.is_affected |= _ta;
if( should_pass_type_info )
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return _ta ? wh.nh(undefined, 'e') : undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return (_ta || _tb) ? wh.nh(undefined, 'e') : undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return (_ta || _tb) ? (_td ? _d : wh.nh(_d, 'e')) : _d;
}
else
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return _td ? wh.rv(_d) : _d;
}
case 7: 
switch(ops[1][0])
{
case 11:
o.is_affected |= wh.hn(g)==='h';
return g;
case 3:
_s = wh.rv( s );
_e = wh.rv( e );
_b = ops[1][1];
if (g && g.f && g.f.hasOwnProperty(_b) )
{
_a = g.f;
o.ap = true;
}
else
{
_a = _s && _s.hasOwnProperty(_b) ? 
s : (_e && _e.hasOwnProperty(_b) ? e : undefined );
}
if( should_pass_type_info )
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
_d = _ta && !_td ? wh.nh(_d,'e') : _d;
return _d;
}
}
else
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
return wh.rv(_d);
}
}
return undefined;
}
break;
case 8: 
_a = {};
_a[ops[1]] = rev(ops[2],e,s,g,o,_f);
return _a;
break;
case 9: 
_a = rev(ops[1],e,s,g,o,_f);
_b = rev(ops[2],e,s,g,o,_f);
function merge( _a, _b, _ow )
{
var ka, _bbk;
_ta = wh.hn(_a)==='h';
_tb = wh.hn(_b)==='h';
_aa = wh.rv(_a);
_bb = wh.rv(_b);
for(var k in _bb)
{
if ( _ow || !_aa.hasOwnProperty(k) )
{
_aa[k] = should_pass_type_info ? (_tb ? wh.nh(_bb[k],'e') : _bb[k]) : wh.rv(_bb[k]);
}
}
return _a;
}
var _c = _a
var _ow = true
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
_a = _b
_b = _c
_ow = false
}
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
var _r = {}
return merge( merge( _r, _a, _ow ), _b, _ow );
}
else
return merge( _a, _b, _ow );
break;
case 10:
_a = rev(ops[1],e,s,g,o,_f);
_a = should_pass_type_info ? _a : wh.rv( _a );
return _a ;
break;
case 12:
var _r;
_a = rev(ops[1],e,s,g,o);
if ( !o.ap )
{
return should_pass_type_info && wh.hn(_a)==='h' ? wh.nh( _r, 'f' ) : _r;
}
var ap = o.ap;
_b = rev(ops[2],e,s,g,o,_f);
o.ap = ap;
_ta = wh.hn(_a)==='h';
_tb = _ca(_b);
_aa = wh.rv(_a);	
_bb = wh.rv(_b); snap_bb=$gdc(_bb,"nv_");
try{
_r = typeof _aa === "function" ? $gdc(_aa.apply(null, snap_bb)) : undefined;
} catch (e){
e.message = e.message.replace(/nv_/g,"");
e.stack = e.stack.substring(0,e.stack.indexOf("\n", e.stack.lastIndexOf("at nv_")));
e.stack = e.stack.replace(/\snv_/g," "); 
e.stack = $gstack(e.stack);	
if(g.debugInfo)
{
e.stack += "\n "+" "+" "+" at "+g.debugInfo[0]+":"+g.debugInfo[1]+":"+g.debugInfo[2];
console.error(e);
}
_r = undefined;
}
return should_pass_type_info && (_tb || _ta) ? wh.nh( _r, 'f' ) : _r;
}
}
else
{
if( op === 3 || op === 1) return ops[1];
else if( op === 11 ) 
{
var _a='';
for( var i = 1 ; i < ops.length ; i++ )
{
var xp = wh.rv(rev(ops[i],e,s,g,o,_f));
_a += typeof(xp) === 'undefined' ? '' : xp;
}
return _a;
}
}
}
function wrapper( ops, e, s, g, o, newap )
{
if( ops[0] == '11182016' )
{
g.debugInfo = ops[2];
return rev( ops[1], e, s, g, o, newap );
}
else
{
g.debugInfo = null;
return rev( ops, e, s, g, o, newap );
}
}
return wrapper;
}
gra=$gwrt(true); 
grb=$gwrt(false); 
function TestTest( expr, ops, e,s,g, expect_a, expect_b, expect_affected )
{
{
var o = {is_affected:false};
var a = gra( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_a )
|| o.is_affected != expect_affected )
{
console.warn( "A. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_a ) + ", " + expect_affected + " is expected" );
}
}
{
var o = {is_affected:false};
var a = grb( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_b )
|| o.is_affected != expect_affected )
{
console.warn( "B. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_b ) + ", " + expect_affected + " is expected" );
}
}
}

function wfor( to_iter, func, env, _s, global, father, itemname, indexname, keyname )
{
var _n = wh.hn( to_iter ) === 'n'; 
var scope = wh.rv( _s ); 
var has_old_item = scope.hasOwnProperty(itemname);
var has_old_index = scope.hasOwnProperty(indexname);
var old_item = scope[itemname];
var old_index = scope[indexname];
var full = Object.prototype.toString.call(wh.rv(to_iter));
var type = full[8]; 
if( type === 'N' && full[10] === 'l' ) type = 'X'; 
var _y;
if( _n )
{
if( type === 'A' ) 
{
var r_iter_item;
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
r_iter_item = wh.rv(to_iter[i]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i = 0;
var r_iter_item;
for( var k in to_iter )
{
scope[itemname] = to_iter[k];
scope[indexname] = _n ? k : wh.nh(k, 'h');
r_iter_item = wh.rv(to_iter[k]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env,scope,_y,global );
i++;
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env,scope,_y,global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < to_iter ; i++ )
{
scope[itemname] = i;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
else
{
var r_to_iter = wh.rv(to_iter);
var r_iter_item, iter_item;
if( type === 'A' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = r_to_iter[i];
iter_item = wh.hn(iter_item)==='n' ? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item
scope[indexname] = _n ? i : wh.nh(i, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i=0;
for( var k in r_to_iter )
{
iter_item = r_to_iter[k];
iter_item = wh.hn(iter_item)==='n'? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item;
scope[indexname] = _n ? k : wh.nh(k, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y=_v(key);
_(father,_y);
func( env, scope, _y, global );
i++
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = wh.nh(r_to_iter[i],'h');
scope[itemname] = iter_item;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < r_to_iter ; i++ )
{
iter_item = wh.nh(i,'h');
scope[itemname] = iter_item;
scope[indexname]= _n ? i : wh.nh(i,'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
if(has_old_item)
{
scope[itemname]=old_item;
}
else
{
delete scope[itemname];
}
if(has_old_index)
{
scope[indexname]=old_index;
}
else
{
delete scope[indexname];
}
}

function _ca(o)
{ 
if ( wh.hn(o) == 'h' ) return true;
if ( typeof o !== "object" ) return false;
for(var i in o){ 
if ( o.hasOwnProperty(i) ){
if (_ca(o[i])) return true;
}
}
return false;
}
function _da( node, attrname, opindex, raw, o )
{
var isaffected = false;
var value = $gdc( raw, "", 2 );
if ( o.ap && value && value.constructor===Function ) 
{
attrname = "$wxs:" + attrname; 
node.attr["$gdc"] = $gdc;
}
if ( o.is_affected || _ca(raw) ) 
{
node.n.push( attrname );
node.raw[attrname] = raw;
}
node.attr[attrname] = value;
}
function _r( node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _rz( z, node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _o( opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _oz( z, opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _1( opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _1z( z, opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _2( opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1( opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}
function _2z( z, opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1z( z, opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}


function _m(tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_r(tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}
function _mz(z,tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_rz(z, tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}

var nf_init=function(){
if(typeof __WXML_GLOBAL__==="undefined"||undefined===__WXML_GLOBAL__.wxs_nf_init){
nf_init_Object();nf_init_Function();nf_init_Array();nf_init_String();nf_init_Boolean();nf_init_Number();nf_init_Math();nf_init_Date();nf_init_RegExp();
}
if(typeof __WXML_GLOBAL__!=="undefined") __WXML_GLOBAL__.wxs_nf_init=true;
};
var nf_init_Object=function(){
Object.defineProperty(Object.prototype,"nv_constructor",{writable:true,value:"Object"})
Object.defineProperty(Object.prototype,"nv_toString",{writable:true,value:function(){return "[object Object]"}})
}
var nf_init_Function=function(){
Object.defineProperty(Function.prototype,"nv_constructor",{writable:true,value:"Function"})
Object.defineProperty(Function.prototype,"nv_length",{get:function(){return this.length;},set:function(){}});
Object.defineProperty(Function.prototype,"nv_toString",{writable:true,value:function(){return "[function Function]"}})
}
var nf_init_Array=function(){
Object.defineProperty(Array.prototype,"nv_toString",{writable:true,value:function(){return this.nv_join();}})
Object.defineProperty(Array.prototype,"nv_join",{writable:true,value:function(s){
s=undefined==s?',':s;
var r="";
for(var i=0;i<this.length;++i){
if(0!=i) r+=s;
if(null==this[i]||undefined==this[i]) r+='';	
else if(typeof this[i]=='function') r+=this[i].nv_toString();
else if(typeof this[i]=='object'&&this[i].nv_constructor==="Array") r+=this[i].nv_join();
else r+=this[i].toString();
}
return r;
}})
Object.defineProperty(Array.prototype,"nv_constructor",{writable:true,value:"Array"})
Object.defineProperty(Array.prototype,"nv_concat",{writable:true,value:Array.prototype.concat})
Object.defineProperty(Array.prototype,"nv_pop",{writable:true,value:Array.prototype.pop})
Object.defineProperty(Array.prototype,"nv_push",{writable:true,value:Array.prototype.push})
Object.defineProperty(Array.prototype,"nv_reverse",{writable:true,value:Array.prototype.reverse})
Object.defineProperty(Array.prototype,"nv_shift",{writable:true,value:Array.prototype.shift})
Object.defineProperty(Array.prototype,"nv_slice",{writable:true,value:Array.prototype.slice})
Object.defineProperty(Array.prototype,"nv_sort",{writable:true,value:Array.prototype.sort})
Object.defineProperty(Array.prototype,"nv_splice",{writable:true,value:Array.prototype.splice})
Object.defineProperty(Array.prototype,"nv_unshift",{writable:true,value:Array.prototype.unshift})
Object.defineProperty(Array.prototype,"nv_indexOf",{writable:true,value:Array.prototype.indexOf})
Object.defineProperty(Array.prototype,"nv_lastIndexOf",{writable:true,value:Array.prototype.lastIndexOf})
Object.defineProperty(Array.prototype,"nv_every",{writable:true,value:Array.prototype.every})
Object.defineProperty(Array.prototype,"nv_some",{writable:true,value:Array.prototype.some})
Object.defineProperty(Array.prototype,"nv_forEach",{writable:true,value:Array.prototype.forEach})
Object.defineProperty(Array.prototype,"nv_map",{writable:true,value:Array.prototype.map})
Object.defineProperty(Array.prototype,"nv_filter",{writable:true,value:Array.prototype.filter})
Object.defineProperty(Array.prototype,"nv_reduce",{writable:true,value:Array.prototype.reduce})
Object.defineProperty(Array.prototype,"nv_reduceRight",{writable:true,value:Array.prototype.reduceRight})
Object.defineProperty(Array.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_String=function(){
Object.defineProperty(String.prototype,"nv_constructor",{writable:true,value:"String"})
Object.defineProperty(String.prototype,"nv_toString",{writable:true,value:String.prototype.toString})
Object.defineProperty(String.prototype,"nv_valueOf",{writable:true,value:String.prototype.valueOf})
Object.defineProperty(String.prototype,"nv_charAt",{writable:true,value:String.prototype.charAt})
Object.defineProperty(String.prototype,"nv_charCodeAt",{writable:true,value:String.prototype.charCodeAt})
Object.defineProperty(String.prototype,"nv_concat",{writable:true,value:String.prototype.concat})
Object.defineProperty(String.prototype,"nv_indexOf",{writable:true,value:String.prototype.indexOf})
Object.defineProperty(String.prototype,"nv_lastIndexOf",{writable:true,value:String.prototype.lastIndexOf})
Object.defineProperty(String.prototype,"nv_localeCompare",{writable:true,value:String.prototype.localeCompare})
Object.defineProperty(String.prototype,"nv_match",{writable:true,value:String.prototype.match})
Object.defineProperty(String.prototype,"nv_replace",{writable:true,value:String.prototype.replace})
Object.defineProperty(String.prototype,"nv_search",{writable:true,value:String.prototype.search})
Object.defineProperty(String.prototype,"nv_slice",{writable:true,value:String.prototype.slice})
Object.defineProperty(String.prototype,"nv_split",{writable:true,value:String.prototype.split})
Object.defineProperty(String.prototype,"nv_substring",{writable:true,value:String.prototype.substring})
Object.defineProperty(String.prototype,"nv_toLowerCase",{writable:true,value:String.prototype.toLowerCase})
Object.defineProperty(String.prototype,"nv_toLocaleLowerCase",{writable:true,value:String.prototype.toLocaleLowerCase})
Object.defineProperty(String.prototype,"nv_toUpperCase",{writable:true,value:String.prototype.toUpperCase})
Object.defineProperty(String.prototype,"nv_toLocaleUpperCase",{writable:true,value:String.prototype.toLocaleUpperCase})
Object.defineProperty(String.prototype,"nv_trim",{writable:true,value:String.prototype.trim})
Object.defineProperty(String.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_Boolean=function(){
Object.defineProperty(Boolean.prototype,"nv_constructor",{writable:true,value:"Boolean"})
Object.defineProperty(Boolean.prototype,"nv_toString",{writable:true,value:Boolean.prototype.toString})
Object.defineProperty(Boolean.prototype,"nv_valueOf",{writable:true,value:Boolean.prototype.valueOf})
}
var nf_init_Number=function(){
Object.defineProperty(Number,"nv_MAX_VALUE",{writable:false,value:Number.MAX_VALUE})
Object.defineProperty(Number,"nv_MIN_VALUE",{writable:false,value:Number.MIN_VALUE})
Object.defineProperty(Number,"nv_NEGATIVE_INFINITY",{writable:false,value:Number.NEGATIVE_INFINITY})
Object.defineProperty(Number,"nv_POSITIVE_INFINITY",{writable:false,value:Number.POSITIVE_INFINITY})
Object.defineProperty(Number.prototype,"nv_constructor",{writable:true,value:"Number"})
Object.defineProperty(Number.prototype,"nv_toString",{writable:true,value:Number.prototype.toString})
Object.defineProperty(Number.prototype,"nv_toLocaleString",{writable:true,value:Number.prototype.toLocaleString})
Object.defineProperty(Number.prototype,"nv_valueOf",{writable:true,value:Number.prototype.valueOf})
Object.defineProperty(Number.prototype,"nv_toFixed",{writable:true,value:Number.prototype.toFixed})
Object.defineProperty(Number.prototype,"nv_toExponential",{writable:true,value:Number.prototype.toExponential})
Object.defineProperty(Number.prototype,"nv_toPrecision",{writable:true,value:Number.prototype.toPrecision})
}
var nf_init_Math=function(){
Object.defineProperty(Math,"nv_E",{writable:false,value:Math.E})
Object.defineProperty(Math,"nv_LN10",{writable:false,value:Math.LN10})
Object.defineProperty(Math,"nv_LN2",{writable:false,value:Math.LN2})
Object.defineProperty(Math,"nv_LOG2E",{writable:false,value:Math.LOG2E})
Object.defineProperty(Math,"nv_LOG10E",{writable:false,value:Math.LOG10E})
Object.defineProperty(Math,"nv_PI",{writable:false,value:Math.PI})
Object.defineProperty(Math,"nv_SQRT1_2",{writable:false,value:Math.SQRT1_2})
Object.defineProperty(Math,"nv_SQRT2",{writable:false,value:Math.SQRT2})
Object.defineProperty(Math,"nv_abs",{writable:false,value:Math.abs})
Object.defineProperty(Math,"nv_acos",{writable:false,value:Math.acos})
Object.defineProperty(Math,"nv_asin",{writable:false,value:Math.asin})
Object.defineProperty(Math,"nv_atan",{writable:false,value:Math.atan})
Object.defineProperty(Math,"nv_atan2",{writable:false,value:Math.atan2})
Object.defineProperty(Math,"nv_ceil",{writable:false,value:Math.ceil})
Object.defineProperty(Math,"nv_cos",{writable:false,value:Math.cos})
Object.defineProperty(Math,"nv_exp",{writable:false,value:Math.exp})
Object.defineProperty(Math,"nv_floor",{writable:false,value:Math.floor})
Object.defineProperty(Math,"nv_log",{writable:false,value:Math.log})
Object.defineProperty(Math,"nv_max",{writable:false,value:Math.max})
Object.defineProperty(Math,"nv_min",{writable:false,value:Math.min})
Object.defineProperty(Math,"nv_pow",{writable:false,value:Math.pow})
Object.defineProperty(Math,"nv_random",{writable:false,value:Math.random})
Object.defineProperty(Math,"nv_round",{writable:false,value:Math.round})
Object.defineProperty(Math,"nv_sin",{writable:false,value:Math.sin})
Object.defineProperty(Math,"nv_sqrt",{writable:false,value:Math.sqrt})
Object.defineProperty(Math,"nv_tan",{writable:false,value:Math.tan})
}
var nf_init_Date=function(){
Object.defineProperty(Date.prototype,"nv_constructor",{writable:true,value:"Date"})
Object.defineProperty(Date,"nv_parse",{writable:true,value:Date.parse})
Object.defineProperty(Date,"nv_UTC",{writable:true,value:Date.UTC})
Object.defineProperty(Date,"nv_now",{writable:true,value:Date.now})
Object.defineProperty(Date.prototype,"nv_toString",{writable:true,value:Date.prototype.toString})
Object.defineProperty(Date.prototype,"nv_toDateString",{writable:true,value:Date.prototype.toDateString})
Object.defineProperty(Date.prototype,"nv_toTimeString",{writable:true,value:Date.prototype.toTimeString})
Object.defineProperty(Date.prototype,"nv_toLocaleString",{writable:true,value:Date.prototype.toLocaleString})
Object.defineProperty(Date.prototype,"nv_toLocaleDateString",{writable:true,value:Date.prototype.toLocaleDateString})
Object.defineProperty(Date.prototype,"nv_toLocaleTimeString",{writable:true,value:Date.prototype.toLocaleTimeString})
Object.defineProperty(Date.prototype,"nv_valueOf",{writable:true,value:Date.prototype.valueOf})
Object.defineProperty(Date.prototype,"nv_getTime",{writable:true,value:Date.prototype.getTime})
Object.defineProperty(Date.prototype,"nv_getFullYear",{writable:true,value:Date.prototype.getFullYear})
Object.defineProperty(Date.prototype,"nv_getUTCFullYear",{writable:true,value:Date.prototype.getUTCFullYear})
Object.defineProperty(Date.prototype,"nv_getMonth",{writable:true,value:Date.prototype.getMonth})
Object.defineProperty(Date.prototype,"nv_getUTCMonth",{writable:true,value:Date.prototype.getUTCMonth})
Object.defineProperty(Date.prototype,"nv_getDate",{writable:true,value:Date.prototype.getDate})
Object.defineProperty(Date.prototype,"nv_getUTCDate",{writable:true,value:Date.prototype.getUTCDate})
Object.defineProperty(Date.prototype,"nv_getDay",{writable:true,value:Date.prototype.getDay})
Object.defineProperty(Date.prototype,"nv_getUTCDay",{writable:true,value:Date.prototype.getUTCDay})
Object.defineProperty(Date.prototype,"nv_getHours",{writable:true,value:Date.prototype.getHours})
Object.defineProperty(Date.prototype,"nv_getUTCHours",{writable:true,value:Date.prototype.getUTCHours})
Object.defineProperty(Date.prototype,"nv_getMinutes",{writable:true,value:Date.prototype.getMinutes})
Object.defineProperty(Date.prototype,"nv_getUTCMinutes",{writable:true,value:Date.prototype.getUTCMinutes})
Object.defineProperty(Date.prototype,"nv_getSeconds",{writable:true,value:Date.prototype.getSeconds})
Object.defineProperty(Date.prototype,"nv_getUTCSeconds",{writable:true,value:Date.prototype.getUTCSeconds})
Object.defineProperty(Date.prototype,"nv_getMilliseconds",{writable:true,value:Date.prototype.getMilliseconds})
Object.defineProperty(Date.prototype,"nv_getUTCMilliseconds",{writable:true,value:Date.prototype.getUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_getTimezoneOffset",{writable:true,value:Date.prototype.getTimezoneOffset})
Object.defineProperty(Date.prototype,"nv_setTime",{writable:true,value:Date.prototype.setTime})
Object.defineProperty(Date.prototype,"nv_setMilliseconds",{writable:true,value:Date.prototype.setMilliseconds})
Object.defineProperty(Date.prototype,"nv_setUTCMilliseconds",{writable:true,value:Date.prototype.setUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_setSeconds",{writable:true,value:Date.prototype.setSeconds})
Object.defineProperty(Date.prototype,"nv_setUTCSeconds",{writable:true,value:Date.prototype.setUTCSeconds})
Object.defineProperty(Date.prototype,"nv_setMinutes",{writable:true,value:Date.prototype.setMinutes})
Object.defineProperty(Date.prototype,"nv_setUTCMinutes",{writable:true,value:Date.prototype.setUTCMinutes})
Object.defineProperty(Date.prototype,"nv_setHours",{writable:true,value:Date.prototype.setHours})
Object.defineProperty(Date.prototype,"nv_setUTCHours",{writable:true,value:Date.prototype.setUTCHours})
Object.defineProperty(Date.prototype,"nv_setDate",{writable:true,value:Date.prototype.setDate})
Object.defineProperty(Date.prototype,"nv_setUTCDate",{writable:true,value:Date.prototype.setUTCDate})
Object.defineProperty(Date.prototype,"nv_setMonth",{writable:true,value:Date.prototype.setMonth})
Object.defineProperty(Date.prototype,"nv_setUTCMonth",{writable:true,value:Date.prototype.setUTCMonth})
Object.defineProperty(Date.prototype,"nv_setFullYear",{writable:true,value:Date.prototype.setFullYear})
Object.defineProperty(Date.prototype,"nv_setUTCFullYear",{writable:true,value:Date.prototype.setUTCFullYear})
Object.defineProperty(Date.prototype,"nv_toUTCString",{writable:true,value:Date.prototype.toUTCString})
Object.defineProperty(Date.prototype,"nv_toISOString",{writable:true,value:Date.prototype.toISOString})
Object.defineProperty(Date.prototype,"nv_toJSON",{writable:true,value:Date.prototype.toJSON})
}
var nf_init_RegExp=function(){
Object.defineProperty(RegExp.prototype,"nv_constructor",{writable:true,value:"RegExp"})
Object.defineProperty(RegExp.prototype,"nv_exec",{writable:true,value:RegExp.prototype.exec})
Object.defineProperty(RegExp.prototype,"nv_test",{writable:true,value:RegExp.prototype.test})
Object.defineProperty(RegExp.prototype,"nv_toString",{writable:true,value:RegExp.prototype.toString})
Object.defineProperty(RegExp.prototype,"nv_source",{get:function(){return this.source;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_global",{get:function(){return this.global;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_ignoreCase",{get:function(){return this.ignoreCase;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_multiline",{get:function(){return this.multiline;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_lastIndex",{get:function(){return this.lastIndex;},set:function(v){this.lastIndex=v;}});
}
nf_init();
var nv_getDate=function(){var args=Array.prototype.slice.call(arguments);args.unshift(Date);return new(Function.prototype.bind.apply(Date, args));}
var nv_getRegExp=function(){var args=Array.prototype.slice.call(arguments);args.unshift(RegExp);return new(Function.prototype.bind.apply(RegExp, args));}
var nv_console={}
nv_console.nv_log=function(){var res="WXSRT:";for(var i=0;i<arguments.length;++i)res+=arguments[i]+" ";console.log(res);}
var nv_parseInt = parseInt, nv_parseFloat = parseFloat, nv_isNaN = isNaN, nv_isFinite = isFinite, nv_decodeURI = decodeURI, nv_decodeURIComponent = decodeURIComponent, nv_encodeURI = encodeURI, nv_encodeURIComponent = encodeURIComponent;
function $gdc(o,p,r) {
o=wh.rv(o);
if(o===null||o===undefined) return o;
if(o.constructor===String||o.constructor===Boolean||o.constructor===Number) return o;
if(o.constructor===Object){
var copy={};
for(var k in o)
if(o.hasOwnProperty(k))
if(undefined===p) copy[k.substring(3)]=$gdc(o[k],p,r);
else copy[p+k]=$gdc(o[k],p,r);
return copy;
}
if(o.constructor===Array){
var copy=[];
for(var i=0;i<o.length;i++) copy.push($gdc(o[i],p,r));
return copy;
}
if(o.constructor===Date){
var copy=new Date();
copy.setTime(o.getTime());
return copy;
}
if(o.constructor===RegExp){
var f="";
if(o.global) f+="g";
if(o.ignoreCase) f+="i";
if(o.multiline) f+="m";
return (new RegExp(o.source,f));
}
if(r&&o.constructor===Function){
if ( r == 1 ) return $gdc(o(),undefined, 2);
if ( r == 2 ) return o;
}
return null;
}
var nv_JSON={}
nv_JSON.nv_stringify=function(o){
JSON.stringify(o);
return JSON.stringify($gdc(o));
}
nv_JSON.nv_parse=function(o){
if(o===undefined) return undefined;
var t=JSON.parse(o);
return $gdc(t,'nv_');
}

function _af(p, a, c){
p.extraAttr = {"t_action": a, "t_cid": c};
}

function _gv( )
{if( typeof( window.__webview_engine_version__) == 'undefined' ) return 0.0;
return window.__webview_engine_version__;}
function _ai(i,p,e,me,r,c){var x=_grp(p,e,me);if(x)i.push(x);else{i.push('');_wp(me+':import:'+r+':'+c+': Path `'+p+'` not found from `'+me+'`.')}}
function _grp(p,e,me){if(p[0]!='/'){var mepart=me.split('/');mepart.pop();var ppart=p.split('/');for(var i=0;i<ppart.length;i++){if( ppart[i]=='..')mepart.pop();else if(!ppart[i]||ppart[i]=='.')continue;else mepart.push(ppart[i]);}p=mepart.join('/');}if(me[0]=='.'&&p[0]=='/')p='.'+p;if(e[p])return p;if(e[p+'.wxml'])return p+'.wxml';}
function _gd(p,c,e,d){if(!c)return;if(d[p][c])return d[p][c];for(var x=e[p].i.length-1;x>=0;x--){if(e[p].i[x]&&d[e[p].i[x]][c])return d[e[p].i[x]][c]};for(var x=e[p].ti.length-1;x>=0;x--){var q=_grp(e[p].ti[x],e,p);if(q&&d[q][c])return d[q][c]}var ii=_gapi(e,p);for(var x=0;x<ii.length;x++){if(ii[x]&&d[ii[x]][c])return d[ii[x]][c]}for(var k=e[p].j.length-1;k>=0;k--)if(e[p].j[k]){for(var q=e[e[p].j[k]].ti.length-1;q>=0;q--){var pp=_grp(e[e[p].j[k]].ti[q],e,p);if(pp&&d[pp][c]){return d[pp][c]}}}}
function _gapi(e,p){if(!p)return [];if($gaic[p]){return $gaic[p]};var ret=[],q=[],h=0,t=0,put={},visited={};q.push(p);visited[p]=true;t++;while(h<t){var a=q[h++];for(var i=0;i<e[a].ic.length;i++){var nd=e[a].ic[i];var np=_grp(nd,e,a);if(np&&!visited[np]){visited[np]=true;q.push(np);t++;}}for(var i=0;a!=p&&i<e[a].ti.length;i++){var ni=e[a].ti[i];var nm=_grp(ni,e,a);if(nm&&!put[nm]){put[nm]=true;ret.push(nm);}}}$gaic[p]=ret;return ret;}
var $ixc={};function _ic(p,ent,me,e,s,r,gg){var x=_grp(p,ent,me);ent[me].j.push(x);if(x){if($ixc[x]){_wp('-1:include:-1:-1: `'+p+'` is being included in a loop, will be stop.');return;}$ixc[x]=true;try{ent[x].f(e,s,r,gg)}catch(e){}$ixc[x]=false;}else{_wp(me+':include:-1:-1: Included path `'+p+'` not found from `'+me+'`.')}}
function _w(tn,f,line,c){_wp(f+':template:'+line+':'+c+': Template `'+tn+'` not found.');}function _ev(dom){var changed=false;delete dom.properities;delete dom.n;if(dom.children){do{changed=false;var newch = [];for(var i=0;i<dom.children.length;i++){var ch=dom.children[i];if( ch.tag=='virtual'){changed=true;for(var j=0;ch.children&&j<ch.children.length;j++){newch.push(ch.children[j]);}}else { newch.push(ch); } } dom.children = newch; }while(changed);for(var i=0;i<dom.children.length;i++){_ev(dom.children[i]);}} return dom; }
function _tsd( root )
{
if( root.tag == "wx-wx-scope" ) 
{
root.tag = "virtual";
root.wxCkey = "11";
root['wxScopeData'] = root.attr['wx:scope-data'];
delete root.n;
delete root.raw;
delete root.generics;
delete root.attr;
}
for( var i = 0 ; root.children && i < root.children.length ; i++ )
{
_tsd( root.children[i] );
}
return root;
}

var e_={}
if(typeof(global.entrys)==='undefined')global.entrys={};e_=global.entrys;
var d_={}
if(typeof(global.defines)==='undefined')global.defines={};d_=global.defines;
var f_={}
if(typeof(global.modules)==='undefined')global.modules={};f_=global.modules || {};
var p_={}
__WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
__WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
__WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
var z=__WXML_GLOBAL__.ops_set.$gwx || [];
function gz$gwx_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_1)return __WXML_GLOBAL__.ops_cached.$gwx_1
__WXML_GLOBAL__.ops_cached.$gwx_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__e'])
Z([[4],[[5],[[5],[1,'uni-icon']],[[2,'+'],[1,'uni-icon-'],[[7],[3,'type']]]]])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[1,'onClick']]]]]]]]])
Z([[2,'+'],[[2,'+'],[[2,'+'],[1,'color:'],[[7],[3,'color']]],[1,';']],[[2,'+'],[[2,'+'],[1,'font-size:'],[[7],[3,'fontSize']]],[1,';']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_1);return __WXML_GLOBAL__.ops_cached.$gwx_1
}
function gz$gwx_2(){
if( __WXML_GLOBAL__.ops_cached.$gwx_2)return __WXML_GLOBAL__.ops_cached.$gwx_2
__WXML_GLOBAL__.ops_cached.$gwx_2=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[7],[3,'show']])
Z([3,'__e'])
Z([3,'uni-noticebar'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'onClick']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[2,'+'],[[2,'+'],[[2,'+'],[1,'background-color:'],[[7],[3,'backgroundColor']]],[1,';']],[[2,'+'],[[2,'+'],[1,'color:'],[[7],[3,'color']]],[1,';']]])
Z([[2,'||'],[[2,'==='],[[7],[3,'showClose']],[1,'true']],[[2,'==='],[[7],[3,'showClose']],[1,true]]])
Z([3,'uni-noticebar__close'])
Z([3,'__l'])
Z([3,'12'])
Z([3,'closefill'])
Z([3,'1'])
Z([[4],[[5],[[5],[1,'uni-noticebar__content']],[[7],[3,'setContenClass']]]])
Z([[2,'||'],[[2,'==='],[[7],[3,'showIcon']],[1,'true']],[[2,'==='],[[7],[3,'showIcon']],[1,true]]])
Z([3,'uni-noticebar__content-icon'])
Z(z[4])
Z(z[7])
Z([[7],[3,'color']])
Z([3,'14'])
Z([3,'sound'])
Z([3,'2'])
Z([[4],[[5],[[5],[1,'uni-noticebar__content-text']],[[7],[3,'setTextClass']]]])
Z([3,'uni-noticebar__content-inner'])
Z([[7],[3,'elId']])
Z([[2,'+'],[[2,'+'],[[2,'+'],[1,'animation:'],[[7],[3,'animation']]],[1,';']],[[2,'+'],[[2,'+'],[1,'-webkit-animation:'],[[7],[3,'animation']]],[1,';']]])
Z([a,[[7],[3,'text']]])
Z([[2,'||'],[[2,'==='],[[7],[3,'showGetMore']],[1,'true']],[[2,'==='],[[7],[3,'showGetMore']],[1,true]]])
Z(z[1])
Z([3,'uni-noticebar__content-more'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'clickMore']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[2,'+'],[[2,'+'],[1,'width:'],[[2,'?:'],[[7],[3,'moreText']],[1,'180upx'],[1,'20px']]],[1,';']])
Z([[7],[3,'moreText']])
Z([3,'uni-noticebar__content-more-text'])
Z([a,[[7],[3,'moreText']]])
Z(z[7])
Z(z[17])
Z([3,'arrowright'])
Z([3,'3'])
})(__WXML_GLOBAL__.ops_cached.$gwx_2);return __WXML_GLOBAL__.ops_cached.$gwx_2
}
function gz$gwx_3(){
if( __WXML_GLOBAL__.ops_cached.$gwx_3)return __WXML_GLOBAL__.ops_cached.$gwx_3
__WXML_GLOBAL__.ops_cached.$gwx_3=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'about'])
})(__WXML_GLOBAL__.ops_cached.$gwx_3);return __WXML_GLOBAL__.ops_cached.$gwx_3
}
function gz$gwx_4(){
if( __WXML_GLOBAL__.ops_cached.$gwx_4)return __WXML_GLOBAL__.ops_cached.$gwx_4
__WXML_GLOBAL__.ops_cached.$gwx_4=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'#cce0fe'])
Z([3,'__l'])
Z([3,'true'])
Z([3,'[多行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，'])
Z([3,'1'])
Z([3,'swiper_box'])
Z(z[2])
Z([3,'swiper_style'])
Z([3,'#d7cbd1'])
Z([3,'rgba(255, 255, 255, 0.3)'])
Z(z[2])
Z([3,'../../static/a.jpg'])
Z(z[11])
Z(z[11])
Z([3,'content'])
Z([3,'content_box'])
Z([3,'../login/login'])
Z([3,'content_box_text'])
Z([3,'我的投票'])
Z(z[15])
Z([3,'background-color:#9788ff;'])
Z(z[17])
Z([3,'集体资产'])
Z(z[15])
Z([3,'background-color:#fb7eb8;'])
Z(z[17])
Z([3,'我的分红'])
Z(z[15])
Z(z[17])
Z([3,'我的机构'])
Z(z[15])
Z(z[20])
Z(z[17])
Z([3,'我的公告'])
Z(z[15])
Z(z[24])
Z(z[17])
Z([3,'我的审批'])
Z(z[15])
Z(z[17])
Z([3,'发起投票'])
Z(z[15])
Z(z[20])
Z(z[17])
Z([3,'职务管理'])
Z(z[15])
Z(z[24])
Z(z[17])
Z([3,'个人信息'])
Z(z[15])
Z(z[17])
Z([3,'更换组织'])
})(__WXML_GLOBAL__.ops_cached.$gwx_4);return __WXML_GLOBAL__.ops_cached.$gwx_4
}
function gz$gwx_5(){
if( __WXML_GLOBAL__.ops_cached.$gwx_5)return __WXML_GLOBAL__.ops_cached.$gwx_5
__WXML_GLOBAL__.ops_cached.$gwx_5=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'bg_box'])
Z([3,'logo'])
Z([3,'logo_img'])
Z([3,'../../static/logo.png'])
Z([3,'logo_text'])
Z([3,'集 体 经 济'])
Z([3,'form_box'])
Z([3,'input_box'])
Z([3,'input-text'])
Z([3,'__e'])
Z([3,'text'])
Z([[4],[[5],[[4],[[5],[[5],[1,'input']],[[4],[[5],[[4],[[5],[[5],[1,'__set_model']],[[4],[[5],[[5],[[5],[[5],[1,'']],[1,'userName']],[1,'$event']],[[4],[[5]]]]]]]]]]]]])
Z([3,'手机号/身份证'])
Z([3,'place-holder'])
Z(z[10])
Z([[7],[3,'userName']])
Z(z[7])
Z(z[8])
Z(z[9])
Z(z[10])
Z([[4],[[5],[[4],[[5],[[5],[1,'input']],[[4],[[5],[[4],[[5],[[5],[1,'__set_model']],[[4],[[5],[[5],[[5],[[5],[1,'']],[1,'pwd']],[1,'$event']],[[4],[[5]]]]]]]]]]]]])
Z([3,'请输入密码'])
Z(z[13])
Z(z[10])
Z([[7],[3,'pwd']])
Z(z[7])
Z([3,'text_login'])
Z([3,'选择账号登陆'])
Z([3,'form_btn'])
Z(z[9])
Z(z[7])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'login']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'login_bin'])
Z([3,'立 即 登 录'])
Z(z[7])
Z([3,'other_login_btn'])
Z([3,'金 融 平 台 登 录'])
Z(z[7])
Z([3,'wx_logo'])
Z([3,'../../static/wx_logo.png'])
})(__WXML_GLOBAL__.ops_cached.$gwx_5);return __WXML_GLOBAL__.ops_cached.$gwx_5
}
function gz$gwx_6(){
if( __WXML_GLOBAL__.ops_cached.$gwx_6)return __WXML_GLOBAL__.ops_cached.$gwx_6
__WXML_GLOBAL__.ops_cached.$gwx_6=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'task'])
})(__WXML_GLOBAL__.ops_cached.$gwx_6);return __WXML_GLOBAL__.ops_cached.$gwx_6
}
function gz$gwx_7(){
if( __WXML_GLOBAL__.ops_cached.$gwx_7)return __WXML_GLOBAL__.ops_cached.$gwx_7
__WXML_GLOBAL__.ops_cached.$gwx_7=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'vip'])
})(__WXML_GLOBAL__.ops_cached.$gwx_7);return __WXML_GLOBAL__.ops_cached.$gwx_7
}
__WXML_GLOBAL__.ops_set.$gwx=z;
__WXML_GLOBAL__.ops_init.$gwx=true;
var nv_require=function(){var nnm={};var nom={};return function(n){return function(){if(!nnm[n]) return undefined;try{if(!nom[n])nom[n]=nnm[n]();return nom[n];}catch(e){e.message=e.message.replace(/nv_/g,'');var tmp = e.stack.substring(0,e.stack.lastIndexOf(n));e.stack = tmp.substring(0,tmp.lastIndexOf('\n'));e.stack = e.stack.replace(/\snv_/g,' ');e.stack = $gstack(e.stack);e.stack += '\n    at ' + n.substring(2);console.error(e);}
}}}()
var x=['./components/uni-icon/uni-icon.wxml','./components/uni-notice-bar/uni-notice-bar.wxml','./pages/about/about.wxml','./pages/index/index.wxml','./pages/login/login.wxml','./pages/task/task.wxml','./pages/vip/vip.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_1()
var oB=_mz(z,'view',['bindtap',0,'class',1,'data-event-opts',1,'style',2],[],e,s,gg)
_(r,oB)
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
d_[x[1]]={}
var m1=function(e,s,r,gg){
var z=gz$gwx_2()
var oD=_v()
_(r,oD)
if(_oz(z,0,e,s,gg)){oD.wxVkey=1
var fE=_mz(z,'view',['bindtap',1,'class',1,'data-event-opts',2,'style',3],[],e,s,gg)
var cF=_v()
_(fE,cF)
if(_oz(z,5,e,s,gg)){cF.wxVkey=1
var hG=_n('view')
_rz(z,hG,'class',6,e,s,gg)
var oH=_mz(z,'uni-icon',['bind:__l',7,'size',1,'type',2,'vueId',3],[],e,s,gg)
_(hG,oH)
_(cF,hG)
}
var cI=_n('view')
_rz(z,cI,'class',11,e,s,gg)
var oJ=_v()
_(cI,oJ)
if(_oz(z,12,e,s,gg)){oJ.wxVkey=1
var aL=_mz(z,'view',['class',13,'style',1],[],e,s,gg)
var tM=_mz(z,'uni-icon',['bind:__l',15,'color',1,'size',2,'type',3,'vueId',4],[],e,s,gg)
_(aL,tM)
_(oJ,aL)
}
var eN=_n('view')
_rz(z,eN,'class',20,e,s,gg)
var bO=_mz(z,'view',['class',21,'id',1,'style',2],[],e,s,gg)
var oP=_oz(z,24,e,s,gg)
_(bO,oP)
_(eN,bO)
_(cI,eN)
var lK=_v()
_(cI,lK)
if(_oz(z,25,e,s,gg)){lK.wxVkey=1
var xQ=_mz(z,'view',['bindtap',26,'class',1,'data-event-opts',2,'style',3],[],e,s,gg)
var oR=_v()
_(xQ,oR)
if(_oz(z,30,e,s,gg)){oR.wxVkey=1
var fS=_n('view')
_rz(z,fS,'class',31,e,s,gg)
var cT=_oz(z,32,e,s,gg)
_(fS,cT)
_(oR,fS)
}
var hU=_mz(z,'uni-icon',['bind:__l',33,'size',1,'type',2,'vueId',3],[],e,s,gg)
_(xQ,hU)
oR.wxXCkey=1
_(lK,xQ)
}
oJ.wxXCkey=1
oJ.wxXCkey=3
lK.wxXCkey=1
lK.wxXCkey=3
_(fE,cI)
cF.wxXCkey=1
cF.wxXCkey=3
_(oD,fE)
}
oD.wxXCkey=1
oD.wxXCkey=3
return r
}
e_[x[1]]={f:m1,j:[],i:[],ti:[],ic:[]}
d_[x[2]]={}
var m2=function(e,s,r,gg){
var z=gz$gwx_3()
var cW=_n('view')
var oX=_oz(z,0,e,s,gg)
_(cW,oX)
_(r,cW)
return r
}
e_[x[2]]={f:m2,j:[],i:[],ti:[],ic:[]}
d_[x[3]]={}
var m3=function(e,s,r,gg){
var z=gz$gwx_4()
var aZ=_n('view')
var t1=_n('view')
var e2=_mz(z,'uni-notice-bar',['backgroundColor',0,'bind:__l',1,'showIcon',1,'text',2,'vueId',3],[],e,s,gg)
_(t1,e2)
_(aZ,t1)
var b3=_n('view')
_rz(z,b3,'class',5,e,s,gg)
var o4=_mz(z,'swiper',['autoplay',6,'class',1,'indicatorActiveColor',2,'indicatorColor',3,'indicatorDots',4],[],e,s,gg)
var x5=_n('swiper-item')
var o6=_n('image')
_rz(z,o6,'src',11,e,s,gg)
_(x5,o6)
_(o4,x5)
var f7=_n('swiper-item')
var c8=_n('image')
_rz(z,c8,'src',12,e,s,gg)
_(f7,c8)
_(o4,f7)
var h9=_n('swiper-item')
var o0=_n('image')
_rz(z,o0,'src',13,e,s,gg)
_(h9,o0)
_(o4,h9)
_(b3,o4)
_(aZ,b3)
var cAB=_n('view')
_rz(z,cAB,'class',14,e,s,gg)
var oBB=_n('view')
_rz(z,oBB,'class',15,e,s,gg)
var lCB=_n('navigator')
_rz(z,lCB,'url',16,e,s,gg)
var aDB=_n('view')
_rz(z,aDB,'class',17,e,s,gg)
var tEB=_oz(z,18,e,s,gg)
_(aDB,tEB)
_(lCB,aDB)
_(oBB,lCB)
_(cAB,oBB)
var eFB=_mz(z,'view',['class',19,'style',1],[],e,s,gg)
var bGB=_n('view')
_rz(z,bGB,'class',21,e,s,gg)
var oHB=_oz(z,22,e,s,gg)
_(bGB,oHB)
_(eFB,bGB)
_(cAB,eFB)
var xIB=_mz(z,'view',['class',23,'style',1],[],e,s,gg)
var oJB=_n('view')
_rz(z,oJB,'class',25,e,s,gg)
var fKB=_oz(z,26,e,s,gg)
_(oJB,fKB)
_(xIB,oJB)
_(cAB,xIB)
var cLB=_n('view')
_rz(z,cLB,'class',27,e,s,gg)
var hMB=_n('view')
_rz(z,hMB,'class',28,e,s,gg)
var oNB=_oz(z,29,e,s,gg)
_(hMB,oNB)
_(cLB,hMB)
_(cAB,cLB)
var cOB=_mz(z,'view',['class',30,'style',1],[],e,s,gg)
var oPB=_n('view')
_rz(z,oPB,'class',32,e,s,gg)
var lQB=_oz(z,33,e,s,gg)
_(oPB,lQB)
_(cOB,oPB)
_(cAB,cOB)
var aRB=_mz(z,'view',['class',34,'style',1],[],e,s,gg)
var tSB=_n('view')
_rz(z,tSB,'class',36,e,s,gg)
var eTB=_oz(z,37,e,s,gg)
_(tSB,eTB)
_(aRB,tSB)
_(cAB,aRB)
var bUB=_n('view')
_rz(z,bUB,'class',38,e,s,gg)
var oVB=_n('view')
_rz(z,oVB,'class',39,e,s,gg)
var xWB=_oz(z,40,e,s,gg)
_(oVB,xWB)
_(bUB,oVB)
_(cAB,bUB)
var oXB=_mz(z,'view',['class',41,'style',1],[],e,s,gg)
var fYB=_n('view')
_rz(z,fYB,'class',43,e,s,gg)
var cZB=_oz(z,44,e,s,gg)
_(fYB,cZB)
_(oXB,fYB)
_(cAB,oXB)
var h1B=_mz(z,'view',['class',45,'style',1],[],e,s,gg)
var o2B=_n('view')
_rz(z,o2B,'class',47,e,s,gg)
var c3B=_oz(z,48,e,s,gg)
_(o2B,c3B)
_(h1B,o2B)
_(cAB,h1B)
var o4B=_n('view')
_rz(z,o4B,'class',49,e,s,gg)
var l5B=_n('view')
_rz(z,l5B,'class',50,e,s,gg)
var a6B=_oz(z,51,e,s,gg)
_(l5B,a6B)
_(o4B,l5B)
_(cAB,o4B)
_(aZ,cAB)
_(r,aZ)
return r
}
e_[x[3]]={f:m3,j:[],i:[],ti:[],ic:[]}
d_[x[4]]={}
var m4=function(e,s,r,gg){
var z=gz$gwx_5()
var e8B=_n('view')
var b9B=_n('view')
_rz(z,b9B,'class',0,e,s,gg)
var o0B=_n('view')
_rz(z,o0B,'class',1,e,s,gg)
var xAC=_n('view')
_rz(z,xAC,'class',2,e,s,gg)
var oBC=_n('image')
_rz(z,oBC,'src',3,e,s,gg)
_(xAC,oBC)
_(o0B,xAC)
var fCC=_n('view')
_rz(z,fCC,'class',4,e,s,gg)
var cDC=_oz(z,5,e,s,gg)
_(fCC,cDC)
_(o0B,fCC)
_(b9B,o0B)
_(e8B,b9B)
var hEC=_n('view')
_rz(z,hEC,'class',6,e,s,gg)
var oFC=_n('view')
_rz(z,oFC,'class',7,e,s,gg)
var cGC=_n('view')
_rz(z,cGC,'class',8,e,s,gg)
var oHC=_mz(z,'input',['bindinput',9,'class',1,'data-event-opts',2,'placeholder',3,'placeholderClass',4,'type',5,'value',6],[],e,s,gg)
_(cGC,oHC)
_(oFC,cGC)
_(hEC,oFC)
var lIC=_n('view')
_rz(z,lIC,'class',16,e,s,gg)
var aJC=_n('view')
_rz(z,aJC,'class',17,e,s,gg)
var tKC=_mz(z,'input',['bindinput',18,'class',1,'data-event-opts',2,'placeholder',3,'placeholderClass',4,'type',5,'value',6],[],e,s,gg)
_(aJC,tKC)
_(lIC,aJC)
_(hEC,lIC)
var eLC=_n('view')
_rz(z,eLC,'class',25,e,s,gg)
var bMC=_n('view')
_rz(z,bMC,'class',26,e,s,gg)
var oNC=_oz(z,27,e,s,gg)
_(bMC,oNC)
_(eLC,bMC)
_(hEC,eLC)
var xOC=_n('view')
_rz(z,xOC,'class',28,e,s,gg)
var oPC=_mz(z,'view',['bindtap',29,'class',1,'data-event-opts',2],[],e,s,gg)
var fQC=_n('button')
_rz(z,fQC,'class',32,e,s,gg)
var cRC=_oz(z,33,e,s,gg)
_(fQC,cRC)
_(oPC,fQC)
_(xOC,oPC)
var hSC=_n('view')
_rz(z,hSC,'class',34,e,s,gg)
var oTC=_n('button')
_rz(z,oTC,'class',35,e,s,gg)
var cUC=_oz(z,36,e,s,gg)
_(oTC,cUC)
_(hSC,oTC)
_(xOC,hSC)
var oVC=_n('view')
_rz(z,oVC,'class',37,e,s,gg)
var lWC=_n('view')
_rz(z,lWC,'class',38,e,s,gg)
var aXC=_n('image')
_rz(z,aXC,'src',39,e,s,gg)
_(lWC,aXC)
_(oVC,lWC)
_(xOC,oVC)
_(hEC,xOC)
_(e8B,hEC)
_(r,e8B)
return r
}
e_[x[4]]={f:m4,j:[],i:[],ti:[],ic:[]}
d_[x[5]]={}
var m5=function(e,s,r,gg){
var z=gz$gwx_6()
var eZC=_n('view')
var b1C=_oz(z,0,e,s,gg)
_(eZC,b1C)
_(r,eZC)
return r
}
e_[x[5]]={f:m5,j:[],i:[],ti:[],ic:[]}
d_[x[6]]={}
var m6=function(e,s,r,gg){
var z=gz$gwx_7()
var x3C=_n('view')
var o4C=_oz(z,0,e,s,gg)
_(x3C,o4C)
_(r,x3C)
return r
}
e_[x[6]]={f:m6,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
window.__wxml_comp_version__=0.02
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
var main=e_[path].f
if (typeof global==="undefined")global={};global.f=$gdc(f_[path],"",1);
if(typeof(window.__webview_engine_version__)!='undefined'&&window.__webview_engine_version__+1e-6>=0.02+1e-6&&window.__mergeData__)
{
env=window.__mergeData__(env,dd);
}
try{
main(env,{},root,global);
_tsd(root)
if(typeof(window.__webview_engine_version__)=='undefined'|| window.__webview_engine_version__+1e-6<0.01+1e-6){return _ev(root);}
}catch(err){
console.log(err)
}
return root;
}
}
}


var BASE_DEVICE_WIDTH = 750;
var isIOS=navigator.userAgent.match("iPhone");
var deviceWidth = window.screen.width || 375;
var deviceDPR = window.devicePixelRatio || 2;
var checkDeviceWidth = window.__checkDeviceWidth__ || function() {
var newDeviceWidth = window.screen.width || 375
var newDeviceDPR = window.devicePixelRatio || 2
var newDeviceHeight = window.screen.height || 375
if (window.screen.orientation && /^landscape/.test(window.screen.orientation.type || '')) newDeviceWidth = newDeviceHeight
if (newDeviceWidth !== deviceWidth || newDeviceDPR !== deviceDPR) {
deviceWidth = newDeviceWidth
deviceDPR = newDeviceDPR
}
}
checkDeviceWidth()
var eps = 1e-4;
var transformRPX = window.__transformRpx__ || function(number, newDeviceWidth) {
if ( number === 0 ) return 0;
number = number / BASE_DEVICE_WIDTH * ( newDeviceWidth || deviceWidth );
number = Math.floor(number + eps);
if (number === 0) {
if (deviceDPR === 1 || !isIOS) {
return 1;
} else {
return 0.5;
}
}
return number;
}
var setCssToHead = function(file, _xcInvalid, info) {
var Ca = {};
var css_id;
var info = info || {};
var _C= [[[2,1],],[],];
function makeup(file, opt) {
var _n = typeof(file) === "number";
if ( _n && Ca.hasOwnProperty(file)) return "";
if ( _n ) Ca[file] = 1;
var ex = _n ? _C[file] : file;
var res="";
for (var i = ex.length - 1; i >= 0; i--) {
var content = ex[i];
if (typeof(content) === "object")
{
var op = content[0];
if ( op == 0 )
res = transformRPX(content[1], opt.deviceWidth) + "px" + res;
else if ( op == 1)
res = opt.suffix + res;
else if ( op == 2 ) 
res = makeup(content[1], opt) + res;
}
else
res = content + res
}
return res;
}
var rewritor = function(suffix, opt, style){
opt = opt || {};
suffix = suffix || "";
opt.suffix = suffix;
if ( opt.allowIllegalSelector != undefined && _xcInvalid != undefined )
{
if ( opt.allowIllegalSelector )
console.warn( "For developer:" + _xcInvalid );
else
{
console.error( _xcInvalid + "This wxss file is ignored." );
return;
}
}
Ca={};
css = makeup(file, opt);
if ( !style ) 
{
var head = document.head || document.getElementsByTagName('head')[0];
window.__rpxRecalculatingFuncs__ = window.__rpxRecalculatingFuncs__ || [];
style = document.createElement('style');
style.type = 'text/css';
style.setAttribute( "wxss:path", info.path );
head.appendChild(style);
window.__rpxRecalculatingFuncs__.push(function(size){
opt.deviceWidth = size.width;
rewritor(suffix, opt, style);
});
}
if (style.styleSheet) {
style.styleSheet.cssText = css;
} else {
if ( style.childNodes.length == 0 )
style.appendChild(document.createTextNode(css));
else 
style.childNodes[0].nodeValue = css;
}
}
return rewritor;
}
setCssToHead([])();setCssToHead([[2,0]],undefined,{path:"./app.wxss"})();

__wxAppCode__['app.wxss']=setCssToHead([[2,0]],undefined,{path:"./app.wxss"});    
__wxAppCode__['app.wxml']=$gwx('./app.wxml');

__wxAppCode__['components/uni-icon/uni-icon.wxss']=setCssToHead(["@font-face { font-family: uniicons; font-weight: normal; font-style: normal; src: url(data:font/truetype;charset\x3dutf-8;base64,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PDgtsDEssAAWILAJI0IgICBGI0ewACsjYTgtsDIssAAWsAMlsAIlRyNHI2GwAFRYLiA8IyEbsAIlsAIlRyNHI2EgsAUlsAQlRyNHI2GwBiWwBSVJsAIlYbABRWMjIFhiGyFZY7ABRWJgIy4jICA8ijgjIVktsDMssAAWILAJQyAuRyNHI2EgYLAgYGawgGIjICA8ijgtsDQsIyAuRrACJUZSWCA8WS6xJAEUKy2wNSwjIC5GsAIlRlBYIDxZLrEkARQrLbA2LCMgLkawAiVGUlggPFkjIC5GsAIlRlBYIDxZLrEkARQrLbA3LLAuKyMgLkawAiVGUlggPFkusSQBFCstsDgssC8riiAgPLAEI0KKOCMgLkawAiVGUlggPFkusSQBFCuwBEMusCQrLbA5LLAAFrAEJbAEJiAuRyNHI2GwBkUrIyA8IC4jOLEkARQrLbA6LLEJBCVCsAAWsAQlsAQlIC5HI0cjYSCwBCNCsAZFKyCwYFBYILBAUVizAiADIBuzAiYDGllCQiMgR7AEQ7CAYmAgsAArIIqKYSCwAkNgZCOwA0NhZFBYsAJDYRuwA0NgWbADJbCAYmGwAiVGYTgjIDwjOBshICBGI0ewACsjYTghWbEkARQrLbA7LLAuKy6xJAEUKy2wPCywLyshIyAgPLAEI0IjOLEkARQrsARDLrAkKy2wPSywABUgR7AAI0KyAAEBFRQTLrAqKi2wPiywABUgR7AAI0KyAAEBFRQTLrAqKi2wPyyxAAEUE7ArKi2wQCywLSotsEEssAAWRSMgLiBGiiNhOLEkARQrLbBCLLAJI0KwQSstsEMssgAAOistsEQssgABOistsEUssgEAOistsEYssgEBOistsEcssgAAOystsEgssgABOystsEkssgEAOystsEossgEBOystsEsssgAANystsEwssgABNystsE0ssgEANystsE4ssgEBNystsE8ssgAAOSstsFAssgABOSstsFEssgEAOSstsFIssgEBOSstsFMssgAAPCstsFQssgABPCstsFUssgEAPCstsFYssgEBPCstsFcssgAAOCstsFgssgABOCstsFkssgEAOCstsFossgEBOCstsFsssDArLrEkARQrLbBcLLAwK7A0Ky2wXSywMCuwNSstsF4ssAAWsDArsDYrLbBfLLAxKy6xJAEUKy2wYCywMSuw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AVkBWgFbAVwBXQd1bmlFMTAwB3VuaUUxMDEHdW5pRTEwMgd1bmlFMTMwB3VuaUUxMzEHdW5pRTEzMgd1bmlFMjAwB3VuaUUyMDEHdW5pRTIwMgd1bmlFMjAzB3VuaUUyMzAHdW5pRTIzMQd1bmlFMjMyB3VuaUUyMzMHdW5pRTI2MAd1bmlFMjYxB3VuaUUyNjIHdW5pRTI2Mwd1bmlFMjY0B3VuaUUzMDAHdW5pRTMwMQd1bmlFMzAyB3VuaUUzMDMHdW5pRTMzMgd1bmlFMzMzB3VuaUUzNjAHdW5pRTM2Mwd1bmlFMzY0B3VuaUU0MDAHdW5pRTQwMQd1bmlFNDAyB3VuaUU0MDMHdW5pRTQwNAd1bmlFNDA1B3VuaUU0MDYHdW5pRTQwNwd1bmlFNDA4B3VuaUU0MDkHdW5pRTQxMAd1bmlFNDExB3VuaUU0MTMHdW5pRTQzNAd1bmlFNDM3B3VuaUU0MzgHdW5pRTQzOQd1bmlFNDQwB3VuaUU0NDEHdW5pRTQ0Mgd1bmlFNDQzB3VuaUU0NjAHdW5pRTQ2MQd1bmlFNDYyB3VuaUU0NjMHdW5pRTQ2NAd1bmlFNDY1B3VuaUU0NjYHdW5pRTQ2OAd1bmlFNDcwB3VuaUU0NzEHdW5pRTQ3Mgd1bmlFNTAwB3VuaUU1MDEHdW5pRTUwMgd1bmlFNTAzB3VuaUU1MDQHdW5pRTUwNQd1bmlFNTA2B3VuaUU1MDcHdW5pRTUwOAd1bmlFNTMwB3VuaUU1MzIHdW5pRTUzNAd1bmlFNTM1B3VuaUU1MzcHdW5pRTU2MAd1bmlFNTYyB3VuaUU1NjMHdW5pRTU2NQd1bmlFNTY3B3VuaUU1NjgHdW5pRTU4MAd1bmlFNTgxB3VuaUU1ODIHdW5pRTU4Mwd1bmlFNTg0B3VuaUU1ODUHdW5pRTU4Ngd1bmlFNTg3B3VuaUU1ODgHdW5pRTU4OQRFdXJvBEV1cm8AAQAB//8ADwABAAAADAAAABYAAAACAAEAAQBfAAEABAAAAAIAAAAAAAAAAQAAAADVpCcIAAAAANJrTZkAAAAA2DhhuQ\x3d\x3d) format(\x27truetype\x27); }\n.",[1],"uni-icon { font-family: uniicons; font-size: 24px; font-weight: normal; font-style: normal; line-height: 1; display: inline-block; text-decoration: none; -webkit-font-smoothing: antialiased; }\n.",[1],"uni-icon.",[1],"uni-active { color: #007aff; }\n.",[1],"uni-icon-contact:before { content: \x27\\E100\x27; }\n.",[1],"uni-icon-person:before { content: \x27\\E101\x27; }\n.",[1],"uni-icon-personadd:before { content: \x27\\E102\x27; }\n.",[1],"uni-icon-contact-filled:before { content: \x27\\E130\x27; }\n.",[1],"uni-icon-person-filled:before { content: \x27\\E131\x27; }\n.",[1],"uni-icon-personadd-filled:before { content: \x27\\E132\x27; }\n.",[1],"uni-icon-phone:before { content: \x27\\E200\x27; }\n.",[1],"uni-icon-email:before { content: \x27\\E201\x27; }\n.",[1],"uni-icon-chatbubble:before { content: \x27\\E202\x27; }\n.",[1],"uni-icon-chatboxes:before { content: \x27\\E203\x27; }\n.",[1],"uni-icon-phone-filled:before { content: \x27\\E230\x27; }\n.",[1],"uni-icon-email-filled:before { content: \x27\\E231\x27; }\n.",[1],"uni-icon-chatbubble-filled:before { content: \x27\\E232\x27; }\n.",[1],"uni-icon-chatboxes-filled:before { content: \x27\\E233\x27; }\n.",[1],"uni-icon-weibo:before { content: \x27\\E260\x27; }\n.",[1],"uni-icon-weixin:before { content: \x27\\E261\x27; }\n.",[1],"uni-icon-pengyouquan:before { content: \x27\\E262\x27; }\n.",[1],"uni-icon-chat:before { content: \x27\\E263\x27; }\n.",[1],"uni-icon-qq:before { content: \x27\\E264\x27; }\n.",[1],"uni-icon-videocam:before { content: \x27\\E300\x27; }\n.",[1],"uni-icon-camera:before { content: \x27\\E301\x27; }\n.",[1],"uni-icon-mic:before { content: \x27\\E302\x27; }\n.",[1],"uni-icon-location:before { content: \x27\\E303\x27; }\n.",[1],"uni-icon-mic-filled:before, .",[1],"uni-icon-speech:before { content: \x27\\E332\x27; }\n.",[1],"uni-icon-location-filled:before { content: \x27\\E333\x27; }\n.",[1],"uni-icon-micoff:before { content: \x27\\E360\x27; }\n.",[1],"uni-icon-image:before { content: \x27\\E363\x27; }\n.",[1],"uni-icon-map:before { content: \x27\\E364\x27; }\n.",[1],"uni-icon-compose:before { content: \x27\\E400\x27; }\n.",[1],"uni-icon-trash:before { content: \x27\\E401\x27; }\n.",[1],"uni-icon-upload:before { content: \x27\\E402\x27; }\n.",[1],"uni-icon-download:before { content: \x27\\E403\x27; }\n.",[1],"uni-icon-close:before { content: \x27\\E404\x27; }\n.",[1],"uni-icon-redo:before { content: \x27\\E405\x27; }\n.",[1],"uni-icon-undo:before { content: \x27\\E406\x27; }\n.",[1],"uni-icon-refresh:before { content: \x27\\E407\x27; }\n.",[1],"uni-icon-star:before { content: \x27\\E408\x27; }\n.",[1],"uni-icon-plus:before { content: \x27\\E409\x27; }\n.",[1],"uni-icon-minus:before { content: \x27\\E410\x27; }\n.",[1],"uni-icon-circle:before, .",[1],"uni-icon-checkbox:before { content: \x27\\E411\x27; }\n.",[1],"uni-icon-close-filled:before, .",[1],"uni-icon-clear:before { content: \x27\\E434\x27; }\n.",[1],"uni-icon-refresh-filled:before { content: \x27\\E437\x27; }\n.",[1],"uni-icon-star-filled:before { content: \x27\\E438\x27; }\n.",[1],"uni-icon-plus-filled:before { content: \x27\\E439\x27; }\n.",[1],"uni-icon-minus-filled:before { content: \x27\\E440\x27; }\n.",[1],"uni-icon-circle-filled:before { content: \x27\\E441\x27; }\n.",[1],"uni-icon-checkbox-filled:before { content: \x27\\E442\x27; }\n.",[1],"uni-icon-closeempty:before { content: \x27\\E460\x27; }\n.",[1],"uni-icon-refreshempty:before { content: \x27\\E461\x27; }\n.",[1],"uni-icon-reload:before { content: \x27\\E462\x27; }\n.",[1],"uni-icon-starhalf:before { content: \x27\\E463\x27; }\n.",[1],"uni-icon-spinner:before { content: \x27\\E464\x27; }\n.",[1],"uni-icon-spinner-cycle:before { content: \x27\\E465\x27; }\n.",[1],"uni-icon-search:before { content: \x27\\E466\x27; }\n.",[1],"uni-icon-plusempty:before { content: \x27\\E468\x27; }\n.",[1],"uni-icon-forward:before { content: \x27\\E470\x27; }\n.",[1],"uni-icon-back:before, .",[1],"uni-icon-left-nav:before { content: \x27\\E471\x27; }\n.",[1],"uni-icon-checkmarkempty:before { content: \x27\\E472\x27; }\n.",[1],"uni-icon-home:before { content: \x27\\E500\x27; }\n.",[1],"uni-icon-navigate:before { content: \x27\\E501\x27; }\n.",[1],"uni-icon-gear:before { content: \x27\\E502\x27; }\n.",[1],"uni-icon-paperplane:before { content: \x27\\E503\x27; }\n.",[1],"uni-icon-info:before { content: \x27\\E504\x27; }\n.",[1],"uni-icon-help:before { content: \x27\\E505\x27; }\n.",[1],"uni-icon-locked:before { content: \x27\\E506\x27; }\n.",[1],"uni-icon-more:before { content: \x27\\E507\x27; }\n.",[1],"uni-icon-flag:before { content: \x27\\E508\x27; }\n.",[1],"uni-icon-home-filled:before { content: \x27\\E530\x27; }\n.",[1],"uni-icon-gear-filled:before { content: \x27\\E532\x27; }\n.",[1],"uni-icon-info-filled:before { content: \x27\\E534\x27; }\n.",[1],"uni-icon-help-filled:before { content: \x27\\E535\x27; }\n.",[1],"uni-icon-more-filled:before { content: \x27\\E537\x27; }\n.",[1],"uni-icon-settings:before { content: \x27\\E560\x27; }\n.",[1],"uni-icon-list:before { content: \x27\\E562\x27; }\n.",[1],"uni-icon-bars:before { content: \x27\\E563\x27; }\n.",[1],"uni-icon-loop:before { content: \x27\\E565\x27; }\n.",[1],"uni-icon-paperclip:before { content: \x27\\E567\x27; }\n.",[1],"uni-icon-eye:before { content: \x27\\E568\x27; }\n.",[1],"uni-icon-arrowup:before { content: \x27\\E580\x27; }\n.",[1],"uni-icon-arrowdown:before { content: \x27\\E581\x27; }\n.",[1],"uni-icon-arrowleft:before { content: \x27\\E582\x27; }\n.",[1],"uni-icon-arrowright:before { content: \x27\\E583\x27; }\n.",[1],"uni-icon-arrowthinup:before { content: \x27\\E584\x27; }\n.",[1],"uni-icon-arrowthindown:before { content: \x27\\E585\x27; }\n.",[1],"uni-icon-arrowthinleft:before { content: \x27\\E586\x27; }\n.",[1],"uni-icon-arrowthinright:before { content: \x27\\E587\x27; }\n.",[1],"uni-icon-pulldown:before { content: \x27\\E588\x27; }\n.",[1],"uni-icon-closefill:before { content: \x27\\E589\x27; }\n.",[1],"uni-icon-sound:before { content: \x22\\E590\x22; }\n.",[1],"uni-icon-scan:before { content: \x22\\E612\x22; }\n",],undefined,{path:"./components/uni-icon/uni-icon.wxss"});    
__wxAppCode__['components/uni-icon/uni-icon.wxml']=$gwx('./components/uni-icon/uni-icon.wxml');

__wxAppCode__['components/uni-notice-bar/uni-notice-bar.wxss']=setCssToHead(["@charset \x22UTF-8\x22;\n.",[1],"uni-noticebar { padding: ",[0,12]," ",[0,24],"; font-size: ",[0,24],"; line-height: 1.5; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: left; -webkit-justify-content: left; -ms-flex-pack: left; justify-content: left }\n.",[1],"uni-noticebar__close { color: #999; margin-right: ",[0,24],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center }\n.",[1],"uni-noticebar__content { -webkit-box-flex: 1; -webkit-flex: 1; -ms-flex: 1; flex: 1; overflow: hidden }\n.",[1],"uni-noticebar__content.",[1],"uni-noticebar--flex { -webkit-box-flex: 1; -webkit-flex: 1; -ms-flex: 1; flex: 1; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row }\n.",[1],"uni-noticebar__content-icon { display: inline-block; z-index: 1; padding-right: ",[0,12]," }\n.",[1],"uni-noticebar__content-more { width: ",[0,180],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: end; -webkit-justify-content: flex-end; -ms-flex-pack: end; justify-content: flex-end; word-break: keep-all; margin-left: ",[0,10],"; color: #999 }\n.",[1],"uni-noticebar__content-more-text { font-size: ",[0,24],"; white-space: nowrap }\n.",[1],"uni-noticebar__content-text { word-break: break-all; line-height: 1.5; display: inline }\n.",[1],"uni-noticebar__content-text.",[1],"uni-noticebar--single { -o-text-overflow: ellipsis; text-overflow: ellipsis; white-space: nowrap; overflow: hidden }\n.",[1],"uni-noticebar__content-text.",[1],"uni-noticebar--scrollable { -webkit-box-flex: 1; -webkit-flex: 1; -ms-flex: 1; flex: 1; display: block; overflow: hidden }\n.",[1],"uni-noticebar__content-text.",[1],"uni-noticebar--scrollable .",[1],"uni-noticebar__content-inner { padding-left: 100%; white-space: nowrap; display: inline-block; -webkit-transform: translateZ(0); transform: translateZ(0) }\n.",[1],"uni-noticebar__content-inner { font-size: ",[0,24],"; display: inline }\n@-webkit-keyframes notice { 100% { -webkit-transform: translate3d(-100%, 0, 0); transform: translate3d(-100%, 0, 0) }\n}@keyframes notice { 100% { -webkit-transform: translate3d(-100%, 0, 0); transform: translate3d(-100%, 0, 0) }\n}",],undefined,{path:"./components/uni-notice-bar/uni-notice-bar.wxss"});    
__wxAppCode__['components/uni-notice-bar/uni-notice-bar.wxml']=$gwx('./components/uni-notice-bar/uni-notice-bar.wxml');

__wxAppCode__['pages/about/about.wxss']=undefined;    
__wxAppCode__['pages/about/about.wxml']=$gwx('./pages/about/about.wxml');

__wxAppCode__['pages/index/index.wxss']=setCssToHead(["body{ background-color: #ecf2fe; }\n.",[1],"swiper_style wx-image{ width: 100%; }\n.",[1],"content{ width: 100%; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-pack: justify; -webkit-justify-content: space-between; -ms-flex-pack: justify; justify-content: space-between; -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; }\n.",[1],"content_box{ width: ",[0,162],"; height: ",[0,162],"; background-color: #6cbaf8; border-radius: 10%; margin: ",[0,66]," auto auto ",[0,45],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; }\n.",[1],"content_box_text{ width: ",[0,81],"; height: ",[0,81],"; font-size: ",[0,32],"; color: #fff; text-align: center; line-height: ",[0,40.5],"; }\n",],undefined,{path:"./pages/index/index.wxss"});    
__wxAppCode__['pages/index/index.wxml']=$gwx('./pages/index/index.wxml');

__wxAppCode__['pages/login/login.wxss']=setCssToHead([".",[1],"bg_box{ width: 100%; height: ",[0,480],"; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAuAAAAHWCAYAAAA2FTwkAAAgAElEQVR4Aey9jbbrqq5umYyzHryepd7y1m1nppokBAIDBhv8+829xzIGIYkOxgoh9vf/+X//9/cp/vt+vsWyQgFVcBq/Jc3dSvO2SupJ+jvARkkF55cK864Wc3O6tvr+ywExeVv1Fp1vLLB2Of39LvvnR8NGnNV20LEJ87dRruKvYsr1R6VaU5G2QY9NlQ4Usv1zjNkliW9xshjs0dI0z1el/mfxXJ2iW13CRS2lglmcdAzYa4980PySP3vzqduJGNmR4/dDPtBd6d+/z+f//u/v8//939/n//zf3+d//5EcCbKkmHYd96W5w3QiJ+d2xd6mn16f8eQYOY6Kc81Rq4cjhlSnmdttNzXrNV2b1lFTrb6m9UvnpNfr9ImSdMgvXS96XamkP9d7lzZEBW52nOl+B/5N1NR3PW5SsrHSf//+t1Kz86YoDdBmlK8ankQrZsPQL6MvlwTF63aCbCmlrSmVR/l8MXXUUL7uavQX78+RbFTlL2adMhx6/fikaoJc5DWfrLMKxFM94jfdOIMMKdX2aDbZoDQFEbGk+MN57j+azsktfC0PtWVDV3Jy9laqrBZr0KT9sFrhIAHlqP1zkFm+tenYUJvBhxk9oFbWj5F1vTm2fQx0nwJ/rdLrzmQkZGqIvMxI9Wel17Bcy5kPyv2qfY0w3sR/uh54Pvj8OLCm+Yr8oFIKvsPf7/P7J3//vn9uYnGcPYrfR6bT3+eXDi7vARKeQHFsC1CD1VfJJqweTvuakbjP5YSb/31mJMrXEY8NfyUV5NMJtaQvUb96avVWdNI1omNadep1pOfh+OOxrud6r6T6FRMqfu2j5TXL08mQpAmTjWTY/Pfv3zijMhiDPh1k1i4P0CBii0xaBfRoirqSywukq3qncPe8/3U3ER+Iq0Hnd0/zf8ugVlaFNAxX3csjTwIhAloK+JzgkPat1KXhK2WaT1UsD2tDxolX6hO2rk17Ada5DPRt+RXTfHFrX1/EQdsfR7sktlOrOrb0mJafcM4BRRjbLR5w21oEt8rwXDGekVyTFCTY63jc/BmNNzdX6U2PmkRzBf99vh+6JVHwTSvetEBE96h///5x3o8+vDMDmdd06mSc7DspozaI9q2Y31BP+zxtq46BNL90bvVIOieZD0BzkpRnddJ5r08lvePytT3xNZL6be3ZNmja3iOtLNJHExi4itfh+n8ft9qardM5h8lqhmiSaXypgOfIZTZXikPFkZNowaBvtHjrT6PEWt0gzO0vipcKCu2kfilVCSYlVRg7QXOLopqM8iEZm7aOaJnokYklJ1uzozpIb5qOA3pr+bpp19YLBgR9Y2Mc4fINR/vbMRtncrsmD+lqPo31h7VxW51eN0kv8reTlGmDO58WCsSOpGiZwM0T7kCnJilzAdXVaJt9ldVz75LbysLzhitvn0C9llclcvcr7vrijUd7hTC5seKJuT51H6Z8tvuWQ+dz0W9L0/RST+xTzYdUlzu3VaxI2gRbVk1T8J1WXvotKihfg3VJy+BO5eW8ahaF8whwf5YGyjyz/+lkmDOh812uLJvnvj4MZX5q9Vk8zBaDV67n0Hw3GCsOVIq8reUkYYqipGyNiLLIpQ3XxPLCrOlxBkLDxQXOXsBM3Vuep3qWEian5+tlBUEGKE2f+lUVJfTE6lRZlaOjyqVpOlfnScampX6wl6srMlf8r/gt7V5eDcd6zB9wTRco5RYvTLUW8axM6MOcNh0vPV5lzQzMzPm5pn5LnTWdWu4YrUcxWqF8dJ0RecvoJWeZX1a1WqIdb/Tb4Du7aqpBeDQNBq8IAZ2xSk7rV/l0Rwtyq75tFjjCxmbnmivmhxJTzejQLYS2aMlheQ8UfZKvupf3XB0mqj3o0TpUIgOCcsTy0r7Wt0erwWkJtxkraNNedba2G31eyNdUv0N7VCZ4HYxrma8+ITHfRn4cjWlK4DhGX0lLLRYu1dmbP3QF3MdN7FV+L146lH0D+JOzDpTMx2gvKAleIC4qs8Kq0+bFaf06KM7Vs/X6Klk68s0iN4rs9Wgrc36n3SYWwYi402PDGrD1NK3HYCNMMpRny21a5SlPbdi0fh2pcvc5xoEFd+oFnM+xX3drr/e54R9b1T7f5l+sa+TZlfwZyCiabwMvtRByBqR48AhHucJlNNkgXOaHLy9yL27mVJUGEK26sALVQsGY6KUCSUkgPj8IV7sD+JymQjguzefbpvfJ5f0sLx/02m2DJKsrwkEipHK64jxdyAgfteLyoEtSi/GkoXO9mow1XunLCcoYDrZyMlSq+Vbepq1M0DY2pT6M1aracny1bMRRxtsITWUdpSuhXGNMyX81NS1OlbpWfgjTokE9SDTxGE3yVJSOPaptvWw6b4ddyMr3ZupNIVePbKeNyfuTqx3ycnqkNKddb1ehfktq6ZfkLPNFWy4/t4qitkk+9dZ91ZxTpdV2HueoTtuZb9tO17uqjxvPXWY7hM9n1OFsVnT+zWIUo/yon30zJWgy98ho5CD89+U42rbMzgISTLvRyz/kpvlUgvW4E/JtimVGnB1lZ4SvNR2WeE1Oy/Ltbhvz1lZej1pZP0p9+9/1OlslrN9Wx3obaCU8LDxYPet1raV96fm2qI0z543AcB+Jam3bPVXBsYX/+QWEjN6WruOJsihYLMhYs1mOhp2FbXF3es2PsqFtgWrsoFpPrWh++JQc1+s/Cxq1LtlMc9WPNF/r5I8krTWDBN8Iw6lJpfKxtfKkrfX06Kw2DNTYgnFlJZljtFKluThu51YP18wt+2WtxnXLZzGiFh/Daf7NaAwj9XN5g0s/PI4fLRqE66K2Hmmysr3ELeUfaLrfxGihWwwPJCilheRvKBnv/ZM09nCyfGPG8TxX4qO27BbGVFZl0nw9N3Vr9wQVH3LM+VRmYU3qNSZ5qqetrtVz9fRyDrm6xxn/krknIzE8a9oK+H5PdbDu17SuYa4tutxKFmpl6363SaSXO9Uif3L5dY3LVixzrIZ6acukrR+Aqr66HUtVGetWkq57mQhvOG1p5wa1pgq1YGvrjZrHJ8Ep18Wl8VnKz+nozaPRKr1BK9m0XTFo0JHMWS7uJmGVpzlB64dalDJK4gKcDSFQ59s+Xup66q6aupTUwVKvNKHU+NGtfU/dbmOosEJAh5AeV8SHFlcD8BZL+YlQamqDmoab+fTRJO+uveIWLec8TwotDcnJ1BqXk+/MY/UFG+2T2bavf3r0rzVrlbH7ior7Nelc9YOO+i/8WCcRVoHMUfVkipqyCt3QVPcaQsTKQMw61c4zV30PI+7ffeZzLmXzxpkZpynr6IbMveO8xWR8LdZ+RN6iTWRyfsu3Z25UFQeXRN7UE7zKtjbE212C5A4Cuf4kdaX8HaZ2VS0OFxdvjLjCr9bmXcBeXbk4WqZR+W/9pr1umwbg8p8b2iawri1Q2AvBq7OZiQEOvPVrSF8hEaJTaz9T7LNSHRXbvk5HIsdIv7ZJy0r5a+ZSPVZeddq8nHwql5NRHYSIsOlR89Mj9xXJJoJqy9qw6aCnrTPydYOWXEpd0mNOhvLU11L5NfLXOW1hZNufXiYt7fZebancYiCRsauptkj88N7YomK6h9dRY6THp1LDUl9rOqkslU/1pvVz8iyzmI+pP3Rg5PuGclmfS/jtKqkTh5+r34cbHmAwz7pHcWlcpGMhp1NlcuMkJ1/MyzXDdYvvnZyMU0gyvtgnitaKe51LLMqaji7xNI42fAt7SkePRzn9H/2yOX5awyjT8ht3mltbLrK04Wt1SJ6vFw3CSxdPqri1ed5Aa4UNcuS7fsVqqm+5mHVCM2qi5BadkYLMiUe0wti3UeVcX6U+xW0odWjGkR1Zvg0rOlJfV8QfV7yn/drtR0EpjZzWvt7q5x5GW21urdfra02eytJ/JXmWXXTQIsOr4xKaI7/yg7ay5Goc73WOSWQaPUbxQVrGXA2lfj6oEXkz9CGvo3uYRHVgiZk1nZdkwa53wMgTfUWuPl3nyMa6LShjLsbU8YYxzVVKcqX8yI4TWrSgqXKk6fiTTPBNTqx9+Mg5SnXWJohcvRF5enl75D4RtKtMWG7IrJxTPS8Y6h6RWoyf1Ohi5U4EMk1Na5ollmXRXXK2jMmrta2pr3Y4fSdGNV9zc8ko+bQP9Jz0+zT1gV5vPviWH9+pHyrrRHf02o6q1okdag6vaubY1XnPOcdVqL2mrvqdydKi1WOr/VVFTsD70tk3Ws9XS9rK5UlezifVkyvzeVaPN+hL5yRm2TENnhXA+keKTmuDacQc+kWt/+mEFjYTbAsAUwu5JulWBC9bAFrI9tV8ggSNIb/S6gV2JjKOBF47dZvqo3T26mmRr8ooe8dJT03TOOkx+oRIqLzNXmwfUKFUqTuv+leoU8qumbI+2vq+TknAfVNDchURq3JzeiSLzU5s/AC5x15v3atw6vXbys9oA+nUD/El/Wl+t3zuOjAXBiedH5Qme/JHK+AahMtzpP2NWXWaIJ6vS6PXshuX9lf/OJVHaPKQxZhvRY2XE0rn51qVWlPsvbqrr7yzTvvCAfeVeBwa1FwJ8zJ/6DMKTVLjjLT9qWJbJS2z55vbb5U0pRWYHpsqtQu1Nrhd40JyVmDvDbk2yE+7fe4hieRHmOO2ozT1S2V7ymp9vVkkgjTMOCvJH0Ezvfns1TnLz71+NdenBoT5rsi9dOlrF5XK2Q/t54xTo/sjY8JnlXy8fR/6Fo5JHNknWzy+un8tbZrRBtVJRw2qU19UxuZ3y7vASK991UXnpEvz9bry+X+fz9/v8/lfreCOFJSH5XLNTISGn7rZQJ0drv8Ahbz90e2BdOyrVgvjojQvVnW5QtdzodNbKhk//HikfuD70LZ+idsgPw32A1ELjd2amypek9EyktVxrnlTjrPHqWU/oQH8QXt6G3p6blwj/1JVtCe8NAGnsiPOS7ZK+WqzVk4oa+Wqo/s4o49m6Gxs2F5GVN+638t9Kc857hYtafpv6R/brwmUKg7MZy9XfFgpHujN+ar2jqnZLdjSF9zH0aiMx/1snyP9FAhEGfHJVl9tvVhjOMvZzeVpDdWp53SM5KOTtDDUonuv3n8l4FbNbgJyelQmVRs0DU4dZmis337eNv6vXbdr5Vs9NC6sqmC/TQVthx5XFTQKkAlub2KrsXqXmLfVVatT2LSjs2aT+GT1PGdwfzR5s0GIFoLd/zbU3lXlP9sw/4ly8apYndp6bdW7Ru1ZH8hCnF+3ra/HVc+0Lp3L4+y0ZNvRW9cbX6VJXrbRlH4NlbahsXqDWN6jmFGDmvi2ma1Afah60/7MVlj0s0rx1WBuuQI81am2qNaIflbrXUezYpf6Z/VoL8z6Kk1Z1Hyw/sxK64+5z/Yj1z5iRCOJ+mJrP/BIdEpET87SzDwZSS22xdfwjSafV1wTzUmAnMiX7NZ0Z+u4uJlt2sGiTni7YZMJFek45+KSUWeQtwqUZLz+nQlna6eWc6o7NoRfudquKDkVy6SAFx3IV1v4+BRr7bEb15QAmetHLuzfRGBbEKl2DsTtT73qP9/DoM0a3aTogrMta6vZJqWU5OVdbXX6pAKjOW2wo+Y7jVO+zdEWlPLgChN5Xs22XGtPIZOmOJ86OA8+F7jaunQ70aCgx0PSyxYjpxo05N0sV+QbkQ7gstj2knz7Y0ZhAs7bCf7leNs6qV4tK/VBLK+Bt0wWstIl87frDVXHx7RuyUZUafSJm9daup2Cvha5LS4SCztUt+gYUYevmys4kmmMMtoafLNK+naQZiP36vSMmclZ8vV4uCLL5tauVVuTxqXVadMql8povh6765gK9CIee3GkVwpfN/bicXX5oFW1nDKds8aEujnu6GyMU3iCJuWYgEov4XiuVT9z35Sn9xuVSfNFh16TqrF2zPmQy6vpaClLULRU2SUzow3WIe5LapReH7ZwSFouhJntIN1z7+8CZ/EbxSF86koWW1Dy4tN6j81VtVc+kVTr5RvyrtzdgA6cjiJfY7tR0RV6kByihQWzAr7m1uXasObwhvK5k+QGh2yVER2gkckIXda3s9NJe7SZkVuJzFpZVkdUKT6x6mlFiq8td43xteZiiCAnYTrLxarmn3knfGK+zaEWnN8593N5C9tufk5l+ZzK9M92mslTfWl9zc8de2Rz9V+a53pqbut/soFjjpGZuo3Hh4Ay9lzyv/6bZrgSipOs/TiUNsxXp4QrtIFMQamvRo7rDyKMCs4u1F02u56jTPSriUFq80anKu81mXZWXF+5xLlbznTZSurGfRud+dUswZSUZUzvw1lvfzBnB2ymDUEwSq17H4lvOhnXR5vMc6V9fbDdbltNeZ50m6xI2dVky9eme/SNkC0x1qk39a0kX/LFfwPlBWT0pnqCvfTaCaM9qqNiVKxpZ4OyQi1vOA7GWcYF3yqSrUS6EgMqP/SYMz7UwFxlpWU/apbDR/0XkdR8yo2a705sXa5phIw9k5voMU32tnKDI9LgK+mY9BmNiWicNtbptVW2ERFutN4qlnZga70WuTAGwoaxlnqdMown39+dmuriM7shY/m/8sjPSJus8kCiC8VFyLnGRF8nUCBjhOhlC8ZGNmliH1Nz2lcU1XZmHezI1MbqsaNqs6iF5LomXzcRzAsNyNULluy5/q62Xwv1WHZhV1/ZcVg24UpkK8D6YBXxLtWrtssCadBVlhxbwj2z3j1jjW7RZuaOtLqOndwNlbjaIJzqnsVabKfeh3OdekOOTMf2PJeO25+bC/LbCMReXp6v79y4oDxXJVfs/XP9xdePE6QD2ZTT4BPL8L1Fa//mbXslE5VvZtWDyx/XJibTOSQqXabzd651ZhyYuloz1Oj4EBzpCRo4xRfrUiB3DSQ1F6c6/hcFKxk9too21vphxYfVYtMtq7LdAsJ/2QvdiooVprpvrR5mKBiN9oCH7BEpmiX9VRsUug9jyw5rCL6Dlukp9o+vmBN6ZXrrYGAPgeXY3aNtTN0zA8LWDyJjWjpJC13m1Y6lQjMXrMrP8ZNdrNl28ZF6uiqvbmoFPc8dc3Yr9ao4Sf9X9wgHY7JqrRG2M/iVRxD+0ZH+eG0748zMhb7g4mNStn8q3Sjtdbfz/Y23VvdqK+sql+y1uazfFCYc6dDSxWk53KzMpTjSoH4+WR2jI40epGtzAJ5bKcr6nBl4NMkGmCHwDnlZTXJ/dDG9yHZ8ks6rjHLzn1AzDYhq7TihRuQ+pBRVii97PCr32xaWaz2Wa4j7doR6U2+YvIcsJ6t5bS0ut031LI/a53qRLyUyOezOL/ryJiO1yGr1T31aiQgX+s/KaG3XSP8Cow6t7kezZvLxMTcvaNrhbNIhGVYPOK+4GBhqiHf7r1vWYy+D1ESCwYpy0Yp8XLyoHZoRCzq39EI2TqiKjLzlrzX0jvCPV7j1TOYkev439Q8F3qSW//hbifCZiMrVpDrbdU2rI686Ck/qImaX6yvPQwtjyr64N8HqBunK2Z6oOmcuGXxZkWLmE75NKc6FxVY3FwweeVm7PFyOHjOfz2dzAJ5tRZKZG1c23tT2EmBNJyqiU+2IKHPQyaYb+gjbPY2iN8E1kdrmGAVSfRyo13oaoH653jZVww20ZSSongFH8sGZbLZs/B7gwUKF9EOzN4v6b8joH6uOStJ33P2EOslXhtkPF0Y2jFtfY6lr1HVr7Kq1w44VRlkfKr7qyCYRCbVVWI9OI01G9ESq75dfwvPPrYDTOeuQYtbh50X1M1HFGhdBetbzV2VqX5TGf4DhJUMWUiBwAIEnj7zGp6CMo2yDcjtH2vQ4a22aSkHn5Tr+TEhFlIMocdsG6Sr6uixgs5fkuvS1lpMNFGsVUOYJlNiV8n1FSqRjJz3PyUQKbnKSa9cg1+UnlU6ZW0wXc2rUPBVFV8AXtsOeb3uPicRUXZT53hOdbfX4XhJoOQicQ2DqCnhvk+iGx5MBZoRedJAHgej5+SmO0ofMVO6t503BdgGO1sW0VQBUyeaVa79XhAhSlCwklatW51y/im1DdLdzXLcYaQUcqwRSvlVhFIIACAwn8He1i5Cm1av5NJw6FILAwQRwTc0HjgXWDsb6acUfNbLWDNWVoeoDdpHhbSzRb4O0Lo4gAAIgcF0CvAUFN+frdhA8A4FRBHCdjyIJPXsIhJA6BNuSCue6Ch7Z0Rid1sitqAu+VTbo1xwcQQAEQOB6BPwWFLo5R5Pa9XyFRyAAAjsJpEE4rvmdQFF9EwE7DuURmvWwmcYpxdx85P/oU4jSejYy3+QaKoEACIDAIQSiH2HaSfEQ6zACAiBwKgFc86fih/FeAhSIuz+KyBFu9wKEPAiAwFUIRAE4OZWuJ2x19Jfs09uqB/VAYD6BUaN+vqczLCAIn0E11vnuERaziM9cCK2PFowLozNZBZdng/tHEUYSOAEBEACB+xD4Lwq53VxYu1n4561W2tgTfNMrnuUryIpCFIHAbAI06F+8nEZBOAU4j/+XtrE02aVyOTCLuvoCmWQoOV0vH2I5gi6PAAm7dN0mekQhSfPqNwXh7pFZUrWiG0UgAAIgcE0C/7UEyz7o5me0Lu46u1vGQTi+T9zNEQr2EXj7h8HaSvgjgnPdsuBe4MKLD9VA2818qQz/6E+fmZofc+ksySrcM67zNdpy0wC1rda1pXRsEbOImz7Q2/DnVXC3BUXrXbt18A4EQAAE8gQWW1ByYrQ2EdZ2chL782br3+8hNDybgNz6KQjHvyWBx2BxwVxb8FYIsk1AuCRVyNlSp6DqSdlxPxAk9xddhg6eHkwAzlnpp5Ko7pNooS0gAAJPItAUgGuDEZwoCRyfTADj/Mm9i7ZdiUD4YOeia3IuF0C7by/sCji3A8H3lboTvoAACHQQ8I8hbK1z9tf0NjjC3vHWXoNcLwE7zqjuHcaa+nwHX3v7A/LPIkCBd7z67dqn206S5lJ4TkUcgP99Pt9/Lu1/ukHfoUoQb0L5RAtOQQAEQOA6BLpWwL3buRUKX4gECDyPgAa3z2vZy1rk5q6w8rqh/Vvmvy11Nrh2hyrKXo/e51zwbaNpDcDN0cXcya9evUYkQAAEQOCyBP7rnbn8fJjeUHzBmLbmVkgQBI1hCy3bCND4u/Lq8pV920Z8fC2etvzcRZOWP8kY+354HkpKpMZa3VDJT41U0Z+E8tZUutuitd715CxzYRx8TLjysrfpJQ2+aRWcgJA4g9kBNhhHCgRAAAQOI/DfN7fq0GrezXl8sHMqf12YZLTq9HI/vvn5UyRA4AIErh6EXwDRdV3ITknrgVu2GrdyWfebC+gr8+R1YR3lGdFNOabniS8uCKdqxJuky32U1MUpCIAACFyEwLYtKOo8zXqFmW9XYK/6cQSBCxLANzEX7JQru1R4mMqVXZ7vW+HGUTPs9o1HP8Sk6Fv/anVRBgIgAAIXI7AvAHeNWezlu1gj4Q4IgAAIgMA1CMiPL1dWudVVFTPxOmfxKji9kEeXw7WCHI14XIAzEAABELgIgSEBOLUFQfhFehRugAAIgMDFCWjcTPcN/UtdlkBdcuU9ES6s5q0nkq+L3/5lcfySpFQTzkEABEDgegSGBeDUtKYgHEsT1xsF8AgEQAAETiGgS9yxcQ2+pdTeNCStAbw8lzDo4FIrHqvFGQiAAAhchsDQAHy1VW5ixPy4SgoCFyfwtn3gGhBdvFtOdS+Egae6cXvja2PNcqa0Pb9949EAEACB1xDofhHPVjIasPBk6b4mxGPTttJEvSsQeOoTUdYCoCuwH+1Drs1N3+hRAKgRIFYWdneLZ+m4MtKUK/Om/d/Jr1tJjv60P3Z7AwUgAAIgMI/AtBXwdM7UJth8Dcq17GpH6+vVfJvlT2vQMcv+3fSC1916rN1fGww21ULg14QpK5SyS89dJc2WvqGd35ojsfcb5+wsT2SCAAhcnsB/axNWmN7a2sIBiVbilyjIcjdNlGRLi1QbyedvdCRZ927UCmTZh7IHaTuoPXVvl20XBuvtVFZs44CXwdR4WF9Cuq8NoV5Inf1tCD1NeEsrWuuQXM+/UWO7xybJ5q/FXi3z5Uf6yX2TnZzkmq1d18u6uRHR2/vz+W2x0D8vlKx8+QdDzNWg+ZkVbb1feA1knP59v/zeHRWl6n+kzt1bqn1lbHm9SIAACIDASQT+q/5y8pt9rcSqq9GLycyLfkrabLAR31jpLWm1KZXm8WX5lmAuo8a3czFvuwnfC9jE0h0feadFQW9IWVWSTmuFNre2Uxm1ypPdKo+su9nMZXMyOXGfZwSmZ8ljFfhJC0vcVevyGhDfxQXZTqVOi/abVdrTh7beWrqlD9SfWT6Qjy1+rLWlVl4dpYVuqtZRY1qXh9Kyhr2etrRR62+pqy6OOKofVle3T7wmo4wcODqN5lXKlwy2qXzdGCFx+vqWgm/VxFG4ylG+L7De7ktr+2fo3ucZaoMACNyNQHUFfOv8xXNgdmU71aizpWKj81iGbvZ641epo4+plzTRlybghSw5W5BftjbXMuKR1ZoTXuTNYEc3oVL7Fw6sZIzSs2KmWhz6wQXinbjXekhW8zRUr7pyi0IaUzOC8CuMhb0dEM9ee7VJfQ36xmg7WYs+JjBcdH7K5w/ACvAn30jJ3CcPIaQi+ZPvq/y5DcJd81TNyNY+qh9GgoEuEACBTQSqe8BnBG+bvESlxxLATe0aXYt+uEY/vN4LCsyjD8ASZscBtYu4XQROoTp9IKQPcLHc62kCAAiAwIUJVANw8puC8CMDcQQCFx4tk1xDn08C26kW/dAJDOLDCchad5taF3+zsKRdEO6icIznNo6QAgEQOIfAagB+pFs6YerxSNuwdS6Bq/T5Vfw4qzfe3v6zuMPuCgFa3bZ/Rpy3LmmZyackxnMCBKcgAAKXITA1AMfkd5l+voUjGC/X6Cb0wzX64ZFe6DYRu1eE94Xr5vBlq+W3AXa9WzaDS0CebD9R/Us1u3PEj3G/f9ntEBSAAAjcmsDUACpZslwAACAASURBVJzI4GZ+6/FxuPNnjReye5btwyE3GASLBkgQ2Uwgjr+jTd+xTifo5V0cHq16a9Ctx1jD0DMNwocqhTIQAIFXEpgegBNV3MxfObY2NxrjZTO6oRXRD0NxDlFWCVWH6D9SiQ+qyaiugtcciCrQSrTs+XaPRsEPMGvsUAYCIHA5As0B+LAfYi7uIIuMy0GCQ8cTQPB3PPOcRe0HPeZkkOcIRM+xDlR4htPgsSATpONUWpdKnzBjCg5qibZGj9J+X8LZCi9mw2du1Zsfi0li+mdEMXYNDCRBAAQuQ+C/Hk9yQfiW5wHrC0/wdV4P/SvLxjfPUZ6mN84tY22UL2/Wk/bDVhY0f5zdh/y2xa0NWKnnn1ydxovu8iDbRZmS7qguCUnEOeeK+/BbJkuujMpXPHSUdsStoTOWcdvCRV5rUamVd6vgAU1Uqj7TGMb9RmngCAIgcAUCzSvgJWdzQXlJ1ue7+XPUjd3rReLRBDaNtUcTuU/jtO/0eB/P2z2NXiRjq/Gqt0x6RRkrb9NRXY1MrcDYtHlx8VjFTpuG0fExDaqTGFvjbRUzv9eM9oKTDfp8osqTFuB+kwDBKQiAwKkEdgfgXd6bibOrHoRBwBG4WgBXutk/s8MksuldxW7tsycESK1tfeb4aGxVIUCm7C+tVGvATepM2lZjOfd5xOf7RKMfEAMBEACBEwl0bUEp+ak3ndqN+Qk311L7kX8sAR1vwar5GjpkDk+9K9jO46td47kay77KSYW8afPEAU/I0Fbk2my55cq1bu5o6+bK75bHcbLrD4qv6dzE2dwcljGZHHCXBP2qt1bg2nfDAn9BAAReRmDoCnjvjeVlrNHcaQT0xjvNABRToNQZ11xqPsC3b5caw7mhRHn6pxE5n+vl7Y7fD+2lp98TyJhcjkutcKkmwxkQAAEQiAgMDcAjzU0n9Jr7JkEIgUCVwKWCvaqnKDyLAAd9J8w3/MNLtUtbLOQnhk0YjvY52v7R5OEYIW4nq3KpkGFzxRh9mFKe7oOhBuNjvIEWEAABEJhPYMgWFOtmLhBq+QqV6rXIWVtIX4XAl2+Iy5WoEf6ZO+2KOh17bx1Hb2//yvBwxd94j3FbpX1SGlOaVfhv668dTd19TlyzNjVPrnBK0UcT12B/XPptZwRaCed1c+VEP1p1TzyxQfpSC3JAAARA4FwCh6yAa2BQaupaeake8q9BQG90ehzrld6Qx2p9mjZcQw09yqvPDXKjRYxdHs02glyzZequid69nNnQf4qf5C04SgscXv3GSvjdux/+g8DrCBwSgL+OKhoMAicSQDB+InyYHk+g8BmcY3VZ//b7wccbh0YQAAEQmEMAAfgcrq/VSqvgc1bC74mUeZzgOgXhCMRPAA+Tcwj4J53E6nXvtz1Wdq/w3IT5KWaIMxAAgXMIIAA/h/vjreImZz6I2G/OH9/zaCAIjCOgq9ypRs2nI93E6Mj/3OMN9bR0xPxUIoN8EACBowggAD+KNOwcRgArvwH1WSzOshtajtTtCfioOgTYJiv89tI8jlC2j0dSt8eABoAACDyTAALwZ/brJVrF2y9OWv1FABiGALE4kseRtkIrkbo1ARMzU1J/WFlrE1fRrSl6QmvhRletPspAAARA4EwCCMDPpP8S22d93YtA8PgBBubHM3+MxSiYdq0qBdOUb+T51Mra9GMAoSEgAAJPIjD8OeB5OGuz4Vp5XuvVcucFmsRnuZRM9uQr1zIJeib2zKCopc1rPpa9f0iJG97LHuxrn4wC0vKM66Wv9WOkc31wNE26HlqumzEtvp4W7QM9youKqBfkHZfcH1ro3JdTKtECkac6nPr+eC/4H1cmvvKE8LGtlxfHyXzmDI01AG0gAAIvIvDfWTdzO6HKVFab0OKyKwR0o26gzEHvKW7g5dsXM9Ax2hqEq/yoY2v7820Z5UVZz4yX8ay1OW2rPacutudlz8slYZiElErnR4eUcohSE1AlA44zuG91a8GbsC3RfVrfiaN+jEBJvq2NJ7X3pCPhJ37SDRokO6Kub7SLlLOeBw5Swv+lQn4c+O/z9/19/oe46gdU7Vi3KyXVk+Mfxkwqrf1FQfj38+VXhqqHwTOkQAAEQKCVwEEr4LE78dTm32XWtLIXJshY523PYhjcDLox9LSzV/4oVj1tGOnTWUFgtR84MBjZyqCLwgAaRsVwoFgQdDwtlR17haC3N5aqsu4AST7mgsAOFbcUjae8MDg5/5+Z+0KR/9yU+zAp6+YuAP/8Pv++f7wunl6PpC62vcQndZZS+i0iHaXfKAhf1kcOCIAACLQSwB7wVlIHym2Z2N94Iz+wSy5tahkuBHfP+jASPDg+1RsX1fgd7/2LLbqOSOcy2z9R2pxQn/NSTqbzM1kvhoymgwAIXIXA7QNwXZm4CtC9fmwJvtVmeuPSfBxBAASuRYCuVVyv2/qkzE32g9e0cqC+ISLXD7J6rNlAGQiAAAi0EPgrT2Yt1c+V0eBbj+d6s9/6nuBbrd+5P7UNOILAkwngGt3fu0uGuiVkJbp2xfvmWrW1vx3QAAIg8F4CvAK+nMzmAZkVLM/SO49ErHnfDSHWdWR/xpZxBgIgMJrAW65nnQP1uImjPpqQKrtg2+xU2aQSlUAABEBgBgG/BWX2JE/6ZwfJs/XP6AC6Sey64RScmt2fBbPIBgEQmEDgLdfz1rmQ6tH2ENkiIivUdi18RBCu+rf6OGFYQCUIgMCNCfgAnNowd5IfMQWuk75bEG5vEuut65OY2599vkAaBEBgH4E3X8/U9nL7wyxKKQ6QORFWwYn82DtQsLmvV1EbBEDgrQSiAJwglCe5+yC6WxB+H7LwFARAYAsBDf74uCN2Uz1bfLhjnfR+VD6X1W+/Sr25sW8jvBkUKoIACOwkkH0OeDrJXekrN/FtfZJMg3D5anInLVQvEFjvj0JFZN+IQDovjHT9SnPM3nb9+MHiQYvG2/Yq0XfEBKn1lD7jg/Wo0vVqXRKJ6111e4TTsZTr/1Smpp/q0wtyeN83seHtKFKjpEdtSrntnbIluo+U9JVroQQEQAAElgQWK+BLkautirdNlGk70oA8Lcf5VgLaH3S0f1v1od4bCTwlqEmDb+pLe1Voeksf/3QTxaTgm32dqFvbnOvrXJ7Ktx3NCji9hqfjtzXyVktufdWULuJo4F4VRiEIgAAIrBBoCsBJx/4JcsWTA4oRhM+CTGFF+i+Xl8rgHARAoIvAAQFylz8HCJfuPWm+Bt16jF1rnY9a5WLtOAMBEACBXgLZLSglJTThHfXpP51cSz715lMQrisZvXUhDwIgAAIgcD0CdF/i+5P+CNMff2bxqBZc18qu1154BAIgcH8CzSvg2tQRgTEFwfqneo88YiX8SNqwBQIgAALzCfDikPuGIF4okvvN6OegzG8RLIAACDyZQHcATjBGBOFnQ0UQPrIHct+L5/JG2oQuEHghgdkLtbP1+5XpbX0XB9ZLHTTrkIweg4Q0DPN+IIIUCIDAuQS6tqBYV/nrvpvHWDQZYzuK7dUtaRoEdHMrDYZSfqutAyKCVlcgd9gWtLui/m55vAk1tnSZ2OGvMrQV8K6AnN8UJLcs5JRktH7xPrQRULgfBAVqQ483Rw/3QQAELkJg0wq4+l6aHG35mozKnnXEisgI8nSzKv3t1R9uhHs1of4+Amurj/u0v7y2C7Sj0W6Db8KTk7kxttx4snmle4fK6DGSc9MQH9yTUFSuB9WWOj36IQsCIAACuwJwwhdNfgWeLTKFqodkIwg/BDOMgAAIVAho8M3HNPh29VSmoub2Ra3Br72v2DQz8o8hJJAKU4+3R4QGgAAIPIDA7gCcGNjJbx4TO5GOt3JWED7zltB6IxtPExpBAARAYCyBlvnMBt8kH+roTKv3ET1v81HvcXTUdFtNSIEACIBAnsCQAJxUz5yUKDg+YuI7JQh3E/pofuHGk+945IIACIwnoEEfrr+xbJt5Rj/A1CA7feqW5o/1EdpAAARAoIfAsACcjI4OInsaAtlAoPlmFaogBQIgAAKXJFCbz7ILM4sg3K562+Dbpi/ZdDgFAiDwYAJDA/AHczqkaSM+wNRuVoc0AkZAAAS6CeC67UZWrKDbUEgAXIuYUAACIHAyAQTgJ3dAaj67opMKFc5xsymAQTYIXJgArts5nQOuc7hCKwiAwBgC0wLwttXcN/ymf0xHrWnBzWaN0HPL7Ypf2spTfteQOoHzIgFct0U0uwrompC/kNKc8BR1vnLEjklmDdNzy7MFyAQBEACBbQSGB+DlFVw7w+mk2Oa0vhxh9s1K7bR51SfV9oEk6Nwkf7E7RG8bQuvTlB07aVl8PrMPY0v5s3yb6Ze2efkjckcF4fm2HdGC+TZ621bqTtWjxzXPSa5Vdvb8t+ZrqbzV/7R+rp7lQe3Ntbkq415S9Pf9fP5H94Kb9xxRv8nf1x3lnO9IZppR37ifNZ+CcPeXtgXnIAACINBLYPObMHsNibzOZFq7dBvT8nAMgZWtk+oL8r2p3ETfq2NNXid1lWPv3U2C7ga2ZSSj8q2+cf1UCRvLZqob0TFwjrI3n2gbWhTU27ne1/X6dQ80SB3Rfm6z9qszK30j/bDFRsk/1iXKqw3U+iq0xQeqO64/1ZOgc0//BW3bU2nb1vxJryodoameFo/SOmu2W3QeKZP6f6RttaU+UD9QAP77fj9/39/nS2vh3FlUQoF3uDgtZypVHXzUDtUjlVNVmqvdUW3jCAIgAAK9BIavgPc5YGa2vopDpe0kPFRxj7JpKNIwYcWpTvEVbYcVj+rDNFDd3ICBHIf5ZBozQ6dR35zUgKe5QoPgKPS9vo2y29BEiFQI0FRKNzb9C1OrBN8UgHMQTgF1RU9aREE3/oEACIDAKAInB+CjmvFsPb2BwLNp5FtHjJ7KSVer9WgJSCDdE0bY2s9NP3UsPLfHJrSMAmYNmnd+QucrzF1muNom9BVUgsALCSAAv0mnPznAHNkFTw28csH3SG5P1PXUsfDEvhraJhd0y+H7oWuH0xqMtxpz2wLDOJIX+vC6OaLwVoqQAwEQKBC4TACO+azQQ8gGgRUCfO3gAspSCsFTthiZDyXAC95hq7dvZW8M7itmfqPjy5AAARAAgQ0EDgvA9UaoR/FVXjGvfq/HEOsSqgtHEACBcwnE1/q5vsD6ywhQ8E3RtjtSujn4NrcZ+sGlr6f5fNSTl3FFc0EABIYROCwAJ49LN2Tex0rzWWEfL5V7mWFNhyIQAIHZBOiaL133s21D/zsJaLDNRw3ADQoej4X4WYNtDbw5hjcBN9+LjC4kQQAEQGArgUMD8HUnZVYs3bALc+a6WkiAAAi8nkBpXrkiGMx1O3vFRdJpMG61rjI2AhSQh3/RSchGCgRAAAQ6CFwsAO/wHKIgUCBw9UCLv80p+P62bAqQ6J8eZ7S/tuI52t6Q0MwxGaJrdANvpC8OvnWg5RrgSPM+7xp1KquV53QjDwRAAATyBA5+EU/eCeSCwDqBvhtfLgi/0pNENAi/kk/rfTBHoiX4Vl7Wgx52faPHWulP/+Ll0n4FvHVZNi0f6Tc5OsD1Te0dXYnGFM8BFHf7bSj6Qp6MNQ2+Sw/7dvG73xB+dMdkXEYWCIDAvQlgBfze/fcS78fc7XJB3EsA3rqZpX4r5Z/a2FERrAZ8BzemFH8e7MYwc7wKrkvhrDUPtm2GISn9G+YiFIEACLyUwIkBuE55enxpD6DZryZwySByQo/kvpGYYAYqQSAQcLE2HehJ4HIMq/zu6eDyXnmupRJOhauvCoOOpEAFcAQBEACBDgL/HREApF8Vq82Wr5472gJREFglEMbedW6iV/RpFeQGAd0SMJL8W9htwI0qTEC28nzpmwm64fxzWPy6D41GOnFHPtDLeww+TfMOFj0x5UiCAAiAwAYCh6yA600y9Q+rYikRnB9FwI49mz7K/mvt+MDntQTQ8IMIUKgcdp+EFfDl7yg1qJajnrGb0YmE6UnWQa2BGRAAgacROCQAfxo0tOdoAve/5d2/BeP6vOcDT+nD+zhvBmsasImaQ8WTPqiM2sI+mGqXumj1mmq6H2GWlfAvMLG9uwwIJSAAAhMI4CkoE6BC5QwC40PYnkBwX4vI99+HtmLdLqDc1/BibWW/CJZMjbuy+u4Nwt1Qf0IwbLrz2KSDR9ccjzENwnPTiP+wY7ai+MedOLe1T0iZ282yXEk/tomwBgIgcG8CWAG/d//B+7sQsDfwu/h8op+3Db5HMLOvPx+h74U66HKTwFtg1j7oeTwUf/tg3Of6hP/RZhqcewkkQAAEQKCdAALwdlY3lcwt+dSaUrkD1aqhbDeBuwaduxueKACHBAhOOwmEOYwDcd0LLr/HlC0psjPFhdIaWstc+bPfYKgqPtJ/9K/TJYiDAAiAQEIAW1ASIE88TZ9CU2sjBz+6P6Am6Mp6dDeoe70I8X8zUwTf65fATEZPGXscSvM8Zp5o4qJxDcqjveEcdFNwrUG4T0rMXXmHz3qPQQIEQAAElgSwAr5k8qicpq9ed7R4ZjCww61bV30r07e2u2ewzmY0W39PW7fKuhCaQ2lJ26ehOK1uNdwH45yt0k6GV72tF7r6vSiwQkiDAAiAQBMBBOBNmCAEAiBwZQJPCByvzPcuvkUhtIuu6Rngsh9c94XHrdkWTm+rFVvGGQiAwJsJIAB/c++j7SDQQ4Ce1lbYnjT7m5YWN8m3kn8t9SHzHAI6Hr/89KG0XZngOTe2NZrn7SdSR8dX4TJIDeEcBEAABIoEEIAX0aAABEDAEvi5R0RoEKJlPtjRgEULTjpmwquTPIHZUwi4cShvvxQPaIzKONXRoUd98kkcYJ/iN4yCAAi8isBBP8Ks3ZmljKY//S069UCYHkOK8/UZrAO7iVYzNIgYqLZLFbeSUMTNjXW4HwLVaMYVaMVybttG/mhrtq8pm9nnUXvoR170bGJ+Khqty5X/cf+SQE9Hrwyd1BqN95oPqTyfu/GZ9rm2k469//bULdnqxFZSsym/hKDXJ2aZreQ6YZN3LZWyRlsqXkKG+fv36lBb6EeY38/f9/P5460osh3Ft9J2GGe6a1MF9Oguxu+H1qzoTuULLtFuOAECIHA/Av913+VdG9cC1v6bcRyUyPRmZ8cAV2/aIWd/quzv0oc0ANlrPbLQMK9H8hXjqipdsaxUqRaNbnfOWNoPa+Msp2NvnvIa0d5orPrHm/0abt99EfKPgouOhssYyo0k89QIq49FC2UU/OdU2fqVdEvdEX1RcWF3kbYh2wd9Xcm+sJ4C056ezvqzu7X7Fcy9rr+ff44dtZ+C79+fBOAUhP/xR096KRZ9CHWE+PPx9+MvUWpiAi8E3UnBfhzQAAIg8EICm1bAW6YfXmEr3EBiznlt+nU3yeYkaPKcO4mT5XwDKEAbERCQ9lzbYj7bz0R/vg3btR5b85h+zrdpWD8vxuqcXh/T0/lRydfaGAN52JXcEddaRf3uIg2+SVEW0aL/101m9axXW0jke3MhdmjG7Hlb+iNcY2Tv709WvmUV/N/n9/vjudfLkrhWyXxg0uBbj6P651DwMAYCIHApApv2gGPyuVQfwpkbELBB2g3chYsg8CgCFDiHwF+eQejvYxp4P6rFaAwIgMDVCWwKwKlRFFAgqLh698K/KxHA9XKl3oAvzycgIXYUX9uVbrqPRYXPJ4IWggAIXIfA5gD8Ok2AJyBwHwIIwu/TV/D0zgR0fZt/9czbSzT29jG3S6jknVsL30EABO5HYHcAflZAcfV9ofcbCvD4KAJnXTNHtQ92QOC6BHz4XdiwX/HcReq4fiuMUAQCINBMYHcATpZoQjpyUkLw3dy/ELwogSOvl4sigFsgcBgBDrvpPy6hYbhch+1r4LhuD+syGAKBxxMYEoAfSQnB95G0YWsmAdzMZ9KFbhDIEwg/xqRyeWh4SwjeIpO3iFwQAAEQWBIYGoDbgMKml2bbc3Slor0GJEGgl8B5t9ZR10lviyEPAmcROO9qk5fyyIZw3FnO6n/YBQEQEAKbngNegzckoNCvCelICvlYs4qy5xM477Y9m216zcQrdLOtQ3+NgPbNpfqE3qja+q9DlFV+kzdBttpplOOpXRadG2v0i5X6ivLJPn2Lyq3cdF8hoNyKfsdQAwRAAAQMgaEr4Ebv7mSY4kJqt1IouCmB3ijips10bmvQd+9WPMv72/ZJ9/Q591qbq13GXK2vOPjmCL0bjGxXYRNHtOJZ1w9aAwIgsCRweABemxyX7iFnLwHcKvYSPKc+rpNzuF/eas/q9+Ubc7SDsgTOK+GczAThmayjvYQ9EACBdxAYvgWlhA0BRZ7MTC6lr2LzniD3agRobKAPr9Yr8OeuBDjwJufTIFvP9XjXBsJvEACBWxE4fAX8VnTu7iyWv+/eg4c+3vP2sNAAEGggQHE2Yu0GUBABARCYSgAB+FS85yp/Tvz97tvlzG9Jzh2h97F+mW8iet+d3j0JPOFaqzSatp5oBI7tPPe5AOEpCDyQwPQtKPga/YGj5pQmzQoMKjfrU9qZN4rrKM/liNzLBN/a2N4gXOt1HKfGpu5SnnlF84dW99QT22x6/kn8Cky9/md5Y60jDQIgAAKBwN/M1TWvW+e4YBcpELgIgfvceP31dBFyb3DjcsH3bOjuqa+zzcy86rzu349es+P/6cq3PAlFt6FYCS+KBAiAAAhMJ8BbUGbf2DHFTe9HGNhFwN+yd2k5ovLsa/WINsDGuwkcc7XJXcfbcgk6hA9V9s5k0+/uH7QeBEDgGAJ+Dzhu7McAhxUQ2EsA1+pegqj/NgIceEfBdyCA6ymwQAoEQOA4Aj4AJ5OYiI4DD0sgsIcArtU99FD3lQRcFE4r4JSkNe8fX0hY/X7leECjQeBkAlEATr7gxn5yj8A8CIAACIDAMAL82nmnjQJv/ucTmoEjCIAACBxLYBGAk3kE4cd2AqyBAAiAAAgMJMCr3fSL0szqtgu+EYMP5A1VIAAC3QSyAThpQRDezRIVQAAEQAAETifAm0sWXmjArceFADJAAARA4EACxQB8pA/hV+dLrXcM9OkxVnf4J16O8nWUnjuQUx+v3ebo2sks9Gkrhhxn62cn87yjdg5pzHuU5ImW23/E1Da/P+NW89ClLPcSHt4D7s5lN3gsv6RDjzM85AJYmkYOCIDAYwn8N3PCLeumCU8ntB+vtovs1z8iikr9t4cqyivz5qSjW0YFzSU98mMecagk0+HuZtE887UbTJu59MaZt9Wm63pSeUZpm0t+n8WC/VPX+dII18fWcWjHMrVXr1Y+BvWfrfpLDCVfGxNLpf1wFO/UbuzVeWd5Sv3+HMUx9Wwv13W/U0LuAedfucdQfRq/rEf+I9/6fsOdiVJySf38WKdzeZlP2iKcgwAIgEAfgUNWwPMuyQQpE7EE4ZHcT7bB7J2oVWcaVGh+z7EUcKS60/PUBpXrX1q29VxuKMva6W1oKbE9Z1TfbPfgOjWJxWk8fFDsEwxmbRy20vNafUJqjh7Drf6Q3Gmse5ycJDvqmua4c5KPs9XW+5+i6L/P5/f9/PxbQ3/8QfL79/nwHwffFID/+Q+YNLytXh7u/DIfWQHn8++X1OIfCIAACOwmcGIAHnwPk15yhw8it0uNCn6u3vDQd1f3FP7tJfCcq3MvifPqI/YL7NfnHqXlRi4/fpBWs+VlPGElW+WCbqRAAARAYDaBSwTgsxsJ/XMJrN8I99kn/bNt7PMQtUEABC5JgGLrSnytQbgeL9kGOAUCIPBIAgjAH9mtRzdKttTMtoogfDZh6AeBhxLgHxTZ73AkKl+Jzx8KA80CARC4AgEE4FfohYf48JZtNw/pLjQDBF5NoLIw/mouaDwIgMAxBBCAH8P5NVZmB+HYjvKaoYSGgsBuAj7I5l9O+jPZlaJ7wXlv+G5TUAACIAACXQQQgHfhgnALgdlBOPmA7SgtPQEZEHg5Adp1YneeKA4XfNv94bRLhUP0nLzWwxEEQAAEBhG4QACO2W5QX15KzRFB+KUaDGdA4AACw2bLsBh8gNcHm8hAKjVXn4hysIcwBwIgAAKfEwPwzCyJDnkUgdlBOLajPGq4oDGNBHbPnC4a3a2n0d8zxKiJNuj2bXUFEnjri9+s5BnewiYIgMAbCfx3TqP9dHiOeVg9jEAuCC+90GirU+l2lG0vGBkxJnEj39qHqNdB4Lv/xej82L3orY8d9neK+jcc79SzVp2uxjA36P4SffulPAtcw3SaM4LsmmaUgwAIgMB+AieugO93fr4GBFTzGY+3cN6NdEQQP54HND6IwKDodX8If22m+tTBdAbXc3/UveCZ5qhMpghZIAACILCbAALwVYQr0/COmGv0SvBqUy4ikFsVH+3aeUH46JZAHwiAwHAC5gkokW63UO5nfZ9wUlS+Y86PbOEEBEDg1QRO2oJyH+ayneH7oaCxFDiWAule+ftQ2e+psimx229BvlLeth1lhHXoAAEQuDIBmhv0j/ykD+06X4S4m4To//KuTA6+Q+GVmwffQAAELk4AK+CVDtLJuCKCoosTwEr4xTsI7vUR4OdZ91XJST8+hqw0kIq0uGuO15VvPebAIg8EQAAEGgmcFIDr9NfoJcQeS0BXwmc2sC0IHzEmR+iYSQK6H0FgZxAuo/ScX2AesX3DX4WU8Cchydlu9ZvGgw/CnbxWcaes4gi/HzE20QgQAIFmAiduQaHpDUsJzT31YEENws/fjqK33gfDRtNuT4BH6c4gXLZVPHsKzt1hNI+O/Ef/oX8+wnZbTsxTUXyRE8UBBEAABEYQOGkF3LquM6DNQxoExhNoWwkfbxcaQWAUgWGz5ZPXPiSGziLnoFtL3Co4rYAHrjGYkG9lVAGOIAACILCdwAUC8O3Oo+azCOhK+NRWxffXqaagHARA4AoElhd9FIhfwUX4AAIg8DoCCMBf1+XXbjAF4TMDcboVYyX82mMA3oHAOAISu9AffAAAIABJREFUfPM1L/+RfTcuAuf934jGx+GGJhAAgWYCCMCbUUEQBEAABEDgVgT84rcLxL3zP7/txG4z8cVIgAAIgMBkAgjAJwOGehAAARAAgQsR0Ijb7QGXhwHwd2POSR+1X8hpuAICIPA0AgjAn9ajaA8IgAAIgEAbAbP9RLa+IfhuAwcpEACBvQQQgFcIxnuFddmkUgFFIHAxAvEYvphzO91BqLQT4IOr+/XsZNrmeNu98dI//5sfhys1Zv7+5MG40TQQAIENBE58Drh4GyZBOqdXvi9bQVnJPLoUWsmZ94xp8Tluh/7Qj7xOG5SXX3F/tZi4pT5QpRHsVo1z76TtXK9VkpjXVyWLY/Jz/MdobtDCHV24SkpdUxCvWVuoYh1svFatuazLpXFmm/3bInjquKg4XJozKlVuUcRjNBmXMq7o4d7yzMHv78uP/qYVKPqjcuon+iMuMs7lhHaLU7kMNynZf0e6BUo4CQIgMJHA6QG4tE2mx/wNQSY8WpnYGphtrUe+kU/hn/gZzkMqlgv5pYk631Zbrz+d+sDe0j2kX1VzDbUht6jmaqcJzgiGWnWmq2t7xuUSoIscFgVfjjnSbO63joHxo1EUPS85aHRXaMiopuQaWjBzviijlI3Kp2M8PSfTKqtuqEyar+Uzjy021b+SHy06SnXX8lPbM21ZX0r9bGVafEn95/o0xOzbc3joUsD9lbFhgm8adixuxra/LDhBpTz6TRBOVrSm9RhpEAABEGgncHIALpObdVcn1GjydTPiliA8vZFbW2enqa1ROwc7dNQtgnrxDv9msl5rvwYcVm7LeLb1l+lCT7jrx8rz2CiIW7mQlms1oyqINKXkg3ROz7fwUbG337htGV9mX2+pyRa/db5L6551fgSj3LWQtreFXVpHz6n/eXxRUO2Cby2jT6M0kvWPV8C/38/fh8ZlWKyI+4XqaBBOx7ssN/hWIwECIHBBAo/fA94y2V+wX+DSjQjEN+sbOQ5XQeAEArooosc5LphoumCAP3/yf+RrE/FHMwqVkA0CIAACgwg8PgAnThSEIxAfNGKgJksAQXgWy/RMXNvTEU8xMDf4VpfXg2mSoJVvlcytvGueyqh2HEEABEBgD4FXBOB7AKEuCLQSQBDeSmqMHD5Uj+H4bC2VsNkWfWl/OGW4feIOigbfPkJ/Niy0DgRA4EACCMAPhA1TzyeAIPz5fYwWzicw+zrysTetfusKuEvnW6c10mNeGrkgAAIgsEYAAfgaIZSDQCeB2cFDpzsQB4FbEqDraOa1JOvdDo0G4VVSCL6reFAIAiDQRQABeBcuCINAG4GZgUObB5ACARAoEtBYWp+IoqvfJj9fd1UgXw25IAACIJAQODkAzz2MLPFw4OkV94zODtRm66fuObYXBw6IyaqU/RXH3eSmQ/0kAtOvtfWHh0xqWVkttbn0l9ai9+w0/yNZ/XOVeqo324EgCIAACGQInPgc8Om3kkxz5YkoacExv8hPrYZzCtT8j31C9rCUBoLTbNBTZoZ5Gys6rm/mtEDZx63C2VkE9MPQceNqfEt/9iUzg9XrE667AtnBPqTqakHxKD95Hzj9h+fiC34KSaHgHARA4PYETloBnxPs3Lk37hqoze5JDZju3Lfw/XoEbjuuJgbf1Ev8UboW8Z7QlTTHlP6GuONWJiQIH6IRSkAABEBglcBJAfiqX4cKXOVmPDsIn63/0E6DMRAAARDIEbAfIBaTnnxbly4c6Mq/qLPhfs4A8kAABEBgP4ETt6Dsd36kBg3Cz/5qOr1fuMWZYU1N9ZPi0TaGOQtFIDCRgF7z1sTZ17/1Bel1AunclQbWXgNPfBqZkxS9XD79R+WSqy+c12MqiXMQAAEQ2EsAK+B7CU6unwuYJ5uEehB4LYFcUP5aGDdsuIbYqesUVlMwHYJuDbSdpD4FRbfh+E0vqSacgwAIgMAYAgjAE45XvAHPDsL36C/d8BKsm0+xIrkZHSo+kcCoXx0W2PBWjBClFqSukd0698RzuoTi0oKkoaTQKE1Kr9FoeAECIPAYAidtQdFZ7ppTnE7YVwr+yKeZ/mgQnn6l2zbS49c3t9W5ltTPBTbb2r/WlmuO8zWv31p+xevf9sV3ZhDupubJv/W0zdmWNrcQTZKi9Eqjc1su6+AqJyX0X7ru+c954+dbVaCK7XmseFs7UAsEQOC1BE5eAccM1jbyZPbXwKCtzoFST+pGvdEOxfckQEPBXFrZZa+3mdToMXwz9Y/S7a7Tmq/LS1lz9OicISWqiI9arsdRTkMPCIAACAQCJwfgwRGk7ktA7133bUHwHLfcwAKp6xF40rW2m27mYm3jE6Q0RUdZBadvGq1nGSO2GGkQAAEQ2EjgpC0oG71FNRA4gMC+7TgHOAgTIDCRgIz/OYHnzG10zUhou4luV3Fb+3QLiuigttNfFIk3q4cgCIAACLQQwAp4CyXIvJKABuKvbDwa/WICc4JvAnruth6JvENYrftt5JgPwl88DNB0EACBqQQQgE/FO1757BsYgs7xfQaNIAACZxJwIXeIvNkZeuILZdGqfBR8WzmtavPObApsgwAIPIYAAvAbdiWC8OM6jT6Q4EPJcbyvZomutdnX29Xa/CR/JMCOn3ASt08i65pcvCc8ro0zEAABENhKAAH4VnIn15sdFCDojDsYPGIebzubfb29jedx7dWlaz2KZT7TRw9y9J33KK6Vl0EuCIAACGwhgAB8C7XD6+RvA9ODgnlbQQ8nSAZLQXQp3zo5axVseh/aRuxK01cBuxRwZR7JBHxFl+VS6p/iD/qM7lLd3pYUbVUUtdjuHVemaRXL7y0iPhpPp7Pmz5XQUdKBE9dxP86M6pNCQA+gkAIBEBhGAE9BcSh5N2AyY2sQsOXm29dD6QwvjsQ352/2q3Dycc2/pFn9rhkFJlnUUws84jYtVaR11+SXGuo5qf66tJSO9iG1qeNM89f6U+X2HltZcJ+7jv9ypZZRUPBO9VBUkw775NyO7ZKvJVYl+S1PttjT/6kfOV25vAI9zk4w1US7y6R77vNirZQvN9gF0jTAqD3ydk+h5gNvlfmqzOfz9/t8aEWK/+yLuSzwHUO/uzNQAQRA4NEEsAKu3VuZWNMASauMOdrZXTWmz6KV/HKwkdPh6qjKPUenvoLIa8/eEH1peRWaRHJ1c3lG3fRkb3A0wqG5463fQ+5++o/++cAmXm2UYGcljx44oXrSY8a1s1mM7v+zx3MG8TKr5UJf1rpODo2rz48DaW4Kn8uqN73xVt96S9E59W80bt053RglcLfj3jTx7oxMU5AEARA4hwACcPcr+DX8ZwcCa/5NL+eb2HQrMHAHAhgLu3rpFkH4rhaeXdmvc2cdoeHLEmYccxBugnGqyB8Usxrks2ihCNkgAAIg0EQAAXgTJgiBAAiAwDgCCMLHscxpIr7MmILs7Gr1T77QyXYEbcGRaFweVCgWJHDPWUMeCIAACPQTQADezww1QAAEQGA3gWzst1srFAQCEmTzeTYID5ISpItQbtuRLpYjCDfMkAQBENhFAAH4LnyobAkgoLA0kAYBEDiPgIbMiQcrgXj8O5sV4UQ1TkEABECghwCegtJDC7JZAr2Bd6981igyQQAEQGADAf3hZbmq235iHtRDdSikz62Ol/WgBARAAATKBLACXmaDEhAAARAAgYcQ6Ameee27sABeyH4IJTQDBEDgKAInB+CFrwmPaj3sgAAIgMCJBPBt0GT4HC2X7jNxvgboepzsGdSDAAi8nMCJW1Diye/l/YDmn0oAY/FU/C83ngbhZwaAdCVQzGp+vji4d8z6sUmOMhKr1Os6zrW2hL22Omwx4T6gLShUVdXYikiDAAiAwE4CJwXgmNF29huqTyGQjsvyjXuKeSgFAYr36GVFJw69ecE3Bfcu2J3UPtFO/02v5XhoOS+cXOwMsac/ljH7wGMNOAMBEACBfQRO3oKyz3nUBoFxBHI37FzeOIvQBAIlAumqeEnubvl8RcXx7vAmhKs2pMjIgmlcvPjQM9nN4e2GQhAAgXsROGkF/F6Q4C0IgAAIHE3g7JXwo9s7yx7H2UmwTbZyK/2y+k0v4qFytww+yzHoBQEQeDUBrIC/uvvReBAAgSsTWKzaXtnZq/qWCb79crgDHFa7JeWfB06ROP6BAAiAwAQCCMAnQIXKOxLI3WhzeXdsG3y+M4EnBeF8ReUC4oEd1H/V0qZ72fctK+DiTL+egY2AKhAAgccTOGkLCk1tk2fhx3cdGjieAG6545lC4wgCR25H+brnoIzwe6nDXWM0/U+43LaoTOvQ6vf3K7+EpYP/lwr6AiRAAARAoJ/ASQE4OUqzmZ3d+p1HDRAYQ+CIOyvG+pi+eq+WI4JwvRIkCJ/MetYloY1ocp+cCBX8jhMKwhf1ZaWcs/n5hAsBZIAACIBAM4GTt6Asp7hmzyEIAiAAAiAAAimB5sDeCv6ip6DwnQm3p5QszkEABAYSODkAH9gSqAIBEAABEACBVgIu/rZhOFX1q+B80qoMciAAAiDQR+DELSh9jkL6ugT0R2LRjavirsqnIq3103o4BwEQAIFeAhx4/2jlm1Lxcnc0F1FRXNxrCvIgAAIgsCCAFfAFEmRsJVAKrLfqQz0QAAEQOItAFISf5QTsggAIPJYAAvDHdi0aBgIgAAIgAAIgAAIgcEUCCMCv2CvwCQRAAARA4HACtOqtf2Qcq+CHdwEMgsBrCNwsAJ+zEa+8dSLY829Gu9nQSH9gtNn9gGKzClR8DoFh4+o5SA5pSXmuOsT8zYy0TFr0unmRi9i6QFwelUujHSP+Zp0Pd0Hg8gQuEYDnVhn8ZOift5qZJIfgXdNLL2VomciHOOOV/DwAn1VMrPm3+9bhmp/Tk+a1uJ3DmcvTBrfoVNnRx3G2e8bQ178pe3R7turTfqajXJI/Dkn43IUne9Ml3/haUAdKQpPyx/X/OAev6NO41u3X9Pt8P/FfTic95/uP//gXljSo3Rijuejvj1a/6bnflPnvI6Pd6fH3pJxe5IEACIBAG4GTnoIS7qZx8PjjwEPz6EYjYUscvOgNqBa0tTU/llK9mjtav+ptPeaCcGWzpkPrqnwgvlYzlDP1GL3eo4JQJsX9ltRLxXrZanusHm2bzZuRTsdFycZ6m1agJIpzdtdtJEoGnmrcQa2Q8UT/paXC/UZYp7/el/o4AEoG8Vn9X+uD3Dil1oz2NTc2ltTeuoWCAvDwj0JtN1JDJqdo1LnBS4PbDeXv3+fDK1N/v8/nf13wzeV/n8/vEmtWSTtwCgIgcEcCl5xN7E3MTqRHA269yR3t15o9y29Ntla+h/1Ydns8qbVwbNnYNo/1baQ26o3wd4++Gdr+GzX5LWNy2b+yCu4DbP+hUSU1+A5bUDRqpw9YFITz0a2A60dOrY0jCIAACOwlcMkAfG+jRtZ/7w1MKL69/SPHEnSBAAiAAAiAAAiAABFAAL46DmhbzI2WvFbb0y/w8ub3A0MNEAABEAABEAABEKgQQABegWO/dkQQXgWFQhAAARAAARAAARAAgUYCCMAbQZEYgvAOWBAFARC4J4F3f+Hn+0x+nul+pKk/1lzsJffiSIAACIBAF4GTnoLS5eOlhCkIH/1Eg0s1cMUZ2o5SewrESnUUgwAIXJgAxd4Ucs7cdnbp+YMb7zqI0vSDzK97qspPvhPlkJz/c+GOhGsgAAKXJ4AV8A1dhJXwDdBQBQRAAARuQIDjbhdgI86+QYfBRRC4KYETAvBx32/Ss4Ht/8b2Qd3Ps4Lws+ymbP0KWR1TWg3nIAACFycw9ZIO77uZQoF9T4PnQhRN2foXOZPUz8pEFXACAiAAAv0EDtyCMnVa55b/+Jmt/RBKNdbUpcHwUVtT1O5R9kp8eDtKqRD5GQIjrgEXHWS0IwsEhhD48muPhqhKlcjo/erb39PiYedkh642f7VohrPA+Xo5cpm+BcrXYEk5i/OGOQlFIAACryZwwgr4KN5yk9AV8DDTjtLfr0cD4/6a962h97D7tuAoz0HqKNKwc10CfBUcFM8uzCwylivg+g5NeQkPcaT3aOp/r8sVnoEACNyPwI0D8Bj2VYLfq/gR08HZUQT81pyjDMIOCIBAhgCF+ts+9ErATSq/7m2YErnTN46ZGD5jG1kgAAIgsE7gwC0o687slcgFv2ds0yA/zrC7lx/qjyHAW3Nwpx4DE1pAoJuADbwp3XcxqjQdJeR287l9Ckq3T6gAAiAAAjGBx6yAx806/yz3YeB8r+DBUQSwEn4UadgBgRyBbSvgcfAtj1y1K9+2PGcVeSAAAiDQSuDGAfj3Iz+SlHUKWeWI07x6ofOwHlvJDJCbGYS3rrDP9GEAokeriINwvXXvafIIHXvso+4rCPzmjTM/J58Aku4Xeocg87LfW35FlHPn0s8rzzmMPBAAgVsROHALik7qFAmP+kdB+Iq+ZBZde7JJ7NmK7lg4ezZjO0pr8K0OaRDeW0/r47gkkAwrFsgNRcoLsnoNLPUhBwSuROA7Kwh3l0DfPNxHJnVdbenVJ0czt1OSnvzCR/qIQEG5Ssv1y9fx5l3lff5DGgRA4B0ETlgBDxPbGMSkr/JHk6r7G2251X8NgFvla3IIomt0zi0LgXbsRy4wjyVwBgLXITB1ntSn/U1srgbcORP2TiHleoOIpfVa1qOJx2NBnIEACIDARgInBOAbPb15tZFB+FYUV/Bhq+9XqudvyldyCr6AAAhsJ5BsT2FFUz+JbHcVNUEABJ5BAAH4gf14hQCYfLiCHwdiH2aKAm8E38NwQhEIXIKArorrUwv1Gtf4m7511LTOnfhW6xJdBydA4NYEEIAf3H06gR9sFuZAAARAAAQqBDgQpx0ptKnRRdx2y58rwk7wCkMUgQAItBN4VQCOVYswMPBBILBACgRAAASYgC5104lNuyeCgxIIgAAIjCLwqgCcoHEQHpYyRnG8pR4KwhGIS9eBxS2HMJwGgWkEdOOJXQWfZgyKQQAEXkfgdQE49TDi79eN8+YG4wNJMyoIgsAjCfBWFL8FxTUxWg1/ZLPRKBAAgYMJHPgc8PaWpSsOFDA/Zf5L2yYta/1I8OUVfN2fWCZKtFp1lrXsLcl5sK0f8+2hbzPWWTS0wji67J+G+k6ktsVplK+j9LS3KpVc9iD7lIrR+VI0J8V51AX5Xs5XEVmtlZdJczvcSasuzsv9sGzFnjG1MPyADGKn/4Zcv6rMHqOHgYtB/u/XfQvqZcOoUF/4GeDGx7/v5/PPy1P975h5x+hEEgRA4H0EDg3AaYKzky/hphVHnfjoFhzScWeIXJgs49L2s5L+dg3bJcs34r52pQzzHi0DgVSu7E8qWT839yovyC3KFET3RS9dTgQyIWWl21jYGvl0C4u9ttL6W8diqie0KAM8FEaplvZGFSg8zhnmbpF3Clr5Uv9bmTj9+9DYyPdyLElnoaUhFaQy88hP6/iEF+9nIVWzOBwPr3xCIjducr6o6VyZ6sjxzhFVXSOO1mbON7Kh/qk9lUvztTw+mrFKSVYoEj5NCRpvrrGkV7KCd5Si/O/f5/PVCFwH6XIYLXyOfcIZCIAACMQEDgvAdeLkic5NeuoKTa5arnnR0c2+e4Pwqo3I4PiTrTf5fZ7QLSSB7RTO9idvVdzp6Qe5Ke6jcNXaq+O+y/Ei8ayWbbZDcOKVFsxyv2XEfb1FQsZqQd1CupaRHfUabGUM7J1Xar6MLutCWjPOHVQTmFfmpnM20DMXrHmkukS/Rt765h96u6UE3dJ0KafVbq1HR4+FheW+RCvgVMbvyHTqNA63Pm27pqwGpEEABN5E4JV7wN/UwWgrCOQJuAgjX3jv3EKU+ogWF9qmQeS9Oy7vvQ3YbTovnctd9vwyJ1cv+UamwD5fE7kgAAIgUCeAALzOB6UgAAIgAAIvIKDBvR5tkzX2fvIHHdtepEEABOYTQAA+nzEsgAAIgAAIXJVAZj931VXejlKVQCEIgAAIrBJAAL6KCAIgAAIgAALDCOhy8jCFRlHr3hJTpZ7UPeL6VPC6NEpBAARAoJXAYT/CbHUIciAAAiAAAs8mMGMrh986MigIDz66IHzmB4dndzdaBwIgkCGAFfAMFGSBAAiAAAjMIXBIHDswCA+B+Bwe0AoCIPBOAg9ZAW+ZbeVZxYdM/u8cS2j1KoF0nGI0riK7mQCtwp4RsPnV3xvwoqugOvLt4wCpPSSsl05almkvi9o6RkbVmKyMMyplvNSkHiMFOAEBEACBfgI3D8Dl5R0tzdZXhfjJeaWSvqBhRQzFINBIQG/qVjyXZ8uRviOBo58rvjn4dj8+POUDQzLB5nZY80u79BLhwJvfUclDIqSSaF7lSwPHl1NC93fbGFwE3FPDuYDemUCM+E/1IhBXEjiCAAhsJHDjLSgafNOEuf5nJ9QWVjz5twhCBgRWCchNPT9OVytD4FYEXAC3OSrua+xWMzoiydpWHX2eGukk+GYfdImbAlv9owIX6Or8HWZ614I0ELZ1jcmQJE229aGEUlLirKifakN163lcFWcgAAIg0EXgxgF4VztFGBPnBmioAgIgsIUArYSP/mdV2vQoO+M97vCsMD+XAuZSvrdY0OfLGxL+24EBuhrMQQQEQOBFBG6+BeVFPYWmggAI3I5AGoTTdoa9/6YE3hp573dvb/OG1aemjPgmU7ee8PH7+/xGKB3WSigCARC4K4F3rYDftZfgNwiAwCMIpAH55RqlgfjlHOtzSD9H6LGvtpHWvd+sSOB8dWuKEUMSBEAABHoJvCgAdz+f7yUEeRCYRmB3eDDNMyieR+DyQfi8povmzAqyiW8X1nM/0CQhzs98YFhcVYuMhYlihq1q08UKKAABEACBRgI33oLy/Xz5u9jGaVHFfqXpPCWWmdlTEZyDQBMBGnw0nnQQppVK+alc6RxjtUTmqvkUhI/YjnLV9q36RfNwbtjTYxxNZR3Zi2A7J1S5wozKbFKuTn0sTCzCfpI99zQUuu1Q3oytQLFlnIEACDyZwI0DcOoWOwuvdJOLf9prkKRO/yu6UQwCqwTaR96qqoUAxuoCyQ0y3hyE89XQMCf7kZ1Oxek5bRXZ0+c/+UknbS9xbkVB9i7de/xCXRAAgccSeNEWlJ0T9GOHABoGAiAAAscRsMGsTRc9SIPtnGBVZs1KWjk9F4NrWnJuIQ8EQAAESgRuvgJeahbyQQAEQAAEQEAWXnIhNW8tiQroJMpItsnYMoTjGFsgAAL7CLxqBXwfKtQGARAAARC4FwEJlNP99ho+UxDOaX6yiQbYGojrOe121HR6vBcNeAsCIHAdAgjAr9MX8AQEQOBlBF7/RJQj+1si7U0Wd1TdZA+VQAAEnk8AAfjz+xgtBAEQuDABBOFX6hxZ4dZ1bvKMt6pcyUX4AgIg8AgCCMAf0Y1oBAiAwJ0JIAi/Ru9x4E3/8c8YtKH4NXyEFyAAAs8gcHgA7ue1E/idafuE5sIkCLySQDmYRTB1tQFx2JxMz+523a/7v/MstFSO9PxxSsnf7/P3pee3l8dRuSRvDbkgAALvJXDYU1DCRHvuFEV+6BTL3R6dzBsIFBSkPwSaZ62uucmPUjcN4MV9MEBPvZXXL9371bZFWOquGoXZ1wJf89bJijMsRo1olK+o4qLF9cbOlGuxvDW+2Q+t2NcjTddk2f1NJUXcPa5rczd5IJVq88FKt0VWWY/NUd/o/TouzbEzvVDHDzXbWMn3g1ABuXvG3+f3oT/697/+eSlqRAzTmdVo3elJx1p7akIWBEDgLgQOC8AtEJlUzwtIownSvdXM+jcrXV6ZW1qcdUNu0Vv1k3ntvz3kbqx7A9IlxevkTGubG8ykPxrXpumlPqd+juoM6ltjuuxUJCQB0v5RFStNx/Ga/ojGbhZr1oKv08ZGMFFMRf1flKoUDJo/c/NBxWqxiNrD5A1+biP/hwJsedulytBR6nCJ1+uru8hdgu/P53/oRT3UZtKkil0Hqi6vpJaorKKznuY3NteMoAwEQODKBA7fgiIweOb6pDfIK4N6gm+lQMy2raVPWmSsTqQnEeBAwK/XZY209LmtiL4NNI5gcWbwHVr6rJTcXUybKMP9UXCrwbUejaRLqlRYKacc3n7yoYUjEpOPa9aWTS91mpxK8C2ajSySIAACjyVwUgD+WJ5oGAgsCVRWp5fCyAEBELgqgd4PtFdtB/wCARA4nwAC8PP7AB68hAB9m617UV/SZDQTBB5EQNbM5b8PahaaAgIgcAoBBOCnYIdREAABEACB8wggjD6PPSyDAAgQgVN+hAn0IAACIAACIHAEAdk2oju09wTeuv9bvCZNqvWIdsAGCIDAswggAH9Wf6I1IAACIAACCwJp4N0fOuuPL/FqzAVcZIAACGwggC0oWMXYMGxQBQRAAAQuSiCNtbNuxkKlcNznq3h6zOpGJgiAAAisEzg4APfT2bpnB0tc17ODQbzU3KjnEB+Kj4IB/nvA6JXHM+M7/UMH0DnGaLROG7EuQF7Vz08mip/9TTS4ngbZDo/XxS/w+fICuL6y5xyCsAoCIPAEAgduQfHT2DBuozTqfJvq0/xhDkPRhQm4F2xMezBzOroujOJE1/jpyrtfgnNiAyqmc0Or9MEvJ1tRfb8ieqHNJK81OPb6qxP5V95R796WqaK+rveRSvStQyrlC5EAARAAgW4CB6+Ad/uHCiBwKIEjXr5yaINuY2wZ8tzG9QZHHx9QNzDwIisvovFyGxP9oX28Ep4biZxHcbf92+gfqoEACIAAEUAAjnEAAgkBBOEJkBNO0QcnQH+QySiIjk62NVI+QMn2k20aUAsEQAAEYgIHbkGJDeMMBK5MIA0A8Qa843sr7QPyAP1wfD/c0qL7TYH/5sEF4bo6XhpHJOY2m/hX1sft1w0ucS7OQAAEQKCXAFbAe4lB/pUEcsHgK0Gg0SBwJwKF1e+W6zmt6oN5n7gTCPgKAiBwNQIHBuDjf7gyQmNRVkwfAAAgAElEQVRJRyn/ah0If44j0HLTLnuDEVVm016yrw/a7UByIoHf5GvB6c9Z0Tw+aoRNv610zbX5mmdJUOxN+bkyK4c0CIAACKwROHgLCk1bOuutudZWPmoiHKWnzWtI3ZUABYClr6/X2zRhlOnlNPmHbettO05Cg/Dt/XCcr7CUJ/CdHYQnZv2dR4NtdynSZRNdQiZfo2zKkj+3B5xPnGBiB6cgAAIg0ErgwBXwVpeOl8NUejzzO1vUAPD0NmjkcLojcAAE2gkcPd+qPT2ypxqI62q2Xksmn586aJqF1W8DA0kQAIHdBBCA70YIBSAAAiAAAncmoN+m6LHeliiUr4uiFARAAAQKBBCAF8AgGwRAAARA4KYEaEVbV7Ubm1ALvrXMHxt1QgwEQAAESgQQgJfIIB8EQAAEQAAEEgJ4CEoCBKcgAAKbCCAA34QNld5O4DL7wF/cEeiDF3f+CU3X1W9vGjtRPAokQAAE+gkgAO9nhhogwAQQAJ4/EKgPrtYPM/zhHwAi4Dt9wC2C8NM9ggMgAAJ3JXBSAI47yXUHDPqmp29mBFs99km2ttX1Vygs5ffahnxMQMeDHuNSnD2DAObIZ/QjWgEC5xI4JQCXPXT0TNXzJ7K6B/XSc7uu1bq24fsZFXTN6reSf4UYshXAVLkmFtoAOprnDu927GuDb+3nvVrHjZO9npxdv6lvEye1jh61ODe2c3kleZKtyWu9Oxz1cpjqK10O7qU51k7ol7brJcdcv41gE6zm9/l+9E+fGa4v65GLXsrjMueiXMT0+EP3CMQ2z2yrkAYBELgjgcNexKOx9k/fUlZ4cQhNeCo7G2ibnTAd5iZj62ObPluj/VbUs6IWbjJqq70NUiPIqwY69rfP1m5Lp4zVkxypI/wpeb1kXJJ0+dQA05hce1Y0cLFtM6tsCMJTpsGOOhRyNJWvs/S6m4Ma6DweZYfc2murVD/PtAzCymu/S955/VD2tq9k2YK++qk0j2QznPn2Ys/pOnFGtX/03OpSzjbPykk5Bdt0OWsrxJD8172oiz9o/zioZl1cKPXsREC6Iz3qo3UAaRAAgUcSOHwFPExwMoVZqjrR6dGWjU4HP9o0t/jUIhNbkyk7zlue9QTfy9r3ztFb3L1b4bynxgxu0GB13ZiPGJsaMHU796AKNLfI/JLv8SP64co4F1TM1KpzvR5r7WiZw1U16ZO7mFv99udkQYNt8kwDdrEsdagu/c/NCWb1W/XX/EQZCIDA/QkcHoBfBVnLRHumr3pD1eOZvsA2CLyJAK65Z/W2zvV6HNK6zijZjimbHuILlIAACNySwGsDcOotmpCHTsqDhwAm6sFAoQ4EGgng2msEdROxofP8161c+z1lbRAwpto4QQoE3kLg1QH4WzoZ7QQBEOgngICpn9mbavBWkpZ9LQYKxpSBgSQIvJwAAnC3Ej5iHHTOxSNMQgcIgAAIgMBAAm2r5eERK7obBcH1wE6AKhB4AQEE4K6T92xH4R/j6Cz8gkGDJoIACIDAkwk0B+EEIVl5QSD+5JGBtoHAOAIIwMexhCYQAAEQAIGHEKgF4bzostJOBOIrgFAMAi8ncNhzwO/CmSfdaDXbPeCK8hbPupLVD8qOqjQ3NqewuTIEQeBAAi8dq9sv7gP7BqZ6J2AezaU5XXG6Z+x7MTfJ+wVvtwulFKjT4zMRhCtMHEEABFICtw/AR4cFPMeq0uRlQe4dQhFDfYlCriwSzJwk6jMSfVl4XnIfr+dJ68B9XsvOatEv8+pSXGcDemP05KcRuAuSV68EJ/Cr+KHPOvFzu1Xq7KyRQBC+RgjlIPBeArfegmLnw1FdSDrjP7oFy//SEjpnHxon49RHP7GnBRvOERRsgPaoKjOuhkcBGtYYrGruRFkJerdrdm+yaVXAq9v1a4Zndzu3U1r/Or71xNzc2imQA4F3Ebh1AH6FrvJfR17BGfgAAiBwCAEE4YdgvrYRG5w7T7eMCwTo1+5meAcCswggAN9B9goTJ/lwBT92YERVELglgS3B1i0belOnZ/ZPHHvXV9Jb8GEOb6EEGRB4FgEE4Bv78woT5hV82IgP1UDgEQRmBnmPAHRSI7Rf9DjcDfcDTP0GdJqd4Y5DIQiAwFUIIACv9YTf4K0b/+hnOfK/WrXWsilbIVuNQ+5hBOI1uYc17tLNQfDV2T0jf/ziTZvxbxak+YeUdG7yuIrbMm5qeU2ayNXVOwHLJJUxDpQcjiAAAi0Ebv8UlA89A8otQyTzYUv7V2Tolzpu5k6Uf4fcRNK7woo7HcV0M8AKeQewR4gmg3Rom+aN1aFunqQM11sn+CHzp7Opw94MUR88axmJmqlcklLoRUx91uwLpK6udlMZFdlz5wkfWsYCgnVLDGkQeCeBe6+Aa3BMwea0/uOplqdcWfuW/44xN8drndz1OMZXaHk3gTlj9UlMcb2d1Jtp4ExuaB4d9c88uSTM6u4dDipvm6D19AErumpO20/c5UBHTUdV9d5kM5EGARAAAUPg3gG4acj0m19ugjb2kQQBEAABEDiJQMv83CLT4X4u8O6oDlEQAIGXE3hMAE79OD0Iv8hgoa0l2F5ykc6AGyAAArchQAvTLYvTLTK3aTQcBQEQuCSBRwXgRPjpQTgC70teR3AKBEDgRgRqAbaW6THbLLMFJVuOTBAAARBYIfC4AJza+/QgfKVPUQwCIAACIDCJgN0/PskE1IIACLyAwCMDcOq3qwThpVUU7B98wdWFJoIACDyGQOkHl49pIBoCAiBwKIHHBuBE8ewgXINvPWrPavCtR83HEQRAAARA4OIE3PaTUV7iNz2jSEIPCNyLwGEBuH+iU/GX6IVZLYletboe74C7FGgnTWtqytkfKpqcHCxU6mviVyob7EKkDvvwA45xLOiZ+6Q3nQe+8qO5QR09SE0AcHgq5aMOlPK1fOLxalAb/CnNyZZSVSb7+EEdw6Tl6+cmdkeVOZHg4iLDuRAkrE9IgwAIPIfAtBfxLKaPRYbeaumJHgJUj3QmwWlcicV+Pz+x1bphXGAQrNQCZuu71sjlhbapVP9xVhBe8pc9XH16QNJXVWXLbyfW+ivWrmOHBsrns+edHiFsCalaj6w0S1AlzrbUqdmkshE68jYSZ/NCLjdcq1WxPYXsjukLl6Qn/e97c6zMG8Sxp8U9TSFXSbfxvqd6h2zeAs1P88ZJ2T3mmUBd8yOdS9fky9ZDCbc/nBZTa7bScj23PlMPfP8+n79/n88/Sv9cwM1dE/pH3lAhcH709CrjFY9pN2ZCtoK0kqEUKRAAgecQmBaAKyKdTvQ8PerklubnbpOprtIUtRbMLW3tzznr5rffc9FQ7gdngWCnHeCNLwvoQ0KpH3IfIGry3oxJRBZ3BB6kpzSOjDlOrjIiRJFjomHv2Gixm/radp5xtlJxnh9qNNMTxkXuq4yI1q4fZQAbdXXxjaWb3dtoL622d6yl+rae1/yYcY2onzxG9CRz7B3Dqbz6Tvl/f5/PP14Jl7ElfS8vatNxJkcpp4mGz/k/EoxTUj5Y6tt+Mk4jCwRA4JEEpm5BkcnnkdyyjdLJOVt44cz0JnNhV4uu7WF/9XG6p21FYDct2Mfi7PD4GOj7GB3j40wrh1zPFHhTI6IhFZ1UFixEjv2MnKUTm2HTM4lBNwiAwBkEpgbgvQ2iG8fbbx69zCAfCDx57Dy5baEH21Jg0cYJUvMIaPCdhNxLg4ihl0yQAwIgwAQuFYBrn+AGqyRw7CXw5LHz5Lahn3sJQP7qBHQ9GzH41XsK/oHAOQQuGYCfg+K9VhHY3afv0Vf36St4+kwCq6veabMRgadEcA4CIPD5fBCAYxgwAQR29xkI6Kv79BU8fToBfbJJd1j+dDBoHwiAwAoBBOArgN5UjMDuPr2NvrpPX8HTBxOguNs8E1zD8Qe3GE0DARAYROCRAfhp3/g9YBGkFNiV8geNw6Fq7uTrnoa/pZ0lRm9vf4kL8gsE9DGASXHxflGYz+vyxVJjtSTjonkvWXDAlyMBAiBwZwLTnwM+E05uGtMpK1fW70u7Fn2UX2sN9bPfp/k1nhDYpG3Q/tlDj3SO0LPHh7Qu+2QzJw6s3PPbrek96dIz49d0zujnNZv18h8/yWlre+q6UdpKQObhMBvb6zbkGm183SwvnrKsPIEwft/lsr6xYB4xmJOjvKy1WAXOQAAEHkPg1gF4rhdoCstNbznZpjxWtj4xil19OOy6ZtW47+1+63YgIQRGBc+j9IzsFx1LrPOCHxJa2tr7IqaSzrP7h+3zC5nKL6Iq+Y78gQSSiTW6RopmRIq3kdRuIgtllKGZuYq2vGjcFeTqr9VBOQiAwB0JPHILyrCOaAy+1Z687FrPcLwaAQqORvwbpWeELzkdV/cv5/PIvLe3fyTLV+oaHQP7rS89E9BoJ17Zk2g0CFyaAALwS3cPnBtN4C3B2VvaWRofV2g/rerP3LZTajvytxL4fnq2DvG2Fv8DzNzPL3XlWwJvHpPyn60Ooh4IgMCDCDxuC8qD+gZNmUSA7oF2T+gkM6erTYPQN7TZQr9KP6dBeE+QZ9uD9DwCvX1C1xKPL3aJAnfZ+7/Y/+gXsiUY/31ygfq8dkEzCIDAdQlgBbzWN7xw4WfQmiSXYWpdRXQZgTQ47XGsfUT0aJ0vu6fN872bY+GNbZ5D8rlae6/nSD46sYxk1Vv2hmvaliMNAiDwdgKPC8CL8+HWnvZBOGku//ngu2OuTX4ntNVD1NtIYEtwpl8795rcYqvXRov8VfxIfe1dgUzr186v1mZsTan11qCyX9udQKT8Ju0u4/4bJZ7I6Wu1TPWO+0GmNrJAAAQeTODWW1By8532Va1MZdaPTkvrJKoPQWmV97+cX/dkhkT61TjZmBkIzWjDbp3UV42Dxd9wNxl1X1FfgDEFpFvacuexsbXNm7q6sRJdf3dm2tjMU8T4km4MwvX6b10Q0SmD1eucTwb5k56dTEhSH0t5CgYYBQEQuDCBx62AE2s7BR7KvjnwVq9O87T447BcUK7ePvHIXdbdb/cncbVV4SOIvrCbj8B6fxuFxetqw9zUzQf+j44uPUrtcBZSVb0oBAEQeA2BRwbgr+m9SQ19WxA+CWNRLfgW0aAABC5PQJdN9CgO65keL98MOAgCIHAyAQTgJ3fAVc0jSJzbM8QXjOcyhnYQmEJAY2w6ujRt6cJ2oim0oRQEHksAAfhju3Z/wxAg7md4XQ34Svy6fQPP7kLAxOB3cRl+ggAIXIQAAvCLdATceCeBMz/kvHEf+NVG2Zn9fzUWo/zRBepR+hZ63J5xb8cnFpLIAAEQAIEiAQTgRTQoAIFjCFAQdlYgdpbdY8jew8qZ/X8PQhu89G+o3FC3UIU+sPKflmP5W0ngCAIgsIEAAvAN0FDlYQSwgvWwDkVzQMARmHxtr6kP5SGlfbPIwa4wRYMjCLyCwLkB+GIGEubyjOJCoemW0nxVyjdVpyX7v9Zfb+d2Z/O6j1r1zNnJ5W1v3/6aPc/DXuvbenm+L2wL6vWt5Mj0ul9i7SuPOR5pGro8gdE/4DtnLPnmcKLHh57rMLZSOKPVaipquRmY9/CQePYvo0efG/790PPcaV+K/P3o2d/q1pdeU08G5O/7o1e2yWvb5MoTaa0jtluvSTWCIwiAwB0JHPciHp2tIkrxRLOchOPyqKqb4vxE5wq1Rpof1207U11t0kEqvfEs25XKxpZq8qHmttTRAfDR9nqobOGc9m2PPf/IhGKlI1/WQ4FB0ZFiwb72i9otdosOPaBgdPCtSGp9dVQf5HyYbdvP/T6hRMKRh34y/r24TwR5m+WrcbxNwTc9DUUifpL756pRv3pZr+orcboL+qmc50gWDNKkJ5z5ykiAAAg8iMC5K+BhnWAD0vz0ZCfKDUqnVMndhGqGeuVrumzZlYNh6+cR6dlBwBFtgI37E5gVfK+RmTXHrNm9SnntPkFl6d/C7+iHmMsVcI2eJQh39ypa/WbDugIerFB/yBmtp+MfCIDAGwicHIDHiPtuCpimYno4AwEQAAEQOJqAhtNH24U9EACBexO4VABOKNuCcATf9x528B4EQAAEnkOA1rj1O1k9Pqd1aAkIgMAMApcLwKmR9SAcwfeMgQCdIAACIAACvQToeYcu+u7Y14a7WC9nyIPA8whcMgB/HubzWqQfZrD/+7w+gGUQAIGHEvDL3T7R0FC/4VtkKXDvqd5gASIgAALXJ4AA/Pp9tNtDBN+7EUIBCIAACCwI6OL3omA1I14DR/y9CgwCIPA4AgjAK10aT5EVwUsXPaMVl0YM50AABF5MQB7pKcG4C6W3TLuIwl88htD0NxJAAH5Qr+fmY8mj/+b+RjiWszpCL3SAwB0JhOes39H7p/is2+JObU8t2K2VFZ2mbSTLrSShrWaveFEHCkAABN5E4LgX8dyU6ogQVufzpa5lTsBUKwtSSI0hoDfKjt9RjTF8Ky0jxqReDec1nLZknfX87fNafS3L06+37IvfLAM3DtPhqEO8Wj8JtFMdzgypoiI9ho3easT6gzQIgMDbCGAF/IAeX59uSSL9O8AxmFgQ0MBgUYCMQQTWr4ZBhpZq2LTYx+8ilnjelePepJM2moPptTG6LMcH9xQkzkEABNYIIABfI/TicqwSvrjz0XQQOIDAEz7w6ot4/HxZWBE/ACdMgAAI3IgAtqDcqLNmuupvHjON3ER3LijACtdNOq/DzdwqOK6DDoCDRO99vdF2FNrSpDB004me4wgCIAACeQJYAc9zeVUugo717s4FCeu1IHE3Armg/G5tgL8HEvC/rXTr4D4QP9AHmAIBELglAQTgB3Tb+pxMEunfAY7BBAh0EVgfyevqRuhYt7JHAkH4Hnpj6s7/wPuVn92k7vL27rUxGsolpVF4yE/Vls8lcKf5f0vtsl6UgAAIXJ0AtqCs9NDISTHV9fNT7vJHPeEX8ysOVotzeqsVUFghoEFB+Lq5IvzYonQUP7OhFITjm6Fz+3bX9fZbGadaXJoia/WpLtVTHYxJMzcwe/eEsgEYqoDAMwhgBbzSj9H8WpFrKcrpCnmUSv9atK7JBAtrkihvJ6CBQXsNSN6RAFbC79hrjT6XAm+qXivLqU+eSpgTKea5KVoOmK+LnFAAAg8kgAD8gZ16bJN671bHegdrIAACIDCdwJ4gfLpzMAACIHBFAgjAr9grN/CJVgexQniDjoKLIAACQwnoN2B69MqxgO1RIAECILBOAAH4OiNIVAgsbkIVWRSBAAiAwJMIpN//IQZ/Uu+iLSAwlwAC8Ll8oR0EQAAEQGAHgTt+yOfA3ETnJrmDBKqCAAg8iQAC8Cf1JtpyGAEKCu4YGBwG6CGGsNXqGh151+uN5whE39cYRPACBC5GAAH4xToE7tyLAILwe/XXVm/xe4et5FAPBEAABEAgR+CGzwGnXXb1JQW6WY54hi9Zmbmnrxa8UdlRj4fdw2ucj19eUR6nLzfcQ17Etz6cQqVcaugACWM78i9n98Z5tbbVuqIXtZWv6R2B8qcPhrZGGxRTvfgVLKM8LTvCJYX30JDLXJ66UVbnWplWqDV+VVmxcrBCKaPHJX0OzZ9FLZWCYKAopHrpqH9/+i4eymMdiX9GW82E6jbiSIIACDyUwAUCcHqaBgWbPVMPydamMdoeUC/X/lyzm9OzVkd122OjO7bKYotDF6JI0/pJrp22Vtrm9NzK7kmXOcX9OcJ+2Va9BX6kukTs2bKul18WZXKCdOrf6P5P9Wec2Zy15uvCtm820fQnkX3lnC8Nolyuwi6b/OEs2jpEQe+Kg7kPpXqNpFXVlA/C2X/NDX6VUhKEq6MlKc0Pr+/SHDqmPJlBAZR4li+kXNK1KPXN8Qkxr4J8TMqsg5r2IlpRC5w66icvI3l86sVtoWPBZRIBUykFwGkfxVbcmVVlBLwpk5cmxeTv8/19P/Q1Mqmi45c/ULEXLjc8n7BgzrF2H8NUqMWJ1CmcgwAI3IrA+QG4m3ByN7w6SZqhdLaqS9ZK++3WtM0t4xvjKyfmZT+f2W/kTdMN3g0Hlh8wNO7U/92+MiQJYeW6Xg70ZU4Zaiqr/uhIqo0fKqN/JRnVxTIi6WaiEARKCKvWWGjxH/bRifDBZiykbVCc16sfACiUq73IUVSTjpSSTKlFN2RpN+OZ9YfS9jwRpwuHi5e29ZpikURFfCpnUTvZt2+4LnMfIhJXYp1JYeVU/JTgnwPu7/fz5+xRqyiP/rHEsplc9k9K3bcfQUhTW32ruI0iEACBixE4PQCniUYnnXY2B01P7kac+lW6MadyTzp/Y5uf1H+j2qJBkuorXCIhEFLB1aNc02EuyF/jWq7HrNp8VV5apXp+9ZuDJg2XSJNWDNol5gyrmCTFpSrKdZw8R452PqN8L5h11WZ6WzYzSouueMuKCtDSvvjBfVQw6zx14Z/WDUdfrolQJCnKX+hWYSrQtKuYZIUYfqFE9LrqqZlEa1455Rq19oOSq+APpXHrBSYmjIuRlcDGtSPf6KgOTkAABO5L4PQAvB+dblnpr4kaIAAC2wmkwTdpyuW1WViGIRJvUH4+8ljmLnWo7VDiUrwtQTTQtgH+Fx8kKHUrmd4LlQkKI/d4FdbVUaWuinMlPnOZmUOytcTa89LqjM8IiR97IuyM8wvrVkXGhqLRorh/bWU17ST5EFtTHRQUa4nmfX//fGb0gUIFuCXy4YjrUj4vnhsBytIom8td2c/9noTi2Fhcnd519CbpZWS83h1tItqlG5VBAATeQ+BmAbgE37TMIZOgTuvv6TC0FATOIKCBmB7Vh20BzjIqoitZ16L1qDbqx6UuyQn5PFeQkh/t0/2Tr/3JYBDhpM/SgNFl0EEjSE5n6lldRrzuelTqwlCjm4vtORuP/Y5UqJOUqfVcHd8GzbcyTokW/aNA1y36c57atcZU2Nr05aGCHx/eD1qp/ycOEmfO98qchlA/pFybogx1XBT5FWQ2OvNH3am/4kc+10NBAgRAAAQiAjcLwCPfcQICIPAkAryKSw0qhDK54CsTAH45EpMAjLTpeQjxRb8EfyHc5z3UVOS2Kau5n/vUQec5z0JeWMUOeWkHqVYf03sBNm2MsI4g7uUyTQ5lOQ+tDk2zMVPNtU1XwD0Vla8bdYq8sFdsczTNW4C4cRknsjV9pnvCSDiXVNJh2oGp2OxzbaBjRafczNl2oR8EQOCWBBCA37Lb4DQInEPAr2jOMs8Ri0QyUfCSRDNJrJN4I8K6Wv/TqJICom/4qaJki5XIFj8nhYIn3RwhS+Ik4+06i1zPF/z8ynHikDsNjQgpqyiIxf4EbaYpIXORMrWdw95vTSwcECXEx6X8gasoTCWgepy0fGrxIHxuXlyW15UuCS/U2Rx1KWjNp1jO7NdfKs3XG5GrZv03B0caH9EA6AABEDiaAALwo4nDHgjckABv45gdU1AA5SJMjqXoPwWbJJYW+RiR+Upp8JsCb91bIkG4EVv0iEqwH+yGGNRzX4F9FGlnkYN8X+6NUKlbIV8oCe3MFVld1G6WSRtvhTLrrjEbJ5zTQe9QcDubY5X0hBFpQ5TPveDyqdxt/1CZpQnN0aNuQ6kvF/vPBaq4clznU6m8u4jGCT/rcjlAd+uGAhAAgScRQAB+p95Mv2m9k+/wFQRWCfjlQw7r/GpviNUiDRRo+SINTCMJEZBVew2gQ600KOXAzdf3mlkJl/k9y15IPi+woy5kd00IEpoSu/xfF6daCypVO1Jd9qPUVl+ZNLOk8Pn6DSVeIp8IW2hCuXjJ/1XnQyGbqbUjVyaeBSWsNpzmU6QoJ5gqc2PCj528tuG53M5i3w83B4UgAAIPIIAAvKET7RyvNxSb16CiIqKrchURV+Rta2KlSs+q0YoqFIPA6hMl0oBWkHVcKcm4Tk51cTz0hAaiqWCQ4FQcjAXhhWdu4VIqGSWuCh14O0tQ4R+zQfm815yfBmgEfFISfnFUfWczXsgYdcmFk5JfqZHRUYkMI/2k1a2Ah68OjL5vcQ92mGtiz+IzpypquwTW3g1y1Z8YefvhxylluYwB39+ZMtOYRVK/9VgUJBmkllxU9XxeQZxUxykIgAAIMAEE4CsDIb0X2Il3pWpDsQbfqZV8Vbo15oOcgnzuZpYXRS4I7CawjNnaxrU1rOO7VlMDLA6ANAqioEjTrvJShwqE4Eltyyq5nNk057jLVPXHgV9YXQ723Epy6qDzkeoH2eCT+hIdqZiFRc5Kc7YqsgWsIMlwcsqXRBbt1KCSG8qfJBiU12T8sD5S+SJodgK+rjtX1RS9quuqS30jmYU+J+/1+UTcl6ST9ZC8kVEb2SP3R+pNVtJkGnmyY06NEJIgAAIgUCSAALyIpjyn8iRfqTev6DzL89oEzSDgCLgfSOrSYhTTuKFv8yTAWkZZVibH1tbg2Ek/B5NwoXJah+VcppbFVSVi1KDS+xEL+WxKqJ4ok+WTEqcjyq3otYo1sCXxqL43Srmu1DnvVbuiXD0vw3rkjKrrphZbh/otlqdKYf2ZzWgFK6h5zncN1IOI/AiWWuY88K2qJYLlmlS+jH21Rc7HRb6VMWn1XeVddSOBJAiAwFMJIAB/as+iXSAwgcAioMza0LAiW7jIDD/uo1AoRMOshf8Tvt/3mk2g4xXSC1j0hII8fyIxJZVSNd8GZ8oHPW5lms9tXW9LEirvg1mV5UVj9/hDrVNahtU66q8Lh1W3z04Trh7JLVSksnRuBFm3M0C+F+une8aNjjRq93oUBvtAmqUv5BGQwRaV6F+qS6WktmsM+0s5+X8Br5WhSn8fenvv9H+ODY8p9pVa/jW/DXB9sObIAa6uuYByEACBYwkgAD+WN6yBwG0J+MC12oK+SMK/Fl7XQE0glwZXupqq5l3sk41w2AsnQHGYi4346N+eaGs6t1mO33CoVlzw/qX9z6QovDBHdaok+ScfIbJLvCqWOQZNpvkZuZBFNeivStsIsAVzTpr4NE8KxGYAACAASURBVFXAgpntGy6fPTA8uY+iQJcKg1IqT6qGADw0x6WCYtIg9VSXHLUvQ7lUlVVszaWXLWl6YWRaBvnLPtN/3OBlr2XYLOx6D+0Hv4UUMkAABJ5KAAF4pWd5Hs2U8ySbyZ+dxbd+P2vPtgb9INBLgMONrkq0SmmDcK3sNfmV7NxVl8tzGrwCDeRUc3z0l5O92JOgUWpoFCWK+cOIscEyzp00O7YYn9lnYVNJra62VleVSZ7zFqvZ4UNCFP2qvNoJ8a53qmZfhSTo1jNzNIG3BOHicU6ntiUuo9yQE1LBhkroUUtEVrTKf7Vk9pE+dkm4z5YajKvvad/P9hT6QQAErkUAAfhKf9Tm01rZilpXrNFFoyYV828MXLOSu4Wt1UE5CPQS+MXbPUwQVdOkgTdvFeCxTf/RQR7FYjYuY5UiZWRtPdKiRdElICvUoTDxTusk2eE0KKOUt+EEKI9XwdOCoCBKUbwaNLqiFR9cC6JV5kgpc5D1YJvvWUeZZN96IMZtDolHC9xuG08k432mhH5QsYbitIjb/5rySDHli1zkZ/ELBgJK8iTgjkb1WlIsrUlRuTjpXc1+YKvrQfBd54NSEHgDAQTgG3u5fbJeM9ChiWb8rsmedPvbxJojKAeBDQQ0+O4fZ3aPLgckpcCVVBv14YoJqchxukaMvJaxGm8js/yrgtljUEipnGXZghK5mtXkM7svT/GZ11ttA7N6Yg8pgBXGzjoH/6FNkqtMQt00+Ca5tJZvDyWoaqgeipwiCTw1/HSCFYVcxGI5pUG9T5GYVqro9fKU6JpTbU2h6nMaXWR576evjQQIgMDLCCAAv1mH98zxN2sa3H07AQ2cEg421qSi9Brgc59JgWZGyEZZTsBu5YirUIDoojevlxKSp1lyDFEepcj6/yT+l05Vjy3P5flyDhRpy47PySR0FThTxP6byg0r8Ny60ESlklPOeT92zlQgJnRqnP7TON9piaWNf2qF6+uJ74blQIgVmQoryVT/inipOON5XlQF+YOinuRFkQsCIPBcAgjAn9u3aBkIDCUQr4aWVZtYywm1Bhmyt6AkbfPVhuSFoFRWh11slq5s8s4EyaR6tC2D6zvFGpDLqfmvlpsmS5ZGbhL5+fjPyZO4SUZpPbHlqbzKGLM+jtU1ZC3ztjWhRxUwR19kfyhoyr1PNkDntJT4+hoLuwzdJkJBuI4VCb7NNhbe828Vu90iRim/7Ej9cdtN0g9hzMbbVWHhrf7rGAmlklLf6Kwkk9ZpPSfbvm/oxLSrVQfkQAAE3kEAAfg7+hmtBIFDCOhe45yxWhkHKhSsmIBFgyMNqCjo4rQeOYCSFW8Knm2Zr+sqUzmvzlIkR4G306FH1q0BuQmcWY+1l2sYu20/BDghtW30UYn66dMm4aqwkE1HYJx6OaiUC3+VXxzjiqiWKWZ3zgeXJm0+2DXlKkNHly1HlXEBupZTkMt/Kk+K1ScXAfuAnb2TdlCR7HN37VJjUZvj5jjJSIL7NSlwZocH3ZFhHkg/ZlhxPa7y/7f3Luxt6zgXLuVb0u45//9/nvNNmziJdZ53LYCkZDlN0mT2ninT2ryBIAlJ5BIMgiM1JDAk8EdKYADwP/Kyj0EPCXy+BNYAW+C1NvPrU1x7vJR1BaQAhRT2oJl4gG7KdkpH3oqOLkjbLdsHHxmvOpkfdRf8o021m3F0m7WTwCsSCSPRezZg7zY9+KyiMPqmqsEh213nNR4Nyvk1I9PmbGAZfaEo/aEnmbtRes1yglGK+jggWe8oxssVNEMj1gmio1z50c4lQPcleFJGnoG39wqI/hLgvOcl149Wd7st5GpNerDQKCjLvy6qvvnL90q7TkntfFI9j1b6SbG82HkxP8iW/vfj+yCbUW1IYEjgHyyBAcD/wRdndG1I4J8sgTTZcB+NPHrg0+I9cO1GVMEKx6Y04Ec9FQUwbuDaIGq3izCAt9NT2QHId4QByKEL8AwN+ftp7sB6D9xdT21Hu8TXbWe/4LzQ1GY7CkMbH3mMOOvVUJEGClNWi1BySMJOo5wAG8aB0gwqw/QjgW2Wic58KvjsaCrQq5EEzR3oDnBNfcj6sALvANyUXQJkuwzwbQBOmjKFjCP4Jg+YZ/zS1aFN8ilft6/hRX6V9QcAMH157x9SpVpcpfdW36b/VGbbTYzcIYEhgb9fAgOA//3XYPRgSOC/TgJL8A2QbKgho+uQQWZeHXBUA4DrA4i+AsABqgHR+swOp6nsF3lTlBs4V6Ae4Ps4zeVQ5rLfAcL9UtCD992uz1vyoE8Jxts42pjJq8Af3W0UaSyq0F4GQGub5bVOvLAIgNtkBhYCtglQlcGXAaCAaQLUBKMbYQLYm2HyC8AbLMucgJow+tL3R4AaYJ3gWvEE3Qbgl8tcXuapvFz8UZ0A4RWw1/qzQXqmN0F9vAgsQHl3Tejo6o8+p+yzKIF35mc6yzPs85O2Im+a7ZrOOm8Na9UaeWvNQTckMCTw3yqBLwXgzCUbc+BCVh+fbz5ec9GBWEzqhLoovDGCbeJFzZH4J0lg+y7MO6jpK9/W57/z8m8BiLf1+oNUAoGui7z0CRsFxw2+UyaEiw9VMy8AuGiTb5RJO13mckja0HJDi2YbwLwA3wHE92i8FSe0dhsgncBcfdlZ832cSjmqDTTl0e+s0wPyAOxqu4uLV9/vKlLfSbyUCITnmDV0Iz5RxNgkj6RZ8xMN92sPwt0QuQatBp7kJihUCBCNW70PlcXXBiCvZd1cHaQNaNNubzYS7dDGS7wQLAA4tAGcM6Rc9JdSnql3mepYErRTLvoE3QB2xacG7NGKJ++kJ5QsDPjFR+kwaZGg2lqk8qgjmfRx1WtyXMgMdjTky60bXfLz5Vl+84x0JxZRr39JbcS+Pxpbc/R3NnSzla4zjSOxrLnMbanXODaq3429pZVf9fR3+zDqDwn8cyXwZQCcx4rHrz5ei0QUvlsuLEpMsrE4vbv+VgX30BPkrfJuImEVXo9tq9oX5d3u5xc1+G62nayu6ta74ark1Yy+Wsc+/UhvLWztKsE5K2Xo1kzTM2/xJWXrXVz+lvEfjxlkrJul5/K+0IawJqlSuCpYZ3Q8BDql3Z3LXiYcDWBX4AtIFgh2meIAyQpuozzoAL/SQCe43ZVyQDsNQN6ttMcBWlP7DG/61NpomumqwVbbLZ9JiL7Dn09qvzW24M+8Ihl2wF/tUN6DYaXXAnNadubSfutKRGZcF65PyrXnkfEoU5DxPhFNkoUsKjDMroD3ups248rq8hf1Enj2PCJOlaymePKPEP7kJ7BWmFrypOlBO/zQfgdob8C9A81Zr2q7DdJpK18Asr2W1+qnyYo17LwctDLRwz/Bfc9T/YwXghxDhlFH46UO45gIpzKzFrUVzpKrBvQhQYK48IqmrDPUtaQk5b2Ox8Xu19KsG7W6u62WUGvxZ7YtSwSMoWUt7o0uu/Wgy1xFzWbdCOl1HhX7RleMlNzmltVq7Vvs1yxrhXXBMr3VUyjeWH3JbKSGBN4ggS8D4LR9dePeusPf0NFG8pngu3ElxiTb/9UF83okIluR91XfFL+Sz5tqXfeTaq2vb2TyJWQJDpeSaQDZ+S3dOpE1Mmzzdixx0ijFQCuR6ycQJ4UcJNcMdVGpEJXyIlOehLZANkWQbV6bzczt65F9uR5hy1nHfgmgu3H3Y1ZbjJr/HU3Pn2zG2xenKHq6eh+l/EJOBq9zOQTQBuzyOexL2e+L84lTvgckYuoBUJ5VTlwf0UzKS9AO/XFXymmaBcAFMD0oXUsB25VpivN8rdXn6CdxLpNCRRyXZlpAPGzF41p6vHmPdfeO+JiZXRsGzAn+vcz6+PIaSurqT3A26eo+WiQXiSU53BhHvYY10vcgym+UJeXWtc8ywnX1pCdUWYRKk0E6P5pLTSDbbzFkYHN5KYDwSUC2gulocME7eWUonl0bAshzAPME2mjM5/J02ZWnl9CyJ+C+mBaNen4uoml00rZDHzRZfgFwi89cJkKuQYJwrm4IK8GszLM03BQMN40vLHfa1SWOh1bUCCH/dK9ZjpJv5kcYLFtuvTdbG20+MN+Ou8E3TKKJ2rFIq59teI0uWwxm+QxltsavccTF8+2RvY5Uk4LZ9Ot6e7Gp/Y0X5JSjmGVhhtmBPmzNKPdKZtEbWhQbfbVBb9H37Ed8SOB3JPClAPx3OvZPqMsc8pUPIM/6an74Jwz70/vAItyD7nX61QbbXLi1dL1aVYUIOCfoXBSq3C19babjV5WOW1apWW0lq1m3I0tet+mWJSzgfR+WpS0VS4UyiO+olRrcjkHeu+oN+VkWYSZVHW4rkMvNDw/A9EnaaWuoZeIByEZzDfg+OEzwDSCvgBvgHenDHjDeQLsAeJQBwAXC0UC3odbnT2MJ+dRx5Ti6CouylCehxmEAC3l/P7bmlvdp8nL5sqzVeS3Wdew1sjeWXXG7yngjow+S9dgQFvk46VlpWEvckzZDNwnwNvh+0WNppJcvk3oNygcvQGAFh8EfGoF60qGlpo38AJTPL0UA/CnANJpxgeoE3C9zecYOnXTmydwl8qjXl70kAHf4XEp5mUoh7Pv3/FzK81TK0476YT7zAgn/8maMuAXSgT4LNIcfxa8HEOseiAhyiGayyPzUep0GPSHmzUN/uj94RDJ5dKVqztz63KyxfHZN0cpcmlwdunX6Yrk4tqoZXV3W7NrvmyA7h5YkWdEirnNKFm+FXZWt4pE3JPApEvgvBOD907Z+0j5FJgsmTOzLhXhRPBILCQDY0EZdX5flQkyl/jquU8k00DdBx/O16yGu3SK0nI3pV99uAGV499k5hyfoFr9GkEtWLh70p40v2shOqpDxLIiW3dJwLbPWSsrgOlwDamrahMI2yDSZGmJrfpt3EJl/hOkHZTYHCdvlTFczDINO6DANASAfQvMtLXen1ZZmPMA0wFq22dKC20abjY+Ab/ITkEOX/bGJyCRTkRRdjlySiUzHO/Hp2iSlxWxJ5kWEloc4PK2Er+9tAH4LmN/O71r+n4/qVu5u0KvrlI+R5kyuwvVcQK4+PFsV7LliZV0jIdJKl6BfV7S9AGgjJ5VsRnK6TALYzwB0aa5tQ4523NpvA+2LNoOmxjtpIo25SYBzQrT10APmZUYDCE8TFwG7qQDAn/g8lfL8MpWX57m8EFJPfVua1IgnY+MXAYU2cdFcxH3dy8HirPcYRSqmHmWJOvs6NXf9kOR0txZs5sMPRnFBVT146FEyWKZYTfvxqn2rfRGX/o1a1EHna+iWnM/3Yiwdx+SZ82z0zu33bFVnJYQFn36u3nquoy85tlXdkRwS+EwJ/JcB8N7EwWAvH8zPFMqSl9u8tWAvaf/MVM5/nvasNc2JcjGlSxNuGbXyDZkFSKIuPKFNDVK25Zl3o25kaSJXh/iiVq25rKQGWOzaYiOCSm4CJeuKSL9Cq6Q2YiJXvGurjqMBB7ohXtBmGxl26+Gyk06JLIGoumuAzFKmz3QJTa/NQ6yF9obEav4BSK4a6dRU21ykarDDzISmtAESUxOB7wDWAs72TKI6AcSl0U5wr9CAWpsju42RBujIrH1kl804VqguRYOwPP4tyXTyIdoqBZAgy9fLRfG9ais5r/uQ+SP09erlUG/jkLkekSr/cIvYV2CjKrbjfV7G6/OTGddhmzfcck0budWNnTJzATQLOBOiBV+CbJuVdBs8BdZtolLrhTa8B8sC8gDxi9cGPX2zwff5qZQzmvAn0pNCALg07mxADdD/XDXv1sJP9E/a/RizXmJW40euMUdEtIFwkTZQG8kW6JpIwPGAOE67nqNz8kmavNbx3NXnzxfX31TNdDd/Bis9cZUwxhLpbCVDP6FLGqWCoNEFTQZpmpLpCE3f1eqikOQznr++rCYNK91WdVZNjOSQwG9L4L8MgP/2eN/JoD2B7zKbeGcr/4vkYBsvjsy4vRxztC2PHGOhnMwp62fubtYm2hcluy7saxt2dYV9NLoAO/oqtv3C1zOqY9ByqzFlcbDxIGoi+FU50HAWtgFo3JkEkAbTzKJWxqFNeuUpI0BybDRsttcAbYDzXA4y+4gwzEWOCsmz/bZsuXt77b0XKZqAJ5pvAXf6kBryDmybrtscGRpnaeCDXgCdfKUB2x4bof9WAKIbe1K8HqZ811TOpxm9aK2LyW+d2CgdWbck8CuxXZd782K95D1jXaZ2reqN3yId9QaHuPx5EFANuw2VBt3WcvPMS/McwDvTCbZrWVefJmTOgk35S6cgmCdpvx+fSwGEowV/enLeM0D8glnMVADe2KfzkckKocA4mnJr3T1vdjd/YuOYQSinHxnqZSbGTkHqEshCSoGRnQqxMc/YGEicYmqKeCfljLoaYLxy7TrYTW0U8xcXPpN0JK9YzQtSp5lXO6Iou6q0qByJZJx1cp5d0NZCRXzl/HKxJqvs6M66cMlmpIYEfksCA4C/Q3wDhG8Lqy4YWRwzWJ3ING332k1mtVZaq2XWeh6GPIAxJAlSqXdrflz36Ypu1YUeKNQFS43RijvmdlmC/O+qcVXMSr32L2vkImNZyAQk7KxpXzUV+rUB4Kv80KQngAUsum6acGBXDUBOzXdopwXAbXNtW23Hj4Du/pPabZmIoOW2n2237bU0NeG0S0dl8qKw63ek1e+QWs+j1ZmkBa2S1cWi8uqixI1h6V9dwSj9VdDq1QW+ZanyAN9rGa4EVIt9JWpyKwLJreqipzBfYjsGqrPiT56yaqSrcDsqkMiLXgBVXhi5xZSOF+KZPGmcQ4u9ALXNJIR69UPPlW6uEOkFefxhfoL2+/w82QxFJilhmoIWPMA24Bs79SUAT3v03FhqzbzaUyMWa75AkF89ydAHvUSgRXd/9PIQ825UVx+jq4rzPOjeh5muW5Yanuo68gDDMzTgplhdp1XS9O5vchST/kseZNzZVh3hMg8kYY20LPWlnyqi71lF5XExa/Ua6aic1/dvQdUXdLVGdEjgMyUwAPg7pTlA+EpgWxNV5sVcStK6Buo6teLi/Jx7YyZUkLzgkXMtBZHfRcNgZc05mGV21NM8H/M0RawzXVOrRcDLj8pVJ3kms2SeGtwcrZlW+C0TEQZpMx3bX6MRNmCWtlgaZ+yVscsOTyKdH2zbVoemOTTQ2gR5nMrhsJMHEpmFcEiNQHYHwPE2sgDeUZYAvDclYYj5865eBKLPSCmGr+DqmlkmKaFKI3AdVZNvik0AAFklsyxoYUq25WzFFldwgyCuS4CKDYKRVZ+CXpZ5Nd8onl+Q+1bo+SffjTxlwZDI7fsjOTjkee01vxHvnnduufzLaO4zaemYE2q9DpiKCPDeBivt9vNUzs9z2INP1nSH5rvXfksLjqlKgHJCHVSEBxZtAJ1lRw7gpq/5kZZcftTDm0vEZZtOXWhDoy+zG+QgTX/0PdJs3OYf5kBzTn4boFijizGmXCy3Nm6lV0nyoF/WCYnHXKBS4iFLzw6kY44M8j6ANKurSU0bq1ZE1Ndqcd8ZLU3MY6ytu/AVHsvaIzUk8HEJDAD+Adn9kSB8Y4JN0Wn6iwmrJ8u4wkxI65Q1CVXboJR4pYuZMbMIoyxJoqYX27DxzbzWQnQsMrLcemya86KeVFluclrqwHdjGjH3BM1u0rcaDS9Qap/B3uxogGwTEeL6YELSx2VSErbZ0kwT7+y5O7AsAH6ayuFo++70sQ0/a8abmYk2Uq5swLHvzj7IPtvrX1uZctwp+ExfhSmHCDMJnepu5Hc0RLebSKIMrxruMm7RcKVvt9AxGNErCaTcMrwieGdGXqMMX6vuJ8p3RoKzDXqxMr+8h3S9M0GVPh7P/ZIT9fv26uwksuxtsskwpzDMTCqgruA6NN/h2jDNT2SC0oHvl/SawkZRTFQwW3lu9ugJqtNri9oJnmo3gXt4c5GZTNi/s1k0zWoE5MOvf4Jw+g/m5WUCm3AB8hzUUmhLcdVUlUTNSVnVjE49ImoBb6jyk5SUzhVkrzUjy5ay7qq1BVGX6F6WsrV1qNaTHWFXfU070kMCvyuBAcA/KMHPAuGf9Yx/Fp9NccQktNmGZixPVIu5ysrfNn9FZRaAzb9UhEShALJWBeZjg2AVRf3KJhrNthOkZxuiY/USCF7Op6Y1sk/NSPKln+KJh4VYjLINeFFXaYXWDpORgJ6yanLBgiJQay8gcuMnm+rY3JhaaQHmAMuAYpmQ9OYiBuS2126AXR5JANWHlWlKPT3SB9EkwJemPQF8aNzxQkIfbWJCIiWh0S4FJ2n20pB0u9Vqowx2NNCzFR9/6b5QuYTYlfTRNd++LBlv0eT9s1XW8xjx2xLQBQzABNUHZanLlHUzvN2qS3q69cTSdemKTV/vqtCoM7MXpC1BbOvOMkWjg4pnB/Mt/jLOswr4vaW5tlcWa79lNqLNnQbt1oTnRtLw4CLQHhp2xZtpi8G/7c2pS1r8M8RuXaA8ryW9Di0+82//6RQlOWfXMGWmsHteUxxVaDx3Kb2sFDOtstdlCLv1jRreJBptrMhJ6hP5aj77kPdngO58/c5eLMIVX01DncJnQTsSQwKfKIEBwH9DmIDw/u+jtqRLLj3Ht8VzzrnJJwnexm6TKie3qzZ+MVEt6LvESnRuk0YC+JoUTYg7r28ypanp1n8YaX7uFoIoZnERfJZrxIAMC2BpTOhdhT7djvazb+qDvgSrNdnTDyboTLDQks6QuD82ISEOuLVmGZMP22qjzbb/bIcnzEMONhFx2NlrH9gsOZfjfhIN8d7tH/cd7UgOad4S/Wz98fjVz3VZjskszCsXMAl+fUssMy2v6MOaVOmg90W9orjKJmNxOZftXTHo27gqDGav0lxVGhmbEuhluSRYz4XL0mXKT9Nbrumy3iJ1ddNQ2njmM7yos5V4w31mrtlghswB0Z4CA0tecjEdu8SvT8iFvlCLj0F2F3Z5BsOUtUOD7CoxwXeatjiUv3M07b2tubTnYV+eWvgIDcbtvQU/7DJbCaCtPsrcpbN/l9tFCy3lWcOUZYq8D4ljZibFiSfUTmoWRNaXVCIRRJ6iswYXqK0Dooy2oJB8VaHL1H3guyzvid5UqDa9iGR7ztR82je2oB2JIYHPkcAA4J8jR3FhMvgoCP+dbjB15Px3xedmwRXlqxk324D/cu56lQ+FOYlfEQafJTsWNv7x02hXo+9QxPvinECzrabHNnfR8qWIoToDcRvBadmRmNYNthNwp0s/bZDc9ApisHzcTfKlLV/Y8koSABzQHcD7dCiFz/EA0DbgPhBGOYD9CBA/NFMU2kXTzgKTi0wdW4orhrN697h90yzGTeVFRnKV8JBc/iHr997/rXZycRhdXmZ+ONW38rmcP9yl/9qKyDLvCcvyPeDbw/7aa9Bf7V+KGXxojHf7edhiooli2ZJedqHlpVtPTVeeE1LHK0sFvGs+Wmrrja2tTi12mqbM9jX+TMhmT4fPmSZPgNx0uEMUQJddOfbl2JbP5Wku5RnPLfmCcPGmcXt4QSMf7hmxJw+bcp5vvUBEXxfzcYxbeQLMyMEgXL+m5WDrONeRuCd6OsU9/4tXve+WM5LnnZaXd5dfiehG5qzbHOkhgb9XAgOAf7L8/y4Q/snDeDM7LRWa35gtt0wMlpNfAuJswHqKnHWXtKYB1V3ChpocL065Wrq+6+VEDBVxfVLDkw26l6q+bM1mKuQpPzXJApU+xAXQLU122mLnJkdc+uVpkJ2f7V14FTlxzPqeTx5K4+PaE7wvPJLAM8xPdHhNuv8Lu+1qRhKu/dxZD245nm7A/pGgy4joa5csyhrnvEbk9PEQWOXVVaRDK9J1J3Jt7PuueMdmXef96Z77pzJ+f1f+J2qkDH1xwZbr5/r2MPtrcZvqd0vyvnozn0W3Erqta3u8+oa+NuJZyNSWjSm7+tDWNlwqFutnkzkmHhvKNecA6Pc4DZzLfvKL/Mt+Ks+Hqbyc0tSEw4XsylCmJ2z8ZDOogHeYtAhM7wTCz5wYepnK+aUD2rlZFPtzTFiwQRdgTw8tvAw0e/IE4wytH2++kOmFX4UaadwjVQh1Du5y/PNh/GIQP8XJTAZJ2seLY3pp0UsNG0mDgwJ3pl2RBffugrwWzdFQl/hHeLzGf5QNCVgCA4B/wZ3wp4FwJilrmAOtIlNNorkyb09gLbfFPOG1i6INjgLgL2pFk6EWPnjjK8TTYw1z7qQLcUKeQk2iXu2sjEqvHrSoIzDqZEs5EzgLoTyUKLTNtQ6kASQLcE/ldJzL6TiV47HUj8rQUmMqsp/K3b6U+31RaM8nUzsBEq15fDBVAWDTvjXsAPZwWbjIt025e2lZ9RJUTsrhqqDJVtrrFFyM3tLMNScrJ5Gvc2sx9d89uIAD+VE3WbRmr2Ox4EK6IM8xXNd4R05yNLP++1dM3qvN/xW//63yvCc8qjfLKsHVxrX1c3lDSnkZbxRvZfcvBa9WXwBI37nX3VvmiCqYAjRraT+Imhkyqmkq1oTu+lQreN40vaY5KMONIpsjjwBgwLi00s1cBK15mrfI3lwbNMO3uOI2a7FJSymPz1N5fHFokG6Qje/y5se8+TRHa25QHuYwsmsPMI45C/2MIXleQaj+SBESWn1P2BZctRxZX5yYTlJCDnn9IMbHyhJeVaaJ3xqYqbu/Kt41447mTVHa+l0eb2poEP2hEhgA/Isu/P8aCL89DQFqc2Ls15WcBftwW9hL3ssUNebpUsoOA0WWKcoNvgXOY2Lva9WFgIVRIFxchGxz0sdTiLyFKMPl3jTJSX3NLaBAsTRQnSeRMBNJ8H13msvpNJXTqegDGJe5yMF23PcHA3BCum6A3x1ok4Cb4n4gdAtNPItOLUDW62VhXUkkr34ldBYRcqosOvBcOUQf+surhRCCWrFSu4dbfCrJMpL43RWXZZ+Wop/va+B/7Rn+NFFWRsjz+vrX4q3I+y/Du5qgR/UTXXtPk0lbAfHGGPLlkrDR6WYJ+gAAIABJREFUbxDezGr3YZ1+NDFYntFt1yaRjTC2XfSsPrORjkoae5qKRGhTlgDoAPjLVB6ep/LwVBRa022N9/lcyuO5FIezwPjjuTd7CSAujy8G4PJHzgsB/cOkhX8oR5iyNXuhvZ9EoJHn8HOg/fS2ekrhBZf2DRDPXyst/6uXv+SPBPuXo5vXoy/IyoTZwb58xIcEPk8CA4B/niyvOP2nFvBXp4lPmEcq/yteMVnJdVXOdF4ZVNJQXZVN5RU563Ql1JSbqV1M7KFVCf20F8DgEAsSqcpTwI6eWPMtTTM+tfPAmTAX8SmPtqsGlDd3fwbQ2jAZpiGYi8iXdmrABcbDjrsCb34ynn1yJPQyQbHHEzqn/iUQ79P0vXY+x56ZIes2Oo2U3FqlreZd5bdF4dFaWHCtJV7u1vxq6+uCWm+joGurK+070WV/ZvQ9TVwt7J/ZkX8sr5TQa9d13fn30EbdjSrru67dkev2nM77dbuU3ITIpthocrPqEnxf13JOy2+xTXY1s+9vfaWlcl8Q1I1nFLaMOn+YtKsccwk5YsuLfYJxpk7m6Z09rjDPMO+x5wSPKbL9ZgPnyQcK6VAhneQZNubYjcs0BfOUBOHNA4u9uRjcs7nzWeYwlKOFxzwmPMEAyi+xMbUOrR1alqPJkAmRq+j//OKJ5HKg+9CyVxG3SGXQzY+ttMY6su4ytNxO7LXOiAwJfJYEBgD/LEne4PMrEP6ZD/hNXm0+udHLN2QnUFzxwr+1VhC5+rvVg85DRlf/FnX2BtYXLRxTueinRmrgq9aTMinY1TB5B+MdqnCY6CAbA2K5AMQ05GCf2adjKXeHUu4wIyEP7yT7ncCzNkPKztuuAPMQGx1wE2780n4be+0Wb2YlshkP0xLi/Kl70cereA4+xxZ0bRnJETdCDRu6HH8ratX6vEU8KvodRSVm05jVLqg0b4SeSVJkHYfOzbKktzZrmdtB+2VBVvrUsGvtU/n+7zDjIuS1/NWoPnDBbrHnWa/NtVjNWkS2y2uuPHDwsJHTXfFKsGBWE/kCfHNUYmeIfoumH17fXKOftKclB9toTOH6QM1Wkh3M/qkbyuzG1s8ZmjfBp7NAOKQC4FQMd6enSynfZBce4BizknBfKHMTabkBzwmoS7Gvc2/0hMYbPh3Kl3n4M+c00MeXqTxqQ2jYk4fHlovs0vPUziYVmarknUd2FjFoDVxQvMzY8eVVlZmLksuva9FdKTckw2wjauevp+1OXMp32chIDQn8ngQGAP89+b2p9q9A+JuY/IJoNY/8gvoDxW3GX1aW5plCz3jecb5FHHnMpSZd8lmklouPp11WlJyV22g1N/dzNfHAiMzThur4zwZ0h102piGxcfLuWMr3u6l8PxmEQ4PdNiHgXB5IOi8kcv8H+Ea7pJCNURlvm6Zswx222trQCcJt/V4MdyOxJUGT3eIRLxsbvLazUpaUEm8X5VYLdSm63bmNphpfCl3VINwtt7ZvtbvB9INZtPD1rXywc/+wal8spzexX947WwJqd9K61HU1H3UTzi+b1WOaVKswu7N6lDObHvQ1+nzKMu1pwJNUgs7sPfUZk581avCJCS2JunYaVxdm+0pFgvUn/zJ+DNM92KsPnblKmpS0MGzJw595Am9C7MWrzbg2bRpsY+Ly42kqP3ub8nMpz3tcKM4F7yyyVU8NPWF2kjCmew8hxx8DipcLkaWI+rrE25DbtNtdN0kVPlEvQ7UbCbcmyjX3kR4S+BQJDAD+KWL8NZP/BAj/dS++iAJgDNrVxMW0tf7QbkyeTPg1FTOduuW4tD6ab5kt2/YafiJl4TKwbUCXPAHgAMGUyxdvgGObnfhESINr7LMNsA/Hqdwd5nJ/LOXbsQhw+/h2m5DIjlsuA8OkJHnSP2nVu/6gWFJ+HIbDGDVkj9ujayP/8JXoRVaZICuW7c3ClHxQx3Wodd8WqeA7yTebgnc3xo2mVhRdn/yzdFsSs6Hr8M80DbmWw39jTrtHt26gjRvmF4PcquE7kBKXhhL8LbeWayxM57ZayNvcY4DCoHnVWeaDbpjqV8fOigV3031uT0+rFmNYPcWrll5JehN3Au/Fs5ON0ATzpqYR92rezUrLJ3kFybYjx6QETTheVwTGw9WhzE3C3SGbPH8+lfLz2QBdrhBF5xM+AeG9WQpg32Ys4fYw/KPTPi8IaV8u3+VOSCKSTpVph6irvCLPk7F4RdSbRmsVmIQdY5VmCKamR2RI4HMlMAD458rzVW7/myA8JilN5jEThqa6TfbNxi8o9HOo50gqMunHcoTvWKSYYe5xn2NjJGmAcPex2z7728YMRCdIpulIHIhRN0XGBsrUgGNmggkKGyQxMRF4x367uv8L05UE3PRTfcvQIwKgMrGTasA79FgxyXu94zul0Md861SwsKCKBf/G3SUJph1+D4CDh9ulrdauRLzgtyyrRVm5ZkTkBrlHFJVu1KUfWZRsYtlft7KZTjCxWXgzM82gaDlbvUk8Ct4ggY9dB8TPNchPNuRr8t4rE7NFMlG4ycnv8wu6Xye63uQNSyVlZ4bH0VFWtuQZy5vWND2lzx2wghqzlMpcImJsSZ2tVearSNKtsusMkHNxf80SiFJX/GP+2smcEBORsNWOOcXepPAFDhDfyetKmqy8oP3GnCXcHnJI0E82enYmKIBwf6byBB3psA8HyAvMdyd4ytZcQL8dRPQyX8o8X8rl4l8Xc87lotA/CcyCjBWF0YVyKIQkeffxKrQqiZozIkMCXymBAcC/UrobvP+3QHhOWDGbMfvF5NdATpZZGEz0Pl6YWd+aW03/sSgLiDOPUk0HORi8k8ThVAXeCbDzBEkdXNNMRnygTUsfZeMdJ0l2JiiAbm+SDP/b1S3gbPeA+w5Yx4sC+hhDSI0mxhzxes1TtULPrffzt9NNPrVCLLqBTyDLP62OkejjWU4oelq4JjCrnmFf8YPx62Y6RtHWK01eF/mnka3+d4zffdBPq2swkUCk5Y/YRyTQA7n31efG4bMwOBAL3xPXd8Zr/Lepyd0ueY1XLXv13oYqCXIsGVLWt9teD7KG6/Y0rkJ5wu2kzRfVFXXtZh9x/T4n41liru3+z/nJ7asNfUHHR2rm7gWCQn9MwZPa+RAP8J0H+ADAsf9+CH/igOsE69KGy0+5QbeAd2jKtfkzQHtvX/6E2Uq5lCcAOH2bLwuFh19WvP7grlF9FdLGXtx91bA0Ri89i0uV4lIYRLcJFtQjMSTwUQkMAP5RyY16IQEvG1VbIyXE7QlMJeFaj8VAGgwBbvu85hhn5WG/DRiW/sI+uX2Me5qTdOA6tNqnPDUS+23lxebJOCTnwM+qOgoecI2W24Bevr0jTtto2N0Ht9tGkzF243tBQwha1JTM8ggzqaW1/3nTBfpOmmCXSYddpqK31Xii18tP45Ax9VFXK3P6pZ68aCeu6CLIKov6t2vUn9wX9RYcNxPqhe4dL5ibRL+9IL6zU9udGLlxz38MhOc18Ea6pTCzLMNl6aupV27hV+ttFf6yeW5UGjShm3a8y47yVtq6GLS0HZn5RJLVmg8A3zK2eruosUmgNsyk6kdEqAfOsdoGET47bxRVafbcZdlXKSFi7s65+oKyGXNB5m5O7WVT5jG04/JHTrx5Rek132lPfk4AzibPJ2/wPMsjyy7SmLHsvEE/RDjHSZ6E8oeeIe4Qw0c6Q9FI+OrePzTE+sUYg6DmjciQwNdIYADwr5HrH8Y1p+R+8WAi2/4D3EI57Wb54sZ2ercH+IYrwH1M4Lu5HCe770NLbfd/dg2Ir22B7EXYNk4KjEtLPjXTEoF72mw/X6ptge72MqDeaWHxRN1Gp15XfXaOTstkHW6NdL8GsF7DpZvYk0wrQnJy6KIsiDCRbWZ3VaAnuzsTrivNaD+KzCNMhhn2ZVne9yg7nmVL+lzga2s9+ZJ0lcK7TfbmdiXfO6uqryVXw/LP/avMrn7TEHaZI7opgY/JKl9Eucb9dbh9zTcbfzXTTxok4vpe1n23Vr1Us5UphCRAc345roqIxdjc2daN0NS22vH8Zo/hG51grnJ1fStV+5cltJ3xjphoPJBVYdDXpQrpBKOVRb4EU+ia9XkOepP6zATsxXds6gwx4OpwP8/lOOMn3L7CEU9+2oFBtiXHnhzQrU8A7qoJZxNnascpe9qX8xMuEWd7ZMF2HIAd3lwwgcnDhjJOexwlQftqu45zJauajBesnMxq/ogMCXyuBAYA/1x5/nHcElYycOa1fh1gwrv6E5Fp7XMbbfRU9nILiJcSuwc0IG8nSHKSZPVIEqdO4qXk6nMAmM9FJicyLzGAB3R7TfOiojgdzA6vO187nrN1hhSwwLfB1cWp1olIVvHaXBdDCSqrJ82ibhZGX1UWeQnEF/SAV1RPMNtkuKBuia6dTb6wyz4sNZb9+Bu/II9l+90ATb+M9Nw+IY44cphit0hcNfC/ZSJ2Nbx/QEZ/f/bxT+haf2mDNVnvbqWr0LO87qGRq2luzgLX1eI5VTPRQNek6cmoz15j4Zmnp454P5c1csXURIDJK0wZ1XMabNKigKec2v6uU0Q/bWZXum5k834Ncv12EfLlCE11A9HYhEsDnmD7GVeHPpUT7bdA+HnSAUFoxaHlJE9MXc5pex4hJi4yd9k5xDadP61H0ITMleei5bfGEr8OdLRLopEaEvh9CXwpAP/VvZvProexTG0NTZssNCGYlnSbOLZq/M15MaSFHDRnO0dTUfqrrTMUE/lWxRjLuihmRTgm137U4hVtXE2+S5ZKiUe0seZj/n3uKh71uCaKRphpQp0sGXbWh7DbJsQzyfFo/9xskNzLHaA3RwK+2STpDZYG6OlzW5sp0XSnmUloveV2EM129oWu0oEcRHYw8/v0alhbyRjqm5b3TdaNwTV7+tnd50uCVyqq3pL6bakbPJXdyog18fWprpXIfjf47lj8ndH/1n7/nTJ7d9s3bp1381lXgO/q78OPRPD5ZVeZX3gortrOmlcFpm0P0qrHJDfqVKq+rMVfu2+hyrm/1agMX22urkXZrQ58b1XUFJtjq+NYtgpPi8wb6wVCMPtj3p+8J+flEPbhp2YnXoF1mKjIzhwzFW3ctFcV2ZeHFv0ZEN9p1AHiskXHFCa04YT0BXCusL5ydMqEOp4UwtbIQ54drUa9HHoTeqVjI25NVInRgnNvMdhg1bIWsZscWrML+tcTUWnBdJF4vfooXUjgywD49bW9vkjQXOcu+lcTentVihqtZss36e9OuLXBzUjrbffMNMos7nCe5CAXcUyCnVQAh7HbnKffE90u7InnMFmIt/aYIKqwElQmX3oQbaZmUhxn21DnhBdPdOtvxHJyVjLHsKLyOFpmjiSHlNWQPx/0pQl+ZebBz5KcvoZWWiB5tp/to8MTx7mj0T4Va68FxqfyDQ8luAnUITnBGwAvsxHba2/Gw76cMsuNSK4eCCvV0owpe9/G59h2vjm1shZb14+0K2w3c7PyulISpuT7tuKG2Crqya7iHc83PThtOXZTWb8xVs51diP4O2Jdf9oI/o6OjDarBLprUvN+N9Ld/2+6nd/Y3q+6qvkzp5YFT2p2naplOYHfKIZOjfJ13fpybNfltZnKpwOTN8i3swGB9N+l+r4ivMoIpVjmE/YycL6+UcjAPRQlCb4vB6bnMCsBKKd5SRdHw50A/MxBQQLl9i/+iKYcLfl5Lhl/PBuoa2MngB0wHkA8/Z3L5aG2nzJqNm1Pq73CMZbwoe6RhLT7IWacy9zHUxKRZ9my1q83JKeMor3+HugahU2yz7BmRLeQLWVdtVZpcaOsaDrejay2ovUz70PnLlpoVUbsVQl8GQCn1e5ybXZi4/bapFuD7OtbpVUTrvo774Wu7QS2hMiipUMy86Xs5FGDBxDDZ0sEkMDUp0MkUogZBv8K5uMJp9iPsd+cSYsUEB5YM9tv0nKs67IybtH19bI75OUko+7HZArwZXIllJtA3AFyJLtstmfZb9+d5nJ3VwrhPeFdUQgIP51sz41/7vzkA682+868Od6NtGf25vqNsOPUMl+LvbsCzLYqbeVFw68Uvda17XY+u8br/EbpkMBvS+DD9//vtaxmb7Z9s8CN3iy+WfCxzga793L9vRfWbC3DZdfJZRqWcVtovpcUy1S/5rDO42UF8G0bcezCDbofHksBcD88TuXhcS4/H6bycDD9I8AcsI7m/OJQmvGdXR3iYwXljMIL2ul0oUtvvarihrYu5nRx0TGnNbYYX44i8yBv+h/aYOUO3t2cb7atXfExWbKsWUSucVL0BRb5Z6ZOdfGeJEmz5Uz3lSQDZWzVXNYYqdsS+FIAfrvZX5ckkN68qX5d/VMouvtT/PJHocXDt4ZJejZj40z8rJX1CPX8xNPnyQ2PGrwqMw1xM/uGTp04DS/6EXX9BEcDQeGaCd+DmzKzB5V9ZapidSpEBliPBttDBq+uF25Ik6dMQdKbSPjgxruINd3eMNmbi2CffdrnBkq8ldhemxMpUwOeB+Zg881GS4A7E3U0+ynXdjAZEhgSGBIYEvjvkcB6/mddyKVrP03luGNtsQes86mUb3dhKx424wLqnflKasNlwoK5Ch5bQtue5irQYLaC33GWXrTkXgp7YI4MY4WMTtIvFFlK6ks5WTUghHnZ11b/EwoV/KmrrtwvBj8NWl+6eNIldea4qkM/4RK/BItdVuHMCJW2Lxepo5HZ4mtaCOzq0d1MvNC4jdhbJfAPAeB5Zyy7HffQMvM/nFq62kp9QKiUdf+1GzVRrV6QgdUqyocs3nrjbtVmr3zIRNj4JPjWjU82LPQwk4NmPFXatBGPx8KW3IDeJexOT3q3oe/WnLvdhiQJq1h5fPmFginGY4JkkkkJJ0kKVOP2L3xtA6BPRz5hZqKybhNlAHCDd0D6rOPfAdzk6TCc8IiSrgL77v6Hb4HR3JDAkMCQwJDAP0kC8UvrkXWioKSZy2U/CUCjzJGJCaYpLz70R77G45AfAW+05bHhE3MVb+z0yZ6c0gk92nI+D2fcJgLO/cEkBvMUrcZamLUyVoxLJFZl0+S31mqX8J1rmlVmsck9M2spbQGYrSWv9RTJPXCs9+ZLU2KRfLT2m06/bOvANmMKetkwFmNgfaeicY7o85rne0f2K8xfRdk1n+QjfJsE/gEAPG4c3aR517yt819Jxc3oG59WGiT2A9D3M8uyN208xsmZ9oOR755xu0vzjTOn9V+r1ZXUZnkaAnwn8FYFvgy+Aen6+WyayyVQc1YXVT6owT7L9LwGL4N7A/7qui/t1ae5HCa8lMzle5iQCHSfdrLjTpOSO0xJZFJSyhH77rABJ9SGTE2kBvM6fZLuZ58ikulOEiM6JDAkMCQwJPCHSoA1IdcPOYBi1QiQiPmI7Loxy5SbQlwhGlyj2cZ+XKYoshO3ucrjYynnx/A7Hhs3fzxO5d/8+lrsi1zAXLy9ptJGGNAII1hNZWVZLKEBvcmzqUmu/1JqyTXtzu5jU4N9tdgJiQgccwKoi8U9YDLgmly7cc3FsyoOKWNRxxa0U9yZgyB4vAqQE42LXd+SixpYNyKyUhATV9NG7T/0jvzYsP8BAPxjHf/6WokE48aMOzbf+Gh/87bza2Y8HNe9lF233h6p7bdoPQbhgq17DNxAnxFdajve4QFBdE494kHMRyHzHfpVIR5UuhYg3D2Jo95js6RcBIY2Wq4B0TTEEe06ZCE2VH7jp77TVAhTA35M0I0WXPl4KZnlRhBtt0xUdp6umBd4/aA9hVWqTBh5Da7lOHKGBIYEhgSGBP5gCcTyl6uolw7UWV4TCVE+7TEdQUs+sbFzKi87zFVKedqX8nyYyvlYytOxFMxW2MyJ9xTCn+ep/Hgq5ccZl4iA8F15frmUF07xfMnDhILnbO07oPxZmnKbrcikJdZneW3jcml5Zm3zylvBspZka5/zqjoVK7TMVLvlXkSxTkY2WNurvV9IdGio5KRGa1meRg2WqPTJjw5WPu5Jo6mvEBoG7Y2/j0tgAPBXZOdb1t9+aEy8yO/rB/gOAy9VqQ8ddHm3xttubr0QztTPTH7cdE/TCAA5mnf7CUijUI8OD0s+BTw1lOWH/PioSuTrzdvdIcfgdw4vJXHwTZiNoNWW/218b8cR7rj4w083Wuz74yQXgXeYj0Q5QBy3gByWY/eAnEDpD5r0/GQv/ZLO2HMyoST/csyZHuGQwJDAkMCQwJBArntWZQENDSdxbmDNsVYS4cmpzDvMMQl3AuEyWcFcJT93Bt9oyAHZD89Fn5/atGlQ/vS8L88vbPiMNGYtxPHKIrMWNoXO3uT5HGsvduVa/t1+W91aLHubcJgRUaoRSjmHeipQcaum9d74wXeD6JtYBA3SXMaKu9DTV2BhtNCqmHmmM8x7DV7GItm5LBnhRyQwAPgNqfnmbzcb2Lm/7/t4z6L3XJK/+FAu+rh5xVvgOm9vTx2YfMTjYXq/iDYQDp/cVCEbtHxNDT5pjqKfo9SKpiGOAXNfYMjOFejN3Fpnfs6bypGd6GGffXfCI8kUnkmsycZLCRslZbMdPrzv9lO5o46OeLePbh+qY3tugPoe0C3XgbR7KZN2fWNIZynWb9LKy155DAsB9MIe8SGBIYEhgSGBP1wCrCusnKnSIsRc46JlTuuLAGesK1o2vYOTWgBuTs3MUFryOODn4VLKI95StBnToDttx8nTgUBnhw/nufw8z2V3nst0ppFZmzcNvjE1ifVNsAKo7X7nd10HdTXJNQhX2AHmqm8LDJxa79Tv1epEAiLkki8QnrCG0DBAeEP94CvqRcwvAZmIsuwOfV5jo550xF+XwADgr8unKq3XZH48IjdwolJ+inzTdvl5X9esoCPg0fRfhqSiRjwgkFCafKLCKu36aYIizbZsPPAvbvAu05LO7pqd5HwwMxH4Ps5FHkkEwEu5P9k94F1vTiL67oj4nePaPKkj5cM/dxy4Q5u8XHg68cSXU4tHxWi6WUEjDVn0IslBj3BIYEhgSGBIYEhgIYFcLALsah2JFUbKL8rtUsumoKFvZp1ySbns5oJb7guKo7mUwzyVE3bkAdAxKVls4qwbOefygOvDM6Yr2JXnKZ64OsQ8BaDP6Z/WhtMdxZVvG3WBZH4Jz0U+Q42xAYAcZQ4dMvKW5E65zKttgmbVC+Ks45eBxkT84pf6dXt9/c2y7NgIfymBAcB/KaJXCPq7L+J5Q9daSbO64VWun5YWOu94iHgc2LTBg9VU72IhQN7gq9vJRvoHKGyqp13Zhd31Hi21XAROAtsyEwF4Yy6yt402Gu47QDjA+zRFaHeAmKNQB235DjMUnWwZGygF8A28Dfb9dq243pKZ+BgBH098Xa+Xr+IVgC8oqkhHZEhgSGBIYEjgT5cAiw4rZe578iIr3bLWmqbakqT06yprSn4c0/5EWO1nnZkxA8LjELvDXMoJXTqgPA4CAoz79M1mdgIof3xqINybPKdyxjzlKTyxoEUHcF+sGcdTi/nYhAVXh9LCA8LVHurrWFgZZSLobln0iJfgW2A61OGQ8nIBYkjaWIJdSRpyl6ieBOUGVENFmX7lfuv69ArVKFpJYADwlUCuknnXrm+w7qebeNFuVde08TNQI2gxtMP89c3wk1WCVc0ZNZ3ANSYd1XR9fVfinFjYbGLttGyxAdphmw3Alt/tPIky/HADvnEfiBZcB+XInSCA3YfnAOL1QOvlIaYy5ogYhHsTc1wEesVggLV/Hi3fOad4KLW2kvXrRnYtH5EhgSGBIYEhgT9OAqm+Ek6t6wvrUa6o3eKKdBYLjsVF1gToJmk1tBRghwTqrPXBjlA+wvGmEgBapigcCBRuCxv4xjRlKk9P1obj6hBabMbxOZ5+yR9JTz7Nkw2cz5iugBkwjcl9YHQyPLLkMIQTuuHVEcdijOeVffy+jscY8WxD7CVkcxgGl2u5RONELr8ZqojG4v2AOrVtFY6vt0pgAPBXJLW44Tq6fFOkPO7DKF3ehllf84KIM8fkWd/otZUpv5tMaIU3WE0UEfLWTp5DOzKknn5Kk4mJwbY12gm8J22MxDOJALhAOJssAdcOBdBDI555PkinmZlkT2uoSPgIryLI0hDNItkSlbyT7zraqNclIz0kMCQwJDAk8CdKYL12kG5rRYsJIK6Jq8CiQOQA0EboqNfeZCygz/rKyZloyfWL8lyOL3G6Mx5V0JBXm/H0oFLKcwDwpyc2cc72Mf48lYc4KAiAjqtDytnUKbMXUHP4daHL9IYcZUdoLyrdeKEzWNAowSscIES9/NTxrOVAupNBLVZk/cu7S+E5/j4mgQHAfyE37uP+L8E3r8TGyJ3Nlm5vU1NNtKrPF4h5eavq0dZLp6mhyQck7bh7bgm4Ad3ygRouA2V7zdsuH/LiA/i+P03lXtpswPfsI947AI6nkuM+DsOJEyyzPocbZJw2ZVMuVUD3IDKmfEunsxovEUYSeojlsD2k+FZRrbMoqjzIvUmyrjLSQwJDAkMCQwJ/jARCcatF4mqpyYxYQLR8IRlpbbOQlZi/ltbqza+8ZPGJ+gTsZ5Lia7ZHL8xTcExwwrzkaM042nE+lOlQIGm+G8AGZD+ei9wc2mY8fJDjcUVAHZAep3BqM6ftx9PFIeBfvgyie8YleFlxX3OzpbpP/TBpZfyp21tjmxzj4sbR8h4vISoIQQQRqZTaot5IvEkCA4C/Iqa81dpN5geVm103fAXhelyDEzR+HOoNrTt98duOnhL74uxaCXBbnxA9KTE5sCFCnkRsgw04RjPN8bs+SdJpx+2BBPD97TSX73gz0WE4GZZyurMWXKYpYRcOqKfv1qqH7Vicgsng6K+gd/YzZachrB/DAN+qmITLMGtkuC4lHy4d3F+SjNSQwJDAkMCQwJ8rgVg8vFZsiKEzH8lSVYm1m5Vay1dF2knl9S6QujMhtCWIV3iZeMxl5ihOcgRWadChinccAAAgAElEQVRrH+2QB1jOTZz4F3/Ca8rZAPzfj1P5ERs3n86YsVgDjitDndCp0zuxDU/XhrYnLy/uC5pt6cCEMVIKgTXI0xH2jBIIbrAsqhhLDD6git5KQgBWrKmACvVP0lKKWLZIxoKs0o/IaxIYAPw16ahs+7byzWdoaLjdbkw9pf3tCJDWw9AaE3W+ikY7uckCAJx/9iCC9jkBNtpqNkX6qHd8c58OYc99mOWLGzMSaGTHffCmSh8LjxY8P/bTrdMnA9gbeHtMmo/0jLszSxDcdTD6nv1t4bbcWvkytsWxge/+MV/WG6khgSGBIYEhgT9QAlpiAkAz/BvLBGtLXY0Cm5o0czNMJpalc0PVHAtUrvh5SjSUde0Sfk1erF6Os5HzZWfPKoQcAnRiDefX59Nc7p6m8pe03rg5tMmKbMcB4ToAKPJio6dtzAOQC6BP5UVabmvJaVWf2hV6GOC6E0Ytzl+qw7xV+XytaM2lk3ewhLTLtfDG95skMAD4q2LyLboG2DyEuj/rPc2tmX+uo5TMS/JG7mmCVppkbl7vcAaj++etsO3uTU04vQugHR802nIRiDkJh+GE1xKZlMRmS7Thx92lpLZ8v9/Zi4kOxcEjSvNmAvjXv+h+31tPOoyDAXczWA6ZMMbiLNOElPrpr05K0NGG5Bh83Ga27I4s84JwBEMCQwJDAkMCf7QEKsRl7dFCESYjuYTkyhNLVuDhpcwqLRDSK30CZ9ufBEE4HRDQVFa/PsEy6GL91JpeV7j0HFbK7hAH3rGe4/iAk6QvgOk4SfOF0zZtfqLNnXJzOJXHJz6lPDzO5efjRe4O0ZCnT3LcHGLqUk1fwmOLR8Wyze6wFIjX3ZpmXc/lPRTfTWHYxmmcEr8MpExds41f6fH1VgkMAH5TUvEk1aeWdDxkulnjhl6AyCVNZZ2sor6fX2fmI2/wzaYO3Pphe22XgbwtexOkNdqy5z6W8u2ulG/3U4Q+NIc8Hmi9WR8xIeFEMB4YDr/xhhH4A7bTzCS17tlX943vNlbFM0l4Y5jJQwQJ1EWcAvB7co4c+mSbMYP2TCXHRpU5IxwSGBIYEhgS+LMl4PUC1AgijHWmW58WK8ciYbmRlatTL0kDaNimO2BKraTqV6euqVq9Hi0f7bEG54/dnLfBWXjlEP7AdWQQmyrtC5zNlRwElBs5AeH2Lz4VDvr58XMuPx78eThPsiPHlpyTOaGl3kvYjnMQ50VHzU/lIjuV1VhDbE0SXpBTl2ZsQqnXbenfdJAeEnBpVc79GhRU+YxIk8AA4E0WV7EExxS0G22BGlWnPcR+4nIe6BnWiSKqQ5k23QLdbIQ8TPVAHHkjqT66rfluJiXWft/fAbxDE66Nlu34d+qrNzz5s/2hSsvNm7y7WX946vu5GpB7G/SVjvTWrNXBadHW2SkrJKMoWPFYvwy4vaxTWx+RIYEhgSGBIYEhgU4CdbFx3mpt6QgV1YoUS0uu7SsOtUpbgYhlKkMvhaSyyVxfYZC8Ra2v8BbGXquAttSrH0AzBwBdvOYDqGVmyi/cZ8xOOZ16Kt/u7eIQ8I12PF0c1lDeVEoBhD+hHZ8nn/aJr3EOoZbJCi8B3ctLviX0Y9Egcqz80uCRAsnZE2aZZXkV2Yi8UQIDgP9CUL7B2rtgPlBZzbdje/mu+VSMP8C3P2S0t0lpt+X+D+AcP0nFiZM6jTJ8c6eN912an6QpCuXYe8ttoF0N4hZpzyE5dapAMxAHEoSZiWeKHFN0NDdb+jU3HrQcwTLshqaCK48t/fO4Ju4mJRVleQpy2dSr/ViTjvSQwJDAkMCQwB8mgUS8Ut3m4mOV101J9OtNVPHazoJELBem5GCiOU6HzNwMK3XH1zU6zbzALjWgzhodogjVM79Oczo1azjrudZ0cIJMVqby/X7nzZqdfTgacG3axCwlNnOyoRNwjptDgfQXfI3HZwaI+xOIJHpFf+i5ew/gjphDJQy+u4w2nBTICN8kgQHAXxGTHpF4y+Nm494jj7B/5hca73iuMo9Q9LLzTvBtgHza78JF4K7c4ZUkPJPc31uzzVtu+vGWF5PQiLOBQ0fIR8gDm5/sV51A0varPVIacY6t/mzXjS3fcutDuJZRjFGmd3ogIaiR+DlwXakvNwNy3I+kDSFnkhCCrmpfNOJDAkMCQwJDAn+oBOoC0o/fC4bXFS8cucbk2lipc12RYjeZAThRTmUh1MFHjLzdafvXWnO+akfZUVnAgLjT1RMawF7tWjHGej6jXJvtIvgkbyp5pD223j49UzbfLz34LuURAP6Il5W5/PuhlH8/TOXHAyB8LudpLmdMU18u5UmA/yJDVV4sPM5d9IxkQPE6oPj1XAt/yEXDyLoe//h+uwQGAP+FrOTQXrcmj4dvSN1z8bbaqge4jtOqEhATVp/dbHrEh6jsu2fZb7N58p6d0ALgdhOYABzzktNh9ptveDZJ4C2eC1vuOk3Uh7v1LWM5qfjh97xCXqQXeNe0y5LkEzViE2rLTf59X1ppjS2bbG8zrXolHZEhgSGBIYEhgSGBbQl0iwlAMTcRQgzYzQUs1iotMZvrDJmtwAqs5Od8vqvSqePb96tx6HOX8TW4p454Zw+CiXBv6KR2cyl4O5TpyN5mKvgYt814HPyDJ5W7cHN4N0sT/g1zlbu5/Pt+KmeZqwDEbTPukzh35TLjRcUf+OVGTsaqTxUiHYjO6YVhOa6Rer8EBgC/KTPfaHG75aOhW7F/rv2E80jNOs4WYOzTsaylPqK1xqxEpia8zdqN4OEwl29spjzO5b47IEc2XvLZjfbbrgf3e/v6TjBPyBu4Ql4K1MmYEfSGzaC6yUcpiHLWoLyNrKrzQxZtgjBNq0Wsb4dyv5gs+IlP0NZmXK92T/l+oYlml30ikyrQZdgIR2xIYEhgSGBI4I+WAAthaKu9vMQyRCIzvEItxFTXpPzFdWOR6YFmt5TWqixNWW3BfJVQhVYr11bpufXreKyfHV2jdkzmpOCKsNtGiUf3UA4KIO/mcuSo+b39jT8fSnk6cehPKd/Oc/n+fSr/wvd4eFI5P9mExQDcHlg4eRNb8dzMCa1P47SZCiDd4NtyzT4S5phWIx/JN0hgAPBXhZQPKHeZ34lNnk8kGyoufth1OhbabYNlXANiPgKgvr/blW93u3J3SjtvNNtT+QYI31/KPUfBH3fSdMsWHJvu4yy3g7glrJ+EqLkXQpNAPgokctKJCUgaAf+k1YbZ03fxStDyGrfgp0nt0k1y0DI98NfqEaOGJZZcTMVz3Cidp29NeK7ldFc2okMCQwJDAkMCQwIrCVTwVxeVXG8Iw/6TOt3S0lj0mZVBp+WNeh2bZd1IWQPWFWWFjmdVVHk9tsmHq/TmLO039qzr8SgFxqAKWFiq+K7JfYBxtOJHb7Tk8J6H56n89VLKo9wZov22ucr52W4NBcopi3J5XHnEExuAfS5nQP+Fw37APLsiG/jog/oa67l72fozYm+TwJcCcADYmy+Mfu3pbrZX+s+Fv8k379t4dno2XVGfvYr7kYa/8GuWxqYIWiZfGyRke40G2ke2S9sdmyqx2ZZ/bnkq8a7l+7vw5Y0DfjTfu6LPHbbc2kyJJxQfJY/rQVwW8Vef737Q68Gs0wlzyRe4zYFEWJmu8jeSS9Zi6Fmg0i4panb24fbVanySbVZepzN/hEMCQwJDAkMCQwKbElivRbForrNVdzNzk2vNzCpaPxNo19I3RJJBkHbJFm0x0HaPdmhW2LvzZiZOiQ048GfHgTwA56nswCOXUu4u6arQGm/5GMd7Cof76IAfwPlcHh5L+fkwl59H25JjrsKHkzxl8iIPKu47LwGgJcxW6BOqSJZ6cuuLUeCwOqIaifFHHYKtoo5qERU+W+T8hxMp72x2s/MN/7r4mujgV8Pk8nkhTekyREevupJ9EfC+3W6ScXUc727ITivd40k36Uu0lhMt9bRVaawuQO0autFF7ApsTcDkQ+Yl+OZmpzLmJPLTvSuAb+y17b1k1tHvHAUvIH6HFhz3QdZqV68lnIo17cqJN9s9h+IYfMs9ofx193LpXjWvhRKEtaCvKHOVRcYbbnVLL2v1fIn3Uu3Lkj5DvSP/4tHq6ueFSfZZlGGyHeGQwJDAkMCQwB8vgdtLQ5Zk+JqoVjSr5OZyKZo1YbSR69iqmGRdV6MsSTLc7uWi5gK/VPqOZGKvGa6HJ0xTpjIBxGefvvlyzAN/ig7uwcwE7ynaoAkAP5fy834uDw+zvaekm0NO3HwOExd8jXPoj0Jr258vtGO3hlKWh/OKCsSBL/QxBlqX+BBIZKu4YrIgsv7QZjeGHtb2M/asl5GappCXgZqRLbpOSyWcMaG+a50qXUUY1+KPdNJGmYLMU2ddgBycXQvF6gs14PGzRWrBo4OYSagLSEaRDliqS4bqeREqWYycKrqQgG+IOrdA5Odwa9iugDjks0Eim3clatA33mqjdhATAL73gG2OkeWtEsC9nwquAe8Ok4C3DslhUyU+udM/d3g2ObGh8hiabmm357Iv/qmHUE3VXccxWPe4T7QLflWm0QQtcY9hVWHJ65VUz81kfU4fp3SdvpW31eBG3Y2srZojb0hgSGBIYEhgSGApgfcuIDfob2SrrdfKlp1ZpNbV1ukF8SLxBsogUSBYZQXhDk8qCQdABuFrXBs48RMud4WzgPjD+aLTNh/u04VhM1XBbAWTFUxTpEHH13i4QiwAdHijBr/Mtk1HO05eQDxjnIZMBLXUWWNC+pl9T/jiIQX4Xtn755CCxfLFJAoNEZMyla9S00u6yMKtglcbFg3oV68AHGhHnBq7bjBLGNQUziZ23QThlS3nMX3hnyTj30w0oL7jGkoMSSB5URijrUNWJ3sKxeNLQkxStdmNKUB6zUkmQacgXgrooz4QU0Bdab3nctTmSTZT+kRKmZccAduTAHeeUKnDcnQoDnbdBt06Hv7U+eneh39PWVBfX5Ta1xpZD6oWvBL5SJ1X2KnoIzw/UudX/RjlQwJDAkMCQwJDAq9J4BPWnk9gsdXDL2LrpgJ8k8gNnHtwT+BLQjATIJHwWb/el/IkhxClPGJ+cme78McE3diMd15U5GP8DEi3icr5PJUzfsbRigPGw0PLS2Jd2mTQtW23v5RNdDIyr2QUFj8J4dZ1GQv8E7wvy51izMk3+Qg/RjXpXgX0zWrJI2suc2sq2+8yGhDfxnlfCMDzajMQpB7C6aWTEiCvjs0RfcdriMhq/fj5oWYGk7zQwchVY9AwC7KUjQRNl7TJEQ03XkzCnzY/4ezmOBLeR8ELTAO+T5iTlPLt5OPgAd64EpTpiQ7ICTMT7LrlvQRbbp9wiQZdbUgU2xck+zfCIYEhgSGBIYEhgSGBIYHfkYCxVHIwEBI+mr2fDVxS9jax3e/YpzaVe7yiAKRfJnlHwUylbtxMIH4Ok5WHSVpzNng+67CfMG+5UD9cJVoxLo247NPBa3nGirpm3Efvlv2lEKwUJSsc12B8FAiFU8fQt21wNR5NTqJWH1IurlNTicrJcNdUtEZtV91JNnUQXeXKvEW+DoAz3gDQ2ZwHTYcCLUs7zQBJpzs9U2ug4WaHnCqwBNj+ccO7c7NcVbmp+kF38ZW06oZK+eb2CZJsfNzhOpAbcTeX036WmckJkA3wvuMkqlK+f8OPdwPjAPTjHk25+WCyArhXyBC1acJ98c0f4+y655zxPSQwJDAkMCQwJDAkMCTwexLosYZQlPBGAKHQQurkbPa0YSd+YFMlSk78ghd9SNtlYdiLC4D7oJ+fD1P592kuP35aQ54mKQoB8c8G4+lbHJ7PE3xnb96s2A0lrMFQWoLkyAM1BQgMuKhCj8NQO+ICzuTAj29OAV+C70TU1OBj+On6bjNLDL4rRFOkpkSaEDb7mmFAWjNwK1m0CL8OgGtwXWeRgcaIUMg36O7Bd7XBUXnU5aKEbBRUlv1xqPUqanCLlxfL3oNWswGKZdc9y9MIPrnlhUTeSOyJhA2V9/up3APAZVJi7TcgHAD+7d7gO8uOeDFhE2Vs1Kw7l+sb2ULukaiD2SoceUMCQwJDAkMCQwJDAkMCny6BRB9SWBqcqY2AW7YVF7Say0lgepJ/8fNpLk9oxJ9K+Xmay7fTVH7c4TXFZisC3yq3lxWDcmvUn17wwjKX8/NcXiZAeHhRSUwoyGrMRz+yj2BAwbeQQh9PwSQ+7ENwWAJ686scG29lGaAanUIpCO82s4oY+1cD29N0+PqqX+6hq6715tnj8nU24ODOxJ7ZfzWLJlgFkWupGJwn2O6KJIqwycn6tfvatGijopBNvNLYTIVhw8qfcB8YLgN568NEBPtstNv+TA7DrvvboZTvx5004Ac2XsaBOmnbTYi7wAq846cSvUiokzG4Gq89X0ViwKvckRwSGBIYEhgSGBIYEhgS+KgEhI1UucNePeRoBEFFhrEL1inE8Po28es+mnI02PtSnmMP3F/3YQeuEzat9X4Kf+PYiNcTOGUzjt04HlYuAvHPl7ngQQVf42irEzcmdsxwMfboO+iuwWRT9NCSHI1Cut7YZJk24DJID4CfOt7QwLe24E7llmNni73w+nhHKsVvX5ZotOf1RQCc/iIIdtnyx7jy48GkuUlowSUlKhkwqxp9V34yCSLAeABvSER28UDlnB4QnFVUahpMQXAlmMBbR7zv56Jj39FmfyuOh1nJd0xNjlP5C+13+ObGPAUbKYf2isK4bG4SF5M2612Tg4gOMSB3NXou6VhI43tIYEhgSGBIYEhgSGBI4JMk0CEPY6VQSi5BZWCtmulamNDyJ+gYv+7P+BnfG9vNl6m83JXyjLkK9t4XvKJY6w3oFvA+F/sWf5zLT/kYL+XH41wOu7k8TEk/lydpwudyCb/idCX9iveiSIxM2HqXcfcWAGhgLg4uFLFrGGcSNw6Vhhx+yXONuatc+p5YLgFSFxTZR4G9xHsB+JccvgiA9414mM5Zx9XBIF73M0QVpZHihmB0gWvDaWAM3rbfFEGifQXaSDnZfWBoqtFY48kkvZkAwL994zOV+zArUd4JAI4GHDvw4Ck77gDc0c5C8nXgMZoE4roiyxFV0hEZEhgSGBIYEhgSGBIYEvgCCYA8En0EdAo9YOCULBVI7JSEAbfokigBVfEHtMFOXLzDQkEgPPyFA8RlkgIAx7f4QzEAx03zYyk/HpxvH+QG7XhOYdMm4cuFg4QcCuepvWw9++20ux15iyIrdG3mbAlgnUCvU9UbFCmBbCBGbBjfMqvxtDAmMhA3cGkA7Aa+XSutIVL+jZdjX2oDXjvTCUUXjLZXPYJE9EGbxY2emAv1HScyYdSfdanPmxUaakJ28ybYxlwEf90Z3h2x7ebAnLDlxk83B+dgZnKKepioHHzKZW1DcnM/1mNYC9cDilw2lKpC1A0+feqq/sgYEhgSGBIYEhgSGBIYEvigBMCGqQtsKKoxEwhdABESW5TUaYSJ74xsLgJw8vJ24HwTvMhNUl6CufAWx965x29T+XmeysN5V10Y4j0lvaw4xIwFO/OLQnliETBfQueGDd3bmk4sGTA7hyKFPi8LELbtmRJEgnyV6MWiG38bcgfdjVexuriWn1iar9paiK0VYtqzSH1SQv3tOk00L5b7s36zQKtszTZB9llhJKghPtFHCfEyyfE7LgMpk+vAPf63Z51KyUmU3+52xaFdB3IipX12O+TmEEjHiwkbKfc+Lh5TFe8ORrPuV0EPKe/mtDO/JTRT5/2qYXSDI51vX7c4jPwhgSGBIYEhgSGBIYEhgY9IAJyhT+CqQCWVFenU5FpTnBQZVtKIOD/xXKI1Q2Of6L3f7cqMF7n9XC5HXBOW8nw36SRNfIWfn3bl8bmUx2fiPujn4cmmKg+PgPO5PDxeyuP5pTw+XsrD006bNbEVtyGxB+WxuT+LMZIlM2V32RTEU40Odcu19tp5BuIZX5KphuRoM2dh0iYIccwXHbWsTqXaNSw3QooZfAkAT+Y5xAwzX/1aZV7iqHcER3n7kkh0ShFj5VeQFAQJ3u60ERI77X0ckhN+ueWt5G4u3+W5BDBeCrbd+O2WCcoB14H+wCNPupS/bhrRR73JrqtjgvshaUprfzoqZzpDHOJC+eeSRljrt6wRGxIYEhgSGBIYEhgSGBL4BAkkCEy4bJbCLUSlU0Qd2IHENey56oVrB1pTacWi8IuTw2Fz5FAemZNgUjLJvzg+xp9eJgFxXByyWbOaqWCegs34w1wejnM5Pl7K/rAruzNKTyMmAqwf2LzJXkMwmU7ddE/k6MPuqD0QyumxJeHBmFO1HulGaMpAdg3KVYFZjknl1qnezKOTmVp3F5zV8SDjywC4OhfmIW0ECWp1xdUhCQTiuGiiDQfxgHAuatwa4eLPNt25GdLgGw8lNjm5C48muAcEcAO2v53mODynge/jLoB3HL5T3Qd2AhLQFuTPS9WJtdJ1l1R5Ke0gSOCdVQnJC7OhyqYvH/EhgSGBIYEhgSGBIYEhgd+SANsaE54ahJpdg86ZmyBV5Wtg0qWNcBrucRH+tvnjOzm6JZxUAKN0Lgp4a+dDCgHmJ2nIOUXTWO072u/7uTw+2kb8gY2b56n8OO+kCc+TNl9wZ/gcfsbla3wWuH+mc4k7A5jTCwC7+01nvF+Q8eLQQ+X0uYduvEHokEaXx+CCVoH4mZs5OLfhO9KSBETBptJE5MsAeBVC16K0v5muNtFkGGm7PEw+QohcVrTemKjg7u+wc5gH4yTgxm77iOY7PrI7Ck24fHXrmFVsvA28AdwC3SGblJEBP32yaA3CHc+u68JwRSXUvGoRGlt3Ek/OuuyVBXVVveWM2JDAkMCQwJDAkMCQwJDAJ0kAXAIIf1lgEnLZIGjUspNOEEQSKOYXbRt89xDcCCmAt5g0EC5MFeiWOhz4w2mYQCi01zrw5zKVxztMUqwNTw8qbOT8+TSVH0+2Gz8/pQ/yAOmPpTxOBuJnkORzw1lsEuWP7vjjXsZghSmFswN8BxYP5McLw5I+ZRO5QvXkQeay9gpTaXpJkrn6+zoATkPZY+Id4Mzs1nHdDRoIebsZwD0rxOckxvyHCZuiZjIizyX3szyYGIxPOqmSuPx1Y9st+27bg59k202cDQI2ZZE5C53hTlj1V9l0OjTVJuhuUQkzR9LCjCX97XDjatwmHiVDAkMCQwJDAkMCQwJDAm+WgFEGsNeIxmq/BhQz3ee8jXnyAyLRigE3uRV6W4ksdsKyxBa4yRCROgBxHfZz9IE9AHH7Et+Vh+fJH8D5eSrnR07hLOXHz1J+Hkr5uZvL4/NUjpRP5gW/+gnXhmmikorgS3i1491ArqRDp0p/3M9uLCEUlcWXAvKlP0bCljburgGzpBp9MFgFXwvAo3Nqk55Ej+vFUD+j04Bi7ZzFlnuWs/fD5KPdAc8njoXXRkl7KPkO+L6/FEI8mZzupnJ32pXD0cb/HJwjPvq5I1wR4sPbv4bUdz3dmCmp+htEXgAK8qeVlJz76yuUl6CFZlV/74hKLq/jDoFwicwteWYbIxwSGBIYEhgSGBIYEhgS+F0JYEUAxkicgWIx04FCrAp+HTGqemAZgTnDeiqRaxBvTauhVKd1zSEk+s20MJBxEIrWsuc4nlL2ZVdOu6nccSL5y1TOF4C5gfeZA33QjN+V8hMQfjeVBzTkAdCf5M5wkjtDuTaUj/KmaZf2PWRBvz2shtksJX/XbkaEXEuAjJZC297wXaurWNWQr7l9oQ04vezxrCzks18xglTxE+61CRPzEoNudtDif5tDcO5lPuINloBwXAUCvL/fAcBfyt1pL/DNMfG7OCwHOyO91QSwpw3SyksRSvPNzUNnEU6+w6RwnaebNaTrH2lyIA7zhxvxSbc02YZC6OICZ9W88HEjXF+akTMkMCQwJDAkMCQwJDAk8DEJGNoCOoC1wJAEIITto9zAZWkQkFBTIBUCKUxNBNZRnQDfONGAn4G+DL5DyZno09S2Noh4B2FljQA+w8R4KgLfl4N9gcMbM5Xn2SYqclUYvsV/3E3avPlwnspPPKmcu42dYSOOfTkbPQHmk4B8WDYwJGBZHXCC8NY/BgmOXbyfSI4WJwUztuKZF1UVRNySSWlGvQi+XgMeHWtvB4F1ZddtOxvAsnx3Hwy+ZbN9MOD+FpsoCe2j2/nf72ZtriSU28Gw/aYdfeJ+033hr+4NJYWOaNoN5TvMkrFAQ4LcKCnFuO1SjKaIb+yaxM88+5utjl98KrNkM8IhgSGBIYEhgSGBIYEhgU+VQAXhFXzDXpA3IHDXXILRDBsEqlgJnNRnG/WQRwwIbnxzhXLIyJqKO5m8CMGCoslQ4JfTzy8FIK6TNjneHlx4nMq301Qe7uOwH/yLA8K7D95VpBlHO/5sIA4Wk1cWeVEJScz0HCOVUKcKy1ly6nLKLjtLZsrIBJ0Q3x79OgCujlrKFRQzvNRCh/tAuf7jdMq02eZgHH0A2KV6L8GjCQfr4KubY+Sx5b477KQlPxx28t9Nk+y0FdiVcGjflj/ujt/MdIl7+UleRu7cQtD6Oy5AyjNvmkiLZ5bVvNSH56uTx7wgy4tJS1tMFsQjMSQwJDAkMCQwJDAkMCTwXgmkBjo1kgE4VlimcQXzAHgbMMmYwo16wnTBAPi9QE1Jvw6TaWt4iYUop07QwZMR2EzF2TjmYF8gnu7Oz5O03Gi6DcBnhT/zJE42a0pDbi25fJPHqZ0A6QlEPl+kDb9c7NJQ2m06ILyWHlO60RloxggalsuhLnSxUG2M+QsBuLtBm7pAAbwB3JiBEOKLGwES3uMy8M6+ur9xPPw9ZiaZb5eCPuHSLmzYSHmYdvro9KWdTUwsDeBzmtxbsIHKQwrqlbJaL/NOSADd5LUwpUmydSjh8kXbSritjK7pa/qXBJVyRIYEhgSGBIYEhgSGBIYE3iQBwKNAzhbOiLyKGBMkBoJZVIEoMwhbJfARmIkjl3YAAAqvSURBVI4/1+TbBxWKKkkjTC6V3a2BJE+ZiZgzzjgwM8YjHsrYy2mSNru39X54Mvh+YKOm/IkT4md8Kj8fS/mxtykLmzyfUNHiS3x3KfPlpbywc5PRvYC7kR1bKoH+dAYFrkdJ6O7xnQNsA6n63ywycSOI2JcBcLWnEyo5UZJNkN4Iif9tfHcDvLHv5jh4H1MaB+XcT/JsAgj//q3IswngHPeCOukS7yjIYZ7kJYVQf4sB5qh15SwgshY01CLDmbphQiiNNG/e5HfFIGrENVDxKzRJ3bNrjWXpCIcEhgSGBIYEhgSGBIYEPkECgWO2oElikXUrV7SrjKin3K7IMNnMyK5WGl07QDadLr5os2OyyAei4aPbQEnK3ED7R+iimjyeFG+0RNPtzyzg/YMDGB9K+XGay4+Hqdwf8KZSijdzxkmdL3N5vszlmVDOxLEXt/NGjwEQ3ozB+96mzYS6nXg0xqsgtxh2/c0hfg0AlxnIRULGE8kJU5HDJKfrgG1+MlBInANzSGN2EmWn0yzgDTg/hN9u3ngkfGSujY7xhpIjybcQvZmkeKLSHD+/6G0wyxx6IyiizV2slpzbaD7JrUFf1nXTmVc7okjIf5mZqfr21G6gLBrhkMCQwJDAkMCQwJDAkMDvSwBzErgEIqnYo4HyBVYJOLONauDTEVARUBbsM5ppQvKMnbMVh94rJ8og71t0PMG8anTFXbTuzSMP2wW83KHknQ6z3E1jKXG3L+WvtBXngJ+/AN9FPsfPTxx1j9nKTps4nW8vKzZT8cmdjGE5Avc98ySXlqiF9Gud3Ub9RV5QJAxA+P6l7LHXvsOEBA33VP71rZS/0G7zVqINllP5hmcTtOFh3304zOVwsKmJvJmE2Qod74VPOl84+kFBJWDtV5fYxhq1qzQaJ8X4qmW+mM5g62y2nD9FQEimK+kNSDRdLzpeyq12LCZMDl2NER0SGBIYEhgSGBIYEhgS+BQJCB+Bg3D/EeipQpM1ZskW84f/MCjJbPBRAmeBY9U3N6UVJXPJWCBcTCCIT+Ah1ybXdVKbDD/KMqS6hhEcqJ58zcrnxlDnuEsgPpe7/VReOG0T7ydhJ84Jmhzo40N95vJ/j3P5/x53+vx8mAunb6I4Rks+PXHUPadsqgf2mKJON1PlKp+M5KBcZSWNJHL42xpwhCCRh8xJ26vJLPDNEfGYkvz1rZR/fZvK//O9+PPNmm+BcDZgYpYSLgjNI7TPy/76bSp+CaDl+nanQUuPHdefjtU7yVxSMBkm7/pWSAEDMYFFTJyrHT9BqE4MNm6RZLMI881vkUki+pg30lX5yBgSGBIYEhgSGBIYEhgS+F0JgF2AzYlp1vyMZVyaND2+afQJklsOsW3aJY2xnPsQeCr6A13mZJ1sB859mV8mOoQWILzvBZhNFiqowqO+w0kgWlpt/ILLRSFeVeby/z5M5fRzKoefu3p440/OotnPZb/HkqPINOUymwcvAnhkwfe3JNZpx91q953iybArIsqpoPqr5ZlBri6cy1MoyqYojnLX8fAYxQOgY1PlMQ/MOe7K3Wmu2m/ZdaP9ZpMldt3hapCQnwqwE69eTOqFdfv1O65Kvhm53yBoo3L61W6KiDKmOsBVfEEezEVCfEvjTX4yc8h3L7bsq/pS206qrNu4JP0IhwSGBIYEhgSGBIYEhgQ+QwINJ4UZrpg2DJIoxFAy8x1mKvsBnrEWel0CxVZerVlbNU6CtsWSKnnQZ+LJ0dQxEtmDu7ksd/3AgLWWgVcbfzj/2Bu7AtLBm+BWwCz+x8GhD6dit4aPU2ETJ37FCbEpbxr0uTy9TALvLy+TT9zE10cMpFplCJNmrtuBhH2L6vtcykHHcfolqQolWWVVGCL4OqQYOZpuPJjgt1u23PJkYnB9f9rJTze23TqpEjOT8NVNiNvB3IyZnlEQihy5SyNNp9qlUSxHpvy02U6adgHW1a74ZJU+rJXywpPBiFMKSZAhlVu8xXqmaxOZ5L2kGakhgSGBIYEhgSGBIYEhgc+VgDFH+939FvclBL+mMsKxgnNdegv9XNNlbxI7GVNmas2npaN1MyQRFRsFRb3ZQSuhTZFz3kx4bAF8X/DANxuEA77/dSrl8d624XJZKLeF9i2OO0M8qPzEqwqgnPBxKmcOCbqEx5cOKlZtv+xjqsmG+qgNpQHCpQFv4+kGkP0XgwS7DvX2MNmTCRsqMSPBrlv23d9L+dd9KX/d4UYQEA7Qxn/3ZLtubLvjAx+5EIy2ssl22VY5JBOEeyiNVLEV/aq0w8vrklU6+WS4Kn5H8vc5vKOxQTokMCQwJDAkMCQwJDAkUCXwNsXf12KVnnuLt1jt7NsitypuvyEI+qnKop4TmD+/HEu5YJbCqZkvDh+f28E+uDH8v5+l/PvB4f+x0TNsJLApBybjPAUMDkSlTIY/s4zHmxpXIB2c7ToH3g0M3J3p0dvp+U4u/1DP+6TKPDTHmutwH8hmyvzguxvbbjZcyrPJrtyxG3VvF4T48YYHBu4C36npDpHnCwTJhZxU7pz6M8gNQQerEQwJDAkMCQwJDAkMCQwJDAkMCdyWQLi2xiAbk2pcqexeprILRfHphAc/W21gOg3eRcH845u14hz+c5aJStFmTzZsYmuOZhwTFXyLX0K3XQE6p3Fylo1PisTZeP7Z5yL4llOH0uH56ehOyIzkONvsBO23PJyE2cm97b3RimOaguvB494AnlOL4GlQj9mNrcrtDzJab52ou2LtJjDheAPh2dsRDgkMCQwJDAkMCQwJDAkMCQwJvFcC0uXuLsKmbPvbYZbCfsYLmvFJmm0wLUrlh7tSfmLtce/DffCYIp/jYSdOvLk4LOU8T+Vpxj/5VF46pbE8Y2MDjj2KdeABbtE+Y5QOOsfGm6M+8dUdrgN5A/Bn9jHxuaFSh+Vg75323QbvaLzh3ENoW+QgJr0PRGiVvYWXP5nYtsb9Tg7vFe+gHxIYEhgSGBIYEhgSGBIYEhgSWElA59aQZ/eFiYSFTjErAUSfSnm66+zD77EFZ5Mmn9mbNXXaJiduohmfygMKZ0xN0IjDFCDeNY2pygEtd5qDyDxk4uTKtrmSDZYAbtwIfueUygDgHBt/f5rDbUsp9nyCJxTct8ATR+g+xJM2Ez47TFV3hu6VfXf3lGjNM931fESHBIYEhgSGBIYEhgSGBIYEhgR+QwLepAkWbYpf2GUKA28wMaYpKI+rcjoOkTw/T1ULbvBtEI52nDQH/Ty+TOUR2/LLVC4vpVwwS7mwARQzk713gnI8vF0JztJko3Lng9vAv75PBuHydDKV+ztOuKQenbPtjA/NweTEfh+ncsn9pxWAe2BraXWwXIA7h57gO0PXs6jWPEZ6SGBIYEhgSGBIYEhgSGBIYEjgPRJIzEkd4uE5JZXHOlgSs2z7B0cxbVtvn5SpzZtPk7Xf0oCHJjzjT6X8eJrK47N9kL9owycHTu4mmZnInSBHwGPfLd/dYWwO+P4WJ1h+NxjHzAQN+HEfdtzZycV407TFJzD1w1uQVWieFIDtBNwZthqpMx8gvMlkxIYEhgSGBIYEhgSGBIYEhgQ+IoHEmg2HOgekaWsOFM3yY9ixv2BWwmbL2eYp2IfjrvDhoZQfgO8I//1YyvERu/GpPLFhczeX3VMp/z8Vn0LDn1xmXQAAAABJRU5ErkJggg\x3d\x3d); background-position: center; background-size: cover; overflow: hidden; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; }\n.",[1],"logo_img{ width: ",[0,244],"; height: ",[0,154],"; text-align: center; }\n.",[1],"logo_img wx-image{ width: ",[0,162],"; height: ",[0,154],"; }\n.",[1],"logo_text{ width: ",[0,244],"; height: ",[0,74],"; text-align: center; color: #fff; }\n.",[1],"form_box{ width: 100%; height: 100%; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; }\n.",[1],"form_box wx-input{ margin-top: ",[0,25],"; }\n.",[1],"input_box{ width: ",[0,600],"; margin-top: ",[0,30],"; }\n.",[1],"text{ border-bottom:#ced9ff solid ",[0,3],"; }\n.",[1],"place-holder{ font-size: ",[0,32],"; color: #C6C6C6; }\n.",[1],"text_login{ width: 100%; height: ",[0,48],"; color: #c6c6c6; font-size: ",[0,32],"; text-align: right; }\n.",[1],"form_btn{ margin-top: ",[0,50],"; }\n.",[1],"login_bin{ height: ",[0,86],"; border-radius: ",[0,86],"; background-color: #7498ff; color: #fff; font-size: ",[0,28],"; line-height: ",[0,86],"; }\n.",[1],"other_login_btn{ height: ",[0,86],"; border-radius: ",[0,86],"; color: #7498ff; font-size: ",[0,28],"; border: #7498ff ",[0,2]," solid; line-height: ",[0,86],"; }\n.",[1],"wx_logo{ margin-top: ",[0,40],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; }\n.",[1],"wx_logo wx-image{ width: ",[0,108],"; height: ",[0,108],"; }\n",],undefined,{path:"./pages/login/login.wxss"});    
__wxAppCode__['pages/login/login.wxml']=$gwx('./pages/login/login.wxml');

__wxAppCode__['pages/task/task.wxss']=undefined;    
__wxAppCode__['pages/task/task.wxml']=$gwx('./pages/task/task.wxml');

__wxAppCode__['pages/vip/vip.wxss']=undefined;    
__wxAppCode__['pages/vip/vip.wxml']=$gwx('./pages/vip/vip.wxml');

;var __pageFrameEndTime__ = Date.now();
(function() {
        window.UniLaunchWebviewReady = function(isWebviewReady){
          // !isWebviewReady && console.log('launchWebview fallback ready')
          plus.webview.postMessageToUniNView({type: 'UniWebviewReady-' + plus.webview.currentWebview().id}, '__uniapp__service');
        }
        UniLaunchWebviewReady(true);
})();
