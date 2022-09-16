import type { NextPage } from "next";
import Head from "next/head";

import IntroView from "../views/IntroView";
import InfoView from "../views/InfoView";
import ForWhoView from "../views/ForWhoView";
import BroadcastView from "../views/BroadcastView";
import PartnersView from "../views/PartnersView";
import SpeakersView from "../views/SpeakersView";
import MentorsView from "../views/MentorsView";
import JudgesView from "../views/JudgesView";
import LecturersView from "../views/LecturersView";
import BlockTalkView from "../views/BlockTalkView";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hack-a-TON</title>
        <meta name="description" content="Tonana Hack-a-TON x Prague. Come and Learn, Compete, Enjoy" />
        <link rel="icon" href="../../public/images/tonana.png" />

        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no,viewport-fit=cover" />
        <meta name="author" content="Tonana Hack-a-TON x Prague" />
        <meta name="apple-mobile-web-app-title" content="Tonana Hack-a-TON x Prague" />
        <meta name="application-name" content="Tonana Hack-a-TON x Prague" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tonana Hack-a-TON x Prague" />
        <meta property="og:title" content="Tonana Hack-a-TON x Prague" />
        <meta property="og:description" content="This is the first TON-based hackathon in Europe for students, engineers, business devs, designers, artists, and cypherpunks!" />
        <meta property="og:url" content="https://hackatonx.tonana.org" />
        <meta property="og:image" content="../../public/images/tonana.png" />

      </Head>

      <IntroView />
      <BlockTalkView />
      <ForWhoView />
      <InfoView />
      {/* <BroadcastView /> */}
      <PartnersView />
      <JudgesView />
      <LecturersView />
      <SpeakersView />
      <MentorsView />
    </div>
  );
};

export default Home;
