import Link from 'next/link'
import Router from 'next/router';
import React, {useEffect, useState} from 'react';

function NavBar() {
    const[selectedPage, changePage] = useState(null)

    useEffect(() => {
        const router = Router
        let {pathname} = router
        changePage(pathname.substring(1, pathname.length))
    }, [])

    return (
        <div className="navbar">
            <Link href='/'><div onClick={() => changePage('')} className={selectedPage===''?'selectednav':''}>Introdução</div></Link>
            <Link href='/sorting'><div onClick={() => changePage('sorting')} className={selectedPage==='sorting'?'selectednav':''}>Sorting</div></Link>
            <Link href='/pathfinding'><div onClick={() => changePage('pathfinding')} className={selectedPage==='pathfinding'?'selectednav':''}>Path Finding</div></Link>
        </div>
    );
}

export default NavBar;