import MainNav from "@/components/Navbar/MainNav";
import { Navbar } from "@/components/Navbar/Navbar";


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>


            <MainNav>
                <Navbar />
            </MainNav>

            <main>{children}</main>
        </>


    );
}
