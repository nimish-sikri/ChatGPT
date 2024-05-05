import { login, signup } from "@/actions/login";
import { Footer } from "@/components/auth/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
    return (
        <form className="flex flex-col items-center gap-10">
            <p className="dark:text-white text-black">Welcome back</p>
            <div className="w-full flex flex-col gap-5">
                <Input id="email" name="email" placeholder="email" type="email" className="w-full py-6 dark:text-white text-black dark:border-neutral-700"/>
                <Input id="password" name="password" placeholder="password" type="password" className="w-full py-6 dark:text-white text-black dark:border-neutral-700"/>
            </div>
            <Footer
                actionLabel="Sign in"
                secondaryActionLabel="New to ChatGPT?"
                route="register"
                formAction={login}
            />
        </form>
    )
}

export default LoginPage;