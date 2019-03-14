import React from "react";
import DetailsBundle from "./detailsbundle"
import CatalogueBundle from "./cataloguebundle";
import logo from "../images/logo.png";

export default class Site extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showsData: [],
            nextPage: 2,
            showFocused: false,
            focusedData: null
        };
    }

    render() {
        return (
            <div className='site-wrapper'>
                <img className='site-header' src={logo} alt='TV Shows' onClick={this.returnToHome}/>
                {this.state.showFocused ?
                    <DetailsBundle
                        focusedData={this.state.focusedData}
                        handleClick={this.onClickToReturn}  />
                    :
                    <CatalogueBundle
                        showsData={this.state.showsData}
                        modifyIsFocused={this.modifyIsFocused}
                        handleClick={this.onClickNextPageButton}/>}
            </div>

        );
    }

    componentDidMount() {
        this.getShowData('https://api.themoviedb.org/3/discover/tv?api_key=1cde70c7c55464eecfb2a321de1392af&sort_by=popularity.desc');
    }

    returnToHome = () => {
        this.getShowData('https://api.themoviedb.org/3/discover/tv?api_key=1cde70c7c55464eecfb2a321de1392af&sort_by=popularity.desc');
        this.setState( {
            showFocused: false,
            nextPage: 2
        });
    }

    modifyIsFocused = (data) => {
        const isCurrentlyFocused = this.state.showFocused;
        window.scroll({top: 0, left: 0, behavior: "auto"});
        this.setState({
            showFocused: !isCurrentlyFocused,
            focusedData: data
        });
    };

    getShowData = (url, page = 1) => {
        const pageString = '&page=';
        console.log('In get show data');
        let tempData = []
        fetch(url + pageString + page).then(res => res.json().then(data => {
            data.results.map(show => {
                tempData.push({
                    id: show.id,
                    title: show.name,
                    poster: show.poster_path,
                    backdrop: show.backdrop_path,
                    synopsis: show.overview
                });
            });
            this.setState({
                showsData: tempData
            });
        })).catch(err => console.log('Error occurred getting movies, with error:' + err));
    }

    onClickNextPageButton = () => {
        const page = this.state.nextPage;
        window.scroll({top: 0, left: 0, behavior: "auto"});
        this.getShowData('https://api.themoviedb.org/3/discover/tv?api_key=1cde70c7c55464eecfb2a321de1392af&sort_by=popularity.desc', page);
        this.setState({
            nextPage: page + 1
        });
    }

    onClickToReturn = () =>  {
        const isFocused = this.state.showFocused;
        this.setState({
            showFocused: !isFocused
        });
    }
}