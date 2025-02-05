import {Header, Footer} from '../index'
import {Outlet} from 'react-router'

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout