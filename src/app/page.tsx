import Header from "@/components/ui/Header";
import Background from "@/components/ui/Background";
import { Button } from "@/components/ui/Button";
import Navbar from "@/components/ui/Navbar";




export default function Home() {
  return (
    <Background >
      <div>
      </div>
      <div className="relative w-full h-100">
        <Header />
        <Navbar />
        <main className="flex flex-col items-center justify-center min-h-screen">
          <p className="mt-4 text-lg text-[#90bd82]">Gestiona los animales y cuida su bienestar.</p>
          <Button className="px-8 py-6 bg-[#275255] text-white font-bold rounded">
             Empezar
          </Button>
        </main>
      </div> 
      </Background>
  );
}
