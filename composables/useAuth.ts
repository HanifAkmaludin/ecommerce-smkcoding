export default function(){
  const setAuthorizationToken = (val: string) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);
    const token = useCookie("_at", { path: "/", expires: expiryDate });

    token.value = val;
  }

  const getAuthorizationToken = (): string | null => useCookie("_at").value || null;
  const rmAuthorizationToken = () => (useCookie("_at").value = null);
  const setRefreshToken = (val: string) => {
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    const token = useCookie("_rt", { path: "/", expires: expiryDate });
    token.value = val;
  };
  const getRefreshToken = (): string | null => useCookie("_rt").value || null;
  const rmRefreshToken = () => (useCookie("_rt").value = null);

  return {
    setAuthorizationToken,
    getAuthorizationToken,
    rmAuthorizationToken,
    setRefreshToken,
    getRefreshToken,
    rmRefreshToken,
  }
}