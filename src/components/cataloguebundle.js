import React from "react";
import Show from "./show"
import template from "../images/image_template.jpg";

export default class CatalogueBundle extends React.Component {
    render() {
        return (
            <div>
                <Catalogue showsData={this.props.showsData} handleClick={this.props.modifyIsFocused}/>
                <button className='next-page' onClick={this.props.handleClick}
                >
                    Next Page
                </button>
            </div>

        );
    }
}

class Catalogue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handleClick: null
        }
    }

    render() {
        return (
            <div className='catalogue-wrapper'>
                {this.props.showsData.map((show) => {
                    var urlInput = `https://image.tmdb.org/t/p/w500${show.poster}`;
                    if (show.poster == null) {
                        urlInput = template;
                    }
                    return (
                        <Show key={show.id}  id={show.id} url={urlInput} data={show} handleClick={this.state.handleClick}/>
                    );
                })}
            </div>
        );
    }

    componentDidMount() {
        this.setState({
            handleClick: this.props.handleClick
        });
    }
}