module.exports = {
  lang: {
    langname: "English",
    display: "🇺🇸 English",
    code: "en"
  },
  command: {
    start: "Hello, I am {botname}.\nThe language you use can be seen by using /me@{botid}.\nIf you want to use another language, please use /lang@{botid}.",
    uptime: {
      message: "This bot is currently running for {hour} hour {min} minutes {sec} seconds."
    },
    search: {
      not_found: "Hmm.. No results found!",
      error: "There was a problem sending your search results!\nTry <b>{botid} google {keyword}</b>!",
      blank: "Please enter your search words!",
      result: "Search results",
      visit_page: "Visit Page",
      another: "Other Search Results",
      desc_null: "Go to the URL for more information!",
      bot_block: "Due to Google's anti-bot policy, it is not searchable. Please try again in a few minutes.",
      visit_google: "Search by Google"
    },
    img:{
      not_found:"Hmm.. No results found!",
      error:"There was a problem sending the image!\nTry it with <b>{botid} img {keyword}</b>!",
      blank:"Please enter your search words!",
      visit_page:"Visit Page",
      view_image:"View Image",
      another:"Other Search Results"
    },
    lang:{
      isgroup:"You can not change the language in Group Chat. Thank you for your personal chat.",
      announce:"If you would like to change the language to use, please select from the list below.",
      success:"🇺🇸 The language to be used in English has changed.",
      error:"Failed to change language. Please try again."
    },
    whatanime:{
      name:"Japanese name",
      english:"English name",
      episode:"Episode",
      time:"Time",
      match:"accuracy",
      info:"Please reply with an animated screenshot and you can search what animations are.",
      incorrect:"This is not exactly ...",
      isAdult:"For adult animation, it does not provide a preview.",
      not_found: "No search results."
    },
    welcome:{
      success:"The message is set up well.",
      help:
`
How to write an entry message: {roomid} specifies the name of this room, and {userid} is the name of the user.
You can turn the entry message on and off with on/off.

Setting: \`/welcome@{botid} set Welcome to {roomid}, {userid}!\`
Activate: \`/welcome@{botid} on\`
Deactivate: \`/welcome@{botid} off\`
Reset: \`/welcome@{botid} reset\`
`
    },
    leave:{
      success: "The message is set up well.",
      help:
`
How to write an leave message: {roomid} specifies the name of this room, and {userid} is the name of the user.
You can turn the leave message on and off with on/off.

Setting: \`/leave@{botid} set {userid} has been removed from {roomid}.\`
Activate: \`/leave@{botid} on\`
Deactivate: \`/leave@{botid} off\`
Reset: \`/leave@{botid} reset\`
`
    },
    msginfo: {
      success: "It is the information of the desired message.",
      alert: "Please reply to the message you want!"
    },
    homepage: {
      message: "Here is {botname}'s homepage.",
      button: "Shortcuts"
    },
    weather: {
      message: "The weather information of the place you asked.\n\nWind speed: {windSpeed}m/s\nWind direction: {windDeg}\nHumidity: {humidity}%\nCurrent temperature: {tempCur}℃\nCurrent weather: {weather}",
      command: "Send me where you want to find the weather! Let's find the weather information quickly! In addition, you can't send locations from your PC yet!",
      apierror: "I'm having trouble getting weather information. Please try again in a few minutes.",
    },
    google: {
      info: "Please send me a message to translate in reply!",
      language: "Unsupported language."
    },
    calc: {
      info: "Please enter a formula to calculate by reply!",
      error: "An error occurred during the calculation."
    },
    lowPermission:"You lack the right to use this feature.",
    isnotgroup:"You can not do this unless you are a group or a super group.",
    me:"`User ID :{userid}`\n`First name :{fname}`\n`Last name :{lname}`\n`ID :{name}`\n`Use language :{lang}`\n",
    help:{
      content:"What this bot can do is described on the homepage.\nThe current version of this bot is {version}.",
      contact:"Contact Developer",
      donate: "Donate"
    }
  },
  message: {
    except: "error. Stickers and images can not be processed.",
    join: "{userid}, welcome to {roomid}.",
    left: "{userid} has left {roomid}.",
    botjoin: "Hello, Thank you for allowing me to work in this room. Thank you very much.",
    error: "Something's wrong!",
    not_request: "You are not the user who requested this feature."
  },
  tobot: "Go to bot"
}
