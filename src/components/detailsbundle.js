import React from "react";
import template from "../images/image_template.jpg";
import EpisodeDetails from "./episodedetails"

export default class DetailsBundle extends React.Component {
    render() {
        return (
            <div>
                <Details data={this.props.focusedData}/>
                <button onClick={this.props.handleClick}
                >
                    Go back to List
                </button>
            </div>
        );
    }
}

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfSeasons: null,
            numberOfEpisodes: null,
            numberOfSeasonsArray: [],
            genres: [],
            cast: [],
            episodes: [],
            currentSeason: 1
        }
    }

    render() {
        let urlPoster = `https://image.tmdb.org/t/p/w500${this.props.data.poster}`;
        if (this.props.data.poster == null) {
            urlPoster = template;
        }
        return (
            <div className='details-wrapper'>
                <div className='details-row-wrapper'>
                    <div className='poster-wrapper'>
                        <img src={urlPoster} alt='tv show poster 2' />
                    </div>
                    <div className='details-headers'>
                        <p className='show-title'>{this.props.data.title}</p>
                        <p className='show-episodes-info'>{`${this.state.numberOfSeasons} Seasons, ${this.state.numberOfEpisodes} Episodes`}</p>
                        <p className='show-genre'>{this.state.genres}</p>
                    </div>
                </div>
                <p className='show-cast'>
                    {`Cast: ${this.state.cast}`}
                </p>
                <p className='show-desc'>
                    {this.props.data.synopsis}
                </p>

                <div className="episodes-wrapper">
                    <div className='seasons-wrapper'>
                        <p>Seasons:
                            {this.state.numberOfSeasonsArray.map((seasonNum) => {
                                if (this.state.currentSeason === seasonNum) {
                                    return (
                                        <span className='season-wrapper-focused' key={seasonNum}
                                              onClick={() => this.changeSeason(seasonNum)}> {seasonNum} </span>
                                    );
                                } else {
                                    return (
                                        <span className='season-wrapper' key={seasonNum}
                                              onClick={() => this.changeSeason(seasonNum)}> {seasonNum} </span>
                                    );
                                }
                            })}
                        </p>
                    </div>

                    {this.state.episodes.map((show) => {
                        return <EpisodeDetails key={show.episodeNumber} episodeNumber={show.episodeNumber} episodeTitle={show.episodeTitle} episodeSynopsis={show.episodeSynopsis}/>
                    })}
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getBasicShowDetails(`https://api.themoviedb.org/3/tv/${this.props.data.id}?api_key=1cde70c7c55464eecfb2a321de1392af&append_to_response=credits`);
        this.getEpisodesDetails(`https://api.themoviedb.org/3/tv/${this.props.data.id}/season/${this.state.currentSeason}?api_key=1cde70c7c55464eecfb2a321de1392af&append_to_response=credits`);
    }

    changeSeason = (newSeason) => {
        console.log('Changing season');
        const previousSeason = this.state.currentSeason;
        this.setState({
            currentSeason: newSeason
        });
        this.getEpisodesDetails(`https://api.themoviedb.org/3/tv/${this.props.data.id}/season/${newSeason}?api_key=1cde70c7c55464eecfb2a321de1392af&append_to_response=credits`)
    }

    getBasicShowDetails = (url) => {
        console.log('In get show details');
        let tempNumberOfSeasons = null,
            tempNumberOfEpisodes = null,
            tempGenres= [],
            tempCast = []
        fetch(url).then(res => res.json().then(data => {
            console.log(data);
            data.genres.map((info) => {
                tempGenres.push(info.name);
            });
            data.credits.cast.map((actor) => {
                tempCast.push(actor.name);
            });
            tempNumberOfEpisodes = data.number_of_episodes;
            tempNumberOfSeasons = data.number_of_seasons;
            this.setState({
                genres: tempGenres,
                numberOfSeasons: tempNumberOfSeasons,
                numberOfEpisodes: tempNumberOfEpisodes,
                cast: tempCast
            });
        })).catch(err => console.log('Error occurred getting basic show details, with error:' + err));
    }

    getEpisodesDetails = (url) => {
        console.log('In get episodes details');
        let tempEpisodes = []
        fetch(url).then(res => res.json().then(data => {
            data.episodes.map((episode) => {
                tempEpisodes.push({
                    episodeNumber: episode.episode_number,
                    episodeTitle: episode.name,
                    episodeSynopsis: episode.overview
                });
            });
            const tempNumOfSeasonsArray = Array.from({length: this.state.numberOfSeasons}, (v, k) => k+1);
            this.setState({
                numberOfSeasonsArray: tempNumOfSeasonsArray,
                episodes: tempEpisodes
            });
        })).catch(err => console.log('Error occurred getting episodes, with error:' + err));
    }
}