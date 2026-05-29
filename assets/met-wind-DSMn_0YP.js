import{b as e,f as t,h as n,l as r,t as i,u as a,v as o}from"./app-BAsgGhKa.js";var s=JSON.parse(`{"path":"/example/met-wind.html","title":"","lang":"zh-CN","frontmatter":{},"git":{"updatedTime":1631424814000,"contributors":[{"name":"黄俐","username":"","email":"li.huangli@qq.com","commits":2}],"changelog":[{"hash":"b1b689a83a6fd54ce02da4ef833162bd960f5425","time":1631424814000,"email":"li.huangli@qq.com","author":"黄俐","message":"2.0.0"},{"hash":"08cce466ec5154c177f801a2f7aa1710c130b489","time":1627797509000,"email":"li.huangli@qq.com","author":"黄俐","message":"增加风场"}]},"filePathRelative":"example/met-wind.md"}`),c={name:`met-wind.md`};function l(i,s,c,l,u,d){let f=o(`common-code-view`),p=o(`ClientOnly`);return n(),r(`div`,null,[t(p,null,{default:e(()=>[t(f,{name:`met-wind`,"is-code-view":!1})]),_:1}),s[0]||=a(`<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token comment">// import { WindLayer } from &#39;@sakitam-gis/mapbox-wind&#39;</span></span>
<span class="line"><span class="token comment">// import windData from &#39;./data/wind.json&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// const data = windData.map((item, idx) =&gt; {</span></span>
<span class="line"><span class="token comment">//   item.header = Object.assign(item.header, {</span></span>
<span class="line"><span class="token comment">//     parameterCategory: 1,</span></span>
<span class="line"><span class="token comment">//     parameterNumber: idx === 0 ? 2 : 3</span></span>
<span class="line"><span class="token comment">//   })</span></span>
<span class="line"><span class="token comment">//   return item</span></span>
<span class="line"><span class="token comment">// })</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// const addWindLayer = (map) =&gt; {</span></span>
<span class="line"><span class="token comment">//   const windLayer = new WindLayer(&#39;wind&#39;, data, {</span></span>
<span class="line"><span class="token comment">//     windOptions: {</span></span>
<span class="line"><span class="token comment">//       globalAlpha: 0.9,</span></span>
<span class="line"><span class="token comment">//       velocityScale: 0.02,</span></span>
<span class="line"><span class="token comment">//       paths: 4000,</span></span>
<span class="line"><span class="token comment">//       minVelocity: 0,</span></span>
<span class="line"><span class="token comment">//       maxVelocity: 10,</span></span>
<span class="line"><span class="token comment">//       colorScale: [</span></span>
<span class="line"><span class="token comment">//         &#39;rgb(36,104, 180)&#39;,</span></span>
<span class="line"><span class="token comment">//         &#39;rgb(60,157, 194)&#39;,</span></span>
<span class="line"><span class="token comment">//         &#39;rgb(128,205,193 )&#39;,</span></span>
<span class="line"><span class="token comment">//         &#39;rgb(151,218,168 )&#39;,</span></span>
<span class="line"><span class="token comment">//         &#39;rgb(198,231,181)&#39;,</span></span>
<span class="line"><span class="token comment">//         &#39;rgb(238,247,217)&#39;,</span></span>
<span class="line"><span class="token comment">//         &#39;rgb(255,238,159)&#39;,</span></span>
<span class="line"><span class="token comment">//         &#39;rgb(252,217,125)&#39;,</span></span>
<span class="line"><span class="token comment">//         &#39;rgb(255,182,100)&#39;,</span></span>
<span class="line"><span class="token comment">//         &#39;rgb(252,150,75)&#39;,</span></span>
<span class="line"><span class="token comment">//         &#39;rgb(250,112,52)&#39;,</span></span>
<span class="line"><span class="token comment">//         &#39;rgb(245,64,32)&#39;,</span></span>
<span class="line"><span class="token comment">//         &#39;rgb(237,45,28)&#39;,</span></span>
<span class="line"><span class="token comment">//         &#39;rgb(220,24,32)&#39;,</span></span>
<span class="line"><span class="token comment">//         &#39;rgb(180,0,35)&#39;</span></span>
<span class="line"><span class="token comment">//       ]</span></span>
<span class="line"><span class="token comment">//     }</span></span>
<span class="line"><span class="token comment">//   })</span></span>
<span class="line"><span class="token comment">//   map.addLayer(windLayer)</span></span>
<span class="line"><span class="token comment">// }</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// export default addWindLayer</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)])}var u=i(c,[[`render`,l]]);export{s as _pageData,u as default};