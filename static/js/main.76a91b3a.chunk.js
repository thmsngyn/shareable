(this.webpackJsonpshareable=this.webpackJsonpshareable||[]).push([[0],{30:function(e,t,r){e.exports=r.p+"static/media/badminton.c7bae4fd.png"},31:function(e,t,r){e.exports=r.p+"static/media/gradient-logo.55240fe4.png"},36:function(e,t,r){e.exports=r(85)},41:function(e,t,r){},43:function(e,t,r){},44:function(e,t,r){},84:function(e,t,r){},85:function(e,t,r){"use strict";r.r(t);var n,a=r(0),i=r.n(a),o=r(27),s=r.n(o),c=(r(41),r(5)),l=r(7),u=r.n(l),m=r(11),h=r(1),f=r(2),d=r(4),p=r(3),g=r(14),v=r(17),y=r(28),k=r.n(y),b=r(34);!function(e){e[e.s0=0]="s0",e[e.s2=2]="s2",e[e.s4=4]="s4",e[e.s8=8]="s8",e[e.s12=12]="s12",e[e.s16=16]="s16",e[e.s24=24]="s24",e[e.s32=32]="s32",e[e.s48=48]="s48",e[e.s64=64]="s64",e[e.s128=128]="s128",e[e.s224=224]="s224"}(n||(n={}));var E,O=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return e?n.s24:n.s224},j=n.s64,T=n.s224,x={ExtraLarge:{fontSize:48,lineHeight:"54px"},Large:{fontSize:36,lineHeight:"54px"},MediumLarge:{fontSize:28,lineHeight:"36px"},Medium:{fontSize:20,lineHeight:"30px"},MediumSmall:{fontSize:14,lineHeight:"20px"},Small:{fontSize:12,lineHeight:"18px"},ExtraSmall:{fontSize:11,lineHeight:"16px"}};!function(e){e.ShareableLavender="#90a7ee",e.c600="#1C2124",e.c500="#66747D",e.c400="#86939C",e.c300="#C7D0D6",e.c200="#E4E9ED",e.c100="#F5F8FA",e.c0="#FFF",e.ScreenBackground="#282c34",e.White="#fff",e.Black="#000",e.Transparent="rgba(52, 52, 52, 0)",e.TransparentDark="rgba(52, 52, 52, 0.9)"}(E||(E={}));r(43),r(44);var S=function(e){Object(d.a)(r,e);var t=Object(p.a)(r);function r(e){return Object(h.a)(this,r),t.call(this,e)}return Object(f.a)(r,[{key:"componentDidMount",value:function(){}},{key:"coverArtStyle",value:function(){var e=this.props.track;return{backgroundImage:"url(".concat(e.album.images[0].url,")")}}},{key:"renderArtists",value:function(){var e=this.props.track;return i.a.createElement("div",{style:w.artistName},e.artists.map((function(e){return e.name})).join(", "))}},{key:"renderTrackTitle",value:function(){var e=this.props.track;return i.a.createElement("div",{style:w.trackTitle},e.name)}},{key:"render",value:function(){var e=this.props.track;return i.a.createElement("div",{className:"track",style:w.track},e?i.a.createElement(a.Fragment,null,i.a.createElement("div",{style:w.coverArt},i.a.createElement("img",{className:"art",src:e.album.images[0].url,onClick:function(){return window.open(e.external_urls.spotify,"_blank")}})),i.a.createElement("div",{className:"track__content"},this.renderArtists(),this.renderTrackTitle())):i.a.createElement("div",{style:x.Medium},"Nothing found"))}}]),r}(i.a.Component),w={progress:{marginTop:n.s16},artistName:Object(c.a)({},x.MediumSmall),track:{marginBottom:n.s24},coverArt:{marginRight:n.s16},trackTitle:Object(c.a)({},x.Large)},C=r(29),L=r.n(C),M=window.location.hash.substring(1).split("&").reduce((function(e,t){if(t){var r=t.split("=");e[r[0]]=decodeURIComponent(r[1])}return e}),{});function I(e){return e.text().then((function(e){return e?JSON.parse(e):{}}))}window.location.hash="";var D,A=function(e){Object(d.a)(r,e);var t=Object(p.a)(r);function r(e){return Object(h.a)(this,r),t.call(this,e)}return Object(f.a)(r,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.props,t=e.children,r=e.hasError,n=e.isLoading;return r?i.a.createElement(fe,{headerText:"Something bad happened...",subText:"Please refresh the page and try again."}):n?i.a.createElement(fe,null,"Loading..."):t}}]),r}(i.a.Component),U=function(e){Object(d.a)(r,e);var t=Object(p.a)(r);function r(e){var n;return Object(h.a)(this,r),(n=t.call(this,e)).state={currentTrack:void 0,is_playing:!0,progress_ms:0,likes:[],hasError:!1},n}return Object(f.a)(r,[{key:"componentDidMount",value:function(){var e=this;this.setCurrentlyPlayingState((function(t){e.setState({hasError:!0})})),this.setLikesState((function(t){e.setState({hasError:!0})}))}},{key:"setCurrentlyPlayingState",value:function(){var e=Object(m.a)(u.a.mark((function e(t){var r,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ae.getCurrentlyPlaying();case 2:if(r=e.sent,!(n=r.error)){e.next=6;break}return e.abrupt("return",t(n));case 6:this.setState({currentTrack:r.item});case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"setLikesState",value:function(){var e=Object(m.a)(u.a.mark((function e(t){var r,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ae.getLikes();case 2:if(r=e.sent,!(n=r.error)){e.next=6;break}return e.abrupt("return",t(n));case 6:this.setState({likes:r.items});case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.hasError,r=e.currentTrack,n=e.likes,o=!r&&!n.length;return i.a.createElement(A,{hasError:t,isLoading:o},i.a.createElement(a.Fragment,null,i.a.createElement(fe,{headerText:"Currently playing"},i.a.createElement(S,{track:r})),i.a.createElement(fe,{headerText:"Likes"},n.map((function(e,t){return i.a.createElement(S,{key:t,track:e.track})})))))}}]),r}(i.a.Component),_=function(e){Object(d.a)(r,e);var t=Object(p.a)(r);function r(e){var n;return Object(h.a)(this,r),(n=t.call(this,e)).state={hasError:!1,loggedIn:!1,isLoading:!0,name:""},n}return Object(f.a)(r,[{key:"componentDidMount",value:function(){var e=this,t=ae.userIsLoggedIn();t&&ae.userProfile().then((function(t){return e.setState({name:t.name.split(" ")[0],isLoading:!1})})),this.setState({loggedIn:t})}},{key:"render",value:function(){var e=this.state,t=e.hasError,r=e.loggedIn,n=e.name,a=e.isLoading;return i.a.createElement(A,{hasError:t,isLoading:a},!r&&i.a.createElement(fe,{headerText:"Welcome!",subText:"Please login with your spotify credentials to continue."},i.a.createElement(N,{text:"Login to Spotify",openLink:ne})),r&&i.a.createElement(fe,{headerText:"Welcome ".concat(n,"!"),subText:"You can now listen to music and view your personalized stream."}))}}]),r}(i.a.Component),R=r(30),H=r.n(R),N=function(e){Object(d.a)(r,e);var t=Object(p.a)(r);function r(e){return Object(h.a)(this,r),t.call(this,e)}return Object(f.a)(r,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.props,t=e.onClick,r=e.openLink,n=e.text,a=e.style,o=void 0===a?{}:a,s=Object(c.a)({},P.buttonContainer,{},o);return i.a.createElement("div",{style:s},i.a.createElement("a",{style:P.button,className:"btn btn--loginApp-link",onClick:function(){return t&&t()},href:r||void 0},n))}}]),r}(i.a.Component),P={buttonContainer:{width:"100%"},button:{display:"inline-block"}},B=r(35);!function(e){e.SpotifyToken="shrbl_spotify_token",e.UserProfile="shrbl_user",e.KeyDecay="shrbl_key_decay"}(D||(D={}));var F,z,K,J=new(function(){function e(){Object(h.a)(this,e),this.storage=localStorage}return Object(f.a)(e,[{key:"get",value:function(e){try{return this.storage.getItem(e)}catch(t){}return null}},{key:"set",value:function(e,t){try{this.storage.setItem(e,t)}catch(r){console.log(r)}}},{key:"setExpiration",value:function(e,t){var r=this.get(D.KeyDecay),n=r&&JSON.parse(r)||{};n[e]=Date.now()+t,this.set(D.KeyDecay,JSON.stringify(n))}},{key:"checkExpiration",value:function(){var e,t=this;if(e=JSON.parse(this.get(D.KeyDecay)||"null")){var r=Date.now();Object.entries(e).forEach((function(n){var a=Object(B.a)(n,2),i=a[0],o=a[1];r<=Number(o)||(t.remove(i),delete e[i])})),this.set(D.KeyDecay,JSON.stringify(e))}}},{key:"remove",value:function(e){try{this.storage.removeItem(e)}catch(t){}}}]),e}()),W=function(e){Object(d.a)(r,e);var t=Object(p.a)(r);function r(e){var n;return Object(h.a)(this,r),(n=t.call(this,e)).state={hasError:!1,userProfile:{}},n}return Object(f.a)(r,[{key:"componentDidMount",value:function(){var e=this;this.setUserProfile((function(){e.setState({hasError:!0})}))}},{key:"setUserProfile",value:function(){var e=Object(m.a)(u.a.mark((function e(t){var r,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ae.userProfile();case 2:if(r=e.sent,!(n=r.error)){e.next=6;break}return e.abrupt("return",t(n));case 6:this.setState({userProfile:r});case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"logout",value:function(){Object.keys(D).forEach((function(e){return J.remove(D[e])})),ae.logout(),this.props.history.push("/"),window.location.reload()}},{key:"render",value:function(){var e=this,t=this.state,r=t.hasError,n=t.userProfile;return i.a.createElement(A,{hasError:r,isLoading:!1},i.a.createElement(fe,{headerText:"Account information"},i.a.createElement(pe,{style:q.profile,imageStyle:q.image,imageUrl:n.imageUrl||H.a,externalUrl:n.externalUrl,info:{name:n.name,email:n.email,country:n.country,followers:n.followers}})),i.a.createElement(fe,null,i.a.createElement(N,{text:"Logout",onClick:function(){e.logout()}})))}}]),r}(i.a.Component),q={profile:{width:500},image:{width:80,height:"auto"}},G=r(12),V=function(e){Object(d.a)(r,e);var t=Object(p.a)(r);function r(e){var n;return Object(h.a)(this,r),(n=t.call(this,e)).state={topArtistsTimeRange:F.ShortTerm,topTracksTimeRange:F.ShortTerm,hasError:!1,isLoading:!0},n}return Object(f.a)(r,[{key:"componentDidMount",value:function(){var e=this;this.setTopsState((function(){return e.setState({hasError:!0})}))}},{key:"setTopsState",value:function(){var e=Object(m.a)(u.a.mark((function e(t){var r,n,a,i,o,s,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=this.state,n=r.topArtistsTimeRange,a=r.topTracksTimeRange,e.next=3,ae.getTop(z.Artists,n);case 3:return i=e.sent,e.next=6,ae.getTop(z.Tracks,a);case 6:if(o=e.sent,s=i.error,c=o.error,!s&&!c){e.next=11;break}return e.abrupt("return",t(s,c));case 11:this.setState({topArtists:i,topTracks:o,isLoading:!1});case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"renderTimeRangeButtons",value:function(e){var t,r=this,n=(t={},Object(G.a)(t,F.ShortTerm,"Last 4 weeks"),Object(G.a)(t,F.MediumTerm,"Last 6 months"),Object(G.a)(t,F.LongTerm,"Last several years"),t),a=[F.ShortTerm,F.MediumTerm,F.LongTerm],o=e===z.Artists?"topArtistsTimeRange":"topTracksTimeRange";return i.a.createElement("div",{style:Y.row},a.map((function(e,t){return i.a.createElement("div",{key:t,style:Y.toggle},i.a.createElement(N,{text:n[e],onClick:function(){r.setState(Object(G.a)({},o,e),(function(){return r.setTopsState((function(){return r.setState({hasError:!0})}))}))}}))})))}},{key:"render",value:function(){var e,t=this.state,r=t.hasError,n=t.topArtists,a=t.topTracks,o=t.isLoading,s=t.topArtistsTimeRange,c=t.topTracksTimeRange,l=(e={},Object(G.a)(e,F.ShortTerm,"Last 4 weeks"),Object(G.a)(e,F.MediumTerm,"Last 6 months"),Object(G.a)(e,F.LongTerm,"Last several years"),e);return i.a.createElement(A,{hasError:r,isLoading:o},i.a.createElement("div",null,i.a.createElement(fe,{headerText:"Top artists (".concat(l[s],")")},this.renderTimeRangeButtons(z.Artists),i.a.createElement("div",{style:Y.row},n&&n.items.map((function(e,t){return i.a.createElement(pe,{key:t,style:Y.profile,imageStyle:Y.image,imageUrl:e.images[0].url,externalUrl:e.external_urls.spotify,displayKeys:!1,info:{rank:"".concat(t+1),name:e.name,genres:e.genres.join(", ")}})}))))),i.a.createElement("div",null,i.a.createElement(fe,{headerText:"Top tracks (".concat(l[c],")")},this.renderTimeRangeButtons(z.Tracks),i.a.createElement("div",{style:Y.row},a&&a.items.map((function(e,t){return i.a.createElement(pe,{key:t,style:Y.profile,imageStyle:Y.image,imageUrl:e.album.images[0].url,externalUrl:e.external_urls.spotify,displayKeys:!1,info:{rank:"".concat(t+1),title:e.name,artist:e.artists[0].name}})}))))))}}]),r}(i.a.Component),Y={row:{display:"flex",flexWrap:"wrap"},profile:{width:500,marginBottom:n.s12,marginRight:n.s48},image:{width:100,height:100},toggle:{marginBottom:n.s16,marginRight:n.s16}},$=[{path:"/",page:_,header:"shareable"},{path:"/stream",page:U,header:"stream"},{path:"/account",page:W,header:"account",rightAlignedHeader:!0},{path:"/stats",page:V,header:"stats"}],Q={redirectUri:"https://thmsngyn.github.io/shareable/"},X=Object(c.a)({clientId:"05b0a9e4fb784b1c866f6235ae139c3a",scopes:["user-top-read","user-read-currently-playing","user-read-playback-state","user-library-read","streaming","user-read-email","user-read-private","user-library-modify"]},Q),Z="".concat("https://api.spotify.com","/v1/me/player"),ee="".concat("https://api.spotify.com","/v1/me/tracks"),te="".concat("https://api.spotify.com","/v1/me"),re="".concat("https://api.spotify.com","/v1/me/top"),ne="".concat("https://accounts.spotify.com/authorize","?client_id=").concat(X.clientId,"&redirect_uri=").concat(X.redirectUri,"&scope=").concat(X.scopes.join("%20"),"&response_type=token&show_dialog=true");!function(e){e.ShortTerm="short_term",e.MediumTerm="medium_term",e.LongTerm="long_term"}(F||(F={})),function(e){e.Artists="artists",e.Tracks="tracks"}(z||(z={})),function(e){e.TokenExpired="The access token expired"}(K||(K={}));var ae=new(function(){function e(){Object(h.a)(this,e),this.token=""}return Object(f.a)(e,[{key:"resolveTokenInStorage",value:function(e,t){e?J.checkExpiration():(J.set(D.SpotifyToken,t),J.setExpiration(D.SpotifyToken,36e6))}},{key:"logout",value:function(){this.token=""}},{key:"userProfile",value:function(){var e=Object(m.a)(u.a.mark((function e(){var t,r,n,a,i,o,s,c,l,m,h,f;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=J.get(D.UserProfile)){e.next=13;break}return e.next=4,this.getUserProfile();case 4:return r=e.sent,n=r.display_name,a=r.external_urls,i=r.images,o=r.email,s=r.country,c=r.followers,l=r.error,m=i&&i.length&&i[0].url,h=a&&a.spotify,f={name:n,externalUrl:h,email:o,country:s,imageUrl:m,followers:c&&c.total,error:l},J.set(D.UserProfile,JSON.stringify(f)),e.abrupt("return",f);case 13:return e.abrupt("return",JSON.parse(t));case 14:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"userIsLoggedIn",value:function(){return!!this.token}},{key:"resolveUserToken",value:function(){this.token=M.access_token;var e=J.get(D.SpotifyToken);return e||this.token?(this.token=e||this.token,this.resolveTokenInStorage(!!e,this.token),this.token):""}},{key:"getUserProfile",value:function(){return this.request(te,"GET")}},{key:"getCurrentlyPlaying",value:function(){return this.request(Z,"GET")}},{key:"getLikes",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return this.request("".concat(ee,"?limit=").concat(e,"&offset=").concat(t),"GET")}},{key:"getTop",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:F.ShortTerm,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return this.request("".concat(re,"/").concat(e,"?limit=").concat(r,"&offset=").concat(n,"&time_range=").concat(t),"GET")}},{key:"request",value:function(e,t){return fetch(e,{method:t,headers:this.headers}).then(I).then(this.errorHandler.bind(this))}},{key:"errorHandler",value:function(e){var t=e.error;if(t)switch(t.message){case K.TokenExpired:J.remove(D.SpotifyToken)}return e}},{key:"headers",get:function(){return new Headers({Authorization:"Bearer "+this.token})}}]),e}()),ie=function(e){Object(d.a)(r,e);var t=Object(p.a)(r);function r(e){var n;return Object(h.a)(this,r),(n=t.call(this,e)).state={token:""},n}return Object(f.a)(r,[{key:"componentDidMount",value:function(){var e=ae.resolveUserToken();e&&this.setState({token:e})}},{key:"render",value:function(){return i.a.createElement(L.a,{styles:oe.custom,token:this.state.token,autoPlay:!0,showSaveIcon:!0})}}]),r}(i.a.Component),oe={custom:{sliderColor:E.ShareableLavender,savedColor:E.ShareableLavender}},se=function(e){Object(d.a)(r,e);var t=Object(p.a)(r);function r(e){return Object(h.a)(this,r),t.call(this,e)}return Object(f.a)(r,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return i.a.createElement("div",{style:ce.footer},i.a.createElement(ie,null))}}]),r}(i.a.Component),ce={footer:{position:"fixed",left:0,bottom:0,width:"100%"}},le=r(31),ue=r.n(le),me=function(e){Object(d.a)(r,e);var t=Object(p.a)(r);function r(e){return Object(h.a)(this,r),t.call(this,e)}return Object(f.a)(r,[{key:"componentDidMount",value:function(){}},{key:"renderHeaderItem",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=function(e){return!e.header||e.header&&!0===e.rightAlignedHeader},r=function(e){return!e.header||e.header&&!e.rightAlignedHeader};return $.filter((function(n){return e?t(n):r(n)})).map((function(e){return i.a.createElement(v.b,{key:e.path,exact:!0,to:e.path,style:he.headerItem,activeStyle:he.headerItemActive},e.header)}))}},{key:"render",value:function(){return i.a.createElement("div",{style:he.header},i.a.createElement("div",{style:this.responsiveHeaderStyle},i.a.createElement("div",{style:this.responsiveLeftHeaderStyle},i.a.createElement(v.b,{exact:!0,to:"/",style:he.headerItem,activeStyle:he.headerItemActive},i.a.createElement("img",{style:he.logo,src:ue.a,alt:"logo"})),this.renderHeaderItem()),i.a.createElement("div",{style:he.headerRight},this.renderHeaderItem(!0))))}},{key:"responsiveHeaderStyle",get:function(){var e=this.props.isMobile,t=Object(c.a)({},he.headerContents,{paddingLeft:O(e),paddingRight:O(e)});return e&&(t=Object(c.a)({},t,{fontSize:t.fontSize-6})),t}},{key:"responsiveLeftHeaderStyle",get:function(){var e=this.props.isMobile;return Object(c.a)({},he.headerLeft,{width:e?250:300})}}]),r}(i.a.Component),he={header:{width:"100%",position:"fixed",left:0,top:0,backgroundColor:E.White,color:E.ScreenBackground,height:j},headerContents:Object(c.a)({display:"flex",alignItems:"center",height:"100%"},x.Medium),logo:{width:35,height:35},headerLeft:{display:"flex",alignItems:"center",justifyContent:"space-between",width:300},headerRight:{display:"flex",marginLeft:"auto"},headerItem:{display:"flex",cursor:"pointer",textDecoration:"none",color:E.ScreenBackground},headerItemActive:{fontFamily:"CentraNo2-Medium"}},fe=function(e){Object(d.a)(r,e);var t=Object(p.a)(r);function r(e){return Object(h.a)(this,r),t.call(this,e)}return Object(f.a)(r,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.props,t=e.headerText,r=e.subText,n=e.children;return i.a.createElement("div",{style:de.streamSection},t&&i.a.createElement("div",{style:de.headerText},t),r&&i.a.createElement("div",{style:de.subText},r),n)}}]),r}(i.a.Component),de={streamSection:{marginTop:n.s32},headerText:Object(c.a)({marginBottom:n.s16,fontFamily:"CentraNo2-Medium"},x.Medium),subText:{marginBottom:n.s16,fontFamily:"CentraNo2-Book"}},pe=function(e){Object(d.a)(r,e);var t=Object(p.a)(r);function r(e){return Object(h.a)(this,r),t.call(this,e)}return Object(f.a)(r,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.props,t=e.imageUrl,r=e.externalUrl,n=e.info,a=e.style,o=e.imageStyle,s=e.displayKeys,l=void 0===s||s,u=Object(c.a)({},ge.profileContainer,{},a),m=Object(c.a)({},ge.image,{},o);return i.a.createElement("div",{style:u},i.a.createElement("div",null,i.a.createElement("img",{className:"art",style:m,src:t,onClick:function(){return window.open(r,"_blank")}})),l&&i.a.createElement("div",{style:ge.infoKeys},Object.keys(n).map((function(e){return i.a.createElement("div",{key:e},e)}))),i.a.createElement("div",{style:ge.infoValues},Object.keys(n).map((function(e){return i.a.createElement("div",{key:e},n[e])}))))}}]),r}(i.a.Component),ge={profileContainer:{display:"flex",justifyContent:"flex-start"},image:{marginRight:n.s16},infoKeys:{textAlign:"right",marginRight:n.s12},infoValues:{fontFamily:"CentraNo2-Medium"}},ve=(r(84),function(e){Object(d.a)(r,e);var t=Object(p.a)(r);function r(e){var n;return Object(h.a)(this,r),(n=t.call(this,e)).state={loggedIn:!1},n}return Object(f.a)(r,[{key:"componentDidMount",value:function(){var e=Object(m.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=ae.resolveUserToken(),this.setState({loggedIn:!!t});case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"renderRoutes",value:function(){var e=this.state.loggedIn,t=this.props.isMobile,r=Object(c.a)({},ke.routeContainer,{marginLeft:O(t),marginRight:O(t)});return i.a.createElement("div",{style:r},!e&&i.a.createElement(_,null),e&&i.a.createElement(g.c,null,$.map((function(e){var t=e.path,r=e.page;return i.a.createElement(g.a,{key:e.path,exact:!0,path:t,component:r})}))))}},{key:"render",value:function(){var e=this.state.loggedIn,t=this.props.isMobile;return i.a.createElement(v.a,{basename:"/shareable/"},i.a.createElement("div",{style:ke.app},i.a.createElement(me,{isMobile:t}),this.renderRoutes(),e&&i.a.createElement(se,null)))}}]),r}(i.a.Component)),ye=Object(b.hot)(k()((function(e){return{isMobile:e.width<500}}))(ve)),ke={app:{backgroundColor:E.ScreenBackground,minHeight:"100vh",display:"flex",flexDirection:"column",color:E.c100,fontFamily:"CentraNo2-Book"},routeContainer:{paddingTop:j,paddingBottom:T,overflow:"scroll"}};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(ye,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[36,1,2]]]);
//# sourceMappingURL=main.76a91b3a.chunk.js.map