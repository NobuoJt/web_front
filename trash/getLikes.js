//ruquire OAuth module
//needs BEARER_TOKEN   serviceName accessTokenUrl requestTokenUrl authorizationUrl consumerKey consumerSecret
function getElonsLikes() {
  const url = "https://api.twitter.com/2/users/44196397/liked_tweets";
 const options = {
    'method' : 'get',
    'headers': { "Authorization": 'Bearer ' + BEARER_TOKEN },
    'muteHttpExceptions' : true
  };
  const r=makeRequest(url, options);
  return
}

function makeRequest(url, options) {
  const service = getService();
  let result
  let retryCount=0;
  for(let retryFlag=0;retryFlag<1&&retryCount<4;retryFlag++){
    try{
      const res = service.fetch(url, options);
      result = JSON.parse(res.getContentText());
    }catch(e){
      Logger.log("HTTP exp on tweet message:" + e.message + "\nfileName:" + e.fileName + "\nlineNumber:" + e.lineNumber + "\nstack:" + e.stack);
     retryFlag=1;
     retryCount++;
    }
  }
  return result
}

function getService() {
  return OAuth1.createService(serviceName)
    .setAccessTokenUrl(accessTokenUrl)
    .setRequestTokenUrl(requestTokenUrl)
    .setAuthorizationUrl(authorizationUrl)
    .setConsumerKey(consumerKey)
    .setConsumerSecret(consumerSecret)
    .setCallbackFunction('authCallback')
    .setPropertyStore(PropertiesService.getUserProperties());
}
