import React from "react";
import Collapsible from "./collapsible";

export default class EpisodeDetails extends React.Component {
    render() {
        return (
            <Collapsible title={`${this.props.episodeNumber}. ${this.props.episodeTitle}`}>
                <p>{this.props.episodeSynopsis}</p>
            </Collapsible>
        );
    }
}