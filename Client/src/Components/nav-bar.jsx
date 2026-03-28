import {Link} from 'react-router-dom'

export default function NavBar() {
    return(
        <>
          <nav className="w-full h-fit p-2 flex flex-row items-center justify-between shadow-2xl">
            <h1 className="md:text-4xl text-3xl font-bold text-black">MemoryDrop</h1>
            <ul className="md:flex hidden flex-row gap-3 text-2xl">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/memories">Memories</Link></li>
            </ul>

            <div className="flex flex-row gap-3">
                <button className="underline text-sm text-slate-600 hover:no-underline hover:text-black"><Link to="/auth">Login</Link></button>
                <button className="px-8 py-4 rounded-3xl bg-black text-white text-sm"><Link to="/auth">Sign Up</Link></button>
            </div>
          </nav>
        </>
    )
}