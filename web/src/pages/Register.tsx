import MainLayout from "../layouts/Main";
import { Formik, Field, Form } from "formik";

interface Props {}

const RegisterPage: React.FC<Props> = () => {
  return (
    <MainLayout title="Register | Chat App">
      <div className="container">
        <div className="p-4 border-green-500 rounded-sm border-1">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => console.log(values)}
          >
            <Form>
              <Field name="name" />
              <Field name="email" />
              <Field name="password" />
              <Field name="confirmPassword" />
            </Form>
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;
