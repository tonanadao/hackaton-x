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
        <link rel="icon" href="/tonana.svg" />
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
