import React from 'react';
import {connect} from 'react-redux';
import {filterByName, filterByRSTP, filterByTag} from '../actions/txt_results';
import * as bs from 'react-bootstrap';
var $ = require("jquery");

// CSS
import '../../css/txt_results_list.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class TxtRv extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    nameOnClick(event){
        this.props.dispatch(filterByName($(event.target).text()));
    }

    RSTPOnclick(event){
        this.props.dispatch(filterByRSTP($(event.target).text()));
    }

    tagOnClick(event){
        this.props.dispatch(filterByTag($(event.target).text()));
    }


    render() {
        const {dispatch, result, filterByName, filterByRSTP, filterByTag} = this.props;
        if(result == undefined){
            return <div />;
        }
        var TestName = result[1];
        var ACPBuild = result[2];
        var Name = result[3];
        var RSTP = result[4];
        var tags = result[5];
        var PassRatio = result[6];
        var Date = result[7];

        if(filterByName != ''){
			var nameClass = "nameSelected";
		}
		else{
			var nameClass = "nameUnselected";
		}
		if(filterByRSTP != ''){
			var RSTPClass = "RSTPSelected";
		}
		else{
			var RSTPClass = "RSTPUnselected";
		}

        var tileStatus = 'tile-status';
        var iconStatus = 'icon-status';

        if (result[0] <= 0.5) {
            tileStatus += ' errored';
            iconStatus += ' errored';
        }
        else if(result[0] <= 0.8 && result[0] > 0.5){
            tileStatus += ' prepare';
            iconStatus += ' prepare';
        }
        else {
            tileStatus += ' passed';
            iconStatus += ' passed';
        }

        const ratioBar = (
            <bs.ProgressBar>
                <bs.ProgressBar className="progress-bar progress-bar-success" now={Math.round(result[0]*100)} label="%(percent)s%" ></bs.ProgressBar>
                <bs.ProgressBar className="progress-bar progress-bar-danger" now={100 - Math.round(result[0]*100)} label="%(percent)s%"></bs.ProgressBar>
            </bs.ProgressBar>
        );

        var labels = [];
        /*
        if(tags.indexOf('TS') != -1){
            labels.push('TS');
        }
        else if(tags.indexOf('SDI') != -1){
            labels.push('SDI');
        }
        else{
            labels.push(tags);
        }*/
        if(tags.indexOf('[') != -1 && tags.indexOf(']') != -1){
            labels.push(tags.substring(0, tags.indexOf('[')));
            var tags_string = tags.substring(tags.indexOf('[')+1, tags.indexOf(']'));
            tags_string = tags_string.replace('/\s/g', '');
            var tags_array = tags_string.split(',');
            labels = labels.concat(tags_array);
        } else {
            labels.push(tags);
        }
        var label_selected = {};
        for(var label of labels){
            if(filterByTag.indexOf(label) != -1){
                label_selected[label] = 'tagSelected';
            }
            else{
                label_selected[label] = 'tagUnselected';
            }
        }

        return (
           <div className="txt-result-item">
                <div className={tileStatus}>
                    <span className={iconStatus} title="passed"/>
                </div>
                <div className="tile-main">
                    <h2>
                        <span className="ACPBuild">ACP-{ACPBuild}</span> 
                        <span>{labels.map(label => 
                                {
                                    var type='LABEL';
                                    return (
                                        <span onClick={this.tagOnClick.bind(this)} className={"labels label label-primary "+type+" "+label_selected[label]}>
                                            {label}
                                        </span>
                                    )
                                })}
                        </span>
                    </h2>
                    <div className="tile-info">
                        <span className="Date">{Date}</span>
                        <span className={"Name "+nameClass} onClick={this.nameOnClick.bind(this)}>{Name}</span>  
                        <span className={"RSTP "+RSTPClass} onClick={this.RSTPOnclick.bind(this)}>TXP-{RSTP}</span>
                    </div>
                </div>
                <div className="tile-additional">
                    <div>
                        <a target="_blank" href={"http://10.50.100.213:5984/_utils/result-viewer.html?" + TestName}><p>{PassRatio}</p>{ratioBar}</a>
                    </div>
                </div>
        </div>

        );
    }
}

function select(state){
    var filterByName = state.loadTxtRv.filterByName;
    var filterByRSTP = state.loadTxtRv.filterByRSTP;
    var filterByTag = state.loadTxtRv.filterByTag;
    return{
        filterByName: filterByName,
    	filterByRSTP: filterByRSTP,
    	filterByTag: filterByTag
    }
}

export default connect(select)(TxtRv);
