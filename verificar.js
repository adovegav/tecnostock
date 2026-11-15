// Prueba de comportamiento sin dependencias: almacenamiento y formularios simulados.
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');
const source=fs.readFileSync('app.js','utf8');
let stored;
function run(fields, action) {
 const elements={logout:{addEventListener(){}},message:{textContent:''}};
 for(const [id,value] of Object.entries(fields)) elements[id]={value,addEventListener(type,fn){this[type]=fn;},querySelector(){return {};}};
 const sandbox={document:{getElementById:id=>elements[id]||null},localStorage:{getItem:()=>stored||null,setItem:(key,value)=>stored=value},sessionStorage:{getItem:()=>'demo'},location:{replace(){},href:''},structuredClone,crypto:require('crypto'),console};
 vm.createContext(sandbox);vm.runInContext(source,sandbox);action?.(elements,sandbox);return sandbox;
}
run({'product-form':'',code:'TEC-006',name:'Teclado de prueba',category:'Periféricos',price:'100',stock:'5'},e=>e['product-form'].submit({preventDefault(){}}));
assert.equal(JSON.parse(stored).products.length,6);
run({'product-form':'',code:'tec-006',name:'Duplicado',category:'Audio',price:'50',stock:'1'},e=>{e['product-form'].submit({preventDefault(){}});assert.match(e.message.textContent,/existe/);});
const data=JSON.parse(stored), id=data.products.at(-1).id;
run({'sale-form':'',product:id,customer:'Cliente de prueba',quantity:'2',date:'' ,availability:'',total:''},e=>{e.date.value='2026-01-01';e['sale-form'].submit({preventDefault(){}});});
assert.equal(JSON.parse(stored).products.at(-1).stock,3);assert.equal(JSON.parse(stored).sales.at(-1).productId,id);assert.equal(JSON.parse(stored).sales.at(-1).price,100);
run({'sale-form':'',product:id,customer:'Cliente',quantity:'4',date:'',availability:'',total:''},e=>{e.date.value='2026-01-01';e['sale-form'].submit({preventDefault(){}});assert.match(e.message.textContent,/stock/);});
assert.equal(JSON.parse(stored).products.at(-1).stock,3);
run({'login-form':'',email:'admin@tecnostock.com',password:'incorrecta'},e=>{e['login-form'].submit({preventDefault(){}});assert.match(e.message.textContent,/no coinciden/);});
for(const file of fs.readdirSync('.').filter(f=>f.endsWith('.html'))){const html=fs.readFileSync(file,'utf8');for(const match of html.matchAll(/(?:href|src)="([^"#]+)"/g))assert.ok(fs.existsSync(match[1]),file+': '+match[1]);}
console.log('OK: alta de producto, código duplicado, venta relacionada, descuento de stock, rechazo de sobreventa, login inválido y enlaces locales.');
