import Link from "next/link";

const Cero = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#F6EFD5]">
      <div className="productos-container text-justify flex flex-col items-center flex-1">
        <h1 className="text-3xl font-bold mb-4 mt-[30%] lg:mt-[6%]">
          Tortilla de maiz a la docena
        </h1>
        <div className="mx-auto"></div>
        <div className="lg:px-[1%] lg:ml-[15%] lg:mr-[15%]">
          <dl className="lg:grid-cols-2 lg:gap-8">
            <dl className="text-base text-gray-500">
              La tortilla de maíz es un alimento básico en la gastronomía de
              muchos países de América Latina y otros lugares del mundo. Esta
              deliciosa tortilla es una fina masa hecha con harina de maíz y
              agua, que se cuece en una plancha o comal caliente hasta que esté
              dorada y crujiente por fuera y suave y tierna por dentro. Esta
              variedad de tortilla se presenta en docenas, lo que la convierte
              en una excelente opción para compartir en reuniones familiares o
              con amigos. La tortilla de maíz a la docena es perfecta para
              preparar tacos, quesadillas, enchiladas y una gran variedad de
              platillos típicos de la cocina mexicana y latinoamericana. Además,
              es una opción económica y fácil de almacenar, ya que se puede
              congelar y consumir en cualquier momento.
            </dl>
          </dl>
        </div>
        <div className="fixed bottom-4 left-4">
          <Link href="/" legacyBehavior>
            <a className="flex items-center justify-center w-12 h-12 bg-[#3C9B35] text-white rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cero;
