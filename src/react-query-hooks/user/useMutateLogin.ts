import { useMutation } from "@tanstack/react-query";
import { customerAPI } from "../../services/userApi";

interface LoginData {
    email: string;
    password: string;
}

const addLoginUser = async (loginInfo: LoginData) => {
    const response = await customerAPI.login(loginInfo);
    return response.data;
};

export default function useMutateLogin() {
    return useMutation({
        mutationFn: (loginInfo: LoginData) => addLoginUser(loginInfo),
    });
}
