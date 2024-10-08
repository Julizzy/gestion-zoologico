"use client";
import Header from "@/components/ui/Header";
import Background from "@/components/ui/Background";
import Navbar from "@/components/ui/Navbar";
import CarouselWithImages from "@/components/ui/CarouselWithImages";


export default function Home() {
  return (
    <Background>
      <div className="relative w-full h-100">
        <Header />
        <Navbar />
        <main className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-2xl font-bold text-[#d5d897]">Gestiona los animales y cuida su bienestar.</p>
          <div className="w-full max-w-4xl mt-8">
            <CarouselWithImages />
          </div>
          <div className="w-full max-w-4xl mt-8">
          </div>
        </main>
      </div>
    </Background>
  );
}
