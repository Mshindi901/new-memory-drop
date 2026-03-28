import {Typewriter} from 'react-simple-typewriter';

export default function HeroSection() {
    return(
        <section className="w-full h-screen flex items-center justify-center p-4 bg-black/90 text-shadow-white">
            <div className="flex flex-col gap-3 text-white">
                <span className='text-2xl md:text-5xl font-bold text-white'>
                    <Typewriter 
                        words={['Cloud Storage with a little bit of fun😊']}
                        loop={true}
                        cursorStyle = '|'
                        typeSpeed={90}
                        delaySpeed={1200}
                        deleteSpeed={60}
                    />
                </span>
                <p className="text-sm md:text-lg text-slate-300">Store your memories in the cloud and share them with Other users as Public memories</p>
            </div>
        </section>
    )
};