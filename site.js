const toggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('header nav');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',open);
  });
}
const year=document.getElementById('year');
if(year)year.textContent=String(new Date().getFullYear());
