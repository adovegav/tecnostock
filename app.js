'use strict';
const $ = id => document.getElementById(id);
const money = n => 'Bs ' + Number(n).toLocaleString('es-BO', {minimumFractionDigits:2,maximumFractionDigits:2});
const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const initial = {products:[{id:'p1',code:'TEC-001',name:'Laptop Lenovo IdeaPad',category:'Computación',price:4850,stock:12},{id:'p2',code:'TEC-002',name:'Mouse Logitech M280',category:'Periféricos',price:145,stock:24},{id:'p3',code:'TEC-003',name:'Audífonos JBL Tune',category:'Audio',price:380,stock:4},{id:'p4',code:'TEC-004',name:'Monitor Samsung 24 pulgadas',category:'Computación',price:1250,stock:8},{id:'p5',code:'TEC-005',name:'Hub USB-C 6 en 1',category:'Accesorios',price:210,stock:3}],sales:[{id:'V-001',productId:'p1',customer:'María López',quantity:1,price:4850,date:'2026-11-12'},{id:'V-002',productId:'p2',customer:'Carlos Rojas',quantity:2,price:145,date:'2026-11-13'},{id:'V-003',productId:'p3',customer:'Ana Flores',quantity:1,price:380,date:'2026-11-14'}]};
let db;
try { db = JSON.parse(localStorage.getItem('tecnostock-v1')) || structuredClone(initial); if (!Array.isArray(db.products)||!Array.isArray(db.sales)) throw Error(); }
catch { db = structuredClone(initial); }
function persist() { localStorage.setItem('tecnostock-v1',JSON.stringify(db)); }
function message(text) { $('message').textContent=text; }
function storeAndGo(url) { try { persist(); location.href=url; } catch { message('No se pudo guardar. Verifica que el almacenamiento del navegador esté habilitado.'); } }
const login = $('login-form');
if (login) login.addEventListener('submit',event => {event.preventDefault();if($('email').value.trim().toLowerCase()==='admin@tecnostock.com' && $('password').value==='Demo1234'){try{sessionStorage.setItem('tecnostock-session','demo');location.href='dashboard.html';}catch{message('Habilita el almacenamiento del navegador para continuar.');}}else message('El correo o la contraseña no coinciden con el acceso de demostración.');});
if (!login) {
  if(sessionStorage.getItem('tecnostock-session')!=='demo') location.replace('index.html');
  $('logout').addEventListener('click',()=>{sessionStorage.removeItem('tecnostock-session');location.href='index.html';});
}
function salesTable(sales) { return `<table><thead><tr><th>Venta / Fecha</th><th>Producto</th><th>Cliente</th><th>Cantidad</th><th>Total</th></tr></thead><tbody>${sales.length?sales.map(s=>{const p=db.products.find(p=>p.id===s.productId);return `<tr><td><strong>${esc(s.id)}</strong><small>${esc(s.date)}</small></td><td>${esc(p?.name || 'Producto no disponible')}<small>${esc(p?.code||'')}</small></td><td>${esc(s.customer)}</td><td>${s.quantity}</td><td><strong>${money(s.price*s.quantity)}</strong></td></tr>`;}).join(''):'<tr><td colspan="5" class="empty">Todavía no hay ventas registradas.</td></tr>'}</tbody></table>`; }
if($('stats')) {
 const items=[['Productos en catálogo',db.products.length,'Referencias disponibles'],['Unidades en stock',db.products.reduce((a,p)=>a+p.stock,0),'Existencias actuales'],['Ventas registradas',db.sales.length,'Movimientos acumulados'],['Ingresos acumulados',money(db.sales.reduce((a,s)=>a+s.price*s.quantity,0)),'Total de ventas registradas']];
 $('stats').innerHTML=items.map(([label,value,note])=>`<article class="stat"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`).join('');
 $('recent-sales').innerHTML=salesTable([...db.sales].sort((a,b)=>b.date.localeCompare(a.date)||b.id.localeCompare(a.id)).slice(0,4));
 const low=db.products.filter(p=>p.stock<=5);$('low-stock').innerHTML=low.length?low.map(p=>`<div class="activity"><strong>${esc(p.name)}</strong><span>${p.stock} unidades disponibles</span></div>`).join(''):'<p class="muted">Tu inventario tiene buen nivel de existencias.</p>';
}
if($('products-table')) {
 const render=()=>{const q=$('search').value.toLocaleLowerCase();const products=db.products.filter(p=>[p.name,p.code,p.category].some(v=>v.toLocaleLowerCase().includes(q)));$('count').textContent=products.length+' productos';$('products-table').innerHTML=`<table><thead><tr><th>Producto / Código</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Estado</th></tr></thead><tbody>${products.length?products.map(p=>`<tr><td><strong>${esc(p.name)}</strong><small>${esc(p.code)}</small></td><td>${esc(p.category)}</td><td>${money(p.price)}</td><td>${p.stock} uds.</td><td><span class="badge ${p.stock<=5?'low':''}">${p.stock===0?'Agotado':p.stock<=5?'Stock bajo':'Disponible'}</span></td></tr>`).join(''):'<tr><td colspan="5" class="empty">No se encontraron productos.</td></tr>'}</tbody></table>`;};$('search').addEventListener('input',render);render();
}
if($('product-form')) $('product-form').addEventListener('submit',event=>{
 event.preventDefault();const code=$('code').value.trim().toUpperCase(),name=$('name').value.trim(),price=Number($('price').value),stock=Number($('stock').value);
 if(!code||!name) return message('Completa el código y el nombre sin usar solo espacios.');
 if(db.products.some(p=>p.code.toUpperCase()===code)) return message('Ya existe un producto con ese código.');
 if(!Number.isFinite(price)||price<=0||price>1000000||!Number.isInteger(stock)||stock<0||stock>1000000) return message('Revisa el precio y el stock ingresados.');
 db.products.push({id:crypto.randomUUID(),code,name,category:$('category').value,price:Math.round(price*100)/100,stock});storeAndGo('productos.html');
});
if($('sales-table')) {$('sales-table').innerHTML=salesTable([...db.sales].reverse());$('sales-count').textContent=db.sales.length+' ventas registradas';}
if($('sale-form')) {
 const available=db.products.filter(p=>p.stock>0);$('product').innerHTML='<option value="">Selecciona un producto</option>'+available.map(p=>`<option value="${esc(p.id)}">${esc(p.code+' · '+p.name)}</option>`).join('');
 const now=new Date();const today=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');$('date').value=today;$('date').max=today;
 const update=()=>{const p=db.products.find(p=>p.id===$('product').value);$('quantity').max=p?p.stock:1000000;$('availability').textContent=p?`${p.stock} unidades disponibles · ${money(p.price)} por unidad`:'Selecciona un producto.';$('total').textContent=money(p?p.price*Math.max(0,Number($('quantity').value)||0):0);};$('product').addEventListener('change',update);$('quantity').addEventListener('input',update);
 if(!available.length){message('No hay productos con stock. Registra un producto primero.');$('sale-form').querySelector('button').disabled=true;}
 $('sale-form').addEventListener('submit',event=>{event.preventDefault();const p=db.products.find(p=>p.id===$('product').value),quantity=Number($('quantity').value),customer=$('customer').value.trim(),date=$('date').value;
 if(!p||!Number.isInteger(quantity)||quantity<1||quantity>p.stock) return message('La cantidad debe ser entera y no puede superar el stock disponible.');
 if(!customer||!date||date>today) return message('Completa el cliente y una fecha válida que no sea futura.');
 p.stock-=quantity;db.sales.push({id:'V-'+String(db.sales.length+1).padStart(3,'0'),productId:p.id,customer,quantity,price:p.price,date});storeAndGo('ventas.html');
 });
}
