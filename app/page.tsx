import LinkForm from '@/components/LinkForm';
import LinkList from '@/components/LinkList';

const HomePage = () => {
  return (
    <div>
      <h1>TinyLink - URL Shortener</h1>
      <LinkForm />
      <LinkList />
    </div>
  );
};

export default HomePage;