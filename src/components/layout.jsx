import Footer from "./footer";
import Header from "./header";

export default function Layout ({children} ) {

    return ( 
        <>
        <Header/>
        <div className="container-fluid mt-2">
             {children}
        </div>
        <Footer/>
        </>
    )
}