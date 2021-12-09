// return search textbox elements and search button

import React from "react";
import { v4 as uuidv4 } from 'uuid';
import debounce from 'lodash.debounce';
import { useCallback } from "react";

import search from "./Search";
import setInput from "./SetInput";
import artSuggest from "./ArtistSuggest";
import "../SearchLayout.css";

function HandleInput(props) {
    const debouncedChangeHandler = useCallback( // a lodash function to call function once after finished typing
        debounce((event) => artSuggest(props, event), 300)
        , [props]);

    return (
        <form
            onSubmit={(event) => search(props, event)}
        >
            <input
                type="text"
                placeholder="Enter Song Title Here!"
                id="inputsong"
                onChange={debouncedChangeHandler}
            ></input>

            <select
                id="suggsong"
                onChange={(event) => setInput(props, event)}
                value={props.inputArtist}
            >
                <option value="default" selected disabled>Suggested Songs</option>
                {props.artistResults.map((item) => {
                    return <option key={uuidv4()}>{item.title}</option>
                })}
            </select>

            <select
                id="suggartist"
                onChange={(event) => setInput(props, event)}
                value={props.inputArtist}
            >
                <option value="default" selected disabled>Suggested Artists</option>
                {props.artistResults.map((item) => {
                    return <option key={uuidv4()}>{item.artist}</option>
                })}
            </select>

            <button id="searchbutton" disabled>Search</button>
        </form> // run Search.js/search() upon submission
    )
}

export default HandleInput;