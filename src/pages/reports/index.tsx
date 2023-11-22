import React from "react";

const reports = () => {
	return <h1>Reports</h1>;
};

export default reports;
import { getServerSidePropsWithAuth } from "@pages/authenticationRedirector";
export const getServerSideProps = getServerSidePropsWithAuth(["admin"]);
