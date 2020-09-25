(this.webpackJsonpmarket=this.webpackJsonpmarket||[]).push([[0],{117:function(t,e,n){},118:function(t,e,n){"use strict";n.r(e);var a=n(1),i=n.n(a),o=n(59),s=n.n(o),r=(n(77),n(60)),c=n(61),l=n(3),h=n(71),g=n(70),u=n(62),d=n.n(u),p=n(63),P=n.n(p),S=n(64),m=n.n(S),y=n(65),k=n.n(y),v=n(66),f=n.n(v),E=n(67),I=n.n(E),b=n(68),C=n.n(b),F=n(69),L=n.n(F),T=n(2),A=n.n(T),K=function(t){Object(h.a)(a,t);var e=Object(g.a)(a);function a(){var t;return Object(r.a)(this,a),(t=e.call(this)).callSound=function(){var e=[!1,!1,!1,!1,!1,!1,!1,!1],n=(t.state.currentStockPrice-t.state.previousStockPrice)*(100/t.state.notePercentRange);n>1?e[6]=!0:n<-1?e[2]=!0:n<0?e[3]=!0:n>0?e[5]=!0:e[4]=!0,console.log(n),console.log(e),t.setState({notes:e})},t.callStockAPI=function(){t.setState({notes:[!1,!1,!1,!1,!1,!1,!1,!1]});var e=n(83);e.ApiClient.instance.authentications.api_key.apiKey=t.state.apiKey,(new e.DefaultApi).quote(t.state.currentStock,(function(e,n,a){e||void 0===n.c?(console.log("Something went wrong. Please check your API key and ticker symbol"),t.setState({startPriceTracking:!1})):(console.log(n),console.log(n.c),t.setState({previousStockPrice:t.state.currentStockPrice}),t.setState({currentStockPrice:n.c}),t.callSound())}))},t.priceTrackingCycle=function(){var e=Object(l.a)(t);setInterval((function t(){!0===e.state.startPriceTracking?e.callStockAPI():clearInterval(t)}),1e3*t.state.apiCallInterval)},t.onApiKeyChange=function(e){t.setState({apiKey:e.target.value})},t.onCurrentStockChange=function(e){t.setState({currentStock:e.target.value})},t.onApiIntervalChange=function(e){t.setState({apiCallInterval:e.target.value})},t.onNotePercentChange=function(e){t.setState({notePercentRange:e.target.value})},t.onApiKeyEntered=function(){t.setState({startPriceTracking:!0}),localStorage.setItem("apiKey",t.state.apiKey),localStorage.setItem("currentStock",t.state.currentStock),t.priceTrackingCycle()},t.stopTracking=function(){t.setState({startPriceTracking:!1})},t.state={apiKey:"",currentStock:"",currentStockPrice:"",startPriceTracking:!1,previousStockPrice:"",notes:[!1,!1,!1,!1,!1,!1,!1,!1],apiCallInterval:5,notePercentRange:100},t}return Object(c.a)(a,[{key:"componentDidMount",value:function(){console.log("mounted"),this.setState({startPriceTracking:!1}),localStorage.getItem("apiKey")&&this.setState({apiKey:localStorage.getItem("apiKey")}),localStorage.getItem("currentStock")&&this.setState({currentStock:localStorage.getItem("currentStock")})}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("h1",null,"Begin by creating an API key here:"," ",i.a.createElement("a",{href:"https://finnhub.io/"},"Finnhub.io")," and entering it within the field below"),i.a.createElement("label",null,"API Key-",i.a.createElement("input",{value:this.state.apiKey,onChange:this.onApiKeyChange,type:"text"})),i.a.createElement("label",null,"Ticker Symbol-",i.a.createElement("input",{value:this.state.currentStock,onChange:this.onCurrentStockChange,type:"text"})),i.a.createElement("label",null,"Refresh Interval(",this.state.apiCallInterval," seconds)-",i.a.createElement("input",{value:this.state.apiCallInterval,onChange:this.onApiIntervalChange,type:"range",min:"5",max:"60",step:"1"})),i.a.createElement("label",null,"Variable Price Sensitivity (",this.state.notePercentRange," percent)-",i.a.createElement("input",{value:this.state.notePercentRange,onChange:this.onNotePercentChange,type:"range",min:"1",max:"200",step:"1"})),i.a.createElement("hr",null),i.a.createElement("br",null),i.a.createElement("button",{disabled:this.state.startPriceTracking,onClick:this.onApiKeyEntered},"Submit Key and Ticker Symbol"),i.a.createElement("button",{disabled:!this.state.startPriceTracking,onClick:this.stopTracking},"Stop"),this.state.currentStockPrice?i.a.createElement("p",null,"Price: $",i.a.createElement("strong",null,this.state.currentStockPrice)):"",this.state.currentStockPrice&&""!==this.state.previousStockPrice?i.a.createElement("p",null,"Change: ",i.a.createElement("strong",null,i.a.createElement("span",{style:{color:this.state.currentStockPrice-this.state.previousStockPrice<0?"red":"green"}},this.state.currentStockPrice-this.state.previousStockPrice<0?"-":"+"," ",Math.abs(this.state.currentStockPrice-this.state.previousStockPrice)))):"",this.state.notes[0]&&this.state.startPriceTracking?i.a.createElement(A.a,{url:d.a,playStatus:A.a.status.PLAYING,playFromPosition:0,onLoading:this.handleSongLoading,onPlaying:this.handleSongPlaying,onFinishedPlaying:this.handleSongFinishedPlaying}):"",this.state.notes[1]&&this.state.startPriceTracking?i.a.createElement(A.a,{url:P.a,playStatus:A.a.status.PLAYING,playFromPosition:0,onLoading:this.handleSongLoading,onPlaying:this.handleSongPlaying,onFinishedPlaying:this.handleSongFinishedPlaying}):"",this.state.notes[2]&&this.state.startPriceTracking?i.a.createElement(A.a,{url:m.a,playStatus:A.a.status.PLAYING,playFromPosition:0,onLoading:this.handleSongLoading,onPlaying:this.handleSongPlaying,onFinishedPlaying:this.handleSongFinishedPlaying}):"",this.state.notes[3]&&this.state.startPriceTracking?i.a.createElement(A.a,{url:k.a,playStatus:A.a.status.PLAYING,playFromPosition:0,onLoading:this.handleSongLoading,onPlaying:this.handleSongPlaying,onFinishedPlaying:this.handleSongFinishedPlaying}):"",this.state.notes[4]&&this.state.startPriceTracking?i.a.createElement(A.a,{url:f.a,playStatus:A.a.status.PLAYING,playFromPosition:0,onLoading:this.handleSongLoading,onPlaying:this.handleSongPlaying,onFinishedPlaying:this.handleSongFinishedPlaying}):"",this.state.notes[5]&&this.state.startPriceTracking?i.a.createElement(A.a,{url:I.a,playStatus:A.a.status.PLAYING,playFromPosition:0,onLoading:this.handleSongLoading,onPlaying:this.handleSongPlaying,onFinishedPlaying:this.handleSongFinishedPlaying}):"",this.state.notes[6]&&this.state.startPriceTracking?i.a.createElement(A.a,{url:C.a,playStatus:A.a.status.PLAYING,playFromPosition:0,onLoading:this.handleSongLoading,onPlaying:this.handleSongPlaying,onFinishedPlaying:this.handleSongFinishedPlaying}):"",this.state.notes[7]&&this.state.startPriceTracking?i.a.createElement(A.a,{url:L.a,playStatus:A.a.status.PLAYING,playFromPosition:0,onLoading:this.handleSongLoading,onPlaying:this.handleSongPlaying,onFinishedPlaying:this.handleSongFinishedPlaying}):"")}}]),a}(i.a.Component);n(117);var w=function(){return i.a.createElement("div",{className:"background"},i.a.createElement("header",null,i.a.createElement(K,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},62:function(t,e,n){t.exports=n.p+"static/media/0.ee2a5c2e.mp3"},63:function(t,e,n){t.exports=n.p+"static/media/1.3dc74288.mp3"},64:function(t,e,n){t.exports=n.p+"static/media/2.31cfb0fd.mp3"},65:function(t,e,n){t.exports=n.p+"static/media/3.05601121.mp3"},66:function(t,e,n){t.exports=n.p+"static/media/4.0ac91fc4.mp3"},67:function(t,e,n){t.exports=n.p+"static/media/5.0fec3643.mp3"},68:function(t,e,n){t.exports=n.p+"static/media/6.ced3eddc.mp3"},69:function(t,e,n){t.exports=n.p+"static/media/7.1d7ee907.mp3"},72:function(t,e,n){t.exports=n(118)},77:function(t,e,n){},98:function(t,e){}},[[72,1,2]]]);
//# sourceMappingURL=main.252cbb03.chunk.js.map