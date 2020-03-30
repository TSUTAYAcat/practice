this.onmessage=(ev)=>{
   let {a,b}=ev.data
   let result = a+b
   this.postMessage(result)
}