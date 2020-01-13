# sm4js
An implementation of the browser and server side of the sm4 algorithm

## install
With npm do:
```js

npm install sm4js 
```

For use in web browsers do:
```js
<script src="sm4js.min.js"></script>
```
## config
sm4js has four  configuration parameters, key, mode,cipherType and iv.
* key -encrypt/decypt main key;A string of length 12;
* mode -optional; can be 'cbc' or 'ecb';default ecb;
* iv -optional; when use cbc mode, it's �necessary;default is null;
* cipherType - optional; this is the cipher data's type; Can be 'base64' or 'text';default is base64;
## methods
sm4js has tow exposed functions, encrypt and decrypt, which both take a single argument.
* encrypt:Takes a  json string and returns a base64 string;
* encrypt:Takes a  base64 string and returns a json string;
## compatibility
This plugin is native to ie10+ and you should add [polyfill](https://github.com/inexorabletash/polyfill/blob/master/typedarray.js) if you want to be compatible with ie9;
like this:

```js
<script src="typearray.js"></script>
<script src="sm4js.min.js"></script>
```
## usege 
```js
var sm4Config = {
    key: 'JeF8U9wHFOMfs2Y8',
    mode: 'ecb', 
    iv: 'UISwD9fW6cFh9SNS', 
    cipherType: 'base64' 
}
var sm4 = new Sm4js(sm4Config);
var plaintext = '{"records":[["31","129501868966","1","80.00","6","激进型","20191226","20211225","1","自然人客户风险承受能力问卷","01235","1","3.0","20200623","","-1"]],"columns":["SURVEY_SN","USER_CODE","USER_ROLE","SURVEY_SCORE","RATING_LVL","RATING_LVL_NAME","RATING_DATE","EXP_DATE","SURVEY_CLS","SURVEY_NAME","SURVEY_SYN","ORDINAL","VERSION","NEXT_RATING_DATE","REMARK","SURVEY_USABLE_NUM"]}'
var ciphertext = sm4.encrypt(plaintext);
console.log(ciphertext);
// console.log('j/+HgSpv8RZQI2YtSq0L1RnemiSokMm1VvLHSTt245U=')
var plaintext1 = sm4.decrypt(ciphertext);
console.log(plaintext1);

```
## license
MIT