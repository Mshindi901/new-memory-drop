import AuthForms from "../Components/auth-forms.jsx";
import NavBar from "../Components/nav-bar.jsx";

export default function Auth() {
    return (
        <div className="min-h-screen ">
            <NavBar />
            <div className="container mx-auto px-4 py-8 w-full h-screen flex items-center justify-center">
                <AuthForms />
            </div>
        </div>
    );
}