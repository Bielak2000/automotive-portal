import {NextPage} from "next";
import RegisterPage from "../../../components/user/register/templates/RegisterPage";
import Layout from "../../../components/common/templates/Layout";

const Register: NextPage = () => {
    return <Layout title="Rejestracja"  showComponents={false}>
        <RegisterPage/>
    </Layout>
}

export default Register;