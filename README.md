# CRviz

[![codecov](https://codecov.io/gh/IQTLabs/CRviz/branch/master/graph/badge.svg?token=ORXmFYC3MM)](https://codecov.io/gh/IQTLabs/CRviz)
[![Docker Hub Downloads](https://img.shields.io/docker/pulls/iqtlabs/crviz.svg)](https://hub.docker.com/u/iqtlabs)

CRviz is our first attempt at visualizing networks differently. It's still an early prototype, and it's still under development. That said, we want to share the tool in this formative stage both because we think that our approach has the potential to improve the scalability and legibility of network data, and also because we're actively looking for feedback. So please send us your suggestions and comments!

For more details, please see this [blog post](https://blog.cyberreboot.org/crviz-scalable-design-for-network-visualization-14689133fd91).

For a live demo, please check out https://iqtlabs.github.io/CRviz/

## Build and run

### Installing Node
1. Create a new local env using conda 
2. Install nvm (`https://github.com/nvm-sh/nvm`)
3. Install npm on v16.0.0 (`nvm install v16.0.0`)
4. Clone CRViz repo `git clone https://github.com/IQTLabs/CRviz.git`
5. `cd CRViz`
6. Run `npm install && npm run build`

The static files in the `./build` directory should be ready for deployment.

To serve the application locally, run `npm run start`.
Changes made in your code will be automatically reloaded on http://localhost:5000.

## Data Input

This tool supports loading datasets from URLs or by uploading local files. When loading dataset from a URL, ensure that [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) is enabled at that URL.

In both cases, the tool expects the data to be in the format described below.
For examples, see [`./sample_data`](./sample_data).

### Data format

| Name | Type | Required | Description |
| - | - | - | - |
| configuration | [ConfigurationObject](#configurationobject) | no | configuration for this dataset |
| dataset | array\<object\> | yes | An array of data points. All data points are expected to have the same schema. |

#### ConfigurationObject

| Name | Type | Required | Description |
| - | - | - | - |
| fields | array\<[AttributeObject](#attributeobject)\> | no | an array of attributes in this dataset. |

#### AttributeObject

| Name | Type | Required | Description |
| - | - | - | - |
| path | array\<string\> | yes | an array describing the path to the attribute in each data point. |
| displayName | string | no | the name of the attribute, default to joining the path array with `.` |
| groupable | boolean | no | whether the attribute can be used as a grouping in the hierarchy. Typically, non-categorical item should not be groupable. Default to `true` |

### Preconfigured datasets

Preconfigured datasets (displayed in the dataset dropdown) are defined in [`src/datasets.json`](src/datasets.json).

This file is expected to contain an array of objects containing the following properties:

| Name | Type   | Required | Description                                     |
| ---- | ------ | -------- | ----------------------------------------------- |
| name | string | yes      | The name of dataset (displayed in the dropdown) |
| url  | string | yes      | the URL pointing to the dataset.                |

After modifying, rebuild as described above for the changes to take effect.

## Development

This project is built with [ReactJS](https://reactjs.org) and [Redux](https://redux.js.org/) (and related libraries) as an application framework. The visualization is built using [D3.js](https://d3js.org/).

This project is a bootstrapped using [create-react-app](https://github.com/facebook/create-react-app).

Here are some quick commands to get started:

- `npm install`: Install Node dependencies
- `npm start`: Start the hot reloading development server.
- `npm test`: Run the test suit and watch for changes.
- `npm build`: Build a production optimized bundle of the app.

### Tools
- [React developer tools](https://reactjs.org/blog/2015/09/02/new-react-developer-tools.html#installation)

### Project Structure

- `src/domain` contains Redux reducers, action creators, selectors, and any other domain specific functions.
  [redux-actions](https://github.com/redux-observable/redux-observable) is being used to reduce boilerplate.

- `src/epics` contains [redux-observable](https://github.com/redux-observable/redux-observable)

- `src/features` contains React components organized by features.

### CASTLE

- When using this library, make sure Node is running on vv16.0.0 or earlier
- To make commits to the repo, remove the pre-commit file in git:
  - `cd .git`
  - `cd hooks`
  - `rm pre-commit`

### Using the Visualization

- If performing a standard visualization:
  - Open the data tab on the left hand and upload a dataset. Datasets will need to be created through the use of
  our parser [CRVIZ-parse.py](https://github.com/dzhang1789/CRviz-CASTLE/blob/master/scripts/CRviz-parse.py).

  - Open the grouping tab on the left hand side. Click the the dropdown menu next to **Color By** and click **Access**
  - Drag the slider **Subnet** into the **Group By** drop section.

- If visualizing a heatmap
  - Open the data tab and upload a dataset that is specifically in the format of a heatmap dataset. An example of
  this can be found here [heatmap.json](https://github.com/dzhang1789/CRviz-CASTLE/blob/master/sample_data/heatmap.json)
  - Open the grouping tab and check the button next to **Use Heatmap**
  - Drag the slider **Subnet** into the **Group By** drop section.

- General Usage
  - After data has been loaded into the visual, the timestep of the data can be manipulated using the controls in the
  bottom right. The time can be changed via either the arrows or manual input. To place the changes into effect, hit
  the **GO** button
  - If observing a dataset that contains the red agent along with a holistic view of the network topology, this can be 
  changed using the button that defaults to **Red** at the bottom right of the visual. Open the menu and choose the
  appropriate view.
    - The action displayed will be corresponding to the agent of the current view.
  - After creating groupings through the **Subnet** we can zoom onto specific subnets. To do so, hover over the subnet
  and it should highlight. Click into it and the visual should zoom. To exit this, click on any surrounding gray area

