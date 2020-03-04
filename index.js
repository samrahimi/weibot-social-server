

var express = require("express");
var app = express();
var port = process.env.PORT || 3000
var isSocialBot=(userAgent) => {
    if (!userAgent) return true;

    return (userAgent.toLowerCase().indexOf("facebook") >=0  ||  userAgent.toLowerCase().indexOf("twitter") >=0)
}
app.listen(port, () => {
 console.log("Server running on port "+port);
 app.get('/search-results/:hashtagText', (req, res, next) => {
    var html = (isSocialBot(req.header('User-Agent'))) ?
    `<!DOCTYPE html>
    <html>
    <head>
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="#${decodeURIComponent(req.params["hashtagText"])}# on WeiBlocked">
    <meta name="twitter:description" content="Uncensored search results for ${decodeURIComponent(req.params["hashtagText"])} and thousands of other politically sensitive Weibo hashtags, permanently archived on the blockchain">
    <meta name="twitter:site" content="@2020WriteIn">

    <meta name="og:title" content="#${decodeURIComponent(req.params["hashtagText"])}# on WeiBlocked">
    <meta name="og:description" content="Uncensored search results for #${decodeURIComponent(req.params["hashtagText"])}# and thousands of other politically sensitive Weibo hashtags, permanently archived on the blockchain">

    <title>${decodeURIComponent(req.params["hashtagText"])} on WeiBlocked</title></head>
    <body>
        <p><a href="https://weibo-uncensored.github.io/#/weibo-viewer/#${decodeURIComponent(req.params["hashtagText"])}#/posts">View On WeiBlocked</a></p>
    </body>
    </html>`
    
    :

    `<!DOCTYPE html>
    <html>
     <head><title>Redirecting to WeiBlocked</title>
     <script>
     window.location.href='https://weibo-uncensored.github.io/#/weibo-viewer/#${decodeURIComponent(req.params["hashtagText"])}#/posts'; 
     </script>
     </head>
     <body><center>Please Wait...</center></body>
     </html>
     `

    res.contentType('text/html')
    res.send(html);
 })

 app.get("/post/:txid", (req, res, next) => {
    var html = (isSocialBot(req.header("User-Agent"))) ?
    `<!DOCTYPE html>
    <html>
    <head>
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="WeiBlocked Post">
    <meta name="twitter:description" content="This post was archived from Weibo and has been permanently added to the blockchain to protect it from censorship. The original content creator has been anonymized">
    <meta name="twitter:image" content="https://arweave.net/${req.params["txid"]}">
    <meta name="twitter:site" content="@2020WriteIn">

    <meta name="og:title" content="WeiBlocked Post">
    <meta name="og:description" content="This post was archived from Weibo and has been permanently added to the blockchain to protect it from censorship. The original content creator has been anonymized">
    <meta name="og:image" content="https://arweave.net/${req.params["txid"]}">

    <title>WeiBlocked Post</title></head>
    <body>
        <img src="https://arweave.net/${req.params["txid"]}
        <p><a href="https://weibo-uncensored.github.io/#/weibo-viewer/post/${req.params['txid']}">View On WeiBlocked</a></p>
    </body>
    </html>`
    :
    `<!DOCTYPE html>
    <html>
     <head><title>Redirecting to WeiBlocked</title>
     <script>
     window.location.href='https://weibo-uncensored.github.io/#/weibo-viewer/post/${req.params['txid']}'; 
     </script>
     </head>
     <body><center>Please Wait...</center></body>
     </html>
     `
    res.contentType('text/html')
    res.send(html);

   });
   
});
