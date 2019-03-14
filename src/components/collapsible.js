import React from "react";
import "../css/collapsible.css"

export default class Collapsible extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e){
        this.setState({open: !this.state.open})
    }

    componentDidUpdate(){

    }

    render() {
        return (
            <div className='wrapper'>
                <div onClick={(e)=>this.togglePanel(e)} className='header'>
                    {this.props.title}
                </div>
                {this.state.open ? (
                        <div className='content'>
                            {this.props.children}
                        </div>)
                    :
                    null
                }
            </div>);
    }
}