/* All public resources are local and relative to this document, including on Pages subpaths. */
(() => {
  'use strict';
  const views = new Map();
  const status = document.getElementById('runtime-status');
  const navigation = document.querySelector('.story-nav');
  const chapters = [...document.querySelectorAll('main > .chapter')];
  let chapterObserver;
  function trackChapters() {
    const offset = Math.ceil(navigation.getBoundingClientRect().height) + 24;
    document.documentElement.style.setProperty('--chapter-offset', `${offset}px`);
    const update = () => {
      const current = chapters.find(chapter => {
        const box = chapter.getBoundingClientRect();
        return box.top <= offset + 1 && box.bottom > offset + 1;
      });
      for (const link of navigation.querySelectorAll('a')) {
        if (current && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    };
    chapterObserver?.disconnect();
    chapterObserver = new IntersectionObserver(update, {
      rootMargin: `-${offset}px 0px -${Math.max(0, innerHeight - offset - 2)}px 0px`
    });
    chapters.forEach(chapter => chapterObserver.observe(chapter));
    update();
  }
  new ResizeObserver(trackChapters).observe(navigation);
  async function fetchOK(url) {
    const response = await fetch(url, {cache: 'no-cache'});
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
    return response;
  }
  const resources = new Map();
  function loadResource(url) {
    if (!resources.has(url)) resources.set(url, fetchOK(url).then(response => response.text()));
    return resources.get(url);
  }
  function dataUrls(value, urls = new Set()) {
    if (value && typeof value === 'object') {
      for (const [key, child] of Object.entries(value)) {
        if (key === 'url' && typeof child === 'string') urls.add(child);
        else dataUrls(child, urls);
      }
    }
    return urls;
  }
  async function checkResources(spec) {
    await Promise.all([...dataUrls(spec)].map(async url => {
      const text = await loadResource(url);
      if (url.endsWith('.csv') && window.vega.read(text, {type:'csv'}).length === 0) throw new Error(`No data rows in ${url}`);
      if (/\.(json|geojson)$/.test(url)) {
        const data = JSON.parse(text);
        if (data.type === 'FeatureCollection' && !data.features.length) throw new Error(`No geographic features in ${url}`);
      }
    }));
  }
  function fail(node,error) {
    node.dataset.chartState='error';node.setAttribute('aria-busy','false');
    const p=document.createElement('p');p.className='chart-error';p.textContent=`This chart could not load. ${error.message || error} Reload the page to retry.`;node.replaceChildren(p);
  }
  async function render(chart) {
    const node=document.getElementById(chart.id);node.dataset.chartState='loading';node.setAttribute('aria-busy','true');
    const loading=document.createElement('p');loading.className='chart-loading';loading.textContent='Loading chart…';
    const skeleton=document.createElement('div');skeleton.className='chart-skeleton';skeleton.setAttribute('aria-hidden','true');
    node.replaceChildren(loading,skeleton);
    try {
      const spec=await (await fetchOK(chart.spec)).json();
      await checkResources(spec);
      node.replaceChildren();
      // Vega treemap uses explicit dimensions; Vega-Lite handles container width itself.
      if(spec.$schema.includes('/vega/'))spec.width=Math.floor(node.clientWidth);
      const loader=window.vega.loader();loader.load=url=>loadResource(url);
      const result=await window.vegaEmbed(node,spec,{actions:true,renderer:'svg',tooltip:true,loader});views.set(chart.id,result);
      node.dataset.chartState='rendered';return true;
    }catch(error){console.error(chart.spec,error);fail(node,error);return false;}
    finally{node.setAttribute('aria-busy','false');}
  }
  async function start(){
    if(typeof window.vegaEmbed!=='function'){status.textContent='The local chart library could not load. Reload to retry.';for(const node of document.querySelectorAll('.vis'))fail(node,new Error('Chart library unavailable'));return;}
    await document.fonts.ready;
    try{const manifest=await (await fetchOK('specs/index.json')).json();let next=0;
      await Promise.all(Array.from({length:3},async()=>{while(next<manifest.length){await render(manifest[next++]);}}));
      window.__dv2Views=views;window.__dv2Ready=true;
    }catch(error){status.textContent=`The chart index could not load: ${error.message}`;for(const node of document.querySelectorAll('.vis'))fail(node,error);}
  }
  let resizeTimer;
  window.addEventListener('resize',()=>{trackChapters();clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{for(const [id,result] of views){// Force propagation when the new outer width equals the previous inner plot width.
        const width=document.getElementById(id).clientWidth;
        result.view.signal('width',width,{force:true});
        if(id==='vis09')result.view.signal('height',width,{force:true});
        result.view.resize().runAsync();}},100);});
  window.addEventListener('beforeunload',()=>{for(const result of views.values())result.finalize();});
  start();
})();
