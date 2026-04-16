import Image from 'next/image';
import FaceBookImg from "../assets/facebook.png";
import instagramImg from "../assets/instagram.png";
import twitterImg from "../assets/twitter.png";
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#244D3F] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        
      
       <h2 className="text-3xl font-bold mb-4 tracking-tight text-white">
  Keen<span className="font-light opacity-90">Keeper</span>
</h2>
        
   
        <p className="text-emerald-100/70 text-sm max-w-md mb-8">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

    
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-100/50">
            Social Links
          </span>
          <div className="flex gap-6">
        
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image 
                src={FaceBookImg} 
                alt="Facebook" 
                width={24} 
                height={24} 
                className="object-contain"
              />
            </a>
            
         
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image 
                src={instagramImg} 
                alt="Instagram" 
                width={24} 
                height={24} 
                className="object-contain"
              />
            </a>

          
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image 
                src={twitterImg} 
                alt="Twitter" 
                width={24} 
                height={24} 
                className="object-contain"
              />
            </a>
          </div>
        </div>

      
        <div className="w-full border-t border-emerald-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-emerald-100/40 uppercase font-medium tracking-widest">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;