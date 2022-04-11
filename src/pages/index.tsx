import type { NextPage } from "next";
import Head from "next/head";
import HomeView from "../views/HomeView";
import PartnersView from "../views/PartnersView";
import BlockTalkView from "../views/BlockTalkView";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>BlockTalk</title>
        <meta name="description" content="BlockTalk events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeView />
      <PartnersView />
      <BlockTalkView />
    </div>
  );
};

export default Home;
