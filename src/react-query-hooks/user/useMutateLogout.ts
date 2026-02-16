import { useMutation } from "@tanstack/react-query";
import { customerAPI } from "../../services/userApi";

const logoutUser = async () => {
    const response = await customerAPI.logout();
    return response.data;
};

export default function useMutateLogout() {
    return useMutation({
        mutationFn: () => logoutUser(),
    });
}
