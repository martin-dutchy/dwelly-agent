import re,os,sys,json,statistics as st
from datetime import datetime
from collections import Counter,defaultdict
root=sys.argv[1]
def party(s):
    f=s.lower()
    if 'tenant' in f: return 'tenant'
    if 'landlord' in f: return 'landlord'
    if f in ('agency / system','northbridge lettings','northbridge lettings system','not specified',''): return 'agency'
    return 'contractor'
lat=defaultdict(list); chases=defaultdict(list); deadair=[]; holdc=Counter(); holdtxt=[]
rows=[]
for d in sorted(os.listdir(root)):
    p=os.path.join(root,d,'history.md')
    if not os.path.exists(p): continue
    txt=open(p).read()
    parts=re.split(r'(?m)^## (\d{4}-\d\d-\d\d \d\d:\d\d:\d\d) UTC — event (\d+)\s*$',txt)
    evs=[]
    for i in range(1,len(parts),3):
        b=parts[i+2]; g=lambda k:(re.search(r'\*\*'+k+r':\*\* (.+)',b) or [None,''])[1].strip()
        evs.append(dict(t=datetime.strptime(parts[i],'%Y-%m-%d %H:%M:%S'),ch=g('Channel'),fr=g('From'),to=g('To'),body=b))
    pending={}
    for ev in evs:
        fp=party(ev['fr']); tp=party(ev['to'])
        if fp=='agency' and tp!='agency' and ev['ch'] in('Email','SMS','Call'):
            if tp not in pending: pending[tp]=[ev['t'],0]
            pending[tp][1]+=1
        elif fp!='agency' and fp in pending:
            t0,n=pending.pop(fp); lat[fp].append((ev['t']-t0).total_seconds()/3600); chases[fp].append(n)
        m=re.search(r'Reason: Waiting for ([\w ]+?)\.',ev['body'])
        if ev['ch']=='Hold' and m: holdc[m.group(1)]+=1
        mc=re.search(r'Comment: (.+)',ev['body'])
        if ev['ch']=='Hold' and mc: holdtxt.append(mc.group(1)[:90])
    for p_,(t0,n) in pending.items(): chases[p_+'_never_replied'].append(n)
    for a,b in zip(evs,evs[1:]):
        g=(b['t']-a['t']).days
        if g>=3: deadair.append(g)
    dur=(evs[-1]['t']-evs[0]['t']).total_seconds()/86400
    rows.append((d,round(dur,1)))
H=lambda v: dict(n=len(v),median_h=round(st.median(v),1),mean_h=round(st.mean(v),1),p75_h=round(sorted(v)[int(.75*len(v))],1)) if v else {}
print(json.dumps({'reply_latency':{k:H(v) for k,v in lat.items()},'msgs_before_reply':{k:dict(n=len(v),mean=round(st.mean(v),2),max=max(v)) for k,v in chases.items()},
 'dead_air_gaps_3d+':dict(n=len(deadair),total_days=sum(deadair)),'hold_reasons':holdc},indent=1))
print(Counter(holdtxt).most_common(25))
