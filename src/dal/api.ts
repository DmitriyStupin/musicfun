export type GetTrackDetailsOutputData = {
  id: string
  attributes: {
    title: string
    lyrics: string | null
  }
}

type GetTrackDetailsOutput = {
  data: GetTrackDetailsOutputData
}

export const getTrack = (trackId: string) => {
  const promise: Promise<GetTrackDetailsOutput> = fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + trackId, {
    headers: {
      'api-key': '8ddb4337-dc61-4171-95ac-22e142ce9226'
    }
  }).then(res => res.json())

  return promise
}

type AttachmentDto = {
  url: string
}

type TrackListItemOutputAttributes = {
  attachments: Array<AttachmentDto>
  title: string
}

export type TrackListItemOutput = {
  id: string
  attributes: TrackListItemOutputAttributes
}

type GetTrackListOutput = {
  data: Array<TrackListItemOutput>
}

export const getTracks = () => {
  const promise: Promise<GetTrackListOutput> = fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
    headers: {
      'api-key': '8ddb4337-dc61-4171-95ac-22e142ce9226'
    }
  }).then(res => res.json())

  return promise
}