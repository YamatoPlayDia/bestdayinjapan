import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import styles from '../styles/guest.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReactStarsRating from 'react-awesome-stars-rating';
import { utils } from '../utils/utils';
import {
  BookingStatus,
  LanguageLevel,
  UserType,
  UserStatus,
  UserData,
  GuestData,
  GuideData,
  PageProps
} from '../types/types';

enum SortOption {
  Newest,
  HighestRated,
  MostReviewed,
  HighestLanguageLevel,
  MostExpensive,
  LeastExpensive,
  Nearest,
}

function Home({ userData }: PageProps): JSX.Element | null {

// <-- ---------- useState ---------- -->

  const [isLoading, setIsLoading] = useState(true);


// <-- ---------- 定数の定義 ---------- -->
  const router = useRouter();
  const { apiUrl, createSecuredAxiosInstance, formatDateToCustom } = utils();

// <-- ---------- 表示 ---------- -->

  // 表示
  if (isLoading) {
    return <div>Loading...</div>; // ローディング画面の表示
  }

  return (
    <>
      <div className="relative h-screen w-full bg-center bg-cover" style={{ backgroundImage: 'url(/top_image.webp)' }}>

        {/* ロゴの配置 */}
        <img src="/top_logo.webp" alt="Top Logo" className="absolute top-16 left-16" />

        {/* ボタンの配置 */}
        <div className="absolute left-16 mt-28">
            <Link href="/guest">
              <Button className="bg-blue-500 text-white py-2 px-4 mr-3 rounded">For Guide</Button>
            </Link>
            <Link href="/guide/auth">
              <Button className="bg-red-500 text-white py-2 px-4 rounded">For Guest</Button>
            </Link>
        </div>

      </div>
    </>
  );
}

export default Home;
