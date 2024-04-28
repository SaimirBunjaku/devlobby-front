import React from 'react'
import DiaryCard from '../../atoms/DiaryCard'

import { useOutletContext } from 'react-router-dom'

const DiaryMe = () => {
  const [diaries, deleteDiary, upvoteDiary, togglePrivacy, moto] =
    useOutletContext()

  const calculateWhenPosted = timestampString => {
    const timeStamp = new Date(timestampString)
    const now = new Date()

    const timeDifference = now - timeStamp

    const minutesDifference = Math.floor(timeDifference / (1000 * 60))

    let formattedTimeDifference
    if (minutesDifference < 60) {
      formattedTimeDifference = `${minutesDifference} m`
    } else if (minutesDifference < 24 * 60) {
      const hoursDifference = Math.floor(minutesDifference / 60)
      formattedTimeDifference = `${hoursDifference} h`
    } else {
      const daysDifference = Math.floor(minutesDifference / (60 * 24))
      formattedTimeDifference = `${daysDifference} d`
    }

    return formattedTimeDifference
  }

  return (
    <>
      {!diaries?.length && <div className='noDiaries'>{moto}</div>}
      {diaries?.map((card, i) => {
        return (
          <DiaryCard
            key={i}
            id={card?._id}
            fullName={card?.user?.fullName}
            profilePicture={card?.user?.profilePicture}
            userId={card?.user?._id}
            username={card?.user?.username}
            postedAgo={calculateWhenPosted(card?.createdAt)}
            text={card?.text}
            upvotes={card?.upvotes}
            upvoteCount={card?.upvotes?.length}
            media={card?.media}
            privacy={card?.privacy}
            deleteDiary={deleteDiary}
            togglePrivacy={togglePrivacy}
            handleUpvote={upvoteDiary}
          />
        )
      })}
    </>
  )
}

export default DiaryMe
