import re, os, json, statistics as st, sys
from datetime import datetime
from collections import Counter, defaultdict
root=sys.argv[1]
ev_re=re.compile(r'^## (\d{4}-\d\d-\d\d \d\d:\d\d:\d\d) UTC — event (\d+)\s*$')
cases=[]
for d in sorted(os.listdir(root)):
    p=os.path.join(root,d,'history.md')
    if not os.path.exists(p): continue
    idx=open(os.path.join(root,d,'index.md')).read()
    role=re.search(r'Source role:\*\* (.+)',idx).group(1).strip()
    title=idx.splitlines()[0].split(':',1)[1].strip()
    status=re.search(r'Status:\*\* (.+)',idx).group(1).strip()
    txt=open(p).read()
    parts=re.split(r'(?m)^(## \d{4}-\d\d-\d\d \d\d:\d\d:\d\d UTC — event \d+)\s*$',txt)
    evs=[]
    for i in range(1,len(parts),2):
        m=ev_re.match(parts[i]); body=parts[i+1]
        g=lambda k: (re.search(r'\*\*'+k+r':\*\* (.+)',body) or [None,''])[1].strip()
        content=re.sub(r'(?m)^- \*\*(Channel|From|To):\*\*.*$','',body).strip()
        evs.append(dict(t=datetime.strptime(m.group(1),'%Y-%m-%d %H:%M:%S'),n=int(m.group(2)),ch=g('Channel'),fr=g('From'),to=g('To'),body=content))
    cases.append(dict(id=d,title=title,role=role,status=status,evs=evs))

def party(fr):
    f=fr.lower()
    if 'tenant' in f: return 'tenant'
    if 'landlord' in f: return 'landlord'
    if 'contractor' in f or 'provider' in f or f not in ('agency / system','northbridge lettings','northbridge lettings system'): return 'contractor'
    return 'agency'

prompts={
 'check_response':r'Please check if we need to provide a response',
 'need_ll_confirmation':r'Need confirmation from landlord',
 'change_mode':r'Manually updated via Change Mode',
 'no_work_results':r'No work results',
 'review_manually':r'Please review and proceed manually',
 'extract_fail':r'expected data could not be extracted',
 'three_reminders':r'3\+ reminders',
 'supervisor_close':r'completed by supervisor',
 'll_approval_first':r'complete landlord approval step first',
 'approve_provider':r'approve selection of provider',
 'key_return':r'check the key return',
 'skipped_docs':r'Skipped uploading',
}
agg=Counter(); waits=defaultdict(float); rows=[]
holdreasons=Counter(); human_by_ch=Counter(); auto_by_ch=Counter()
money=[]
stage_gaps=defaultdict(list)
for c in cases:
    e=c['evs']; t0=e[0]['t']; t1=e[-1]['t']
    days=(t1-t0).total_seconds()/86400
    pc=Counter(); 
    for ev in e:
        for k,r in prompts.items():
            if re.search(r,ev['body'],re.I): pc[k]+=1
    agg.update(pc)
    # human vs automated
    hum=0
    for ev in e:
        if ev['fr'] in ('Northbridge Lettings',) : hum+=1; human_by_ch[ev['ch']]+=1
        elif party(ev['fr'])=='agency': auto_by_ch[ev['ch']]+=1
    inbound=Counter(party(ev['fr']) for ev in e if party(ev['fr'])!='agency')
    tenant_chases=max(0,inbound['tenant'])
    # wait attribution
    cur=None; cw=defaultdict(float)
    for a,b in zip(e,e[1:]):
        m=re.search(r'Reason: Waiting for (\w+)',a['body'])
        if a['ch']=='Hold' and m: cur=m.group(1).lower(); holdreasons[cur]+=1
        pa=party(a['fr'])
        if cur and pa==cur: cur=None
        if re.search(r'Maintenance provider assigned|Landlord approval confirmed|Visit date|moved to Result|marked as completed|request is now closed',a['body']) and cur and a['ch']!='Hold': cur=None
        gap=(b['t']-a['t']).total_seconds()/86400
        cw[cur or 'active/unattributed']+=gap
    for k,v in cw.items(): waits[k]+=v
    # milestones
    def first(rx):
        for ev in e:
            if re.search(rx,ev['body']): return ev['t']
    ms={'approval':first(r'Landlord approval confirmed|Quote was approved'),'assigned':first(r'Maintenance provider assigned'),'visit':first(r'Visit date (selected|confirmed)'),'done':first(r'marked as completed|moved to Result'),'closed':first(r'request is now closed|completed without payment|completed by supervisor')}
    seq=[('created',t0)]+[(k,v) for k,v in ms.items()]
    for k,v in ms.items():
        if v: stage_gaps['created->'+k].append((v-t0).total_seconds()/86400)
    if ms['done'] and ms['closed'] and ms['closed']>=ms['done']: stage_gaps['done->closed'].append((ms['closed']-ms['done']).total_seconds()/86400)
    for ev in e:
        for m in re.finditer(r'£\s?([\d,]+(?:\.\d\d)?)',ev['body']): money.append(float(m.group(1).replace(',','')))
    rem=sum(1 for ev in e if re.search(r'reminder',ev['body'],re.I))
    rows.append(dict(id=c['id'],title=c['title'],role=c['role'],status=c['status'],events=len(e),days=round(days,1),human=hum,holds=sum(1 for ev in e if ev['ch']=='Hold'),inbound=dict(inbound),prompts=dict(pc),reminders=rem,wait={k:round(v,1) for k,v in cw.items()}))
days=[r['days'] for r in rows]
out=dict(n=len(rows),events=sum(r['events'] for r in rows),days_median=st.median(days),days_mean=round(st.mean(days),1),days_p90=sorted(days)[int(.9*len(days))],days_max=max(days),
 human_events=sum(r['human'] for r in rows),human_per_case_median=st.median([r['human'] for r in rows]),human_by_channel=dict(human_by_ch),auto_by_channel=dict(auto_by_ch),
 prompts=dict(agg),hold_reasons=dict(holdreasons),wait_days_total={k:round(v,1) for k,v in waits.items()},
 stage_median={k:round(st.median(v),1) for k,v in stage_gaps.items()},stage_n={k:len(v) for k,v in stage_gaps.items()},
 money_n=len(money),money_median=st.median(money) if money else 0,money_sum_unique=round(sum(set(money)),0),
 roles=dict(Counter(r['role'] for r in rows)),statuses=dict(Counter(r['status'] for r in rows)))
json.dump(dict(summary=out,rows=rows),open(sys.argv[2],'w'),indent=1,default=str)
print(json.dumps(out,indent=1))
