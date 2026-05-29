import{A as e,E as t,M as n,N as r,O as i,T as a,_ as o,a as s,d as c,f as l,h as u,i as d,j as f,l as p,n as m,u as h,x as g,y as _}from"./mapbox-layer-qADTMawh.js";var v=`#if (defined(SHADER_TYPE_FRAGMENT) && defined(LIGHTING_FRAGMENT)) || (defined(SHADER_TYPE_VERTEX) && defined(LIGHTING_VERTEX))

struct AmbientLight {
 vec3 color;
};

struct PointLight {
 vec3 color;
 vec3 position;
 vec3 attenuation;
};

struct DirectionalLight {
  vec3 color;
  vec3 direction;
};

uniform AmbientLight lighting_uAmbientLight;
uniform PointLight lighting_uPointLight[MAX_LIGHTS];
uniform DirectionalLight lighting_uDirectionalLight[MAX_LIGHTS];
uniform int lighting_uPointLightCount;
uniform int lighting_uDirectionalLightCount;

uniform bool lighting_uEnabled;

float getPointLightAttenuation(PointLight pointLight, float distance) {
  return pointLight.attenuation.x
       + pointLight.attenuation.y * distance
       + pointLight.attenuation.z * distance * distance;
}

#endif
`,y={lightSources:{}};function b(){let{color:e=[0,0,0],intensity:t=1}=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return e.map(e=>e*t/255)}function x(e){let{ambientLight:t,pointLights:n=[],directionalLights:r=[]}=e,i={};return t?i[`lighting_uAmbientLight.color`]=b(t):i[`lighting_uAmbientLight.color`]=[0,0,0],n.forEach((e,t)=>{i[`lighting_uPointLight[${t}].color`]=b(e),i[`lighting_uPointLight[${t}].position`]=e.position,i[`lighting_uPointLight[${t}].attenuation`]=e.attenuation||[1,0,0]}),i.lighting_uPointLightCount=n.length,r.forEach((e,t)=>{i[`lighting_uDirectionalLight[${t}].color`]=b(e),i[`lighting_uDirectionalLight[${t}].direction`]=e.direction}),i.lighting_uDirectionalLightCount=r.length,i}function S(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:y;if(`lightSources`in e){let{ambientLight:t,pointLights:n,directionalLights:r}=e.lightSources||{};return t||n&&n.length>0||r&&r.length>0?Object.assign({},x({ambientLight:t,pointLights:n,directionalLights:r}),{lighting_uEnabled:!0}):{lighting_uEnabled:!1}}if(`lights`in e){let t={pointLights:[],directionalLights:[]};for(let n of e.lights||[])switch(n.type){case`ambient`:t.ambientLight=n;break;case`directional`:t.directionalLights.push(n);break;case`point`:t.pointLights.push(n);break;default:}return S({lightSources:t})}return{}}var C={name:`lights`,vs:v,fs:v,getUniforms:S,defines:{MAX_LIGHTS:3}},w=`
uniform float lighting_uAmbient;
uniform float lighting_uDiffuse;
uniform float lighting_uShininess;
uniform vec3  lighting_uSpecularColor;

vec3 lighting_getLightColor(vec3 surfaceColor, vec3 light_direction, vec3 view_direction, vec3 normal_worldspace, vec3 color) {
    vec3 halfway_direction = normalize(light_direction + view_direction);
    float lambertian = dot(light_direction, normal_worldspace);
    float specular = 0.0;
    if (lambertian > 0.0) {
      float specular_angle = max(dot(normal_worldspace, halfway_direction), 0.0);
      specular = pow(specular_angle, lighting_uShininess);
    }
    lambertian = max(lambertian, 0.0);
    return (lambertian * lighting_uDiffuse * surfaceColor + specular * lighting_uSpecularColor) * color;
}

vec3 lighting_getLightColor(vec3 surfaceColor, vec3 cameraPosition, vec3 position_worldspace, vec3 normal_worldspace) {
  vec3 lightColor = surfaceColor;

  if (lighting_uEnabled) {
    vec3 view_direction = normalize(cameraPosition - position_worldspace);
    lightColor = lighting_uAmbient * surfaceColor * lighting_uAmbientLight.color;

    for (int i = 0; i < MAX_LIGHTS; i++) {
      if (i >= lighting_uPointLightCount) {
        break;
      }
      PointLight pointLight = lighting_uPointLight[i];
      vec3 light_position_worldspace = pointLight.position;
      vec3 light_direction = normalize(light_position_worldspace - position_worldspace);
      lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, pointLight.color);
    }

    for (int i = 0; i < MAX_LIGHTS; i++) {
      if (i >= lighting_uDirectionalLightCount) {
        break;
      }
      DirectionalLight directionalLight = lighting_uDirectionalLight[i];
      lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
    }
  }
  return lightColor;
}

vec3 lighting_getSpecularLightColor(vec3 cameraPosition, vec3 position_worldspace, vec3 normal_worldspace) {
  vec3 lightColor = vec3(0, 0, 0);
  vec3 surfaceColor = vec3(0, 0, 0);

  if (lighting_uEnabled) {
    vec3 view_direction = normalize(cameraPosition - position_worldspace);

    for (int i = 0; i < MAX_LIGHTS; i++) {
      if (i >= lighting_uPointLightCount) {
        break;
      }
      PointLight pointLight = lighting_uPointLight[i];
      vec3 light_position_worldspace = pointLight.position;
      vec3 light_direction = normalize(light_position_worldspace - position_worldspace);
      lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, pointLight.color);
    }

    for (int i = 0; i < MAX_LIGHTS; i++) {
      if (i >= lighting_uDirectionalLightCount) {
        break;
      }
      DirectionalLight directionalLight = lighting_uDirectionalLight[i];
      lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
    }
  }
  return lightColor;
}
`,ee={};function te(e){let{ambient:t=.35,diffuse:n=.6,shininess:r=32,specularColor:i=[30,30,30]}=e;return{lighting_uAmbient:t,lighting_uDiffuse:n,lighting_uShininess:r,lighting_uSpecularColor:i.map(e=>e/255)}}function T(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ee;if(!(`material`in e))return{};let{material:t}=e;return t?te(t):{lighting_uEnabled:!1}}var E={name:`gouraud-lighting`,dependencies:[C],vs:w,defines:{LIGHTING_VERTEX:1},getUniforms:T},ne={name:`phong-lighting`,dependencies:[C],fs:w,defines:{LIGHTING_FRAGMENT:1},getUniforms:T},re=`compositeLayer.renderLayers`,D=class extends m{get isComposite(){return!0}get isLoaded(){return super.isLoaded&&this.getSubLayers().every(e=>e.isLoaded)}getSubLayers(){return this.internalState&&this.internalState.subLayers||[]}initializeState(e){}setState(e){super.setState(e),this.setNeedsUpdate()}getPickingInfo({info:e}){let{object:t}=e;return t&&t.__source&&t.__source.parent&&t.__source.parent.id===this.id?(e.object=t.__source.object,e.index=t.__source.index,e):e}filterSubLayer(e){return!0}shouldRenderSubLayer(e,t){return t&&t.length}getSubLayerClass(e,t){let{_subLayerProps:n}=this.props;return n&&n[e]&&n[e].type||t}getSubLayerRow(e,t,n){return e.__source={parent:this,object:t,index:n},e}getSubLayerAccessor(e){if(typeof e==`function`){let t={index:-1,data:this.props.data,target:[]};return(n,r)=>n&&n.__source?(t.index=n.__source.index,e(n.__source.object,t)):e(n,r)}return e}getSubLayerProps(e={}){let{opacity:t,pickable:n,visible:r,parameters:i,getPolygonOffset:a,highlightedObjectIndex:o,autoHighlight:s,highlightColor:c,coordinateSystem:u,coordinateOrigin:d,wrapLongitude:f,positionFormat:p,modelMatrix:m,extensions:h,fetch:g,operation:_,_subLayerProps:v}=this.props,y={id:``,updateTriggers:{},opacity:t,pickable:n,visible:r,parameters:i,getPolygonOffset:a,highlightedObjectIndex:o,autoHighlight:s,highlightColor:c,coordinateSystem:u,coordinateOrigin:d,wrapLongitude:f,positionFormat:p,modelMatrix:m,extensions:h,fetch:g,operation:_},b=v&&e.id&&v[e.id],x=b&&b.updateTriggers,S=e.id||`sublayer`;if(b){let t=this.props[l],n=e.type?e.type._propTypes:{};for(let e in b){let r=n[e]||t[e];r&&r.type===`accessor`&&(b[e]=this.getSubLayerAccessor(b[e]))}}Object.assign(y,e,b),y.id=`${this.props.id}-${S}`,y.updateTriggers={all:this.props.updateTriggers?.all,...e.updateTriggers,...x};for(let e of h){let t=e.getSubLayerProps.call(this,e);t&&Object.assign(y,t,{updateTriggers:Object.assign(y.updateTriggers,t.updateTriggers)})}return y}_updateAutoHighlight(e){for(let t of this.getSubLayers())t.updateAutoHighlight(e)}_getAttributeManager(){return null}_postUpdate(e,t){let n=this.internalState.subLayers,r=!n||this.needsUpdate();r&&(n=c(this.renderLayers(),Boolean),this.internalState.subLayers=n),f(re,this,r,n);for(let e of n)e.parent=this}};r(D,`layerName`,`CompositeLayer`);var ie={CLOCKWISE:1,COUNTER_CLOCKWISE:-1};function ae(e,t,n={}){return oe(e,n)===t?!1:(ce(e,n),!0)}function oe(e,t={}){return Math.sign(se(e,t))}function se(e,t={}){let{start:n=0,end:r=e.length}=t,i=t.size||2,a=0;for(let t=n,o=r-i;t<r;t+=i)a+=(e[t]-e[o])*(e[t+1]+e[o+1]),o=t;return a/2}function ce(e,t){let{start:n=0,end:r=e.length,size:i=2}=t,a=(r-n)/i,o=Math.floor(a/2);for(let t=0;t<o;++t){let r=n+t*i,o=n+(a-1-t)*i;for(let t=0;t<i;++t){let n=e[r+t];e[r+t]=e[o+t],e[o+t]=n}}}var le=class extends u{constructor(e){let{id:t=a(`column-geometry`)}=e,{indices:n,attributes:r}=ue(e);super({...e,id:t,indices:n,attributes:r})}};function ue(e){let{radius:t,height:r=1,nradial:i=10}=e,{vertices:a}=e;a&&(n.assert(a.length>=i),a=a.flatMap(e=>[e[0],e[1]]),ae(a,ie.COUNTER_CLOCKWISE));let o=r>0,s=i+1,c=o?s*3+1:i,l=Math.PI*2/i,u=new Uint16Array(o?i*3*2:0),d=new Float32Array(c*3),f=new Float32Array(c*3),p=0;if(o){for(let e=0;e<s;e++){let n=e*l,o=e%i,s=Math.sin(n),c=Math.cos(n);for(let e=0;e<2;e++)d[p+0]=a?a[o*2]:c*t,d[p+1]=a?a[o*2+1]:s*t,d[p+2]=(1/2-e)*r,f[p+0]=a?a[o*2]:c,f[p+1]=a?a[o*2+1]:s,p+=3}d[p+0]=d[p-3],d[p+1]=d[p-2],d[p+2]=d[p-1],p+=3}for(let e=+!o;e<s;e++){let n=Math.floor(e/2)*Math.sign(.5-e%2),o=n*l,s=(n+i)%i,c=Math.sin(o),u=Math.cos(o);d[p+0]=a?a[s*2]:u*t,d[p+1]=a?a[s*2+1]:c*t,d[p+2]=r/2,f[p+2]=1,p+=3}if(o){let e=0;for(let t=0;t<i;t++)u[e++]=t*2+0,u[e++]=t*2+2,u[e++]=t*2+0,u[e++]=t*2+1,u[e++]=t*2+1,u[e++]=t*2+3}return{indices:u,attributes:{POSITION:{size:3,value:d},NORMAL:{size:3,value:f}}}}var de=`#version 300 es

#define SHADER_NAME column-layer-vertex-shader

in vec3 positions;
in vec3 normals;

in vec3 instancePositions;
in float instanceElevations;
in vec3 instancePositions64Low;
in vec4 instanceFillColors;
in vec4 instanceLineColors;
in float instanceStrokeWidths;

in vec3 instancePickingColors;
uniform float opacity;
uniform float radius;
uniform float angle;
uniform vec2 offset;
uniform bool extruded;
uniform bool stroked;
uniform bool isStroke;
uniform float coverage;
uniform float elevationScale;
uniform float edgeDistance;
uniform float widthScale;
uniform float widthMinPixels;
uniform float widthMaxPixels;
uniform int radiusUnits;
uniform int widthUnits;
out vec4 vColor;
#ifdef FLAT_SHADING
out vec4 position_commonspace;
#endif

void main(void) {
  geometry.worldPosition = instancePositions;

  vec4 color = isStroke ? instanceLineColors : instanceFillColors;
  mat2 rotationMatrix = mat2(cos(angle), sin(angle), -sin(angle), cos(angle));
  float elevation = 0.0;
  float strokeOffsetRatio = 1.0;

  if (extruded) {
    elevation = instanceElevations * (positions.z + 1.0) / 2.0 * elevationScale;
  } else if (stroked) {
    float widthPixels = clamp(
      project_size_to_pixel(instanceStrokeWidths * widthScale, widthUnits),
      widthMinPixels, widthMaxPixels) / 2.0;
    float halfOffset = project_pixel_size(widthPixels) / project_size(edgeDistance * coverage * radius);
    if (isStroke) {
      strokeOffsetRatio -= sign(positions.z) * halfOffset;
    } else {
      strokeOffsetRatio -= halfOffset;
    }
  }
  float shouldRender = float(color.a > 0.0 && instanceElevations >= 0.0);
  float dotRadius = radius * coverage * shouldRender;

  geometry.pickingColor = instancePickingColors;
  vec3 centroidPosition = vec3(instancePositions.xy, instancePositions.z + elevation);
  vec3 centroidPosition64Low = instancePositions64Low;
  vec2 offset = (rotationMatrix * positions.xy * strokeOffsetRatio + offset) * dotRadius;
  if (radiusUnits == UNIT_METERS) {
    offset = project_size(offset);
  }
  vec3 pos = vec3(offset, 0.);
  DECKGL_FILTER_SIZE(pos, geometry);

  gl_Position = project_position_to_clipspace(centroidPosition, centroidPosition64Low, pos, geometry.position);
  geometry.normal = project_normal(vec3(rotationMatrix * normals.xy, normals.z));
  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
  if (extruded && !isStroke) {
#ifdef FLAT_SHADING
    position_commonspace = geometry.position;
    vColor = vec4(color.rgb, color.a * opacity);
#else
    vec3 lightColor = lighting_getLightColor(color.rgb, project_uCameraPosition, geometry.position.xyz, geometry.normal);
    vColor = vec4(lightColor, color.a * opacity);
#endif
  } else {
    vColor = vec4(color.rgb, color.a * opacity);
  }
  DECKGL_FILTER_COLOR(vColor, geometry);
}
`,fe=`#version 300 es
#define SHADER_NAME column-layer-fragment-shader

precision highp float;

uniform vec3 project_uCameraPosition;
uniform bool extruded;
uniform bool isStroke;

out vec4 fragColor;

in vec4 vColor;
#ifdef FLAT_SHADING
in vec4 position_commonspace;
#endif

void main(void) {
  fragColor = vColor;
#ifdef FLAT_SHADING
  if (extruded && !isStroke && !picking_uActive) {
    vec3 normal = normalize(cross(dFdx(position_commonspace.xyz), dFdy(position_commonspace.xyz)));
    fragColor.rgb = lighting_getLightColor(vColor.rgb, project_uCameraPosition, position_commonspace.xyz, normal);
  }
#endif
  DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,O=[0,0,0,255],pe={diskResolution:{type:`number`,min:4,value:20},vertices:null,radius:{type:`number`,min:0,value:1e3},angle:{type:`number`,value:0},offset:{type:`array`,value:[0,0]},coverage:{type:`number`,min:0,max:1,value:1},elevationScale:{type:`number`,min:0,value:1},radiusUnits:`meters`,lineWidthUnits:`meters`,lineWidthScale:1,lineWidthMinPixels:0,lineWidthMaxPixels:2**53-1,extruded:!0,wireframe:!1,filled:!0,stroked:!1,getPosition:{type:`accessor`,value:e=>e.position},getFillColor:{type:`accessor`,value:O},getLineColor:{type:`accessor`,value:O},getLineWidth:{type:`accessor`,value:1},getElevation:{type:`accessor`,value:1e3},material:!0,getColor:{deprecatedFor:[`getFillColor`,`getLineColor`]}},k=class extends m{getShaders(){let{gl:e}=this.context,t=!i(e),n={},r=this.props.flatShading&&_(e,g.GLSL_DERIVATIVES);return r&&(n.FLAT_SHADING=1),super.getShaders({vs:de,fs:fe,defines:n,transpileToGLSL100:t,modules:[h,r?ne:E,p]})}initializeState(){this.getAttributeManager().addInstanced({instancePositions:{size:3,type:5130,fp64:this.use64bitPositions(),transition:!0,accessor:`getPosition`},instanceElevations:{size:1,transition:!0,accessor:`getElevation`},instanceFillColors:{size:this.props.colorFormat.length,type:5121,normalized:!0,transition:!0,accessor:`getFillColor`,defaultValue:O},instanceLineColors:{size:this.props.colorFormat.length,type:5121,normalized:!0,transition:!0,accessor:`getLineColor`,defaultValue:O},instanceStrokeWidths:{size:1,accessor:`getLineWidth`,transition:!0}})}updateState(e){super.updateState(e);let{props:t,oldProps:n,changeFlags:r}=e,i=r.extensionsChanged||t.flatShading!==n.flatShading;if(i){var a;let{gl:e}=this.context;(a=this.state.model)==null||a.delete(),this.state.model=this._getModel(e),this.getAttributeManager().invalidateAll()}(i||t.diskResolution!==n.diskResolution||t.vertices!==n.vertices||(t.extruded||t.stroked)!==(n.extruded||n.stroked))&&this._updateGeometry(t)}getGeometry(e,t,n){let r=new le({radius:1,height:n?2:0,vertices:t,nradial:e}),i=0;if(t)for(let n=0;n<e;n++){let r=t[n],a=Math.sqrt(r[0]*r[0]+r[1]*r[1]);i+=a/e}else i=1;return this.setState({edgeDistance:Math.cos(Math.PI/e)*i}),r}_getModel(e){return new o(e,{...this.getShaders(),id:this.props.id,isInstanced:!0})}_updateGeometry({diskResolution:e,vertices:t,extruded:n,stroked:r}){let i=this.getGeometry(e,t,n||r);this.setState({fillVertexCount:i.attributes.POSITION.value.length/3,wireframeVertexCount:i.indices.value.length}),this.state.model.setProps({geometry:i})}draw({uniforms:t}){let{lineWidthUnits:n,lineWidthScale:r,lineWidthMinPixels:i,lineWidthMaxPixels:a,radiusUnits:o,elevationScale:s,extruded:c,filled:l,stroked:u,wireframe:d,offset:f,coverage:p,radius:m,angle:h}=this.props,{model:g,fillVertexCount:_,wireframeVertexCount:v,edgeDistance:y}=this.state;g.setUniforms(t).setUniforms({radius:m,angle:h/180*Math.PI,offset:f,extruded:c,stroked:u,coverage:p,elevationScale:s,edgeDistance:y,radiusUnits:e[o],widthUnits:e[n],widthScale:r,widthMinPixels:i,widthMaxPixels:a}),c&&d&&(g.setProps({isIndexed:!0}),g.setVertexCount(v).setDrawMode(1).setUniforms({isStroke:!0}).draw()),l&&(g.setProps({isIndexed:!1}),g.setVertexCount(_).setDrawMode(5).setUniforms({isStroke:!1}).draw()),!c&&u&&(g.setProps({isIndexed:!1}),g.setVertexCount(_*2/3).setDrawMode(5).setUniforms({isStroke:!0}).draw())}};r(k,`layerName`,`ColumnLayer`),r(k,`defaultProps`,pe);var A={SUM:1,MEAN:2,MIN:3,MAX:4};function j(e,t){return e+t}function me(e,t){return t>e?t:e}function he(e,t){return t<e?t:e}function M(e,t){if(Number.isFinite(t))return e.length?t:null;let n=e.map(t).filter(Number.isFinite);return n.length?n.reduce(j,0)/n.length:null}function N(e,t){if(Number.isFinite(t))return e.length?e.length*t:null;let n=e.map(t).filter(Number.isFinite);return n.length?n.reduce(j,0):null}function P(e,t){if(Number.isFinite(t))return e.length?t:null;let n=e.map(t).filter(Number.isFinite);return n.length?n.reduce(me,-1/0):null}function F(e,t){if(Number.isFinite(t))return e.length?t:null;let n=e.map(t).filter(Number.isFinite);return n.length?n.reduce(he,1/0):null}function I(e,t,n){let r=A[e]||A.SUM;switch(t=L(t,n),r){case A.MIN:return e=>F(e,t);case A.SUM:return e=>N(e,t);case A.MEAN:return e=>M(e,t);case A.MAX:return e=>P(e,t);default:return null}}function L(e,t={}){return Number.isFinite(e)?e:n=>(t.index=n.index,e(n.source,t))}function R(e,t={}){return n=>(t.indices=n.map(e=>e.index),e(n.map(e=>e.source),t))}var ge=[[255,255,178],[254,217,118],[254,178,76],[253,141,60],[240,59,32],[189,0,38]];function _e(e,t=!1,n=Float32Array){let r;if(Number.isFinite(e[0]))r=new n(e);else{r=new n(e.length*4);let t=0;for(let n=0;n<e.length;n++){let i=e[n];r[t++]=i[0],r[t++]=i[1],r[t++]=i[2],r[t++]=Number.isFinite(i[3])?i[3]:255}}if(t)for(let e=0;e<r.length;e++)r[e]/=255;return r}function ve(e,t){let n={};for(let r in e)t.includes(r)||(n[r]=e[r]);return n}var z=class extends D{constructor(...e){super(...e),r(this,`state`,void 0)}initializeAggregationLayer(e){super.initializeState(this.context),this.setState({ignoreProps:ve(this.constructor._propTypes,e.data.props),dimensions:e})}updateState(e){super.updateState(e);let{changeFlags:t}=e;if(t.extensionsChanged){let e=this.getShaders({});e&&e.defines&&(e.defines.NON_INSTANCED_MODEL=1),this.updateShaders(e)}this._updateAttributes()}updateAttributes(e){this.setState({changedAttributes:e})}getAttributes(){return this.getAttributeManager().getShaderAttributes()}getModuleSettings(){let{viewport:e,mousePosition:n,gl:r}=this.context;return Object.assign(Object.create(this.props),{viewport:e,mousePosition:n,pickingActive:0,devicePixelRatio:t(r)})}updateShaders(e){}isAggregationDirty(e,t={}){let{props:n,oldProps:r,changeFlags:i}=e,{compareAll:a=!1,dimension:o}=t,{ignoreProps:s}=this.state,{props:c,accessors:l=[]}=o,{updateTriggersChanged:u}=i;if(i.dataChanged)return!0;if(u){if(u.all)return!0;for(let e of l)if(u[e])return!0}if(a)return i.extensionsChanged?!0:d({oldProps:r,newProps:n,ignoreProps:s,propTypes:this.constructor._propTypes});for(let e of c)if(n[e]!==r[e])return!0;return!1}isAttributeChanged(e){let{changedAttributes:t}=this.state;return e?t&&t[e]!==void 0:!ye(t)}_getAttributeManager(){return new s(this.context.gl,{id:this.props.id,stats:this.context.stats})}};r(z,`layerName`,`AggregationLayer`);function ye(e){let t=!0;for(let n in e){t=!1;break}return t}function B(e,t,n){let r=n;return r.domain=()=>e,r.range=()=>t,r}function V(e,t){return B(e,t,n=>De(e,t,n))}function be(e,t){return B(e,t,n=>Oe(e,t,n))}function xe(e,t){let n=e.sort(H),r=0,i=Math.max(1,t.length),a=Array(i-1);for(;++r<i;)a[r-1]=Se(n,r/i);let o=e=>we(a,t,e);return o.thresholds=()=>a,B(e,t,o)}function H(e,t){return e-t}function Se(e,t){let n=e.length;if(t<=0||n<2)return e[0];if(t>=1)return e[n-1];let r=(n-1)*t,i=Math.floor(r),a=e[i];return a+(e[i+1]-a)*(r-i)}function Ce(e,t){let n=0,r=e.length;for(;n<r;){let i=n+r>>>1;H(e[i],t)>0?r=i:n=i+1}return n}function we(e,t,n){return t[Ce(e,n)]}function Te(e,t,n,r){let i=`${r}`,a=t.get(i);return a===void 0&&(a=e.push(r),t.set(i,a)),n[(a-1)%n.length]}function Ee(e,t){let n=new Map,r=[];for(let t of e){let e=`${t}`;n.has(e)||n.set(e,r.push(t))}return B(e,t,e=>Te(r,n,t,e))}function De(e,t,r){let i=e[1]-e[0];if(i<=0)return n.warn(`quantizeScale: invalid domain, returning range[0]`)(),t[0];let a=i/t.length,o=Math.floor((r-e[0])/a);return t[Math.max(Math.min(o,t.length-1),0)]}function Oe(e,t,n){return(n-e[0])/(e[1]-e[0])*(t[1]-t[0])+t[0]}function U(e){return e!=null}function ke(e){let t=[];return e.forEach(e=>{!t.includes(e)&&U(e)&&t.push(e)}),t}function W(e,t){return(typeof t==`function`?e.map(t):e).filter(U)}function Ae(e,t){return W(e,t)}function je(e,t){return ke(W(e,t))}function Me(e,t,n){return Math.max(t,Math.min(n,e))}function Ne(e){switch(e){case`quantize`:return V;case`linear`:return be;case`quantile`:return xe;case`ordinal`:return Ee;default:return V}}var G=e=>e.length,Pe=3402823466e29,K=e=>e.points,q=e=>e.index,J=(e,t)=>e<t?-1:e>t?1:e>=t?0:NaN,Y={getValue:G,getPoints:K,getIndex:q,filterData:null},X=class{constructor(e=[],t=Y){r(this,`maxCount`,void 0),r(this,`maxValue`,void 0),r(this,`minValue`,void 0),r(this,`totalCount`,void 0),r(this,`aggregatedBins`,void 0),r(this,`sortedBins`,void 0),r(this,`binMap`,void 0),this.aggregatedBins=this.getAggregatedBins(e,t),this._updateMinMaxValues(),this.binMap=this.getBinMap()}getAggregatedBins(e,t){let{getValue:n=G,getPoints:r=K,getIndex:i=q,filterData:a}=t,o=typeof a==`function`,s=e.length,c=[],l=0;for(let t=0;t<s;t++){let s=e[t],u=r(s),d=i(s),f=o?u.filter(a):u;s.filteredPoints=o?f:null;let p=f.length?n(f):null;p!=null&&(c[l]={i:Number.isFinite(d)?d:t,value:p,counts:f.length},l++)}return c}_percentileToIndex(e){let t=this.sortedBins.length;if(t<2)return[0,0];let[n,r]=e.map(e=>Me(e,0,100));return[Math.ceil(n/100*(t-1)),Math.floor(r/100*(t-1))]}getBinMap(){let e={};for(let t of this.aggregatedBins)e[t.i]=t;return e}_updateMinMaxValues(){let e=0,t=0,n=Pe,r=0;for(let i of this.aggregatedBins)e=e>i.counts?e:i.counts,t=t>i.value?t:i.value,n=n<i.value?n:i.value,r+=i.counts;this.maxCount=e,this.maxValue=t,this.minValue=n,this.totalCount=r}getValueRange(e){if(this.sortedBins||=this.aggregatedBins.sort((e,t)=>J(e.value,t.value)),!this.sortedBins.length)return[];let t=0,n=this.sortedBins.length-1;if(Array.isArray(e)){let r=this._percentileToIndex(e);t=r[0],n=r[1]}return[this.sortedBins[t].value,this.sortedBins[n].value]}getValueDomainByScale(e,[t=0,n=100]=[]){if(this.sortedBins||=this.aggregatedBins.sort((e,t)=>J(e.value,t.value)),!this.sortedBins.length)return[];let r=this._percentileToIndex([t,n]);return this._getScaleDomain(e,r)}_getScaleDomain(e,[t,n]){let r=this.sortedBins;switch(e){case`quantize`:case`linear`:return[r[t].value,r[n].value];case`quantile`:return Ae(r.slice(t,n+1),e=>e.value);case`ordinal`:return je(r,e=>e.value);default:return[r[t].value,r[n].value]}}};function Z(){}var Q=[`getBins`,`getDomain`,`getScaleFunc`],$=[{key:`fillColor`,accessor:`getFillColor`,pickingInfo:`colorValue`,getBins:{triggers:{value:{prop:`getColorValue`,updateTrigger:`getColorValue`},weight:{prop:`getColorWeight`,updateTrigger:`getColorWeight`},aggregation:{prop:`colorAggregation`},filterData:{prop:`_filterData`,updateTrigger:`_filterData`}}},getDomain:{triggers:{lowerPercentile:{prop:`lowerPercentile`},upperPercentile:{prop:`upperPercentile`},scaleType:{prop:`colorScaleType`}}},getScaleFunc:{triggers:{domain:{prop:`colorDomain`},range:{prop:`colorRange`}},onSet:{props:`onSetColorDomain`}},nullValue:[0,0,0,0]},{key:`elevation`,accessor:`getElevation`,pickingInfo:`elevationValue`,getBins:{triggers:{value:{prop:`getElevationValue`,updateTrigger:`getElevationValue`},weight:{prop:`getElevationWeight`,updateTrigger:`getElevationWeight`},aggregation:{prop:`elevationAggregation`},filterData:{prop:`_filterData`,updateTrigger:`_filterData`}}},getDomain:{triggers:{lowerPercentile:{prop:`elevationLowerPercentile`},upperPercentile:{prop:`elevationUpperPercentile`},scaleType:{prop:`elevationScaleType`}}},getScaleFunc:{triggers:{domain:{prop:`elevationDomain`},range:{prop:`elevationRange`}},onSet:{props:`onSetElevationDomain`}},nullValue:-1}],Fe=e=>e.cellSize,Ie=class{constructor(e){this.state={layerData:{},dimensions:{}},this.changeFlags={},this.dimensionUpdaters={},this._getCellSize=e.getCellSize||Fe,this._getAggregator=e.getAggregator,this._addDimension(e.dimensions||$)}static defaultDimensions(){return $}updateState(e,t){let{oldProps:n,props:r,changeFlags:i}=e;this.updateGetValueFuncs(n,r,i);let a=this.needsReProjectPoints(n,r,i),o=!1;return i.dataChanged||a?(this.getAggregatedData(r,t),o=!0):((this.getDimensionChanges(n,r,i)||[]).forEach(e=>typeof e==`function`&&e()),o=!0),this.setState({aggregationDirty:o}),this.state}setState(e){this.state={...this.state,...e}}setDimensionState(e,t){this.setState({dimensions:{...this.state.dimensions,[e]:{...this.state.dimensions[e],...t}}})}normalizeResult(e={}){return e.hexagons?{data:e.hexagons,...e}:e.layerData?{data:e.layerData,...e}:e}getAggregatedData(e,t){let n=this._getAggregator(e)(e,t);this.setState({layerData:this.normalizeResult(n)}),this.changeFlags={layerData:!0},this.getSortedBins(e)}updateGetValueFuncs(e,t,n){for(let r in this.dimensionUpdaters){let{value:i,weight:a,aggregation:o}=this.dimensionUpdaters[r].getBins.triggers,s=t[i.prop];this.needUpdateDimensionStep(this.dimensionUpdaters[r].getBins,e,t,n)&&(s=s?R(s,{data:t.data}):I(t[o.prop],t[a.prop],{data:t.data})),s&&this.setDimensionState(r,{getValue:s})}}needsReProjectPoints(e,t,n){return this._getCellSize(e)!==this._getCellSize(t)||this._getAggregator(e)!==this._getAggregator(t)||n.updateTriggersChanged&&(n.updateTriggersChanged.all||n.updateTriggersChanged.getPosition)}addDimension(e){this._addDimension(e)}_addDimension(e=[]){e.forEach(e=>{let{key:t}=e;this.dimensionUpdaters[t]=this.getDimensionUpdaters(e),this.state.dimensions[t]={getValue:null,domain:null,sortedBins:null,scaleFunc:Z}})}getDimensionUpdaters({key:e,accessor:t,pickingInfo:n,getBins:r,getDomain:i,getScaleFunc:a,nullValue:o}){return{key:e,accessor:t,pickingInfo:n,getBins:{updater:this.getDimensionSortedBins,...r},getDomain:{updater:this.getDimensionValueDomain,...i},getScaleFunc:{updater:this.getDimensionScale,...a},attributeAccessor:this.getSubLayerDimensionAttribute(e,o)}}needUpdateDimensionStep(e,t,n,r){return Object.values(e.triggers).some(e=>e.updateTrigger?r.dataChanged||r.updateTriggersChanged&&(r.updateTriggersChanged.all||r.updateTriggersChanged[e.updateTrigger]):t[e.prop]!==n[e.prop])}getDimensionChanges(e,t,n){let r=[];for(let i in this.dimensionUpdaters){let a=Q.find(r=>this.needUpdateDimensionStep(this.dimensionUpdaters[i][r],e,t,n));a&&r.push(this.dimensionUpdaters[i][a].updater.bind(this,t,this.dimensionUpdaters[i]))}return r.length?r:null}getUpdateTriggers(e){let t=e.updateTriggers||{},n={};for(let r in this.dimensionUpdaters){let{accessor:i}=this.dimensionUpdaters[r];n[i]={},Q.forEach(a=>{Object.values(this.dimensionUpdaters[r][a].triggers).forEach(({prop:r,updateTrigger:a})=>{if(a){let e=t[a];typeof e==`object`&&!Array.isArray(e)?Object.assign(n[i],e):e!==void 0&&(n[i][r]=e)}else n[i][r]=e[r]})})}return n}getSortedBins(e){for(let t in this.dimensionUpdaters)this.getDimensionSortedBins(e,this.dimensionUpdaters[t])}getDimensionSortedBins(e,t){let{key:n}=t,{getValue:r}=this.state.dimensions[n],i=new X(this.state.layerData.data||[],{getValue:r,filterData:e._filterData});this.setDimensionState(n,{sortedBins:i}),this.getDimensionValueDomain(e,t)}getDimensionValueDomain(e,t){let{getDomain:n,key:r}=t,{triggers:{lowerPercentile:i,upperPercentile:a,scaleType:o}}=n,s=this.state.dimensions[r].sortedBins.getValueDomainByScale(e[o.prop],[e[i.prop],e[a.prop]]);this.setDimensionState(r,{valueDomain:s}),this.getDimensionScale(e,t)}getDimensionScale(e,t){let{key:n,getScaleFunc:r,getDomain:i}=t,{domain:a,range:o}=r.triggers,{scaleType:s}=i.triggers,{onSet:c}=r,l=e[o.prop],u=e[a.prop]||this.state.dimensions[n].valueDomain,d=Ne(s&&e[s.prop])(u,l);typeof c==`object`&&typeof e[c.props]==`function`&&e[c.props](d.domain()),this.setDimensionState(n,{scaleFunc:d})}getSubLayerDimensionAttribute(e,t){return n=>{let{sortedBins:r,scaleFunc:i}=this.state.dimensions[e],a=r.binMap[n.index];if(a&&a.counts===0)return t;let o=a&&a.value,s=i.domain();return o>=s[0]&&o<=s[s.length-1]?i(o):t}}getSubLayerAccessors(e){let t={};for(let n in this.dimensionUpdaters){let{accessor:r}=this.dimensionUpdaters[n];t[r]=this.getSubLayerDimensionAttribute(e,n)}return t}getPickingInfo({info:e}){let t=e.picked&&e.index>-1,n=null;if(t){let t=this.state.layerData.data[e.index],r={};for(let e in this.dimensionUpdaters){let{pickingInfo:n}=this.dimensionUpdaters[e],{sortedBins:i}=this.state.dimensions[e];r[n]=i.binMap[t.index]&&i.binMap[t.index].value}n=Object.assign(r,t,{points:t.filteredPoints||t.points})}return e.picked=!!n,e.object=n,e}getAccessor(e){return this.dimensionUpdaters.hasOwnProperty(e)?this.dimensionUpdaters[e].attributeAccessor:Z}};export{ge as a,D as c,_e as i,E as l,X as n,A as o,z as r,k as s,Ie as t};