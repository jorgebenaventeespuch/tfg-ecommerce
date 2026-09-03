type WindowFrameProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  transparent?: boolean;
};

export default function WindowFrame({ title, children, className = "", transparent = false }: WindowFrameProps) {
  return (
    <div className={`border border-[#0054E3] rounded-t-lg shadow-lg ${className}`}>
      {/* Barra de título estilo Windows XP */}
      <div
        className="px-3 py-1 flex items-center justify-between rounded-t-lg"
        style={{
          background: "linear-gradient(180deg, #0A75FF 0%, #0054E3 40%, #0043B8 100%)",
        }}
      >
        <span className="text-white text-sm font-bold truncate">{title}</span>
        <div className="flex gap-1">
          <div className="w-5 h-5 bg-[#D4D0C8] border border-white rounded-sm flex items-center justify-center text-xs leading-none">
            _
          </div>
          <div className="w-5 h-5 bg-[#D4D0C8] border border-white rounded-sm flex items-center justify-center text-xs leading-none">
            □
          </div>
          <div className="w-5 h-5 bg-[#E04343] border border-white rounded-sm flex items-center justify-center text-white text-xs leading-none font-bold">
            ×
          </div>
        </div>
      </div>
      {/* Contenido: fondo blanco o transparente */}
      <div className={transparent ? "bg-transparent" : "bg-white"}>
        {children}
      </div>
    </div>
  );
}