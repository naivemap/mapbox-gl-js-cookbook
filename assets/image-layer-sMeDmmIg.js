import{h as e,k as t,n,p as r,s as i}from"./app-BAsgGhKa.js";import{a,r as o,t as s}from"./base-map-BiBGUm3D.js";import{a as c,c as l,i as u,l as d,n as f,o as p,r as m,s as h,t as g}from"./lib-D1PVQq-N.js";var _=t(a()),v=t(d()),y=`
#ifdef GL_ES
  precision highp int;
  precision mediump float;
#endif
uniform sampler2D u_sampler;
uniform float u_opacity;
varying vec2 v_uv;
void main() {
  vec4 color = texture2D(u_sampler, v_uv);
  gl_FragColor = color * u_opacity;
}
`,b=`
uniform mat4 u_matrix;
attribute vec2 a_pos;
attribute vec2 a_uv;
varying vec2 v_uv;
void main() {
  gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);
  v_uv = a_uv;
}
`,x=`
#ifdef GL_ES
precision highp int;
precision mediump float;
#endif

void main() {
  gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
}
`,S=`
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
`;function C(e,t){var n=[-20037508.342789244,20037508.342789244],r=[t[0],t[3],t[1],t[2]],i=g(e,`EPSG:3857`).forward;function a(e){var t=i(e);return[Math.abs((t[0]-n[0])/(20037508.342789244*2)),Math.abs((t[1]-n[1])/(20037508.342789244*2))]}var o=1e-11,s=new f(a,r,[[0,0],[0,1],[1,0],[1,1]],[[0,1,3],[0,3,2]]);s.lowerEpsilon(o);var c=s.output();return{pos:c.projected.flat(),uv:c.uv.flat(),trigs:c.trigs.flat()}}var w=function(){function e(e,t){if(this.type=`custom`,this.renderingMode=`2d`,this.stencilChecked=!0,this.id=e,this.option=t,this.loaded=!1,this.maskProperty=Object.assign({type:`in`},t.mask),this.stencilChecked=l(_.default.version,`>=2.7.0`),this.maskProperty.data&&!this.stencilChecked)throw Error(`如果需要遮罩（掩膜），mapbox-gl 版本必须：>=2.7.0`);var n=t.projection,r=t.coordinates;this.arrugado=C(n,r)}return e.prototype.onAdd=function(e,t){if(this.map=e,this.gl=t,this.programInfo=u(t,[b,y]),this.loadTexture(e,t),this.bufferInfo=m(t,{a_pos:{numComponents:2,data:this.arrugado.pos},a_uv:{numComponents:2,data:this.arrugado.uv},indices:this.arrugado.trigs}),this.maskProperty.data){var n=this.maskProperty.data;n&&(this.maskProgramInfo=u(t,[S,x]),this.maskBufferInfo=this.getMaskBufferInfo(t,n))}},e.prototype.onRemove=function(e,t){this.programInfo&&t.deleteProgram(this.programInfo.program),this.maskProgramInfo&&t.deleteProgram(this.maskProgramInfo.program),this.texture&&t.deleteTexture(this.texture)},e.prototype.render=function(e,t){if(this.stencilChecked&&this.map.painter.resetStencilClippingMasks(),this.loaded&&this.programInfo&&this.bufferInfo){if(e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),this.maskProgramInfo&&this.maskBufferInfo){e.useProgram(this.maskProgramInfo.program),e.enable(e.STENCIL_TEST),e.stencilFunc(e.ALWAYS,1,255),e.stencilOp(e.REPLACE,e.REPLACE,e.REPLACE),e.stencilMask(255),e.clear(e.STENCIL_BUFFER_BIT),h(this.maskProgramInfo,{u_matrix:t}),p(e,this.maskProgramInfo,this.maskBufferInfo);var n=e.UNSIGNED_SHORT;this.maskBufferInfo.numElements/3>65535&&(e.getExtension(`OES_element_index_uint`),n=e.UNSIGNED_INT),e.drawElements(e.TRIANGLES,this.maskBufferInfo.numElements,n,0)}if(e.useProgram(this.programInfo.program),this.maskProgramInfo?.program){var r=this.maskProperty.type===`out`?0:1;e.stencilFunc(e.EQUAL,r,255),e.stencilOp(e.KEEP,e.KEEP,e.KEEP)}h(this.programInfo,{u_matrix:t,u_opacity:this.option.opacity||1,u_sampler:this.texture}),p(e,this.programInfo,this.bufferInfo),e.drawElements(e.TRIANGLES,this.arrugado.trigs.length,e.UNSIGNED_SHORT,0),e.clear(e.STENCIL_BUFFER_BIT),e.disable(e.STENCIL_TEST)}},e.prototype.updateImage=function(e){return this.gl&&this.map&&(this.option.opacity=e.opacity??this.option.opacity,(e.projection||e.coordinates)&&(this.option.projection=e.projection??this.option.projection,this.option.coordinates=e.coordinates??this.option.coordinates,this.arrugado=C(this.option.projection,this.option.coordinates),this.bufferInfo=m(this.gl,{a_pos:{numComponents:2,data:this.arrugado.pos},a_uv:{numComponents:2,data:this.arrugado.uv},indices:this.arrugado.trigs})),e.url||e.resampling?(this.loaded=!1,this.option.url=e.url??this.option.url,this.option.resampling=e.resampling??this.option.resampling,this.loadTexture(this.map,this.gl)):this.map.triggerRepaint()),this},e.prototype.updateMask=function(e){return this.gl&&this.map&&this.maskProgramInfo&&(this.maskProperty=Object.assign(this.maskProperty,e),this.maskBufferInfo=this.getMaskBufferInfo(this.gl,this.maskProperty.data),this.map.triggerRepaint()),this},e.prototype.loadTexture=function(e,t){var n=this,r=this.option.resampling===`nearest`?t.NEAREST:t.LINEAR;this.texture=c(t,{src:this.option.url,crossOrigin:this.option.crossOrigin,minMag:r,flipY:0},function(){n.loaded=!0,e.triggerRepaint()})},e.prototype.getMaskBufferInfo=function(e,t){var n=[],r=[];if(t.type===`MultiPolygon`)for(var i=t.coordinates.length,a=0,o=0;o<i;o++){var s=t.coordinates[o],c=v.default.flatten(s),l=c.vertices,u=c.holes,d=c.dimensions,f=(0,v.default)(l,u,d).map(function(e){return e+a});a+=l.length/2;for(var p=0;p<l.length;p++)n.push(l[p]);for(var h=0;h<f.length;h++)r.push(f[h])}else{var c=v.default.flatten(t.coordinates),l=c.vertices,u=c.holes,d=c.dimensions;n=l,r=(0,v.default)(l,u,d)}return m(e,{a_pos:{numComponents:2,data:n},indices:r.length/3>65535?new Uint32Array(r):new Uint16Array(r)})},e}(),T=r({__name:`image-layer`,setup(t){let r={style:o.DEFAULT,center:[107.744809,30.180706],zoom:6},a=e=>{let t=new w(`layer-4326`,{url:n(`/assets/images/4326.png`),projection:`EPSG:4326`,coordinates:[[105.289838,32.204171],[110.195632,32.204171],[110.195632,28.164713],[105.289838,28.164713]]});e.addLayer(t,`aeroway-line`)};return(t,n)=>(e(),i(s,{"map-options":r,onLoad:a}))}});export{T as default};