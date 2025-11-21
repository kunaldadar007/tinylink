import React from 'react';
import LinkList from '../../components/LinkList';
import LinkForm from '../../components/LinkForm';

const DashboardPage = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <LinkForm />
            <LinkList />
        </div>
    );
};

export default DashboardPage;