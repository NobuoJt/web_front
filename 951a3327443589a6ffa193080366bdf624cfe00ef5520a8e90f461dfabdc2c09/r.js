

		function makeTable(resObjs){
			console.log("vvv")
			//debugger
		    var tableDOM =
				<div>
				{Object.values(resObjs).map((e1,i1)=>(//路線別
					<table>
						<col span="1"/>
							<col span="1"/><col span="1" id="stcol"/><col span="1"/><col span="1"/><col span="1"/>
								<col span="1"/><col span="1"/>
			            <thead>
			                <tr>
			                    <th>{e1['line_list'][0]['line_code_name'].slice(0,2)}</th>
			                    <th>列番</th>
			                    <th id="st">発</th>
			                    <th>前</th>
			                    <th>次</th>
								<th>着</th>
								<th>遅れ</th>
								<th>客着</th>
			                </tr>
			            </thead>
						<tbody>
		            {Object.values(e1['line_list']).map((e2,i2)=>(//AB線別
						Object.values(e2['train_list']).filter(e3 => e3['train_number'].slice(1,5)!="0000").map((e3,i3)=>(//列車別
		                    <tr key={i3}>
						        <td id="ty">{e3['train_type_name']}</td>
								<td>{e3['train_number']}</td>
								<td id="st">{e3['start_station_name'].slice(0,4)}</td>
								<td id="pr">{e3['train_prev_name'].slice(0,4)}</td>
								<td id="ne">{e3['train_next_name'].slice(0,4)}</td>
								<td id="en">{e3['end_station_name'].slice(0,4)}</td>
								<td>{e3['delay_time']}</td>
								<td>{e3['end_station_short_s']}</td>
		                     </tr>
			            ))        
					))}
		               </tbody>
		            </table>
				))}
			</div>
			
			var target = document.getElementById('tablePane');	//ターゲット指定
		    ReactDOM.render(tableDOM, target);					//DOM描画
		}
