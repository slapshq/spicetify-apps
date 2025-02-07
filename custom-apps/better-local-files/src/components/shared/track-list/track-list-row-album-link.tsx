import { Routes } from 'custom-apps/better-local-files/src/constants/constants';
import { navigateTo } from 'custom-apps/better-local-files/src/helpers/history-helper';
import { Track } from 'custom-apps/better-local-files/src/models/track';
import React from 'react';

// TODO: Only relevant props
interface TrackListRowAlbumLinkProps {
    track: Track;
}

export function TrackListRowAlbumLink(props: TrackListRowAlbumLinkProps) {
    return (
        <a
            draggable="true"
            className="standalone-ellipsis-one-line"
            dir="auto"
            href="#"
            tabIndex={-1}
            onClick={() => navigateTo(Routes.album, props.track.album.uri)}
        >
            {props.track.album.name}
        </a>
    );
}
