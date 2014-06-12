$(function(){
	var $container = $(".instagram");
	var html = "";

	$.ajax({
		url: "https://api.instagram.com/v1/users/self/media/recent/",
		data: {
			access_token: "31579331.5983650.34968f8f50224a2c83502ab5733d709e"
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