const samples=[
 {src:'images/sample-01.jpg',title:'Structured Long-Sleeve Dress',type:'Dress',cat:'dresses'},
 {src:'images/sample-02.jpg',title:'Burgundy Draped Gown — Front',type:'Dress',cat:'dresses'},
 {src:'images/sample-03.jpg',title:'Burgundy Draped Gown — Back',type:'Dress · Back View',cat:'dresses'},
 {src:'images/sample-04.jpg',title:'Taupe Gathered Mini Dress',type:'Dress',cat:'dresses'},
 {src:'images/sample-05.jpg',title:'Green Print Fit-and-Flare Dress',type:'Print',cat:'print'},
 {src:'images/sample-06.jpg',title:'Geometric Print Two-Piece — Back',type:'Print · Back View',cat:'print'},
 {src:'images/sample-07.jpg',title:'Geometric Print Fit-and-Flare Dress',type:'Print',cat:'print'},
 {src:'images/sample-08.jpg',title:'Green Print Gathered Dress',type:'Print',cat:'print'},
 {src:'images/sample-09.jpg',title:'Green Print Dress — Back',type:'Print · Back View',cat:'print'},
 {src:'images/sample-10.jpg',title:'Black & White Print Look',type:'Styled Look',cat:'looks'},
 {src:'images/sample-11.jpg',title:'Coordinated Fashion Look',type:'Styled Look',cat:'looks'},
 {src:'images/sample-12.jpg',title:'Coordinated Red Print Look',type:'Styled Look',cat:'looks'},
 {src:'images/sample-13.jpg',title:'Menswear-Inspired Coordinated Look',type:'Styled Look',cat:'looks'},
 {src:'images/sample-14.jpg',title:'Green Print Dress',type:'Print',cat:'print'}
];
const gallery=document.querySelector('#gallery');const lightbox=document.querySelector('#lightbox');const lbImg=document.querySelector('#lightbox-img');const lbCap=document.querySelector('#lightbox-caption');let visible=[];let index=0;
function getResponsiveSrcset(src){const base=src.replace(/\.jpg$/i,'');return `${src} 1542w`;}
function render(filter='all'){visible=samples.filter(s=>filter==='all'||s.cat===filter);gallery.innerHTML=visible.map((s,i)=>`<article class="card" data-index="${i}"><div class="card-image"><img src="${s.src}" srcset="${getResponsiveSrcset(s.src)}" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" alt="${s.title}" width="1542" height="2048" loading="lazy" decoding="async"></div><div class="card-meta"><span class="card-title">${s.title}</span><span class="card-type">${s.type}</span></div></article>`).join('');gallery.querySelectorAll('.card').forEach(c=>c.addEventListener('click',()=>open(+c.dataset.index)));}
function open(i){index=i;const s=visible[index];lbImg.src=s.src;lbImg.alt=s.title;lbCap.textContent=s.title+' · '+s.type;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.classList.add('no-scroll');lbImg.width=1542;lbImg.height=2048;}
function close(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll');lbImg.src=''}
function move(dir){index=(index+dir+visible.length)%visible.length;open(index)}
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.filter)}));
document.querySelector('.close').addEventListener('click',close);document.querySelector('.prev').addEventListener('click',()=>move(-1));document.querySelector('.next').addEventListener('click',()=>move(1));lightbox.addEventListener('click',e=>{if(e.target===lightbox)close()});document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1)});render();
