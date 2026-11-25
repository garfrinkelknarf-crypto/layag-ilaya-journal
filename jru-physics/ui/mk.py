RAW="https://raw.githubusercontent.com/garfrinkelknarf-crypto/layag-ilaya-journal/main/jru-physics/ui/render.js"
def widget(key,mode):
    return '<script>window.__K="%s";window.__MODE="%s";fetch("%s?v="+Date.now()).then(function(r){return r.text()}).then(function(t){var s=document.createElement("script");s.textContent=t;document.body.appendChild(s)});</script>'%(key,mode,RAW)
for k in ["w1-lesson","w1-activity","w1-quiz"]:
    for m in ["head","next"]:
        open(f"widget_{k}_{m}.html","w").write(widget(k,m))
