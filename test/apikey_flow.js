const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const BASE = 'http://localhost:3001/api';

async function run(){
  console.log('Creating API key...');
  let res = await fetch(`${BASE}/apikeys`, { method: 'POST', body: JSON.stringify({name:'smoke-key'}), headers: {'Content-Type':'application/json'} });
  let created = await res.json();
  console.log('created:', created);
  const key = created.data && created.data.key;
  if(!key){ console.log('Create failed, aborting.'); return; }

  console.log('Calling protected endpoint using x-api-key...');
  res = await fetch(`${BASE}/db/collections`, { headers: { 'x-api-key': key } });
  console.log('collections:', await res.json());
}

run().catch(err=>{ console.error(err); process.exit(1); });
