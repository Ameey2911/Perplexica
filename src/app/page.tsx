import ChatWindow from '@/components/ChatWindow';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Chat - Perplexica',
  description: 'Chat with the internet, chat with Perplexica.',
};

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between items-center px-4 py-8 text-center">
      {/* Chat Window */}
      <Suspense>
        <ChatWindow />
      </Suspense>

      {/* Powered by Footer */}
      <div className="text-xs text-gray-400 mt-10">
        Powered by <span className="font-semibold">BrainPlex AI</span> • v1.0
      </div>
    </div>
  );
};

export default Home;
