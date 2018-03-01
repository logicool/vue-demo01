export function groupStart(type='GET',param) {
    if(console.group){
      console.group("%c%s %s","font-weight:bold;color:#0000ff",type,param);
    }  
}
export function groupEnd(type='GET',param) {
    if(console.groupEnd){
      console.log("%c------------------End-----------------", "font-weight:bold;color:#0000ff");
      console.groupEnd("%c%s %s", "font-weight:bold;color:#f22",type,param);
    }
}