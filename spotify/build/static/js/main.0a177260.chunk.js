(this.webpackJsonpspotify=this.webpackJsonpspotify||[]).push([[0],{34:function(e,t,a){},36:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/green-left-icon-arrow-left.215e6636.png"},57:function(e,t,a){},58:function(e,t,a){},59:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/spotify-youtube.df90fc06.jpg"},65:function(e,t,a){},86:function(e,t,a){},87:function(e,t,a){},88:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/dynamic.a1ef975b.jpg"},89:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/monkey-with-headphones.a9df10d7.jpg"},90:function(e,t,a){},91:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a(0),i=a.n(s),r=a(24),c=a.n(r),o=(a(57),a(9)),l=a(10),u=a(12),d=a(11),h=a(19),y=a(5),p=(a(26),a(95)),f=a(96),m=(a(58),function(e){Object(u.a)(s,e);var t=Object(d.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(l.a)(s,[{key:"render",value:function(){var e=this;return Object(n.jsx)("div",{className:"home-page",children:Object(n.jsxs)(p.a,{className:"spotify-youtube-card",children:[Object(n.jsx)(p.a.Img,{className:"spotify-youtube-card-img",src:a(59),alt:"Spotify-Youtube"}),Object(n.jsx)("a",{href:"http://localhost:8888/login",children:Object(n.jsx)(f.a,{className:"spotify-youtube-card-button",onClick:function(){e.handleClick()},children:" Login With Spotify "})})]})})}}]),s}(s.Component)),b=a(7),j=a(17),g=a.n(j),v=a(4),k=a.n(v),O=a(15),_=(a(34),new g.a),x=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).playlistID=n.props.id,n.playlistName=n.props.name,n.numOfTracks=0,n.state={tracks:[]},n._isMounted=!1,n.loop.bind(Object(b.a)(n)),n}return Object(l.a)(a,[{key:"componentWillMount",value:function(){var e=Object(O.a)(k.a.mark((function e(){var t=this;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.tracks=[],e.next=3,_.getPlaylistTracks(this.playlistID).then((function(e){t.numOfTracks=e.total}));case 3:this.loop(this.numOfTracks,this.playlistID);case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"loop",value:function(){var e=Object(O.a)(k.a.mark((function e(t,a){var n,s;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this._isMounted=!0,n=0;case 2:if(!(n<Math.ceil(t/100))){e.next=10;break}return e.next=5,_.getPlaylistTracks(a,{offset:100*n}).then((function(e){return e}));case 5:s=e.sent,this.tracks.push(s);case 7:n++,e.next=2;break;case 10:this.tracks=this.tracks.map((function(e){return e.items})),this.tracks=[].concat.apply([],this.tracks),this._isMounted&&(this.setState({tracks:this.tracks.map((function(e){return{album_name:e.track.album.name,album_images:e.track.album.images,artists:e.track.artists.map((function(e){return e.name})),duration:e.track.duration_ms,track_name:e.track.name,date:e.added_at,id:e.track.id}}))}),this._isMounted=!1);case 13:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"render",value:function(){return this.state.tracks===[]?null:Object(n.jsx)("div",{className:"playlist-button-and-image-container",children:Object(n.jsxs)(h.b,{to:{pathname:"/youtube",playlistID:this.playlistID,playlistName:this.playlistName,tracks:this.state.tracks},children:[Object(n.jsx)(f.a,{className:"playlist-button",children:this.playlistName}),Object(n.jsx)("img",{className:"playlist-image",src:this.props.image,alt:this.playlistName})]})})}}]),a}(s.Component),w=a(94),I=(a(65),function(e){Object(u.a)(s,e);var t=Object(d.a)(s);function s(e){var a;return Object(o.a)(this,s),(a=t.call(this,e)).state={scrollPos:window.pageYOffset,show:!0},a}return Object(l.a)(s,[{key:"render",value:function(){return Object(n.jsxs)(w.a,{className:"navigation",children:[Object(n.jsx)(h.b,{to:"/"+this.props.back,children:Object(n.jsx)("img",{className:"navigation-back-button",src:a(36),alt:"Green Left Arrow",height:"30"})}),Object(n.jsx)("div",{children:this.props.children})]})}}]),s}(s.Component)),N=a(22),S=a.n(N),D=new g.a,P=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={playlists:[]},n.getPlaylists=n.getPlaylists.bind(Object(b.a)(n)),console.log(S.a.get("access_token")),D.setAccessToken(S.a.get("access_token")),n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this.getPlaylists()}},{key:"getPlaylists",value:function(){var e=this;D.getUserPlaylists().then((function(t){e.setState({playlists:t.items})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return Object(n.jsxs)("div",{children:[Object(n.jsx)(I,{back:"modes",children:" "}),Object(n.jsx)("div",{className:"playlist-page",children:Object(n.jsx)("div",{className:"playlists-container",children:this.state.playlists.map((function(e,t){return Object(n.jsx)(x,{id:e.id,index:t,name:e.name,image:e.images[0].url},e.name)}))})})]})}}]),a}(s.Component),C=a(49),T=a.n(C),V=a(93),q=(a(86),a(50)),E=a.n(q),B=new g.a,M=function(e){Object(u.a)(s,e);var t=Object(d.a)(s);function s(e){var a;return Object(o.a)(this,s),(a=t.call(this,e)).loadVideo=function(e){a.player=new window.YT.Player("player",{height:"720",width:"1280",videoId:e,playerVars:{controls:1,autoplay:0,disablekb:1,enablejsapi:1},events:{onReady:a.onPlayerReady,onStateChange:a.onPlayerStateChange,onError:a.onError}})},B.setAccessToken(localStorage.getItem("access_token")),a.props.location.tracks&&(localStorage.setItem("tracks",JSON.stringify(a.shuffleArray(a.props.location.tracks))),localStorage.setItem("playlist",JSON.stringify(a.props.location.playlistName)),localStorage.setItem("length",JSON.stringify(a.props.location.tracks.length))),console.log(a.props.location.tracks),a.state={apiKey:"AIzaSyAUlBPBvCwXcYNNahVcmWPKphhIs4YjaWQ",search_terms:localStorage.getItem("tracks")?JSON.parse(localStorage.getItem("tracks")).map((function(e,t){return[e.artists[0]+" - "+e.track_name,e.id,t]})):"",current_index:0,length:JSON.parse(localStorage.getItem("length")),query_IDs:Array(JSON.parse(localStorage.getItem("length"))).fill(0),lyric_IDs:Array(JSON.parse(localStorage.getItem("length"))).fill(0),lyric:!1,last_updated:0,fetching:!1},console.log(a.state.search_terms),a._isMounted=!1,a.search2=a.search2.bind(Object(b.a)(a)),a.loadVideo=a.loadVideo.bind(Object(b.a)(a)),a.handleQueueClick=a.handleQueueClick.bind(Object(b.a)(a)),a.onPlayerStateChange=a.onPlayerStateChange.bind(Object(b.a)(a)),a}return Object(l.a)(s,[{key:"componentDidMount",value:function(){var e=Object(O.a)(k.a.mark((function e(){var t,a,n=this;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.search2(0,Math.min(5,this.state.length));case 2:window.YT?this.loadVideo(this.state.query_IDs[0]):((t=document.createElement("script")).src="https://www.youtube.com/iframe_api",window.onYouTubeIframeAPIReady=function(){n.loadVideo(n.state.query_IDs[0])},(a=document.getElementsByTagName("script")[0]).parentNode.insertBefore(t,a));case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"shuffleArray",value:function(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),n=[e[a],e[t]];e[t]=n[0],e[a]=n[1]}return e}},{key:"onPlayerReady",value:function(e){e.target.playVideo()}},{key:"onPlayerStateChange",value:function(e){e.data===window.YT.PlayerState.ENDED&&(console.log("YouTube Video is ENDING!!"),this.handleQueueClick(this.state.current_index+1))}},{key:"onError",value:function(e){101!==e.data&&150!==e.data||this.handleQueueClick(this.state.current_index+1)}},{key:"search2",value:function(){var e=Object(O.a)(k.a.mark((function e(t,a){var n,s,i,r;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.controller=new AbortController,n=this.controller.signal,s={search_terms:this.state.search_terms.slice(t,a),query_IDs:this.state.query_IDs,lyric_IDs:this.state.lyric_IDs},console.log(s),this.setState({fetching:!0}),this._isMounted=!0,e.next=8,fetch("/youtube_search",{method:"POST",signal:n,headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(s)});case 8:if(i=e.sent,!this._isMounted){e.next=16;break}return e.next=12,i.json();case 12:r=e.sent,console.log(r),this.setState({query_IDs:r.query_IDs,lyric_IDs:r.lyric_IDs,last_updated:a,fetching:!1}),this._isMounted=!1;case 16:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"search",value:function(){var e=Object(O.a)(k.a.mark((function e(t){var a,n=this;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=t[0],T.a.get("https://www.googleapis.com/youtube/v3/search?key="+this.state.apiKey+"&q="+a+"&part=snippet&maxResults=1&type=video").then((function(e){var a=n.state.query_IDs;a[t[2]]=e.data.items[0].id.videoId,n.setState({query_IDs:a},(function(){}))})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"createButtons",value:function(){for(var e=this,t=[],a=this.state.current_index,s=this.state.length,i=this.state.search_terms,r=this.state.query_IDs,c=function(s){a>=s&&t.push(Object(n.jsxs)(f.a,{onClick:function(){e.handleQueueClick(a-s)},className:"spotify-youtube-previous-button",disabled:0===r[a-s],children:["  ",i[a-s][0]," "]},a-s))},o=4;o>0;o--)c(o);t.push(Object(n.jsxs)(f.a,{className:"spotify-youtube-current-button",disabled:0===r[a],children:["  ",i[a][0],"  "]},a));for(var l=function(a){a<s-1&&t.push(Object(n.jsxs)(f.a,{onClick:function(){e.handleQueueClick(a)},className:"spotify-youtube-next-buttons",disabled:0===r[a],children:["  ",i[a][0]," "]},a))},u=a+1;u<a+6;u++)l(u);return t}},{key:"handleQueueClick",value:function(e){var t=this;this.setState({current_index:e,lyric:!1},(function(){console.log(t.state.current_index),t.player.loadVideoById(t.state.query_IDs[t.state.current_index])}))}},{key:"handleLyricToggleClick",value:function(){var e=this;this.setState({lyric:!this.state.lyric},(function(){e.state.lyric?e.player.loadVideoById(e.state.lyric_IDs[e.state.current_index]):e.player.loadVideoById(e.state.query_IDs[e.state.current_index])}))}},{key:"componentWillUnmount",value:function(){this.controller.abort(),this._isMounted=!1}},{key:"render",value:function(){var e=this,t=this.state.last_updated;return Object(n.jsxs)("div",{children:[Object(n.jsxs)("div",{className:"button-container",children:[Object(n.jsx)(h.b,{to:"/pickPlaylist",children:Object(n.jsx)("img",{className:"youtube-back-button",src:a(36),alt:"Green Left Arrow",height:"30"})}),Object(n.jsx)(f.a,{className:"youtube-lyric-button",onClick:function(){return e.handleLyricToggleClick()},disabled:0===this.state.query_IDs[this.state.current_index],children:!0===this.state.lyric?"Music Video":"Lyric Video"}),this.createButtons()]}),Object(n.jsxs)("div",{className:"player-and-sidebar",children:[Object(n.jsx)("div",{id:"player"}),Object(n.jsx)("div",{className:"sidebar"}),this.state.fetching?Object(n.jsxs)("div",{className:"typed-and-spinner",children:[Object(n.jsx)("div",{children:Object(n.jsx)(E.a,{typedRef:function(t){e.typed=t},strings:["Loading...","Retrieving links from Youtube...","Getting HD quality links...","Getting lyric videos...","Load"],typeSpeed:30,className:"loading-typed",loop:!0})}),Object(n.jsx)("div",{children:Object(n.jsx)(V.a,{animation:"border",className:"loading-spinner"})})]}):Object(n.jsxs)("div",{children:[Object(n.jsx)(f.a,{className:"youtube-load-more-button",onClick:function(){e.search2(t,t+20)},disabled:0===this.state.query_IDs[this.state.current_index]||this.state.fetching,children:" Load Next 20 "},"Load20"),Object(n.jsx)(f.a,{className:"youtube-load-more-button",onClick:function(){e.search2(t,t+50)},disabled:0===this.state.query_IDs[this.state.current_index]||this.state.fetching,children:"  Load Next 50 "},"Load50"),Object(n.jsx)(f.a,{className:"youtube-load-more-button",onClick:function(){e.search2(t,e.state.length-1)},disabled:0===this.state.query_IDs[this.state.current_index]||this.state.fetching,children:" Load All Songs "},"LoadAll")]})]})]})}}]),s}(s.Component),A=Object(y.f)(M),L=(a(87),new g.a),Y=function(e){Object(u.a)(s,e);var t=Object(d.a)(s);function s(){var e;return Object(o.a)(this,s),(e=t.call(this)).getHashParams=e.getHashParams.bind(Object(b.a)(e)),e.getHashParams2=e.getHashParams2.bind(Object(b.a)(e)),e.params=e.getHashParams(),console.log(e.params),e}return Object(l.a)(s,[{key:"getHashParams",value:function(){if(window.location.href.split("/")[4]){console.log(window.location.href);var e=window.location.href.split("/")[4];return console.log(e),e=[e.split("&")[0],e.split("&")[1]],console.log(e),e=e.map((function(e){return e.split("=")[1]})),console.log(e),L.setAccessToken(e[0]),localStorage.setItem("access_token",e[0]),localStorage.setItem("refresh_token",e[1]),console.log(localStorage.getItem("access_token")),console.log(localStorage.getItem("refresh_token")),e[0]}}},{key:"getHashParams2",value:function(){for(var e,t={},a=/([^&;=]+)=?([^&;]*)/g,n=window.location.hash.substring(1);e=a.exec(n);)t[e[1]]=decodeURIComponent(e[2]);return t}},{key:"render",value:function(){return Object(n.jsxs)("div",{children:[Object(n.jsx)(I,{back:""}),Object(n.jsx)("div",{className:"modes-page",children:Object(n.jsxs)("div",{className:"modes-container",children:[Object(n.jsx)("div",{className:"dynamic-button-and-image-container",children:Object(n.jsxs)(h.b,{to:"/dynamic",children:[Object(n.jsx)(f.a,{className:"dynamic-button",children:" Dynamic "}),Object(n.jsx)("img",{className:"dynamic-image",src:a(88),alt:""})]})}),Object(n.jsx)("div",{className:"playlist-button-and-image-container",children:Object(n.jsxs)(h.b,{to:"/pickPlaylist",children:[Object(n.jsx)(f.a,{className:"playlist-button",children:" Playlist "}),Object(n.jsx)("img",{className:"playlist-image",src:a(89),alt:""})]})})]})})]})}}]),s}(s.Component),R=(a(90),new g.a),J=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).loadVideo=function(e){n.player=new window.YT.Player("player",{height:"720",width:"1280",videoId:e,playerVars:{controls:1,autoplay:0,disablekb:1,enablejsapi:1},events:{onReady:n.onPlayerReady,onStateChange:n.onPlayerStateChange,onError:n.onError}})},n.state={lyric:!1},n.spotify_id="",n.query_IDs=[0],n.lyric_IDs=[0],n.first_video=!0,n.current_state="stopped",console.log(n.props),console.log(S.a.get("access_token")),R.setAccessToken(S.a.get("access_token")),n.is_interval=!0,n.search=n.search.bind(Object(b.a)(n)),n.loadVideo=n.loadVideo.bind(Object(b.a)(n)),n.onPlayerStateChange=n.onPlayerStateChange.bind(Object(b.a)(n)),n.handleLyricToggleClick=n.handleLyricToggleClick.bind(Object(b.a)(n)),n.checkStatus=n.checkStatus.bind(Object(b.a)(n)),n.onPlayerReady=n.onPlayerReady.bind(Object(b.a)(n)),n}return Object(l.a)(a,[{key:"componentWillUnmount",value:function(){this.fetching&&this.controller.abort(),clearInterval(window.refreshIntervalId),console.log("cleared")}},{key:"componentDidMount",value:function(){var e=Object(O.a)(k.a.mark((function e(){var t=this;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.first_video&&R.getMyCurrentPlaybackState().then(function(){var e=Object(O.a)(k.a.mark((function e(a){var n,s;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a.item){e.next=8;break}return t.spotify_id=a.item.id,e.next=4,t.search([a.item.name+" - "+a.item.artists[0].name,a.item.id,0]);case 4:window.YT?t.loadVideo(t.query_IDs[0]):((n=document.createElement("script")).src="https://www.youtube.com/iframe_api",window.onYouTubeIframeAPIReady=function(){t.loadVideo(t.query_IDs[0])},(s=document.getElementsByTagName("script")[0]).parentNode.insertBefore(n,s)),t.first_video=!1,e.next=9;break;case 8:R.getMyRecentlyPlayedTracks().then(function(){var e=Object(O.a)(k.a.mark((function e(a){var n,s;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.spotify_id=a.items[0].track.id,e.next=3,t.search([a.items[0].track.name+" - "+a.items[0].track.artists[0].name,a.items[0].track.id,0]);case 3:window.YT?t.loadVideo(t.query_IDs[0]):((n=document.createElement("script")).src="https://www.youtube.com/iframe_api",window.onYouTubeIframeAPIReady=function(){t.loadVideo(t.query_IDs[0])},(s=document.getElementsByTagName("script")[0]).parentNode.insertBefore(n,s)),t.first_video=!1;case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),window.refreshIntervalId=setInterval((function(){t.checkStatus()}),2500);case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"checkStatus",value:function(){var e=this;R.getMyCurrentPlaybackState().then(function(){var t=Object(O.a)(k.a.mark((function t(a){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log(a,"response"),console.log(e.spotify_id,"curr spotify_id"),!0===a.shuffle_state&&(e.current_state="playing")?(document.getElementById("pause").click(),e.current_state="paused"):!1===a.shuffle_state&&(e.current_state="paused")&&(document.getElementById("play").click(),e.current_state="playing"),"context"===a.repeat_state&&(e.first_video||(e.handleLyricToggleClick(),R.setRepeat("off"))),!a.item||a.item.id===e.spotify_id){t.next=11;break}return clearInterval(window.refreshIntervalId),e.spotify_id=a.item.id,t.next=9,e.search([a.item.name+" - "+a.item.artists[0].name,a.item.id,0]).then((function(t){console.log(e.query_IDs),e.current_state="playing",e.is_interval=!0}));case 9:a.is_playing&&R.pause(),window.refreshIntervalId=setInterval((function(){e.checkStatus()}),2500);case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}},{key:"search",value:function(){var e=Object(O.a)(k.a.mark((function e(t){var a,n,s,i;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("started searching"),this.controller=new AbortController,a=this.controller.signal,n={search_terms:[t],query_IDs:[0],lyric_IDs:[0]},console.log(n),this.fetching=!0,e.next=8,fetch("/youtube_search",{method:"POST",signal:a,headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(n)});case 8:return s=e.sent,e.next=11,s.json();case 11:i=e.sent,console.log(i),this.query_IDs=i.query_IDs,this.lyric_IDs=i.lyric_IDs,this.fetching=!1,this.setState({lyric:!1}),this.first_video||(this.player.loadVideoById(i.query_IDs[0]),this.current_state="playing");case 18:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"onPlayerReady",value:function(e){document.getElementById("pause").addEventListener("click",(function(){e.target.pauseVideo()})),document.getElementById("play").addEventListener("click",(function(){e.target.playVideo()})),e.target.playVideo()}},{key:"onPlayerStateChange",value:function(e){e.data===window.YT.PlayerState.PLAYING&&(this.current_state="playing"),e.data===window.YT.PlayerState.PAUSED&&(this.current_state="paused"),e.data===window.YT.PlayerState.ENDED&&this.player.loadVideoById(this.query_IDs[0])}},{key:"onError",value:function(e){101!==e.data&&150!==e.data||this.player.loadVideoById(this.lyric_IDs[0])}},{key:"handleLyricToggleClick",value:function(){var e=this;this.setState({lyric:!this.state.lyric},(function(){e.state.lyric?e.player.loadVideoById(e.lyric_IDs[0]):e.player.loadVideoById(e.query_IDs[0])}))}},{key:"render",value:function(){var e=this;return Object(n.jsxs)("div",{children:[Object(n.jsx)(I,{back:"modes",children:Object(n.jsx)(f.a,{className:"dynamic-lyric-button",onClick:function(){return e.handleLyricToggleClick()},children:this.state.lyric?"Music Video":"Lyric Video"})}),Object(n.jsxs)("div",{className:"player-container",children:[Object(n.jsx)("div",{id:"player",children:" "}),Object(n.jsx)(f.a,{id:"pause",className:"invisible",children:"Pause"}),Object(n.jsx)(f.a,{id:"play",className:"invisible",children:"Play"})]})]})}}]),a}(s.Component),W=(new g.a,function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(o.a)(this,a),n=t.call(this,e),console.log(localStorage),n}return Object(l.a)(a,[{key:"render",value:function(){return Object(n.jsx)("div",{children:Object(n.jsx)(h.a,{children:Object(n.jsxs)(y.c,{children:[Object(n.jsx)(y.a,{path:"/modes",component:Y}),Object(n.jsx)(y.a,{path:"/youtube",component:A}),Object(n.jsx)(y.a,{path:"/dynamic",component:J}),Object(n.jsx)(y.a,{path:"/pickPlaylist",component:P}),Object(n.jsx)(y.a,{path:"/",component:m})]})})})}}]),a}(s.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(Object(n.jsx)(i.a.StrictMode,{children:Object(n.jsx)(W,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[91,1,2]]]);
//# sourceMappingURL=main.0a177260.chunk.js.map