import React, { ReactNode } from 'react';
import ToolBar from './Toolbar';

interface LayoutProps {
    children: ReactNode
}
const Layout =(props: LayoutProps) =>{
    return(
        <>
        <div>
            <ToolBar/>
        </div>
        <main>{props.children}</main>
        </>
    )
}

export default Layout;