import{b as e,h as t,n,o as r,p as i,s as a}from"./app-BAsgGhKa.js";import{r as o,t as s}from"./base-map-BiBGUm3D.js";import{A as c,C as l,D as u,M as d,N as f,O as p,S as m,T as h,_ as g,b as _,g as v,h as y,k as b,l as ee,n as te,o as ne,p as x,r as re,t as ie,u as S,v as ae,w as C,x as w}from"./mapbox-layer-qADTMawh.js";import{a as T,c as oe,i as E,l as se,n as ce,o as D,r as le,s as ue,t as de}from"./cpu-aggregator-BZTkQjx4.js";function O(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,r=Math.fround(e),i=e-r;return t[n]=r,t[n+1]=i,t}function fe(e){return e-Math.fround(e)}function pe(e){let t=new Float32Array(32);for(let n=0;n<4;++n)for(let r=0;r<4;++r){let i=n*4+r;O(e[r*4+n],t,i*2)}return t}var me=`uniform float ONE;
vec2 split(float a) {
  const float SPLIT = 4097.0;
  float t = a * SPLIT;
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float a_hi = t * ONE - (t - a);
  float a_lo = a * ONE - a_hi;
#else
  float a_hi = t - (t - a);
  float a_lo = a - a_hi;
#endif
  return vec2(a_hi, a_lo);
}
vec2 split2(vec2 a) {
  vec2 b = split(a.x);
  b.y += a.y;
  return b;
}
vec2 quickTwoSum(float a, float b) {
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float sum = (a + b) * ONE;
  float err = b - (sum - a) * ONE;
#else
  float sum = a + b;
  float err = b - (sum - a);
#endif
  return vec2(sum, err);
}
vec2 twoSum(float a, float b) {
  float s = (a + b);
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float v = (s * ONE - a) * ONE;
  float err = (a - (s - v) * ONE) * ONE * ONE * ONE + (b - v);
#else
  float v = s - a;
  float err = (a - (s - v)) + (b - v);
#endif
  return vec2(s, err);
}

vec2 twoSub(float a, float b) {
  float s = (a - b);
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float v = (s * ONE - a) * ONE;
  float err = (a - (s - v) * ONE) * ONE * ONE * ONE - (b + v);
#else
  float v = s - a;
  float err = (a - (s - v)) - (b + v);
#endif
  return vec2(s, err);
}

vec2 twoSqr(float a) {
  float prod = a * a;
  vec2 a_fp64 = split(a);
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float err = ((a_fp64.x * a_fp64.x - prod) * ONE + 2.0 * a_fp64.x *
    a_fp64.y * ONE * ONE) + a_fp64.y * a_fp64.y * ONE * ONE * ONE;
#else
  float err = ((a_fp64.x * a_fp64.x - prod) + 2.0 * a_fp64.x * a_fp64.y) + a_fp64.y * a_fp64.y;
#endif
  return vec2(prod, err);
}

vec2 twoProd(float a, float b) {
  float prod = a * b;
  vec2 a_fp64 = split(a);
  vec2 b_fp64 = split(b);
  float err = ((a_fp64.x * b_fp64.x - prod) + a_fp64.x * b_fp64.y +
    a_fp64.y * b_fp64.x) + a_fp64.y * b_fp64.y;
  return vec2(prod, err);
}

vec2 sum_fp64(vec2 a, vec2 b) {
  vec2 s, t;
  s = twoSum(a.x, b.x);
  t = twoSum(a.y, b.y);
  s.y += t.x;
  s = quickTwoSum(s.x, s.y);
  s.y += t.y;
  s = quickTwoSum(s.x, s.y);
  return s;
}

vec2 sub_fp64(vec2 a, vec2 b) {
  vec2 s, t;
  s = twoSub(a.x, b.x);
  t = twoSub(a.y, b.y);
  s.y += t.x;
  s = quickTwoSum(s.x, s.y);
  s.y += t.y;
  s = quickTwoSum(s.x, s.y);
  return s;
}

vec2 mul_fp64(vec2 a, vec2 b) {
  vec2 prod = twoProd(a.x, b.x);
  prod.y += a.x * b.y;
#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)
  prod = split2(prod);
#endif
  prod = quickTwoSum(prod.x, prod.y);
  prod.y += a.y * b.x;
#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)
  prod = split2(prod);
#endif
  prod = quickTwoSum(prod.x, prod.y);
  return prod;
}

vec2 div_fp64(vec2 a, vec2 b) {
  float xn = 1.0 / b.x;
#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)
  vec2 yn = mul_fp64(a, vec2(xn, 0));
#else
  vec2 yn = a * xn;
#endif
  float diff = (sub_fp64(a, mul_fp64(b, yn))).x;
  vec2 prod = twoProd(xn, diff);
  return sum_fp64(yn, prod);
}

vec2 sqrt_fp64(vec2 a) {
  if (a.x == 0.0 && a.y == 0.0) return vec2(0.0, 0.0);
  if (a.x < 0.0) return vec2(0.0 / 0.0, 0.0 / 0.0);

  float x = 1.0 / sqrt(a.x);
  float yn = a.x * x;
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  vec2 yn_sqr = twoSqr(yn) * ONE;
#else
  vec2 yn_sqr = twoSqr(yn);
#endif
  float diff = sub_fp64(a, yn_sqr).x;
  vec2 prod = twoProd(x * 0.5, diff);
#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)
  return sum_fp64(split(yn), prod);
#else
  return sum_fp64(vec2(yn, 0.0), prod);
#endif
}
`,he={ONE:1};function ge(){return he}var k={name:`fp64-arithmetic`,vs:me,fs:null,getUniforms:ge,fp64ify:O,fp64LowPart:fe,fp64ifyMatrix4:pe},_e=new Uint16Array([0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23]),ve=new Float32Array([-1,-1,1,1,-1,1,1,1,1,-1,1,1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1,-1,-1,1,-1,-1,1,1,1,1,1,1,1,-1,-1,-1,-1,1,-1,-1,1,-1,1,-1,-1,1,1,-1,-1,1,1,-1,1,1,1,1,-1,1,-1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1]),ye=new Float32Array([0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0]),be=new Float32Array([0,0,1,0,1,1,0,1,1,0,1,1,0,1,0,0,0,1,0,0,1,0,1,1,1,1,0,1,0,0,1,0,1,0,1,1,0,1,0,0,0,0,1,0,1,1,0,1]),xe={POSITION:{size:3,value:new Float32Array(ve)},NORMAL:{size:3,value:new Float32Array(ye)},TEXCOORD_0:{size:2,value:new Float32Array(be)}},A=class extends y{constructor(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},{id:t=h(`cube-geometry`)}=e;super({...e,id:t,indices:{size:1,value:new Uint16Array(_e)},attributes:{...xe,...e.attributes}})}},Se={cellSize:{type:`number`,min:0,value:1e3},offset:{type:`array`,value:[1,1]}},j=class extends ue{getGeometry(e){return new A}draw({uniforms:e}){let{elevationScale:t,extruded:n,offset:r,coverage:i,cellSize:a,angle:o,radiusUnits:s}=this.props;this.state.model.setUniforms(e).setUniforms({radius:a/2,radiusUnits:c[s],angle:o,offset:r,extruded:n,coverage:i,elevationScale:t,edgeDistance:1,isWireframe:!1}).draw()}};f(j,`layerName`,`GridCellLayer`),f(j,`defaultProps`,Se);var Ce={projectPoints:!1,viewport:null,createBufferObjects:!0,moduleSettings:{}},M=3402823466e29,N=[32775,32774],P=[32776,32774],we=[32776,32775],F={[D.SUM]:32774,[D.MEAN]:32774,[D.MIN]:N,[D.MAX]:P},Te={size:1,operation:D.SUM,needMin:!1,needMax:!1,combineMaxMin:!1},Ee=`#define SHADER_NAME gpu-aggregation-to-grid-vs

attribute vec3 positions;
attribute vec3 positions64Low;
attribute vec3 weights;
uniform vec2 cellSize;
uniform vec2 gridSize;
uniform bool projectPoints;
uniform vec2 translation;
uniform vec3 scaling;

varying vec3 vWeights;

vec2 project_to_pixel(vec4 pos) {
  vec4 result;
  pos.xy = pos.xy/pos.w;
  result = pos + vec4(translation, 0., 0.);
  result.xy = scaling.z > 0. ? result.xy * scaling.xy : result.xy;
  return result.xy;
}

void main(void) {

  vWeights = weights;

  vec4 windowPos = vec4(positions, 1.);
  if (projectPoints) {
    windowPos = project_position_to_clipspace(positions, positions64Low, vec3(0));
  }

  vec2 pos = project_to_pixel(windowPos);

  vec2 pixelXY64[2];
  pixelXY64[0] = vec2(pos.x, 0.);
  pixelXY64[1] = vec2(pos.y, 0.);
  vec2 gridXY64[2];
  gridXY64[0] = div_fp64(pixelXY64[0], vec2(cellSize.x, 0));
  gridXY64[1] = div_fp64(pixelXY64[1], vec2(cellSize.y, 0));
  float x = floor(gridXY64[0].x);
  float y = floor(gridXY64[1].x);
  pos = vec2(x, y);
  pos = (pos * (2., 2.) / (gridSize)) - (1., 1.);
  vec2 offset = 1.0 / gridSize;
  pos = pos + offset;

  gl_Position = vec4(pos, 0.0, 1.0);
  gl_PointSize = 1.0;
}
`,De=`#define SHADER_NAME gpu-aggregation-to-grid-fs

precision highp float;

varying vec3 vWeights;

void main(void) {
  gl_FragColor = vec4(vWeights, 1.0);
  DECKGL_FILTER_COLOR(gl_FragColor, geometry);
}
`,Oe=`#version 300 es
#define SHADER_NAME gpu-aggregation-all-vs-64

in vec2 position;
uniform ivec2 gridSize;
out vec2 vTextureCoord;

void main(void) {
  vec2 pos = vec2(-1.0, -1.0);
  vec2 offset = 1.0 / vec2(gridSize);
  pos = pos + offset;

  gl_Position = vec4(pos, 0.0, 1.0);

  int yIndex = gl_InstanceID / gridSize[0];
  int xIndex = gl_InstanceID - (yIndex * gridSize[0]);

  vec2 yIndexFP64 = vec2(float(yIndex), 0.);
  vec2 xIndexFP64 = vec2(float(xIndex), 0.);
  vec2 gridSizeYFP64 = vec2(gridSize[1], 0.);
  vec2 gridSizeXFP64 = vec2(gridSize[0], 0.);

  vec2 texCoordXFP64 = div_fp64(yIndexFP64, gridSizeYFP64);
  vec2 texCoordYFP64 = div_fp64(xIndexFP64, gridSizeXFP64);

  vTextureCoord = vec2(texCoordYFP64.x, texCoordXFP64.x);
  gl_PointSize = 1.0;
}
`,ke=`#version 300 es
#define SHADER_NAME gpu-aggregation-all-fs

precision highp float;

in vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform bool combineMaxMin;
out vec4 fragColor;
void main(void) {
  vec4 textureColor = texture(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
  if (textureColor.a == 0.) {
    discard;
  }
  fragColor.rgb = textureColor.rgb;
  fragColor.a = combineMaxMin ? textureColor.r : textureColor.a;
}
`,Ae=`#define SHADER_NAME gpu-aggregation-transform-mean-vs
attribute vec4 aggregationValues;
varying vec4 meanValues;

void main()
{
  bool isCellValid = bool(aggregationValues.w > 0.);
  meanValues.xyz = isCellValid ? aggregationValues.xyz/aggregationValues.w : vec3(0, 0, 0);
  meanValues.w = aggregationValues.w;
  gl_PointSize = 1.0;
}
`,je={10240:9728,10241:9728};function I(e,t={}){let{width:n=1,height:r=1,data:i=null,unpackFlipY:a=!0,parameters:o=je}=t;return new l(e,{data:i,format:p(e)?34836:6408,type:5126,border:0,mipmaps:!1,parameters:o,dataFormat:6408,width:n,height:r,unpackFlipY:a})}function L(e,t){let{id:n,width:r=1,height:i=1,texture:a}=t;return new ae(e,{id:n,width:r,height:i,attachments:{36064:a}})}var Me=[`aggregationBuffer`,`maxMinBuffer`,`minBuffer`,`maxBuffer`],R={maxData:`maxBuffer`,minData:`minBuffer`,maxMinData:`maxMinBuffer`},Ne=[w.WEBGL2,w.COLOR_ATTACHMENT_RGBA32F,w.BLEND_EQUATION_MINMAX,w.FLOAT_BLEND,w.TEXTURE_FLOAT],z=class{static getAggregationData({aggregationData:e,maxData:t,minData:n,maxMinData:r,pixelIndex:i}){let a=i*4,o={};return e&&(o.cellCount=e[a+3],o.cellWeight=e[a]),r?(o.maxCellWieght=r[0],o.minCellWeight=r[3]):(t&&(o.maxCellWieght=t[0],o.totalCount=t[3]),n&&(o.minCellWeight=n[0],o.totalCount=t[3])),o}static getCellData({countsData:e,size:t=1}){let n=e.length/4,r=new Float32Array(n*t),i=new Uint32Array(n);for(let a=0;a<n;a++){for(let n=0;n<t;n++)r[a*t+n]=e[a*4+n];i[a]=e[a*4+3]}return{cellCounts:i,cellWeights:r}}static isSupported(e){return _(e,Ne)}constructor(e,t={}){this.id=t.id||`gpu-grid-aggregator`,this.gl=e,this.state={weightAttributes:{},textures:{},meanTextures:{},buffers:{},framebuffers:{},maxMinFramebuffers:{},minFramebuffers:{},maxFramebuffers:{},equations:{},resources:{},results:{}},this._hasGPUSupport=p(e)&&_(this.gl,w.BLEND_EQUATION_MINMAX,w.COLOR_ATTACHMENT_RGBA32F,w.TEXTURE_FLOAT),this._hasGPUSupport&&this._setupModels()}delete(){let{gridAggregationModel:e,allAggregationModel:t,meanTransform:n}=this,{textures:r,framebuffers:i,maxMinFramebuffers:a,minFramebuffers:o,maxFramebuffers:s,meanTextures:c,resources:l}=this.state;e?.delete(),t?.delete(),n?.delete(),Fe([i,r,a,o,s,c,l])}run(e={}){this.setState({results:{}});let t=this._normalizeAggregationParams(e);return this._hasGPUSupport||d.log(1,`GPUGridAggregator: not supported`)(),this._runAggregation(t)}getData(e){let t={},n=this.state.results;n[e].aggregationData||(n[e].aggregationData=n[e].aggregationBuffer.getData()),t.aggregationData=n[e].aggregationData;for(let r in R){let i=R[r];(n[e][r]||n[e][i])&&(n[e][r]=n[e][r]||n[e][i].getData(),t[r]=n[e][r])}return t}updateShaders(e={}){this.setState({shaderOptions:e,modelDirty:!0})}_normalizeAggregationParams(e){let t={...Ce,...e},{weights:n}=t;return n&&(t.weights=Pe(n)),t}setState(e){Object.assign(this.state,e)}_getAggregateData(e){let t={},{textures:n,framebuffers:r,maxMinFramebuffers:i,minFramebuffers:a,maxFramebuffers:o,resources:s}=this.state,{weights:c}=e;for(let e in c){t[e]={};let{needMin:l,needMax:u,combineMaxMin:d}=c[e];t[e].aggregationTexture=n[e],t[e].aggregationBuffer=m(r[e],{target:c[e].aggregationBuffer,sourceType:5126}),l&&u&&d?(t[e].maxMinBuffer=m(i[e],{target:c[e].maxMinBuffer,sourceType:5126}),t[e].maxMinTexture=s[`${e}-maxMinTexture`]):(l&&(t[e].minBuffer=m(a[e],{target:c[e].minBuffer,sourceType:5126}),t[e].minTexture=s[`${e}-minTexture`]),u&&(t[e].maxBuffer=m(o[e],{target:c[e].maxBuffer,sourceType:5126}),t[e].maxTexture=s[`${e}-maxTexture`]))}return this._trackGPUResultBuffers(t,c),t}_renderAggregateData(e){let{cellSize:t,projectPoints:n,attributes:r,moduleSettings:i,numCol:a,numRow:o,weights:s,translation:c,scaling:l}=e,{maxMinFramebuffers:u,minFramebuffers:d,maxFramebuffers:f}=this.state,p=[a,o],m={blend:!0,depthTest:!1,blendFunc:[1,1]},h={cellSize:t,gridSize:p,projectPoints:n,translation:c,scaling:l};for(let e in s){let{needMin:t,needMax:n}=s[e],a=t&&n&&s[e].combineMaxMin;this._renderToWeightsTexture({id:e,parameters:m,moduleSettings:i,uniforms:h,gridSize:p,attributes:r,weights:s}),a?this._renderToMaxMinTexture({id:e,parameters:{...m,blendEquation:we},gridSize:p,minOrMaxFb:u[e],clearParams:{clearColor:[0,0,0,M]},combineMaxMin:a}):(t&&this._renderToMaxMinTexture({id:e,parameters:{...m,blendEquation:N},gridSize:p,minOrMaxFb:d[e],clearParams:{clearColor:[M,M,M,0]},combineMaxMin:a}),n&&this._renderToMaxMinTexture({id:e,parameters:{...m,blendEquation:P},gridSize:p,minOrMaxFb:f[e],clearParams:{clearColor:[0,0,0,0]},combineMaxMin:a}))}}_renderToMaxMinTexture(e){let{id:t,parameters:n,gridSize:r,minOrMaxFb:i,combineMaxMin:a,clearParams:o={}}=e,{framebuffers:s}=this.state,{gl:c,allAggregationModel:l}=this;u(c,{...o,framebuffer:i,viewport:[0,0,r[0],r[1]]},()=>{c.clear(16384),l.draw({parameters:n,uniforms:{uSampler:s[t].texture,gridSize:r,combineMaxMin:a}})})}_renderToWeightsTexture(e){let{id:t,parameters:n,moduleSettings:r,uniforms:i,gridSize:a,weights:o}=e,{framebuffers:s,equations:c,weightAttributes:l}=this.state,{gl:d,gridAggregationModel:f}=this,{operation:p}=o[t],m=p===D.MIN?[M,M,M,0]:[0,0,0,0];if(u(d,{framebuffer:s[t],viewport:[0,0,a[0],a[1]],clearColor:m},()=>{d.clear(16384);let e={weights:l[t]};f.draw({parameters:{...n,blendEquation:c[t]},moduleSettings:r,uniforms:i,attributes:e})}),p===D.MEAN){let{meanTextures:e,textures:n}=this.state,r={_sourceTextures:{aggregationValues:e[t]},_targetTexture:n[t],elementCount:n[t].width*n[t].height};this.meanTransform?this.meanTransform.update(r):this.meanTransform=Re(d,r),this.meanTransform.run({parameters:{blend:!1,depthTest:!1}}),s[t].attach({36064:n[t]})}}_runAggregation(e){this._updateModels(e),this._setupFramebuffers(e),this._renderAggregateData(e);let t=this._getAggregateData(e);return this.setState({results:t}),t}_setupFramebuffers(e){let{textures:t,framebuffers:n,maxMinFramebuffers:r,minFramebuffers:i,maxFramebuffers:a,meanTextures:o,equations:s}=this.state,{weights:c}=e,{numCol:l,numRow:u}=e,d={width:l,height:u};for(let e in c){let{needMin:f,needMax:p,combineMaxMin:m,operation:h}=c[e];t[e]=c[e].aggregationTexture||t[e]||I(this.gl,{id:`${e}-texture`,width:l,height:u}),t[e].resize(d);let g=t[e];h===D.MEAN&&(o[e]=o[e]||I(this.gl,{id:`${e}-mean-texture`,width:l,height:u}),o[e].resize(d),g=o[e]),n[e]?n[e].attach({36064:g}):n[e]=L(this.gl,{id:`${e}-fb`,width:l,height:u,texture:g}),n[e].resize(d),s[e]=F[h]||F.SUM,(f||p)&&(f&&p&&m?r[e]||(g=c[e].maxMinTexture||this._getMinMaxTexture(`${e}-maxMinTexture`),r[e]=L(this.gl,{id:`${e}-maxMinFb`,texture:g})):(f&&(i[e]||(g=c[e].minTexture||this._getMinMaxTexture(`${e}-minTexture`),i[e]=L(this.gl,{id:`${e}-minFb`,texture:g}))),p&&(a[e]||(g=c[e].maxTexture||this._getMinMaxTexture(`${e}-maxTexture`),a[e]=L(this.gl,{id:`${e}-maxFb`,texture:g})))))}}_getMinMaxTexture(e){let{resources:t}=this.state;return t[e]||(t[e]=I(this.gl,{id:`resourceName`})),t[e]}_setupModels({numCol:e=0,numRow:t=0}={}){var n;let{gl:r}=this,{shaderOptions:i}=this.state;if((n=this.gridAggregationModel)==null||n.delete(),this.gridAggregationModel=Ie(r,i),!this.allAggregationModel){let n=e*t;this.allAggregationModel=Le(r,n)}}_setupWeightAttributes(e){let{weightAttributes:t}=this.state,{weights:n}=e;for(let r in n)t[r]=e.attributes[r]}_trackGPUResultBuffers(e,t){let{resources:n}=this.state;for(let r in e)if(e[r]){for(let i of Me)if(e[r][i]&&t[r][i]!==e[r][i]){let t=`gpu-result-${r}-${i}`;n[t]&&n[t].delete(),n[t]=e[r][i]}}}_updateModels(e){let{vertexCount:t,attributes:n,numCol:r,numRow:i}=e,{modelDirty:a}=this.state;a&&(this._setupModels(e),this.setState({modelDirty:!1})),this._setupWeightAttributes(e),this.gridAggregationModel.setVertexCount(t),this.gridAggregationModel.setAttributes(n),this.allAggregationModel.setInstanceCount(r*i)}};function Pe(e){let t={};for(let n in e)t[n]={...Te,...e[n]};return t}function Fe(e){e=Array.isArray(e)?e:[e],e.forEach(e=>{for(let t in e)e[t].delete()})}function Ie(e,t){return new g(e,{id:`Gird-Aggregation-Model`,vertexCount:1,drawMode:0,...re({vs:Ee,fs:De,modules:[k,S]},t)})}function Le(e,t){return new g(e,{id:`All-Aggregation-Model`,vs:Oe,fs:ke,modules:[k],vertexCount:1,drawMode:0,isInstanced:!0,instanceCount:t,attributes:{position:[0,0]}})}function Re(e,t){return new v(e,{vs:Ae,_targetTextureVarying:`meanValues`,...t})}var B=6378e3;function V(e){return Number.isFinite(e)?e:0}function ze(e,t){let n=e.positions.value,r=1/0,i=-1/0,a=1/0,o=-1/0,s,c;for(let e=0;e<t;e++)c=n[e*3],s=n[e*3+1],r=s<r?s:r,i=s>i?s:i,a=c<a?c:a,o=c>o?c:o;return{xMin:V(a),xMax:V(o),yMin:V(r),yMax:V(i)}}function Be(e,t,n,r){let{width:i,height:a}=r,o=n===b.CARTESIAN?[-i/2,-a/2]:[-180,-90];d.assert(n===b.CARTESIAN||n===b.LNGLAT||n===b.DEFAULT);let{xMin:s,yMin:c}=e;return[-1*(H(s-o[0],t.xOffset)+o[0]),-1*(H(c-o[1],t.yOffset)+o[1])]}function H(e,t){let n=e<0?-1:1,r=n<0?Math.abs(e)+t:Math.abs(e);return r=Math.floor(r/t)*t,r*n}function U(e,t,n=!0){if(!n)return{xOffset:t,yOffset:t};let{yMin:r,yMax:i}=e;return He(t,(r+i)/2)}function Ve(e,t,n,r){let i=U(e,t,r!==b.CARTESIAN),a=Be(e,i,r,n),{xMin:o,yMin:s,xMax:c,yMax:l}=e,u=c-o+i.xOffset,d=l-s+i.yOffset;return{gridOffset:i,translation:a,width:u,height:d,numCol:Math.ceil(u/i.xOffset),numRow:Math.ceil(d/i.yOffset)}}function He(e,t){return{yOffset:Ue(e),xOffset:We(t,e)}}function Ue(e){return e/B*(180/Math.PI)}function We(e,t){return t/B*(180/Math.PI)/Math.cos(e*Math.PI/180)}function W(e,t){let n=Ge(e,t),r=Ke(n);return{gridHash:n.gridHash,gridOffset:n.gridOffset,data:r}}function Ge(e,t){let{data:n=[],cellSize:r}=e,{attributes:i,viewport:a,projectPoints:o,numInstances:s}=t,c=i.positions.value,{size:l}=i.positions.getAccessor(),u=t.boundingBox||qe(i.positions,s),d=t.posOffset||[180,90],f=t.gridOffset||U(u,r);if(f.xOffset<=0||f.yOffset<=0)return{gridHash:{},gridOffset:f};let{width:p,height:m}=a,h=Math.ceil(p/f.xOffset),g=Math.ceil(m/f.yOffset),_={},{iterable:v,objectInfo:y}=ne(n),b=[,,,];for(let e of v){y.index++,b[0]=c[y.index*l],b[1]=c[y.index*l+1],b[2]=l>=3?c[y.index*l+2]:0;let[t,n]=o?a.project(b):b;if(Number.isFinite(t)&&Number.isFinite(n)){let r=Math.floor((n+d[1])/f.yOffset),i=Math.floor((t+d[0])/f.xOffset);if(!o||i>=0&&i<h&&r>=0&&r<g){let t=`${r}-${i}`;_[t]=_[t]||{count:0,points:[],lonIdx:i,latIdx:r},_[t].count+=1,_[t].points.push({source:e,index:y.index})}}}return{gridHash:_,gridOffset:f,offsets:[d[0]*-1,d[1]*-1]}}function Ke({gridHash:e,gridOffset:t,offsets:n}){let r=Array(Object.keys(e).length),i=0;for(let a in e){let o=a.split(`-`),s=parseInt(o[0],10),c=parseInt(o[1],10),l=i++;r[l]={index:l,position:[n[0]+t.xOffset*c,n[1]+t.yOffset*s],...e[a]}}return r}function qe(e,t){let n=e.value,{size:r}=e.getAccessor(),i=1/0,a=-1/0,o=1/0,s=-1/0,c,l;for(let e=0;e<t;e++)l=n[e*r],c=n[e*r+1],Number.isFinite(l)&&Number.isFinite(c)&&(i=c<i?c:i,a=c>a?c:a,o=l<o?l:o,s=l>s?l:s);return{xMin:o,xMax:s,yMin:i,yMax:a}}var G=class extends le{constructor(...e){super(...e),f(this,`state`,void 0)}initializeAggregationLayer({dimensions:e}){let{gl:t}=this.context;super.initializeAggregationLayer(e),this.setState({layerData:{},gpuGridAggregator:new z(t,{id:`${this.id}-gpu-aggregator`}),cpuGridAggregator:W})}updateState(e){super.updateState(e),this.updateAggregationState(e);let{aggregationDataDirty:t,aggregationWeightsDirty:n,gpuAggregation:r}=this.state;if(this.getNumInstances()<=0)return;let i=!1;(t||r&&n)&&(this._updateAggregation(e),i=!0),!r&&(t||n)&&(this._updateWeightBins(),this._uploadAggregationResults(),i=!0),this.setState({aggregationDirty:i})}finalizeState(e){var t;let{count:n}=this.state.weights;n&&n.aggregationBuffer&&n.aggregationBuffer.delete(),(t=this.state.gpuGridAggregator)==null||t.delete(),super.finalizeState(e)}updateShaders(e){this.state.gpuAggregation&&this.state.gpuGridAggregator.updateShaders(e)}updateAggregationState(e){d.assert(!1)}allocateResources(e,t){if(this.state.numRow!==e||this.state.numCol!==t){let n=t*e*4*4,r=this.context.gl,{weights:i}=this.state;for(let e in i){let t=i[e];t.aggregationBuffer&&t.aggregationBuffer.delete(),t.aggregationBuffer=new C(r,{byteLength:n,accessor:{size:4,type:5126,divisor:1}})}}}updateResults({aggregationData:e,maxMinData:t,maxData:n,minData:r}){let{count:i}=this.state.weights;i&&(i.aggregationData=e,i.maxMinData=t,i.maxData=n,i.minData=r)}_updateAggregation(e){let{cpuGridAggregator:t,gpuGridAggregator:n,gridOffset:r,posOffset:i,translation:a=[0,0],scaling:o=[0,0,0],boundingBox:s,projectPoints:c,gpuAggregation:l,numCol:u,numRow:d}=this.state,{props:f}=e,{viewport:p}=this.context,m=this.getAttributes(),h=this.getNumInstances();if(l){let{weights:e}=this.state;n.run({weights:e,cellSize:[r.xOffset,r.yOffset],numCol:u,numRow:d,translation:a,scaling:o,vertexCount:h,projectPoints:c,attributes:m,moduleSettings:this.getModuleSettings()})}else{let e=t(f,{gridOffset:r,projectPoints:c,attributes:m,viewport:p,posOffset:i,boundingBox:s});this.setState({layerData:e})}}_updateWeightBins(){let{getValue:e}=this.state,t=new ce(this.state.layerData.data||[],{getValue:e});this.setState({sortedBins:t})}_uploadAggregationResults(){let{numCol:e,numRow:t}=this.state,{data:n}=this.state.layerData,{aggregatedBins:r,minValue:i,maxValue:a,totalCount:o}=this.state.sortedBins,s=e*t*4,c=new Float32Array(s).fill(0);for(let t of r){let{lonIdx:r,latIdx:i}=n[t.i],{value:a,counts:o}=t,s=(r+i*e)*4;c[s]=a,c[s+4-1]=o}let l=new Float32Array([a,0,0,i]),u=new Float32Array([a,0,0,o]),d=new Float32Array([i,0,0,o]);this.updateResults({aggregationData:c,maxMinData:l,maxData:u,minData:d})}};f(G,`layerName`,`GridAggregationLayer`);function K(){}var Je={colorDomain:null,colorRange:T,getColorValue:{type:`accessor`,value:null},getColorWeight:{type:`accessor`,value:1},colorAggregation:`SUM`,lowerPercentile:{type:`number`,min:0,max:100,value:0},upperPercentile:{type:`number`,min:0,max:100,value:100},colorScaleType:`quantize`,onSetColorDomain:K,elevationDomain:null,elevationRange:[0,1e3],getElevationValue:{type:`accessor`,value:null},getElevationWeight:{type:`accessor`,value:1},elevationAggregation:`SUM`,elevationLowerPercentile:{type:`number`,min:0,max:100,value:0},elevationUpperPercentile:{type:`number`,min:0,max:100,value:100},elevationScale:{type:`number`,min:0,value:1},elevationScaleType:`linear`,onSetElevationDomain:K,gridAggregator:W,cellSize:{type:`number`,min:0,max:1e3,value:1e3},coverage:{type:`number`,min:0,max:1,value:1},getPosition:{type:`accessor`,value:e=>e.position},extruded:!1,material:!0,_filterData:{type:`function`,value:null,optional:!0}},q=class extends le{initializeState(){let e=new de({getAggregator:e=>e.gridAggregator,getCellSize:e=>e.cellSize});this.state={cpuAggregator:e,aggregatorState:e.state},this.getAttributeManager().add({positions:{size:3,type:5130,accessor:`getPosition`}})}updateState(e){super.updateState(e),this.setState({aggregatorState:this.state.cpuAggregator.updateState(e,{viewport:this.context.viewport,attributes:this.getAttributes(),numInstances:this.getNumInstances()})})}getPickingInfo({info:e}){return this.state.cpuAggregator.getPickingInfo({info:e})}_onGetSublayerColor(e){return this.state.cpuAggregator.getAccessor(`fillColor`)(e)}_onGetSublayerElevation(e){return this.state.cpuAggregator.getAccessor(`elevation`)(e)}_getSublayerUpdateTriggers(){return this.state.cpuAggregator.getUpdateTriggers(this.props)}renderLayers(){let{elevationScale:e,extruded:t,cellSize:n,coverage:r,material:i,transitions:a}=this.props,{cpuAggregator:o}=this.state,s=this.getSubLayerClass(`grid-cell`,j),c=this._getSublayerUpdateTriggers();return new s({cellSize:n,coverage:r,material:i,elevationScale:e,extruded:t,getFillColor:this._onGetSublayerColor.bind(this),getElevation:this._onGetSublayerElevation.bind(this),transitions:a&&{getFillColor:a.getColorValue||a.getColorWeight,getElevation:a.getElevationValue||a.getElevationWeight}},this.getSubLayerProps({id:`grid-cell`,updateTriggers:c}),{data:o.state.layerData.data})}};f(q,`layerName`,`CPUGridLayer`),f(q,`defaultProps`,Je);var Ye=`#version 300 es
#define SHADER_NAME gpu-grid-cell-layer-vertex-shader
#define RANGE_COUNT 6

in vec3 positions;
in vec3 normals;

in vec4 colors;
in vec4 elevations;
in vec3 instancePickingColors;
uniform vec2 offset;
uniform bool extruded;
uniform float cellSize;
uniform float coverage;
uniform float opacity;
uniform float elevationScale;

uniform ivec2 gridSize;
uniform vec2 gridOrigin;
uniform vec2 gridOriginLow;
uniform vec2 gridOffset;
uniform vec2 gridOffsetLow;
uniform vec4 colorRange[RANGE_COUNT];
uniform vec2 elevationRange;
uniform vec2 colorDomain;
uniform bool colorDomainValid;
uniform vec2 elevationDomain;
uniform bool elevationDomainValid;

layout(std140) uniform;
uniform ColorData
{
  vec4 maxMinCount;
} colorData;
uniform ElevationData
{
  vec4 maxMinCount;
} elevationData;

#define EPSILON 0.00001
out vec4 vColor;

vec4 quantizeScale(vec2 domain, vec4 range[RANGE_COUNT], float value) {
  vec4 outColor = vec4(0., 0., 0., 0.);
  if (value >= (domain.x - EPSILON) && value <= (domain.y + EPSILON)) {
    float domainRange = domain.y - domain.x;
    if (domainRange <= 0.) {
      outColor = colorRange[0];
    } else {
      float rangeCount = float(RANGE_COUNT);
      float rangeStep = domainRange / rangeCount;
      float idx = floor((value - domain.x) / rangeStep);
      idx = clamp(idx, 0., rangeCount - 1.);
      int intIdx = int(idx);
      outColor = colorRange[intIdx];
    }
  }
  return outColor;
}

float linearScale(vec2 domain, vec2 range, float value) {
  if (value >= (domain.x - EPSILON) && value <= (domain.y + EPSILON)) {
    return ((value - domain.x) / (domain.y - domain.x)) * (range.y - range.x) + range.x;
  }
  return -1.;
}

void main(void) {
  vec2 clrDomain = colorDomainValid ? colorDomain : vec2(colorData.maxMinCount.a, colorData.maxMinCount.r);
  vec4 color = quantizeScale(clrDomain, colorRange, colors.r);

  float elevation = 0.0;

  if (extruded) {
    vec2 elvDomain = elevationDomainValid ? elevationDomain : vec2(elevationData.maxMinCount.a, elevationData.maxMinCount.r);
    elevation = linearScale(elvDomain, elevationRange, elevations.r);
    elevation = elevation  * (positions.z + 1.0) / 2.0 * elevationScale;
  }
  float shouldRender = float(color.r > 0.0 && elevations.r >= 0.0);
  float dotRadius = cellSize / 2. * coverage * shouldRender;

  int yIndex = (gl_InstanceID / gridSize[0]);
  int xIndex = gl_InstanceID - (yIndex * gridSize[0]);

  vec2 instancePositionXFP64 = mul_fp64(vec2(gridOffset[0], gridOffsetLow[0]), vec2(float(xIndex), 0.));
  instancePositionXFP64 = sum_fp64(instancePositionXFP64, vec2(gridOrigin[0], gridOriginLow[0]));
  vec2 instancePositionYFP64 = mul_fp64(vec2(gridOffset[1], gridOffsetLow[1]), vec2(float(yIndex), 0.));
  instancePositionYFP64 = sum_fp64(instancePositionYFP64, vec2(gridOrigin[1], gridOriginLow[1]));

  vec3 centroidPosition = vec3(instancePositionXFP64[0], instancePositionYFP64[0], elevation);
  vec3 centroidPosition64Low = vec3(instancePositionXFP64[1], instancePositionYFP64[1], 0.0);
  geometry.worldPosition = centroidPosition;
  vec3 pos = vec3(project_size(positions.xy + offset) * dotRadius, 0.);
  picking_setPickingColor(instancePickingColors);

  gl_Position = project_position_to_clipspace(centroidPosition, centroidPosition64Low, pos, geometry.position);

  vec3 normals_commonspace = project_normal(normals);

   if (extruded) {
    vec3 lightColor = lighting_getLightColor(color.rgb, project_uCameraPosition, geometry.position.xyz, normals_commonspace);
    vColor = vec4(lightColor, color.a * opacity) / 255.;
  } else {
    vColor = vec4(color.rgb, color.a * opacity) / 255.;
  }
}
`,Xe=`#version 300 es
#define SHADER_NAME gpu-grid-cell-layer-fragment-shader

precision highp float;

in vec4 vColor;

out vec4 fragColor;

void main(void) {
  fragColor = vColor;
  fragColor = picking_filterColor(fragColor);
}
`,J=0,Y=1,Ze={colorDomain:null,colorRange:T,elevationDomain:null,elevationRange:[0,1e3],elevationScale:{type:`number`,min:0,value:1},gridSize:{type:`array`,value:[1,1]},gridOrigin:{type:`array`,value:[0,0]},gridOffset:{type:`array`,value:[0,0]},cellSize:{type:`number`,min:0,max:1e3,value:1e3},offset:{type:`array`,value:[1,1]},coverage:{type:`number`,min:0,max:1,value:1},extruded:!0,material:!0},X=class extends te{getShaders(){return super.getShaders({vs:Ye,fs:Xe,modules:[S,se,ee,k]})}initializeState({gl:e}){this.getAttributeManager().addInstanced({colors:{size:4,noAlloc:!0},elevations:{size:4,noAlloc:!0}});let t=this._getModel(e);this._setupUniformBuffer(t),this.setState({model:t})}_getModel(e){return new g(e,{...this.getShaders(),id:this.props.id,geometry:new A,isInstanced:!0})}draw({uniforms:e}){let{cellSize:t,offset:n,extruded:r,elevationScale:i,coverage:a,gridSize:o,gridOrigin:s,gridOffset:c,elevationRange:l,colorMaxMinBuffer:u,elevationMaxMinBuffer:d}=this.props,f=[x(s[0]),x(s[1])],p=[x(c[0]),x(c[1])],m=this.getDomainUniforms(),h=E(this.props.colorRange);this.bindUniformBuffers(u,d),this.state.model.setUniforms(e).setUniforms(m).setUniforms({cellSize:t,offset:n,extruded:r,elevationScale:i,coverage:a,gridSize:o,gridOrigin:s,gridOriginLow:f,gridOffset:c,gridOffsetLow:p,colorRange:h,elevationRange:l}).draw(),this.unbindUniformBuffers(u,d)}bindUniformBuffers(e,t){e.bind({target:35345,index:J}),t.bind({target:35345,index:Y})}unbindUniformBuffers(e,t){e.unbind({target:35345,index:J}),t.unbind({target:35345,index:Y})}getDomainUniforms(){let{colorDomain:e,elevationDomain:t}=this.props,n={};return e===null?n.colorDomainValid=!1:(n.colorDomainValid=!0,n.colorDomain=e),t===null?n.elevationDomainValid=!1:(n.elevationDomainValid=!0,n.elevationDomain=t),n}_setupUniformBuffer(e){let t=this.context.gl,n=e.program.handle,r=t.getUniformBlockIndex(n,`ColorData`),i=t.getUniformBlockIndex(n,`ElevationData`);t.uniformBlockBinding(n,r,J),t.uniformBlockBinding(n,i,Y)}};f(X,`layerName`,`GPUGridCellLayer`),f(X,`defaultProps`,Ze);var Qe={colorDomain:null,colorRange:T,getColorWeight:{type:`accessor`,value:1},colorAggregation:`SUM`,elevationDomain:null,elevationRange:[0,1e3],getElevationWeight:{type:`accessor`,value:1},elevationAggregation:`SUM`,elevationScale:{type:`number`,min:0,value:1},cellSize:{type:`number`,min:1,max:1e3,value:1e3},coverage:{type:`number`,min:0,max:1,value:1},getPosition:{type:`accessor`,value:e=>e.position},extruded:!1,material:!0},$e={data:{props:[`cellSize`,`colorAggregation`,`elevationAggregation`]}},Z=`positions`,Q=class extends G{initializeState({gl:e}){let t=z.isSupported(e);t||d.error(`GPUGridLayer is not supported on this browser, use GridLayer instead`)(),super.initializeAggregationLayer({dimensions:$e}),this.setState({gpuAggregation:!0,projectPoints:!1,isSupported:t,weights:{color:{needMin:!0,needMax:!0,combineMaxMin:!0,maxMinBuffer:new C(e,{byteLength:16,accessor:{size:4,type:5126,divisor:1}})},elevation:{needMin:!0,needMax:!0,combineMaxMin:!0,maxMinBuffer:new C(e,{byteLength:16,accessor:{size:4,type:5126,divisor:1}})}},positionAttributeName:`positions`}),this.getAttributeManager().add({[Z]:{size:3,accessor:`getPosition`,type:5130,fp64:this.use64bitPositions()},color:{size:3,accessor:`getColorWeight`},elevation:{size:3,accessor:`getElevationWeight`}})}updateState(e){if(this.state.isSupported===!1)return;super.updateState(e);let{aggregationDirty:t}=this.state;t&&this.setState({gridHash:null})}getHashKeyForIndex(e){let{numRow:t,numCol:n,boundingBox:r,gridOffset:i}=this.state,a=[n,t],o=[r.xMin,r.yMin],s=[i.xOffset,i.yOffset],c=Math.floor(e/a[0]),l=e-c*a[0];return`${Math.floor((c*s[1]+o[1]+90+s[1]/2)/s[1])}-${Math.floor((l*s[0]+o[0]+180+s[0]/2)/s[0])}`}getPositionForIndex(e){let{numRow:t,numCol:n,boundingBox:r,gridOffset:i}=this.state,a=[n,t],o=[r.xMin,r.yMin],s=[i.xOffset,i.yOffset],c=Math.floor(e/a[0]),l=e-c*a[0],u=c*s[1]+o[1];return[l*s[0]+o[0],u]}getPickingInfo({info:e,mode:t}){let{index:n}=e,r=null;if(n>=0){let{gpuGridAggregator:e}=this.state,i=this.getPositionForIndex(n),a=z.getAggregationData({pixelIndex:n,...e.getData(`color`)}),o=z.getAggregationData({pixelIndex:n,...e.getData(`elevation`)});if(r={colorValue:a.cellWeight,elevationValue:o.cellWeight,count:a.cellCount||o.cellCount,position:i,totalCount:a.totalCount||o.totalCount},t!==`hover`){let{props:e}=this,{gridHash:t}=this.state;if(!t){let{gridOffset:n,translation:r,boundingBox:i}=this.state,{viewport:a}=this.context;t=W(e,{gridOffset:n,attributes:this.getAttributes(),viewport:a,translation:r,boundingBox:i}).gridHash,this.setState({gridHash:t})}let i=this.getHashKeyForIndex(n),a=t[i];Object.assign(r,a)}}return e.picked=!!r,e.object=r,e}renderLayers(){if(!this.state.isSupported)return null;let{elevationScale:e,extruded:t,cellSize:n,coverage:r,material:i,elevationRange:a,colorDomain:o,elevationDomain:s}=this.props,{weights:c,numRow:l,numCol:u,gridOrigin:d,gridOffset:f}=this.state,{color:p,elevation:m}=c,h=E(this.props.colorRange);return new(this.getSubLayerClass(`gpu-grid-cell`,X))({gridSize:[u,l],gridOrigin:d,gridOffset:[f.xOffset,f.yOffset],colorRange:h,elevationRange:a,colorDomain:o,elevationDomain:s,cellSize:n,coverage:r,material:i,elevationScale:e,extruded:t},this.getSubLayerProps({id:`gpu-grid-cell`}),{data:{attributes:{colors:p.aggregationBuffer,elevations:m.aggregationBuffer}},colorMaxMinBuffer:p.maxMinBuffer,elevationMaxMinBuffer:m.maxMinBuffer,numInstances:u*l})}finalizeState(e){let{color:t,elevation:n}=this.state.weights;[t,n].forEach(e=>{let{aggregationBuffer:t,maxMinBuffer:n}=e;n.delete(),t?.delete()}),super.finalizeState(e)}updateAggregationState(e){let{props:t,oldProps:n}=e,{cellSize:r,coordinateSystem:i}=t,{viewport:a}=this.context,o=n.cellSize!==r,{dimensions:s}=this.state,c=this.isAttributeChanged(Z),l=c||this.isAttributeChanged(),{boundingBox:u}=this.state;if(c&&(u=ze(this.getAttributes(),this.getNumInstances()),this.setState({boundingBox:u})),c||o){let{gridOffset:e,translation:t,width:n,height:o,numCol:s,numRow:c}=Ve(u,r,a,i);this.allocateResources(c,s),this.setState({gridOffset:e,translation:t,gridOrigin:[-1*t[0],-1*t[1]],width:n,height:o,numCol:s,numRow:c})}let d=l||this.isAggregationDirty(e,{dimension:s.data,compareAll:!0});d&&this._updateAccessors(e),this.setState({aggregationDataDirty:d})}_updateAccessors(e){let{colorAggregation:t,elevationAggregation:n}=e.props,{color:r,elevation:i}=this.state.weights;r.operation=D[t],i.operation=D[n]}};f(Q,`layerName`,`GPUGridLayer`),f(Q,`defaultProps`,Qe);var et={...Q.defaultProps,...q.defaultProps,gpuAggregation:!1},$=class extends oe{constructor(...e){super(...e),f(this,`state`,void 0)}initializeState(){this.state={useGPUAggregation:!0}}updateState({props:e}){this.setState({useGPUAggregation:this.canUseGPUAggregation(e)})}renderLayers(){let{data:e,updateTriggers:t}=this.props,n=this.state.useGPUAggregation?`GPU`:`CPU`;return new(this.state.useGPUAggregation?this.getSubLayerClass(`GPU`,Q):this.getSubLayerClass(`CPU`,q))(this.props,this.getSubLayerProps({id:n,updateTriggers:t}),{data:e})}canUseGPUAggregation(e){let{gpuAggregation:t,lowerPercentile:n,upperPercentile:r,getColorValue:i,getElevationValue:a,colorScaleType:o}=e;return!(!t||!z.isSupported(this.context.gl)||n!==0||r!==100||i!==null||a!==null||o===`quantile`||o===`ordinal`)}};f($,`layerName`,`GridLayer`),f($,`defaultProps`,et);var tt=i({__name:`grid-layer`,setup(i){let c={style:o.DARK,center:[-122.441107,37.755579],zoom:11.4,minZoom:8,pitch:50,antialias:!0},l=e=>{let t=new ie({id:`grid-layer`,type:$,data:n(`/data/sf-bike-parking.json`),pickable:!0,extruded:!0,cellSize:200,elevationScale:4,getPosition:e=>e.COORDINATES,onHover:e=>{let t=document.getElementById(`grid-layer-tooltip`);e.object?(t.innerHTML=`${e.object.position.join(`, `)}\nCount: ${e.object.count}`,t.style.display=`block`,t.style.left=e.x+`px`,t.style.top=e.y+`px`):t.style.display=`none`}});e.addLayer(t)};return(n,i)=>(t(),a(s,{"map-clickable":!1,"map-options":c,onLoad:l},{default:e(()=>[...i[0]||=[r(`div`,{id:`grid-layer-tooltip`,class:`tooltip`},null,-1)]]),_:1}))}});export{tt as default};