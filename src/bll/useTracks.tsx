import {useEffect, useState} from "react";
import {getTracks, type TrackListItemOutput} from "../dal/api.ts";

export function useTracks() {
  const [tracks, setTracks] = useState<Array<TrackListItemOutput> | null>(null)

  useEffect(() => {
    getTracks()
      .then(json => setTracks(json.data))
  }, []);

  return {
    tracks
  }
}