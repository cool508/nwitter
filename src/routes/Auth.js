import { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const onChange = (event) => {
        const {
            target: {name, value},
        } = event;
        if ( name === "email") {
            setEmail(value);
        } else if ( name === "password") {
            setPassword(value);
        }
    }
    
    const onSubmit = (event) => {
        event.preventDefault();
        if (newAccount) {
            // create newAccount
        } else {
            // Log in
        }
    }

    return (
        <div>
            <form>
                <input type="email" name="email" placeholder="Email" required  value={ email } onChange={ onChange } />
                <input type="password" placeholder="Password" required value={ password } onChange={ onChange } />
                <input type="submit" value={ newAccount ? "Create Account" : "Log In" }  />
            </form>
            <div>
                <button>Continue with Goolge</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
};
export default Auth