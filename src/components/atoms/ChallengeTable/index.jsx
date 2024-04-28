import React, { useState } from 'react';
import './ChallengeTable.scss';
import { Link } from 'react-router-dom';
import ChallengeCode from '../ChallengeCode';

const PAGE_SIZE = 10;

export default function ChallengeTable({ challenges, sortCategory, onSortChange }) {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedChallenge] = useState(null);

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
        setCurrentPage(1);
        onSortChange({ column, order: sortOrder, page: 1 });
    };

    const sortedChallenges = sortCategory
        ? challenges.filter(challenge => challenge.category === sortCategory)
        : challenges;

    if (sortColumn) {
        sortedChallenges.sort((a, b) => {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];

            if (sortColumn === 'id') {
                return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
            } else {
                return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
        });
    }

    const totalPages = Math.ceil(sortedChallenges.length / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const visibleChallenges = sortedChallenges.slice(startIndex, startIndex + PAGE_SIZE);

    const renderPageButtons = () => {
        const pageButtons = [];
        for (let i = 1; i <= totalPages; i++) {
            pageButtons.push(
                <button key={i} onClick={() => setCurrentPage(i)} className={i === currentPage ? 'active' : ''}>
                    {i}
                </button>
            );
        }
        return pageButtons;
    };

    const practicalQuestions = visibleChallenges.filter((challenge) => challenge.theoretical === 'False');
    return (
        <div className="challenge-table">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <button onClick={() => handleSort('id')}>ID</button>
                            </th>
                            <th>
                                <button onClick={() => handleSort('name')}>Name</button>
                            </th>
                            <th>
                                <button onClick={() => handleSort('difficulty')}>Difficulty</button>
                            </th>
                            <th>
                                <p>Estimated Time</p>
                            </th>
                            <th>
                                <p>Start</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {practicalQuestions.map((challenge, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{challenge.challengeName}</td>
                                <td>{challenge.challengeDifficulty}</td>
                                <td>{challenge.estimatedTime} minutes</td>
                                <td>
                                    <Link className="start-link" to={`/playcodearena/practical/challenge-code/${challenge._id}`}>Start</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                {renderPageButtons()}
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
            {selectedChallenge && (
                <ChallengeCode question={selectedChallenge.question} />
            )}
        </div>
    );
}
