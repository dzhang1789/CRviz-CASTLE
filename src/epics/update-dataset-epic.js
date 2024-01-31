import { createAction } from "redux-actions";
import { ofType } from 'redux-observable';
import { of,from } from "rxjs";
import { concatMap, tap } from 'rxjs/operators';
import { is } from "ramda";
import { resolveRefs } from 'json-refs';

import { buildIndices } from './index-dataset-epic';

import { setError } from "domain/error"
import { setDatasets, setKeyFields, setIgnoredFields, configureDataset, setCurrentTimestep } from "domain/dataset";
import { setControls, showBusy } from "domain/controls";
import { setNotes } from "domain/notes";

const updateDatasetEpic = (action$, store) => {
  return action$.pipe(
    tap(action => console.log(action)),
    ofType(setCurrentTimestep.toString())
    ,concatMap( ({ payload }) => {
      try{
        const formattedPayload =  formatPayload(payload, store);
        return formattedPayload;
      } catch (error) {
        if (is(ValidationError, error)) {
          return of(setError(error));
        } else {
          throw error;
        }
      }
    }),
    concatMap((formattedPayload) => {
      const {
        datasets, 
        keyFields,
        ignoredFields,
        controls,
        notes,
        currentTimestep,
        view
      } = formattedPayload

    
      const actions = [
        setDatasets(formattedPayload)
        ,setKeyFields(keyFields)
        ,setIgnoredFields(ignoredFields)
        ,setControls(controls)
        ,setNotes(notes)
        ,buildIndices(formattedPayload)
        ,setCurrentTimestep(currentTimestep)
        ,showBusy(false)
      ];

      return actions.reduce((acc$, action) => acc$.pipe(concatMap(() => of(action))), of(null));
      })
  );
};

//if we have a naked array or an object not containing a dataset instead of an object containing a dataset
//transfer the array into an object's dataset to maintain a consistent
//schema with what is used elsewhere see https://github.com/IQTLabs/CRviz/issues/33
const formatPayload = async (data, store) => {
  const view = true;
  const currentTimestep = store.value.dataset.currentTimestep.currentTimestep;
  console.log("hi")
  const owner = data.owner;
  const initialName = data.name;
  const initialShortName = data.shortName;
  const source = data.source;
  const result = await resolveRefs(data.content);
  const content = result.resolved;

  const redArray = content[currentTimestep]?.red || [];
  const trueArray = content[currentTimestep]?.true || [];

  const dataset = view ? redArray : trueArray;
  const datasets = data
  const keyFields = content.keyFields || null;
  const ignoredFields = content.ignoredFields || null;
  const controls = content.controls || {};
  const notes = content.notes || {};
  const includeData = ('includeData' in data) ? data.includeData : true;
  const includeControls = ('includeControls' in data) ? data.includeControls : false;
  const includeNotes = ('includeNotes' in data) ? data.includeNotes : false;

  var final = {};

  if(dataset){
    final[owner] =  { 'dataset': dataset };
  } else {
    throw ValidationError('Data in invalid format');
  }
  const keys = Object.keys(final);
  keys.forEach((owner, idx) =>{
    const dataset = final[owner].dataset;
    const name = dataset.name || initialName || "Series " + idx;
    const shortName = dataset.shortName || initialShortName || name.substr(0, 1) + idx;
    const initialConfig = final[owner].configuration;
    final[owner] =  configureDataset(dataset, source, name, shortName, initialConfig, keyFields, ignoredFields);
  })
  console.log(final)

  data = { 
          'data' : datasets,
          'datasets': includeData ? final : {},
          'keyFields': includeData ? keyFields : [],
          'ignoredFields': includeData ? ignoredFields : [],
          'controls': includeControls ? controls : {},
          'notes': includeNotes ? notes : {},
          'currentTimestep' : currentTimestep,
          'view' : view
        };
  console.log(data)
  return data;
};

function ValidationError(message) {
  this.name = 'ValidationError';
  this.message = message;
}

ValidationError.prototype = Object.create(Error.prototype);

export default updateDatasetEpic;
