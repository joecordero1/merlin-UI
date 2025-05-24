import { useRouter } from "next/router";
import { useEffect } from "react";

const Firebaselogin = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/components/dashboards/modelo/");
  }, [router]);

  return null;
};

export default Firebaselogin;
