import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import HomePage from './pages/HomePage';
import Anime from './pages/Anime';
import AnimeDetail from './pages/AnimeDetail';
import Watch from './pages/Watch';
import Manga from './pages/Manga';
import MangaDetail from './pages/MangaDetail';
import Read from './pages/Read';
import CommunityPage from './pages/CommunityPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'anime',
        element: <Anime />,
      },
      {
        path: 'anime/:id',
        element: <AnimeDetail />,
      },
      {
        path: 'watch/:animeId/:episode',
        element: <Watch />,
      },
      {
        path: 'manga',
        element: <Manga />,
      },
      {
        path: 'manga/:id',
        element: <MangaDetail />,
      },
      {
        path: 'read/:mangaId/:chapterId',
        element: <Read />,
      },
      {
        path: 'news',
        element: <News />,
      },
      {
        path: 'news/:id',
        element: <NewsDetail />,
      },
      {
        path: 'community',
        element: <CommunityPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'terms',
        element: <TermsPage />,
      },
      {
        path: 'privacy',
        element: <PrivacyPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
