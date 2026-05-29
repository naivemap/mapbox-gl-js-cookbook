import{b as e,f as t,h as n,l as r,t as i,u as a,v as o}from"./app-BAsgGhKa.js";var s=JSON.parse(`{"path":"/example/starter-standard-style-model.html","title":"","lang":"zh-CN","frontmatter":{},"git":{"updatedTime":1720189011000,"contributors":[{"name":"huanglii","username":"huanglii","email":"naivemap@163.com","commits":1,"url":"https://github.com/huanglii"}],"changelog":[{"hash":"dc8dde5e7f977b3d927b232a6b53d6cfc4c7bb6e","time":1720189011000,"email":"naivemap@163.com","author":"huanglii","message":"bump mapbox-gl to 3.5.0","tag":"v2.0.0"}]},"filePathRelative":"example/starter-standard-style-model.md"}`),c={name:`starter-standard-style-model.md`};function l(i,s,c,l,u,d){let f=o(`common-code-view`),p=o(`ClientOnly`);return n(),r(`div`,null,[t(p,null,{default:e(()=>[t(f,{name:`starter-standard-style-model1`,"is-code-view":!1})]),_:1}),s[0]||=a(`<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre><code class="language-vue"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>base-map</span> <span class="token attr-name">:map-options</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>mapOptions<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@load</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>handleMapLoaded<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">import</span> BaseMap <span class="token keyword">from</span> <span class="token string">&#39;../../base-map.vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token literal-property property">mapOptions</span><span class="token operator">:</span> Omit<span class="token operator">&lt;</span>mapboxgl<span class="token punctuation">.</span>MapboxOptions<span class="token punctuation">,</span> <span class="token string">&#39;container&#39;</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token string-property property">&quot;pitch&quot;</span><span class="token operator">:</span> <span class="token number">60</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token string-property property">&quot;bearing&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token string-property property">&quot;zoom&quot;</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token string-property property">&quot;center&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token operator">-</span><span class="token number">122.40784</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token number">37.78432</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">style</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token string-property property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">&quot;metadata&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string-property property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token string-property property">&quot;height&quot;</span><span class="token operator">:</span> <span class="token number">512</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">&quot;allowed&quot;</span><span class="token operator">:</span> <span class="token number">0.0015</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">&quot;operations&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">          <span class="token punctuation">[</span><span class="token string">&quot;setPaintProperty&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;tree-layer&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;model-color-mix-intensity&quot;</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token punctuation">[</span><span class="token string">&quot;wait&quot;</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">&quot;sources&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string-property property">&quot;mapbox&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token string-property property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vector&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">&quot;url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;mapbox://mapbox.mapbox-streets-v8&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string-property property">&quot;trees&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token string-property property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;geojson&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http://localhost:8080/mapbox-gl-js-cookbook/data/trees.geojson&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">&quot;transition&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string-property property">&quot;duration&quot;</span><span class="token operator">:</span> <span class="token number">0</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">&quot;models&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string-property property">&quot;pine1-lod1&quot;</span><span class="token operator">:</span> <span class="token string">&quot;mapbox://models/mapbox/pine1-lod1.glb&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token comment">// &quot;tree&quot;: &quot;http://localhost:8080/mapbox-gl-js-cookbook/data/tree-metallic.glb&quot;,</span></span>
<span class="line">      <span class="token comment">// &quot;tree-diffuse&quot;: &quot;http://localhost:8080/mapbox-gl-js-cookbook/data/tree-no-material.glb&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// &quot;light&quot;: {</span></span>
<span class="line">    <span class="token comment">//   &quot;intensity&quot;: 1,</span></span>
<span class="line">    <span class="token comment">//   &quot;position&quot;: [1, 110, 90],</span></span>
<span class="line">    <span class="token comment">//   &quot;anchor&quot;: &quot;map&quot;</span></span>
<span class="line">    <span class="token comment">// },</span></span>
<span class="line">    <span class="token comment">// &quot;fog&quot;: {</span></span>
<span class="line">    <span class="token comment">//   &quot;range&quot;: [-1.5, 3.0]</span></span>
<span class="line">    <span class="token comment">// },</span></span>
<span class="line">    <span class="token string-property property">&quot;layers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token string-property property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;background&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;background&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">&quot;paint&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token string-property property">&quot;background-color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#aaaaaa&quot;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token string-property property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;3d-buildings&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">&quot;source&quot;</span><span class="token operator">:</span> <span class="token string">&quot;mapbox&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">&quot;paint&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token string-property property">&quot;fill-extrusion-opacity&quot;</span><span class="token operator">:</span> <span class="token number">0.7</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string-property property">&quot;fill-extrusion-color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;white&quot;</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string-property property">&quot;fill-extrusion-height&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">            <span class="token string">&quot;number&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">[</span></span>
<span class="line">              <span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span></span>
<span class="line">              <span class="token string">&quot;height&quot;</span></span>
<span class="line">            <span class="token punctuation">]</span></span>
<span class="line">          <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string-property property">&quot;fill-extrusion-base&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">            <span class="token string">&quot;number&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">[</span></span>
<span class="line">              <span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span></span>
<span class="line">              <span class="token string">&quot;min_height&quot;</span></span>
<span class="line">            <span class="token punctuation">]</span></span>
<span class="line">          <span class="token punctuation">]</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">&quot;filter&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">          <span class="token string">&quot;==&quot;</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token punctuation">[</span></span>
<span class="line">            <span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">&quot;extrude&quot;</span></span>
<span class="line">          <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string">&quot;true&quot;</span></span>
<span class="line">        <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">&quot;source-layer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;building&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;fill-extrusion&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">handleMapLoaded</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">map</span><span class="token operator">:</span> mapboxgl<span class="token punctuation">.</span>Map</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  map<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token parameter">e</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>lngLat<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">  map<span class="token punctuation">.</span><span class="token function">addSource</span><span class="token punctuation">(</span><span class="token string">&#39;point&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;geojson&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;FeatureCollection&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">features</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Feature&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">properties</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">geometry</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Point&#39;</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token literal-property property">coordinates</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">122.409721</span><span class="token punctuation">,</span> <span class="token number">37.782875</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">  map<span class="token punctuation">.</span><span class="token function">addLayer</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&#39;point-with-model&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;model&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">source</span><span class="token operator">:</span> <span class="token string">&#39;point&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">layout</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string-property property">&#39;model-id&#39;</span><span class="token operator">:</span> <span class="token string">&#39;pine1-lod1&#39;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">&quot;paint&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string-property property">&quot;model-scale&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">20.0</span><span class="token punctuation">,</span> <span class="token number">20.0</span><span class="token punctuation">,</span> <span class="token number">70.0</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token comment">// &quot;model-rotation&quot;: [&quot;match&quot;, [&quot;%&quot;, [&quot;get&quot;, &quot;id&quot;], 4],</span></span>
<span class="line">      <span class="token comment">//   0, [&quot;literal&quot;, [0.0, 0.0, 0.0]],</span></span>
<span class="line">      <span class="token comment">//   1, [&quot;literal&quot;, [0.0, 0.0, 60.0]],</span></span>
<span class="line">      <span class="token comment">//   2, [&quot;literal&quot;, [10.0, 0.0, 180.0]],</span></span>
<span class="line">      <span class="token comment">//   [&quot;literal&quot;, [0.0, -3.0, -90]]],</span></span>
<span class="line">      <span class="token comment">// &quot;model-color&quot;: &quot;red&quot;,</span></span>
<span class="line">      <span class="token comment">// &quot;model-color-mix-intensity&quot;: 1.0</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token comment">// map.setConfigProperty(&#39;basemap&#39;, &#39;showPointOfInterestLabels&#39;, false)</span></span>
<span class="line">  <span class="token comment">// map.setConfigProperty(&#39;basemap&#39;, &#39;showPlaceLabels&#39;, false)</span></span>
<span class="line">  <span class="token comment">// map.setConfigProperty(&#39;basemap&#39;, &#39;showRoadLabels&#39;, false)</span></span>
<span class="line">  <span class="token comment">// map.setConfigProperty(&#39;basemap&#39;, &#39;showTransitLabels&#39;, false)</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// map.addSource(&#39;point&#39;, {</span></span>
<span class="line">  <span class="token comment">//   type: &#39;geojson&#39;,</span></span>
<span class="line">  <span class="token comment">//   data: {</span></span>
<span class="line">  <span class="token comment">//     type: &#39;FeatureCollection&#39;,</span></span>
<span class="line">  <span class="token comment">//     features: [{</span></span>
<span class="line">  <span class="token comment">//       type: &#39;Feature&#39;,</span></span>
<span class="line">  <span class="token comment">//       properties: { id: 1 },</span></span>
<span class="line">  <span class="token comment">//       geometry: {</span></span>
<span class="line">  <span class="token comment">//         type: &#39;Point&#39;,</span></span>
<span class="line">  <span class="token comment">//         coordinates: [2.2944, 48.8615],</span></span>
<span class="line">  <span class="token comment">//       }</span></span>
<span class="line">  <span class="token comment">//     }]</span></span>
<span class="line">  <span class="token comment">//   }</span></span>
<span class="line">  <span class="token comment">// })</span></span>
<span class="line">  <span class="token comment">// map.addLayer({</span></span>
<span class="line">  <span class="token comment">//   id: &#39;point-with-model&#39;,</span></span>
<span class="line">  <span class="token comment">//   type: &#39;model&#39;,</span></span>
<span class="line">  <span class="token comment">//   source: &#39;point&#39;,</span></span>
<span class="line">  <span class="token comment">//   layout: {</span></span>
<span class="line">  <span class="token comment">//     &#39;model-id&#39;: &#39;maple1-lod1&#39;</span></span>
<span class="line">  <span class="token comment">//   },</span></span>
<span class="line">  <span class="token comment">//   &quot;paint&quot;: {</span></span>
<span class="line">  <span class="token comment">//     &quot;model-scale&quot;: [70.0, 50.0, 50.0],</span></span>
<span class="line">  <span class="token comment">//     &quot;model-rotation&quot;: [&quot;match&quot;, [&quot;%&quot;, [&quot;get&quot;, &quot;id&quot;], 4],</span></span>
<span class="line">  <span class="token comment">//       0, [&quot;literal&quot;, [0.0, 0.0, 0.0]],</span></span>
<span class="line">  <span class="token comment">//       1, [&quot;literal&quot;, [0.0, 0.0, 60.0]],</span></span>
<span class="line">  <span class="token comment">//       2, [&quot;literal&quot;, [10.0, 0.0, 180.0]],</span></span>
<span class="line">  <span class="token comment">//       [&quot;literal&quot;, [0.0, -3.0, -90]]],</span></span>
<span class="line">  <span class="token comment">//     &quot;model-color&quot;: &quot;red&quot;,</span></span>
<span class="line">  <span class="token comment">//     &quot;model-color-mix-intensity&quot;: 1.0</span></span>
<span class="line">  <span class="token comment">//   }</span></span>
<span class="line">  <span class="token comment">// })</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)])}var u=i(c,[[`render`,l]]);export{s as _pageData,u as default};