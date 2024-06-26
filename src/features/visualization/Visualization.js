import React from "react";
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';

import { select,mouse } from "d3-selection";

import { connect } from "react-redux";

import { selectDatasetIntersection, selectDatasets, selectMergedConfiguration } from "domain/dataset";
import { getQueryString } from "epics/index-dataset-epic";
import { selectControls, getPosition, setPosition, setSelectedDatum} from "domain/controls";
import { getNotesIndexedByHash, getNotesHoverStatus, getNoteHoveredId } from 'domain/notes';

import d3Viz from './d3-viz';
import styles from './Visualization.module.css';

var position = [];

class Visualization extends React.PureComponent {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.viz = d3Viz(el);
    this.updateFromProps();
  }

  onClick = () => {
    const el = ReactDOM.findDOMNode(this);
    select(el).on('click', function mouseMoveHandler() {
      position = mouse(this)
    })
    this.props.setPosition(position);
  }

  getData = (data) => {
    this.props.setSelectedDatum(data);
  }

  updateFromProps() {
    this.viz.update({
      hierarchyConfig: this.props.controls.hierarchyConfig,
      fields: this.props.configuration.fields || [],
      showNodes: this.props.controls.shouldShowNodes,
      coloredField: this.props.controls.colorBy,
      data: this.props.dataset || [],
      queryString: this.props.queryString,
      position: this.props.position,
      sendData: this.getData,
      noteIdHovered:this.props.noteIdHovered,
      notes:this.props.notes,
      hoverStatus: this.props.hoverStatus,
      resetNodeStyles: this.props.resetNodeStyles,
      heatmapMode: this.props.controls.heatmapMode
    });
  }

  componentDidUpdate() {
    this.updateFromProps();
  }

  render() {
    return <div onClick={this.onClick} className={ styles.viz } id={this.props.id}></div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const datasets = selectDatasets(state);
  const uuids = Object.keys(datasets).map(key => ({ 'owner': key, 'name': datasets[key].name, 'shortName': datasets[key].shortName })) 
  || [{ 'owner': uuidv4(), 'name': "Series 0", 'shortName': "s0" }];
  const datasetCount = uuids.length;
  return {
    datasetCount: datasetCount,
    datasets: selectDatasets(state),
    configuration: selectMergedConfiguration(state),
    controls: selectControls(state),
    queryString: getQueryString(state),
    position: getPosition(state),
    noteIdHovered: getNoteHoveredId(state),
    notes: getNotesIndexedByHash(state),
    hoverStatus: getNotesHoverStatus(state)
  };
};
const mapDispatchToProps = (dispatch) => ({
  setPosition: (position) => dispatch(setPosition(position)),
  setSelectedDatum: (data) => dispatch(setSelectedDatum(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(Visualization);
