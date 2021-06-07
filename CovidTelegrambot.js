var request = require('request');
var TelegramBot = require('node-telegram-bot-api');  // npm package("https://www.npmjs.com/package/telegram-bot-api")
var apikey = "1879416160:AAH-igTtfJkX-AcQ9dJyw4aqvZWTkqu2B9U";  // A key is generated by Bot father in Telegram

var bot = new TelegramBot(apikey, {polling: true});  // according to documentation in npm package

bot.on('message',function(msg){  // msg is the input given by the user

	var temp = msg.text;

	if(temp == "Hey"){

		bot.sendMessage(msg.chat.id,"Hey, what can I do for u?"); // sendMessage fun() is send to bot

	}
	else if(temp == "Ok, thank u"){

		bot.sendMessage(msg.chat.id,"Welcome :)");

	}
	else{

		var country = temp.replace("Covid cases in ","");  // after replacing country name is assigned

  		request('https://coronavirus-19-api.herokuapp.com/countries/'+country,function(err,res,body){  // Covid cases api link

			if(err){

	  			bot.sendMessage(msg.chat.id,'Something went wrong');  // any error is occured

			}
			else{

     			bot.sendMessage(msg.chat.id,"Country: "+country+"\nTotal no of cases: "+JSON.parse(body).cases+"\nToday cases: "+JSON.parse(body).todayCases+"\nActive cases: "+JSON.parse(body).active+"\nTotal no of deaths: "+JSON.parse(body).deaths);
    		
			} // Displays all covid cases details according to country

		})

  	}

})

