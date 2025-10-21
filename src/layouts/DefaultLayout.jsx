import { Outlet } from "react-router-dom";
import { useLoader } from "../contexts/LoaderContext";
import Loader from "../components/ui/Loader";
import Header from "../components/layout/Header";

export default function DefaultLayout () {
    const { isLoading } = useLoader();

    return (
        <>
            <Loader isShow={isLoading} />
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};