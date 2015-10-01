import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.min.css'

var $ = require("jquery");

class TxtResultList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			action: props.action,
			results: []
		};
	}

	componentDidMount() {
		$.get(this.props.source, function(result) {
			result = JSON.parse(result);
			result = result.rows;
			this.setState({
				action: 'Results loaded.',
				results: result
			});
		}.bind(this));
	}

	render() {
		var columns = [
			{name:"Test Name"},
			{name:"Branch"},
			{name:"ACP Build"},
			{name:"ACP IP"},
			{name:"RmpSpTranscodePack Build"},
			{name:"Test Suit"},
			{name:"Pass Ratio"}
		];
		var result_items = this.state.results.map(
					(result) => {
						var reslink = "http://localhost:5984/_utils/result-viewer.html?" + result.value[0];
						var peflink = "http://localhost:5984/_utils/perfchart.html?" + result.value[0];
						return {
						"Test Name": <div><a target="_blank" href={reslink}>{result.value[0]}</a><br/><a target="_blank" href={peflink}>Performance</a></div>,
						"Branch": result.value[1],
						"ACP Build": result.value[2],
						"ACP IP": result.value[3],
						"RmpSpTranscodePack Build": result.value[4],
						"Test Suit": result.value[5],
						"Pass Ratio": result.value[6]
						}
					}
				)
		function sortBuild(a, b, order){
				var build_a = a["ACP Build"].split(".");
				var build_b = b["ACP Build"].split(".");
				var val_a = "";
				var val_b = "";
				for(var i=0;i<build_a.length;i++){
					var item = build_a[i];
					item = parseInt(item).toString();
					if(item.length == 1) {
	                	val_a += "00" + item;
	            	} else if(item.length == 2) {
	                	val_a += "0" + item;
	            	} else {
	                	val_a += item;
	            	}
				}
				for(var i=0;i<build_b.length;i++){
					var item = build_b[i];
					item = parseInt(item).toString();
					if(item.length == 1) {
	                	val_b += "00" + item;
	            	} else if(item.length == 2) {
	                	val_b += "0" + item;
	            	} else {
	                	val_b += item;
	            	}
				}
				if(order=="asc")
					var res = ((parseInt(val_a) < parseInt(val_b)) ? -1 : ((parseInt(val_a) > parseInt(val_b)) ? 1 : 0));
				else
					var res = ((parseInt(val_a) < parseInt(val_b)) ? 1 : ((parseInt(val_a) > parseInt(val_b)) ? -1 : 0));
				return res
			}
		return (
				<div className='myclass'>
				<div>{this.state.action}</div>
				<BootstrapTable data={result_items} pagination={"20"} columnFilter={true} striped={true} hover={true} condensed={true}>
					<TableHeaderColumn dataField="Test Name" isKey={true} dataSort={true} width="15%">Test Name</TableHeaderColumn>
					<TableHeaderColumn dataField="Branch" width="5%" dataSort={true}>Branch</TableHeaderColumn>
					<TableHeaderColumn dataField="ACP Build" width="10%" dataSort={true} sortFunc={sortBuild}>ACP Build</TableHeaderColumn>
					<TableHeaderColumn dataField="ACP IP" width="10%">ACP IP</TableHeaderColumn>
					<TableHeaderColumn dataField="RmpSpTranscodePack Build" width="15%">RmpSpTranscodePack Build</TableHeaderColumn>
					<TableHeaderColumn dataField="Test Suit" width="25%">Test Suit</TableHeaderColumn>
					<TableHeaderColumn dataField="Pass Ratio" width="10%">Pass Ratio</TableHeaderColumn>
				</BootstrapTable>
				</div>
		       )
	}
}

TxtResultList.defaultProps = {action: 'Loading...', source: 'http://localhost:5984/txt_results/_design/txtbrowser/_view/txtbrowser?reduce=false'};
export default TxtResultList;
