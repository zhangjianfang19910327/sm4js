var sm4js=require('./../lib/sm4js');
var sm4Config = {
    key: 'JeF8U9wHFOMfs2Y8',
    mode: 'ecb', 
    iv: 'UISwD9fW6cFh9SNS', 
    cipherType: 'base64' 
}
var sm4 = new sm4js(sm4Config);
var plaintext = '{"records":[["31","129501868966","1","80.00","6","激进型","20191226","20211225","1","自然人客户风险承受能力问卷","01235","1","3.0","20200623","","-1"]],"columns":["SURVEY_SN","USER_CODE","USER_ROLE","SURVEY_SCORE","RATING_LVL","RATING_LVL_NAME","RATING_DATE","EXP_DATE","SURVEY_CLS","SURVEY_NAME","SURVEY_SYN","ORDINAL","VERSION","NEXT_RATING_DATE","REMARK","SURVEY_USABLE_NUM"]}'
var ciphertext = sm4.encrypt(plaintext);
console.log(ciphertext);
// console.log('j/+HgSpv8RZQI2YtSq0L1RnemiSokMm1VvLHSTt245U=')
var plaintext1 = sm4.decrypt(ciphertext);
console.log(plaintext1);