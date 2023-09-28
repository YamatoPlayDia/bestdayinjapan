import { useEffect, useState } from 'react';
import Timer from '../../components/Timer';
import TimerStartButton from '../../components/TimerStartButton';
import styles from '../../styles/timer.module.scss';
import { utils } from '../../utils/utils';

import {
  BookingStatus,
  LanguageLevel,
  UserType,
  UserStatus,
  UserData,
  GuestData,
  GuideData,
  BookingData,
  PageProps,
} from '../../types/types';

function TimerPage({ isLoggedIn, userData }: PageProps): JSX.Element {
  const { router, apiUrl, createSecuredAxiosInstance, formatDateToCustom } = utils();
  const [isLoading, setIsLoading] = useState(true);
  const getBookingStatus = (status?: BookingStatus) => {
    switch (status) {
        case BookingStatus.OfferPending:
            return 'OfferPending';
        case BookingStatus.Accepted:
            return 'Accepted';
        case BookingStatus.Started:
            return 'Started';
        case BookingStatus.Finished:
            return 'Finished';
        case BookingStatus.Reviewed:
            return 'Reviewed';
        case BookingStatus.Cancelled:
            return 'Cancelled';
        default:
            return '';
    }
  };

  useEffect(() => {
    // ユーザーデータが存在する場合のみ処理を行う
    if (userData) {
      if (userData.booking_status !== BookingStatus.Accepted && userData.booking_status === BookingStatus.Finished) {
        router.push('/guest/review');
      } else if (userData.booking_status !== BookingStatus.Accepted && userData.booking_status !== BookingStatus.Started) {
        router.push('/');
      }
      setIsLoading(false); // リダイレクト判定後にローディングステートをfalseに設定
    }
  }, [userData]);

  // ローディング中はローディング画面を表示
  if (isLoading) {
    return <div>Loading...</div>; // ここで適切なローディングコンポーネントを返す
  }

  const BookingStatusClass = userData && userData.booking_status !== null
    ? getBookingStatus(userData.booking_status) || 'default'
    : 'default';

  return (
    <main className={styles[BookingStatusClass]}>
        <div className={styles.container}>
            <div className={styles.logo}></div>
            <Timer isLoggedIn={isLoggedIn} userData={userData} />
            <TimerStartButton isLoggedIn={isLoggedIn} userData={userData} />
            <p>We will deliver<br/>the best day<br/>in Japan for you.</p>
        </div>
    </main>
  );
}

export default TimerPage;
