	let lineId=["03","04","02","05","09","08","0A","0B","07"];
	let lines=["銀","丸","日","東","千","有","副","半","南"];
	for (let i = 0 ; i < lineId.length ; i++){
		
	}

	async function fetchTrainData(d){
		let resObjs=new Array(lineId.length).fill(null)

		await Promise.all(lineId.map(async (id,i) => {

		await fetch('https://tmap-sid.tokyometro.jp/i/pos/trainpos/v1.2?line_code='+lineId[i]+'&dia=0', {
		   		method: "GET",
		    	headers:{
		    		Authorization:"Bearer 6C9F5526E3FA82989C47EE25196D5ACC771DF4A4C0D439C4A81DA171294834F9"
		    	}
		  	})
		  	.then(response => {
				
			   	 if (response.ok) {
			   	   return response.json();
			   	 }
		   	 // 404 や 500 ステータスならここに到達する
		    	throw new Error('Network response was not ok.');
		 	 })
		 	 .then(resJson => {
			    resObjs[i]=resJson;
			 })
			 .catch(error => {
			    // ネットワークエラーの場合はここに到達する
			    console.error(error);
			  })
		 }))
		
		return resObjs
	
	}

	const stations=// <-A B->
		{
			"銀座線":[
				"渋谷","表参道","外苑前","青山一丁目","赤坂見附","溜池山王","虎ノ門","新橋","銀座","京橋","日本橋","三越前","神田","末広町","上野広小路","上野","稲荷町","田原町","浅草"
			]
			,"丸ノ内線":[
				"方南町","中野富士見町","中野新橋","中野坂上","荻窪","南阿佐ヶ谷","新高円寺","東高円寺","新中野","中野坂上","西新宿","新宿","新宿三丁目","新宿御苑前","四谷三丁目","四ツ谷","赤坂見附","国会議事堂前","霞ケ関","銀座","東京","大手町","淡路町","御茶ノ水","本郷三丁目","後楽園","茗荷谷","新大塚","池袋"
			]
			,"日比谷線":[
				"祐天寺","中目黒","恵比寿","広尾","六本木","神谷町","虎ノ門ヒルズ","霞ケ関","日比谷","銀座","東銀座","築地","八丁堀","茅場町","人形町","小伝馬町","秋葉原","仲御徒町","上野","入谷","三ノ輪","南千住","北千住","小菅","五反野","梅島"
			]
			,"東西線":[
				"北習志野","飯山満","東海神","西船橋","東船橋","船橋","西船橋","原木中山","妙典","行徳","南行徳","浦安","葛西","西葛西","南砂町","東陽町","木場","門前仲町","茅場町","日本橋","大手町","竹橋","九段下","飯田橋","神楽坂","早稲田","高田馬場","落合","中野","高円寺","阿佐ヶ谷","荻窪"
			]
			,"千代田線":[
				"経堂","豪徳寺","梅ヶ丘","世田谷代田","下北沢","東北沢","代々木上原","代々木公園","明治神宮前〈原宿〉","表参道","乃木坂","赤坂","国会議事堂前","霞ケ関","日比谷","二重橋前","大手町","新御茶ノ水","湯島","根津","千駄木","西日暮里","町屋","北千住","綾瀬","北綾瀬","綾瀬","亀有","金町","松戸"
			]
			,"半蔵門線":[
				"鐘ヶ淵","東向島","曳舟","押上","錦糸町","住吉","清澄白河","水天宮前","三越前","大手町","神保町","九段下","半蔵門","永田町","青山一丁目","表参道","渋谷","池尻大橋","三軒茶屋","駒澤大学"
			]
			,"有楽町線":[
				"新木場","辰巳","豊洲","月島","新富町","銀座一丁目","有楽町","桜田門","永田町","麹町","市ヶ谷","飯田橋","江戸川橋","護国寺","東池袋","池袋","要町","千川","小竹向原","氷川台","平和台","地下鉄赤塚","地下鉄成増","和光市","朝霞","朝霞台","志木","小竹向原","新桜台","練馬"
			]
			,"南北線":[
				"鳩ヶ谷","南鳩ヶ谷","川口元郷","赤羽岩淵","志茂","王子神谷","王子","西ケ原","駒込","本駒込","東大前","後楽園","飯田橋","市ケ谷","四ツ谷","永田町","溜池山王","六本木一丁目","麻布十番","白金高輪","白金台","目黒","不動前","武蔵小山","西小山","洗足","白金高輪","三田"
			]
			,"副都心線":[
				"自由が丘","都立大学","学芸大学","祐天寺","中目黒","代官山","渋谷","明治神宮前〈渋谷〉","北参道","新宿三丁目","東新宿","西早稲田","雑司が谷","池袋","要町","千川","小竹向原","氷川台","平和台","地下鉄赤塚","地下鉄成増","和光市","朝霞","朝霞台","志木","小竹向原","新桜台","練馬"
			]
		}
		
	let table_data={}


	async function makeTable(resObjs)
	{
				let getTrainList=(linename='丸ノ内線')=>Object.values(resObjs)
				.find((e,i)=>e['line_list'][0]['line_code_name']==linename)
				['line_list'].map((e)=>e['train_list'])
		let getTrainAt=(line,ab,prev,next,pog)=>{
			return getTrainList(line)[ab].filter((e)=>(e['train_prev_name']==prev && e['train_next_name']==next))[pog]??""
		}
			
			Object.keys(stations).forEach((e1,i1)=>{//路線別
				console.log(e1)//路線名
				let table_data_part=[]
				stations[e1].forEach((e2,i2)=>{//駅区間別
					
					let e2a=stations[e1][i2+1]??""//次駅
					const train_info_keys=['train_type_name','train_number','end_station_short','delay_time']
						//車両情報キー
						
					let gT=(ab,sec,pog,k)=>{return getTrainAt(e1,ab,e2,sec?e2a:"",pog)[k]}
						//位置→列情エイリアス(AB線L,駅間L,重複L,情報キー)
					
					table_data_part.push( 
						[ train_info_keys.map((e3)=>gT(0,0,0,e3)).concat(e2.slice(0,4)).concat(train_info_keys.map((e3)=>gT(1,0,0,e3)))],
						[ train_info_keys.map((e3)=>gT(0,0,1,e3)).concat(null).concat(train_info_keys.map((e3)=>gT(1,0,1,e3)))],
						[ train_info_keys.map((e3)=>gT(0,1,0,e3)).concat(null).concat(train_info_keys.map((e3)=>gT(1,1,0,e3)))],
						[ train_info_keys.map((e3)=>gT(0,1,1,e3)).concat(null).concat(train_info_keys.map((e3)=>gT(1,1,1,e3)))]
					
					);

				})
				table_data[e1]=table_data_part
			})
			debugger
			return
	}
