import React, { useEffect, useState } from 'react';
import LinkForm from '../../components/LinkForm';
import LinkList from '../../components/LinkList';

const LinksPage = () => {
  const [links, setLinks] = useState([]);

  const fetchLinks = async () => {
    const response = await fetch('/api/links');
    const data = await response.json();
    setLinks(data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div>
      <h1>Manage Links</h1>
      <LinkForm onLinkCreated={fetchLinks} />
      <LinkList links={links} onLinkDeleted={fetchLinks} />
    </div>
  );
};

export default LinksPage;