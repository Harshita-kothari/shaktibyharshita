import {useEffect,useRef,useState} from 'react';
import {api,saveState} from './api';
export function useServerState(key,initial){
 const [value,setValue]=useState(initial),[sync,setSync]=useState('Loading saved data…'),[ready,setReady]=useState(false);
 const fallback=useRef(initial);
 const [retryTick,retry]=useState(0);
 const lastSaved=useRef(null),queue=useRef(Promise.resolve());
 useEffect(()=>{if(ready)return;let alive=true;api('/state/'+key).then(result=>{if(!alive)return;const next=result.value??fallback.current;lastSaved.current=JSON.stringify(next);setValue(next);setReady(true);setSync('Connected · saved to your account');}).catch(e=>{if(alive){setSync(e.message);setReady(false);}});return()=>{alive=false;};},[key,retryTick,ready]); // Initial value is a fallback, not a reload trigger.
 useEffect(()=>{const serialized=JSON.stringify(value);if(!ready||serialized===lastSaved.current)return;let alive=true;setSync('Saving…');queue.current=queue.current.catch(()=>{}).then(()=>saveState(key,JSON.parse(serialized))).then(()=>{lastSaved.current=serialized;if(alive)setSync('Saved to your account');}).catch(e=>{if(alive)setSync('Not synced: '+e.message);});return()=>{alive=false;};},[value,key,ready,retryTick]);
 return [value,setValue,sync,ready,()=>retry(n=>n+1)];
}
