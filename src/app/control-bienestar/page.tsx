
import Header from "@/components/ui/Header";
import Background from "@/components/ui/Background";
import Navbar from "@/components/ui/Navbar";
import WellbeingControlForm from "@/components/ui/WellbeingControlForm"; 
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function ControlBienestarPage() {
  return (
    <Background>
     <div className="relative w-full h-100">
        <Header />
        <Navbar />
    <div className="container mx-auto p-10">
    <div className="max-w-3xl mx-auto">
          <Breadcrumb className="ml-[-15rem]">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/"className="text-[#638495] hover:text-[#638495]">
                Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#5894bc]">
                Control Médico</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

        
    <p className="bg-gradient-to-r from-[#285255] to-[#1e3c3f] text-lg mb-5 text-center text-[#d5d897] p-3 rounded-lg shadow-lg border border-[#3a6f70]">
       Registra el estado de bienestar de los animales y monitorea su salud para garantizar su cuidado óptimo.
    </p>
      <WellbeingControlForm />
    </div>
    </div>
    </div>
    </Background>
  );
}
