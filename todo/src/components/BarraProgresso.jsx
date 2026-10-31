export default function BarraProgresso({ valor }) {
  return (
    <div>
      <div className="barra" role="progressbar" aria-valuenow={valor} aria-valuemin={0} aria-valuemax={100}>
        <div className="barra-preenchida" style={{ width: valor + '%' }} />
      </div>
      <p>{valor}%</p>
    </div>
  );
}