import base64js from 'base64-js';
class Proxy{
    constructor(config){

    }
    zero(n){
        var a;
        if(n>0){
            a="0";
            for(var j=1;j<n;j++){
                a+=a;
            }
            return a;
        }
        return '';
        
    }
    stringToArray(string){
      
        // debugger;
        var arr=[];
        var length=string.length;
        for(var i=0;i<length;i++){
            var code=string.charCodeAt(i);
            if(19968<code&&code<40869){
                var bin=code.toString(2);
                var bin1='1110';
                var bin2='10';
                var bin3='10';
                var binlen=bin.length;
                if(binlen<=6){
                    bin3=bin3+this.zero(6-binlen)+bin;
                    bin2=bin2+this.zero(6);
                    bin1=bin1+this.zero(4);
                }else if(binlen>6&&binlen<=12){
                    bin3=bin3+bin.slice(-6);
                    bin2=bin2+this.zero(12-binlen)+bin.substr(0,binlen-6);
                    bin1=bin1+this.zero(4);
                }else{
                    bin3=bin3+bin.slice(-6);
                    bin2=bin2+bin.substr(binlen-12,6);
                    bin1=bin1+this.zero(16-binlen)+bin.substr(0,binlen-12);
                }
                arr.push(parseInt(bin1,2),parseInt(bin2,2),parseInt(bin3,2));   
            }else{
                arr.push(code);
            }
        }
        return arr;
        
    }
    stringToArrayBufferInUtf8  (str) {
        // if not browser env, then require node.js's util. otherwise just use window's
        // const TextEncoder = (typeof window === 'undefined') ? require('util').TextEncoder : window.TextEncoder
        // always utf-8
        
        return this.stringToArray(str);
    }
    utf8ArrayBufferToString  (strBuffer) {
        // if not browser env, then require node.js's util. otherwise just use window's
        // const TextDecoder = (typeof window === 'undefined') ? require('util').TextDecoder : window.TextDecoder
        // var decoder = new TextDecoder('utf-8')
        var string="";
        var length=strBuffer.length;
        for(var i=0;i<length;){
            var chart;
            var bin11=parseInt(strBuffer[i]).toString(2);
            
            if(bin11.substr(0,1)==1&&bin11.length==8){
                var bin1=parseInt(strBuffer[i]).toString(2).substr(4);
                var bin2=parseInt(strBuffer[i+1]).toString(2).substr(2);
                var bin3=parseInt(strBuffer[i+2]).toString(2).substr(2);
                var bin=parseInt(bin1+bin2+bin3,2);
                chart=String.fromCharCode(bin);
                i=i+3;
            }else{
                chart=String.fromCharCode(parseInt(bin11,2));
                i++;
            }
            string+=chart;   
                
        }
        return string;
    }
    arrayBufferToBase64  (strBuffer) {
        return base64js.fromByteArray(strBuffer);
    }
    base64ToArrayBuffer  (base64) {
        return base64js.toByteArray(base64);
    }
}
export {Proxy};
