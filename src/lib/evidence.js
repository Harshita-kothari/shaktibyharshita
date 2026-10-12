function openVault(){return new Promise((resolve,reject)=>{const req=indexedDB.open('shakti-evidence',1);req.onupgradeneeded=()=>req.result.createObjectStore('clips',{keyPath:'id'});req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(Error('Device storage is unavailable.'));});}
async function transaction(mode,operation){const db=await openVault();try{return await new Promise((resolve,reject)=>{const tx=db.transaction('clips',mode);let result;const req=operation(tx.objectStore('clips'));req.onsuccess=()=>{result=req.result;};tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(Error('Could not update device storage.'));tx.onabort=()=>reject(Error('Device storage is full or unavailable.'));});}finally{db.close();}}
export const listEvidence=()=>transaction('readonly',store=>store.getAll());
export const saveEvidence=clip=>transaction('readwrite',store=>store.put(clip));
export const deleteEvidence=id=>transaction('readwrite',store=>store.delete(id));
