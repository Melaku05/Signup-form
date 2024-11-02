import React, { Suspense} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../components/Home";
import LoginForm from "../features/auth/components/LoginForm";
import Activation from "../features/auth/components/Activation";
import RequestPasswordReset from "../features/auth/components/RequestPasswordReset";
import ResetPasswordConfirm from "../features/auth/components/ResetPasswordConfirm";


const AppRoutes: React.FC = () => (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm onClose={function (): void {
                    throw new Error("Function not implemented.");
                } } onLoginSuccess={function (): void {
                    throw new Error("Function not implemented.");
                    }} />} />
                <Route path="/auth/users/activation" element={<Activation />} />
                <Route path="/request-reset-password" element={<RequestPasswordReset />} />
                <Route path="/auth/users/reset_password_confirm" element={<ResetPasswordConfirm />} />
            </Routes>
        </Suspense>
    </Router>
);

export default AppRoutes;
