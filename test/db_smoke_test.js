const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const BASE = 'http://localhost:3001/api/db';

async function run(){
  console.log('Creating document...');
  let res = await fetch(`${BASE}/__test_dynamic`, { method: 'POST', body: JSON.stringify({name:'smoke', value:123}), headers: {'Content-Type':'application/json'} });
  let created = await res.json();
  console.log('created:', created);
  const id = created.data && created.data._id ? created.data._id : null;
  if(!id){ console.log('Create failed, aborting.'); return; }

  console.log('Fetching document by id...');
  res = await fetch(`${BASE}/__test_dynamic/${id}`);
  console.log('getById:', await res.json());

  console.log('Updating document...');
  res = await fetch(`${BASE}/__test_dynamic/${id}`, { method: 'PUT', body: JSON.stringify({value:456}), headers: {'Content-Type':'application/json'} });
  console.log('updated:', await res.json());

  console.log('Deleting document...');
  res = await fetch(`${BASE}/__test_dynamic/${id}`, { method: 'DELETE' });
  console.log('deleted:', await res.json());
}

run().catch(err=>{ console.error(err); process.exit(1); });
