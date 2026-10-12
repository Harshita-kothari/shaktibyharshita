import hi from './hi.json';
let language='en';try{language=localStorage.getItem('shakti-language')==='hi'?'hi':'en';}catch{/* Use English. */}
const listeners=new Set();
export const getLanguage=()=>language;
export const subscribeLanguage=fn=>{listeners.add(fn);return()=>listeners.delete(fn);};
export function setLanguage(next){language=next==='hi'?'hi':'en';try{localStorage.setItem('shakti-language',language);}catch{/* Session preference. */}document.documentElement.lang=language;listeners.forEach(fn=>fn());}
document.documentElement.lang=language;
export function t(value){if(language!=='hi'||typeof value!=='string')return value;if(hi[value])return hi[value];const trimmed=value.trim();if(hi[trimmed])return value.replace(trimmed,hi[trimmed]);
 const patterns=[[/^Last update: (.*)$/,'अंतिम अपडेट: $1'],[/^Add (\d+) more to build your circle$/,'समूह बनाने के लिए $1 और संपर्क जोड़ें'],[/^(\d+) min$/,'$1 मिनट'],[/^Not synced: (.*)$/,'सिंक नहीं हुआ: $1'],[/^Check in before (.*)$/,'इस समय से पहले सुरक्षा पुष्टि करें: $1'],[/^Demo event saved\.(.*)$/,'डेमो की घटना सहेजी गई। पुश या SMS अलग से भेजें।'],[/^SOS alert requested$/,'SOS अलर्ट का अनुरोध भेजा गया']];
 for(const [pattern,replacement] of patterns)if(pattern.test(value))return value.replace(pattern,replacement);
 const prefixes={'Alert request failed: ':'अलर्ट अनुरोध विफल: ','Safe update: ':'सुरक्षा अपडेट: ','Safe update failed: ':'सुरक्षा अपडेट विफल: ','Not recorded: ':'दर्ज नहीं हुआ: ','Sign out failed: ':'साइन आउट विफल: ','Live update failed: ':'लाइव अपडेट विफल: ','Could not revoke live link: ':'लाइव लिंक बंद नहीं हुआ: ','Voice recognition error: ':'बोली पहचान की त्रुटि: '};
 for(const [prefix,translated] of Object.entries(prefixes))if(value.startsWith(prefix))return translated+t(value.slice(prefix.length));return value;
}
