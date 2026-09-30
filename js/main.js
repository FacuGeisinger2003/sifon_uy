(function(){
  const C = window.SIFON_CONFIG || {};
  const WHATSAPP = (C.whatsapp || '').replace(/\D/g,'');

  // Datos de contacto desde config.js
  const setDato=(id,v)=>{const el=document.getElementById(id); if(el && v) el.textContent=v;};
  setDato('igDato', C.instagram ? '@'+C.instagram.replace(/^@/,'') : '');
  setDato('waDato', C.whatsappVisible || '');
  setDato('mailDato', C.email || '');

  // Menú móvil
  const nav=document.getElementById('nav'), menuBtn=document.getElementById('menuBtn');
  menuBtn.addEventListener('click',()=>{const a=nav.classList.toggle('abierto');menuBtn.setAttribute('aria-expanded',a)});
  document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('abierto');menuBtn.setAttribute('aria-expanded','false')}));

  // Marquesina: duplicar para loop continuo
  const pista=document.getElementById('pista'); pista.innerHTML+=pista.innerHTML;

  // Sifón interactivo
  const escena=document.querySelector('.escena'), btn=document.getElementById('sifonBtn');
  const liquido=document.getElementById('liquido'), burbujas=document.getElementById('burbujas'), cont=document.getElementById('chorritos');
  let n=0, nivel=300, ocupado=false;
  const NS='http://www.w3.org/2000/svg';
  btn.addEventListener('click',()=>{
    if(ocupado) return; ocupado=true;
    escena.classList.remove('apretado'); void escena.offsetWidth; escena.classList.add('apretado');
    n++; cont.textContent=n;
    nivel = nivel<=252 ? 300 : nivel-12;
    liquido.setAttribute('y',nivel); liquido.setAttribute('height',390-nivel);
    for(let i=0;i<9;i++){
      const c=document.createElementNS(NS,'circle');
      c.setAttribute('cx',270+Math.random()*64); c.setAttribute('cy',360-Math.random()*20);
      c.setAttribute('r',2+Math.random()*3); c.setAttribute('fill','#FFFDF7'); c.setAttribute('opacity','.85');
      c.setAttribute('class','burbuja'); c.style.animationDelay=(0.3+Math.random()*0.5)+'s';
      burbujas.appendChild(c); setTimeout(()=>c.remove(),2600);
    }
    setTimeout(()=>{escena.classList.remove('apretado');ocupado=false},950);
  });

  // Fichas de recetas
  const recetas=C.recetas||{};
  const pend=v=>/^\[/.test(v)?'<span class="pendiente">'+v+'</span>':v;
  document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected',x===t));
    const r=recetas[t.id];
    document.getElementById('ficha').setAttribute('aria-labelledby',t.id);
    document.getElementById('fNombre').textContent=r.nombre;
    document.getElementById('fEstado').textContent=r.estado;
    document.getElementById('fEstilo').innerHTML=pend(r.estilo);
    document.getElementById('fVino').innerHTML=pend(r.vino);
    document.getElementById('fHierbas').innerHTML=pend(r.hierbas);
    document.getElementById('fMacera').innerHTML=pend(r.macera);
    document.getElementById('fGrad').innerHTML=pend(r.grad);
    document.getElementById('botellaN').textContent=r.nombre;
    document.getElementById('botellaTipo').textContent=r.tipo;
  }));

  const t1=document.getElementById('tab1'); if(recetas.tab1) t1.click();

  // Calculadora 3 + 1
  const rango=document.getElementById('nVasos');
  const calc=()=>{
    const v=+rango.value;
    document.getElementById('vasosOut').textContent=v;
    const ml=v*90, soda=v*30;
    const fmt=m=>m>=1000?(m/1000).toLocaleString('es-UY',{maximumFractionDigits:2})+' L':m+' ml';
    document.getElementById('rVermu').textContent=fmt(ml);
    document.getElementById('rSoda').textContent=fmt(soda);
    document.getElementById('rBotellas').textContent=Math.ceil(ml/750);
    document.getElementById('rNaranjas').textContent=Math.ceil(v/8);
  };
  rango.addEventListener('input',calc); calc();

  // Pedido mayorista
  let cajas=2; const out=document.getElementById('cajas'), tot=document.getElementById('botTotal');
  const pintaCajas=()=>{out.textContent=cajas;tot.textContent=cajas*6};
  document.getElementById('menos').addEventListener('click',()=>{cajas=Math.max(1,cajas-1);pintaCajas()});
  document.getElementById('mas').addEventListener('click',()=>{cajas=Math.min(99,cajas+1);pintaCajas()});
  const form=document.getElementById('pedido'), err=document.getElementById('pError'), res=document.getElementById('resumen'), resTxt=document.getElementById('resumenTxt'), wa=document.getElementById('waPedido');
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const d=Object.fromEntries(new FormData(form));
    const faltan=['local','nombre','tel','zona'].filter(k=>!(d[k]||'').trim());
    if(faltan.length){err.hidden=false;res.hidden=true;document.getElementById({local:'pLocal',nombre:'pNombre',tel:'pTel',zona:'pZona'}[faltan[0]]).focus();return}
    err.hidden=true;
    const txt='Hola Sifón, quiero hacer un pedido:\n'+
      '• Local: '+d.local+' ('+d.tipo+')\n'+
      '• Contacto: '+d.nombre+' · '+d.tel+'\n'+
      '• Zona: '+d.zona+'\n'+
      '• Cantidad: '+cajas+' cajas ('+(cajas*6)+' botellas)'+
      (d.mensaje&&d.mensaje.trim()?'\n• Comentarios: '+d.mensaje.trim():'');
    resTxt.textContent=txt;
    wa.href=WHATSAPP?'https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(txt):'https://wa.me/?text='+encodeURIComponent(txt);
    res.hidden=false; res.scrollIntoView({block:'nearest',behavior:'smooth'});
  });
  const copiar=(texto,boton)=>{
    const ok=()=>{const t=boton.textContent;boton.textContent='Copiado';setTimeout(()=>boton.textContent=t,1500)};
    try{navigator.clipboard.writeText(texto).then(ok,()=>seleccionar(boton))}catch(e){seleccionar(boton)}
  };
  const seleccionar=boton=>{const el=boton.closest('.resumen,.canal').querySelector('pre,.dato');const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r)};
  document.getElementById('copiarPedido').addEventListener('click',e=>copiar(resTxt.textContent,e.currentTarget));
  document.querySelectorAll('[data-copiar]').forEach(b=>b.addEventListener('click',()=>copiar(document.getElementById(b.dataset.copiar).textContent,b)));
})();
