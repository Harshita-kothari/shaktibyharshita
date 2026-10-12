// Local server-owner moderation; never expose this script as a public API.
const {DatabaseSync}=require('node:sqlite');const path=require('node:path');
const [action='list',id]=process.argv.slice(2);
if(!['list','publish','hide'].includes(action)||(action!=='list'&&!id)){console.error('Usage: node backend/moderate.cjs list | publish REPORT_ID | hide REPORT_ID');process.exit(1);}
const db=new DatabaseSync(process.env.DB_PATH||path.join(__dirname,'data','raksha.sqlite'));
try{if(action==='list'){for(const report of db.prepare('SELECT * FROM reports ORDER BY created DESC LIMIT 100').all())console.log(JSON.stringify(report));}else{const result=db.prepare('UPDATE reports SET verified=? WHERE id=?').run(action==='publish'?1:0,id);if(!result.changes)throw Error('Report not found');console.log(action==='publish'?'Report published after owner review.':'Report hidden from public alerts.');}}catch(e){console.error(e.message);process.exitCode=1;}finally{db.close();}
