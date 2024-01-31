import React from "react";
import { connect } from "react-redux";
import { setCurrentTimestep } from "domain/dataset"
import selectorStyle from "./TimestepSelector.module.css"

const TimestepSelector = ( {currentTimestep, setCurrentTimestep }) => {
    const handleChangeTimestep = (newTimestep) => {
        setCurrentTimestep(newTimestep);
        console.log('Hi')
    };

    return(
        <div className={selectorStyle.timestepPanel}>
                <input
                    type="number"
                    className={selectorStyle.inputStyle}
                    placeholder="Enter Timestep"
                    value={currentTimestep}
                    onChange={(e) => handleChangeTimestep(e.target.value)}
                />
            </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state.dataset)
    return {
        currentTimestep: state.controls.currentTimestep,

    };
};

const mapDispatchToProps = {
    setCurrentTimestep,
};



export default connect(mapStateToProps, mapDispatchToProps)(TimestepSelector);
// const defaultState = {
//     globalTimestep: {"currentTimestep": 0},
// };

// class TimestepSelector extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = this.initialState;
//         this.state = {
//             currentTimestep: props.currentTimestep || 0,
            
//         };
//     }

//     handleChangeTimestep = (event) => {
//         this.setState({
//             currentTimestep: event.target.value,
//         });
//         console.log(this.state)
//     };
    
//     applyTimestep = () => {
//         const  currentTimestep  = this.state;
//         if ( currentTimestep ) {
//             this.props.setCurrentTimestep(currentTimestep);
//         }
//         console.log(currentTimestep)
//     };

//     render() {
//         const { currentTimestep } = this.state;
//         return (
//             <>
//             <div className={selectorStyle.timestepPanel}>
//                 <input
//                     type="number"
//                     className={selectorStyle.inputStyle}
//                     placeholder="Enter Timestep"
//                     value={currentTimestep}
//                     onChange={this.handleChangeTimestep}
//                 />
//                 <button
//                 className={`button circular ${selectorStyle.applyButton}`}
//                 onClick={this.applyTimestep}>
//                     Apply
//                 </button>
//             </div>
//             </>
//         )
//     }
// }

