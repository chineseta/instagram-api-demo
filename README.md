#Instagram API demo#
Instagram APIを利用したフォトギャラリーのデモ。  
[Instagram API demo](http://marimelody.net/demo/instagram/)


##クライアントIDの取得##
[http://instagram.com/developer/](http://instagram.com/developer/)からアプリケーションの利用登録します。  

* Application Name　アプリ名  
* Description　アプリの説明  
* Website　アプリのサイトURL  
* OAuth redirect_url　認証後のリダイレクトURL  

アプリケーションの登録が完了するとクライアントIDが表示されます。  


##アクセストークンの取得##
下記URLに取得したCLIENT ID、登録したREDIRECT URIを入力してブラウザからアクセスします。
  
```
https://instagram.com/oauth/authorize/?client_id=取得したCLIENT ID&redirect_uri=登録したREDIRECT URI&response_type=token
```

リダイレクトされてアクセストークンを取得できます。

```
http://example.com/#access_token=アクセストークン
```

取得したアクセストークンを下記URLに入力してブラウザからアクセスすると、自分のアカウントのJSONデータが表示されます。

```
https://api.instagram.com/v1/users/self/media/recent?access_token=取得したアクセストークン
```


##jQueryでJSONデータを読み込む##
デモでは自分の写真を最新20件表示しています。

```
$(function(){
	var $container = $(".instagram");
	var html = "";

	$.ajax({
		url: "https://api.instagram.com/v1/users/self/media/recent/",
		data: {
			access_token: "取得したアクセストークン"
		},
		dataType: "jsonp"
	}).done(function(data){
		//通信成功時の処理
		$.each(data.data,function(i,item){
			var imgurl = item.images.low_resolution.url;//低解像度の画像のURLを取得
			var link = item.link;//リンクを取得
			html += "<li><a href='" + link + "' target='_blank'><img src='" + imgurl + "'></li>";
		});
	}).fail(function(){
		//通信失敗時の処理
		html = "<li>画像を取得できません。</li>";
	}).always(function(){
		//通信完了時の処理
		$container.html(html);
	});
});
```

自分の写真以外にも特定のハッシュタグが付いている写真を表示することもできます。  
詳しくは[Instagram API Endpoints](http://instagram.com/developer/endpoints/)に書いてます。
