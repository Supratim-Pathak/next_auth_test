import { useFormik } from "formik";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export default function login(props) {

  const router = useRouter()

  const googleHandeler = async () => {
    signIn("google", { callbackUrl: "http://localhost:3000/" });
  };
  const githubHandeler = async () => {
    signIn("github", { callbackUrl: "http://localhost:3000/" });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const status =  await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl:'/'
      });

      console.log(status)
      if (status.status === 200) {
        router.push(status.url)
      }
    },
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <button
            type="button"
            className="btn btn-warning"
            onClick={googleHandeler}
          >
            Google
          </button>
          <button
            type="button"
            className="btn btn-dark mt-5"
            onClick={githubHandeler}
          >
            Github
          </button>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: "data",
    },
  };
}
