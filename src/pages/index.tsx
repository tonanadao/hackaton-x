import type { NextPage } from "next";
import Head from "next/head";

import IntroView from "../views/IntroView";
import ForWhoView from "../views/ForWhoView";
import BroadcastView from "../views/BroadcastView";
import PartnersView from "../views/PartnersView";
import SpeakersView from "../views/SpeakersView";
import BlockTalkView from "../views/BlockTalkView";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>BlockTalk</title>
        <meta name="description" content="BlockTalk events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <IntroView />
      <ForWhoView />
      <BroadcastView />
      <PartnersView />
      <SpeakersView />
      <BlockTalkView />
    </div>
  );
};

export default Home;
