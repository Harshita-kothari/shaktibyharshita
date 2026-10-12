export async function api(path,options={}) {
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),12000);
 try{const response=await fetch('/api'+path,{...options,credentials:'same-origin',headers:{'Content-Type':'application/json',...options.headers},signal:controller.signal});
 const content=response.headers.get('content-type')||'';
 if(!content.includes('application/json'))throw Error('Server is unavailable or returned an invalid response. Please retry.');
 const body=await response.json();if(!response.ok)throw Error(body.error||'Request failed');return body;
 }catch(error){if(error.name==='AbortError')throw Error('Server timed out. Check the saved status before retrying.',{cause:error});if(error instanceof TypeError)throw Error('Could not reach the server. Check your connection and retry.',{cause:error});throw error;}finally{clearTimeout(timeout);}
}
export const saveState=(key,value)=>api('/state/'+key,{method:'PUT',body:JSON.stringify({value})});
export const recordAlert=kind=>api('/alerts',{method:'POST',body:JSON.stringify({kind})});
