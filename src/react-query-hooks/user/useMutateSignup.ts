import { useMutation } from "@tanstack/react-query";
import { customerAPI } from "../../services/userApi";

interface SignupData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

const addSignupUser = async (signupInfo: SignupData) => {
    const response = await customerAPI.register(signupInfo);
    return response.data;
};

export default function useMutateSignup() {
    return useMutation({
        mutationFn: (signupInfo: SignupData) => addSignupUser(signupInfo),
    });
}
