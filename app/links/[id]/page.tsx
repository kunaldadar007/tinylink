import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StatsChart from '../../../components/StatsChart';

const LinkStatsPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [linkData, setLinkData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchLinkData = async () => {
                try {
                    const response = await fetch(`/api/stats/${id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch link data');
                    }
                    const data = await response.json();
                    setLinkData(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchLinkData();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!linkData) return <div>No data available for this link.</div>;

    return (
        <div>
            <h1>Statistics for Link: {linkData.shortCode}</h1>
            <p>Target URL: {linkData.targetUrl}</p>
            <p>Total Clicks: {linkData.totalClicks}</p>
            <p>Last Clicked: {linkData.lastClicked}</p>
            <StatsChart data={linkData.clickStats} />
        </div>
    );
};

export default LinkStatsPage;