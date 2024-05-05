import { login, signup } from "@/actions/login";
import { Footer } from "@/components/auth/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RegisterPage = () => {
    return (
        <form className="flex flex-col items-center gap-10">
            <p className="dark:text-white text-black">Create your account</p>
            <div className="w-full flex flex-col gap-5">
                <Input id="name" name="name" placeholder="Name" type="text" className="w-full py-6 dark:text-white text-black dark:border-neutral-700"/>
                <Input id="email" name="email" placeholder="Email" type="email" className="w-full py-6 dark:text-white text-black dark:border-neutral-700"/>
                <Input id="password" name="password" placeholder="Password" type="password" className="w-full py-6 dark:text-white text-black dark:border-neutral-700"/>
            </div>
            <Footer
                actionLabel="Sign up"
                secondaryActionLabel="Already have an account"
                route="login"
                formAction={signup}
            />
        </form>
    )
}

export default RegisterPage;