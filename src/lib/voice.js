export function normalizeSpeech(value){return String(value).normalize('NFKC').toLocaleLowerCase().replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim();}
export function matchesCommand(transcript,command){const words=normalizeSpeech(transcript),phrase=normalizeSpeech(command);return phrase.length>0&&(' '+words+' ').includes(' '+phrase+' ');}
