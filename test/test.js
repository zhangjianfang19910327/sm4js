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
var plaintext1 = sm4.decrypt(ciphertext);
console.log(plaintext1);
//MziAMkwaKe2o+IS5G0TCl3zaRhY3F6YydrQl0cWBQTouvY6mk9fEINoJEGGX/EHdMf2z3DeuBa+ZOYaMfisJ0dr9s6RtI0PRTyWmMnQS0ajVKf7P7yrm64Wliam+t3x7KMx0EMSlnUrr7aE9vEGmECbMKEom5SUjoOsqtyQV29NCg5U71xnM5X3q6O69AzQuoKyzgd4Y2fm54ybTIvIoctHkNefZJ8L8DZm2pVk5iJOByu6dowuME+LeRHR5wjxzTPmVFGLUSBYSR/c+mZd1ndOhi4U7IWFNqXjwa8kNSMTK/lF9fhhxUEAL9P7VllPbQs3OxuYB7h6owZP6egs/BukfRpCp2mgd1HAbQbjeaDA2HVn/0RMPiB0vcU2BQrL0XEj7zVoiJsNew3oO7VAxlqv50Uj16ki4ZAB13A8oazNqA2SMR2il9+d8+N7jUJA+uN06cbM9/X8xUZs37L96O8J32QPDpKJUig1ka/u8py05dUZ9iKNTymoiyun9BGAptJt2xk/sxuP/JTbAllQUhg==
//{"records":[["31","129501868966","1","80.00","6","激进型","20191226","20211225","1","自然人客户风险承受能力问卷","01235","1","3.0","20200623","","-1"]],"columns":["SURVEY_SN","USER_CODE","USER_ROLE","SURVEY_SCORE","RATING_LVL","RATING_LVL_NAME","RATING_DATE","EXP_DATE","SURVEY_CLS","SURVEY_NAME","SURVEY_SYN","ORDINAL","VERSION","NEXT_RATING_DATE","REMARK","SURVEY_USABLE_NUM"]}