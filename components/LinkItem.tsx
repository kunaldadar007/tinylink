import React from 'react';

interface LinkItemProps {
    id: string;
    shortCode: string;
    targetUrl: string;
    totalClicks: number;
    lastClicked: string | null;
    onDelete: (id: string) => void;
}

const LinkItem: React.FC<LinkItemProps> = ({ id, shortCode, targetUrl, totalClicks, lastClicked, onDelete }) => {
    return (
        <div className="link-item">
            <div className="link-details">
                <p>Short Code: <strong>{shortCode}</strong></p>
                <p>Target URL: <a href={targetUrl} target="_blank" rel="noopener noreferrer">{targetUrl}</a></p>
                <p>Total Clicks: <strong>{totalClicks}</strong></p>
                <p>Last Clicked: <strong>{lastClicked ? lastClicked : 'Never'}</strong></p>
            </div>
            <button onClick={() => onDelete(id)} className="delete-button">Delete</button>
            <button className="stats-button">View Stats</button>
        </div>
    );
};

export default LinkItem;