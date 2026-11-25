const SB_URL='https://jajfytdszdbnjlvvturv.supabase.co',SB_KEY='sb_publishable_U_Ulz4Zcpxgr9_0K4oRwFA_17yInKNH';
const sb=supabase.createClient(SB_URL,SB_KEY);
const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const cl=(s,n=120)=>String(s??'').replace(/[<>\u0000-\u001f]/g,' ').replace(/\s+/g,' ').trim().slice(0,n);
const pad=n=>String(n).padStart(2,'0'),iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const TD=()=>iso(new Date()),add=(s,n)=>{const d=new Date(s+'T12:00');d.setDate(d.getDate()+n);return iso(d)};
const dd=(a,b)=>Math.round((new Date(a+'T12:00')-new Date(b+'T12:00'))/864e5);
const fd=s=>s?new Date(s+'T12:00').toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}):'—';
const ph=s=>{let d=String(s??'').replace(/\D/g,'');if(d.length==12&&d.startsWith('91'))d=d.slice(2);else if(d.length==11&&d[0]=='0')d=d.slice(1);return/^[6-9]\d{9}$/.test(d)?d:''};
const fp=p=>'+91 '+p.slice(0,5)+' '+p.slice(5);
const nd=v=>{let r='',m,s;if(v instanceof Date&&!isNaN(v))r=iso(new Date(+v+432e5));else if(typeof v=='number'&&v>20000&&v<80000)r=new Date(Math.round((v-25569)*864e5)).toISOString().slice(0,10);else{s=String(v??'').trim();if(m=s.match(/^(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})/))r=m[1]+'-'+pad(m[2])+'-'+pad(m[3]);else if(m=s.match(/(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{4}|\d{2})\b/))r=(m[3].length==2?'20'+m[3]:m[3])+'-'+pad(m[2])+'-'+pad(m[1])}return r&&!isNaN(Date.parse(r))?r:''};
let me=null,rec=/type=recovery/.test(location.hash),dp=null,pt,tmo;
const S={team:[],cust:[],hist:[],reqs:[],key:''},ui={v:'home',tab:'today',f:'',a:'login',r:'a',up:null,fu:'20',cd:'',m:null};
const PCOLS='id,role,admin_id,full_name,phone,is_active,done_count,leads_count';
const LG=`<span class="lg"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/><circle cx="18" cy="5" r="3" fill="#FDE047" stroke="none"/></svg></span>`;
function pop(){const e=$('#pp');e.className='';void e.offsetWidth;e.className='on';clearTimeout(pt);pt=setTimeout(()=>e.className='',1400)}
function tt(m){const e=$('#ts');e.textContent=m;e.style.display='block';clearTimeout(tmo);tmo=setTimeout(()=>e.style.display='none',3800)}
const bz=o=>$('#ld').classList.toggle('on',!!o);
const em=e=>{const m=String(e&&e.message||e);return/banned/i.test(m)?'This account is deactivated. Contact your Administrator.':/Invalid login/i.test(m)?'Invalid mobile number or password':/Failed to fetch|NetworkError|Load failed/i.test(m)?'You appear to be offline. Try again.':m};
async function run(f){bz(1);try{return await f()}catch(e){tt(em(e))}finally{bz(0)}}
const pw6=p=>String(p).length>=6||tt('Password must be at least 6 characters')&&0;
const fld=(l,n,t,x)=>`<label>${l}</label><input name="${n}" type="${t||'text'}" ${x||''} autocomplete="off">`;
const PH=n=>fld('Mobile (+91)',n||'phone','tel','maxlength=14 placeholder="10-digit mobile"');
const tbl=(hd,rows)=>`<div class="tw"><table><thead><tr>${hd.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.join('')||`<tr><td colspan="${hd.length}" class="mu">Nothing here yet 🎉</td></tr>`}</tbody></table></div>`;
const nm=i=>(S.team.find(u=>u.id==i)||{}).full_name;
/* ---------- data ---------- */
async function load(){const q=[sb.from('profiles').select(PCOLS),sb.from('customers').select('*'),sb.from('follow_up_history').select('*')];
if(me.role=='admin')q.push(sb.from('password_reset_requests').select('*').eq('used',false).gt('expires_at',new Date().toISOString()));
const r=await Promise.all(q),e=r.find(x=>x.error);if(e)throw e.error;
S.team=r[0].data;S.cust=r[1].data;S.hist=r[2].data;S.reqs=r[3]?r[3].data:[];me=S.team.find(u=>u.id==me.id)||me}
async function enter(uid){bz(1);try{const p=await sb.from('profiles').select(PCOLS).eq('id',uid).maybeSingle();if(p.error)throw p.error;
if(!p.data||!p.data.is_active){await sb.auth.signOut();me=null;tt('This account is deactivated. Contact your Administrator.');return}
me=p.data;if(me.role=='admin'){const k=await sb.rpc('get_my_invite_key');S.key=k.data||''}
await sb.rpc('purge_old_history');await load()}catch(e){tt(em(e))}finally{bz(0);R()}}
async function poll(){if(!me||me.role!='admin'||document.hidden||ui.m||ui.v!='home')return;
try{const r=await sb.from('password_reset_requests').select('*').eq('used',false).gt('expires_at',new Date().toISOString()),k=x=>x.map(y=>y.id+y.attempts).join();
if(!r.error&&k(r.data)!=k(S.reqs)){S.reqs=r.data;R()}}catch(e){}}
/* ---------- views ---------- */
function authV(){const a=ui.a,ad=ui.r=='a',bt=t=>`<p><button class="btn p" style="width:100%">${t}</button></p>`,bk=`<button type="button" class="lk" data-a="auth" data-v="login">← Back to login</button>`;
const sw=`<div class="tabs"><button class="btn s ${ad?'on':''}" data-a="role" data-v="a">Administrator</button><button class="btn s ${ad?'':'on'}" data-a="role" data-v="e">Executive</button></div>`;let h;
if(a=='login')h=`<h2>Login</h2><form data-f="login">${PH()}${fld('Password','pw','password')}${bt('Login')}</form><button type="button" class="lk" data-a="auth" data-v="forgot">Forgot password?</button> · <button type="button" class="lk" data-a="auth" data-v="reg">Register</button>`;
else if(a=='reg')h=`<h2>Register</h2>${sw}<form data-f="reg">${fld('Full Name','name')}${PH()}${ad?fld('Email (for password recovery)','email','email'):''}${fld('Password (min 6)','pw','password')}${ad?'':fld('6-digit Administrator Invite Key','key','text','maxlength=6 inputmode=numeric')}${bt('Create '+(ad?'Administrator':'Executive')+' account')}</form>${bk}`;
else if(a=='forgot')h=`<h2>Forgot password</h2>${sw}<form data-f="forgot">${ad?fld('Registered email','email','email'):PH()}${bt(ad?'Send OTP to my email':'Send Reset OTP to Administrator')}</form><button type="button" class="lk" data-a="auth" data-v="reset">I already have an OTP</button> · ${bk}`;
else if(a=='newpw')h=`<h2>Set a new password</h2><form data-f="newpw">${fld('New password (min 6)','pw','password')}${bt('Save password')}</form>`;
else h=`<h2>Enter Reset OTP</h2><form data-f="reset">${PH()}${fld('6-digit OTP','otp','text','maxlength=6 inputmode=numeric')}${fld('New password (min 6)','pw','password')}${bt('Reset password')}</form>${bk}`;
return`<div class="auth"><div class="lgo">${LG}<b>The Follow Up</b></div><div class="card">${h}</div></div>`}
const tm=()=>{const T=TD(),c=S.cust,p=c.filter(x=>x.status=='pending');return{tot:c.length,due:p.filter(x=>x.follow_up_date==T).length,over:p.filter(x=>x.follow_up_date<T).length,done:S.hist.length,leads:S.team.reduce((a,u)=>a+(u.leads_count||0),0)}};
function home(){const m=tm(),ad=me.role=='admin';
let h=ad?`<div class="card"><h3>Your Invite Key</h3><div class="key">${esc(S.key)}</div><p class="mu">Share this 6-digit key with new Executives so they can join your team.</p><button class="btn p s" data-a="copy">Copy Key</button></div>`:'';
h+=`<div class="g">${[['Total Customers',m.tot],['Due Today',m.due],['Overdue Pending',m.over],['Completed (Last 30 Days)',m.done],['Leads / Orders Generated',m.leads]].map(x=>`<div class="m"><b>${x[1]}</b><span>${x[0]}</span></div>`).join('')}</div>`;
if(ad){h+=`<div class="card" style="margin-top:12px"><h3>Password Reset Requests</h3>${S.reqs.length?S.reqs.map(r=>{const e=S.team.find(u=>u.id==r.user_id)||{};return`<div class="opt"><b>${esc(e.full_name)}</b> ${e.phone?fp(e.phone):''} · OTP <span class="key" style="font-size:20px;letter-spacing:3px">${esc(r.otp)}</span><span class="mu">valid till ${new Date(r.expires_at).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</span></div>`}).join(''):'<p class="mu">No active requests.</p>'}</div>`;
h+=`<div class="card"><h3>Executive Performance &amp; Controls</h3>${tbl(['Executive','Mobile','Follow-Ups Done','Leads','Status','Actions'],S.team.filter(u=>u.role=='exec').map(e=>`<tr><td data-l="Executive"><b>${esc(e.full_name)}</b></td><td data-l="Mobile">${fp(e.phone)}</td><td data-l="Done">${e.done_count||0}</td><td data-l="Leads">${e.leads_count||0}</td><td data-l="Status"><span class="bd ${e.is_active?'k':'o'}">${e.is_active?'Active':'Deactivated'}</span></td><td class="ac"><button class="btn s" data-a="rp" data-v="${e.id}">Reset password</button><button class="btn s d" data-a="tg" data-v="${e.id}">${e.is_active?'Deactivate':'Activate'}</button></td></tr>`))}</div>`}
return h}
function list(){const T=TD(),ad=me.role=='admin',tb=ui.tab;
const p=S.cust.filter(c=>c.status=='pending'&&(!ui.f||c.exec_id==ui.f)),by=(a,b)=>a.follow_up_date>b.follow_up_date?1:-1;
const set={over:p.filter(c=>c.follow_up_date<T).sort(by),today:p.filter(c=>c.follow_up_date==T),up:p.filter(c=>c.follow_up_date>T).sort(by)};
const tabs=[['over','⚠ Overdue / Missed',set.over.length],['today','Today’s Follow-Ups',set.today.length],['up','Upcoming',set.up.length],['hist','30-Day History',null]];
let h=`<div class="tabs">${tabs.map(x=>`<button class="btn ${tb==x[0]?'on':''}" data-a="tab" data-v="${x[0]}">${x[1]}${x[2]!=null?` <span class="bd ${x[0]=='over'&&x[2]?'o':''}">${x[2]}</span>`:''}</button>`).join('')}</div>`;
if(ad)h+=`<div style="margin-bottom:10px"><select data-a="flt" style="max-width:260px"><option value="">All executives</option>${S.team.map(u=>`<option value="${u.id}" ${ui.f==u.id?'selected':''}>${esc(u.full_name)}${u.role=='admin'?' (Admin)':''}</option>`).join('')}</select></div>`;
if(tb=='hist')return h+tbl(['Customer','Mobile','Outcome','Completed By','Remarks','Completed On'],S.hist.filter(l=>!ui.f||l.completed_by==ui.f).sort((a,b)=>a.completed_on<b.completed_on?1:-1).map(l=>`<tr><td data-l="Customer"><b>${esc(l.customer_name)}</b></td><td data-l="Mobile">${fp(l.customer_phone)}</td><td data-l="Outcome"><span class="bd ${l.outcome[0]=='L'?'k':''}">${esc(l.outcome)}</span></td><td data-l="By">${esc(nm(l.completed_by)||'—')}</td><td data-l="Remarks">${esc(l.remarks)||'—'}</td><td data-l="Date">${fd(l.completed_on)}</td></tr>`));
return h+tbl(['Customer','Mobile','Last Purchase','Due Date','Status','Notes','Remarks','Actions'],set[tb].map(c=>{const o=dd(T,c.follow_up_date),msg=encodeURIComponent(`Hello ${c.name}, this is ${me.full_name} from our team. Thank you for your recent purchase! We’d love to know how everything is going and whether we can help with anything.`);
return`<tr><td data-l="Customer"><b>${esc(c.name)}</b><br><span class="mu">${esc(nm(c.exec_id)||'Unassigned')}</span></td><td data-l="Mobile">${fp(c.phone)}</td><td data-l="Purchased">${fd(c.last_purchase_date)}</td><td data-l="Due">${fd(c.follow_up_date)}</td><td data-l="Status">${o>0?`<span class="bd o">${o} day${o>1?'s':''} overdue</span>`:`<span class="bd ${o==0?'t':''}">${o==0?'Due today':'Upcoming'}</span>`}</td><td data-l="Notes">${esc(c.note)||'—'}</td><td data-l="Remarks">${esc(c.remarks)||'—'}</td><td class="ac"><a class="btn s" href="tel:+91${c.phone}">📞 Call</a><a class="btn s" target="_blank" rel="noopener" href="https://wa.me/91${c.phone}?text=${msg}">💬 WhatsApp</a><button class="btn s p" data-a="st" data-v="${c.id}">Update Status</button>${ad?`<button class="btn s" data-a="ra" data-v="${c.id}">Reassign</button>`:''}</td></tr>`}))}
const prev=u=>`<h3>Preview &amp; Confirm (${u.length} rows)</h3>${tbl(['Customer Name','Mobile','Purchase Date','Notes',''],u.map((r,i)=>`<tr><td data-l="Name"><input data-i="${i}" data-k="n" value="${esc(r.n)}" class="${r.n?'':'bad'}"></td><td data-l="Mobile"><input data-i="${i}" data-k="p" value="${esc(r.p)}" class="${ph(r.p)?'':'bad'}"></td><td data-l="Date"><input type="date" data-i="${i}" data-k="d" value="${esc(r.d)}" class="${r.d?'':'bad'}"></td><td data-l="Notes"><input data-i="${i}" data-k="t" value="${esc(r.t)}" maxlength="500" placeholder="Optional note"></td><td class="ac"><button class="btn s d" data-a="rm" data-v="${i}">Delete</button></td></tr>`))}<p class="ac"><button class="btn p" data-a="saveall">Save All (${u.length})</button><button class="btn" data-a="cancelup">Cancel</button></p>`;
const addV=()=>`<div class="card"><h3>Add a customer</h3><form data-f="man">${fld('Customer Name','name')}${PH()}<label>Last Purchase Date</label><input type="date" name="last" value="${TD()}" max="${TD()}"><label>Follow-up</label><select name="fu" data-a="fu"><option value="20">+20 Days</option><option value="30">+30 Days</option><option value="c">Custom Follow-Up Date…</option></select><input type="date" name="cd" id="cd" min="${TD()}" style="display:none;margin-top:6px"><label>Notes (optional)</label><textarea name="note" rows="2" maxlength="500" placeholder="Anything worth remembering about this customer"></textarea><p><button class="btn p">Save customer</button></p></form></div><div class="card"><h3>Upload PDF / Excel / CSV</h3><p class="mu">Files are read inside your browser and never uploaded; only the rows you confirm are saved to your team’s list. An optional “Notes” column is imported too.</p><div class="ac"><button class="btn s" data-a="sample">Download Sample Excel</button></div><label>Follow-up for this batch</label><select data-a="bf"><option value="20" ${ui.fu=='20'?'selected':''}>+20 Days</option><option value="30" ${ui.fu=='30'?'selected':''}>+30 Days</option><option value="c" ${ui.fu=='c'?'selected':''}>Custom Follow-Up Date…</option></select><input type="date" id="bc" data-a="bc" min="${TD()}" value="${esc(ui.cd)}" style="display:${ui.fu=='c'?'block':'none'};margin-top:6px"><p><input type="file" id="fl" accept=".pdf,.xlsx,.xls,.csv"></p>${ui.up?prev(ui.up):''}</div>`;
function R(){const a=$('#app');$('#ib').hidden=matchMedia('(display-mode: standalone)').matches;
$('#who').textContent=me?me.full_name+(me.role=='admin'?' · 🔑 '+S.key:''):'';$('#lo').hidden=!me;
if(!me){a.innerHTML=authV();M();return}
const nv=[['home',me.role=='admin'?'🏠 Dashboard':'🏠 Home'],['list','📋 Follow-Ups'],['add','➕ Add Customers']];
a.innerHTML=`<div id="sh"><nav><div class="sb">${LG}<b>The Follow Up</b></div>${nv.map(x=>`<button class="${ui.v==x[0]?'on':''}" data-a="nav" data-v="${x[0]}">${x[1]}</button>`).join('')}</nav><main>${ui.v=='home'?home():ui.v=='list'?list():addV()}</main></div>`;M()}
function M(){const m=ui.m,el=$('#md'),c=m&&S.cust.find(x=>x.id==m.id),e=m&&S.team.find(x=>x.id==m.id),cb=`<button type="button" class="btn" data-a="x">Cancel</button>`;if(!m){el.className='';return}let h;
if(m.t=='st'&&c)h=`<h3>Update status: ${esc(c.name)}</h3><form data-f="st"><label>Remarks</label><textarea name="rem" rows="3" maxlength="300">${esc(c.remarks)}</textarea>${[['lead','✅ Lead / Order Generated'],['cb','🔁 Call Back Later'],['ni','🚫 Not Interested'],['na','📵 No Answer / Switched Off']].map(x=>`<label class="opt"><input type="radio" name="o" value="${x[0]}" data-a="oc"> ${x[1]}</label>`).join('')}<div id="cbd" style="display:none"><label>New follow-up date</label><input type="date" name="nd" min="${TD()}" value="${add(TD(),2)}"></div><p class="ac"><button class="btn p">Save</button>${cb}</p></form>`;
else if(m.t=='ra'&&c)h=`<h3>Reassign ${esc(c.name)}</h3><form data-f="ra"><label>Assign to</label><select name="to">${S.team.filter(u=>u.is_active).map(u=>`<option value="${u.id}" ${u.id==c.exec_id?'selected':''}>${esc(u.full_name)}</option>`).join('')}</select><p class="ac"><button class="btn p">Reassign</button>${cb}</p></form>`;
else if(m.t=='rp'&&e)h=`<h3>Reset password: ${esc(e.full_name)}</h3><form data-f="rp">${fld('New password (min 6)','pw','password')}<p class="ac"><button class="btn p">Set password</button>${cb}</p></form>`;
else if(m.t=='help')h=`<h3>How to install The Follow Up</h3><p><b>Windows / Mac (Chrome, Edge):</b> click Install App, or use the install icon in the address bar.</p><p><b>Android (Chrome):</b> menu ⋮ → Install app / Add to Home screen.</p><p><b>iPhone (Safari):</b> Share → Add to Home Screen.</p><p><b>Mac Safari:</b> File → Add to Dock.</p><p class="mu">One-click install works once the app is hosted on HTTPS with a manifest and service worker.</p><button class="btn p" data-a="x">Got it</button>`;
else{el.className='';return}
el.innerHTML='<div>'+h+'</div>';el.className='on'}
/* ---------- form handlers (all writes go through Supabase RPCs) ---------- */
const FH={
async login(d){const p=ph(d.phone);if(!p||!d.pw)return tt('Invalid mobile number or password');
const r=await sb.rpc('get_login_email_by_phone',{p_phone:p});if(r.error)throw r.error;if(!r.data)return tt('Invalid mobile number or password');
const s=await sb.auth.signInWithPassword({email:r.data,password:d.pw});if(s.error)throw s.error;ui.v='home';await enter(s.data.user.id)},
async reg(d){const p=ph(d.phone),n=cl(d.name),ad=ui.r=='a';if(n.length<2||!p)return tt('Enter your name and a valid 10-digit Indian mobile number');if(!pw6(d.pw))return;
const x=await sb.rpc('is_phone_registered',{p_phone:p});if(x.error)throw x.error;if(x.data)return tt('This mobile number is already registered');
let email,meta={full_name:n,phone:p},jn='';
if(ad){email=cl(d.email).toLowerCase();if(!/^\S+@\S+\.\S+$/.test(email))return tt('Enter a valid email address');meta.role='admin'}
else{const k=String(d.key||'').trim(),v=await sb.rpc('validate_invite_key',{p_key:k});if(v.error)throw v.error;if(!v.data)return tt('Invalid Invite Key. Ask your Administrator.');jn=v.data;email='91'+p+'@thefollowup.local';meta.role='exec';meta.invite_key=k}
const s=await sb.auth.signUp({email,password:d.pw,options:{data:meta}});if(s.error)throw s.error;
if(!s.data.session)return tt('Check your email to confirm your account, then log in.');
ui.v='home';await enter(s.data.user.id);if(me)tt(ad?'Welcome! Your Invite Key is '+S.key:'Joined '+jn+'’s team')},
async forgot(d){if(ui.r=='a'){const e=cl(d.email).toLowerCase();if(!/^\S+@\S+\.\S+$/.test(e))return tt('Enter a valid email address');
const r=await sb.auth.resetPasswordForEmail(e,{redirectTo:location.origin+location.pathname});if(r.error)throw r.error;return tt('If that email is registered, a reset link is on its way.')}
const r=await sb.rpc('request_executive_reset_otp',{p_phone:ph(d.phone)});if(r.error)throw r.error;
if(!r.data)return tt('No active Executive found with that mobile number');tt('OTP sent. Ask your Administrator for it (valid 15 minutes).');ui.a='reset';R()},
async reset(d){if(!pw6(d.pw))return;const r=await sb.rpc('verify_and_reset_executive_password',{p_phone:ph(d.phone),p_otp:String(d.otp).trim(),p_new_password:d.pw});if(r.error)throw r.error;const j=r.data;
if(j.ok){tt('Password reset. Please log in.');ui.a='login';return R()}
tt({no_valid_otp:'No valid OTP. Request a new one.',short_password:'Password must be at least 6 characters',locked:'Too many attempts. Request a new OTP.',wrong_otp:'Wrong OTP ('+j.attempts_left+' attempts left)'}[j.error]||'Could not reset the password')},
async newpw(d){if(!pw6(d.pw))return;const r=await sb.auth.updateUser({password:d.pw});if(r.error)throw r.error;rec=false;history.replaceState(null,'',location.pathname);tt('Password updated.');ui.a='login';ui.v='home';await enter(r.data.user.id)},
async man(d){const p=ph(d.phone),n=cl(d.name);if(!n||!p||!d.last)return tt('Enter the name, a valid +91 mobile and the purchase date');
const due=d.fu=='c'?d.cd:add(d.last,+d.fu);if(!due)return tt('Pick a follow-up date');
const q=await sb.rpc('save_customers',{p_rows:[{name:n,phone:p,last:d.last,due,note:cl(d.note,500)}]});if(q.error)throw q.error;await load();
tt(q.data.added?'Customer added':'Existing customer updated and reset to Pending');ui.v='list';ui.tab=due<TD()?'over':due==TD()?'today':'up';R()},
async st(d){const c=S.cust.find(x=>x.id==ui.m.id),o=d.o,t=TD();if(!o)return tt('Choose an outcome');if(o=='cb'&&(!d.nd||d.nd<t))return tt('Pick a future follow-up date');
const q=await sb.rpc('update_follow_up',{p_customer_id:c.id,p_action:o,p_remarks:cl(d.rem),p_new_date:o=='cb'?d.nd:null});if(q.error)throw q.error;
ui.m=null;await load();if(o=='lead')pop();tt('Status updated');R()},
async ra(d){const q=await sb.rpc('reassign_customer',{p_customer_id:ui.m.id,p_exec_id:d.to});if(q.error)throw q.error;ui.m=null;await load();tt('Customer reassigned');R()},
async rp(d){if(!pw6(d.pw))return;const e=S.team.find(x=>x.id==ui.m.id),q=await sb.rpc('admin_reset_executive_password',{p_exec_id:ui.m.id,p_new_password:d.pw});if(q.error)throw q.error;ui.m=null;tt('Password reset for '+e.full_name);R()}};
const A={
out(){sb.auth.signOut();me=null;ui.a='login';R()},role(v){ui.r=v;R()},auth(v){ui.a=v;R()},nav(v){ui.v=v;ui.up=null;R()},tab(v){ui.tab=v;R()},
copy(){const k=S.key,f=()=>tt('Copy blocked here. Your key is '+k);try{navigator.clipboard.writeText(k).then(()=>tt('Key '+k+' copied'),f)}catch(e){f()}},
st(v){ui.m={t:'st',id:v};M()},ra(v){ui.m={t:'ra',id:v};M()},rp(v){ui.m={t:'rp',id:v};M()},help(){ui.m={t:'help'};M()},x(){ui.m=null;M()},
inst(){dp?(dp.prompt(),dp.userChoice.then(()=>{dp=null})):A.help()},
rm(v){ui.up.splice(+v,1);R()},cancelup(){ui.up=null;R()},
saveall(){const u=ui.up;if(u.some(r=>!r.n||!ph(r.p)||!r.d)){R();return tt('Fix the highlighted rows (name, valid +91 mobile, date) or delete them')}
if(ui.fu=='c'&&(!ui.cd||ui.cd<TD()))return tt('Pick a custom follow-up date (today or later)');
return run(async()=>{const rows=u.map(r=>({name:r.n,phone:ph(r.p),last:r.d,due:ui.fu=='c'?ui.cd:add(r.d,+ui.fu),note:r.t||''})),q=await sb.rpc('save_customers',{p_rows:rows});if(q.error)throw q.error;
await load();ui.up=null;ui.v='list';tt(q.data.added+' added, '+q.data.updated+' updated');R()})},
sample(){try{const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet([['Customer Name','Phone Number','Purchase Date','Notes'],['Ravi Kumar','9876543210',TD(),'Prefers WhatsApp'],['Sita Devi','9123456789',add(TD(),-5),'Asked about a discount']]),'Customers');XLSX.writeFile(wb,'Follow-Up-Sample.xlsx')}catch(e){tt('Download unavailable here')}},
tg(v){return run(async()=>{const e=S.team.find(u=>u.id==v),q=await sb.rpc('set_executive_active',{p_exec_id:v,p_active:!e.is_active});if(q.error)throw q.error;await load();tt(e.full_name+(e.is_active?' deactivated':' activated'));R()})}};
/* ---------- upload parser: PDF / Excel / CSV, 100% in the browser ---------- */
async function pf(f){if(!f)return;const x=f.name.split('.').pop().toLowerCase(),rows=[];
try{const b=await f.arrayBuffer();
if(x=='pdf'){try{pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'}catch(e){}
const pdf=await pdfjsLib.getDocument({data:b}).promise;
for(let i=1;i<=pdf.numPages;i++){const tc=await(await pdf.getPage(i)).getTextContent(),g={};tc.items.forEach(t=>{const y=Math.round(t.transform[5]/3);(g[y]=g[y]||[]).push(t)});
Object.keys(g).sort((a,b)=>b-a).forEach(y=>{const l=g[y].sort((a,b)=>a.transform[4]-b.transform[4]).map(t=>t.str).join(' '),pm=l.match(/(?:\+?91[\s-]*)?[6-9]\d{4}[\s-]*\d{5}/);
if(pm){const dm=l.match(/\d{4}-\d{1,2}-\d{1,2}|\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}/);rows.push({n:cl(l.replace(pm[0],' ').replace(dm?dm[0]:'',' ').replace(/^\s*\d{1,3}[.)]?\s+/,'').replace(/[|,;]+/g,' ')),p:ph(pm[0]),d:dm?nd(dm[0]):'',t:''})}})}}
else{const wb=XLSX.read(b,{cellDates:true}),a=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,raw:true,defval:''}),h=a[0].map(v=>String(v).toLowerCase()),fi=re=>h.findIndex(v=>re.test(v));
let ni=fi(/name/),pi=fi(/phone|mobile/),di=fi(/date|purchase/),ti=fi(/note|remark|comment/);const hdr=ni>=0||pi>=0||di>=0;if(ni<0)ni=0;if(pi<0)pi=1;if(di<0)di=2;
a.slice(hdr?1:0).forEach(r=>{if(r.some(v=>String(v).trim()))rows.push({n:cl(r[ni]),p:ph(r[pi])||cl(r[pi]),d:nd(r[di]),t:ti>=0?cl(r[ti],500):''})})}
}catch(e){return tt('Could not read that file. Try the sample template.')}
if(!rows.length)return tt('No customers found in that file');ui.up=rows.slice(0,500);R()}
/* ---------- events ---------- */
document.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(!el||/^(SELECT|INPUT|OPTION)$/.test(el.tagName))return;e.preventDefault();const f=A[el.dataset.a];if(f)f(el.dataset.v)});
document.addEventListener('change',e=>{const el=e.target,a=el.dataset.a;if(a=='flt'){ui.f=el.value;R()}else if(a=='fu')$('#cd').style.display=el.value=='c'?'block':'none';else if(a=='oc')$('#cbd').style.display=el.value=='cb'?'block':'none';else if(a=='bf'){ui.fu=el.value;$('#bc').style.display=el.value=='c'?'block':'none'}else if(a=='bc')ui.cd=el.value;else if(el.id=='fl'){const f=el.files[0];el.value='';run(()=>pf(f))}});
document.addEventListener('input',e=>{const el=e.target,k=el.dataset.k;if(k&&ui.up){ui.up[+el.dataset.i][k]=k=='d'?el.value:cl(el.value,k=='t'?500:120)}});
document.addEventListener('submit',e=>{e.preventDefault();const f=e.target,h=FH[f.dataset.f];if(h)run(()=>h(Object.fromEntries(new FormData(f))))});
/* ---------- PWA: install prompt, offline banner, service worker ---------- */
addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e});addEventListener('appinstalled',()=>{$('#ib').hidden=true});
const net=()=>{$('#of').hidden=navigator.onLine};addEventListener('online',net);addEventListener('offline',net);net();
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
/* ---------- boot ---------- */
sb.auth.onAuthStateChange(ev=>{if(ev=='PASSWORD_RECOVERY'){rec=true;me=null;ui.a='newpw';R()}else if(ev=='SIGNED_OUT'&&me){me=null;R()}});
(async()=>{$('#hl').innerHTML=LG;if(rec){ui.a='newpw';R();return}
const s=await sb.auth.getSession();if(s.data.session)await enter(s.data.session.user.id);else R();setInterval(poll,15000)})();
