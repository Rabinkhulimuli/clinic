import SlideViewer from '@/components/SliderViewer';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Whole Slide Image Viewer</h1>
      <SlideViewer />
    </div>
  );
};

export default Home;