import React, { useState } from 'react';
import ChallengeButton from "../../atoms/ChallengeButton";

const ChallengeButtons = ({ handleClick, activeCategory }) => {
    const categories = ["", "Algorithm", "Arrays", "Data Structures", "Dynamic Programming", "Graphs", "Linked Lists"];

    const initialVisibleCategories = categories.slice(0, 5);
    const [visibleCategories, setVisibleCategories] = useState(initialVisibleCategories);
    const [expanded, setExpanded] = useState(false);

    const handleExpandCollapse = () => {
        setExpanded(!expanded);
        setVisibleCategories(expanded ? categories.slice(0, 5) : categories);
    };

    return (
        <div className='sortButtons'>
            {visibleCategories.map(category => (
                <ChallengeButton
                    key={category}
                    text={category || "All"}
                    onClick={() => handleClick(category)}
                    active={category === activeCategory}
                />
            ))}
            {categories.length > 5 && (
                <ChallengeButton
                    key="expandCollapseButton"
                    text={expanded ? "Collapse" : "Expand"}
                    onClick={handleExpandCollapse}
                />
            )}
        </div>
    );
};

export default ChallengeButtons;
