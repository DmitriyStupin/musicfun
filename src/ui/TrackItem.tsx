import type {TrackListItemOutput} from "../dal/api.ts";
import styles from '../TracksList.module.css'

type Props = {
  onSelect: (trackId: string) => void
  isSelected: boolean
  track: TrackListItemOutput
}

export function TrackItem({onSelect, track, isSelected}: Props) {
  const handleClick = () => onSelect(track.id)

  return (
    <li
      className={styles.track}
      key={track.id}
      style={{
        borderColor: isSelected ? 'orange' : '#747bff'
      }}
    >
      <div
        onClick={handleClick}
      >
        {track.attributes.title}
      </div>
      <audio
        controls
        src={track.attributes.attachments[0].url}
      ></audio>
    </li>
  )
}