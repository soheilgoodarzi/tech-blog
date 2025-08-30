import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | TechBlog by Soheil',
  description: 'Learn more about the purpose of this blog and its author.',
};

export default function AboutPage() {
  return (
    <div className="md:max-w-4xl xs:max-w-md mx-auto lg:py-12 xs:py-5 md:py-20 px-4">
      
      <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/10">

        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/profile.jpg"
            alt="Soheil Goodarzi"
            width={150}
            height={150}
            className="rounded-full shadow-lg lg:mb-4 xs:mb-1 border-4 border-gray-700 xs:max-w-[105px]"
            priority
          />
          <h1 className="lg:text-4xl xs:text-2xl font-bold text-white">Soheil Goodarzi</h1>
          <p className="lg:text-lg xs:text-sm text-amber-500 mt-1">Front-end Developer</p>
        </div>

        <div className="prose prose-invert xs:text-xs lg:prose-xl max-w-none xs:mt-5 lg:mt-12">
          <h2>About This Blog</h2>
          <p>
            Welcome to my personal tech blog! I created this space to document my journey learning modern web technologies like React, Next.js, and TypeScript. This project itself is a live demonstration of these skills, built from the ground up.
          </p>
          <p>
            My goal is to share clear, practical, and in-depth tutorials that can help other developers on their own learning paths.
          </p>
          
          <h2>Tech Stack</h2>
          <p>
            This website is built with a modern, high-performance stack:
          </p>
          <ul>
            <li>Framework: <strong>Next.js (App Router)</strong></li>
            <li>Language: <strong>TypeScript</strong></li>
            <li>Styling: <strong>Tailwind CSS</strong></li>
            <li>Content: <strong>Local Markdown files (SSG)</strong></li>
            <li>Deployment: <strong>Vercel</strong></li>
          </ul>
        </div>

      </div>
    </div>
  );
}