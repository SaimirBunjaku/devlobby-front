import React, { useState } from "react";
import { useEffect } from "react";
import ChallengeTable from "../../atoms/ChallengeTable";
import ChallengeButtons from "../../molecules/ChallengeButtons";
import "./ChallengeArea.scss";
import ChallengeHeader from "../../atoms/ChallengeHeader";
import ChallengeService from "../../../services/ChallengeService";

export default function ChallengeArea() {
  const [challenge, setChallenge] = useState([])
    useEffect(() => {
      try{
        ChallengeService.GetChallenges()
        .then((response) => {
          console.log(response)
          console.log(response.challenges.challengeName)
          setChallenge(response.challenges)
        })
        .catch((error) => {
          console.log(error)
        })
      }
      catch (error) {
        console.log(error)
      }
    }, [])
  
  const [sortCategory, setSortCategory] = useState("");

  const handleClick = (category) => {
    setSortCategory(category);
  };


  const handleSortChange = ({ column, order }) => {
    return { column, order };
  };

  return (
    <div className="challenge-tab">
      <div className="table-button">
        <ChallengeHeader />
        <ChallengeButtons
          handleClick={handleClick}
          activeCategory={sortCategory}
        />
        <ChallengeTable
          challenges={challenge}
          sortCategory={sortCategory}
          onSortChange={handleSortChange}
        />
      </div>
    </div>
  );
}
