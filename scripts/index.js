window.onload = function(){
	function game(){
		this.clientw = document.documentElement.clientWidth;
		this.clienth = document.documentElement.clientHeight-130;
		this.letterArr =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]; 
		this.letterLen = 5;
		this.speed =2;
		this.spans =[];
		this.die = 20;
		this.sore = 0;
		this.currSore = 0;
		this.num =10;
		this.currArr =[];
		this.currPosArr=[];
		this.soreEle=document.getElementsByClassName("sore")[0].getElementsByTagName("span")[1];
		this.new_gk=document.getElementsByClassName("new_gk")[0];
 		this.dieEle=document.getElementsByClassName("shengming")[0].getElementsByTagName("span")[1];
		this.width = this.clientw/this.letterLen/2-70;
		this.step=50;
 		this.aa=1;
		this.dieEle.innerHTML=this.die;
	}
	game.prototype={
		play:function(){
			//将字母显示到body里面;
			this.getLetter(this.letterLen);
			this.move();
			this.key();
		},
		key:function(){
			var that = this;
			document.onkeydown = function(e){
				var ev = e||window.event;
				var code = String.fromCharCode(ev.keyCode);
				for(var i=0;i<that.spans.length;i++){
					if(that.spans[i].innerHTML == code){
						document.body.removeChild(that.spans[i]);
						that.spans.splice(i,1);
						that.getLetter(1);
						that.sore++;
						that.soreEle.innerHTML=that.sore;
						if(that.sore%that.step==0){
	                      that.aa++;
	                      that.new_gk.innerHTML =("第"+that.aa+"关");
	                      that.next();
	                  }
					}
				}
			}
		},
		next:function(){
	      clearInterval(this.t);
	      for(var i=0;i<this.spans.length;i++){
	         document.body.removeChild(this.spans[i]);
	      }
	        this.spans=[];
	        this.speed = this.aa+4;
	        this.letterLen = this.aa+4;

	        this.play();


	    },
		move:function(){

			var that = this;
			this.t =setInterval(function(){
				var kuang=document.getElementById("kuang");
				var zai=document.getElementById("zai");
				for(var i=0;i<that.spans.length;i++){
					var top = that.spans[i].offsetTop+that.speed;
					that.spans[i].style.top = top+"px";
					if(top>that.clienth){
						document.body.removeChild(that.spans[i]);
						that.spans.splice(i,1);
						that.getLetter(1);
						that.die--;
						that.dieEle.innerHTML=that.die;
						if(that.die == 0){
							kuang.style.display="block"
							clearInterval(games.t);
							clearInterval(time);
;
							//alert('game over');
							zai.onclick=function(){
								location.reload();
							}

						}
					}

				}
			},60)
		},
		getLetter:function(num){
			var bian=['url(./img/2.png)','url(./img/3.png)','url(./img/4.png)','url(./img/5.png)','url(./img/6.png)','url(./img/7.png)','url(./img/8.png)','url(./img/9.png)','url(./img/10.jpg)','url(./img/11.jpg)','url(./img/12.jpg)','url(./img/13.jpg)','url(./img/14.jpg)','url(./img/15.jpg)','url(./img/16.jpg)','url(./img/17.jpg)','url(./img/18.jpg)','url(./img/19.jpg)','url(./img/20.jpg)','url(./img/21.jpg)','url(./img/22.jpg)','url(./img/23.jpg)','url(./img/24.jpg)','url(./img/25.jpg)','url(./img/26.jpg)','url(./img/27.jpg)'];
			//先获取到指定的字母;
			 var arr=this.getRand(num);

        var posArr=[];
        var eleArr=[];
        for(var i=0;i<arr.length;i++){
            var span=document.createElement("span");
            span.innerHTML=arr[i];
			var se=bian[Math.floor(Math.random()*26)];
            var x=(100+(this.clientw-200)*Math.random());
            var y=(100*Math.random());
            var width=this.width;
            while (this.check1(posArr,x,width)){
                x=(100+(this.clientw-200)*Math.random());
            }
             posArr.push({minx:x,maxx:x+width});
            span.style.cssText="width:"+width+"px;height:80px;position:absolute;left:"+x+"px;top:"+y+"px;color:#000;font-size:30px;background:"+se+";background-size:100% 100%; font-weight: bolder;";
            document.body.appendChild(span);
           // eleArr.push(span);
            this.spans.push(span);
        }
       	// return eleArr;
		},
		getRand:function(num){
			var arr =[];
			for(var i=0;i<num;i++){
				var rand = Math.floor(this.letterArr.length*Math.random());
				while(this.check(arr,this.letterArr[rand])){
					rand = Math.floor(this.letterArr.length*Math.random());
				}
				arr.push(this.letterArr[rand]);
			}
			return arr;
			

		},
		check:function(arr,val){
			for(var i=0;i<arr.length;i++){
				if(arr[i] ==val){
					return true;
				}
			}
			return false;
		},
		check1:function(arr,x,width){
			for(var i=0;i<arr.length;i++){
				if(!(x+width<arr[i].minx||arr[i].maxx<x)){
					return true;
				}
			}
			return false;
		}
	}
	var games = new game();
	//games.play();
 	//var guanqia=document.getElementsByClassName("guanqia")[0];
 	//var guanqia_nandu = document.getElementsByClassName("guanqia_nandu")[0];
 	//var choose = guanqia_nandu.getElementsByTagName('span');
 	//guanqia.onclick = function(){
	 //     clearInterval(games.t);
 	//	  this.style.display ='none';
 	//	  guanqia_nandu.style.display = 'block';
 	//}
 	//for(var i=0;i<choose.length;i++){
 	//	choose[i].onclick = function(){
 	//		guanqia_nandu.style.display ='none';
 	//	  	//guanqia.style.display = 'block';
 	//	  	games.aa = this.innerHTML;
 	//	  	games.new_gk.innerHTML =("第"+games.aa+"关") ;
 	//	  	for(var i=0;i<games.spans.length;i++){
		//         document.body.removeChild(games.spans[i]);
		//      }
     //
 	//	}
 	//}
		var kai=document.getElementById("kai");
	var kaiguan=true;
		kai.onclick=function(){
			//alert(1)
			if(kaiguan){
				games.play();
				setInterval(time,1000);
				kai.innerHTML="进行中";
				kai.style.background="url(./imgs/jie.png)";
				kai.style.backgroundSize="100%";
				kaiguan=false;
			}else{
				kai.innerHTML="继续";
				clearInterval(games.t);
				kai.style.background="url(./imgs/kai.png)";
				kai.style.backgroundSize="100%";
				clearInterval(time);
				kaiguan=true;
			}

		}
	var zouzou=document.getElementById("zouzou");
	var ji=0;
	var time=function(){
		if(kai){
			ji++;
			zouzou.innerHTML=ji;
		}
	}

}