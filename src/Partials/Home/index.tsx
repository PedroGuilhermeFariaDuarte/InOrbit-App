// Icons

// Assets
import letsStart from "../../assets/lets-start-illustration.svg";
import logo from "../../assets/logo-in-orbit.svg";
import { Create } from "../../components/Create";

export function Home() {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-8">
            <img src={logo} alt="in.orbit" />
            <img src={letsStart} alt="in.orbit" />

            <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
                Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
            </p>
            
            <Create />    
        </div>
    )
}