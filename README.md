# NodeJs Otp Authenticater

### Librarys included:
 * express
 * express-handlebars
 * body-parser
 * messagebird
 * dotenv
 
### Step One:

```javascript
  const express=require("express"); <br/>
  const expressHandlebars=require("express-handlebars"); <br />
  const bodyParser=require("body-parser"); <br />
  const messagebird=require("messagebird")(API_KEY_OF_MESSAGEBIRD); <br />
  require('dotenv').config();
 ``` 
 
### Send Otp to phone number:

```javascript
messagebird.verify.create{MOBILE_NUMBER_WITH_INTERNATIONEL_CODE, <br/>
         originator : 'Code',
        template:"Your verification code is %token"
    }, (err, response)=>{
        if(err){
            console.log(err.erros[0].description);
        }else{
            console.log(response.id)
            res.render('step2', {
                id:response.id
            })
        }
    })
```
    
### Recive Verfiy OTP Number:

```javascript
messagebird.verify.verify(RESPONSE_ID, VERIFICATION_CODE_ENTERD_BY_USER, (err, response)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Code Succusfully Verified");
        }
    })
```
