import React, { useState } from 'react';
import { TrackListRow } from './track-list-row';
import { TrackListHeader, TrackListHeaderProps } from './track-list-header';
import { useCurrentPlayerTrackUri } from 'custom-apps/better-local-files/src/hooks/use-current-uri';
import { Track } from 'custom-apps/better-local-files/src/models/track';
import {
    PlayStatus,
    usePlayStatus,
} from 'custom-apps/better-local-files/src/hooks/use-play-status';

export type SubTracksList = {
    headerRow: JSX.Element;
    tracks: Track[];
};

export interface TrackListGridProps extends TrackListHeaderProps {
    tracks: Track[];
    subtracks: SubTracksList[];
    gridLabel: string;
    useTrackNumber: boolean;
    onPlayTrack: (uri: string) => void;
    getRowContent: (track: Track) => JSX.Element[];
}

/**
 * Contains the track list header and rows.
 */
export function TrackListGrid(props: TrackListGridProps) {
    const activeTrackUri = useCurrentPlayerTrackUri();
    const playStatus: PlayStatus = usePlayStatus();

    // TODO: Multi selection
    const [selectedTrackUri, setSelectedTrackUri] = useState<string | null>(
        null
    );

    return (
        <>
            <div
                role="grid"
                aria-rowcount={props.tracks.length}
                aria-colcount={props.headers.length + 2}
                aria-label={props.gridLabel}
                className="main-trackList-trackList main-trackList-indexable"
                tabIndex={0}
            >
                <TrackListHeader
                    headers={props.headers}
                    sortedHeader={props.sortedHeader}
                    onHeaderClicked={props.onHeaderClicked}
                ></TrackListHeader>

                <div role="presentation">
                    {props.tracks.map((track, index) => (
                        <TrackListRow
                            key={track.uri}
                            track={track}
                            index={
                                props.useTrackNumber
                                    ? track.trackNumber
                                    : index + 1
                            }
                            selected={selectedTrackUri === track.uri}
                            active={activeTrackUri === track.uri}
                            playing={
                                activeTrackUri === track.uri &&
                                playStatus === 'play'
                            }
                            onClick={() => setSelectedTrackUri(track.uri)}
                            onDoubleClick={() => props.onPlayTrack(track.uri)}
                        >
                            {props.getRowContent(track)}
                        </TrackListRow>
                    ))}

                    {props.subtracks.map((sub) => {
                        return (
                            <>
                                {sub.headerRow}
                                {sub.tracks.map((track, index) => (
                                    <TrackListRow
                                        key={track.uri}
                                        track={track}
                                        index={
                                            props.useTrackNumber
                                                ? track.trackNumber
                                                : index + 1
                                        }
                                        selected={
                                            selectedTrackUri === track.uri
                                        }
                                        active={activeTrackUri === track.uri}
                                        playing={
                                            activeTrackUri === track.uri &&
                                            playStatus === 'play'
                                        }
                                        onClick={() =>
                                            setSelectedTrackUri(track.uri)
                                        }
                                        onDoubleClick={() =>
                                            props.onPlayTrack(track.uri)
                                        }
                                    >
                                        {props.getRowContent(track)}
                                    </TrackListRow>
                                ))}
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
