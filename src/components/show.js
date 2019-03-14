import React from "react";

export default class Show extends  React.Component {
    render() {
        return (
            <div className='show-wrapper'>
                <img src={this.props.url} key={this.props.id} alt='tv show poster'
                     onClick={() => {
                         this.props.handleClick(this.props.data);
                     }
                     }/>
                <p className='show-title-catalogue'>{this.props.data.title}</p>
            </div>
        );
    }
}