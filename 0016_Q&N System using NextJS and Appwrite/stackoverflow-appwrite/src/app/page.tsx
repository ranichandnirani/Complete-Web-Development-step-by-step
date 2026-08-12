import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import LatestQuestions from "./components/LatestQuestions";
import TopContributers from "./components/TopContributers";
import { connection } from "next/server";

export default async function Home() {
  await connection();

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <section className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <h2 className="mb-6 text-2xl font-bold">Latest questions</h2>
            <LatestQuestions />
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-bold">Top contributors</h2>
            <TopContributers />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
