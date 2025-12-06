import {useEffect, useState} from "react";

type AttachmentDto = {
  url: string
}

type TrackListItemOutputAttributes = {
  attachments: Array<AttachmentDto>
  title: string
  lyrics: string | null
}

export type TrackListItemOutput = {
  id: string
  attributes: TrackListItemOutputAttributes
}

function App() {
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)
  const [selectedTrack, setSelectedTrack] = useState<TrackListItemOutput | null>(null)
  const [tracks, setTracks] = useState<Array<TrackListItemOutput> | null>(null)

  useEffect(() => {
    console.log("effect")
    fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
      headers: {
        'api-key': '204bdb46-d091-4ced-a6fd-fdef5467eaaf'
      }
    }).then(res => res.json())
      .then(json => setTracks(json.data))
  }, []);

  useEffect(() => {
    if (!selectedTrackId) {
      return
    }

    fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + selectedTrackId, {
      headers: {
        'api-key': '204bdb46-d091-4ced-a6fd-fdef5467eaaf'
      }
    }).then(res => res.json())
      .then(json => setSelectedTrack(json.data))
  }, [selectedTrackId])

  if (tracks === null) {
    return <span>Loading...</span>
  }

  if (tracks.length === 0) {
    return <span>No tracks</span>
  }

  return (
    <div>
      <h1>Musicfun player</h1>
      <button
        onClick={() => {
          setSelectedTrackId(null)
          setSelectedTrack(null)
        }}
        type="button"
      >
        reset selection
      </button>
      <div
        style={{
          display: 'flex',
          gap: "30px",
        }}
      >
        <ul>
          {tracks.map((track) => {
            return (
              <li
                key={track.id}
                style={{
                  border: track.id === selectedTrackId ? '1px solid orange' : 'none'
                }}
              >
                <div
                  onClick={() => {
                    setSelectedTrackId(track.id)
                  }}
                >
                  {track.attributes.title}
                </div>
                <audio
                  controls
                  src={track.attributes.attachments[0].url}
                ></audio>
              </li>
            )
          })}
        </ul>
        <div>
          <h2>Details</h2>
          {!selectedTrack && !selectedTrackId && 'Track is not selected'}
          {!selectedTrack && selectedTrackId && 'loading...'}
          {selectedTrack && selectedTrackId && selectedTrack.id !== selectedTrackId && 'loading...'}
          {selectedTrack && (
            <div>
              <h3>{selectedTrack.attributes.title}</h3>
              <h4>Lyrics</h4>
              <p>
                {selectedTrack.attributes.lyrics ?? "no lyrics"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
