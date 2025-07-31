import Base64 from "Base64";

const decodeJWT = (chainToken) => {
  const base64Url = chainToken.split(".")[1];
  if (!base64Url) {
    return "";
  }
  const decodedValue = JSON.parse(Base64.atob(base64Url));
  return decodedValue.data;
};

const decodeJWTFechaexp = (chainToken) => {
  const base64Url = chainToken.split(".")[1];

  if (!base64Url) {
    return "";
  }
  return JSON.parse(Base64.atob(base64Url));
};

const calcularDiasRestantes = (fechaPagoStr, mesesStr) => {
  if (mesesStr === "999") return { dias: "Ilimitado", fechaExpira: null };

  const meses = parseInt(mesesStr, 10);
  if (!fechaPagoStr || isNaN(meses)) return { dias: "-", fechaExpira: null };

  const fechaPago = new Date(fechaPagoStr);
  const fechaExpira = new Date(fechaPago);
  fechaExpira.setMonth(fechaExpira.getMonth() + meses);

  const hoy = new Date();
  const diffTime = fechaExpira - hoy;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { dias: "Expirado", fechaExpira };

  return { dias: `${diffDays} días`, fechaExpira };
};

export { decodeJWT, decodeJWTFechaexp, calcularDiasRestantes };
