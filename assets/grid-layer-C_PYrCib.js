import{T as e,h as t,k as n,n as r,p as i,s as a}from"./app-BAsgGhKa.js";import{a as o,r as s,t as c}from"./base-map-BiBGUm3D.js";import{a as l,c as u,i as d,l as f,n as p,o as m,r as h,s as g,t as _}from"./lib-D1PVQq-N.js";var v=n(o()),y=n(f()),b=`
#ifdef GL_ES
precision highp int;
precision highp float;
#endif

uniform sampler2D u_sampler;
uniform float u_opacity;
varying vec2 v_uv;

void main() {
  vec4 color = texture2D(u_sampler, v_uv);
  gl_FragColor = color * u_opacity;
}
`,x=`
uniform mat4 u_matrix;
uniform float u_alt;
attribute vec2 a_pos;
attribute vec2 a_uv;
varying vec2 v_uv;

const float PI = 3.1415926536;
const float earthRadius = 6371008.8;
const float earthCircumference = 2.0 * PI * earthRadius; // meters

float circumferenceAtLatitude(float latitude) {
  return earthCircumference * cos(latitude * PI / 180.0);
}

float mercatorXfromLng(float lng) {
  return (180.0 + lng) / 360.0;
}

float mercatorYfromLat(float lat) {
  return (180.0 - (180.0 / PI * log(tan(PI / 4.0 + lat * PI / 360.0)))) / 360.0;
}

float mercatorZfromAltitude(float altitude, float lat) {
  return altitude / circumferenceAtLatitude(lat);
}

vec2 mercatorfromLngLat(vec2 lnglat) {
  return vec2(mercatorXfromLng(lnglat.x), mercatorYfromLat(lnglat.y));
}

void main() {
  gl_Position = u_matrix * vec4(a_pos, mercatorZfromAltitude(u_alt, a_pos.y), 1.0);
  v_uv = a_uv;
}
`,S=`
#ifdef GL_ES
precision highp int;
precision mediump float;
#endif

void main() {
  gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
}
`,C=`
uniform mat4 u_matrix;
uniform float u_alt;
attribute vec2 a_pos;

const float PI = 3.1415926536;
const float earthRadius = 6371008.8;
const float earthCircumference = 2.0 * PI * earthRadius; // meters

float circumferenceAtLatitude(float latitude) {
  return earthCircumference * cos(latitude * PI / 180.0);
}

float mercatorXfromLng(float lng) {
  return (180.0 + lng) / 360.0;
}

float mercatorYfromLat(float lat) {
  return (180.0 - (180.0 / PI * log(tan(PI / 4.0 + lat * PI / 360.0)))) / 360.0;
}

float mercatorZfromAltitude(float altitude, float lat) {
  return altitude / circumferenceAtLatitude(lat);
}

vec3 mercatorfromLngLat(vec2 lnglat, float alt) {
  return vec3(mercatorXfromLng(lnglat.x), mercatorYfromLat(lnglat.y), mercatorZfromAltitude(alt, lnglat.y));
}

void main() {
  vec3 mercator = mercatorfromLngLat(a_pos, 0.0);
  gl_Position = u_matrix * vec4(mercator, 1.0);
  // gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);
}
`,w=e((e=>{var t={transparent:[0,0,0,0],aliceblue:[240,248,255,1],antiquewhite:[250,235,215,1],aqua:[0,255,255,1],aquamarine:[127,255,212,1],azure:[240,255,255,1],beige:[245,245,220,1],bisque:[255,228,196,1],black:[0,0,0,1],blanchedalmond:[255,235,205,1],blue:[0,0,255,1],blueviolet:[138,43,226,1],brown:[165,42,42,1],burlywood:[222,184,135,1],cadetblue:[95,158,160,1],chartreuse:[127,255,0,1],chocolate:[210,105,30,1],coral:[255,127,80,1],cornflowerblue:[100,149,237,1],cornsilk:[255,248,220,1],crimson:[220,20,60,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgoldenrod:[184,134,11,1],darkgray:[169,169,169,1],darkgreen:[0,100,0,1],darkgrey:[169,169,169,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkseagreen:[143,188,143,1],darkslateblue:[72,61,139,1],darkslategray:[47,79,79,1],darkslategrey:[47,79,79,1],darkturquoise:[0,206,209,1],darkviolet:[148,0,211,1],deeppink:[255,20,147,1],deepskyblue:[0,191,255,1],dimgray:[105,105,105,1],dimgrey:[105,105,105,1],dodgerblue:[30,144,255,1],firebrick:[178,34,34,1],floralwhite:[255,250,240,1],forestgreen:[34,139,34,1],fuchsia:[255,0,255,1],gainsboro:[220,220,220,1],ghostwhite:[248,248,255,1],gold:[255,215,0,1],goldenrod:[218,165,32,1],gray:[128,128,128,1],green:[0,128,0,1],greenyellow:[173,255,47,1],grey:[128,128,128,1],honeydew:[240,255,240,1],hotpink:[255,105,180,1],indianred:[205,92,92,1],indigo:[75,0,130,1],ivory:[255,255,240,1],khaki:[240,230,140,1],lavender:[230,230,250,1],lavenderblush:[255,240,245,1],lawngreen:[124,252,0,1],lemonchiffon:[255,250,205,1],lightblue:[173,216,230,1],lightcoral:[240,128,128,1],lightcyan:[224,255,255,1],lightgoldenrodyellow:[250,250,210,1],lightgray:[211,211,211,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightsalmon:[255,160,122,1],lightseagreen:[32,178,170,1],lightskyblue:[135,206,250,1],lightslategray:[119,136,153,1],lightslategrey:[119,136,153,1],lightsteelblue:[176,196,222,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],limegreen:[50,205,50,1],linen:[250,240,230,1],magenta:[255,0,255,1],maroon:[128,0,0,1],mediumaquamarine:[102,205,170,1],mediumblue:[0,0,205,1],mediumorchid:[186,85,211,1],mediumpurple:[147,112,219,1],mediumseagreen:[60,179,113,1],mediumslateblue:[123,104,238,1],mediumspringgreen:[0,250,154,1],mediumturquoise:[72,209,204,1],mediumvioletred:[199,21,133,1],midnightblue:[25,25,112,1],mintcream:[245,255,250,1],mistyrose:[255,228,225,1],moccasin:[255,228,181,1],navajowhite:[255,222,173,1],navy:[0,0,128,1],oldlace:[253,245,230,1],olive:[128,128,0,1],olivedrab:[107,142,35,1],orange:[255,165,0,1],orangered:[255,69,0,1],orchid:[218,112,214,1],palegoldenrod:[238,232,170,1],palegreen:[152,251,152,1],paleturquoise:[175,238,238,1],palevioletred:[219,112,147,1],papayawhip:[255,239,213,1],peachpuff:[255,218,185,1],peru:[205,133,63,1],pink:[255,192,203,1],plum:[221,160,221,1],powderblue:[176,224,230,1],purple:[128,0,128,1],rebeccapurple:[102,51,153,1],red:[255,0,0,1],rosybrown:[188,143,143,1],royalblue:[65,105,225,1],saddlebrown:[139,69,19,1],salmon:[250,128,114,1],sandybrown:[244,164,96,1],seagreen:[46,139,87,1],seashell:[255,245,238,1],sienna:[160,82,45,1],silver:[192,192,192,1],skyblue:[135,206,235,1],slateblue:[106,90,205,1],slategray:[112,128,144,1],slategrey:[112,128,144,1],snow:[255,250,250,1],springgreen:[0,255,127,1],steelblue:[70,130,180,1],tan:[210,180,140,1],teal:[0,128,128,1],thistle:[216,191,216,1],tomato:[255,99,71,1],turquoise:[64,224,208,1],violet:[238,130,238,1],wheat:[245,222,179,1],white:[255,255,255,1],whitesmoke:[245,245,245,1],yellow:[255,255,0,1],yellowgreen:[154,205,50,1]};function n(e){return e=Math.round(e),e<0?0:e>255?255:e}function r(e){return e<0?0:e>1?1:e}function i(e){return e[e.length-1]===`%`?n(parseFloat(e)/100*255):n(parseInt(e))}function a(e){return e[e.length-1]===`%`?r(parseFloat(e)/100):r(parseFloat(e))}function o(e,t,n){return n<0?n+=1:n>1&&--n,n*6<1?e+(t-e)*n*6:n*2<1?t:n*3<2?e+(t-e)*(2/3-n)*6:e}function s(e){var r=e.replace(/ /g,``).toLowerCase();if(r in t)return t[r].slice();if(r[0]===`#`){if(r.length===4){var s=parseInt(r.substr(1),16);return s>=0&&s<=4095?[(s&3840)>>4|(s&3840)>>8,s&240|(s&240)>>4,s&15|(s&15)<<4,1]:null}else if(r.length===7){var s=parseInt(r.substr(1),16);return s>=0&&s<=16777215?[(s&16711680)>>16,(s&65280)>>8,s&255,1]:null}return null}var c=r.indexOf(`(`),l=r.indexOf(`)`);if(c!==-1&&l+1===r.length){var u=r.substr(0,c),d=r.substr(c+1,l-(c+1)).split(`,`),f=1;switch(u){case`rgba`:if(d.length!==4)return null;f=a(d.pop());case`rgb`:return d.length===3?[i(d[0]),i(d[1]),i(d[2]),f]:null;case`hsla`:if(d.length!==4)return null;f=a(d.pop());case`hsl`:if(d.length!==3)return null;var p=(parseFloat(d[0])%360+360)%360/360,m=a(d[1]),h=a(d[2]),g=h<=.5?h*(m+1):h+m-h*m,_=h*2-g;return[n(o(_,g,p+1/3)*255),n(o(_,g,p)*255),n(o(_,g,p-1/3)*255),f];default:return null}}return null}try{e.parseCSSColor=s}catch{}}))(),T;(function(e){e[e.INCLUDE_MIN_AND_MAX=0]=`INCLUDE_MIN_AND_MAX`,e[e.INCLUDE_MAX=1]=`INCLUDE_MAX`,e[e.INCLUDE_MIN=2]=`INCLUDE_MIN`,e[e.EXCLUSIVE=3]=`EXCLUSIVE`})(T||={});var E=function(){function e(e,t,n){this.min=e,this.max=t,this.color=n}return e.prototype.contains=function(e,t){return(e>this.min||!isNaN(this.min)&&e==this.min&&(t==T.INCLUDE_MIN_AND_MAX||t==T.INCLUDE_MIN)||isNaN(this.min))&&(e<this.max||!isNaN(this.max)&&e==this.max&&(t==T.INCLUDE_MIN_AND_MAX||t==T.INCLUDE_MAX)||isNaN(this.max))},e}(),D=function(){function e(e,t){this.colors=e,this.domains=t,this.min=t[0],this.max=t[t.length-1]}return e.prototype.pick=function(e){var t=this,n=t.domains,r=t.colors;if(e<this.min||e>this.max)return[0,0,0,0];if(n.indexOf(e)>-1)return r[n.indexOf(e)];for(var i=n[0],a=n[0],o=r[0],s=r[0],c=1,l=n.length;c<l;c++)if(e<n[c]){i=n[c-1],a=n[c],o=r[c-1],s=r[c];break}var u=(e-i)/(a-i),d=1-u;return[Math.round(s[0]*u+o[0]*d),Math.round(s[1]*u+o[1]*d),Math.round(s[2]*u+o[2]*d),s[3]*u+o[3]*d]},e}(),O=function(){function e(e){var t=e.type,n=e.values,r=e.colors;this.type=t,this.values=n,this.colors=r.map(function(e){return k(e)}),this.boundsType=e.boundsType??T.INCLUDE_MAX,t===`classified`?this.classifiedColors=this.colors.map(function(e,t){return new E(n[t],n[t+1],e)}):t===`stretched`&&(this.stretchedColor=new D(this.colors,this.values))}return e.prototype.pick=function(e){var t=this,n=t.type,r=t.values,i=t.colors,a=[0,0,0,0];if(n===`unique`)r.indexOf(e)>-1&&(a=i[r.indexOf(e)]);else if(n===`classified`){for(var o=0,s=i.length;o<s;o++)if(this.classifiedColors[o].contains(e,this.boundsType)){a=this.classifiedColors[o].color;break}}else n===`stretched`&&(a=this.stretchedColor.pick(e));return a},e}();function k(e){if(typeof e==`string`){var t=(0,w.parseCSSColor)(e);if(t)return t;throw Error(`Invalide color: "${e}"`)}return e}function A(e){var t=e.type,n=e.values,r=e.colors;if(t===`classified`){if(n.length-1===r.length)return!0;throw Error(`The length of colors must be less than the length of values by 1 when the type of ColorOptions is classified.`)}else if(n.length===r.length)return!0;else throw Error(`The length of colors must be equal to the length of values.`)}function j(e,t,n){for(var r=t.ncols,i=t.nrows,a=t.nodata_value,o=a===void 0?-9999:a,s=[],c=new O(n),l=0;l<i;l++)for(var u=0;u<r;u++){var d=e[i-1-l][u],f=d==o?[0,0,0,0]:c.pick(d);s.push(f[0],f[1],f[2],f[3]*255)}return s}function M(e,t){var n=[-20037508.342789244,20037508.342789244],r=[t[0],t[3],t[1],t[2]],i=_(e,`EPSG:3857`).forward;function a(e){var t=i(e);return[Math.abs((t[0]-n[0])/(20037508.342789244*2)),Math.abs((t[1]-n[1])/(20037508.342789244*2))]}var o=1e-11,s=new p(a,r,[[0,0],[0,1],[1,0],[1,1]],[[0,1,3],[0,3,2]]);s.lowerEpsilon(o);var c=s.output();return{pos:c.projected.flat(),uv:c.uv.flat(),trigs:c.trigs.flat()}}var N=function(){function e(e,t){if(this.type=`custom`,this.renderingMode=`2d`,this.stencilChecked=!0,this.id=e,this.loaded=!1,this.data=t.data,this.opacity=t.opacity??1,this.maskProperty=Object.assign({type:`in`},t.mask),A(t.colorOption)&&(this.colorOption=t.colorOption),this.resampling=t.resampling??(this.colorOption.type===`stretched`?`linear`:`nearest`),this.stencilChecked=u(v.default.version,`>=2.7.0`),this.maskProperty.data&&!this.stencilChecked)throw Error(`如果需要遮罩（掩膜），mapbox-gl 版本必须：>=2.7.0`);var n=t.data.metadata,r=n.xll,i=n.yll,a=n.cellsize,o=n.lltype,s=n.ncols,c=n.nrows,l=n.projection,d=o===`corner`?r:r-a/2,f=d+a*s,p=o===`corner`?i:i-a/2,m=p+a*c;this.arrugado=M(l??`EPSG:4326`,[[d,m],[f,m],[f,p],[d,p]])}return e.prototype.onAdd=function(e,t){if(this.map=e,this.gl=t,this.programInfo=d(t,[x,b]),this.loadTexture(e,t),this.bufferInfo=h(t,{a_pos:{numComponents:2,data:this.arrugado.pos},a_uv:{numComponents:2,data:this.arrugado.uv},indices:this.arrugado.trigs}),this.maskProperty.data){var n=this.maskProperty.data;n&&(this.maskProgramInfo=d(t,[C,S]),this.maskBufferInfo=this.getMaskBufferInfo(t,n))}},e.prototype.onRemove=function(e,t){this.programInfo&&t.deleteProgram(this.programInfo.program),this.maskProgramInfo&&t.deleteProgram(this.maskProgramInfo.program),this.texture&&t.deleteTexture(this.texture)},e.prototype.render=function(e,t){if(this.stencilChecked&&this.map.painter.resetStencilClippingMasks(),this.loaded&&this.programInfo&&this.bufferInfo){if(e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),this.maskProgramInfo&&this.maskBufferInfo){e.useProgram(this.maskProgramInfo.program),e.enable(e.STENCIL_TEST),e.stencilFunc(e.ALWAYS,1,255),e.stencilOp(e.REPLACE,e.REPLACE,e.REPLACE),e.stencilMask(255),e.clear(e.STENCIL_BUFFER_BIT),g(this.maskProgramInfo,{u_matrix:t}),m(e,this.maskProgramInfo,this.maskBufferInfo);var n=e.UNSIGNED_SHORT;this.maskBufferInfo.numElements/3>65535&&(e.getExtension(`OES_element_index_uint`),n=e.UNSIGNED_INT),e.drawElements(e.TRIANGLES,this.maskBufferInfo.numElements,n,0)}if(e.useProgram(this.programInfo.program),this.maskProgramInfo?.program){var r=this.maskProperty.type===`out`?0:1;e.stencilFunc(e.EQUAL,r,255),e.stencilOp(e.KEEP,e.KEEP,e.KEEP)}g(this.programInfo,{u_matrix:t,u_opacity:this.opacity||1,u_sampler:this.texture}),m(e,this.programInfo,this.bufferInfo),e.drawElements(e.TRIANGLES,this.arrugado.trigs.length,e.UNSIGNED_SHORT,0),e.clear(e.STENCIL_BUFFER_BIT),e.disable(e.STENCIL_TEST)}},e.prototype.updateColorOption=function(e){if(this.gl&&this.map){var t=Object.assign({},this.colorOption,e);A(t)&&(this.colorOption=t),this.loaded=!1,this.texture&&this.gl.deleteTexture(this.texture),this.loadTexture(this.map,this.gl)}return this},e.prototype.updateMask=function(e){return this.gl&&this.map&&(this.maskProgramInfo||=d(this.gl,[C,S]),this.maskProperty=Object.assign(this.maskProperty,e),this.maskBufferInfo=this.getMaskBufferInfo(this.gl,this.maskProperty.data),this.map.triggerRepaint()),this},e.prototype.loadTexture=function(e,t){var n=this.resampling===`linear`?t.LINEAR:t.NEAREST,r=this.data,i=r.data,a=r.metadata,o=j(i,a,this.colorOption);this.texture=l(t,{width:a.ncols,height:a.nrows,src:o,minMag:n,flipY:1}),this.loaded=!0,e.triggerRepaint()},e.prototype.getMaskBufferInfo=function(e,t){var n=[],r=[];if(t.type===`MultiPolygon`)for(var i=t.coordinates.length,a=0,o=0;o<i;o++){var s=t.coordinates[o],c=y.default.flatten(s),l=c.vertices,u=c.holes,d=c.dimensions,f=(0,y.default)(l,u,d).map(function(e){return e+a});a+=l.length/2;for(var p=0;p<l.length;p++)n.push(l[p]);for(var m=0;m<f.length;m++)r.push(f[m])}else{var c=y.default.flatten(t.coordinates),l=c.vertices,u=c.holes,d=c.dimensions;n=l,r=(0,y.default)(l,u,d)}return h(e,{a_pos:{numComponents:2,data:n},indices:r.length/3>65535?new Uint32Array(r):new Uint16Array(r)})},e}(),P=i({__name:`grid-layer`,setup(e){let n={style:s.DEFAULT,center:[107.744809,30.180706],zoom:6},i=async e=>{fetch(r(`/data/dem.json`)).then(e=>e.json()).then(t=>{let n=new N(`grid-layer`,{data:{data:t,metadata:{xll:105.289583,yll:28.154306,cellsize:.025,ncols:196,nrows:162,lltype:`corner`}},colorOption:{type:`stretched`,colors:[`#30123B`,`#4686FB`,`#1BE5B5`,`#A4FC3C`,`#FBB938`,`#E3440A`,`#7A0403`],values:[0,500,1e3,1500,2e3,2500,3e3]}});e.addLayer(n,`admin-1-boundary-bg`)})};return(e,r)=>(t(),a(c,{"map-options":n,onLoad:i}))}});export{P as default};